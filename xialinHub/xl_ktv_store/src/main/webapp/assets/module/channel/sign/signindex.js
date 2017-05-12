$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#signindex_grid-table";
	var pagerSelector = "#signindex_grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-9",
		title : "门店项目合作关系管理",
		url : "getgriddata",
		postData : {},
		height : "500px",
		widthOffset : "-1500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : ['签约ID','经济公司ID', '签约名称', '项目名称', '经纪公司名称', '签约时间', '合作开始时间', '合作结束时间', '代理公司', '创建时间', '审核状态', '审核人', '备注'],
		colModel : [ {
			name : "signId",
			index : "sign_id",
			width : 10,
			sorttype : "string",
			editable : false,
			hidden : true
		},{
			name : "brokerCompanyId",
			index : "broker_company_id",
			width : 10,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "signName",
			index : "sign_name",
			width : 275,
			sorttype : "string",
			editable : false
		}, {
			name : "projectInfoName",
			index : "project_info_name",
			width : 275,
			sorttype : "string",
			editable : false
		}, {
			name : "brokerCompanyName",
			index : "broker_company_name",
			width : 140,
			sorttype : "string",
			editable : false
		}, {
			name : "signTime",
			index : "sign_time",
			width : 180,
			sorttype : "string",
			editable : false
		}, {
			name : "cooperationStart",
			index : "cooperation_start",
			width : 150,
			sorttype : "string",
			editable : false
		}, {
			name : "cooperationEnd",
			index : "cooperation_end",
			width : 150,
			sorttype : "string",
			editable : false
		}, {
			name : "agentName",
			index : "agent_name",
			width : 150,
			sorttype : "string",
			editable : false
		}, {
			name : "createTime",
			index : "create_time",
			width : 150,
			sorttype : "string",
			editable : false
		}, {
			name : "auditStatus",
			index : "audit_status",
			width : 100,
			sorttype : "string",
			editable : false,
			formatter : audit_flagFormatter
		}, {
			name : "auditOperatorName",
			index : "audit_operator_name",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "remark",
			index : "remark",
			width : 100,
			sorttype : "string",
			editable : false
		}]
	});

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */

	/** ****************signindex_addBroker**********************按钮事件 start *************************************** */
	Common.initSelect2("condition_auditStatus", {
		minimumResultsForSearch : Infinity,
		width : "200px"
	});
	
	//搜索条件
	$("#signindex_options").click(function(){
		var dialog = $("#signindex_condition").removeClass('hide').dialog({
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
						auditStatus : $("#condition_auditStatus").val(),
						signName : $("#condition_signName").val()
					});
					$(this).dialog("close");
				}
			}, {
				text : "重置",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					$("#condition_auditStatus").select2("val","");
					$("#condition_signName").val("");
				}
			} ]
		});
	});
	
	//查看
	$("#signindex_info").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条你想查看的数据！", false);
            return false;
        }
        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		location.href="view?signId="+rowData.signId;
	});
	//添加
	$("#signindex_add").click(function(){
		location.href="add";
	});
	//修改
	$("#signindex_edit").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条你想修改的数据！", false);
            return false;
        }
        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		location.href="modify?signId="+rowData.signId;
	});
	//审核通过
	$("#signindex_auditpass").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条你想审核的数据！", false);
            return false;
        }
        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
        Common.confirm("请确认是否审核通过该数据？", function(){
            $.ajax({
                url : "auditpass",
                type : "post",
                data : {
                    signId : rowData.signId
                },
                dataType : "json",
                success : function(json) {
                    if (json.isSuccess) {
                        Common.messageBox("提示", "审核成功！", true);
                        Common.jqGridReload(gridSelector);
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
	//审核不通过
	$("#signindex_auditnopass").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条你想审核的数据！", false);
            return false;
        }
        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
        
        Common.prompt("请输入审核拒绝原因", "审核拒绝原因不能为空。", function(remark){
        	 $.ajax({
                 url : "auditnopass",
                 type : "post",
                 data : {
                     signId : rowData.signId,
                     remark : remark
                 },
                 dataType : "json",
                 success : function(json) {
                     if (json.isSuccess) {
                         Common.messageBox("提示", "审核成功！", true);
                         Common.jqGridReload(gridSelector);
                     } else {
                         Common.messageBox("提示", json.msg, false);
                     }
                 },
                 error : function() {
                     Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
                 }
             });
        }, "no");
	});
	//删除
	$("#signindex_del").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条你想删除的数据！", false);
            return false;
        }
        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
        Common.confirm("请确认是否删除该条数据？", function(){
            $.ajax({
                url : "del",
                type : "post",
                data : {
                    signId : rowData.signId
                },
                dataType : "json",
                success : function(json) {
                    if (json.isSuccess) {
                        Common.messageBox("提示", "删除成功！", true);
                        Common.jqGridReload(gridSelector);
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
	
	//导入
	$("#signindex_import").click(function(){
		var dialog = $("#signindex_importDiv").removeClass('hide').dialog({
			modal : true,
			title : "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-sign-in'></i> 请选择文件</h4></div>",
			title_html : true,
			width : "500px",
			buttons : [ {
				text : "取消",
				"class" : "btn btn-xs",
				click : function() {
					$(this).dialog("close");
				}
			}, {
				text : "上传",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					$("#uploadBtn").uploadifive("upload");
				}
			} ]
		});
	});
	
	
	$("#uploadBtn").uploadifive({
		auto:false,
		queueID : "queue_uploadDiv",
		buttonText : "请选择文件",
		uploadScript : "../../common/upload/file",
		fileSizeLimit : 1024 * 20,
		fileType : "zip/*",
		queueSizeLimit : 1,
		multi : false,
		removeCompleted : true,
		onUploadComplete : function(file, data) {
			savePic(data);
		}
	});
	
	function savePic(data){
		var jsonData = eval("(" + data + ")")[0];
		console.log(jsonData);
		$.ajax({
			url : "import",
			type : "post",
			dataType : "json",
			data : {
				diskPath : jsonData.diskPath
			},
			success : function(json) {
				if (json.isSuccess) {
					 $("#fileName").val(jsonData.srcFileName);
					 Common.alert(json.msg, true);
                     Common.jqGridReload(gridSelector);
				} else {
					Common.alert(json.msg, false);
					Common.jqGridReload(gridSelector);
				}
			}
		});
	}
	
	
	
	//导出
	$("#signindex_export").click(function(){
		location.href="export";
	});
	//模板下载
	$("#signindex_downloadDemo").click(function(){
		location.href="download";
	});
	//添加门店
	$("#signindex_addBroker").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条要绑定门店的数据！", false);
            return false;
        }
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		location.href="../addstore/index?brokerCompanyId="+rowData.brokerCompanyId+"&signId="+rowData.signId;
	});
	
	/** **************************************按钮事件 end *************************************** */
});