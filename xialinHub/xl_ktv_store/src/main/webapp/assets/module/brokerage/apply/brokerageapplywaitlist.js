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
		title : "结佣待申请列表",
		url : "getbrokerageapplywaitgrid",
		postData : {},
		multiSelect : false,
		height : "500px",
		sortName : "order_info_id",
		sortOrder : "desc",
		colNamesArray : [ '订单ID','联代方ID','公司ID','门店ID', '订单号', '电商项目名称', '所属城市', '佣金类型', '结佣公司',
				'结佣门店', '经纪人', '结佣对象类型', '应结佣金', '许结佣金', '禁止结佣金额', '实结佣金金额',
				'剩余结佣金额', '实收回款' ],
		colModel : [ {
			name : "order_info_id",
			index : "order_info_id",
			width : 60,
			sorttype : "int",
			editable : false,
			hidden : true
		},{
			name : "agent_id",
			index : "agent_id",
			width : 60,
			sorttype : "int",
			editable : false,
			hidden : true
		},{
			name : "broker_company_id",
			index : "broker_company_id",
			width : 60,
			sorttype : "int",
			editable : false,
			hidden : true
		},{
			name : "store_id",
			index : "store_id",
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
			editable : false
		},{
			name : "settle_amount",
			index : "settle_amount",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "can_amount",
			index : "can_amount",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "forbid_amount",
			index : "forbid_amount",
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
			name : "residue_amount",
			index : "residue_amount",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "real_ra_amount",
			index : "real_ra_amount",
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
									} ,{
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
	$("#excelwaitlist").click(
			function() {
				location.href = "excelwaitlist?province="
						+ $("#province").val() + "&city=" + $("#city").val()
						+ "&customInfoName=" + $("#customInfoName").val()
						+ "&orderInfoCode=" + $("#orderInfoCode").val()
						+ "&brokerName=" + $("#brokerName").val()
						+ "&projectName=" + $("#projectName").val()
						+ "&brokerageType=" + $("#brokerageType").val();
			});
	/**
	 * 策划申请
	 */
	$("#apply").click(function() {
		toEditInfo("apply")
	});

	/**
	 * 禁止结佣
	 */
	$("#prohibit").click(function(){
		toEditInfo("prohibit");
	});
	
	function toEditInfo(type){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你要操作的数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		window.parent.location.href = "toapplyeditinfo?rowData="+JSON.stringify(rowData)+"&type="+type;
	}
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