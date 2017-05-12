$(function($) {
	// 初使化tab 选中
	if($("#activeTab").val()=="2"){
		$(".nav-tabs li:eq(1) a").trigger("click");
	}else{
		$(".nav-tabs").find("li:first").addClass("active");
		$(".tab-content").find("div:first").addClass("in").addClass("active");
	}
	
	//点击页签刷新
	$(".nav-tabs li:eq(0) a").click(function(){
		var params = {
			provinceId : $("#province1").val(),
			cityId : $("#city1").val(),
			keyword : $("#keyword1").val(),
			packageType : $("#packageType1").val(),
			project : $("#project1").val(),
			istosrc : $("#isToSrc1").val(),
			applyDate : $("#applyDate1").val(),
			auditDate : $("#auditDate1").val()	
		};
		$.ajax({
			url:"count1",
			type:"post",
			data:params,
			dataType:"json",
			success:function(data){
				$("#total1").text(data.total1);
				$("#total2").text(data.total1);
				$("#sum1").text(data.sum1==null?0:data.sum1);
			}
		});
		Common.jqGridReload("#grid-table1", params);
	});
	
	$(".nav-tabs li:eq(1) a").click(function(){
		var params = {
			provinceId : $("#province2").val(),
			cityId : $("#city2").val(),
			keyword : $("#keyword2").val(),
			packageType : $("#packageType2").val(),
			project : $("#project2").val(),
			istosrc : $("#isToSrc2").val(),
			applyDate : $("#applyDate2").val(),
			auditDate : $("#auditDate2").val(),
			paymentDate : $("#paymentDate2").val()
		};
		$.ajax({
			url:"count2",
			type:"post",
			dataType:"json",
			data:params,
			success:function(data){
				$("#refundAmount2").text(data.refundAmount2==null?0:data.refundAmount2);
				$("#feeRatio2").text(data.feeRatio2==null?0:data.feeRatio2);
			}
		});
		Common.jqGridReload("#grid-table2", params);
	});
	
	$('.date-range-picker').daterangepicker({
        applyClass : 'btn-sm btn-success',
        cancelClass : 'btn-sm btn-default',
        locale: {
            applyLabel: '确认',
            cancelLabel: '取消',
            fromLabel : '起始时间',
            toLabel : '结束时间',
            customRangeLabel : '自定义',
            firstDay : 1
        },
        ranges : {
            //'最近1小时': [moment().subtract('hours',1), moment()],
            '今日': [moment().startOf('day'), moment()],
            '昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
            '最近7日': [moment().subtract('days', 6), moment()],
            '最近30日': [moment().subtract('days', 29), moment()],
            '本月': [moment().startOf("month"),moment().endOf("month")],
            '上个月': [moment().subtract(1,"month").startOf("month"),moment().subtract(1,"month").endOf("month")]
        },
        opens : 'right',    // 日期选择框的弹出位置
        separator : ' 至 ',
        locale : {  
            applyLabel : '确定',  
            cancelLabel : '取消',  
            fromLabel : '起始时间',  
            toLabel : '结束时间',  
            customRangeLabel : '自定义',  
            daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
                    '七月', '八月', '九月', '十月', '十一月', '十二月' ],  
            firstDay : 1  
        },
        showWeekNumbers : true,     // 是否显示第几周
        format: 'YYYY-MM-DD'
 
    }, function(start, end, label) { // 格式化日期显示框
        $('#beginTime').val(start.format('YYYY-MM-DD'));
        $('#endTime').val(end.format('YYYY-MM-DD'));
    })
    .next().on('click', function(){
        $(this).prev().focus();
    });
	
	
	Common.initSelect2("packageType1", {
		width : "120px"
	});
	Common.initSelect2("project1", {
		width : "120px"
	});
	Common.initSelect2("isToSrc1", {
		width : "120px"
	});
	Common.initSelect2("province1", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	
	Common.initSelect2("city1", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	
	$("#query1").click(function() {
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
						provinceId : $("#province1").val(),
						cityId : $("#city1").val(),
						keyword : $("#keyword1").val(),
						packageType : $("#packageType1").val(),
						project : $("#project1").val(),
						istosrc : $("#isToSrc1").val(),
						applyDate : $("#applyDate1").val(),
						auditDate : $("#auditDate1").val()	
					};
					$.ajax({
						url:"count1",
						type:"post",
						data:params,
						dataType:"json",
						success:function(data){
							$("#total1").text(data.total1);
							$("#total2").text(data.total1);
							$("#sum1").text(data.sum1==null?0:data.sum1);
						}
					});
					Common.jqGridReload("#grid-table1", params);
					$(this).dialog("close");
				}
			},{
				text : "重置",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					$("#province1").select2("val", "");
					$("#city1").select2("val", "");
					$("#keyword1").val("");
					$("#packageType1").select2("val", "");
					$("#project1").select2("val", "");
					$("#isToSrc1").select2("val", "");
					$("#applyDate1").val("");
					$("#auditDate1").val("");
				}
			} ]
		});
	});

	/** **************************************构造jqGrid start *************************************** */
	var gridSelector1 = "#grid-table1";
	var pagerSelector1 = "#grid-pager1";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector1,
		gridSelector : gridSelector1,
		parentDOMClass : "col-sm-12",
		widthOffset : "25px",
		title : "待退款申请",
		url : "getnorefundgriddata?status=2",
		postData : {},
		multiSelect : true,
		height : '470px',
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '退款申请ID', '订单ID', '退款申请指纹', '订单指纹', '订单号', '套餐类型', '客户姓名', '客户手机号', '优惠告知书编号', '城市', 
		                  '项目', '产品套餐', '认购房源', '网签价格', '原卡原退', '申请人', '申请时间', '已收电商费', '审核人', '审核时间'],
		colModel : [ {
			name : "order_refund_apply_id",
			index : "order_refund_apply_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "order_info_id",
			index : "order_info_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "applyFingerprint",
			index : "applyFingerprint",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "orderFingerprint",
			index : "orderFingerprint",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "order_info_code",
			index : "order_info_code",
			width : 160,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "package_type",
			index : "package_type",
			width : 100,
			sorttype : "string",
			editable : false,
			formatter : packageTypeFormatter,
			fixed : true
		}, {
			name : "custom_name",
			index : "custom_name",
			width : 80,
			sorttype : "int",
			editable : false,
			fixed : true
		}, {
			name : "custom_tel",
			index : "custom_tel",
			width : 120,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "cheap_code",
			index : "cheap_code",
			width : 140,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "city_name",
			index : "city_name",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "project_info_name",
			index : "project_info_name",
			width : 240,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "project_package_name",
			index : "project_package_name",
			width : 120,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "house",
			index : "house",
			width : 100,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "online_sign_amount",
			index : "online_sign_amount",
			width : 100,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "is_to_src",
			index : "is_to_src",
			width : 60,
			sorttype : "string",
			editable : false,
			formatter : isToSrcFormatter,
			fixed : true
		}, {
			name : "applyname",
			index : "applyname",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "create_time",
			index : "create_time",
			width : 140,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "refund_eb_amount",
			index : "refund_eb_amount",
			width : 120,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "auditorname",
			index : "auditorname",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "audit_time",
			index : "audit_time",
			width : 140,
			sorttype : "string",
			editable : false,
			fixed : true
		}]
	});

	// 选中行事件
	jqGridOption.onSelectRow = function(rowIndex, status) {
		var rowData = $(gridSelector1).getRowData(rowIndex);
	};

	// 渲染表格
	$(gridSelector1).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */

	/** **************************************按钮事件 start *************************************** */
	
	/**
	 * 导出
	 */
	$("#excel1").click(function() {
		var provinceId = $("#province1").val();
		var cityId = $("#city1").val();
		var keyword = $("#keyword1").val();
		var packageType = $("#packageType1").val();
		var project = $("#project1").val();
		var istosrc = $("#isToSrc1").val();
		var applyDate = $("#applyDate1").val();
		var auditDate = $("#auditDate1").val();
		
		location.href = "norefundexcel?provinceId="+provinceId+"&cityId="+cityId+"&keyword="+keyword+"&packageType="+packageType+
						"&project="+project+"&istosrc="+istosrc+"&applyDate="+applyDate+"&auditDate="+auditDate;
	});
	

	$("#refundSure1").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRows(gridSelector1);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你确认退款的申请！", false);
			return false;
		}
		if (selectedRowsId.length > 1) {
			Common.messageBox("提示", "最多选择一条数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector1, selectedRowsId);
		location.href = "torefundsure?orderInfoId="+rowData.order_info_id+"&orderFingerprint="+rowData.orderFingerprint
						+"&orderRefundApplyId="+rowData.order_refund_apply_id+"&applyFingerprint="+rowData.applyFingerprint;
	});
	
	$("#allSure1").click(function(){
		var selectedRows = Common.jqGridGetSelectedRows(gridSelector1);
		if (Common.isEmpty(selectedRows) || selectedRows.length <= 0) {
			Common.messageBox("提示", "请选择你想操作的数据！", false);
			return false;
		}
		
		Common.confirm("你在操作"+selectedRows.length+"笔订单的批量退款支付操作<br>您已经确认无误了嘛？",function(){
			var orderRefundApplyId = "";
            for(var i = 0,j = selectedRows.length;i<j;i++){
            	var rowData = Common.jqGridGetRowData(gridSelector1, selectedRows[i]);
            	if(i==j-1){
            		orderRefundApplyId += rowData.order_refund_apply_id;
            	}else{
            		orderRefundApplyId += rowData.order_refund_apply_id+",";
            	}
            }
			$.ajax({
                url: "batchapply?orderRefundApplyId="+orderRefundApplyId,
                type: "post",
                dataType: "json",
                success: function (json) {
                	Common.confirm(json.msg,function(){
                		Common.jqGridReload("grid-table1");
                	});
                }
            });
		});
	});
	
	/** **************************************按钮事件 end *************************************** */
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	Common.initSelect2("packageType2", {
		width : "120px"
	});
	Common.initSelect2("project2", {
		width : "120px"
	});
	Common.initSelect2("isToSrc2", {
		width : "120px"
	});
	Common.initSelect2("province2", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	
	Common.initSelect2("city2", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	
	$("#query2").click(function() {
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
						provinceId : $("#province2").val(),
						cityId : $("#city2").val(),
						keyword : $("#keyword2").val(),
						packageType : $("#packageType2").val(),
						project : $("#project2").val(),
						istosrc : $("#isToSrc2").val(),
						applyDate : $("#applyDate2").val(),
						auditDate : $("#auditDate2").val(),
						paymentDate : $("#paymentDate2").val()
					};
					$.ajax({
						url:"count2",
						type:"post",
						dataType:"json",
						data:params,
						success:function(data){
							$("#refundAmount2").text(data.refundAmount2==null?0:data.refundAmount2);
							$("#feeRatio2").text(data.feeRatio2==null?0:data.feeRatio2);
						}
					});
					Common.jqGridReload("#grid-table2", params);
					$(this).dialog("close");
				}
			},{
				text : "重置",
				"class" : "btn btn-primary btn-xs",
				click : function(){
					$("#province2").select2("val", "");
					$("#city2").select2("val", "");
					$("#keyword2").val("");
					$("#packageType2").select2("val", "");
					$("#project2").select2("val", "");
					$("#isToSrc2").select2("val", "");
					$("#applyDate2").val("");
					$("#auditDate2").val("");
					$("#paymentDate2").val("");
				}
			} ]
		});
	});

	
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector2 = "#grid-table2";
	var pagerSelector2 = "#grid-pager2";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector2,
		gridSelector : gridSelector2,
		parentDOMClass : "col-sm-12",
		widthOffset : "25px",
		title : "已退款申请",
		url : "getrefundgriddata?status=3",
		postData : {},
		multiSelect : false,
		height : '485px',
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '退款申请ID', '订单ID', '退款申请指纹', '订单指纹', '订单号', '订单类型', '客户姓名', '客户手机号', '优惠告知书编号', '城市', 
		                  '项目', '产品套餐', '认购房源', '网签价格', '原卡原退', '申请人', '申请时间', '已收电商费', '审核人', '审核时间', '打款人', '打款时间'],
		colModel : [ {
			name : "order_refund_apply_id",
			index : "order_refund_apply_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "order_info_id",
			index : "order_info_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "applyFingerprint",
			index : "applyFingerprint",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "orderFingerprint",
			index : "orderFingerprint",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "order_info_code",
			index : "order_info_code",
			width : 160,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "package_type",
			index : "package_type",
			width : 100,
			sorttype : "string",
			editable : false,
			formatter : packageTypeFormatter,
			fixed : true
		}, {
			name : "custom_name",
			index : "custom_name",
			width : 80,
			sorttype : "int",
			editable : false,
			fixed : true
		}, {
			name : "custom_tel",
			index : "custom_tel",
			width : 120,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "cheap_code",
			index : "cheap_code",
			width : 120,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "city_name",
			index : "city_name",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "project_info_name",
			index : "project_info_name",
			width : 240,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "project_package_name",
			index : "project_package_name",
			width : 120,
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
			name : "online_sign_amount",
			index : "online_sign_amount",
			width : 120,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "is_to_src",
			index : "is_to_src",
			width : 60,
			sorttype : "string",
			editable : false,
			formatter : isToSrcFormatter,
			fixed : true
		}, {
			name : "applyname",
			index : "applyname",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "create_time",
			index : "create_time",
			width : 140,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "refund_eb_amount",
			index : "refund_eb_amount",
			width : 120,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "auditorname",
			index : "auditorname",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "audit_time",
			index : "audit_time",
			width : 140,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "payment",
			index : "payment",
			width : 120,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "paymenttime",
			index : "paymenttime",
			width : 140,
			sorttype : "string",
			editable : false,
			fixed : true
		}]
	});

	// 选中行事件
	jqGridOption.onSelectRow = function(rowIndex, status) {
		var rowData = $(gridSelector2).getRowData(rowIndex);
	};

	// 渲染表格
	$(gridSelector2).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */

	/** **************************************按钮事件 start *************************************** */
	
	/**
	 * 导出
	 */
	$("#excel2").click(function() {
		var provinceId = $("#province2").val();
		var cityId = $("#city2").val();
		var keyword = $("#keyword2").val();
		var packageType = $("#packageType2").val();
		var project = $("#project2").val();
		var istosrc = $("#isToSrc2").val();
		var applyDate = $("#applyDate2").val();
		var auditDate = $("#auditDate2").val();
		var paymentDate = $("#paymentDate2").val();
		
		location.href = "haverefundexcel?provinceId="+provinceId+"&cityId="+cityId+"&keyword="+keyword+"&packageType="+packageType+
						"&project="+project+"&istosrc="+istosrc+"&applyDate="+applyDate+"&auditDate="+auditDate+"&paymentDate="+paymentDate;
	});
	

	/**
	 * 跳转到查看页面
	 */
	$("#view2").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector2);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想查看的数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector2, selectedRowsId);
		location.href = "show?orderInfoId="+rowData.order_info_id+"&orderFingerprint="+rowData.orderFingerprint
		+"&orderRefundApplyId="+rowData.order_refund_apply_id+"&applyFingerprint="+rowData.applyFingerprint;
	});
	
	/** **************************************按钮事件 end *************************************** */
	
	
	
	
	
});