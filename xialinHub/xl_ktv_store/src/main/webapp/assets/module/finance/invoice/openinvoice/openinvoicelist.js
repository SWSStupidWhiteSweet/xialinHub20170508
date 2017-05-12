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
		title : "已开发票列表",
		url : "getopeninvoicelist",
		postData : {},
		multiSelect : false,
		height : "500px",
		sortName : "custom_name",
		sortOrder : "desc",
		colNamesArray : ['发票ID','指纹','订单ID', '订单编号', '关联客户姓名','认筹金额', '优惠告知书编号','发票票号','发票代码','发票类型','发票金额','发票开具时间','发票内容','付款方','房号'],
		colModel : [{
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
			name : "customName",
			index : "custom_name",
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
			name : "invoiceTypeLabel",
			index : "invoice_type_label",
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
			name : "invoiceTime",
			index : "invoice_time",
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
			name : "invoiceTitle",
			index : "invoice_title",
			width : 170,
			sorttype : "string",
			editable : false
		}, {
			name : "houseNumber",
			index : "house_number",
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
					var params={
							customName : $("#customName").val(),
							orderInfoCode : $("#orderInfoCode").val(),
							cheapCode : $("#cheapCode").val(),
							invoiceType :$("input:radio:checked").val(),
							invoiceNumber : $("#invoiceNumber").val(),
							startDate : $("#startDate").val(),
							endDate : $("#endDate").val(),
							invoiceCode : $("#invoiceCode").val(),
							cancelStartDate : $("#cancelStartDate").val(),
							cancelEndDate : $("#cancelEndDate").val(),
							cancelOperatorName : $("#cancelOperatorName").val(),
							invoiceTitle : $("#invoiceTitle").val()
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
					$("#cancelStartDate").val("");
					$("#cancelEndDate").val("");
					$("#cancelOperatorName").val("");
					$("#invoiceTitle").val("");
				}
			} ]
		});
	});
	
	//导出
    $("#export").click(function(){
    	var params={
				customName : $("#customName").val(),
				orderInfoCode : $("#orderInfoCode").val(),
				cheapCode : $("#cheapCode").val(),
				invoiceType :$("input:radio:checked").val(),
				invoiceNumber : $("#invoiceNumber").val(),
				startDate : $("#startDate").val(),
				endDate : $("#endDate").val(),
				invoiceCode : $("#invoiceCode").val(),
				cancelStartDate : $("#cancelStartDate").val(),
				cancelEndDate : $("#cancelEndDate").val(),
				cancelOperatorName : $("#cancelOperatorName").val(),
				invoiceTitle : $("#invoiceTitle").val()
			};
    	location.href="openinvoiceexport?mark=2&&data="+JSON.stringify(params);
    });
    
    
	/*作废发票*/
    $("#receiveInvoice").click(function() {
        var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条你想作废的数据！", false);
            return false;
        }

        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
        
        Common.confirm("请确认是否作废该条数据？", function(){
            $.ajax({
                url : "invalidbyupdate",
                type : "post",
                data : {
                	invoiceId : rowData.invoiceId,
                	fingerprint:rowData.fingerprint
                },
                dataType : "json",
                success : function(json) {
                    if (json.isSuccess) {
                        Common.messageBox("提示", "作废成功！", true);
                        Common.jqGridReload(gridSelector);
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
    
    /*跳转到回收发票页面*/
	$("#receiveRegain").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想回收的数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		var params={
				customName : rowData.customName,
				orderInfoCode :rowData.orderInfoCode,
				cheapCode :rowData.cheapCode,
				invoiceId:rowData.invoiceId,
				invoiceNumber :rowData.invoiceNumber,
				groupFee : rowData.groupFee,
				invoiceAmount :rowData.invoiceAmount,
				fingerprint:rowData.fingerprint
			};
		
	    window.parent.location.href="editreceiveregain?position=openInvoice&data="+JSON.stringify(params);
	});
	
	/** **************************************按钮事件 end *************************************** */
});