$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#projectdetail_grid-table";
	var pagerSelector = "#projectdetail_grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "pos流水查看",
		url : "../detail/getprojcetdetail",
		postData : {},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '城市', '终端号', '所在项目', '操作人','操作人联系电话','操作时间','备注'],
		colModel : [{
			name : "cityName",
			index : "city_name",
			width : 120,
			sorttype : "string",
			editable : false
		}, {
			name : "posTerminalCode",
			index : "pos_terminal_code",
			width : 120,
			sorttype : "string",
			editable : false
		}, {
			name : "projectInfoName",
			index : "project_info_name",
			width : 140,
			sorttype : "string",
			editable : false
		}, {
			name : "operatorName",
			index : "operator_name",
			width : 175,
			sorttype : "string",
			editable : false
		}, {
			name : "operatorTel",
			index : "opertor_tel",
			width : 175,
			sorttype : "string",
			editable : false
		}, {
			name : "createTime",
			index : "create_time",
			width : 175,
			sorttype : "string",
			editable : false,
			formatter: dateTimeFormatter
		}, {
			name : "remark",
			index : "remark",
			width : 175,
			sorttype : "string",
			editable : false
		}]
	});
	

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	Common.initSelect2("projectdetail_province", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "140px"
	});
	
	Common.initSelect2("projectdetail_city", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "140px"
	});
	Common.initSelect2("projectdetailbuildingProjectId", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "140px"
	});
	/** **************************************构造jqGrid end *************************************** */

	/** **************************************按钮事件 start *************************************** */
	
	//查询
	$("#detail_options").click(function() {
		var dialog = $("#detail_condition").removeClass('hide').dialog({
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
						 provinceId : $("#projectdetail_province").val(),
						 cityId :     $("#projectdetail_city").val(),
						 buildingProjectId : $("#projectdetailbuildingProjectId").val(),
						 posTerminalCode : $("#projectdetailterminalCode").val(),
						 operatorName : $("#projectdetailoperatorName").val()
					});
					$(this).dialog("close");
				}
			},{
				text : "重置",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					$("#projectdetailoperatorName").val("");
					$("#projectdetailterminalCode").val("");
					$("#projectdetailbuildingProjectId").select2("val", "");
					$("#projectdetail_city").select2("val", "");
					$("#projectdetail_province").select2("val", "");
					$("#projectdetail_province").trigger("change");
				}
			}]
		});
	});
	
	//导出excel
	$("#projectdetail_export").click(function(){
		location.href ="../detail/detailexcel";
	});
	/** **************************************按钮事件 end *************************************** */
});