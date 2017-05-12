$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#configloglist_grid-table";
	var pagerSelector = "#configloglist_grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "项目列表",
		url : "../config/getgriddataconfig",
		postData : {projectInfoId:$("#projectInfoId").val()},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '项目ID','操作类型', '报备保护期  (小时)', '到访保护期  (天)', '业绩保护期  (天)', '自动报备确认', '到访为王','是否全号报备','开发商确认报备','二手成交套数比例预测值  (%)','客源比例超限值  (%)','审核状态'],
		colModel : [ {
			name : "projectConfigLogId",
			index : "project_config_log_id",
			width : 10,
			sorttype : "int",
			editable : false,
			hidden : true
		},{
			name : "operateFlag",
			index : "operate_flag",
			width : 10,
			sorttype : "int",
			editable : false,
			hidden : true
		},{
			name : "recordProtectHours",
			index : "record_protect_hours",
			width : 150,
			sorttype : "string",
			editable : false
		}, {
			name : "visitProtectHours",
			index : "visit_protect_hours",
			width : 150,
			sorttype : "string",
			editable : false
		}, {
			name : "customProtectHours",
			index : "custom_protect_hours",
			width : 140,
			sorttype : "string",
			editable : false
		}, {
			name : "isAutoReceives",
			index : "is_auto_receives",
			width : 180,
			sorttype : "string",
			editable : false,
			formatter:reportState
		}, {
			name : "isVisit",
			index : "is_visit",
			width : 150,
			sorttype : "string",
			editable : false,
			formatter:reportState
		}, {
			name : "isTel",
			index : "is_tel",
			width : 150,
			sorttype : "string",
			editable : false,
			formatter:reportState
		}, {
			name : "isDeveploerConfirm",
			index : "is_deveploer_confirm",
			width : 150,
			sorttype : "string",
			editable : false,
			formatter:reportState
		}, {
			name : "dealRatio",
			index : "deal_ratio",
			width : 250,
			sorttype : "string",
			editable : false
		},{
			name : "customRatio",
			index : "custom_ratio",
			width : 200,
			sorttype : "string",
			editable : false
		}, {
			name : "auditFlag",
			index : "audit_flag",
			width : 100,
			sorttype : "string",
			editable : false,
			formatter : chenkState
		}]
	});

	
	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */

	/** **************************************按钮事件 start *************************************** */
	$("#configloglist_look").click(function() {
        var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条你想查看的数据！", false);
            return false;
        }

        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

        location.href = "../config/look?projectConfigLogId="+rowData.projectConfigLogId+"&projectInfoId="+$("#projectInfoId").val();
	});
	/**
	 * 項目配置审核通过
	 */
    $("#configloglist_check_yes").click(function() {
        var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条您想操作的数据！", false);
            return false;
        }
        Common.confirm("确定审核通过该项目配置吗？", function(){
        	Common.showMask("请稍候......");
            $.ajax({
                url : "../config/checkYes",
                type : "post",
                data : {
                	projectConfigLogId : rowData.projectConfigLogId
                },
                dataType : "json",
                success : function(json) {
                	Common.hideMask();
                    if (json.isSuccess) {
                        Common.messageBox("提示", json.msg, true);
                        Common.jqGridReload(gridSelector, {});
                		Common.jqGridReload("#configloglist_grid-table", {});
                		Common.jqGridReload("#configlist_grid-table", {});
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
	
    /**
     * 項目配置审核不通过
     */
    $("#configloglist_check_not").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条您想操作的数据！", false);
            return false;
        }
        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
        Common.prompt("请输入审核拒绝原因", "审核拒绝原因不能为空。", function(auditReason){
        	Common.showMask("请稍候......");
        	$.ajax({
        		url:"../config/checkNo",
        		type:"post",
        		data:{
        			projectConfigLogId : rowData.projectConfigLogId,
        			auditReason : auditReason
        		},
        		dataType:"json",
        		success : function(json) {
        			Common.hideMask();
        			if (json.isSuccess) {
        				Common.alert("审核成功！", true, function(){
        				Common.jqGridReload(gridSelector, {});
        				Common.jqGridReload("#configloglist_grid-table", {});
        				});
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
    function back(){
		Common.jqGridReload(gridSelector, {});
		Common.jqGridReload("#configloglist_grid-table", {});
	}
    
    $("#configlist_backBtn").click(function(){
    	var data=$("#projectInfoId").val();
    	location.href = "../info/skipPage?projectInfoId=" +data +"&tabId=projectconfig";
    });
    /**
	 * 項目配置审核状态
	 */
	function chenkState(value) {
	    switch (value) {
	        case 0:
	            return "<span style=\"color:#DAA520\">未审核</span>";
	        case 1:
	            return "<span style=\"color:blue\">通过</span>";
	        case 2:
	            return "<span style=\"color:red\">拒绝</span>";
	        default:
	            return "未知状态";
	    }
	}
	
	/**
	 * 自动报备确认、到访为王、是否全号报备、开发商确认报备
	 */
		function reportState(value) {
		    switch (value) {
		        case 0:
		            return "<span style=\"color:black\">否</span>";
		        case 1:
		            return "<span style=\"color:black\">是</span>";
		        default:
		            return "未知状态";
		    }
		}
	/** **************************************按钮事件 end *************************************** */
});