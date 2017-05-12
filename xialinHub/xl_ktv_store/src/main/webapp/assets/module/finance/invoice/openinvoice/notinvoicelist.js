$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";
	//var tag=$("#tag").val();
	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "未开发票列表",
		url : "getnotinvoicelist",
		postData : {},
		multiSelect : false,
		height : "500px",
		colNamesArray : ['订单ID','指纹', '订单编号', '关联客户姓名','认筹金额', '优惠告知书编号'],
		colModel : [ {
			name : "orderInfoId",
			index : "order_info_id",
			width : 170,
			sorttype : "string",
			editable : false,
			hidden : true
		},{
			name : "fingerprint",
			index : "fingerprint",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "orderInfoCode",
			index : "order_info_code",
			width : 170,
			sorttype : "string",
			editable : false
		}, {
			name : "customName",
			index : "custom_name",
			width : 170,
			sorttype : "string",
			editable : false
		}, {
			name : "groupFee",
			index : "group_fee",
			width : 170,
			sorttype : "string",
			editable : false
		}, {
			name : "cheapCode",
			index : "cheap_code",
			width : 170,
			sorttype : "string",
			editable : false
		}]
	});

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */

	/** **************************************按钮事件 start *************************************** */
	
	//搜索条件
	$("#options").click(function() {
		var dialog = $("#condition").removeClass('hide').dialog({
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
					var params={
							customName : $("#customName").val(),
							orderInfoCode : $("#orderInfoCode").val(),
							cheapCode : $("#cheapCode").val()
						};
					Common.jqGridReload(gridSelector,{data:JSON.stringify(params)});
					$(this).dialog("close");
				}
			},{
				text : "重置",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					document.getElementById("searchForm").reset();
				}
			} ]
		});
	});
	
    //导入选择文件弹出框
	$("#import").click(function() {
		var dialog = $("#selFile").removeClass('hide').dialog({
			modal : true,
			title : "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-search'></i> 请选择导入文件</h4></div>",
			title_html : true,
			width : "400px",
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
					Common.jqGridReload("grid-table");
					Common.messageBox("提示", "导入数据成功！！", true,back);
					$(this).dialog("close");
				}
			} ]
		});
	});
	
	//得到导入文件进行导入
	$("#uploadFile").uploadifive({
		buttonText : "导入数据",
		swf      : '${path}/assert/plugins/uploadify/uploadify.swf',
		uploadScript : "../../common/upload/excel",
		fileType : ".xls,xlsx/*",
		queueSizeLimit : 1,
		removeCompleted : true,
		onUploadComplete : function(file, data) {
			var jsonData = eval("(" + data + ")");
			$.ajax({
				url : "importexcel",
				data : {
					diskPath : jsonData[0].diskPath
				},
				type : "post",
				dataType : "json",
				success : function(json) {
					if(json.isSuccess){
						//Common.messageBox("提示", "导入数据成功！！", true,back);
					}else{
						Common.messageBox("提示", "导入数据失败！！", false);
					}
					
				},
				error : function() {
					Common.messageBox("提示", "服务器繁忙,请稍后在重试！！", false);
				}
			});
		}
	});
	
	//导出
    $("#export").click(function(){
    	var params={
				customName : $("#customName").val(),
				orderInfoCode : $("#orderInfoCode").val(),
				cheapCode : $("#cheapCode").val()
			};
    	location.href="notinvoiceexport?mark=1&&data="+JSON.stringify(params);
    });
	
	/*跳转到补全发票页面*/
    $("#add").click(function() {
        var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条数据！", false);
            return false;
        }

        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
       
        var params={
        		orderInfoId:rowData.orderInfoId,
        		orderInfoCode:rowData.orderInfoCode,
        		customName:rowData.customName,
        		groupFee:rowData.groupFee,
        		cheapCode:rowData.cheapCode
			};
        window.parent.location.href="complementinvoice?data="+JSON.stringify(params);
    });
    
    //模板下载
    $("#download").click(function() {
		location.href = "download";
	});
    
	function back() {
		location.href = "openinvoiceindex";
	}
	
	/** **************************************按钮事件 end *************************************** */
});