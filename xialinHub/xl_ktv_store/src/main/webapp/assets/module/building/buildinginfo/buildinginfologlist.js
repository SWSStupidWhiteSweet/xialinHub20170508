$(function($) {
	Common.initSelect2("auditFlag", {
		width : "50%"
	});
	Common.initSelect2("saleStatus", {
		width : "50%"
	});
	Common.initSelect2("status", {
		width : "50%"
	});
	
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "楼盘期数日志信息列表",
		url : "getbuildinginfologgrid",
		postData : {buildingProjectId:$("#buildingProjectId").val()},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '楼盘期数日志ID', '楼盘期数名称', '楼盘期数简称', '楼盘期数别名',/* '分期简介',*/
				'销售状态', '分期均价', '公司名称', '创建时间', '状态', '操作方式', '审核状态', '审核时间',
				'审核人', '审核事由' ],
		colModel : [ {
			name : "buildingInfoLogId",
			index : "building_info_log_id",
			width : 60,
			sorttype : "int",
			editable : false,
			hidden : true
		}, {
			name : "buildingInfoName",
			index : "building_info_name",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "buildingInfoNa",
			index : "building_info_na",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "buildingInfoAlias",
			index : "building_info_alias",
			width : 100,
			sorttype : "string",
			editable : false
		},/* {
			name : "biref",
			index : "biref",
			width : 100,
			sorttype : "string",
			editable : false
		}, */{
			name : "saleStatus",
			index : "sale_status",
			width : 100,
			sorttype : "String",
			editable : false
		}, {
			name : "buildingInfoPrice",
			index : "building_info_price",
			width : 100,
			sorttype : "string",
			editable : false,
            formatter: buildingPriceFormatter
		},{
			name : "companyName",
			index : "company_name",
			width : 100,
			sorttype : "string",
			editable : false
		},{
			name : "createTime",
			index : "create_time",
			width : 130,
			sorttype : "string",
			editable : false,
			formatter : formartDateTime
		},{
			name : "status",
			index : "status",
			width : 130,
			sorttype : "int",
			editable : false,
			formatter : statusFormatter
		}, {
			name : "operateFlag",
			index : "operate_flag",
			width : 130,
			sorttype : "string",
			editable : false,
			formatter : operate_flagFormatter
		}, {
			name : "auditFlag",
			index : "audit_flag",
			width : 100,
			sorttype : "string",
			editable : false,
			formatter : audit_flagFormatter
		}, {
			name : "auditTime",
			index : "audit_time",
			width : 130,
			sorttype : "string",
			editable : false,
			formatter : formartDateTime
		},{
			name : "auditOperatorName",
			index : "audit_operator_name",
			width : 130,
			sorttype : "string",
			editable : false
		},  {
			name : "auditReason",
			index : "audit_reason",
			width : 130,
			sorttype : "string",
			editable : false
		} ]
	});

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/**
	 * **************************************构造jqGrid end ***************************************
	 */

	/**
	 * **************************************按钮事件 start ***************************************
	 */
	/**
	 * 搜索
	 */
	$("#search").click(
			function() {
				var dialog = $("#condition").removeClass('hide')
						.dialog(
								{
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
											var params = {
													auditFlag : $("#auditFlag").val(),
													buildingInfoName : $("#buildingInfoName").val(),
													companyName : $("#companyName").val(),
													saleStatus : $("#saleStatus").val(),
													status : $("#status").val()
											};
											Common.jqGridReload(gridSelector, params);
											$(this).dialog("close");
										}
									},{
										text : "重置",
										"class" : "btn btn-primary btn-xs",
										click : function() {
											Common.initSelect2("saleStatus", {
												width : "50%"
											});
											Common.initSelect2("auditFlag", {
												width : "50%"
											});
											document.getElementById("searchForm").reset();
										}
									} ]
								});
			});
	/**
	 * 导出
	 */
	$("#excel").click(function() {
		location.href = "excellog?buildingInfoName="+$("#buildingInfoName").val()+"&saleStatus="+$("#saleStatus").val()+"&companyName="+$("#companyName").val()
			+"&buildingProjectId="+$("#buildingProjectId").val()+"&auditFlag="+$("#auditFlag").val();
	});
	/**
	 * 跳转到审核页面
	 */
	$("#aduit").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你要审核的数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		if(rowData.auditFlag.indexOf("未审核")<0){
			Common.messageBox("提示", "该条数据已经审核过了！", false);
			return false;
		}
		window.parent.location.href = "toaduit?buildingInfoLogId="+rowData.buildingInfoLogId+"&buildingProjectId="+$("#buildingProjectId").val();
	});

	/**
	 * **************************************按钮事件 end ***************************************
	 */
});