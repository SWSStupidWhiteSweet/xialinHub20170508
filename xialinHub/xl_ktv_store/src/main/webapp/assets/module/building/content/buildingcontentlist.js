$(function($) {
	Common.initSelect2("auditFlag", {
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
		title : "楼盘动态信息列表",
		url : "getbuildingcontentgrid",
		postData : {buildingProjectId:$("#buildingProjectId").val()},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '楼盘动态ID','数据标识', '标题', /*'内容',*/ '发布人','分公司名称', '联系电话', '发布时间' ,'显示状态','审核状态','审核人','审核时间','审核事由'],
		colModel : [ {
			name : "contentId",
			index : "content_id",
			width : 60,
			sorttype : "int",
			editable : false,
			hidden : true
		}, {
			name : "fingerprint",
			index : "fingerprint",
			width : 100,
			sorttype : "String",
			editable : false,
			hidden : true
		}, {
			name : "title",
			index : "title",
			width : 100,
			sorttype : "string",
			editable : false
		}, /*{
			name : "content",
			index : "content",
			width : 100,
			sorttype : "string",
			editable : false
		},*/ {
			name : "operatorName",
			index : "operator_name",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "companyName",
			index : "company_name",
			width : 100,
			sorttype : "string",
			editable : false
		},  {
			name : "tel",
			index : "tel",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "createTime",
			index : "create_time",
			width : 100,
			sorttype : "String",
			editable : false
		}, {
			name : "status",
			index : "status",
			width : 100,
			sorttype : "int",
			editable : false,
			formatter : statusFormatter
		}, {
			name : "auditFlag",
			index : "audit_flag",
			width : 100,
			sorttype : "string",
			editable : false,
			formatter : audit_flagFormatter
		},  {
			name : "auditOperatorName",
			index : "audit_operator_name",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "auditTime",
			index : "audit_time",
			width : 100,
			sorttype : "String",
			editable : false

		}, {
			name : "auditReason",
			index : "audit_reason",
			width : 100,
			sorttype : "String",
			editable : false
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
	/**
	 * 搜索
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
											Common.initSelect2("auditFlag", {
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
		location.href = "excel?operatorName="+$("#operatorName").val()+"&title="+$("#title").val()+"&companyName="+$("#companyName").val()
			+"&auditFlag="+$("#auditFlag").val()+"&startDate="+$("#startDate").val()+"&endDate="+$("#endDate").val()+"&buildingProjectId="+$("#buildingProjectId").val();
	});
	/**
	 * 查看
	 */
	$("#view").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你要查看的数据！", false);
			return false;
		}
		
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

		toViewInfo(rowData.contentId,"view");
	});
	/**
	 * 审核
	 */
	$("#audti").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你要审核的数据！", false);
			return false;
		}
		
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

		if(rowData.auditFlag.indexOf('未审核')<0){
			Common.messageBox("提示", "该信息已经审核过了", false);
			return false;
		}
		
		toViewInfo(rowData.contentId,"audit");
	});
	/**
	 * 删除楼盘动态
	 */
	$("#del").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你要删除的数据！", false);
			return false;
		}
		
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		
		Common.confirm("请确认是否要删除该楼盘动态记录吗？", function() {
			$.ajax({
				url : "delete",
				type : "post",
				data : {
					contentId : rowData.contentId,
					fingerprint : rowData.fingerprint
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
		
		if(rowData.auditFlag.indexOf('未审核')<0){
			Common.messageBox("提示", "该信息已经审核过了", false);
			return false;
		}
		
		toEditInfo(rowData.contentId,rowData.fingerprint);
	});
	
	function toEditInfo(contentId,fingerprint){
		var url =  "tobuildingcontentinfo?buildingProjectId="+$("#buildingProjectId").val();
		if(contentId){
			url = url+"&contentId="+contentId;
		}
		window.parent.location.href = url;
	}
	function toViewInfo(contentId,type){
		var url =  "toviewinfo?buildingProjectId="+$("#buildingProjectId").val()+"&contentId="+contentId+"&type="+type;
        window.parent.location.href = url;
	}
	/**
	 * 获得页面数据方法
	 */
	function getGrid(){
		var params = {
				operatorName : $("#operatorName").val(),
				title : $("#title").val(),
				companyName : $("#companyName").val(),
				auditFlag : $("#auditFlag").val(),
				startDate : $("#startDate").val(),
				endDate : $("#endDate").val()
		};
		Common.jqGridReload(gridSelector, params);
	}
	/**
	 * **************************************按钮事件 end ***************************************
	 */
});