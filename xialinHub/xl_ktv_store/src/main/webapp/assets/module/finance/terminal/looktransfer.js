$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#transferGrid";
	var pagerSelector = "#transferGridPager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "pos终端调动列表",
		url : "gettransferdata",
		postData : {posId:$("#posId").val()},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '城市', '项目', '来源项目', '使用开始时间', '使用结束时间', '调动时间', '调动操作人'],
		colModel : [{
			name : "cityName",
			index : "city_name",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "toProjectInfoName",
			index : "to_project_info_name",
			width : 60,
			sorttype : "string",
			editable : false,
		}, {
			name : "fromProjectInfoName",
			index : "from_project_info_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "toStartDateString",
			index : "to_start_date_String",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "toEndtDateString",
			index : "to_endt_date_string",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "createTimeString",
			index : "create_time_string",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "operatorName",
			index : "operator_name",
			width : 60,
			sorttype : "string",
			editable : false
		}]
	});

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */
	
	Common.initSelect2("provinceId", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	
	Common.initSelect2("cityId", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});

	/** **************************************按钮事件 start *************************************** */
	//查找
	/*$("#search").click(function(){
		var  params = {
				posId:$("#posId").val(),
				cityId:$("#cityId").val(),
				useDateStart1:$("#useDateStart1").val(),
				useDateStart2:$("#useDateStart2").val(),
				transferDate1:$("#transferDate1").val(),
				transferDate2:$("#transferDate2").val(),
				operatorName:$("#operatorName").val()
		};
//		alert($("#cityId").val()+","+$("#useDateStart1").val()+","+$("#useDateStart2").val()+","+$("#transferDate1").val()+","+$("#transferDate2").val()+","+$("#operatorName").val());
		Common.jqGridReload("transferGrid",params);
	});*/

	//导出
	$("#export").click(function(){
		var useDateStart = $("#useDateStart").val();
    	var useDateStarts = useDateStart.split(" 至 ");
    	var useDateStart1 = useDateStart==""?"":useDateStarts[0];
    	var useDateStart2 = useDateStart==""?"":useDateStarts[1];
    	var transferDate = $("#transferDate").val();
    	var transferDates = transferDate.split(" 至 ");
    	var transferDate1 = transferDate==""?"":transferDates[0];
    	var transferDate2 = transferDate==""?"":transferDates[1];
		location.href = "exporttransfer?posId="+$("#posId").val()+"&cityId="+$("#cityId").val()+"&useDateStart1="+useDateStart1+
			"&useDateStart2="+useDateStart2+"&transferDate1="+transferDate1+"&transferDate2="+transferDate2+
			"&operatorName="+$("#operatorName").val()+"&provinceId="+$("#provinceId").val();
	});
	
	//返回
	$("#return").click(function(){
		location.href = "index";
	});
	
	
	$("#useDateStart").daterangepicker({
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
	
	$("#useDateStart").blur(function(){
		var testVal = $("#useDateStart").val();
		if(testVal != null && testVal != ""){
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
				$("#useDateStart").val(currentdate+" 至 "+currentdate);
			}
		}
	});
	
	$("#transferDate").daterangepicker({
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
	
	$("#transferDate").blur(function(){
		var testVal = $("#transferDate").val();
		if(testVal != null && testVal != ""){
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
				$("#transferDate").val(currentdate+" 至 "+currentdate);
			}
		}
	});
	
	
	/*$("#useDateStart2").change(function(){
		if($("#useDateStart2").val() ==null || $("#useDateStart2").val() == "" || $("#useDateStart1").val() ==null || $("#useDateStart1").val() ==""){
			return;
		}
		var startTime = new Date($("#useDateStart1").val().replace("-", "/").replace("-", "/"));
		var endTime = new Date($("#useDateStart2").val().replace("-", "/").replace("-", "/"));
		if(startTime>endTime){
			$("#useDateStart2").val($("#useDateStart1").val());
		}
	});
	$("#useDateStart1").change(function(){
		if($("#useDateStart2").val() ==null || $("#useDateStart2").val() == "" || $("#useDateStart1").val() ==null || $("#useDateStart1").val() ==""){
			return;
		}
		var startTime = new Date($("#useDateStart1").val().replace("-", "/").replace("-", "/"));
		var endTime = new Date($("#useDateStart2").val().replace("-", "/").replace("-", "/"));
		if(startTime>endTime){
			$("#useDateStart2").val($("#useDateStart1").val());
		}
	});
	
	$("#transferDate2").change(function(){
		if($("#transferDate2").val() ==null || $("#transferDate2").val() == "" || $("#transferDate1").val() ==null || $("#transferDate1").val() ==""){
			return;
		}
		var startTime = new Date($("#transferDate1").val().replace("-", "/").replace("-", "/"));
		var endTime = new Date($("#transferDate2").val().replace("-", "/").replace("-", "/"));
		if(startTime>endTime){
			$("#transferDate2").val($("#transferDate1").val());
		}
	});
	$("#transferDate1").change(function(){
		if($("#transferDate2").val() ==null || $("#transferDate2").val() == "" || $("#transferDate1").val() ==null || $("#transferDate1").val() ==""){
			return;
		}
		var startTime = new Date($("#transferDate1").val().replace("-", "/").replace("-", "/"));
		var endTime = new Date($("#transferDate2").val().replace("-", "/").replace("-", "/"));
		if(startTime>endTime){
			$("#transferDate2").val($("#transferDate1").val());
		}
	});*/
	
	
	/** **************************************按钮事件 end *************************************** */
});