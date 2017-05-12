$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";
	var tag=$("#tag").val();
	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "标签列表",
		url : "getgriddata?tagName="+tag+"",
		postData : {},
		multiSelect : false,
		height : "500px",
		colNamesArray : [ '标签ID','指纹', '标签名称', '标签分类','子类型', '创建时间', '操作员ID', '是否隐藏','是否隐藏num'],
		colModel : [ {
			name : "tagId",
			index : "tag_id",
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
			name : "tagName",
			index : "tag_name",
			width : 170,
			sorttype : "string",
			editable : false
		}, {
			name : "tagCategory",
			index : "tag_category",
			width : 170,
			sorttype : "string",
			editable : false
		}, {
			name : "tagSubCategory",
			index : "tag_sub_category",
			width : 170,
			sorttype : "string",
			editable : false
		}, {
			name : "createTime",
			index : "create_time",
			width : 170,
			sorttype : "date",
			editable : false,
            formatter : dateTimeFormatter
		}, {
			name : "operatorName",
			index : "operator_name",
			width : 170,
			sorttype : "string",
			editable : false
		}, {
			name : "hideFlag",
			index : "hideFlag",
			width : 170,
			sorttype : "string",
			editable : false
		}, {
			name : "hide",
			index : "hide",
			width : 170,
			sorttype : "int",
			editable : false,
			hidden : true
		}]
	});

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */

	/** **************************************按钮事件 start *************************************** */
	/*跳转到添加标签页面*/
	$("#add").click(function() {
		location.href="create";
	});
	
	$("#search").click(function() {
		var params = {
				tag:$("#tag").val()
		};
		Common.jqGridReload(gridSelector, params);
	});
	
	/*跳转到修改页面*/
    $("#update").click(function() {
        var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条你想修改的数据！", false);
            return false;
        }

        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
        
        location.href = "update?tagId=" + rowData.tagId;
    });
    
    
	/*删除标签*/
    $("#delete").click(function() {
        var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条你想删除的数据！", false);
            return false;
        }

        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
        
        Common.confirm("请确认是否删除该条数据？", function(){
            $.ajax({
                url : "delete",
                type : "post",
                data : {
                    tagId : rowData.tagId,
                    fingerprint : rowData.fingerprint
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
    
	$("#lock").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想隐藏/显示的数据！", false);
			return false;
		}

		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		Common.confirm("请确认是否要隐藏/显示该标签？", function(){
			$.ajax({
				url : "lock",
				type : "post",
				data : {
					tagId : rowData.tagId,
					hide:rowData.hide,
					fingerprint:rowData.fingerprint
				},
				dataType : "json",
				success : function(json) {
					if (json.isSuccess) {
						Common.messageBox("提示", "隐藏/显示标签成功！", true);
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
	
	/** **************************************按钮事件 end *************************************** */
});