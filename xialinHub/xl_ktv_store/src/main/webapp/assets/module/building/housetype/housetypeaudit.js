$(function($) {
	
	Common.initSelect2("auditFlag", {
		width : "120px"
	});
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";
	var buildingProjectId =$("#buildingProjectId").val();
	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "楼盘户型审核信息列表",
		url : "getbuildingloggrid",
		postData : {buildingProjectId:buildingProjectId},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '户型日志ID', '户型名',  '户型面积', '套内面积', '赠送面积', '户型单价',
				 '创建时间', '操作人', '操作方式',
				'审核状态', '审核人', '审核时间','审核事由' ],
		colModel : [ {
			name : "houseLogId",
			index : "house_log_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "houseName",
			index : "house_name",
			width : 100,
			sorttype : "string",
			editable : false
		},{
			name : "floorArea",
			index : "floor_area",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "useArea",
			index : "use_area",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "giveArea",
			index : "give_area",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "housePrice",
			index : "house_price",
			width : 100,
			sorttype : "string",
			editable : false,
            formatter:buildingPriceFormatter
		},  {
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
				var buildingProjectId=$('#buildingProjectId').val();

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
                                            var houseName=$("#houseName").val();
                                            var auditFlag=$("#auditFlag").val();
											var params = {
													auditFlag :auditFlag,
													houseName : houseName,
                                                buildingProjectId:buildingProjectId
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
                                            $("#houseName").val("");

                                        }
                                    } ]
								});
			});

	/**
	 * 导出
	 */
	$("#excel").click(function() {
		var houseName=$('#houseName').val();
		var  auditFlag=$("#auditFlag").val();
		var buildingProjectId=$('#buildingProjectId').val();
		location.href = "export?houseName="+encodeURI(encodeURI(houseName))+"&auditFlag="+auditFlag +"&buildingProjectId="+buildingProjectId;
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
		window.parent.location.href = "toaduit?houseLogId="+rowData.houseLogId;
	});

	/**
	 * **************************************按钮事件 end ***************************************
	 */
});