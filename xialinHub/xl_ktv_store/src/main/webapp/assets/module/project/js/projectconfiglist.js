$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#configlist_grid-table";
	var pagerSelector = "#configlist_grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "项目列表",
		url : "../config/getgriddataconfigpass",
		postData : {projectInfoId:$("#projectInfoId").val()},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '项目ID', '报备保护期  (小时)', '到访保护期  (天)', '业绩保护期  (天)', '自动报备确认', '到访为王','是否全号报备','开发商确认报备','二手成交套数比例预测值  (%)','客源比例超限值  (%)'],
		colModel : [ {
			name : "projectInfoId",
			index : "project_info_id",
			width : 10,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
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
			width : 150,
			sorttype : "string",
			editable : false
		},{
			name : "customRatio",
			index : "custom_ratio",
			width : 150,
			sorttype : "string",
			editable : false
		}]
	});

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */

	/** **************************************按钮事件 start *************************************** */
	/*$("#addConfig").click(function() {
		var dialog = $("#condition").removeClass('hide').dialog({
			modal : true,
			title : "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-plus green'></i> 项目配置信息添加</h4></div>",
			title_html : true,
			width : "600px",
			buttons : [ {
				text : "取消",
				"class" : "btn btn-xs",
				click : function() {
					$(this).dialog("close");
				}
			}, {
				text : "保存",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					Common.jqGridReload(gridSelector,{
						provinceId : $("#province").val(),
						cityId : $("#city").val(),
						isStart : $("#isStart").val(),
						cooperationStart : $("#cooperationStart").val(),
						cooperationEnd : $("#cooperationEnd").val(),
						projectInfoName : $("#projectInfoName").val()
					});
					$(this).dialog("close");
				}
			} ]
		});
	});*/
	
		$("#configlist_addConfig").click(function() {
			var projectInfoId = $("#projectInfoId").val();
		location.href = "../config/add?projectInfoId="+projectInfoId;
	});
		
		
	/*跳转修改页面*/
    $("#configlist_modify").click(function() {
        var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条你想修改的数据！", false);
            return false;
        }
        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
        var actionType = $("#actionType").val();
		var url = actionType == "modify" ? "../config/config_update?projectInfoId="+rowData.projectInfoId : "config/add";
        location.href = url;
    });
    
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