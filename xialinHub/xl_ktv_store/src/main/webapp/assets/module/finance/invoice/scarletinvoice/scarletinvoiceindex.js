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
		title : "已开红字发票列表",
		url : "getscarletinvoicelist",
		postData : {},
		multiSelect : false,
		height : "500px",
		sortName : "custom_name",
		sortOrder : "desc",
		colNamesArray : ['订单ID', '订单编号', '关联客户姓名','认筹金额', '优惠告知书编号','发票开具时间','发票票号','发票代码','发票金额','发票内容','付款方','房号'],
		colModel : [{
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
		},{
			name : "invoiceTime",
			index : "invoice_time",
			width : 170,
			sorttype : "string",
			editable : false
		},{
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
		},{
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
	/*跳转到添加红字发票页面*/
	$("#addScarlet").click(function() {
		location.href="addscarlet";
	});
	
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
					$("#invoiceTitle").val("");
					$("#invoiceCode").val("");
				}
			} ]
		});
	});
	
	//导出
    $("#export").click(function(){
    	params={
				customName : $("#customName").val(),
				orderInfoCode : $("#orderInfoCode").val(),
				cheapCode : $("#cheapCode").val(),
				invoiceNumber : $("#invoiceNumber").val(),
				startDate : $("#startDate").val(),
				endDate : $("#endDate").val(),
				invoiceCode : $("#invoiceCode").val(),
				invoiceTitle : $("#invoiceTitle").val()
		};
    	location.href="scarletexport?mark=8&&data="+JSON.stringify(params);
    });
    
	
	/** **************************************按钮事件 end *************************************** */
});