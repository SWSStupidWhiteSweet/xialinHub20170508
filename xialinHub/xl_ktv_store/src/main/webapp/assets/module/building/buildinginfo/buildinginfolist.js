$(function($) {
	Common.initSelect2("saleStatus", {
		width : "50%"
	});
	Common.initSelect2("status", {
		width : "50%"
	});
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "楼盘期数信息列表",
		url : "getbuildinginfogrid",
		postData : {buildingProjectId:$("#buildingProjectId").val()},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '楼盘期数ID', '楼盘期数名称', '楼盘期数简称', '楼盘期数别名', /*'分期简介',*/
				'销售状态', '分期均价','公司名称', '创建时间', '状态' ],
		colModel : [ {
			name : "buildingInfoId",
			index : "building_info_id",
			width : 60,
			sorttype : "int",
			editable : false,
			hidden : true
		}, {
			name : "buildingInfoName",
			index : "building_info_name",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "buildingInfoNa",
			index : "building_info_na",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "buildingInfoAlias",
			index : "building_info_alias",
			width : 100,
			sorttype : "string",
			editable : false
		}, /*{
			name : "biref",
			index : "biref",
			width : 100,
			sorttype : "string",
			editable : false
		},*/ {
			name : "saleStatus",
			index : "sale_status",
			width : 100,
			sorttype : "String",
			editable : false
		}, {
			name : "buildingInfoPrice",
			index : "building_info_price",
			width : 100,
			sorttype : "string",
			editable : false,
            formatter: buildingPriceFormatter
		},{
			name : "companyName",
			index : "company_name",
			width : 100,
			sorttype : "string",
			editable : false
		},{
			name : "createTime",
			index : "create_time",
			width : 130,
			sorttype : "string",
			editable : false,
            formatter : dateTimeFormatter
		},{
			name : "status",
			index : "status",
			width : 130,
			sorttype : "int",
			editable : false,
			formatter : statusFormatter
		}]
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
											getGrid();
											$(this).dialog("close");
										}
									} ,{
										text : "重置",
										"class" : "btn btn-primary btn-xs",
										click : function() {
											Common.initSelect2("saleStatus", {
												width : "50%"
											});
											document.getElementById("searchForm").reset();
										}
									}]
								});
			});
	/**
	 * 导出
	 */
	$("#excel").click(function() {
		location.href = "excel?buildingInfoName="+$("#buildingInfoName").val()+"&saleStatus="+$("#saleStatus").val()+"&companyName="+$("#companyName").val()
			+"&buildingProjectId="+$("#buildingProjectId").val();
	});
	/**
	 * 删除楼盘期数信息
	 */
	$("#del").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你要审核的数据！", false);
			return false;
		}
		
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		
		Common.confirm("请确认是否要删除该楼盘期数记录吗？", function() {
			$.ajax({
				url : "delete",
				type : "post",
				data : {
					buildingInfoId : rowData.buildingInfoId
				},
				dataType : "json",
				success : function(json) {
					if (json.isSuccess) {
						Common.alert(json.msg, true,function(){
							getGrid();
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

	/**
	 * 跳转新增页面
	 */
	$("#add").click(function(){
		toEditInfo();
	});
	/**
	 * 跳转修改页面
	 */
	$("#edit").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你要修改的数据！", false);
			return false;
		}
		
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		toEditInfo(rowData.buildingInfoId);
	});
	
	function toEditInfo(buildingInfoId){
		var url =  "tobuildinginfo?buildingProjectId="+$("#buildingProjectId").val();
		if(buildingInfoId){
			url = url+"&buildingInfoId="+buildingInfoId;
		}
		window.parent.location.href = url;
	}
	/**
	 * 获得页面数据方法
	 */
	function getGrid(){
		var params = {
				buildingInfoName : $("#buildingInfoName").val(),
				companyName : $("#companyName").val(),
				saleStatus : $("#saleStatus").val(),
				status : $("#status").val()
		};
		Common.jqGridReload(gridSelector, params);
	}
	/**
	 * **************************************按钮事件 end ***************************************
	 */
});