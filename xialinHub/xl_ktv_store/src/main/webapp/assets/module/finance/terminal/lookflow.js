$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#lookFlowGrid";
	var pagerSelector = "#lookFlowGridPager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "pos终端刷卡流水列表",
		url : "getlookflowdata",
		postData : {posId:$("#posId").val()},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '城市', '项目', '操作人', '操作人联系电话', '操作时间', '备注'],
		colModel : [{
			name : "cityName",
			index : "city_name",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "projectInfoName",
			index : "project_info_name",
			width : 60,
			sorttype : "string",
			editable : false,
		}, {
			name : "operatorName",
			index : "operator_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "operatorTel",
			index : "operator_tel",
			width : 60,
			sorttype : "BigDecimal",
			editable : false
		}, {
			name : "createTimeString",
			index : "create_time_string",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "remark",
			index : "remark",
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
	
	Common.initSelect2("buildingProjectId", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	
	Common.initSelect2("projectInfoId", {
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
				buildingProjectId:$("#buildingProjectId").val(),
				projectInfoId:$("#projectInfoId").val(),
				operatorName:$("#operatorName").val(),
				createTime1:$("#createTime1").val(),
				createTime2:$("#createTime2").val()
		};
//		alert($("#cityId").val()+","+$("#useDateStart1").val()+","+$("#useDateStart2").val()+","+$("#transferDate1").val()+","+$("#transferDate2").val()+","+$("#operatorName").val());
		Common.jqGridReload("lookFlowGrid",params);
	});
*/
	//导出
	$("#export").click(function(){
		var createTime = $("#createTime").val();
    	var createTimes = createTime.split(" 至 ");
    	var createTime1 = createTime==""?"":createTimes[0];
    	var createTime2 = createTime==""?"":createTimes[1];
		location.href = "exportflow?posId="+$("#posId").val()+"&cityId="+$("#cityId").val()+"&buildingProjectId="+$("#buildingProjectId").val()+
			"&projectInfoId="+$("#projectInfoId").val()+"&operatorName="+$("#operatorName").val()+"&createTime1="+createTime1+
			"&createTime2="+createTime2+"&provinceId="+$("#provinceId").val();
	});
	
	//返回
	$("#return").click(function(){
		location.href = "index";
	});
	
	/** **************************************按钮事件 end *************************************** */
	
	$("#createTime").daterangepicker({
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
	
	$("#createTime").blur(function(){
		var testVal = $("#createTime").val();
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
				$("#createTime").val(currentdate+" 至 "+currentdate);
			}
		}
	});
	
	/*$("#createTime2").change(function(){
		if($("#createTime2").val() ==null || $("#createTime2").val() == "" || $("#createTime1").val() ==null || $("#createTime1").val() ==""){
			return;
		}
		var startTime = new Date($("#createTime1").val().replace("-", "/").replace("-", "/"));
		var endTime = new Date($("#createTime2").val().replace("-", "/").replace("-", "/"));
		if(startTime>endTime){
			$("#createTime2").val($("#createTime1").val());
		}
	});
	$("#createTime1").change(function(){
		if($("#createTime2").val() ==null || $("#createTime2").val() == "" || $("#createTime1").val() ==null || $("#createTime1").val() ==""){
			return;
		}
		var startTime = new Date($("#createTime1").val().replace("-", "/").replace("-", "/"));
		var endTime = new Date($("#createTime2").val().replace("-", "/").replace("-", "/"));
		if(startTime>endTime){
			$("#createTime2").val($("#createTime1").val());
		}
	});*/
});