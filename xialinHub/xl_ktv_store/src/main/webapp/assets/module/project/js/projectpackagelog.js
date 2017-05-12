$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#packageloglist_grid-table";
	var pagerSelector = "#packageloglist_grid-pager"; 
	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "项目套餐审核列表",
		url : "../package/getlogdata",
		postData : {projectInfoId:$("#projectInfoId").val()},
		sortName : "audit_time",
		sortOrder : "desc",
		multiSelect : false,
		height : "500px",
		colNamesArray : ['套餐日志ID','项目ID','套餐ID','套餐类型', '套餐名称', '认筹费', '开发商回款比例','开始日期','结束日期','是否上架','操作类型','审核状态','审核人姓名','审核时间','审核事由'],
		colModel : [{
			name : "projectPackageLogId",
			index : "project_package_log_id",
			width : 30,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "projectInfoId",
			index : "project_info_id",
			width : 30,
			sorttype : "string",
			editable : false,
			hidden : true
		},{
			name : "projectPackageId",
			index : "project_package_id",
			width : 30,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "packageType",
			index : "package_type",
			width : 100,
			sorttype : "string",
			editable : false,
			formatter: packageTypeFormatter
		}, {
			name : "projectPackageName",
			index : "project_package_name",
			width : 120,
			sorttype : "string",
			editable : false
		}, {
			name : "groupFee",
			index : "group_fee",
			width : 120,
			sorttype : "string",
			editable : false
		}, {
			name : "devReturnRatio",
			index : "dev_return_ratio",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "startDate",
			index : "start_date",
			width : 140,
			sorttype : "string",
			editable : false
		}, {
			name : "endDate",
			index : "end_date",
			width : 140,
			sorttype : "string",
			editable : false
		}, {
			name : "isStart",
			index : "is_start",
			width : 100,
			sorttype : "string",
			editable : false,
			formatter : isNOStartFormatteShelves
		}, {
			name : "operateFlag",
			index : "operate_flag",
			width : 150,
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
		},{
			name : "auditOperatorName",
			index : "audit_operator_name",
			width : 100,
			sorttype : "string",
			editable : false
		},{
			name : "auditTime",
			index : "audit_time",
			width : 120,
			sorttype : "string",
			editable : false
		},{
			name : "auditReason",
			index : "audit_reason",
			width : 160,
			sorttype : "string",
			editable : false
		}]

	});

	// 选中行事件
	jqGridOption.onSelectRow = function(rowIndex, status) {
		var rowData = $(gridSelector).getRowData(rowIndex);

	};
	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变


	Common.initSelect2("projectpackageloglistislogstart", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "160px"
	});

	Common.initSelect2("projectpackageloglistpackage", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "160px"
	});
	Common.initSelect2("projectpackageloglistauditflag", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "160px"
	});

	/** **************************************构造jqGrid end *************************************** */





	/** **************************************按钮事件 start *************************************** */

	//搜索条件
	$("#projectpackageloglist_options").click(function() {
		var dialog = $("#projectpackageloglist_condition").removeClass('hide').dialog({
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
						isStart : $("#projectpackageloglistislogstart").val(),
						packageType : $("#projectpackageloglistpackage").val(),
						auditFlag: $("#projectpackageloglistauditflag").val(),
						startDate : $("#projectpackagelogliststartDate").val(),
						endDate :  $("#projectpackageloglistendDate").val()
					});
					$(this).dialog("close");
				}
			}, {
				text : "重置",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					$("#projectpackageloglistendDate").val("");
					$("#projectpackagelogliststartDate").val("");
					$("#projectpackageloglistauditflag").select2("val", "");
					$("#projectpackageloglistpackage").select2("val", "");
					$("#projectpackageloglistislogstart").select2("val", "");
				}
			} ]
		});
	});



	/**
	 * 导出excel
	 */
	$("#projectpackageloglist_export").click(function(){
		var data=$("#projectInfoId").val();
		location.href="../package/exportlog?projectInfoId="+data;
	});

	/**
	 * 查看详细信息
	 */
	$("#projectpackageloglist_view").click(function() {
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

		location.href = "../package/look?projectPackageLogId=" + rowData.projectPackageLogId;
	});

	/**
	 * 审核通过
	 */
	$("#projectpackageloglist_locklog").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		var type = rowData.operateFlag;
		var a = "确定要审核通过该项目套餐吗？";
		if(type != "创建"){
			a = "确定要审核当前数据，并且将之前的未审核数据置为不通过吗？";
		}
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想要审核的套餐！", false);
			return false;
		}
		 Common.confirm(a,function(){
			 Common.showMask("请稍候......");
			 $.ajax({
				 url : "../package/choosetype",
				 type : "post",
				 data : {
					 projectPackageLogId : rowData.projectPackageLogId,
					 auditReason         : ""
				 },
				 dataType : "json",
				 success : function(json) {
					 Common.hideMask();
					 if (json.isSuccess) {
						 Common.messageBox("提示", json.msg, true);
						 Common.jqGridReload(gridSelector);
						 Common.jqGridReload("packagelist_grid-table",{});
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

	/**
	 * 拒绝审核
	 */
	$("#projectpackageloglist_lockNolog").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想要审核的套餐！", false);
			return false;
		}
		Common.prompt("请输入拒绝审核的理由","审核理由不能为空",function(auditReason){
			Common.showMask("请稍候......");
			$.ajax({
				url : "../package/nochoosetype",
				type : "post",
				data : {
					projectPackageLogId : rowData.projectPackageLogId,
					auditReason         : auditReason
				},
				dataType : "json",
				success : function(json) {
					Common.hideMask();
					if (json.isSuccess) {
						Common.messageBox("提示", json.msg, true);
						Common.jqGridReload(gridSelector);
						Common.jqGridReload("packagelist_grid-table",{});
					} else {
						Common.messageBox("提示", json.msg, false);
					}
				},
				error : function() {
					Common.hideMask();
					Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
				}
			});
		},"no");
	});    
	/** **************************************按钮事件 end *************************************** */
});