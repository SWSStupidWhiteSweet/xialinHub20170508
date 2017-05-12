$(function($) {
	Common.initSelect2("borkerCompanyId", {
		width : "120px"
	});
	Common.initSelect2("storeId", {
		width : "120px"
	});
	Common.initSelect2("channelType", {
		width : "120px"
	});
	
	$("#query").click(function() {
		query("#grid-table");
	});

	function query(gridId) {
		var dialog = $("#condition").removeClass('hide').dialog({
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

					Common.jqGridReload(gridId, {
						customName : $("#customName").val(),
						brokerName : $("#brokerName").val(),
						orderInfoCode : $("#orderInfoCode").val(),
						borkerCompanyId : $("#borkerCompanyId").val(),
						storeId : $("#storeId").val(),
						channelType : $("#channelType").val(),
						brokerTel : $("#brokerTel").val()
					});

					$(this).dialog("close");
				}
			} ]
		});
	}
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "可分配订单",
		url : "getordergriddata",
		postData : {devAccountDetailId:$("#devAccountDetailId").val()},
		multiSelect : false,
		height : '485px',
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '订单ID', '指纹', '订单号', '订单类型', '客户姓名', '渠道', '报备人', '报备人电话', '所属公司',
		                  '所属门店', '产品套餐', '认购房源', '网签价格', '应收回款', '已收回款', '未收回款'],
		colModel : [ {
			name : "orderInfoId",
			index : "orderInfoId",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
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
			name : "channelType",
			index : "channelType",
			width : 60,
			sorttype : "int",
			editable : false,
			formatter : channelTypeFormatter
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
			sorttype : "int",
			editable : false
		}, {
			name : "notRecvDistAmount",
			index : "notRecvDistAmount",
			width : 60,
			sorttype : "int",
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
	
	/**
	 * 刷新页面
	 */
	$("#paymentIndex").click(function() {
		location.href = "index";
	});
	
	/**
	 * 跳转到待回款订单页面
	 */
	$("#orderIndex").click(function() {
		location.href = "orderindex";
	});
	
	/**
	 * 导出
	 */
	$("#excel").click(function() {
		alert(1);
		location.href = "orderexcel";
	});

	/**
	 * 跳转到查看页面
	 */
	$("#view").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想查看的数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		location.href = "todistributionorderdetail?orderInfoId="+rowData.orderInfoId+"&orderInfoCode="
			+rowData.orderInfoCode+"&recvDistAmount="+rowData.recvDistAmount+"&realDistAmount="+rowData.realDistAmount;
	});
	
	/**
	 * 重置
	 */
	$("#remove").click(function() {
		$("#customName").val("");
		$("#brokerName").val("");
		$("#orderInfoCode").select2("val", "");
		$("#borkerCompanyId").select2("val", "");
		$("#storeId").select2("val", "");
		$("#channelType").val("");
		$("#brokerTel").val("");
		Common.jqGridReload(gridSelector, {
			customName : $("#customName").val(),
			brokerName : $("#brokerName").val(),
			orderInfoCode : $("#orderInfoCode").val(),
			borkerCompanyId : $("#borkerCompanyId").val(),
			storeId : $("#storeId").val(),
			channelType : $("#channelType").val(),
			brokerTel : $("#brokerTel").val()
		});
	});

	/** **************************************按钮事件 end *************************************** */
});