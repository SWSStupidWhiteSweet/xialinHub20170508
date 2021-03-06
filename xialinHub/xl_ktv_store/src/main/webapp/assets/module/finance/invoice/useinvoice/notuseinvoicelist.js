$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";
	//var tag=$("#tag").val();
	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "未领用发票列表",
		url : "getnotuseinvoicelist",
		postData : {},
		multiSelect : false,
		height : "500px",
		colNamesArray : ['发票ID','指纹','订单ID', '订单编号', '发票票号','发票代码', '发票金额', '发票内容', '开具时间', '关联客户姓名', '客户电话', '认筹金额', '优惠告知书编号'],
		colModel : [  {
			name : "invoiceId",
			index : "invoice_id",
			width : 170,
			sorttype : "string",
			editable : false,
			hidden : true
		},{
			name : "fingerprint",
			index : "fingerprint",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		},{
			name : "orderInfoId",
			index : "order_info_id",
			width : 170,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "orderInfoCode",
			index : "order_info_code",
			width : 170,
			sorttype : "string",
			editable : false
		}, {
			name : "invoiceNumber",
			index : "invoice_number",
			width : 170,
			sorttype : "string",
			editable : false
		}, {
			name : "invoiceCode",
			index : "invoice_code",
			width : 170,
			sorttype : "string",
			editable : false
		}, {
			name : "invoiceAmount",
			index : "invoice_amount",
			width : 170,
			sorttype : "string",
			editable : false
		}, {
			name : "invoiceContent",
			index : "invoice_content",
			width : 170,
			sorttype : "string",
			editable : false
		}, {
			name : "invoiceTime",
			index : "invoice_time",
			width : 170,
			sorttype : "string",
			editable : false
		}, {
			name : "customName",
			index : "custom_name",
			width : 170,
			sorttype : "string",
			editable : false
		}, {
			name : "customTel",
			index : "custom_tel",
			width : 170,
			sorttype : "string",
			editable : false
		}, {
			name : "groupFee",
			index : "group_fee",
			width : 170,
			sorttype : "string",
			editable : false
		}, {
			name : "cheapCode",
			index : "cheap_code",
			width : 170,
			sorttype : "string",
			editable : false
		}]
	});

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */

	/** **************************************按钮事件 start *************************************** */
	
	//搜索条件
	$("#options").click(function() {
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
					params={
							customName : $("#customName").val(),
							orderInfoCode : $("#orderInfoCode").val(),
							cheapCode : $("#cheapCode").val(),
							invoiceNumber : $("#invoiceNumber").val(),
							startDate : $("#startDate").val(),
							endDate : $("#endDate").val(),
							invoiceCode : $("#invoiceCode").val(),
							customTel : $("#customTel").val()
					};
					Common.jqGridReload(gridSelector,{data:JSON.stringify(params)});
					$(this).dialog("close");
				}
			},{
				text : "重置",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					$("#customName").val("");
					$("#orderInfoCode").val("");
					$("#cheapCode").val("");
					$("#invoiceNumber").val("");
					$("#startDate").val("");
					$("#endDate").val("");
					$("#invoiceCode").val("");
					$("#customTel").val("");
				}
			} ]
		});
	});
	
	//导出未领用数据
    $("#export").click(function(){
    	params={
				customName : $("#customName").val(),
				orderInfoCode : $("#orderInfoCode").val(),
				cheapCode : $("#cheapCode").val(),
				invoiceNumber : $("#invoiceNumber").val(),
				startDate : $("#startDate").val(),
				endDate : $("#endDate").val(),
				invoiceCode : $("#invoiceCode").val(),
				customTel : $("#customTel").val()
		};
    	location.href="notuseinvoiceexport?mark=4&&data="+JSON.stringify(params);
    });
    
	/*跳转到领用发票页面*/
    $("#receiveInvoice").click(function() {
        var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条你想领用的数据！", false);
            return false;
        }
        
        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
        
        var params={
				customName : rowData.customName,
				orderInfoCode :rowData.orderInfoCode,
				cheapCode :rowData.cheapCode,
				invoiceId:rowData.invoiceId,
				groupFee : rowData.groupFee,
				invoiceAmount :rowData.invoiceAmount,
				customTel:rowData.customTel,
				invoiceContent:rowData.invoiceContent,
				invoiceTime:rowData.invoiceTime,
				fingerprint:rowData.fingerprint
			};
	    window.parent.location.href="editreceiveinvoice?data="+JSON.stringify(params);
    });
	
	/** **************************************按钮事件 end *************************************** */
});