$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#log_grid-table";
	var pagerSelector = "#log_grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "项目列表",
		url : "../log/getLog",
		postData : {projectInfoId:$("#projectInfoId").val()},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '项目ID', '序号', '项目名称', '操作方式', '操作时间', '操作人姓名'],
        colModel : [ {
            name : "projectInfoId",
            index : "project_info_id",
            width : 30,
            sorttype : "string",
            editable : false,
            hidden : true
        },{
            name : "projectInfoLogId",
            index : "project_info_log_id",
            width : 30,
            sorttype : "string",
            editable : false,
            hidden : true
        }, {
            name : "projectInfoName",
            index : "project_info_name",
            width : 190,
            sorttype : "string",
            editable : false
        }, {
            name : "operateFlag",
            index : "operate_flag",
            width : 275,
            sorttype : "string",
            editable : false,
            formatter:operate_flagFormatter
        }, {
            name : "createTime",
            index : "create_time",
            width : 275,
            sorttype : "string",
            editable : false,
            formatter:dateTimeFormatter
        }, {
            name : "operatorName",
            index : "operator_name",
            width : 180,
            sorttype : "string",
            editable : false
        }]
    });

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */

	/** **************************************按钮事件 start *************************************** */
	/*查看*/
    $("#log_look").click(function() {
        var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条你想查看的数据！", false);
            return false;
        }

        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

        location.href = "../log/look?projectInfoLogId="+rowData.projectInfoLogId +"&projectInfoId="+rowData.projectInfoId;
        //location.href = "look?projectInfoLogId=12&projectInfoId=31";
    });
    /*$("#log_searchs").click(function() {
    	var operatorName = $("#log_operatorName").val();
    	var startTime = $("#log_startTime").val();
    	var endTime = $("#log_endTime").val();
        var params = {
            operatorName : operatorName,
            startTime:startTime,
            endTime:endTime
        };
        Common.jqGridReload("log_grid-table", params);
    });*/

    $("#log_search").click(function() {
		var dialog = $("#log_condition").removeClass('hide').dialog({
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
						operatorName : $("#log_operatorName").val(),
						startTime : $("#log_startTime").val(),
						endTime : $("#log_endTime").val(),
					});
					$(this).dialog("close");
				}
			},{
				text : "重置",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					$("#log_endTime").val("");
					$("#log_startTime").val("");
					$("#log_operatorName").val("");
				}
			}]
		});
	}); 
    
    $("#log_backBtn").click(function(){
    	var projectInfoId = $("#projectInfoId").val();
    	location.href = "../info/skipPage?projectInfoId=" + projectInfoId+"&tabId=projectlog";
    });
    
    $("#log_export").click(function(){
    	var data =$("#projectInfoId").val();
    	location.href="../log/export?projectInfoId="+data;
    });
    
	/** **************************************按钮事件 end *************************************** */

});