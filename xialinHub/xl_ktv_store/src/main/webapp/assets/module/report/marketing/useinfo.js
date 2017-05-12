$(function() {
	/** ***********************************************界面初使化********************************************************* */
	// 初使化tab 选中
	$(".nav-tabs").find("li:first").addClass("active");
	$(".tab-content").find("div:first").addClass("in").addClass("active");

	Common.initSelect2("province", {
		width : "200px"
	});

	Common.initSelect2("city", {
		width : "200px"
	});

	Common.initSelect2("buildingProject", {
		width : "200px"
	});

	$("#datePeriod").daterangepicker({
		applyClass : 'btn-sm btn-success',
		cancelClass : 'btn-sm btn-default',
		locale : {
			applyLabel : '确认',
			cancelLabel : '取消',
			fromLabel : '起始时间',
			toLabel : '结束时间',
			customRangeLabel : '自定义',
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

	$("#queryBySeller").click(function() {
		query(sellGridTableSelector);
	});
	
	$("#queryByProject").click(function() {
		query(projectGridTableSelector);
	});
	
	$("#queryByArea").click(function() {
		query(areaGridTableSelector);
	});

	function query(gridId) {
		var dialog = $("#condition")
				.removeClass('hide')
				.dialog(
						{
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
									var sellerText = $("#sellerText").val();
									var provinceId = $("#province").val();
									var cityId = $("#city").val();
									var buildingProjectId = $("#buildingProject").val();
									var datePeriod = $("#datePeriod").val();

									Common.jqGridReload(gridId, {
										sellerText : sellerText,
										provinceId : provinceId,
										cityId : cityId,
										buildingProjectId : buildingProjectId,
										datePeriod : datePeriod
									});

									$(this).dialog("close");
								}
							} ,{
                                text : "重置",
                                "class" : "btn btn-primary btn-xs",
                                click : function() {
                                    $("#sellerText").val("");
                                    $('#province').select2("val", "");
                                    $('#province').trigger("change");
                                    $('#city').select2("val", "");
                                    $('#city').trigger("change");
                                    $('#buildingProject').select2("val", "");
                                    $('#buildingProject').trigger("change");
                                    $('#datePeriod').val("");
                                }
                            } ]
						});
	}
	/** ***********************************************界面初使化********************************************************* */

	/** **************************************构造jqGrid start *************************************** */
	var sellGridTableSelector = "#sellGridTable";
	var sellGridPagerSelector = "#sellGridPager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : sellGridPagerSelector,
		gridSelector : sellGridTableSelector,
		widthOffset : "25px",
		parentDOMClass : "col-sm-12",
		title : "案场工具销售人员使用情况",
		url : "countbyseller",
		postData : {},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '省份', '城市', '楼盘', '销售姓名', '到访量', '关注量', '注册量', '建档量', '关注率', '注册率', '建档率' ],
		colModel : [ {
			name : "provinceName",
			index : "province_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "cityName",
			index : "cityName",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "buildingProjectName",
			index : "building_project_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "agentOperatorName",
			index : "agent_operator_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "accessTotal",
			index : "accesstotal",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "subscribeTotal",
			index : "subscribetotal",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "regTotal",
			index : "regtotal",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "archiveTotal",
			index : "archivetotal",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "subscribeRatio",
			index : "subscriberatio",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "regRatio",
			index : "regratio",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "archiveRatio",
			index : "archiveratio",
			width : 60,
			sorttype : "string",
			editable : false
		} ]
	});

	// 选中行事件
	jqGridOption.onSelectRow = function(rowIndex, status) {
		var rowData = $(sellGridTableSelector).getRowData(rowIndex);
	};

	// 渲染表格
	$(sellGridTableSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */
	
	/** **************************************构造jqGrid start *************************************** */
	var projectGridTableSelector = "#projectGridTable";
	var projectGridPagerSelector = "#projectGridPager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : projectGridPagerSelector,
		gridSelector : projectGridTableSelector,
		widthOffset : "25px",
		parentDOMClass : "col-sm-12",
		title : "案场工具项目使用情况",
		url : "countbyproject",
		postData : {},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '省份', '城市', '楼盘', '到访量', '关注量', '注册量', '建档量', '关注率', '注册率', '建档率' ],
		colModel : [ {
			name : "provinceName",
			index : "province_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "cityName",
			index : "cityName",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "buildingProjectName",
			index : "building_project_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "accessTotal",
			index : "accesstotal",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "subscribeTotal",
			index : "subscribetotal",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "regTotal",
			index : "regtotal",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "archiveTotal",
			index : "archivetotal",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "subscribeRatio",
			index : "subscriberatio",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "regRatio",
			index : "regratio",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "archiveRatio",
			index : "archiveratio",
			width : 60,
			sorttype : "string",
			editable : false
		} ]
	});

	// 选中行事件
	jqGridOption.onSelectRow = function(rowIndex, status) {
		var rowData = $(projectGridTableSelector).getRowData(rowIndex);
	};

	// 渲染表格
	$(projectGridTableSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */
	
	/** **************************************构造jqGrid start *************************************** */
	var areaGridTableSelector = "#areaGridTable";
	var areaGridPagerSelector = "#areaGridPager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : areaGridPagerSelector,
		gridSelector : areaGridTableSelector,
		widthOffset : "25px",
		parentDOMClass : "col-sm-12",
		title : "案场工具区域使用情况",
		url : "countbyarea",
		postData : {},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '省份', '城市', '到访量', '关注量', '注册量', '建档量', '关注率', '注册率', '建档率' ],
		colModel : [ {
			name : "provinceName",
			index : "province_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "cityName",
			index : "cityName",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "accessTotal",
			index : "accesstotal",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "subscribeTotal",
			index : "subscribetotal",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "regTotal",
			index : "regtotal",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "archiveTotal",
			index : "archivetotal",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "subscribeRatio",
			index : "subscriberatio",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "regRatio",
			index : "regratio",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "archiveRatio",
			index : "archiveratio",
			width : 60,
			sorttype : "string",
			editable : false
		} ]
	});

	// 选中行事件
	jqGridOption.onSelectRow = function(rowIndex, status) {
		var rowData = $(areaGridTableSelector).getRowData(rowIndex);
	};

	// 渲染表格
	$(areaGridTableSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */
});