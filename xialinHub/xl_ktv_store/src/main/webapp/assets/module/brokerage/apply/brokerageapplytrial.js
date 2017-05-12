$(function($) {
	Common.initSelect2("province", {
		width : "70%"
	});
	Common.initSelect2("city", {
		width : "70%"
	});
	Common.initSelect2("auditStatus", {
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
		title : "结佣申请初审列表",
		url : "getbrokerageapplytrialgrid",
		postData : {},
		multiSelect : false,
		height : "550px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '结佣申请ID','结佣申请编号', '结佣对象类型', '结佣对象名称', '城市', '负责人',
				'申请总额', '申请时间', '初审状态','申请审核状态','初审时间', '审批进度'],
		colModel : [ {
			name : "brokerage_apply_id",
			index : "brokerage_apply_id",
			width : 60,
			sorttype : "int",
			editable : false,
			hidden : true
		},{
			name : "brokerage_apply_code",
			index : "brokerage_apply_code",
			width : 60,
			sorttype : "int",
			editable : false
		},{
			name : "brokerage_object",
			index : "brokerage_object",
			width : 60,
			sorttype : "string",
			editable : false,
			formatter : brokerageObjectFormatter
		},{
			name : "brokerage_name",
			index : "brokerage_name",
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
			name : "director",
			index : "director",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "brokerage_total_amount",
			index : "brokerage_total_amount",
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
			name : "sellmgr_audit_status",
			index : "sellmgr_audit_status",
			width : 60,
			sorttype : "string",
			editable : false,
			formatter : audit_flagFormatter
		},{
			name : "audit_status",
			index : "audit_status",
			width : 60,
			sorttype : "string",
			editable : false,
			formatter : audit_flagFormatter
		},{
			name : "audit_time",
			index : "audit_time",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "audit_schedule",
			index : "audit_schedule",
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
	$("#exceltriallist").click(
			function() {
				location.href = "exceltriallist?province="
						+ $("#province").val() + "&city=" + $("#city").val()
						+ "&brokerageApplyCode=" + $("#brokerageApplyCode").val()
						+ "&director=" + $("#director").val()
						+ "&auditStatus=" + $("#auditStatus").val()
						+ "&startDate=" + $("#startDate").val()
						+ "&endDate=" + $("#endDate").val();
			});
	/**
	 * 审核
	 */
	$("#toAudit").click(function() {
		toEditInfo("toAudit")
	});

	/**
	 * 查看
	 */
	$("#toView").click(function(){
		toEditInfo("toView");
	});
	
	function toEditInfo(type){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你要操作的数据！", false);
			return false;
		}
		
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		
		if(type == "toAudit" && rowData.sellmgr_audit_status.indexOf("未审核")<0){
			Common.messageBox("提示", "该条数据已经审核过了！", false);
			return false;
		}
		
		location.href = "toaudittrial?brokerageApplyId="+rowData.brokerage_apply_id+"&type="+type;
	}
	/**
	 * 获得页面数据方法
	 */
	function getGrid(){
		var params = {
				province : $("#province").val(),
				city : $("#city").val(),
				brokerageApplyCode : $("#brokerageApplyCode").val(),
				director : $("#director").val(),
				auditStatus : $("#auditStatus").val(),
				startDate : $("#startDate").val(),
				endDate : $("#endDate").val()
		};
		Common.jqGridReload(gridSelector, params);
	}
	/**
	 * **************************************按钮事件 end ***************************************
	 */
});
/**
 * 跳转流程日志页面
 * @param brokerageApplyId
 * @param flowStartId
 */
function viewFlowLogs(brokerageApplyId,flowStartId){
	location.href = "../flow/viewflowlogs?flowStartId="+flowStartId;
}