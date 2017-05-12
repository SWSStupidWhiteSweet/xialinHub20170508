$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-6",
		title : "角色列表",
		url : "getgriddata",
		postData : {},
		height : "500px",
		multiSelect : false,
		sortName : "role_id",
		sortOrder : "desc",
		colNamesArray : [ '角色ID', '角色代码', '角色名称', '状态' ],
		colModel : [ {
			name : "roleId",
			index : "role_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "roleCode",
			index : "role_code",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "roleName",
			index : "role_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "status",
			index : "status",
			width : 60,
			sorttype : "int",
			editable : false,
			formatter : statusFormatter
		} ]
	});
	
	// 选中行事件
	jqGridOption.onSelectRow = function(rowIndex, status) {
		var rowData = $(gridSelector).getRowData(rowIndex);

		// 请求该角色的权限
		$.ajax({
			url : "getrolepermission",
			type : "post",
			dataType : "json",
			data : {
				roleId : rowData.roleId
			},
			success : function(json) {
				setPermissionByJson(json);
				// Common.messageBox("提示", "获取角色权限数据成功！", true);
				$("#roleName").val(rowData.roleName);
			},
			error : function() {
				Common.messageBox("提示", "服务器繁忙，请稍候再试！", false);
			}
		});
	};

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */

	/** **************************************按钮事件 start *************************************** */
	/**
	 * 新增角色
	 */
	$("#add").click(function() {
		var roleName = $("#roleName").val();
		if (Common.isEmpty(roleName)) {
			Common.messageBox("提示", "请输入角色名称！", false);
			return false;
		}

		$.ajax({
			url : "create",
			type : "post",
			data : {
				roleName : roleName
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.messageBox("提示", "创建角色成功！", true);
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

	/**
	 * 修改角色
	 */
	$("#edit").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想修改的数据！", false);
			return false;
		}
		
		var roleName = $("#roleName").val();
		if (Common.isEmpty(roleName)) {
			Common.messageBox("提示", "请输入角色名称！", false);
			return false;
		}

		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		
		$.ajax({
			url : "update",
			type : "post",
			data : {
				roleName : roleName,
				roleId : rowData.roleId
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.messageBox("提示", "修改角色成功！", true);
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

	/**
	 * 启用禁用角色
	 */
	$("#lock").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想禁用/启用的数据！", false);
			return false;
		}
		
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

		$.ajax({
			url : "lock",
			type : "post",
			data : {
				roleId : rowData.roleId
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.messageBox("提示", "禁用/启用角色成功！", true);
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

	/**
	 * 保存角色权限
	 */
	$("#save").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想保存权限的数据！", false);
			return false;
		}
		
		Common.showMask();
		
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		
		var rolePermissions = getPermission();
		
		$.ajax({
			url : "saverolepermission",
			type : "post",
			data : {
				rolePermissions : rolePermissions,
				roleId : rowData.roleId
			},
			dataType : "json",
			success : function(json) {
				Common.hideMask();
				
				if (json.isSuccess) {
					Common.messageBox("提示", "保存角色权限成功！", true);
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
	/** **************************************按钮事件 end *************************************** */
});