$(function($) {
	$('.date-picker').datepicker({autoclose:true});
	/**
	 * **************************************构造jqGrid start* ***************************************
	 */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "结佣退款已审批列表",
		url : "getflowhaveauditlist",
		postData : {},
		multiSelect : false,
		height : "550px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '打开页面的路径','审批业务', '相关信息', '申请人', '申请时间', '审批进度'],
		colModel : [
		 {
			name : "url",
			index : "url",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		},{
			name : "title",
			index : "title",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "about_info",
			index : "about_info",
			width : 300,
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
			name : "schedule",
			index : "schedule",
			width : 60,
			sorttype : "string",
			editable : false
		}]
	});

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/**
	 * **************************************构造jqGrid end * ***************************************
	 */

	/**
	 * **************************************按钮事件 start * ***************************************
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
											document.getElementById("searchForm").reset();
										}
									} ]
								});
			});
	/**
	 * 审核
	 */
	$("#viewInfo").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你要查看的数据！", false);
			return false;
		}
		
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		
		location.href = rowData.url;
	});
	/**
	 * 获得页面数据方法
	 */
	function getGrid(){
		var params = {
				title : $("#title").val(),
				aboutInfo : $("#aboutInfo").val(),
				operatorName : $("#operatorName").val(),
				schedule : $("#schedule").val(),
				startDate : $("#startDate").val(),
				endDate : $("#endDate").val()
		};
		Common.jqGridReload(gridSelector, params);
	}
	/**
	 * **************************************按钮事件 end
	 * ***************************************
	 */
});
/**
 * 跳转流程日志页面
 * 
 * @param brokerageApplyId
 * @param flowStartId
 */
function viewFlowLogs(flowStartId){
	location.href = "../flow/viewflowlogs?flowStartId="+flowStartId;
}