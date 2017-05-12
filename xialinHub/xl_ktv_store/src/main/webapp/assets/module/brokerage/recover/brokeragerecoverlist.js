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
	$('.date-picker').datepicker({autoclose:true});
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "结佣已追回列表",
		url : "getbrokerrecovergrid",
		postData : {},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '订单ID','催收ID','订单号','电商项目','客户姓名', '结佣公司', '结佣门店', '所属城市', '佣金类型', '已结佣金',
				'结佣帐号', '退款审核人', '退款审核时间', '已追回佣金', '剩余追回佣金','追回时间'],
		colModel : [ {
			name : "order_info_id",
			index : "order_info_id",
			width : 60,
			sorttype : "int",
			editable : false,
			hidden : true
		},{
			name : "finance_collection_id",
			index : "finance_collection_id",
			width : 60,
			sorttype : "int",
			editable : false,
			hidden : true
		},{
			name : "order_info_code",
			index : "order_info_code",
			width : 60,
			sorttype : "int",
			editable : false
		},{
			name : "project_info_name",
			index : "project_info_name",
			width : 60,
			sorttype : "int",
			editable : false,
			hidden : true
		},{
			name : "custom_name",
			index : "custom_name",
			width : 60,
			sorttype : "int",
			editable : false,
			hidden : true
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
			name : "recv_return_amount",
			index : "recv_return_amount",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "bank_account",
			index : "bank_account",
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
			name : "return_amount",
			index : "return_amount",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "residue_amount",
			index : "residue_amount",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "complete_time",
			index : "complete_time",
			width : 60,
			sorttype : "string",
			editable : false
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
			});
	/**
	 * 导出
	 */
	$("#excelrecoverlist").click(
			function() {
				location.href = "excelrecoverlist?province="
						+ $("#province").val() + "&city=" + $("#city").val()
						+ "&customInfoName=" + $("#customInfoName").val()
						+ "&orderInfoCode=" + $("#orderInfoCode").val()
						+ "&projectName=" + $("#projectName").val()
						+ "&brokerageType=" + $("#brokerageType").val()
						+ "&startDate=" + $("#startDate").val()
						+ "&endDate=" + $("#endDate").val();
			});
	/**
	 * 查看
	 */
	$("#viewcollection").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你要收款的数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

		window.parent.location.href = "toviewcollection?brokerageType="
						+ rowData.brokerage_type + "&financeCollectionId="
						+ rowData.finance_collection_id + "&orderInfoId="
						+ rowData.order_info_id;
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
				projectName : $("#projectName").val(),
				startDate : $("#startDate").val(),
				endDate : $("#endDate").val(),
				brokerageType : $("#brokerageType").val()
		};
		Common.jqGridReload(gridSelector, params);
	}
	/**
	 * **************************************按钮事件 end ***************************************
	 */
});