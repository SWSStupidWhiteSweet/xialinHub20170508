$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-7",
		title : "商户列表",
		url : "getgriddata",
		postData : {},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '商户ID', '商户名称', '商户地址', '商户电话', '联系人', '创建时间', '状态'],
		colModel : [ {
			name : "merchantId",
			index : "merchant_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "merchantName",
			index : "merchant_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "merchantAddr",
			index : "merchant_addr",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "merchantTel",
			index : "merchant_tel",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "merchantContact",
			index : "merchant_contact",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "createTime",
			index : "create_time",
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
		}]
	});

	// 选中行事件
	jqGridOption.onSelectRow = function(rowIndex, status) {
		var rowData = $(gridSelector).getRowData(rowIndex);
		
		// 请求该商户的权限
		$.ajax({
			url : "getmerchantpermission",
			type : "post",
			dataType : "json",
			data : {
				merchantId : rowData.merchantId
			},
			success : function(json) {
				setPermissionByJson(json);
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
	 * 跳转到新增商户页面
	 */
	$("#add").click(function() {
		location.href = "add";
	});

	/**
	 * 跳转到修改商户页面
	 */
	$("#edit").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想修改的数据！", false);
			return false;
		}

		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

		location.href = "modify?merchantId=" + rowData.merchantId;
	});

	/**
	 * 启用禁用商户
	 */
	$("#lock").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想禁用/启用的数据！", false);
			return false;
		}

		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

		Common.confirm("请确认是否要启用/禁用该商户？", function(){
			$.ajax({
				url : "lock",
				type : "post",
				data : {
					merchantId : rowData.merchantId
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
	});

	/**
	 * 保存角色权限
	 */
	$("#save").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想保存权限的数据！", false, 2000);
			return false;
		}

		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

		var merchantPermissions = getMerchantSelectedPermission();

		Common.showMask();
		
		$.ajax({
			url : "savemerchantpermission",
			type : "post",
			data : {
				merchantPermissions : merchantPermissions,
				merchantId : rowData.merchantId
			},
			dataType : "json",
			success : function(json) {
				Common.hideMask();
				if (json.isSuccess) {
					Common.messageBox("提示", "保存商户权限成功！", true);
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