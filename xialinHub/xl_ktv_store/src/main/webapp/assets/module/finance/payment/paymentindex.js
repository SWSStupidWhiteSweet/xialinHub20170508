$(function($) {
	Common.initSelect2("payWay", {
		width : "120px"
	});
	Common.initSelect2("status", {
		width : "120px"
	});
	Common.initSelect2("merchantId", {
		width : "120px"
	});
	
	$("#query1").click(function() {
		query1("#grid-table-1");
	});

	function query1(gridId) {
		var dialog = $("#condition1").removeClass('hide').dialog({
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
						payWay : $("#payWay").val(),
						status : $("#status").val(),
						merchantId : $("#merchantId").val(),
						devAccountDetailId : $("#devAccountDetailId").val(),
						tradeTime : $("#tradeTime").val()
					};
					$.ajax({
						url:"count1",
						type:"post",
						dataType:"json",
						data:params,
						success:function(data){
							$("#aboutMoneyA1").text(data.aboutMoneyA);
							$("#aboutMoneyB1").text(data.aboutMoneyB);
							$("#countUnallocatedPayment1").text(data.countUnallocatedPayment);
							$("#aboutMoneyA2").text(data.aboutMoneyA);
							$("#countUnallocatedPayment2").text(data.countUnallocatedPayment);
						}
					});
					Common.jqGridReload(gridId, params);
					$(this).dialog("close");
				}
			}, {
				text : "重置",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					$("#payWay").select2("val", "");
					$("#status").select2("val", "");
					$("#merchantId").select2("val", "");
					$("#devAccountDetailId").val("");
					$("#tradeTime").val("");
				}
			} ]
		});
	}
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#grid-table-1";
	var pagerSelector = "#grid-pager-1";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "paymentGrid",
		title : "回款分配管理",
		url : "getgriddata",
		postData : {},
		multiSelect : false,
		height : '485px',
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '回款批次号', '回款开发商', '回款方式', '回款金额', '待分配金额', '已分配金额', '状态', '添加时间', '回款时间', '指纹'],
		colModel : [ {
			name : "devAccountDetailId",
			index : "dev_account_detail_id",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "companyName",
			index : "companyName",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "payWay",
			index : "pay_way",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "recvAmount",
			index : "recv_amount",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "distribution",
			index : "distribution",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "distributionAmount",
			index : "distribution_amount",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "status",
			index : "status",
			width : 60,
			sorttype : "int",
			editable : false,
			formatter : paymentStatusFormatter
		}, {
			name : "createTime",
			index : "create_time",
			width : 60,
			sorttype : "string",
			editable : false,
			formatter : dateTimeFormatter
		}, {
			name : "tradeTime",
			index : "trade_time",
			width : 60,
			sorttype : "string",
			editable : false,
			formatter : dateFormatter
		}, {
			name : "fingerprint",
			index : "fingerprint",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}]
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
	
	 /*点击刷新退款页面*/
    $("#tab1").click(function () {
    	var params = {
			payWay : $("#payWay").val(),
			status : $("#status").val(),
			merchantId : $("#merchantId").val(),
			devAccountDetailId : $("#devAccountDetailId").val(),
			tradeTime : $("#tradeTime").val()
		};
		$.ajax({
			url:"count1",
			type:"post",
			dataType:"json",
			data:params,
			success:function(data){
				$("#aboutMoneyA1").text(data.aboutMoneyA);
				$("#aboutMoneyB1").text(data.aboutMoneyB);
				$("#countUnallocatedPayment1").text(data.countUnallocatedPayment);
				$("#aboutMoneyA2").text(data.aboutMoneyA);
				$("#countUnallocatedPayment2").text(data.countUnallocatedPayment);
			}
		});
		Common.jqGridReload("#grid-table-1", params);
    });
    
	/**
	 * 跳转到新增回款页面
	 */
	$("#add").click(function() {
		location.href = "add";
	});
	
	/**
	 * 导出
	 */
	$("#excel").click(function() {
		var payWay = $("#payWay").val();
		var status = $("#status").val();
		var merchantId = $("#merchantId").val();
		var devAccountDetailId = $("#devAccountDetailId").val();
		var tradeTime = $("#tradeTime").val();
		
		location.href = "excel?payWay="+payWay+"&status="+status+"&merchantId="+merchantId+"&devAccountDetailId="+devAccountDetailId+
						"&tradeTime="+tradeTime;
	});

	/**
	 * 跳转到查看页面
	 */
	$("#view1").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想查看的数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		location.href = "view?devAccountDetailId="+rowData.devAccountDetailId;
	});
	
	/**
	 * 重置
	 */
	/*$("#remove1").click(function() {
		$("#payWay").select2("val", "");
		$("#status").select2("val", "");
		$("#merchantId").select2("val", "");
		$("#devAccountDetailId").val("");
		$("#tradeTime").val("");
		Common.jqGridReload(gridSelector, {
			payWay : $("#payWay").val(),
			status : $("#status").val(),
			merchantId : $("#merchantId").val(),
			devAccountDetailId : $("#devAccountDetailId").val(),
			tradeTime : $("#tradeTime").val()
		});
	});*/

	/**
	 * 删除
	 */
	$("#delete").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想删除的数据！", false);
			return false;
		}

		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

		Common.confirm("请确认是否要删除该回款记录？", function() {
			$.ajax({
				url : "delete",
				type : "post",
				data : {
					devAccountDetailId : rowData.devAccountDetailId,
					fingerprint : rowData.fingerprint
				},
				dataType : "json",
				success : function(json) {
					if (json.isSuccess) {
						Common.alert("回款记录删除成功！", true);
						Common.jqGridDeleteRow("grid-table", selectedRowsId);
					} else {
						Common.messageBox("提示", json.msg, false);
					}
				},
				error : function() {
					Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
				}
			});
		});
	});
	
	$("#distribution").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想分配的回款！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		location.href = "todistribution?devAccountDetailId="+rowData.devAccountDetailId+"&fingerprint="+rowData.fingerprint;
	});
	
	$("#seeDistribution").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想查看的回款！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		location.href = "todistributiondetail?devAccountDetailId="+rowData.devAccountDetailId+"&fingerprint="+rowData.fingerprint;
	});
	
	/** **************************************按钮事件 end *************************************** */
	
	/** ************************************** 未分配订单tab *************************************** */
	
	Common.initSelect2("borkerCompanyId", {
		width : "120px"
	});
	Common.initSelect2("storeId", {
		width : "120px"
	});
	Common.initSelect2("channelType", {
		width : "120px"
	});
	
	$("#query2").click(function() {
		query2("#orderGrid");
	});

	function query2(gridId) {
		var dialog = $("#condition2").removeClass('hide').dialog({
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
						customName : $("#customName").val(),
						brokerName : $("#brokerName").val(),
						orderInfoCode : $("#orderInfoCode").val(),
						borkerCompanyId : $("#borkerCompanyId").val(),
						storeId : $("#storeId").val(),
						channelType : $("#channelType").val(),
						brokerTel : $("#brokerTel").val()
					};
					$.ajax({
						url:"count2",
						type:"post",
						dataType:"json",
						data:params,
						success:function(data){
							$("#stayBackTotal2").text(data.stayBackTotal);
							$("#stayBackCount2").text(data.stayBackCount);
						}
					});
					Common.jqGridReload(gridId, params);
					$(this).dialog("close");
				}
			}, {
				text : "重置",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					$("#customName").val("");
					$("#brokerName").val("");
					$("#orderInfoCode").val("");
					$("#borkerCompanyId").select2("val", "");
					$("#storeId").select2("val", "");
					$("#channelType").select2("val", "");
					$("#brokerTel").val("");
				}
			} ]
		});
	}
	/** **************************************构造jqGrid start *************************************** */
	var click = 0;
	var gridSelector_2 = "#orderGrid";
	var pagerSelector_2 = "#orderPager";

	// 构造jqGrid配置信息
	$("#tab2").click(function() {
		if(click == 0){
			click = 1;
			var jqGridOption2 = new Common().createGridOption({
				pagerSelector : pagerSelector_2,
				gridSelector : gridSelector_2,
				parentDOMClass : "orderGrid",
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
					width : 160,
					sorttype : "string",
					editable : false,
					fixed : true
				}, {
					name : "packageType",
					index : "packageType",
					width : 100,
					sorttype : "string",
					editable : false,
					formatter : packageTypeFormatter,
					fixed : true
				}, {
					name : "customName",
					index : "customName",
					width : 80,
					sorttype : "string",
					editable : false,
					fixed : true
				}, {
					name : "channelType",
					index : "channelType",
					width : 80,
					sorttype : "int",
					editable : false,
					formatter : channelTypeFormatter,
					fixed : true
				}, {
					name : "brokerName",
					index : "brokerName",
					width : 80,
					sorttype : "string",
					editable : false,
					fixed : true
				}, {
					name : "brokerTel",
					index : "brokerTel",
					width : 120,
					sorttype : "string",
					editable : false,
					fixed : true
				}, {
					name : "brokerCompanyName",
					index : "brokerCompanyName",
					width : 200,
					sorttype : "string",
					editable : false,
					fixed : true
				}, {
					name : "storeName",
					index : "storeName",
					width : 200,
					sorttype : "string",
					editable : false,
					fixed : true
				}, {
					name : "projectPackageName",
					index : "projectPackageName",
					width : 160,
					sorttype : "string",
					editable : false,
					fixed : true
				}, {
					name : "house",
					index : "house",
					width : 120,
					sorttype : "string",
					editable : false,
					fixed : true
				}, {
					name : "onlineSignAmount",
					index : "onlineSignAmount",
					width : 100,
					sorttype : "string",
					editable : false,
					fixed : true
				}, {
					name : "recvDistAmount",
					index : "recvDistAmount",
					width : 100,
					sorttype : "string",
					editable : false,
					fixed : true
				}, {
					name : "realDistAmount",
					index : "realDistAmount",
					width : 100,
					sorttype : "int",
					editable : false,
					fixed : true
				}, {
					name : "notRecvDistAmount",
					index : "notRecvDistAmount",
					width : 100,
					sorttype : "int",
					editable : false,
					fixed : true
				}
				]
			});
			 // 渲染表格
            $(gridSelector_2).jqGrid(jqGridOption2);
            $(gridSelector_2).setGridWidth($(window).width() * 0.975);
		}else{
			Common.jqGridReload(gridSelector_2);
			$(gridSelector_2).setGridWidth($(window).width() * 0.975);
		}
	});

	

	/** **************************************构造jqGrid end *************************************** */

	/** **************************************按钮事件 start *************************************** */
	
	 /*点击刷新退款页面*/
    $("#tab2").click(function () {
        var params = {
			customName : $("#customName").val(),
			brokerName : $("#brokerName").val(),
			orderInfoCode : $("#orderInfoCode").val(),
			borkerCompanyId : $("#borkerCompanyId").val(),
			storeId : $("#storeId").val(),
			channelType : $("#channelType").val(),
			brokerTel : $("#brokerTel").val()
		};
		$.ajax({
			url:"count2",
			type:"post",
			dataType:"json",
			data:params,
			success:function(data){
				$("#stayBackTotal2").text(data.stayBackTotal);
				$("#stayBackCount2").text(data.stayBackCount);
			}
		});
		Common.jqGridReload("#orderGrid", params);
    });
    
	/**
	 * 导出
	 */
	$("#excelOrder").click(function() {
		var customName = $("#customName").val();
		var brokerName = $("#brokerName").val();
		var orderInfoCode = $("#orderInfoCode").val();
		var borkerCompanyId = $("#borkerCompanyId").val();
		var storeId = $("#storeId").val();
		var channelType = $("#channelType").val();
		var brokerTel = $("#brokerTel").val();
		
		location.href = "orderexcel?customName="+customName+"&brokerName="+brokerName+"&orderInfoCode="+orderInfoCode+"&borkerCompanyId="+
						borkerCompanyId+"&storeId="+storeId+"&channelType="+channelType+"&brokerTel="+brokerTel;
	});

	/**
	 * 跳转到查看页面
	 */
	$("#view").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector_2);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想查看的数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector_2, selectedRowsId);
		location.href = "todistributionorderdetail?orderInfoId="+rowData.orderInfoId+"&orderInfoCode="
			+rowData.orderInfoCode+"&recvDistAmount="+rowData.recvDistAmount+"&realDistAmount="+rowData.realDistAmount;
	});
	
	/**
	 * 重置
	 */
	/*$("#remove2").click(function() {
		$("#customName").val("");
		$("#brokerName").val("");
		$("#orderInfoCode").select2("val", "");
		$("#borkerCompanyId").select2("val", "");
		$("#storeId").select2("val", "");
		$("#channelType").val("");
		$("#brokerTel").val("");
		Common.jqGridReload(gridSelector_2, {
			customName : $("#customName").val(),
			brokerName : $("#brokerName").val(),
			orderInfoCode : $("#orderInfoCode").val(),
			borkerCompanyId : $("#borkerCompanyId").val(),
			storeId : $("#storeId").val(),
			channelType : $("#channelType").val(),
			brokerTel : $("#brokerTel").val()
		});
	});*/
	if(tab == 2){
        $("#tab2").click();
    }
});