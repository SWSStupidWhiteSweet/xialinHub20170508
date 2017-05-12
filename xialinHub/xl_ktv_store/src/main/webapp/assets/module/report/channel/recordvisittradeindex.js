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
		query(recordVisitTradeGridTable);
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
									var brokerCompanyName = $("#brokerCompanyName").val();
									var projectInfoName = $("#projectInfoName").val();
									var provinceId = $("#province").val();
									var cityId = $("#city").val();
									var buildingProjectId = $("#buildingProject").val();
									var datePeriod = $("#datePeriod").val();

									Common.jqGridReload(gridId, {
										brokerCompanyName : brokerCompanyName,
										projectInfoName : projectInfoName,
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
                                	$("#brokerCompanyName").val("");
                                	$("#projectInfoName").val("");
                                    $('#province').select2("val", "");
                                    $('#province').trigger("change");
                                    $('#city').select2("val", "");
                                    $('#city').trigger("change");
                                    $('#buildingProjectId').select2("val", "");
                                    $('#buildingProjectId').trigger("change");
                                    $('#datePeriod').val("");
                                }
                            } ]
						});
	}
	/** ***********************************************界面初使化********************************************************* */

	/** **************************************构造jqGrid start *************************************** */
	var recordVisitTradeGridTable = "#recordVisitTradeGridTable";
	var recordVisitTradeGridPager = "#recordVisitTradeGridPager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : recordVisitTradeGridPager,
		gridSelector : recordVisitTradeGridTable,
//		widthOffset : "25px",
		parentDOMClass : "col-sm-12",
		title : "渠道报备带客成交统计",
		url : "query",
		sortName : "broker_company_name",
		sortOrder : "asc",
		postData : {},
		multiSelect : false,
		height : "500px",
		colNamesArray : ['省份', '城市', '电商项目', '经纪公司', '报备量', '到访量', '成交量', '电商费汇总', '网签价汇总', '佣金汇总'],
		colModel : [ {
			name : "provinceName",
			index : "province_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "cityName",
			index : "city_name",
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
			name : "brokerCompanyName",
			index : "broker_company_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "recordCount",
			index : "record_count",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "visitCount",
			index : "visit_count",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "tradeCount",
			index : "trade_count",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "realAccAmount",
			index : "real_acc_amount",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "onlineSignAmount",
			index : "online_sign_amount",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "settleAmount",
			index : "settle_amount",
			width : 60,
			sorttype : "string",
			editable : false
		} ]
	});

	// 选中行事件
	jqGridOption.onSelectRow = function(rowIndex, status) {
		var rowData = $(recordVisitTradeGridTable).getRowData(rowIndex);
	};

	// 渲染表格
	$(recordVisitTradeGridTable).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */
});