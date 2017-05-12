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
		query(archiveInfoGridTable);
	});
	
	$("#detail").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(archiveInfoGridTable);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想查看详情的数据！", false);
			return false;
		}
		
		var rowData = Common.jqGridGetRowData(archiveInfoGridTable, selectedRowsId);
		
		location.href = "archivedetail/" + rowData.sellCustomArchivesId;
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
									var archiveText = $("#archiveText").val();
									var provinceId = $("#province").val();
									var cityId = $("#city").val();
									var buildingProjectId = $("#buildingProject").val();
									var datePeriod = $("#datePeriod").val();

									Common.jqGridReload(gridId, {
										archiveText : archiveText,
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
                                    $("#archiveText").val("");
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
	var archiveInfoGridTable = "#archiveInfoGridTable";
	var archiveInfoGridPager = "#archiveInfoGridPager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : archiveInfoGridPager,
		gridSelector : archiveInfoGridTable,
//		widthOffset : "25px",
		parentDOMClass : "col-sm-12",
		title : "客档信息统计",
		url : "getarchiveinfogriddata",
		postData : {},
		multiSelect : false,
		height : "500px",
		sortName : "sell_custom_archives_id",
		sortOrder : "desc",
		colNamesArray : ['客档ID', '省份', '城市', '楼盘', '销售姓名', '客档姓名', '客档电话', '建档时间'],
		colModel : [ {
			name : "sellCustomArchivesId",
			index : "sell_custom_archives_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
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
			name : "archivesName",
			index : "archives_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "archivesTel1",
			index : "archives_tel1",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "createTime",
			index : "create_time",
			width : 60,
			sorttype : "string",
			editable : false
		} ]
	});

	// 选中行事件
	jqGridOption.onSelectRow = function(rowIndex, status) {
		var rowData = $(archiveInfoGridTable).getRowData(rowIndex);
	};

	// 渲染表格
	$(archiveInfoGridTable).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */
});