$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#infologlist_grid-table";
	var pagerSelector = "#infologlist_grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "项目列表",
		url : "getgridlogdata",
		postData : {},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ 'ID', '楼盘名称', '项目名称', '城市', '合作开始时间', '合作结束时间','认购截止日期','操作类型','操作员名称','审核状态','审核事由'],
		colModel : [ {
			name : "projectInfoLogId",
			index : "project_info_log_id",
			width : 10,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "buildingProjectName",
			index : "building_project_name",
			width : 275,
			sorttype : "string",
			editable : false
		}, {
			name : "projectInfoName",
			index : "project_info_name",
			width : 275,
			sorttype : "string",
			editable : false
		}, {
			name : "cityName",
			index : "city_name",
			width : 140,
			sorttype : "string",
			editable : false
		}, {
			name : "cooperationStart",
			index : "cooperation_start",
			width : 140,
			sorttype : "string",
			editable : false
		}, {
			name : "cooperationEnd",
			index : "cooperation_end",
			width : 140,
			sorttype : "string",
			editable : false
		}, {
			name : "saleEndDate",
			index : "sale_end_date",
			width : 150,
			sorttype : "string",
			editable : false
		}, {
			name : "operateFlag",
			index : "operate_flag",
			width : 150,
			sorttype : "string",
			editable : false,
			formatter : operate_flagFormatter
		}, {
			name : "operatorName",
			index : "operator_name",
			width : 150,
			sorttype : "string",
			editable : false
		}, {
			name : "auditFlag",
			index : "audit_flag",
			width : 100,
			sorttype : "string",
			editable : false,
			formatter : audit_flagFormatter
		}, {
			name : "auditReason",
			index : "audit_reason",
			width : 160,
			sorttype : "string",
			editable : false
		}]
	});

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */

	/** **************************************按钮事件 start *************************************** */
	Common.initSelect2("infologlist_province", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	
	Common.initSelect2("infologlist_city", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	
	$("#infologlist_options").click(function() {
		var dialog = $("#infologlist_condition").removeClass('hide').dialog({
			modal : true,
			title : "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-search'></i> 请选择查询条件</h4></div>",
			title_html : true,
			width : "500px",
			buttons : [ {
				text : "取消",
				"class" : "btn btn-xs",
				click : function() {
					$(this).dialog("close");
				}
			}, {
				text : "查询",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					Common.jqGridReload(gridSelector,{
						provinceId : $("#infologlist_province").val(),
						cityId : $("#infologlist_city").val(),
						cooperationStart : $("#infologlist_cooperationStart").val(),
						cooperationEnd : $("#infologlist_cooperationEnd").val(),
						projectInfoName : $("#infologlist_projectInfoName").val()
					});
					$(this).dialog("close");
				}
			},{
				text : "重置",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					$("#infologlist_projectInfoName").val("");
					$("#infologlist_cooperationEnd").val("");
					$("#infologlist_cooperationStart").val("");
					$("#infologlist_province").select2("val", "");
					$("#infologlist_city").select2("val", "");
					$("#infologlist_province").trigger("change");
				}
			} ]
		});
	});
	
	$("#infologlist_search").click(function(){
	   Common.jqGridReload(gridSelector,{
			provinceId : $("#infologlist_province").val(),
			cityId : $("#infologlist_city").val(),
			cooperationStart : $("#infologlist_cooperationStart").val(),
			cooperationEnd : $("#infologlist_cooperationEnd").val(),
			projectInfoName : $("#infologlist_projectInfoName").val()
		});
    });
	
	//项目审核通过
	$("#infologlist_auditpass").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		var type = rowData.operateFlag;
		var a = "确定要审核通过该项目吗？";
		if(type != "创建"){
			a = "确定要审核当前数据，并且将之前的未审核数据置为不通过吗？";
		}
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条数据！", false);
            return false;
        }
        Common.confirm(a,function(){
        	Common.showMask("请稍候......");
            $.ajax({
            	url:"auditpass",
            	type:"post",
            	data:{
            		projectInfoLogId : rowData.projectInfoLogId
            	},
            	dataType:"json",
            	success : function(json) {
            		Common.hideMask();
    				if (json.isSuccess) {
    					Common.messageBox("提示", json.msg, true);
    					back();
    				} else {
    					Common.messageBox("提示", json.msg, false);
    				}
    			},
    			error : function() {
    				Common.hideMask();
    				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
    			}
            });
		});
	});
	
	//项目审核不通过
	$("#infologlist_auditnopass").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条数据！", false);
            return false;
        }
        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
        Common.prompt("请输入审核拒绝原因", "审核拒绝原因不能为空。", function(auditReason){
        	Common.showMask("请稍候......");
        	$.ajax({
        		url:"auditnopass",
        		type:"post",
        		data:{
        			projectInfoLogId : rowData.projectInfoLogId,
        			auditReason : auditReason
        		},
        		dataType:"json",
        		success : function(json) {
        			Common.hideMask();
        			if (json.isSuccess) {
        				Common.messageBox("提示", json.msg, true);
    					back();
        			} else {
        				Common.messageBox("提示", json.msg, false);
        			}
        		},
        		error : function() {
        			Common.hideMask();
        			Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
        		}
        	});
        }, "no");
	});
	
	function back(){
		Common.jqGridReload(gridSelector, {});
		Common.jqGridReload("#infolist_grid-table", {});
	}
});