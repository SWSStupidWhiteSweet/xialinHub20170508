$(function($) {
	
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
			borkerCompanyId : $("#borkerCompanyId1").val(),
			auditDate : $("#auditDate1").val()
		};
		$.ajax({
			url:"count",
			type:"post",
			dataType:"json",
			data:params,
			success:function(data){
				$("#total_count").text(data.total1.total_count);
				$("#total_amount").text(data.total1.total_amount);
			}
		});
		Common.jqGridReload("#grid-table1", params);
	});
	
	$(".nav-tabs li:eq(1) a").click(function(){
		Common.jqGridReload("#grid-table2", {
			provinceId : $("#province2").val(),
			cityId : $("#city2").val(),
			keyword : $("#keyword2").val(),
			borkerCompanyId : $("#borkerCompanyId2").val(),
			auditDate : $("#auditDate2").val(),
			completeDate : $("#completeDate2").val()
		});
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
	
	
	Common.initSelect2("borkerCompanyId1", {
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
						borkerCompanyId : $("#borkerCompanyId1").val(),
						auditDate : $("#auditDate1").val()
					};
					$.ajax({
						url:"count",
						type:"post",
						dataType:"json",
						data:params,
						success:function(data){
							$("#total_count").text(data.total1.total_count);
							$("#total_amount").text(data.total1.total_amount);
						}
					});
					Common.jqGridReload("#grid-table1", params);
					$(this).dialog("close");
				}
			}, {
				text : "重置",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					$("#province1").select2("val", "");
					$("#city1").select2("val", "");
					$("#keyword1").val("");
					$("#borkerCompanyId1").select2("val", "");
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
		title : "待支付结佣",
		url : "paycommissiongetgriddata",
		postData : {},
		multiSelect : false,
		height : '485px',
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '请佣申请单ID', '请佣申请单编号', '所属城市', '结佣公司', '结佣门店', '结算账号', '佣金金额', '审批完成时间'],
		colModel : [ {
			name : "brokerage_apply_id",
			index : "brokerage_apply_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "brokerage_apply_code",
			index : "brokerage_apply_code",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "city_name",
			index : "city_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "broker_company_name",
			index : "broker_company_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "store_name",
			index : "store_name",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "brokerage_object_account",
			index : "brokerage_object_account",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "brokerage_total_amount",
			index : "brokerage_total_amount",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "finalAuditTime",
			index : "finalAuditTime",
			width : 60,
			sorttype : "string",
			editable : false
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
		var borkerCompanyId = $("#borkerCompanyId1").val();
		var auditDate = $("#auditDate1").val();
		
		location.href = "paycommissionexcel?provinceId="+provinceId+"&cityId="+cityId+"&keyword="+keyword+"&borkerCompanyId="+
						borkerCompanyId+"&auditDate="+auditDate;
	});
	
	/**
	 * 重置
	 */
	/*$("#remove1").click(function() {
		$("#province1").select2("val", "");
		$("#city1").select2("val", "");
		$("#keyword1").val("");
		$("#borkerCompanyId1").select2("val", "");
		$("#auditDate1").val("");
		Common.jqGridReload(gridSelector1, {
			provinceId : $("#province1").val(),
			cityId : $("#city1").val(),
			keyword : $("#keyword1").val(),
			packageType : $("#borkerCompanyId1").val(),
			auditDate : $("#auditDate1").val()
		});
	});*/
	
	$("#pay1").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector1);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector1, selectedRowsId);
		location.href = "payindex?brokerageApplyId="+rowData.brokerage_apply_id;
	});
	
	
	/** **************************************按钮事件 end *************************************** */
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	Common.initSelect2("borkerCompanyId2", {
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

					Common.jqGridReload("#grid-table2", {
						provinceId : $("#province2").val(),
						cityId : $("#city2").val(),
						keyword : $("#keyword2").val(),
						borkerCompanyId : $("#borkerCompanyId2").val(),
						auditDate : $("#auditDate2").val(),
						completeDate : $("#completeDate2").val()
					});

					$(this).dialog("close");
				}
			}, {
				text : "重置",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					$("#province2").select2("val", "");
					$("#city2").select2("val", "");
					$("#keyword2").val("");
					$("#borkerCompanyId2").select2("val", "");
					$("#auditDate2").val("");
					$("#completeDate2").val("");
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
		title : "已支付结佣",
		url : "paycommedgetgriddata",
		postData : {},
		multiSelect : false,
		height : '500px',
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '请佣申请单ID', '请佣申请单编号', '所属城市', '结佣公司', '结佣门店', '结算账号', '佣金金额', '审批完成时间', '完成打款时间'],
		colModel : [ {
			name : "brokerage_apply_id",
			index : "brokerage_apply_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "brokerage_apply_code",
			index : "brokerage_apply_code",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "city_name",
			index : "city_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "broker_company_name",
			index : "broker_company_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "store_name",
			index : "store_name",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "brokerage_object_account",
			index : "brokerage_object_account",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "brokerage_total_amount",
			index : "brokerage_total_amount",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "finalAuditTime",
			index : "finalAuditTime",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "completeTime",
			index : "completeTime",
			width : 60,
			sorttype : "string",
			editable : false
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
		var borkerCompanyId = $("#borkerCompanyId2").val();
		var auditDate = $("#auditDate2").val();
		var completeDate = $("#completeDate2").val();
		
		location.href = "paycommdeexcel?provinceId="+provinceId+"&cityId="+cityId+"&keyword="+keyword+"&borkerCompanyId="+borkerCompanyId+
						"&auditDate="+auditDate+"&completeDate="+completeDate;
	});

	/**
	 * 重置
	 */
	/*$("#remove2").click(function() {
		$("#province2").select2("val", "");
		$("#city2").select2("val", "");
		$("#keyword2").val("");
		$("#borkerCompanyId2").select2("val", "");
		$("#auditDate2").val("");
		$("#completeDate2").val("");
		
		Common.jqGridReload(gridSelector2, {
			provinceId : $("#province2").val(),
			cityId : $("#city2").val(),
			keyword : $("#keyword2").val(),
			packageType : $("#borkerCompanyId2").val(),
			auditDate : $("#auditDate2").val(),
			completeDate : $("#completeDate2").val()
		});
	});*/
	
	$("#show2").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector2);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector2, selectedRowsId);
		location.href = "show?brokerageApplyId="+rowData.brokerage_apply_id;
	});
	
	
	/** **************************************按钮事件 end *************************************** */
});