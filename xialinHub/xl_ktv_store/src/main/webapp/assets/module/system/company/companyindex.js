$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-7",
		title : "公司列表",
		url : "getgriddata",
		postData : {},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '公司ID', '省ID', '市ID', '所属省', '所属市', '公司名称', '创建时间', '状态' ],
		colModel : [ {
			name : "companyId",
			index : "company_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "provinceId",
			index : "province_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "cityId",
			index : "city_id",
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
			index : "city_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "companyName",
			index : "company_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "createTime",
			index : "create_time",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "status",
			index : "status",
			width : 60,
			sorttype : "int",
			editable : false,
			formatter : statusFormatter
		} ]
	});

	// 选中行事件
	jqGridOption.onSelectRow = function(rowIndex, status) {
		var rowData = $(gridSelector).getRowData(rowIndex);

	};

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变
	


	/** **************************************构造jqGrid end *************************************** */

	/** **************************************按钮事件 start *************************************** */
	/**
	 * 跳转到新增商户页面
	 */
	$("#add").click(function() {
		var treeItem = $("." + CONSTANT_CLASS_TREE_SELECTED);
		if (typeof treeItem.attr("id") == "undefined") {
			Common.messageBox("提示", "请选择一个公司节点！", false);
			return false
		}
		
		if (treeItem.attr("id").indexOf("merchant") >= 0 || treeItem.attr("id") === CONSTANT_TREENODE + "0") {
			Common.messageBox("提示", "当前选中的结点下不能创建子公司", false);
		} else {
			location.href = "add?parentId=" + treeItem.attr("id").split("_")[2];
		}
	});

	/**
	 * 跳转到修改公司页面
	 */
	$("#edit").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想修改的数据！", false);
			return false;
		}

		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		
		location.href = "modify?companyId=" + rowData.companyId;
	});

	/**
	 * 启用禁用商户
	 */
	$("#lock").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想禁用/启用的数据！", false);
			return false;
		}

		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

		Common.confirm("请确认是否要启用/禁用该公司？", function() {
			$.ajax({
				url : "lock",
				type : "post",
				data : {
					companyId : rowData.companyId
				},
				dataType : "json",
				success : function(json) {
					if (json.isSuccess) {
						Common.alert("禁用/启用公司成功！", true, function() {
							location.href = "companyindex";
						});
					} else {
						Common.messageBox("提示", json.msg, false);
					}
				},
				error : function() {
					Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
				}
			});
		});
	});
	
	Common.initSelect2("company_province", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "200px"
	});

	Common.initSelect2("company_city", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "200px"
	});

	
	$("#company_options").click(function() {
		var dialog = $("#company_condition").removeClass('hide').dialog({
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
						provinceId : $("#company_province").val(),
						cityId : $("#company_city").val(),
						companyName : $("#myCompanyName").val()
					});
					$(this).dialog("close");
				}
			},{
				text : "重置",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					$("#myCompanyName").val("");
					$("#company_city").select2("val", "");
					$("#company_province").select2("val", "");
					$("#company_province").trigger("change");
				}
			} ]
		});
	});

	/** **************************************按钮事件 end *************************************** */
});