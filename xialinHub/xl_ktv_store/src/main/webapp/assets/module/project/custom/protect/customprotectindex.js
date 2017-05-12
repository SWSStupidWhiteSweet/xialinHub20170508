$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "项目列表",
		url : "getgriddata",
		postData : {},
		multiSelect : false,
		sortName : "create_time",
		sortOrder : "desc",
		height : "500px",
		colNamesArray : [ '保护名单ID','省份ID','市ID','客户名称', '客户电话', '项目城市', '项目名称','保护开始日期', '保护结束日期','公司名称','录入时间'],
		colModel : [ {
			name : "customProtectId",
			index : "project_custom_protect_id",
			width : 50,
			sorttype : "string",
			editable : false,
			hidden : true
		},{
			name : "provinceId",
			index : "province_id",
			width : 50,
			sorttype : "string",
			editable : false,
			hidden : true
		},{
			name : "cityId",
			index : "city_id",
			width : 50,
			sorttype : "string",
			editable : false,
			hidden : true
		},{
			name : "customName",
			index : "custom_name",
			width : 120,
			sorttype : "string",
			editable : false,
		}, {
			name : "customTel",
			index : "custom_tel",
			width : 150,
			sorttype : "string",
			editable : false
		}, {
			name : "cityName",
			index : "city_name",
			width : 120,
			sorttype : "string",
			editable : false
		},{
			name : "projectInfoName",
			index : "project_info_name",
			width : 150,
			sorttype : "string",
			editable : false
		}, {
			name : "startDate",
			index : "start_date",
			width : 120,
			sorttype : "string",
			editable : false
		}, {
			name : "endDate",
			index : "end_date",
			width : 120,
			sorttype : "string",
			editable : false
		}, {
			name : "companyName",
			index : "company_name",
			width : 200,
			sorttype : "string",
			editable : false
		}, {
			name : "createTime",
			index : "create_time",
			width : 150,
			sorttype : "string",
			editable : false,
			formatter : dateTimeFormatter
		}]
	});

	// 选中行事件
	jqGridOption.onSelectRow = function(rowIndex, status) {
		var rowData = $(gridSelector).getRowData(rowIndex);

	};
	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */

	Common.initSelect2("province", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "220px"
	});

	Common.initSelect2("city", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "220px"
	});
	Common.initSelect2("projectInfoName", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "220px"
	});

	Common.initSelect2("import_province", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "220px"
	});

	Common.initSelect2("import_city", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "220px"
	});
	Common.initSelect2("import_project", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "220px"
	});



	/** **************************************按钮事件 start *************************************** */
	$("#view").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想要查看的数据！", false);
			return false;
		}
		if (selectedRowsId.length > 1) {
			Common.messageBox("提示", "请只选择一条你想要查看的数据！", false);
			return false;
		}

		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

		location.href = "viewData?customProtectId=" + rowData.customProtectId;
	});

	/*	$("#uploadFile1111").uploadifive({
		buttonText : "导入数据",
		swf      : '${path}/assert/plugins/uploadify/uploadify.swf',
		uploadScript : "../../../common/upload/excel",
		fileType : ".xls,xlsx/*",
		queueSizeLimit : 1,
		removeCompleted : true,
		onUploadComplete : function(file, data) {
			var jsonData = eval("(" + data + ")");
			console.log(jsonData[0]);
			$.ajax({
				url : "importexcel",
				data : {
					diskPath : jsonData[0].diskPath
				},
				type : "post",
				dataType : "json",
				success : function(json) {
					console.log(json);
					if(json.isSuccess){
						Common.jqGridReload("grid-table");
					}else{
						Common.messageBox("提示", "导入数据失败！！", false);
					}

				},
				error : function() {
					Common.messageBox("提示", "服务器繁忙,请稍后在重试！！", false);
				}
			});
		}
	});*/					


	//导出exel
	$("#protectexport").click(function() {
		location.href = "customedexcel";
	});

	$("#download").click(function() {
		location.href = "downloadexcel";
	});


	//查询
	$("#protect_options").click(function() {
		var dialog = $("#protect_condition").removeClass('hide').dialog({
			modal : true,
			title : "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-search'></i> 请选择查询条件</h4></div>",
			title_html : true,
			width : "800px",
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
						provinceId : $("#province").val(),
						cityId : $("#city").val(),
						projectInfoId : $("#projectInfoName").val(),
						customName : $("#customName").val(),
						customTel : $("#customTel").val(),
						companyName : $("#companyName").val(),
						startDate : $("#startDate").val(),
						endDate : $("#endDate").val()
					});
					$(this).dialog("close");
				}
			}, {
				text : "重置",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					$("#projectInfoName").val("");
					$("#customName").val( "");
					$("#customTel").val( "");
					$("#companyName").val( "");
					$("#startDate").val( "");
					$("#endDate").val( "");
					$("#projectInfoName").select2("val", "");
					$("#city").select2("val", "");
					$("#province").select2("val", "");
					$("#province").trigger("change");
				}
			}]
		});
	});

