$(function($){
	//省市楼盘项目级联
	Common.initSelect2("provinceName", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	
	Common.initSelect2("cityName", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	Common.initSelect2("buildingProjectName", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	Common.initSelect2("projectInfoId", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	//商户
	Common.initSelect2("merchant", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	
	function myStatus(value) {
		switch (value) {
		case 0:
			return "<span style=\"color:red\">未使用</span>";
		case 1:
			return "<span style=\"color:blue\">使用中</span>";
		default:
			return "未知状态";
		}
	}
	
	$("#useDate").daterangepicker({
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
		/*ranges : {
			// '最近1小时': [moment().subtract('hours',1), moment()],
			'今日' : [ moment().startOf('day'), moment() ],
			'昨日' : [ moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day') ],
			'最近7日' : [ moment().subtract('days', 6), moment() ],
			'最近30日' : [ moment().subtract('days', 29), moment() ],
			'本月' : [ moment().startOf("month"), moment().endOf("month") ],
			'上个月' : [ moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month") ]
		},*/
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
	
	$("#useDate").blur(function(){
		if($("#useDate").val() != null && $("#useDate").val() != ""){
			var pattern = /^20\d{2}-[01]\d-[0123]\d 至 20\d{2}-[01]\d-[0123]\d$/;
			if(!$("#useDate").val().match(pattern)){
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
				$("#useDate").val(currentdate+" 至 "+currentdate);
			}
		}
	});
	
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#selectingGrid";
	var pagerSelector = "#selectingGridPager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "pos终端查询列表",
		url : "getgridsearchdata",
		postData : {status : 1},
		multiSelect : true,
		height : "300px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ 'POS机ID', 'POS机类型', '终端编号', '终端商户号',  '所在项目',  '状态'],
		colModel : [ {
			name : "posId",
			index : "pos_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "posTypeString",
			index : "pos_type_string",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "terminalNo",
			index : "terminal_no",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "terminalMerchantNo",
			index : "terminal_merchant_no",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "projectInfoName",
			index : "project_info_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "status",
			index : "status",
			width : 60,
			sorttype : "int",
			editable : false,
			formatter : myStatus
		}]
	});
		

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变
	

	/** **************************************构造jqGrid end *************************************** */
	
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector2 = "#selectedGrid";
	var pagerSelector2 = "#selectedGridPager";
	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector2,
		gridSelector : gridSelector2,
		parentDOMClass : "col-sm-12",
		title : "已选择pos机列表",
		url : "getgriddata",
		postData : {posIds:$("#posIds").val()},
		multiSelect : true,
		height : "100%",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ 'POS机ID', 'POS机类型', '终端编号', '终端商户号',  '所在项目',  '状态'],
		colModel : [ {
			name : "posId",
			index : "pos_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "posTypeString",
			index : "pos_type_string",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "terminalNo",
			index : "terminal_no",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "terminalMerchantNo",
			index : "terminal_merchant_no",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "projectInfoName",
			index : "project_info_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "status",
			index : "status",
			width : 60,
			sorttype : "int",
			editable : false,
			formatter : myStatus
		}]
	});
		

	// 渲染表格
	$(gridSelector2).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid',{status:1});// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */
	
	/** **************************************按钮事件 start *************************************** */
	$("#search").click(function(){
		Common.jqGridReload("selectingGrid", {terminalNo:$("#condition").val(),status:1});
	});
	
	$("#choose").click(function(){
		var selectedRows= Common.jqGridGetSelectedRows(gridSelector);
		if (Common.isEmpty(selectedRows) || selectedRows.length < 1) {
			Common.messageBox("提示", "请至少选择一条数据！", false);
			return false;
		}
		
		var posIds = ($("#posIds").val()==null || $("#posIds").val() == "")?"":($("#posIds").val()+",");
		var rowDatas = Common.jqGridGetSelectedRows(gridSelector);
		for (var i = 0; i < rowDatas.length; i++) {
			if (rowDatas[i] == "undefined" || posIds.indexOf(Common.jqGridGetRowData(gridSelector, rowDatas[i]).posId) != -1) continue;
			/*if(Common.jqGridGetRowData(gridSelector, rowDatas[i]).status == "<span style=\"color:red\">未使用</span>"){
				Common.messageBox("提示", "请选择未停用的设备！！", false);
				return;
			}*/ 
			posIds += Common.jqGridGetRowData(gridSelector, rowDatas[i]).posId + ",";
			
		}
		if(posIds != ""){
			posIds = posIds.substr(0,posIds.length-1);
		}
		$("#posIds").val(posIds);
		Common.jqGridReload("selectedGrid", {posIds:posIds});
	});
	
	$("#delete").click(function(){
		var selectedRows= Common.jqGridGetSelectedRows(gridSelector2);
		if (Common.isEmpty(selectedRows) || selectedRows.length < 1) {
			Common.messageBox("提示", "请至少选择一条数据！", false);
			return false;
		}
	
		var posIds = ($("#posIds").val()==null || $("#posIds").val() == "")?"":($("#posIds").val()+",");;
		
		var rowDatas = Common.jqGridGetSelectedRows(gridSelector2);
		for (var i = 0; i < rowDatas.length; i++) {
			if (rowDatas[i] == "undefined") continue;
			posIds = posIds.replace((Common.jqGridGetRowData(gridSelector2, rowDatas[i]).posId + ","), "");
		}
		if(posIds != ""){
			posIds = posIds.substr(0,posIds.length-1);
		}
		$("#posIds").val(posIds);
		Common.jqGridReload("selectedGrid", {posIds:posIds});
	});
	
	$("#saveBtn").click(function(e){
		var posIds = $("#posIds").val();
		var projectInfoId = $("#projectInfoId").val();
		
		var useDate = $("#useDate").val();
    	var useDates = useDate.split(" 至 ");
    	var useDateStart = useDate==""?"":useDates[0];
    	var useDateEnd = useDate==""?"":useDates[1];
    	
		if (posIds == null || posIds == "") {
			Common.messageBox("提示", "您还没有选择POS机！", false);
			return false;
		}
		if($("#provinceName").val() == null || $("#provinceName").val() == ""){
			Common.messageBox("提示", "您还没有选择省！", false);
			$("#provinceName").select2("open");
			return false;
		}
		if($("#cityName").val() == null || $("#cityName").val() == ""){
			Common.messageBox("提示", "您还没有选择市！", false);
			$("#cityName").select2("open");
			return false;
		}
		if($("#buildingProjectName").val() == null || $("#buildingProjectName").val() == ""){
			Common.messageBox("提示", "您还没有选择楼盘！", false);
			$("#buildingProjectName").select2("open");
			return false;
		}
		if($("#projectInfoId").val() == null || $("#projectInfoId").val() == ""){
			Common.messageBox("提示", "您还没有选择项目！", false);
			$("#projectInfoId").select2("open");
			return false;
		}
		if($("#useDate").val() == null || $("#useDate").val() == ""){
			Common.messageBox("提示", "您还没有选择使用时间！", false);
			return false;
		}
		
		$.ajax({
			url : "savetransfer",
			type : "post",
			data : {
				posIds :posIds,
				projectInfoId : projectInfoId,
				useDateStart : useDateStart,
				useDateEnd : useDateEnd,
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.alert("POS机调动成功！", true,back);
				} else {
					Common.messageBox("提示", json.msg, false);
				}
			},
			error : function() {
				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
			}
		});
		
	});
	
	$("#backBtn").click(back);
	
	function back() {
		location.href = "index";
	}
	
	/*$("#useDateEnd").change(function(){
		if($("#useDateEnd").val() ==null || $("#useDateEnd").val() == "" || $("#useDateStart").val() ==null || $("#useDateStart").val() ==""){
			return;
		}
		var startTime = new Date($("#useDateStart").val().replace("-", "/").replace("-", "/"));
		var endTime = new Date($("#useDateEnd").val().replace("-", "/").replace("-", "/"));
		if(startTime>endTime){
			$("#useDateEnd").val($("#useDateStart").val());
		}
	});
	$("#useDateStart").change(function(){
		if($("#useDateEnd").val() ==null || $("#useDateEnd").val() == "" || $("#useDateStart").val() ==null || $("#useDateStart").val() ==""){
			return;
		}
		var startTime = new Date($("#useDateStart").val().replace("-", "/").replace("-", "/"));
		var endTime = new Date($("#useDateEnd").val().replace("-", "/").replace("-", "/"));
		if(startTime>endTime){
			$("#useDateEnd").val($("#useDateStart").val());
		}
	});*/
	/** **************************************按钮事件 end *************************************** */
});