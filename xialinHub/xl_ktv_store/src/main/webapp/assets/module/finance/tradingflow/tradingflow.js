$(function($) {
	// 初使化tab 选中
	if($("#activeTab").val()=="2"){
		$(".nav-tabs li:eq(1) a").trigger("click");
	}else if($("#activeTab").val()=="4"){
		$(".nav-tabs li:eq(3) a").trigger("click");
	}else{
		$(".nav-tabs").find("li:first").addClass("active");
		$(".tab-content").find("div:first").addClass("in").addClass("active");
	}
	
	//点击页签刷新
	$(".nav-tabs li:eq(0) a").click(function(){
    	var to_date = $("#to_date1").val();
    	var to_dates = to_date.split(" 至 ");
    	var to_start_date = to_date==""?"":to_dates[0];
    	var to_end_date = to_date==""?"":to_dates[1];
        var params = {
        		province_id : $("#province_id1").val(),
        		city_id : $("#city_id1").val(),
				create_src : $("#create_src1").val(),
				channel_type : $("#channel_type1").val(),
				eb_account_detail_type : $("#eb_account_detail_type1").val(),
				is_start : $("#is_start1").val(),
				to_start_date : to_start_date,
				to_end_date : to_end_date,
				project_info_id : $("#project_info_id1").val()
        };
        $.ajax({
			type:"post",
			url:"relatedposrecords_count",
			datatype:"json",
			data:params,
			success:function(data){
				$("#group_count").text(data.group_count);
				$("#group_fee_count").text(data.group_fee_count);
				$("#eb_count").text(data.eb_count);
				$("#eb_amount_count").text(data.eb_amount_count);
				$("#eb_amount_fee_count").text(data.eb_amount_fee_count);
			}
		});
        Common.jqGridReload("grid-table1", params);
	});
	
	$(".nav-tabs li:eq(1) a").click(function(){
		var to_date = $("#to_date2").val();
    	var to_dates = to_date.split(" 至 ");
    	var to_start_date = to_date==""?"":to_dates[0];
    	var to_end_date = to_date==""?"":to_dates[1];
        var params = {
        		create_src : $("#create_src2").val(),
				eb_account_detail_type : $("#eb_account_detail_type2").val(),
				is_start : $("#is_start2").val(),
				pay_account_type : $("#pay_account_type2").val(),
				pos_terminal_code : $("#pos_terminal_code2").val(),
				trade_ref_code : $("#trade_ref_code2").val(),
				to_start_date : to_start_date,
				to_end_date : to_end_date
        };
        $.ajax({
			type:"post",
			url:"unrelatedposrecordscount",
			datatype:"json",
			data:params,
			success:function(data){
				$("#eb_count2").text(data.eb_count);
				$("#eb_amount_count2").text(data.eb_amount_count);
				$("#eb_amount_fee_count2").text(data.eb_amount_fee_count);
			}
		});
        Common.jqGridReload("grid-table2", params);
	});
	
	$(".nav-tabs li:eq(2) a").click(function(){
		var to_date = $("#to_date3").val();
    	var to_dates = to_date.split(" 至 ");
    	var to_start_date = to_date==""?"":to_dates[0];
    	var to_end_date = to_date==""?"":to_dates[1];
    	
    	var can_date = $("#can_date3").val();
    	var can_dates = can_date.split(" 至 ");
    	var can_start_date = can_date==""?"":can_dates[0];
    	var can_end_date = can_date==""?"":can_dates[1];
        var params = {
        		province_id : $("#province_id3").val(),
        		city_id : $("#city_id3").val(),
				create_src : $("#create_src3").val(),
				eb_account_detail_type : $("#eb_account_detail_type3").val(),
				is_start : $("#is_start3").val(),
				to_start_date : to_start_date,
				to_end_date : to_end_date,
				can_start_date : can_start_date,
				can_end_date : can_end_date,
				pos_terminal_code : $("#pos_terminal_code3").val(),
				trade_ref_code : $("#trade_ref_code3").val()
        };
        $.ajax({
			type:"post",
			url:"canrelatedposrecordsdatacount",
			datatype:"json",
			data:params,
			success:function(data){
				$("#eb_amount_count3").text(data.eb_amount_count);
				$("#eb_count3").text(data.eb_count);
			}
		});
        Common.jqGridReload("canRelatedPosRecordsGrid", params);
	});
	
	$(".nav-tabs li:eq(3) a").click(function(){
		var to_date = $("#to_date4").val();
    	var to_dates = to_date.split(" 至 ");
    	var to_start_date = to_date==""?"":to_dates[0];
    	var to_end_date = to_date==""?"":to_dates[1];
        var params = {
        		province_id : $("#province_id4").val(),
        		city_id : $("#city_id4").val(),
				create_src : $("#create_src4").val(),
				channel_type : $("#channel_type4").val(),
				eb_account_detail_type : $("#eb_account_detail_type4").val(),
				is_start : $("#is_start4").val(),
				pay_account_type : $("#pay_account_type4").val(),
				to_start_date : to_start_date,
				to_end_date : to_end_date,
				pos_terminal_code : $("#pos_terminal_code4").val(),
				custom_name : $("#custom_name4").val(),
				order_info_code : $("#order_info_code4").val(),
				trade_ref_code : $("#trade_ref_code4").val(),
				cheap_code : $("#cheap_code4").val()
        };
        $.ajax({
			type:"post",
			url:"errorrelatedposrecordsdatacount",
			datatype:"json",
			data:params,
			success:function(data){
				$("#group_count4").text(data.group_count);
				$("#group_fee_count4").text(data.group_fee_count);
				$("#eb_count4").text(data.eb_count);
				$("#eb_amount_count4").text(data.eb_amount_count);
				$("#eb_amount_fee_count4").text(data.eb_amount_fee_count);
			}
		});
        Common.jqGridReload("errorRelatedPosRecordsGrid", params);
	});
	
	// 初使化combo
	Common.initSelect2("create_src1", {
		width : "100px"
	});
	Common.initSelect2("eb_account_detail_type1", {
		width : "100px"
	});
	Common.initSelect2("is_start1", {
		width : "100px"
	});
	Common.initSelect2("channel_type1", {
		width : "100px"
	});
	
	Common.initSelect2("province_id1", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	
	Common.initSelect2("city_id1", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	
	Common.initSelect2("building_project_id1", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	
	Common.initSelect2("project_info_id1", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector1 = "#grid-table1";
	var pagerSelector1 = "#grid-pager1";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector1,
		gridSelector : gridSelector1,
		parentDOMClass : "col-sm-12",
		title : "已关联刷卡流水",
		url : "getgriddata1",
		widthOffset : "25px",
		postData : {},
		multiSelect : false,
		height : "485px",
		sortName : "create_time",
		sortOrder : "desc",
		
		colNamesArray : [ '城市', '项目', 'POS机类型', '终端号', '刷卡时间', '开户行', '刷卡银行卡号', '卡片类型', '刷卡金额', '刷卡手续费', 
		                  '交易参考号', '订单编号', '客户信息', '渠道', '订单金额', '优惠告知书编号', '订单状态', '成交审核状态', '来源'],
		colModel : [{
			name : "city_name",
			index : "city_name",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "project_info_name",
			index : "project_info_name",
			width : 180,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "eb_account_detail_type",
			index : "eb_account_detail_type",
			width : 80,
			sorttype : "string",
			editable : false,
			formatter : eb_account_detail_typeFormatter,
			fixed : true
		}, {
			name : "pos_terminal_code",
			index : "pos_terminal_code",
			width : 140,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "trade_time",
			index : "trade_time",
			width : 140,
			sorttype : "string",
			editable : false,
			formatter : dateTimeFormatter,
			fixed : true
		}, {
			name : "pay_bank_name",
			index : "pay_bank_name",
			width : 120,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "pay_account_number",
			index : "pay_account_number",
			width : 160,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "pay_account_type",
			index : "pay_account_type",
			width : 80,
			sorttype : "string",
			editable : false,
			formatter : pay_account_typeFormatter,
			fixed : true
		}, {
			name : "eb_amount",
			index : "eb_amount",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "eb_amount_fee",
			index : "eb_amount_fee",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "trade_ref_code",
			index : "trade_ref_code",
			width : 120,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "order_info_code",
			index : "order_info_code",
			width : 150,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "custom_name",
			index : "custom_name",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "channel_type",
			index : "channel_type",
			width : 60,
			sorttype : "string",
			editable : false,
			formatter : channel_typeFormatter,
			fixed : true
		}, {
			name : "group_fee",
			index : "group_fee",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "cheap_code",
			index : "cheap_code",
			width : 100,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "order_status",
			index : "order_status",
			width : 60,
			sorttype : "string",
			editable : false,
			formatter : orderStatusFormatter111,
			fixed : true
		}, {
			name : "audit_status",
			index : "audit_status",
			width : 60,
			sorttype : "int",
			editable : false,
			formatter : audit_statusFormatter,
			fixed : true
		}, {
			name : "create_src",
			index : "create_src",
			width : 60,
			sorttype : "string",
			editable : false,
			formatter : create_srcFormatter,
			fixed : true
		}]
	});

	// 渲染表格
	$(gridSelector1).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */

	/** **************************************按钮事件 start *************************************** */

	/**
	 * 条件查询
	 */
	$('#search1').click(function () {
        var dialog = $("#condition1").removeClass('hide')
            .dialog(
                {
                    modal : true,
                    title : "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-search'></i> 请选择查询条件</h4></div>",
                    title_html : true,
                    width : "700px",
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
                        	var to_date = $("#to_date1").val();
                        	var to_dates = to_date.split(" 至 ");
                        	var to_start_date = to_date==""?"":to_dates[0];
                        	var to_end_date = to_date==""?"":to_dates[1];
                            var params = {
                            		province_id : $("#province_id1").val(),
                            		city_id : $("#city_id1").val(),
                    				create_src : $("#create_src1").val(),
                    				channel_type : $("#channel_type1").val(),
                    				eb_account_detail_type : $("#eb_account_detail_type1").val(),
                    				is_start : $("#is_start1").val(),
                    				to_start_date : to_start_date,
                    				to_end_date : to_end_date,
                    				project_info_id : $("#project_info_id1").val()
                            };
                            $.ajax({
                    			type:"post",
                    			url:"relatedposrecords_count",
                    			datatype:"json",
                    			data:params,
                    			success:function(data){
                    				$("#group_count").text(data.group_count);
                    				$("#group_fee_count").text(data.group_fee_count);
                    				$("#eb_count").text(data.eb_count);
                    				$("#eb_amount_count").text(data.eb_amount_count);
                    				$("#eb_amount_fee_count").text(data.eb_amount_fee_count);
                    			}
                    		});
                            Common.jqGridReload("grid-table1", params);
                            $(this).dialog("close");
                        }
                    } ,{
                    	text : "重置",
                        "class" : "btn btn-primary btn-xs",
                        click : function(){
                        	$("#province_id1").select2("val","");
                        	$("#province_id1").trigger("change");
                        	$("#create_src1").select2("val","");
                        	$("#channel_type1").select2("val","");
                        	$("#eb_account_detail_type1").select2("val","");
                        	$("#is_start1").select2("val","");
                        	$("#to_date1").val("");
                        }
                    } ]
                });
    });
	/*$("#search").click(function() {
		var params = {
				create_src : $("#create_src").val(),
				eb_account_detail_type : $("#eb_account_detail_type").val(),
				is_start : $("#is_start").val(),
				channel_type : $("#channel_type").val(),
				to_start_date : $("#to_start_date").val(),
				to_end_date : $("#to_end_date").val()
		};
		Common.jqGridReload("grid-table", params);
	});*/
	/**
	 * 测试未关联
	 */
	/*$("#search2").click(function() {
		location.href = "unrelatedposrecordsindex";
	});*/
	
	/**
	 * 导出
	 */
	$("#excel1").click(function() {
		var to_date = $("#to_date1").val();
    	var to_dates = to_date.split(" 至 ");
    	var to_start_date = to_date==""?"":to_dates[0];
    	var to_end_date = to_date==""?"":to_dates[1];
    	
    	var city_id = $("#city_id1").val();
    	var create_src = $("#create_src1").val();
    	var channel_type = $("#channel_type1").val();
    	var eb_account_detail_type = $("#eb_account_detail_type1").val();
    	var is_start = $("#is_start1").val();
//    	var to_start_date = to_start_date;
//    	var to_end_date = to_end_date;
    	var project_info_id = $("#project_info_id1").val();
    	var province_id = $("#province_id1").val();
    	
		location.href = "relatedposrecords_excel?city_id="+city_id+"&create_src="+create_src+"&channel_type="+channel_type+"&eb_account_detail_type="+
						eb_account_detail_type+"&is_start="+is_start+"&to_start_date="+to_start_date+"&to_end_date="+to_end_date+
						"&project_info_id="+project_info_id+"&province_id="+province_id;
	});
	
	$("#to_date1").daterangepicker({
		applyClass : 'btn-sm btn-success',
		cancelClass : 'btn-sm btn-default',
		locale : {
			applyLabel : '确认',
			cancelLabel : '取消',
			fromLabel : '起始时间',
			toLabel : '结束时间',
			customRangeLabel : '自定义',
			daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
                    '七月', '八月', '九月', '十月', '十一月', '十二月' ],  
			firstDay : 1
		},
		ranges : {
			// '最近1小时': [moment().subtract('hours',1), moment()],
			'今日' : [ moment().startOf('day'), moment() ],
			'昨日' : [ moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day') ],
			'最近7日' : [ moment().subtract('days', 6), moment() ],
			'最近30日' : [ moment().subtract('days', 29), moment() ],
			'本月' : [ moment().startOf("month"), moment().endOf("month") ],
			'上个月' : [ moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month") ]
		},
		opens : 'right', // 日期选择框的弹出位置
		separator : ' 至 ',
		showWeekNumbers : true, // 是否显示第几周

		// timePicker: true,
		// timePickerIncrement : 10, // 时间的增量，单位为分钟
		// timePicker12Hour : false, // 是否使用12小时制来显示时间

		// maxDate : moment(), // 最大时间
		format : 'YYYY-MM-DD'

	}, function(start, end, label) { // 格式化日期显示框
		$('#beginTime').val(start.format('YYYY-MM-DD'));
		$('#endTime').val(end.format('YYYY-MM-DD'));
	}).next().on('click', function() {
		$(this).prev().focus();
	});
	
	$("#to_date1").blur(function(){
		var testVal = $("#to_date1").val();
		if( testVal!= null && testVal != ""){
			var pattern = /^20\d{2}-[01]\d-[0123]\d 至 20\d{2}-[01]\d-[0123]\d$/;
			if(!testVal.match(pattern)){
				var date = new Date();
				var month = (date.getMonth() + 1)+"";
				var day = date.getDate()+"";
				if(month.length == 1){
					month = "0"+month;
				}
				if(day.length == 1){
					day = "0"+day;
				}
				var currentdate = date.getFullYear() + "-" + month + "-" + day;
				$("#to_date1").val(currentdate+" 至 "+currentdate);
			}
		}
	});
	/** **************************************按钮事件 end *************************************** */
	
	
	
	
	
	/*******************************************未关联************************************************/
	
	// 初使化combo
	Common.initSelect2("create_src2", {
		width : "150px"
			
	});
	Common.initSelect2("eb_account_detail_type2", {
		width : "150px"
	});
	Common.initSelect2("is_start2", {
		width : "150px"
	});
	Common.initSelect2("pay_account_type2", {
		width : "150px"
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
		title : "未关联刷卡流水",
		url : "getgriddata2",
		postData : {},
		multiSelect : false,
		height : "485px",
		sortName : "create_time",
		sortOrder : "desc",
		
		colNamesArray : [ '明细ID', '城市', '项目', 'POS机类型', '终端号', '刷卡时间', '开户行', '刷卡银行卡号', '卡片类型', '刷卡金额', '刷卡手续费', 
		                  '交易参考号', '来源'],
		colModel : [ {
			name : "eb_account_detail_id",
			index : "eb_account_detail_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
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
			width : 180,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "eb_account_detail_type",
			index : "eb_account_detail_type",
			width : 80,
			sorttype : "string",
			editable : false,
			formatter : eb_account_detail_typeFormatter,
			fixed : true
		}, {
			name : "pos_terminal_code",
			index : "pos_terminal_code",
			width : 140,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "trade_time",
			index : "trade_time",
			width : 140,
			sorttype : "string",
			editable : false,
			formatter : dateTimeFormatter,
			fixed : true
		}, {
			name : "pay_bank_name",
			index : "pay_bank_name",
			width : 120,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "pay_account_number",
			index : "pay_account_number",
			width : 140,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "pay_account_type",
			index : "pay_account_type",
			width : 80,
			sorttype : "string",
			editable : false,
			formatter : pay_account_typeFormatter,
			fixed : true
		}, {
			name : "eb_amount",
			index : "eb_amount",
			width : 120,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "eb_amount_fee",
			index : "eb_amount_fee",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "trade_ref_code",
			index : "trade_ref_code",
			width : 120,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "create_src",
			index : "create_src",
			width : 60,
			sorttype : "string",
			editable : false,
			formatter : create_srcFormatter,
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
	 * 条件查询
	 */
	$('#search2').click(function () {
        var dialog = $("#condition2").removeClass('hide')
            .dialog(
                {
                    modal : true,
                    title : "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-search'></i> 请选择查询条件</h4></div>",
                    title_html : true,
                    width : "700px",
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
                        	var to_date = $("#to_date2").val();
                        	var to_dates = to_date.split(" 至 ");
                        	var to_start_date = to_date==""?"":to_dates[0];
                        	var to_end_date = to_date==""?"":to_dates[1];
                            var params = {
                            		create_src : $("#create_src2").val(),
                    				eb_account_detail_type : $("#eb_account_detail_type2").val(),
                    				is_start : $("#is_start2").val(),
                    				pay_account_type : $("#pay_account_type2").val(),
                    				pos_terminal_code : $("#pos_terminal_code2").val(),
                    				trade_ref_code : $("#trade_ref_code2").val(),
                    				to_start_date : to_start_date,
                    				to_end_date : to_end_date
                            };
                            $.ajax({
                    			type:"post",
                    			url:"unrelatedposrecordscount",
                    			datatype:"json",
                    			data:params,
                    			success:function(data){
                    				$("#eb_count2").text(data.eb_count);
                    				$("#eb_amount_count2").text(data.eb_amount_count);
                    				$("#eb_amount_fee_count2").text(data.eb_amount_fee_count);
                    			}
                    		});
                            Common.jqGridReload("grid-table2", params);
                            $(this).dialog("close");
                        }
                    }, {
                    	text : "重置",
                        "class" : "btn btn-primary btn-xs",
                        click : function(){
                        	$("#create_src2").select2("val","");
                        	$("#eb_account_detail_type2").select2("val","");
                        	$("#is_start2").select2("val","");
                        	$("#pay_account_type2").select2("val","");
                        	$("#to_date2").val("");
                        	$("#pos_terminal_code2").val("");
                        	$("#trade_ref_code2").val("");
                        }
                    } ]
                });
    });
	
	/**
	 * 跳转到新增刷卡流水页面
	 */
	$("#add2").click(function() {
		location.href = "addunrelatedpos";
	});
	
	/**
	 * 删除
	 */
	$("#delete2").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector2);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想删除的数据！", false);
			return false;
		}

		var rowData = Common.jqGridGetRowData(gridSelector2, selectedRowsId);

		Common.confirm("请确认是否要删除该记录？", function() {
			$.ajax({
				url : "deleteunrelatedpos",
				type : "post",
				data : {
					eb_account_detail_id : rowData.eb_account_detail_id
				},
				dataType : "json",
				success : function(json) {
					if (json.isSuccess) {
						Common.alert("删除成功！", true);
						Common.jqGridDeleteRow("grid-table2", selectedRowsId);
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
	
	//模板下载
	$("#downloadmod2").click(function(){
		location.href = "downloadmod";
	});
	
	//导出
	$("#excel2").click(function(){
		var to_date = $("#to_date2").val();
    	var to_dates = to_date.split(" 至 ");
    	var to_start_date = to_date==""?"":to_dates[0];
    	var to_end_date = to_date==""?"":to_dates[1];
    	
    	var create_src = $("#create_src2").val();
    	var eb_account_detail_type = $("#eb_account_detail_type2").val();
    	var is_start = $("#is_start2").val();
    	var pay_account_type = $("#pay_account_type2").val();
    	var pos_terminal_code = $("#pos_terminal_code2").val();
    	var trade_ref_code = $("#trade_ref_code2").val();
//    	var to_start_date = to_start_date;
//    	var to_end_date = to_end_date;
		location.href = "unrelatedposrecords_excel?create_src="+create_src+"&eb_account_detail_type="+
						eb_account_detail_type+"&is_start="+is_start+"&pay_account_type="+pay_account_type+"&to_start_date="+to_start_date+
						"&to_end_date="+to_end_date+"&pos_terminal_code="+pos_terminal_code+"&trade_ref_code="+trade_ref_code;
	});
	
	$("#uploadFile2").uploadifive({
		buttonText : "导入",
		//swf : '${path}/assert/plugins/uploadify/uploadify.swf',
		uploadScript : "../../common/upload/excel",
		fileType : "*.xls",
		buttonClass : "btn btn-white btn-default btn-round ace-icon fa fa-upload inputstyle",
		queueSizeLimit : 1,
		removeCompleted : true,
		onUploadComplete : function(file, data) {
			var jsonData = eval("(" + data + ")");
			console.log(jsonData[0]);
			$.ajax({
				url : "import",
				data : {
					filePath : jsonData[0].diskPath
				},
				type : "post",
				dataType : "json",
				success : function(json) {
					if (json.isSuccess) {
						Common.alert("导入成功！", true,function(){
							//刷新页面
							var params = {
			                    		create_src : $("#create_src2").val(),
			            				eb_account_detail_type : $("#eb_account_detail_type2").val(),
			            				is_start : $("#is_start2").val(),
			            				pay_account_type : $("#pay_account_type2").val(),
			            				pos_terminal_code : $("#pos_terminal_code2").val(),
			            				trade_ref_code : $("#trade_ref_code2").val(),
			            				to_start_date : $("#to_start_date2").val(),
			            				to_end_date : $("#to_end_date2").val()
			                    };
			                    $.ajax({
			            			type:"post",
			            			url:"unrelatedposrecordscount",
			            			datatype:"json",
			            			data:params,
			            			success:function(data){
			            				$("#eb_count2").text(data.eb_count);
			            				$("#eb_amount_count2").text(data.eb_amount_count);
			            				$("#eb_amount_fee_count2").text(data.eb_amount_fee_count);
			            			}
			            		});
			                    Common.jqGridReload("grid-table2", params);
							});
						}
						 else {
							Common.messageBox("提示", json.msg, false);
						}
					
				},
				error : function() {
					Common.messageBox("提示", "服务器繁忙,请稍后在重试！！", false);
				}
			});
		},
		onUploadError : function(){
			Common.messageBox("提示", "上传失败了,请稍后在重试！", false);
		}
	});
	
	$("#uploadFile2").parent().attr("style","line-height: 25px;overflow: hidden;text-align: center;");
	/** **************************************按钮事件 end *************************************** */
	
	
	$("#to_date2").daterangepicker({
		applyClass : 'btn-sm btn-success',
		cancelClass : 'btn-sm btn-default',
		locale : {
			applyLabel : '确认',
			cancelLabel : '取消',
			fromLabel : '起始时间',
			toLabel : '结束时间',
			customRangeLabel : '自定义',
			daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
                    '七月', '八月', '九月', '十月', '十一月', '十二月' ],  
			firstDay : 1
		},
		ranges : {
			// '最近1小时': [moment().subtract('hours',1), moment()],
			'今日' : [ moment().startOf('day'), moment() ],
			'昨日' : [ moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day') ],
			'最近7日' : [ moment().subtract('days', 6), moment() ],
			'最近30日' : [ moment().subtract('days', 29), moment() ],
			'本月' : [ moment().startOf("month"), moment().endOf("month") ],
			'上个月' : [ moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month") ]
		},
		opens : 'right', // 日期选择框的弹出位置
		separator : ' 至 ',
		showWeekNumbers : true, // 是否显示第几周

		// timePicker: true,
		// timePickerIncrement : 10, // 时间的增量，单位为分钟
		// timePicker12Hour : false, // 是否使用12小时制来显示时间

		// maxDate : moment(), // 最大时间
		format : 'YYYY-MM-DD'

	}, function(start, end, label) { // 格式化日期显示框
		$('#beginTime').val(start.format('YYYY-MM-DD'));
		$('#endTime').val(end.format('YYYY-MM-DD'));
	}).next().on('click', function() {
		$(this).prev().focus();
	});
	
	$("#to_date2").blur(function(){
		var testVal = $("#to_date2").val();
		if( testVal!= null && testVal != ""){
			var pattern = /^20\d{2}-[01]\d-[0123]\d 至 20\d{2}-[01]\d-[0123]\d$/;
			if(!testVal.match(pattern)){
				var date = new Date();
				var month = (date.getMonth() + 1)+"";
				var day = date.getDate()+"";
				if(month.length == 1){
					month = "0"+month;
				}
				if(day.length == 1){
					day = "0"+day;
				}
				var currentdate = date.getFullYear() + "-" + month + "-" + day;
				$("#to_date2").val(currentdate+" 至 "+currentdate);
			}
		}
	});
	
	
	
	
	
	
	/******************************************************撤销*****************************************************************/
	
	// 初使化combo
	Common.initSelect2("province_id3", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	Common.initSelect2("city_id3", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	Common.initSelect2("create_src3", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	Common.initSelect2("eb_account_detail_type3", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	Common.initSelect2("is_start3", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector3 = "#canRelatedPosRecordsGrid";
	var pagerSelector3 = "#canRelatedPosRecordsGridPager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector3,
		gridSelector : gridSelector3,
		parentDOMClass : "col-sm-12",
		widthOffset : "25px",
		title : "撤销刷卡流水列表",
		url : "canrelatedposrecordsdata",
		postData : {},
		multiSelect : false,
		height : "485px",
		sortName : "create_time",
		sortOrder : "desc",
		
		colNamesArray : [ '城市', '撤销时间', '刷卡时间', '开户行', '终端号', '交易参考号', '付款账号', '刷卡金额', '来源', '撤销关联订单号'],
		colModel : [{
			name : "city_name",
			index : "city_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "cancel_time",
			index : "cancel_time",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "trade_time",
			index : "trade_time",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "pay_bank_name",
			index : "pay_bank_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "pos_terminal_code",
			index : "pos_terminal_code",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "trade_ref_code",
			index : "trade_ref_code",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "pay_account_number",
			index : "pay_account_number",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "eb_amount",
			index : "eb_amount",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "create_src",
			index : "create_src",
			width : 60,
			sorttype : "string",
			editable : false,
			formatter : formatType
		}, {
			name : "order_info_code",
			index : "order_info_code",
			width : 60,
			sorttype : "string",
			editable : false
		}]
	});

	// 渲染表格
	$(gridSelector3).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */
	
	function formatType(value){
		switch (value) {
		case "1":
			return "自然来访";
		case "2":
			return "中介";
		case "3":
			return "线上";
		default:
			return "未知";
		}
	}
	
	
	/** **************************************按钮事件 start *************************************** */

	/**
	 * 条件查询
	 */
	$('#search3').click(function () {
        var dialog = $("#condition3").removeClass('hide')
            .dialog(
                {
                    modal : true,
                    title : "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-search'></i> 请选择查询条件</h4></div>",
                    title_html : true,
                    width : "700px",
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
                        	var to_date = $("#to_date3").val();
                        	var to_dates = to_date.split(" 至 ");
                        	var to_start_date = to_date==""?"":to_dates[0];
                        	var to_end_date = to_date==""?"":to_dates[1];
                        	
                        	var can_date = $("#can_date3").val();
                        	var can_dates = can_date.split(" 至 ");
                        	var can_start_date = can_date==""?"":can_dates[0];
                        	var can_end_date = can_date==""?"":can_dates[1];
                            var params = {
                            		province_id : $("#province_id3").val(),
                            		city_id : $("#city_id3").val(),
                    				create_src : $("#create_src3").val(),
                    				eb_account_detail_type : $("#eb_account_detail_type3").val(),
                    				is_start : $("#is_start3").val(),
                    				to_start_date : to_start_date,
                    				to_end_date : to_end_date,
                    				can_start_date : can_start_date,
                    				can_end_date : can_end_date,
                    				pos_terminal_code : $("#pos_terminal_code3").val(),
                    				trade_ref_code : $("#trade_ref_code3").val()
                            };
                            $.ajax({
                    			type:"post",
                    			url:"canrelatedposrecordsdatacount",
                    			datatype:"json",
                    			data:params,
                    			success:function(data){
                    				$("#eb_amount_count3").text(data.eb_amount_count);
                    				$("#eb_count3").text(data.eb_count);
                    			}
                    		});
                            Common.jqGridReload("canRelatedPosRecordsGrid", params);
                            $(this).dialog("close");
                        }
                    } ,{
                    	text : "重置",
                        "class" : "btn btn-primary btn-xs",
                        click : function(){
                        	$("#province_id3").select2("val","");
                        	$("#province_id3").trigger("change");
                        	$("#create_src3").select2("val","");
                        	$("#eb_account_detail_type3").select2("val","");
                        	$("#is_start3").select2("val","");
                        	$("#to_date3").val("");
                        	$("#can_date3").val("");
                        	$("#pos_terminal_code3").val("");
                        	$("#trade_ref_code3").val("");
                        }
                    } ]
                });
    });
	
	/**
	 * 导出
	 */
	$("#export3").click(function() {
		var to_date = $("#to_date3").val();
    	var to_dates = to_date.split(" 至 ");
    	var to_start_date = to_date==""?"":to_dates[0];
    	var to_end_date = to_date==""?"":to_dates[1];
    	
    	var can_date = $("#can_date3").val();
    	var can_dates = can_date.split(" 至 ");
    	var can_start_date = can_date==""?"":can_dates[0];
    	var can_end_date = can_date==""?"":can_dates[1];
    	
    	var city_id = $("#city_id3").val();
    	var create_src = $("#create_src3").val();
    	var eb_account_detail_type = $("#eb_account_detail_type3").val();
    	var is_start = $("#is_start3").val();
//    	var to_start_date = to_start_date;
//    	var to_end_date = to_end_date;
//    	var can_start_date = can_start_date;
//    	var can_end_date = can_end_date;
    	var pos_terminal_code = $("#pos_terminal_code3").val();
    	var trade_ref_code = $("#trade_ref_code3").val();
    	var province_id = $("#province_id3").val();
		location.href = "canrelatedposrecords_export?city_id="+city_id+"&create_src="+create_src+"&eb_account_detail_type="+eb_account_detail_type+
						"&is_start="+is_start+"&to_start_date="+to_start_date+"&to_end_date="+to_end_date+"&can_start_date="+can_start_date+
						"&can_end_date="+can_end_date+"&pos_terminal_code="+pos_terminal_code+"&trade_ref_code="+trade_ref_code+
						"&province_id="+province_id;
	});

	/** **************************************按钮事件 end *************************************** */
	
	$("#to_date3").daterangepicker({
		applyClass : 'btn-sm btn-success',
		cancelClass : 'btn-sm btn-default',
		locale : {
			applyLabel : '确认',
			cancelLabel : '取消',
			fromLabel : '起始时间',
			toLabel : '结束时间',
			customRangeLabel : '自定义',
			daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
                    '七月', '八月', '九月', '十月', '十一月', '十二月' ],  
			firstDay : 1
		},
		ranges : {
			// '最近1小时': [moment().subtract('hours',1), moment()],
			'今日' : [ moment().startOf('day'), moment() ],
			'昨日' : [ moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day') ],
			'最近7日' : [ moment().subtract('days', 6), moment() ],
			'最近30日' : [ moment().subtract('days', 29), moment() ],
			'本月' : [ moment().startOf("month"), moment().endOf("month") ],
			'上个月' : [ moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month") ]
		},
		opens : 'right', // 日期选择框的弹出位置
		separator : ' 至 ',
		showWeekNumbers : true, // 是否显示第几周

		// timePicker: true,
		// timePickerIncrement : 10, // 时间的增量，单位为分钟
		// timePicker12Hour : false, // 是否使用12小时制来显示时间

		// maxDate : moment(), // 最大时间
		format : 'YYYY-MM-DD'

	}, function(start, end, label) { // 格式化日期显示框
		$('#beginTime').val(start.format('YYYY-MM-DD'));
		$('#endTime').val(end.format('YYYY-MM-DD'));
	}).next().on('click', function() {
		$(this).prev().focus();
	});
	
	$("#to_date3").blur(function(){
		var testVal = $("#to_date3").val();
		if( testVal!= null && testVal != ""){
			var pattern = /^20\d{2}-[01]\d-[0123]\d 至 20\d{2}-[01]\d-[0123]\d$/;
			if(!testVal.match(pattern)){
				var date = new Date();
				var month = (date.getMonth() + 1)+"";
				var day = date.getDate()+"";
				if(month.length == 1){
					month = "0"+month;
				}
				if(day.length == 1){
					day = "0"+day;
				}
				var currentdate = date.getFullYear() + "-" + month + "-" + day;
				$("#to_date3").val(currentdate+" 至 "+currentdate);
			}
		}
	});
	
	$("#can_date3").daterangepicker({
		applyClass : 'btn-sm btn-success',
		cancelClass : 'btn-sm btn-default',
		locale : {
			applyLabel : '确认',
			cancelLabel : '取消',
			fromLabel : '起始时间',
			toLabel : '结束时间',
			customRangeLabel : '自定义',
			daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
                    '七月', '八月', '九月', '十月', '十一月', '十二月' ],  
			firstDay : 1
		},
		ranges : {
			// '最近1小时': [moment().subtract('hours',1), moment()],
			'今日' : [ moment().startOf('day'), moment() ],
			'昨日' : [ moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day') ],
			'最近7日' : [ moment().subtract('days', 6), moment() ],
			'最近30日' : [ moment().subtract('days', 29), moment() ],
			'本月' : [ moment().startOf("month"), moment().endOf("month") ],
			'上个月' : [ moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month") ]
		},
		opens : 'right', // 日期选择框的弹出位置
		separator : ' 至 ',
		showWeekNumbers : true, // 是否显示第几周

		// timePicker: true,
		// timePickerIncrement : 10, // 时间的增量，单位为分钟
		// timePicker12Hour : false, // 是否使用12小时制来显示时间

		// maxDate : moment(), // 最大时间
		format : 'YYYY-MM-DD'

	}, function(start, end, label) { // 格式化日期显示框
		$('#beginTime').val(start.format('YYYY-MM-DD'));
		$('#endTime').val(end.format('YYYY-MM-DD'));
	}).next().on('click', function() {
		$(this).prev().focus();
	});
	
	$("#can_date3").blur(function(){
		var testVal = $("#can_date3").val();
		if( testVal!= null && testVal != ""){
			var pattern = /^20\d{2}-[01]\d-[0123]\d 至 20\d{2}-[01]\d-[0123]\d$/;
			if(!testVal.match(pattern)){
				var date = new Date();
				var month = (date.getMonth() + 1)+"";
				var day = date.getDate()+"";
				if(month.length == 1){
					month = "0"+month;
				}
				if(day.length == 1){
					day = "0"+day;
				}
				var currentdate = date.getFullYear() + "-" + month + "-" + day;
				$("#can_date3").val(currentdate+" 至 "+currentdate);
			}
		}
	});
	
	
	
	
	/***************************************异常******************************************/
	
	// 初使化combo
	Common.initSelect2("province_id4", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	Common.initSelect2("city_id4", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	Common.initSelect2("create_src4", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	Common.initSelect2("eb_account_detail_type4", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	Common.initSelect2("is_start4", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	Common.initSelect2("pay_account_type4", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	Common.initSelect2("channel_type4", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector4 = "#errorRelatedPosRecordsGrid";
	var pagerSelector4 = "#errorRelatedPosRecordsGridPager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector4,
		gridSelector : gridSelector4,
		parentDOMClass : "col-sm-12",
		title : "异常刷卡流水列表",
		url : "errorrelatedposrecordsdata",
		postData : {},
		multiSelect : true,
		height : "485px",
		sortName : "create_time",
		sortOrder : "desc",
		
		colNamesArray : [ '电商收款明细ID', '城市', '项目', 'POS机类型', '终端号', '刷卡时间', '开户行', '刷卡银行卡号', '卡片类型', '刷卡金额', 
		                  '刷卡手续费', '交易参考号', '订单编号', '客户姓名', '渠道', '套餐金额', '优惠告知书编号', '来源', '异常原因'],
		colModel : [{
			name : "eb_account_detail_id",
			index : "eb_account_detail_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden: true
		},{
			name : "city_name",
			index : "city_name",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "project_info_name",
			index : "project_info_name",
			width : 140,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "eb_account_detail_type",
			index : "eb_account_detail_type",
			width : 80,
			sorttype : "string",
			editable : false,
			formatter : eb_account_detail_typeFormatter,
			fixed : true
		}, {
			name : "pos_terminal_code",
			index : "pos_terminal_code",
			width : 140,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "trade_time",
			index : "trade_time",
			width : 140,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "pay_bank_name",
			index : "pay_bank_name",
			width : 120,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "pay_account_number",
			index : "pay_account_number",
			width : 140,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "pay_account_type",
			index : "pay_account_type",
			width : 80,
			sorttype : "string",
			editable : false,
			formatter : pay_account_typeFormatter,
			fixed : true
		}, {
			name : "eb_amount",
			index : "eb_amount",
			width : 120,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "eb_amount_fee",
			index : "eb_amount_fee",
			width : 100,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "trade_ref_code",
			index : "trade_ref_code",
			width : 140,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "order_info_code",
			index : "order_info_code",
			width : 140,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "custom_name",
			index : "custom_name",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "channel_type",
			index : "channel_type",
			width : 80,
			sorttype : "string",
			editable : false,
			formatter : formatType,
			fixed : true
		}, {
			name : "group_fee",
			index : "group_fee",
			width : 100,
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
			name : "create_src",
			index : "create_src",
			width : 60,
			sorttype : "string",
			editable : false,
			formatter : create_srcFormatter,
			fixed : true
		}, {
			name : "descript",
			index : "descript",
			width : 60,
			sorttype : "string",
			editable : false,
			fixed : true
		}]
	});

	// 渲染表格
	$(gridSelector4).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */
	
	/*function formatType(value){
		switch (value) {
		case "1":
			return "自然来访";
		case "2":
			return "中介";
		case "3":
			return "线上";
		default:
			return "未知";
		}
	}*/
	
	
	/** **************************************按钮事件 start *************************************** */

	/**
	 * 条件查询
	 */
	$('#search4').click(function () {
        var dialog = $("#condition4").removeClass('hide')
            .dialog(
                {
                    modal : true,
                    title : "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-search'></i> 请选择查询条件</h4></div>",
                    title_html : true,
                    width : "700px",
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
                        	var to_date = $("#to_date4").val();
                        	var to_dates = to_date.split(" 至 ");
                        	var to_start_date = to_date==""?"":to_dates[0];
                        	var to_end_date = to_date==""?"":to_dates[1];
                            var params = {
                            		province_id : $("#province_id4").val(),
                            		city_id : $("#city_id4").val(),
                    				create_src : $("#create_src4").val(),
                    				channel_type : $("#channel_type4").val(),
                    				eb_account_detail_type : $("#eb_account_detail_type4").val(),
                    				is_start : $("#is_start4").val(),
                    				pay_account_type : $("#pay_account_type4").val(),
                    				to_start_date : to_start_date,
                    				to_end_date : to_end_date,
                    				pos_terminal_code : $("#pos_terminal_code4").val(),
                    				custom_name : $("#custom_name4").val(),
                    				order_info_code : $("#order_info_code4").val(),
                    				trade_ref_code : $("#trade_ref_code4").val(),
                    				cheap_code : $("#cheap_code4").val()
                            };
                            $.ajax({
                    			type:"post",
                    			url:"errorrelatedposrecordsdatacount",
                    			datatype:"json",
                    			data:params,
                    			success:function(data){
                    				$("#group_count4").text(data.group_count);
                    				$("#group_fee_count4").text(data.group_fee_count);
                    				$("#eb_count4").text(data.eb_count);
                    				$("#eb_amount_count4").text(data.eb_amount_count);
                    				$("#eb_amount_fee_count4").text(data.eb_amount_fee_count);
                    			}
                    		});
                            Common.jqGridReload("errorRelatedPosRecordsGrid", params);
                            $(this).dialog("close");
                        }
                    },{
                    	text : "重置",
                        "class" : "btn btn-primary btn-xs",
                        click : function(){
                        	$("#province_id4").select2("val","");
                        	$("#province_id4").trigger("change");
                        	$("#create_src4").select2("val","");
                        	$("#channel_type4").select2("val","");
                        	$("#eb_account_detail_type4").select2("val","");
                        	$("#is_start4").select2("val","");
                        	$("#pay_account_type4").select2("val","");
                        	$("#to_date4").val("");
                        	$("#pos_terminal_code4").val("");
                        	$("#custom_name4").val("");
                        	$("#order_info_code4").val("");
                        	$("#trade_ref_code4").val("");
                        	$("#cheap_code4").val("");
                        }
                    } ]
                });
    });
	
	/**
	 * 确认有效
	 */
	$("#confirm4").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRows(gridSelector4);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length < 1) {
			Common.messageBox("提示", "请选择至少一条你想修改的数据！", false);
			return false;
		}
		var ids = "";
		var rowDatas = Common.jqGridGetSelectedRows(gridSelector4);
		for (var i = 0; i < rowDatas.length; i++) {
			if (rowDatas[i] == "undefined") continue;
			ids += Common.jqGridGetRowData(gridSelector4, rowDatas[i]).eb_account_detail_id + ",";
		}
		ids = ids.substr(0,ids.length-1);
		$.ajax({
			url : "confirmok",
			type : "post",
			dataType : "json",
			data : {
				ids : ids
			},
			success : function(json) {
				if (json.isSuccess) {
					Common.alert("确认有效成功！", true,function(){
						//刷新统计和列表
						var params = {
                        		city_id : $("#city_id4").val(),
                				create_src : $("#create_src4").val(),
                				channel_type : $("#channel_type4").val(),
                				eb_account_detail_type : $("#eb_account_detail_type4").val(),
                				is_start : $("#is_start4").val(),
                				pay_account_type : $("#pay_account_type4").val(),
                				to_start_date : $("#to_start_date4").val(),
                				to_end_date : $("#to_end_date4").val(),
                				pos_terminal_code : $("#pos_terminal_code4").val(),
                				custom_name : $("#custom_name4").val(),
                				order_info_code : $("#order_info_code4").val(),
                				trade_ref_code : $("#trade_ref_code4").val(),
                				cheap_code : $("#cheap_code4").val()
                        };
                        $.ajax({
                			type:"post",
                			url:"errorrelatedposrecordsdatacount",
                			datatype:"json",
                			data:params,
                			success:function(data){
                				$("#group_count4").text(data.group_count);
                				$("#group_fee_count4").text(data.group_fee_count);
                				$("#eb_count4").text(data.eb_count);
                				$("#eb_amount_count4").text(data.eb_amount_count);
                				$("#eb_amount_fee_count4").text(data.eb_amount_fee_count);
                			}
                		});
                        Common.jqGridReload("errorRelatedPosRecordsGrid", params);
					});
				} else {
					Common.messageBox("提示", json.msg, false);
				}
			}
		});
	});
	
	/**
	 * 更换项目
	 */
	$("#modify4").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRows(gridSelector4);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length != 1) {
			Common.messageBox("提示", "请选择一条你想修改的数据！", false);
			return false;
		}
		
		var eb_account_detail_id = Common.jqGridGetRowData(gridSelector4, selectedRowsId[0]).eb_account_detail_id;
		location.href = "errorrelatedposrecordsmodify?eb_account_detail_id="+eb_account_detail_id;
	});
	
	/**
	 * 导出
	 */
	$("#export4").click(function() {
		var to_date = $("#to_date4").val();
    	var to_dates = to_date.split(" 至 ");
    	var to_start_date = to_date==""?"":to_dates[0];
    	var to_end_date = to_date==""?"":to_dates[1];
    	
    	var city_id = $("#city_id4").val();
    	var create_src = $("#create_src4").val();
    	var channel_type = $("#channel_type4").val();
    	var eb_account_detail_type = $("#eb_account_detail_type4").val();
    	var is_start = $("#is_start4").val();
    	var pay_account_type = $("#pay_account_type4").val();
//    	var to_start_date = to_start_date;
//    	var to_end_date = to_end_date;
    	var pos_terminal_code = $("#pos_terminal_code4").val();
    	var custom_name = $("#custom_name4").val();
    	var order_info_code = $("#order_info_code4").val();
    	var trade_ref_code = $("#trade_ref_code4").val();
    	var cheap_code = $("#cheap_code4").val();
    	var province_id = $("#province_id4").val();
    	
		location.href = "errorrelatedposrecords_export?city_id="+city_id+"&create_src="+create_src+"&channel_type="+channel_type+"&eb_account_detail_type="+
						eb_account_detail_type+"&is_start="+is_start+"&pay_account_type="+pay_account_type+"&to_start_date="+to_start_date+
						"&to_end_date="+to_end_date+"&pos_terminal_code="+pos_terminal_code+"&custom_name="+custom_name+
						"&order_info_code="+order_info_code+"&trade_ref_code="+trade_ref_code+"&cheap_code="+cheap_code+
						"&province_id="+province_id;
	});

	/** **************************************按钮事件 end *************************************** */
	
	$("#to_date4").daterangepicker({
		applyClass : 'btn-sm btn-success',
		cancelClass : 'btn-sm btn-default',
		locale : {
			applyLabel : '确认',
			cancelLabel : '取消',
			fromLabel : '起始时间',
			toLabel : '结束时间',
			customRangeLabel : '自定义',
			daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
                    '七月', '八月', '九月', '十月', '十一月', '十二月' ],  
			firstDay : 1
		},
		ranges : {
			// '最近1小时': [moment().subtract('hours',1), moment()],
			'今日' : [ moment().startOf('day'), moment() ],
			'昨日' : [ moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day') ],
			'最近7日' : [ moment().subtract('days', 6), moment() ],
			'最近30日' : [ moment().subtract('days', 29), moment() ],
			'本月' : [ moment().startOf("month"), moment().endOf("month") ],
			'上个月' : [ moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month") ]
		},
		opens : 'right', // 日期选择框的弹出位置
		separator : ' 至 ',
		showWeekNumbers : true, // 是否显示第几周

		// timePicker: true,
		// timePickerIncrement : 10, // 时间的增量，单位为分钟
		// timePicker12Hour : false, // 是否使用12小时制来显示时间

		// maxDate : moment(), // 最大时间
		format : 'YYYY-MM-DD'

	}, function(start, end, label) { // 格式化日期显示框
		$('#beginTime').val(start.format('YYYY-MM-DD'));
		$('#endTime').val(end.format('YYYY-MM-DD'));
	}).next().on('click', function() {
		$(this).prev().focus();
	});
	
	$("#to_date4").blur(function(){
		var testVal = $("#to_date4").val();
		if( testVal!= null && testVal != ""){
			var pattern = /^20\d{2}-[01]\d-[0123]\d 至 20\d{2}-[01]\d-[0123]\d$/;
			if(!testVal.match(pattern)){
				var date = new Date();
				var month = (date.getMonth() + 1)+"";
				var day = date.getDate()+"";
				if(month.length == 1){
					month = "0"+month;
				}
				if(day.length == 1){
					day = "0"+day;
				}
				var currentdate = date.getFullYear() + "-" + month + "-" + day;
				$("#to_date4").val(currentdate+" 至 "+currentdate);
			}
		}
	});
	
	
});