$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "可分配订单",
		url : "getdistributionordergriddata",
		postData : {devAccountDetailId:$("#devAccountDetailId").val()},
		multiSelect : false,
		height : '520px',
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '订单ID', '指纹', '订单号', '订单类型', '客户姓名', '客户电话', '渠道', '报备人', '报备人电话', '所属公司',
		                  '所属门店', '产品套餐', '认购房源', '网签价格', '应收回款', '已回款金额'],
		colModel : [ {
			name : "orderInfoId",
			index : "orderInfoId",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "fingerprint",
			index : "fingerprint",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "orderInfoCode",
			index : "orderInfoCode",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "packageType",
			index : "packageType",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "customName",
			index : "customName",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "customTel",
			index : "customTel",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "channelType",
			index : "channelType",
			width : 60,
			sorttype : "int",
			editable : false
		}, {
			name : "brokerName",
			index : "brokerName",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "brokerTel",
			index : "brokerTel",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "brokerCompanyName",
			index : "brokerCompanyName",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "storeName",
			index : "storeName",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "projectPackageName",
			index : "projectPackageName",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "house",
			index : "house",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "onlineSignAmount",
			index : "onlineSignAmount",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "recvDistAmount",
			index : "recvDistAmount",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "realDistAmount",
			index : "realDistAmount",
			width : 60,
			sorttype : "string",
			editable : false
		}
		]
	});

	// 选中行事件
	jqGridOption.onSelectRow = function(rowIndex, status) {
		var rowData = $(gridSelector).getRowData(rowIndex);
	};

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */

	/** **************************************按钮事件 start *************************************** */
	
	$("#back").click(function() {
		location.href = "index";
	});
	/** **************************************按钮事件 end *************************************** */
	
});