$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#packagelist_grid-table";
	var pagerSelector = "#packagelist_grid-pager";
	var projectInfoId = $("#projectInfoId").val();
	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "项目列表",
		url : "../package/getgriddata",
		postData : {
			projectInfoId:projectInfoId
		},
		sortName : "create_time",
		sortOrder : "desc",
		multiSelect : false,
		height : "500px",
		colNamesArray : ['项目ID','套餐类型', '套餐名称', '认筹费', '开发商回款比例','开始日期','结束日期','是否上架','是否推荐'],
        colModel : [ {
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
            formatter : packageTypeFormatter
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
            width : 150,
            sorttype : "string",
            editable : false
        }, {
            name : "startDate",
            index : "start_date",
            width : 150,
            sorttype : "string",
            editable : false
        }, {
            name : "endDate",
            index : "end_date",
            width : 120,
            sorttype : "string",
            editable : false
        }, {
            name : "isStart",
            index : "is_start",
            width : 100,
            sorttype : "string",
            editable : false,
            formatter : isStartFormatteShelves
        },{
            name : "isRecommend",
            index : "is_recommend",
            width : 100,
            sorttype : "string",
            editable : false,
            formatter :isRecommendFormatteShelves
        }]
    });
	

	// 选中行事件
	jqGridOption.onSelectRow = function(rowIndex, status) {
		var rowData = $(gridSelector).getRowData(rowIndex);

	};
	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变
	
	Common.initSelect2("packagelist_isStart", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "160px"
	});
	
	Common.initSelect2("packagelist_packageType", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "160px"
	});
	/** **************************************构造jqGrid end *************************************** */

	/** **************************************按钮事件 start *************************************** */
	//搜索条件
	$("#packagelist_options").click(function() {
		var dialog = $("#packagelist_condition").removeClass('hide').dialog({
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
						isStart : $("#packagelist_isStart").val(),
					    packageType : $("#packagelist_packageType").val(),
					    projectPackageName : $("#packagelist_projectPackageName").val(),
					    startDate : $("#packagelist_startDate").val(),
					    endDate : $("#packagelist_endDate").val()
					});
					$(this).dialog("close");
				}
			}, {
				text : "重置",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					$("#packagelist_startDate").val("");
					$("#packagelist_endDate").val("");
					$("#packagelist_projectPackageName").val("");
					$("#packagelist_isStart").select2("val", "");
					$("#packagelist_packageType").select2("val", "");
				}
			} ]
		});
	});
	
	//搜索
	$("#packagelist_search").click(function(){
	   Common.jqGridReload(gridSelector,{
		   isStart : $("#packagelist_isStart").val(),
		   packageType : $("#packagelist_packageType").val(),
		   projectPackageName : $("#packagelist_projectPackageName").val(),
		   startDate : $("#packagelist_startDate").val(),
		   endDate : $("#packagelist_endDate").val()
		});
	});
	
	//添加
	$("#packagelist_add").click(function(){
		location.href = "../package/add?projectInfoId="+projectInfoId;
	});
	
	//修改
	$("#packagelist_modify").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想修改的数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		location.href = "../package/modify?projectPackageId=" + rowData.projectPackageId;		
	});
	
	//查看详情
	$("#packagelist_view").click(function(){
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
		
		location.href = "../package/looked?projectPackageId=" + rowData.projectPackageId;	
	});
	
	
	//上架申请
	$("#packagelist_upShelf").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条你想上架的套餐！", false);
            return false;
        }

        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

        Common.confirm("请确认是否上架该套餐？", function(){
        	Common.showMask("请稍候......");
            $.ajax({
                url : "../package/up",
                type : "post",
                data : {
                    projectPackageId : rowData.projectPackageId
                },
                dataType : "json",
                success : function(json) {
                	Common.hideMask();
                    if (json.isSuccess) {
                        Common.messageBox("提示", json.msg, true);
                        Common.jqGridReload(gridSelector);
                        Common.jqGridReload("#packageloglist_grid-table",{});
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
	
	//下架申请
	$("#packagelist_downShelf").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条你想下架的套餐！", false);
            return false;
        }

        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

        Common.confirm("请确认是否下架该套餐？", function(){
        	Common.showMask("请稍候......");
            $.ajax({
                url : "../package/down",
                type : "post",
                data : {
                    projectPackageId : rowData.projectPackageId
                },
                dataType : "json",
                success : function(json) {
                	Common.hideMask();
                    if (json.isSuccess) {
                        Common.messageBox("提示", json.msg, true);
                        Common.jqGridReload(gridSelector);
                        Common.jqGridReload("#packageloglist_grid-table",{});
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
	
	//套餐推荐
	$("#packagelist_recommend").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条你想推荐的套餐！", false);
            return false;
        }

        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

        Common.confirm("请确认是否推荐该套餐？", function(){
        	Common.showMask("请稍候......");
            $.ajax({
                url : "../package/recommend",
                type : "post",
                data : {
                    projectPackageId : rowData.projectPackageId
                },
                dataType : "json",
                success : function(json) {
                	Common.hideMask();
                    if (json.isSuccess) {
                        Common.messageBox("提示", json.msg, true);
                        Common.jqGridReload(gridSelector);
                        Common.jqGridReload("#packageloglist_grid-table",{});
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
	
	//删除
	$("#packagelist_delete").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条你想删除的套餐！", false);
            return false;
        }

        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

        Common.confirm("请确认是否删除该套餐？", function(){
        	Common.showMask("请稍候......");
            $.ajax({
                url : "../package/del",
                type : "post",
                data : {
                    projectPackageId : rowData.projectPackageId
                },
                dataType : "json",
                success : function(json) {
                	Common.hideMask();
                    if (json.isSuccess) {
                        Common.messageBox("提示", json.msg, true);
                        Common.jqGridReload(gridSelector);
                        Common.jqGridReload("#packageloglist_grid-table",{});
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
	
	//导出
	$("#packagelist_export").click(function(){
		location.href="../package/export?projectInfoId="+projectInfoId;
	});
	/** **************************************按钮事件 end *************************************** */
});