var dialog;
var path;
$("#import-data").click(function() {
	dialog = $("#import_procet").removeClass('hide').dialog({
		modal : true,
		title : "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-search'></i>请填写数据</h4></div>",
		title_html : true,
		width : "800px",
		buttons : [ {
			text : "取消",
			"class" : "btn btn-xs",
			click : function() {
				$(this).dialog("close");
			}
		}, {
			text : "导入",
			"class" : "btn btn-primary btn-xs",
			click : function() {
				var importprovinceId=$("#import_province").val();
				var importcityId=$("#import_city").val();
				var importprojectInfoId = $("#import_project").val();

				if(Common.isEmpty(importprovinceId)){
					Common.messageBox("提示", "请选择导入省！", false);
					return false;
				}
				if(Common.isEmpty(importcityId)){
					Common.messageBox("提示", "请选择导入城市！", false);
					return false;
				}
				if(Common.isEmpty(importprojectInfoId)){
					Common.messageBox("提示", "请选择导入项目！", false);	
					return false;
				}
				if(Common.isEmpty(path)){
					Common.messageBox("提示", "请选择导入excel文件！", false);	
					return false;
				}
				$.ajax({
					url : "importexcel",
					data : {
						diskPath : path,
						provinceId:importprovinceId,
						cityId:importcityId,
						projectInfoId:importprojectInfoId
					},
					type : "post",
					dataType : "json",
					success : function(json) {
						$("#import_procet").dialog("close");
						if(json.isSuccess){
							Common.messageBox("提示", json.msg, true);
							Common.jqGridReload("grid-table");
						}else{
							Common.messageBox("提示", "导入数据失败！！", false);
						}
					},
					error : function() {
						$(this).dialog("close");
						Common.messageBox("提示", "服务器繁忙,请稍后在重试！！", false);
					}
				});

				$(this).dialog("close");
			}
		}, {
			text : "重置",
			"class" : "btn btn-primary btn-xs",
			click : function() {
				$("#import_project").select2("val", "");
				$("#import_city").select2("val", "");
				$("#import_province").select2("val", "");
				$("#import_province").trigger("change");
			}
		} ]
	});	
});

$("#uploadFile").uploadifive({
	buttonText : "导入数据",
	swf      : '${path}/assert/plugins/uploadify/uploadify.swf',
	uploadScript : "../../../common/upload/excel",
	fileType : ".xls,xlsx/*",
	queueSizeLimit : 1,
	removeCompleted : true,
	onUploadComplete : function(file, data) {
		var jsonData = eval("(" + data + ")");
		path=jsonData[0].diskPath;
		var importprovinceId=$("#import_province").val();
		var importcityId=$("#import_city").val();
		var importprojectInfoId = $("#import_project").val();

		if(Common.isEmpty(importprovinceId)){
			Common.messageBox("提示", "请选择导入省！", false);
			return false;
		}
		if(Common.isEmpty(importcityId)){
			Common.messageBox("提示", "请选择导入城市！", false);
			return false;
		}
		if(Common.isEmpty(importprojectInfoId)){
			Common.messageBox("提示", "请选择导入项目！", false);	
			return false;
		}
	}
});
/** **************************************按钮事件 end *************************************** */
/*	
	var importprovinceId=$("#import_province").val();
	var importcityId=$("#import_city").val();
	var importprojectInfoId = $("#import_project").val();

	if(Common.isEmpty(importprovinceId)){
		Common.messageBox("提示", "请选择导入省！", false);
		return false;
	}
	if(Common.isEmpty(importcityId)){
		Common.messageBox("提示", "请选择导入城市！", false);
		return false;
	}
	if(Common.isEmpty(importprojectInfoId)){
		Common.messageBox("提示", "请选择导入项目！", false);
		return false;
	}
	$(this).dialog("close");*/

});