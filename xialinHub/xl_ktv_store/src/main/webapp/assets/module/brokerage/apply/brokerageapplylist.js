$(function($) {
	Common.initSelect2("province", {
		width : "70%"
	});
	Common.initSelect2("city", {
		width : "70%"
	});
	Common.initSelect2("brokerageType", {
		width : "70%"
	});
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "结佣已申请列表",
		url : "getbrokerageapplygrid",
		postData : {},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '订单ID','申请ID', '订单号', '电商项目名称', '所属城市', '佣金类型', '结佣公司',
				'结佣门店', '经纪人', '结佣对象类型', '应结佣金', '本次申请佣金','禁结佣金','已结佣金', '申请人', '申请时间',
				'审核状态', '是否垫佣','备注','审核人','审核时间','审核备注'],
		colModel : [ {
			name : "order_info_id",
			index : "order_info_id",
			width : 60,
			sorttype : "int",
			editable : false,
			hidden : true
		},{
			name : "brokerage_distribution_id",
			index : "brokerage_distribution_id",
			width : 60,
			sorttype : "int",
			editable : false,
			hidden : true
		},{
			name : "order_info_code",
			index : "order_info_code",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "project_info_name",
			index : "project_info_name",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "city_name",
			index : "city_name",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "brokerage_type",
			index : "brokerage_type",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "broker_company_name",
			index : "broker_company_name",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "store_name",
			index : "store_name",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "broker_name",
			index : "broker_name",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "brokerage_object",
			index : "brokerage_object",
			width : 60,
			sorttype : "string",
			editable : false,
			formatter : brokerageObjectFormatter
		},{
			name : "settle_amount",
			index : "settle_amount",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "brokerage_distribution_amount",
			index : "brokerage_distribution_amount",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "prohibit_amount",
			index : "prohibit_amount",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "real_amount",
			index : "real_amount",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "operator_name",
			index : "operator_name",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "create_time",
			index : "create_time",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "audit_status",
			index : "audit_status",
			width : 60,
			sorttype : "string",
			editable : false,
			formatter : audit_flagFormatter
		},{
			name : "real_status",
			index : "real_status",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "remark",
			index : "remark",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "audit_operator_name",
			index : "audit_operator_name",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		},{
			name : "audit_time",
			index : "audit_time",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		},{
			name : "audit_remark",
			index : "audit_remark",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}]
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
	$("#search").click(
			function() {
				var dialog = $("#condition").removeClass('hide')
						.dialog(
								{
									modal : true,
									title : "<div class='widget-header widget-header-small'><h4 class='smaller'>" +
											"<i class='ace-icon fa fa-search'></i> 请选择查询条件</h4></div>",
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
											getGrid();
											$(this).dialog("close");
										}
									},{
										text : "重置",
										"class" : "btn btn-primary btn-xs",
										click : function() {
											Common.initSelect2("province", {width : "70%"});
											Common.initSelect2("city", {width : "70%"});
											Common.initSelect2("brokerageType", {width : "70%"});
											document.getElementById("searchForm").reset();
										}
									} ]
								});
			}
	);
	
	/**
	 * 销管审核
	 */
	$("#auditbyxiaoguan").click(
			function(){
				var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
				if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
					Common.messageBox("提示", "请选择一条你要审核的数据！", false);
					return false;
				}
				var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
				
				if(rowData.audit_status.indexOf('未审核')<0){
					Common.messageBox("提示", "该数据已经审核过了！", false);
					return false;
				}
				
				window.parent.location.href = "toapplyauditinfo?rowData="+JSON.stringify(rowData);
			}
	);
	/**
	 * 查看
	 */
	$("#view").click(
			function(){
				var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
				if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
					Common.messageBox("提示", "请选择一条你要审核的数据！", false);
					return false;
				}
				var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
				
				window.parent.location.href = "toapplyinfo?rowData="+JSON.stringify(rowData);
			}
	);
	/**
	 * 导出
	 */
	$("#excellist").click(
			function() {
				location.href = "excellist?province="
						+ $("#province").val() + "&city=" + $("#city").val()
						+ "&customInfoName=" + $("#customInfoName").val()
						+ "&orderInfoCode=" + $("#orderInfoCode").val()
						+ "&brokerName=" + $("#brokerName").val()
						+ "&projectName=" + $("#projectName").val()
						+ "&brokerageType=" + $("#brokerageType").val();
			});
	/**
	 * 获得页面数据方法
	 */
	function getGrid(){
		var params = {
				province : $("#province").val(),
				city : $("#city").val(),
				customInfoName : $("#customInfoName").val(),
				orderInfoCode : $("#orderInfoCode").val(),
				brokerName : $("#brokerName").val(),
				projectName : $("#projectName").val(),
				brokerageType : $("#brokerageType").val()
		};
		Common.jqGridReload(gridSelector, params);
	}
	/**
	 * **************************************按钮事件 end ***************************************
	 */
});