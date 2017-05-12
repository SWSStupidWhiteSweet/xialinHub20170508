$(function($) {
	
	/*$("#createTimeStart").change(function(){
		if($("#createTimeEnd").val() ==null || $("#createTimeEnd").val() == "" || $("#createTimeStart").val() ==null || $("#createTimeStart").val() ==""){
			return;
		}
		var startTime = new Date($("#createTimeStart").val().replace("-", "/").replace("-", "/"));
		var endTime = new Date($("#createTimeEnd").val().replace("-", "/").replace("-", "/"));
		if(startTime>endTime){
			$("#createTimeEnd").val($("#createTimeStart").val());
		}
	});
	$("#createTimeEnd").change(function(){
		if($("#createTimeEnd").val() ==null || $("#createTimeEnd").val() == "" || $("#createTimeStart").val() ==null || $("#createTimeStart").val() ==""){
			return;
		}
		var startTime = new Date($("#createTimeStart").val().replace("-", "/").replace("-", "/"));
		var endTime = new Date($("#createTimeEnd").val().replace("-", "/").replace("-", "/"));
		if(startTime>endTime){
			$("#createTimeEnd").val($("#createTimeStart").val());
		}
	});*/
	
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
				$("#createTime").val(currentdate+" 至 "+currentdate);
			}
		}
	});
	
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#channelBrokerGrid";
	var pagerSelector = "#channelBrokerGridPager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "经纪人管理列表",
		url : "getgriddata",
		postData : {},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '经纪人ID', '经纪人指纹', '经纪公司名称', '门店编码', '门店名称', '所属省', '所属市', 
		                  '姓名', '性别', '手机号码', '状态', '创建时间', '注册来源'],
		colModel : [ {
			name : "brokerId",
			index : "broker_id",
			width : 60,
			sorttype : "int",
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
			name : "brokerCompanyName",
			index : "broker_company_name",
			width : 240,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "storeCode",
			index : "store_code",
			width : 120,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "storeName",
			index : "store_name",
			width : 200,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "provinceName",
			index : "province_name",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "cityName",
			index : "city_name",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "brokerName",
			index : "broker_name",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "brokerSex",
			index : "broker_sex",
			width : 60,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "brokerTel",
			index : "broker_tel",
			width : 100,
			sorttype : "long",
			editable : false,
			fixed : true
		}, {
			name : "status",
			index : "status",
			width : 60,
			sorttype : "int",
			editable : false,
			formatter : statusFormatter,
			fixed : true
		}, {
			name : "createTime",
			index : "create_time",
			width : 140,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "createSrc",
			index : "create_src",
			width : 80,
			sorttype : "string",
			editable : false,
			formatter : create_srcFormatter,
			fixed : true
		}]
	});

	// 选中行事件
	/*jqGridOption.onSelectRow = function(rowIndex, status) {
		var rowData = $(gridSelector).getRowData(rowIndex);
		
		$.ajax({
			url : "getoperatorrole",
			type : "post",
			dateType : "josn",
			data : {
				operatorId : rowData.operatorId
			},
			success : function(json) {
				Common.jqGridSetAllRowUnSelect(roleGridSelector);
				
				if (Common.isEmpty(json.result)) return;
				
				// 循环所有角色
				var obj = $(roleGridSelector).jqGrid("getRowData");
				
			    var roleArray = json.result.split(",");
				
				for (var i = 0; i < obj.length; i++) {
					if ($.inArray(obj[i].roleId, roleArray) >= 0) {
						$(roleGridSelector).setSelection(i + 1, false); // rowIndex从1开始
					}
				}
			}
		});
		
		$(roleGridSelector).setSelection(3, false);
	};*/

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */
	
	Common.initSelect2("province", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	
	Common.initSelect2("city", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	
	/*function formatsex(value) {
		switch (value) {
		case "0":
			return "保密";
		case "1":
			return "男";
		case "2":
			return "女";
		default:
			return "未知";
		}
	}*/

	/** **************************************按钮事件 start *************************************** */
	//跳转到添加页面
	$("#add").click(function(){
		location.href = "add";
	});
	
	//查看
	$("#look").click(function(){
		var selectedRowId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowId)) {
			Common.messageBox("提示", "请选择一条你想查看的数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowId);
		location.href = "view?brokerId=" + rowData.brokerId;
	});
	
	//修改
	$("#mod").click(function(){
		var selectedRowId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowId)) {
			Common.messageBox("提示", "请选择一条你想修改的数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowId);
		location.href = "mod?brokerId=" + rowData.brokerId;
	});
	
	//删除
	$("#delete").click(function(){
		var selectedRowId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowId)) {
			Common.messageBox("提示", "请选择一条你想修改的数据！", false);
			return false;
		}
		Common.confirm("确定要删除这条数据吗?",function(){
			var rowData = Common.jqGridGetRowData(gridSelector, selectedRowId);
			$.ajax({
				url:"delete",
				type:"post",
				dataType:"json",
				data:{brokerId:rowData.brokerId},
				success:function(data){
					if (data.isSuccess) {
						Common.alert("删除成功！", true,function(){
							location.href = "index";
						});
					} else {
						Common.messageBox("提示", json.msg, false);
					}
				}
			});
		});
		
	});
	
	//导出
	$("#export").click(function(){
		var createTime = $("#createTime").val();
    	var createTimes = createTime.split(" 至 ");
    	
    	var createTimeStart = createTime==""?"":createTimes[0];
    	var createTimeEnd = createTime==""?"":createTimes[1];
    	var provinceId = $("#province").val();
    	var cityId = $("#city").val();
    	var status = $("#status").val()=="-1"?"":$("#status").val();
    	var brokerCompanyName = $("#brokerCompanyName").val();
    	var storeName = $("#storeName").val();
    	var brokerName = $("#brokerName").val();
    	var brokerTel = $("#brokerTel").val();
		location.href = "export?createTimeStart="+createTimeStart+"&createTimeEnd="+createTimeEnd+"&provinceId="+provinceId+
						"&cityId="+cityId+"&status="+status+"&brokerCompanyName="+brokerCompanyName+"&storeName="+storeName+
						"&brokerName="+brokerName+"&brokerTel="+brokerTel;
	});
	
	//模板导出
	$("#exportmod").click(function(){
		location.href = "exportmod";
	});
	
	//经纪人导入
	$("#uploadFile").uploadifive({
		buttonText : "导入",
		//swf : '${path}/assert/plugins/uploadify/uploadify.swf',
		uploadScript : "../../common/upload/excel",
		fileType : "*.zip",
		buttonClass : "btn btn-white btn-default btn-round ace-icon fa fa-upload blue inputstyle",
		queueSizeLimit : 1,
		removeCompleted : true,
		onUploadComplete : function(file, data) {
			var jsonData = eval("(" + data + ")");
			console.log(jsonData[0]);
			$.ajax({
				url : "import",
				data : {
					diskPath : jsonData[0].diskPath
				},
				type : "post",
				dataType : "json",
				success : function(json) {
					if(json.isSuccess){
						Common.alert(json.msg,true,function(){
							location.href = "index";
						});
					}else{
						Common.messageBox("提示", json.msg, false);
					}
				},
				error : function() {
					Common.messageBox("提示", "服务器繁忙,请稍后在重试！！", false);
				}
			});
		}
	});
	
	$("#uploadFile").parent().attr("style","line-height: 25px;overflow: hidden;text-align: center;cursor:potinter;");
	
	/** **************************************按钮事件 end *************************************** */
});