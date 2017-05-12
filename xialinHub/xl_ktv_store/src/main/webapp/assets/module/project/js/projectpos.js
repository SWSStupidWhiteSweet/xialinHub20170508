$(function($) {
		/** **************************************构造jqGrid start *************************************** */
		var gridSelector = "#projectpos_grid-table";
		var pagerSelector = "#projectpos_grid-pager";

		// 构造jqGrid配置信息
		var jqGridOption = new Common().createGridOption({
			pagerSelector : pagerSelector,
			gridSelector : gridSelector,
			parentDOMClass : "col-sm-12",
			title : "pos分配记录",
			url : "../pos/getprojectpos",
			postData : {},
			multiSelect : false,
			sortName : "create_time",
			sortOrder : "desc",
			height : "500px",
			colNamesArray : ['城市', 'pos机类型', '终端号', '使用开始时间', '使用结束时间','类型','项目变更明细','调动时间','调动申请人'],
			colModel : [{
				name : "cityName",
				index : "city_name",
				width : 120,
				sorttype : "string",
				editable : false
			}, {
				name : "posType",
				index : "pos_type",
				width : 120,
				sorttype : "string",
				editable : false,
				formatter :posFormatter
			}, {
				name : "terminalNo",
				index : "terminal_no",
				width : 120,
				sorttype : "string",
				editable : false
			}, {
				name : "toStartDate",
				index : "to_start_date",
				width : 120,
				sorttype : "string",
				editable : false
			}, {
				name : "toEndDate",
				index : "to_end_date",
				width : 120,
				sorttype : "string",
				editable : false
			}, {
				name : "transferType",
				index : "transferType",
				width : 100,
				sorttype : "string",
				editable : false,
				formatter :chooseFormatter
			}, {
				name : "projectChangeInfo",
				index : "projectChangeInfo",
				width : 150,
				sorttype : "string",
				editable : false
			}, {
				name : "createTime",
				index : "create_time",
				width : 150,
				sorttype : "string",
				editable : false,
				formatter : dateTimeFormatter
			}, {
				name : "operatorName",
				index : "operator_name",
				width : 120,
				sorttype : "string",
				editable : false
			}]
		});
	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	Common.initSelect2("projectpos_province", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "120px"
	});
	
	Common.initSelect2("projectpos_city", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "120px"
	});
	Common.initSelect2("projectposType", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "120px"
	});
	Common.initSelect2("projectpostransferType", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "120px"
	});
	
	
	/** **************************************构造jqGrid end *************************************** */

	/** **************************************按钮事件 start *************************************** */

	//查询
	$("#pos_options").click(function() {
		var dialog = $("#pos_condition").removeClass('hide').dialog({
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
						provinceId : $("#projectpos_province").val(),
						cityId : $("#projectpos_city").val(),
						posType : $("#projectposType").val(),
						transferType : $("#projectpostransferType").val(),
						toStartDate : $("#projectpostoStartDate").val(),
						toEndDate : $("#projectpostoEndDate").val(),
						posTerminalCode : $("#projectposposTerminalCode").val(),
						terminalNo : $("#projectposterminalNo").val(),
						createTime1 : $("#projectposcreateTime1").val(),
						createTime2 : $("#projectposcreateTime2").val(),
						operatorName : $("#projectposopera").val()
					});
					$(this).dialog("close");
				}
			}, {
				text : "重置",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					$("#projectpostoStartDate").val("");
					$("#projectpostoEndDate").val("");
					$("#projectposposTerminalCode").val("");
					$("#projectposterminalNo").val("");
					$("#projectposcreateTime1").val("");
					$("#projectposcreateTime2").val("");
					$("#projectposopera").val("");
					$("#projectpostransferType").select2("val", "");
					$("#projectposType").select2("val", "");
					$("#projectpos_city").select2("val", "");
					$("#projectpos_province").select2("val", "");
					$("#projectpos_province").trigger("change");
				}
			} ]
		});
	});
	
	$("#projectpos_export").click(function(){
		location.href="../pos/posexcel";
	});
	
	
	/** **************************************按钮事件 end *************************************** */
});