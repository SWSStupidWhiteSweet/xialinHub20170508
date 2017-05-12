$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#infolist_grid-table";
	var pagerSelector = "#infolist_grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "项目列表",
		url : "getgriddata",
		postData : {},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '项目ID', '楼盘名称', '项目名称', '城市', '合作开始时间', '合作结束时间','认购截止日期','现场联系人','现场联系人电话','是否上架'],
		colModel : [ {
			name : "projectInfoId",
			index : "project_info_id",
			width : 10,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "buildingProjectName",
			index : "building_project_name",
			width : 275,
			sorttype : "string",
			editable : false
		}, {
			name : "projectInfoName",
			index : "project_info_name",
			width : 275,
			sorttype : "string",
			editable : false
		}, {
			name : "cityName",
			index : "city_name",
			width : 140,
			sorttype : "string",
			editable : false
		}, {
			name : "cooperationStart",
			index : "cooperation_start",
			width : 180,
			sorttype : "string",
			editable : false
		}, {
			name : "cooperationEnd",
			index : "cooperation_end",
			width : 150,
			sorttype : "string",
			editable : false
		}, {
			name : "saleEndDate",
			index : "sale_end_date",
			width : 150,
			sorttype : "string",
			editable : false
		}, {
			name : "contacts",
			index : "contacts",
			width : 150,
			sorttype : "string",
			editable : false
		}, {
			name : "contactsTel",
			index : "contacts_tel",
			width : 150,
			sorttype : "string",
			editable : false
		}, {
			name : "isStart",
			index : "is_start",
			width : 100,
			sorttype : "string",
			editable : false,
			formatter : isStartFormatteShelves
		}]
	});

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */

	/** **************************************按钮事件 start *************************************** */
	Common.initSelect2("infolist_province", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});

	Common.initSelect2("infolist_city", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});

	Common.initSelect2("infolist_isStart",{
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});

	$("#infolist_options").click(function() {
		var dialog = $("#infolist_condition").removeClass('hide').dialog({
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
					Common.jqGridReload(gridSelector,{
						provinceId : $("#infolist_province").val(),
						cityId : $("#infolist_city").val(),
						isStart : $("#infolist_isStart").val(),
						cooperationStart : $("#infolist_cooperationStart").val(),
						cooperationEnd : $("#infolist_cooperationEnd").val(),
						projectInfoName : $("#infolist_projectInfoName").val()
					});
					$(this).dialog("close");
				}
			},{
				text : "重置",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					$("#infolist_cooperationEnd").val("");
					$("#infolist_cooperationStart").val(""),
					$("#infolist_projectInfoName").val("");
					$("#infolist_isStart").select2("val", "");
					$("#infolist_city").select2("val", "");
					$("#infolist_province").select2("val", "");
					$("#infolist_province").trigger("change");
				}
			} ]
		});
	});

	/*查看*/
	$("#infolist_view").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		location.href = "view?projectInfoId=" + rowData.projectInfoId;
	});
	/*添加*/
	$("#infolist_add").click(function() {
		location.href = "add";
	});

	/*修改*/
	$("#infolist_modify").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想修改的数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		location.href = "skipPage?projectInfoId=" + rowData.projectInfoId+"&tabId=projectinfo";
	});

	/*上架申请*/
	$("#infolist_upShelf").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想上架的数据！", false);
			return false;
		}

		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		Common.confirm("请确认是否上架该项目？", function(){
			Common.showMask("请稍候......");
			$.ajax({
				url : "upShelf",
				type : "post",
				data : {
					projectInfoId : rowData.projectInfoId
				},
				dataType : "json",
				success : function(json) {
					Common.hideMask();
					if (json.isSuccess) {
						Common.messageBox("提示", json.msg, true);
						Common.jqGridReload(gridSelector);
						Common.jqGridReload("#infologlist_grid-table",{});

					} else {
						Common.messageBox("提示", json.msg, false);
					}
				},
				error : function() {
					Common.hideMask();
					Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
				}
			});
		});
	});
	/*下架申请*/
	$("#infolist_downShelf").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想下架的数据！", false);
			return false;
		}

		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

		Common.confirm("请确认是否下架该项目？", function(){
			Common.showMask("请稍候......");
			$.ajax({
				url : "downShelf",
				type : "post",
				data : {
					projectInfoId : rowData.projectInfoId
				},
				dataType : "json",
				success : function(json) {
					Common.hideMask();
					if (json.isSuccess) {
						Common.messageBox("提示",json.msg, true);
						Common.jqGridReload(gridSelector);
						Common.jqGridReload("#infologlist_grid-table",{});
					} else {
						Common.messageBox("提示", json.msg, false);
					}
				},
				error : function() {
					Common.hideMask();
					Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
				}
			});
		});
	});
	/*删除*/
	$("#infolist_delete").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想删除的数据！", false);
			return false;
		}

		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

		Common.confirm("请确认是否删除该条数据？", function(){
			Common.showMask("请稍候......");
			$.ajax({
				url : "projectDelete",
				type : "post",
				data : {
					projectInfoId : rowData.projectInfoId
				},
				dataType : "json",
				success : function(json) {
					Common.hideMask();
					if (json.isSuccess) {
						Common.messageBox("提示",json.msg, true);
						Common.jqGridReload(gridSelector);
						Common.jqGridReload("#log_grid-table",{});
						Common.jqGridReload("#infologlist_grid-table",{});
					} else {
						Common.messageBox("提示", json.msg, false);
					}
				},
				error : function() {
					Common.hideMask();
					Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
				}
			});
		});
	});

	$("#infolist_export").click(function(){
		location.href="export";
	});

	$("#infolist_search").click(function(){
		Common.jqGridReload(gridSelector,{
			provinceId : $("#infolist_province").val(),
			cityId : $("#infolist_city").val(),
			isStart : $("#infolist_isStart").val(),
			cooperationStart : $("#infolist_cooperationStart").val(),
			cooperationEnd : $("#infolist_cooperationEnd").val(),
			projectInfoName : $("#infolist_projectInfoName").val()
		});
	});

	//项目配置管理click
	$("#projectconfig_infolist").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		location.href = "skipPage?projectInfoId=" + rowData.projectInfoId+"&tabId=projectconfig";
	});
	//项目套餐管理
	$("#projectpackage_infolist").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		location.href = "skipPage?projectInfoId=" + rowData.projectInfoId+"&tabId=projectpackage";

	});

	//项目测算管管理
	$("#projectguess_infolist").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		location.href = "skipPage?projectInfoId=" + rowData.projectInfoId+"&tabId=projectguess";

	});
	//项目日志管理
	$("#projectlog_infolist").click(function(){     
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		location.href = "skipPage?projectInfoId=" + rowData.projectInfoId+"&tabId=projectlog";

	});
	//POS流水查看
	$("#projectdetail_infolist").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		location.href = "skipPage?projectInfoId=" + rowData.projectInfoId+"&tabId=projectdetail";

	});

	//项目POS终端查看
	$("#projectpos_infolist").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		location.href = "skipPage?projectInfoId=" + rowData.projectInfoId+"&tabId=projectpos";

	});
	/** **************************************按钮事件 end *************************************** */
});