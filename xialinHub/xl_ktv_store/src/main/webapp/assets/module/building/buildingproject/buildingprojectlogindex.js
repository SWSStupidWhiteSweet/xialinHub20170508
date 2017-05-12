$(function($) {
	Common.initSelect2("auditFlag", {
		width : "120px"
	});
	 // 初始化下拉框
    Common.initSelect2("provinceId", {
        allowClear: true,
        minimumResultsForSearch: Infinity,
        width: "120px"
    });
    Common.initSelect2("cityId", {

        width: "120px"
    });
    Common.initSelect2("saleStatus", {
        width: "120px"
    });
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "楼盘项目审核信息列表",
		url : "getbuildingloggrid",
		postData : {},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '楼盘日志ID', '楼盘名称', '开发商', '所属省', '所属市', '所属区', '楼盘地址',
				'售楼处电话', '均价', '销售状态', '物业公司', '开盘时间', '创建时间', '创建人', '操作方式',
				'审核状态', '审核人', '审核时间','审核事由' ],
		colModel : [ {
			name : "buildingProjectLogId",
			index : "building_project_log_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "buildingProjectName",
			index : "building_project_name",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "companyName",
			index : "company_name",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "provinceName",
			index : "province_name",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "cityName",
			index : "city_name",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "districtName",
			index : "district_name",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "address",
			index : "address",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "tel",
			index : "tel",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "price",
			index : "price",
			width : 100,
			sorttype : "string",
			editable : false,
            formatter: buildingPriceFormatter
		}, {
			name : "saleStatus",
			index : "sale_status",
			width : 100,
			sorttype : "int",
			editable : false,
			formatter : sale_statusFormatter
		}, {
			name : "propertyCompany",
			index : "property_company",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "startDate",
			index : "start_date",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "createTime",
			index : "create_time",
			width : 130,
			sorttype : "string",
			editable : false
		}, {
			name : "operatorName",
			index : "operator_name",
			width : 130,
			sorttype : "string",
			editable : false
		}, {
			name : "operateFlag",
			index : "operate_flag",
			width : 130,
			sorttype : "string",
			editable : false,
			formatter : operate_flagFormatter
		}, {
			name : "auditFlag",
			index : "audit_flag",
			width : 100,
			sorttype : "string",
			editable : false,
			formatter : audit_flagFormatter
		}, {
			name : "auditOperatorName",
			index : "audit_operator_name",
			width : 130,
			sorttype : "string",
			editable : false
		}, {
			name : "auditTime",
			index : "audit_time",
			width : 130,
			sorttype : "string",
			editable : false
		}, {
			name : "auditReason",
			index : "audit_reason",
			width : 130,
			sorttype : "string",
			editable : false
		} ]
	});

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/**
	 * **************************************构造jqGrid end ***************************************
	 */

	/**
	 * **************************************按钮事件 start ***************************************
	 */
	$("#search").click(
			function() {
				var dialog = $("#condition").removeClass('hide')
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
											var params = {
													auditFlag : $("#auditFlag").val(),
													buildingProjectName : $("#buildingProjectName").val(),
				                                    provinceId:$('#provinceId').val(),
				                                    cityId :$('#cityId').val(),
				                                    saleStatus : $('#saleStatus').val()
											};
											Common.jqGridReload(gridSelector, params);
											$(this).dialog("close");
										}
									} ,{
                                        text : "重置",
                                        "class" : "btn btn-primary btn-xs",
                                        click : function() {
                                            $('#auditFlag').select2("val", "");
                                            $('#auditFlag').trigger("change");
                                            $("#buildingPrijectName").val("");

                                        }
                                    }]
								});
			});

	/**
	 * 导出
	 */
	$("#excel").click(function() {
		location.href = "excel?buildingProjectName="+$("#buildingProjectName").val()
			+"&auditFlag="+$("#auditFlag").val()
			+"&provinceId="+$('#provinceId').val()
			+"&cityId="+$('#cityId').val()
			+"&saleStatus="+$('#saleStatus').val();
	});
	/**
	 * 跳转到审核页面
	 */
	$("#aduit").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你要审核的数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		if(rowData.auditFlag.indexOf("未审核")<0){
			Common.messageBox("提示", "该条数据已经审核过了！", false);
			return false;
		}
		window.parent.location.href = "toaduit?buildingProjectLogId="+rowData.buildingProjectLogId;
	});

	$("#viewaudit").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你要查看的数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		window.parent.location.href = "toaduit?type=view&buildingProjectLogId="+rowData.buildingProjectLogId;
	});
	/**
	 * **************************************按钮事件 end ***************************************
	 */
});