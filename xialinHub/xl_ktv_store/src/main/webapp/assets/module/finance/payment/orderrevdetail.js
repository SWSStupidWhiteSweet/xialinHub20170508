$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "订单回款详情",
		url : "getorderrevgriddata",
		postData : {orderInfoId:$("#orderInfoId").val()},
		multiSelect : false,
		height : '520px',
		sortName : "createTime",
		sortOrder : "desc",
		colNamesArray : [ '回款批次号ID', '回款金额', '时间'],
		colModel : [ {
			name : "devAccountDetailId",
			index : "devAccountDetailId",
			width : 60,
			sorttype : "int",
			editable : false
		}, {
			name : "distributionAmount",
			index : "distributionAmount",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "createTime",
			index : "createTime",
			width : 60,
			sorttype : "date",
			editable : false
		}
		]
	});

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */

	/** **************************************按钮事件 start *************************************** */
	
	/**
	 * 返回
	 */
	$("#back").click(function() {
		location.href = "index?tab=2";
	});
	
	/** **************************************按钮事件 end *************************************** */
});