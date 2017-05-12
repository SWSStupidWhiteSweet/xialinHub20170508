$(function() {
	/** ***********************************************界面初使化********************************************************* */
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

	$("#query").click(function() {
		query(satisfactionGridTable);
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
									var provinceId = $("#province").val();
									var cityId = $("#city").val();
									var buildingProjectId = $("#buildingProject").val();
									var datePeriod = $("#datePeriod").val();

									Common.jqGridReload(gridId, {
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
	var satisfactionGridTable = "#satisfactionGridTable";
	var satisfactionGridPager = "#satisfactionGridPager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : satisfactionGridPager,
		gridSelector : satisfactionGridTable,
		parentDOMClass : "col-sm-12",
		title : "客户满意度统计",
		url : "getcustomersatisfactiongriddata",
		postData : {},
		multiSelect : false,
		height : "500px",
		sortName : "province_name",
		sortOrder : "desc",
		colNamesArray : [ '省份', '城市', '楼盘', '发送量', '回复量', '回复率', '非常满意', '满意', '一般', '不满意', '非常不满意', '满意率', '不满意率' ],
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
			name : "sendTotal",
			index : "send_total",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "recvTotal",
			index : "recv_total",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "recvRatio",
			index : "recv_ratio",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "verySatisfiedTotal",
			index : "very_satisfied_total",
			width : 60,
			sortable : false,
			editable : false
		}, {
			name : "satisfiedTotal",
			index : "satisfied_total",
			width : 60,
			sortable : false,
			editable : false
		}, {
			name : "normalTotal",
			index : "normal_total",
			width : 60,
			sortable : false,
			editable : false
		}, {
			name : "unsatisfyTotal",
			index : "unsatisfy_total",
			width : 60,
			sortable : false,
			editable : false
		}, {
			name : "veryUnsatisfyTotal",
			index : "very_unsatisfy_total",
			width : 60,
			sortable : false,
			editable : false
		}, {
			name : "satisfiedRatio",
			index : "satisfied_ratio",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "unsatisfyRatio",
			index : "unsatisfy_ratio",
			width : 60,
			sorttype : "string",
			editable : false
		} ]
	});

	// 选中行事件
	jqGridOption.onSelectRow = function(rowIndex, status) {
		var rowData = $(satisfactionGridTable).getRowData(rowIndex);
	};

	// 渲染表格
	$(satisfactionGridTable).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	// 表头分组
	jQuery(satisfactionGridTable).jqGrid('setGroupHeaders', {
		useColSpanStyle : true,
		groupHeaders : [ {
			startColumnName : 'verySatisfiedTotal',
			numberOfColumns : 5,
			titleText : '<div style="width:100%;text-align:center">回复内容统计</div>'
		} ]
	});

	/** **************************************构造jqGrid end *************************************** */
});