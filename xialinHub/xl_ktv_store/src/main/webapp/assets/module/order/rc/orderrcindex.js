$(function($) {
	/**
	 * **************************************构造jqGrid start
	 * ***************************************
	 */
	var gridSelector = "#grid-table-order";
	var pagerSelector = "#grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-xs-12",
		title : "客户报备",
		url : "getgriddata",
		postData : {},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '项目报备ID', '项目名称', '客户姓名', '客户手机', '是否全号', '报备时间',
				'预计到访时间', '经纪公司', '门店', '经纪人', '经纪人电话', '确认人', '确认时间', '状态' ],
		colModel : [ {
			name : "orderCustomRecordId",
			index : "order_custom_record_id",
			width : 100,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "projectInfoName",
			index : "project_info_name",
			width : '8%',
			sorttype : "string",
			editable : false
		}, {
			name : "customName",
			index : "custom_name",
			width : '8%',
			sorttype : "string",
			editable : false
		}, {
			name : "customTel",
			index : "custom_tel",
			width : '8%',
			sorttype : "string",
			editable : false
		}, {
			name : "isAllTel",
			index : "is_all_tel",
			width : '8%',
			sorttype : "string",
			editable : false,
			formatter : isAllTelFormatter
		}, {
			name : "recordTime",
			index : "record_time",
			width : '8%',
			sorttype : "string",
			editable : false
		}, {
			name : "estimatedVisitTime",
			index : "estimated_visit_time",
			width : '8%',
			sorttype : "string",
			editable : false
		}, {
			name : "brokerCompanyName",
			index : "broker_company_name",
			width : '8%',
			sorttype : "string",
			editable : false
		}, {
			name : "storeName",
			index : "store_name",
			width : '8%',
			sorttype : "string",
			editable : false
		}, {
			name : "brokerName",
			index : "broker_name",
			width : '8%',
			sorttype : "string",
			editable : false
		}, {
			name : "brokerTel",
			index : "broker_tel",
			width : '8%',
			sorttype : "string",
			editable : false
		}, {
			name : "confirmOperatorName",
			index : "confirm_operator_name",
			width : '8%',
			sorttype : "string",
			editable : false
		}, {
			name : "confirmTime",
			index : "confirm_time",
			width : '8%',
			sorttype : "string",
			editable : false
		}, {
			name : "recordStatus",
			index : "record_status",
			width : '4%',
			sorttype : "int",
			editable : false,
			formatter : orderRecdStatusFormatter
		}

		]
	});

	// 选中行事件
	// jqGridOption.onSelectRow = function(rowIndex, status) {
	// var rowData = $(gridSelector).getRowData(rowIndex);
	//		
	// // 请求该商户的权限
	// $.ajax({
	// url : "getmerchantpermission",
	// type : "post",
	// dataType : "json",
	// data : {
	// merchantId : rowData.merchantId
	// },
	// success : function(json) {
	// setPermissionByJson(json);
	// },
	// error : function() {
	// Common.messageBox("提示", "服务器繁忙，请稍候再试！", false);
	// }
	// });
	// };

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/**
	 * **************************************构造jqGrid end
	 * ***************************************
	 */

	/**
	 * **************************************按钮事件 start
	 * ***************************************
	 */
	/**
	 * 跳转到新增商户页面
	 */
	$("#add").click(function() {
		location.href = "add";
	});
	/**
	 * 下载excel
	 */
	$("#export").click(function() {
		location.href = "exportExcel";
	});
	/**
	 * 搜索
	 */
	$("#serch").click(function() {		
		 var dialog = $("#waitCondition").removeClass('hide').dialog(
             {
                 modal : true,
                 title : "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-search'></i> 请选择查询条件</h4></div>",
                 title_html : true,
                 width : "800px",
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
                         var params = {
                        		 cusname:$('#cusname').val(),
                        		 cusiphone :$('#custel').val(),
                        		 all :$('#all').val(),
                        		 province : $('#province').val(),
                        		 city : $('#city').val(),
                        		 project : $('#project').val(),
                        		 stuts : $('#stuts').val()
                            
                         };
                         Common.jqGridReload(gridSelector, params);
                         $(this).dialog("close");
                     }
                 } , {
                     text : "重置",
                     "class" : "btn btn-primary btn-xs",
                     click : function() {
                    	 $('#cusname').val("");
                		 $('#custel').val("");
                		 $('#all').val("");
                		 $('#province').select2("val", "");
                		 $('#city').select2("val", "");
                		 $('#project').select2("val", "");
                		 $('#stuts').select2("val", "");
                     }
                 }]
             });
	});

	/**
	 * 报备确认
	 */
	$("#lock")
			.click(
					function() {
						var selectedRowsId = Common
								.jqGridGetSelectedRow(gridSelector);
						if (Common.isEmpty(selectedRowsId)
								|| selectedRowsId.length <= 0) {
							Common.messageBox("提示", "请选择一条你想操作的数据！", false);
							return false;
						}
						// 获取到选中的数据
						var rowData = Common.jqGridGetRowData(gridSelector,
								selectedRowsId);
						// 必须是待报备状态确认才能确认
						var status = rowData.recordStatus;
						var id = rowData.orderCustomRecordId
						if ("报备待确认" != status) {
							Common.messageBox("提示", "当前报备状态[" + status
									+ "],不能再次确认", false);
							return false;
						} else {
							$("#remark").val("");
							 var dialog = $("#dialog-message").removeClass('hide').dialog(
						             {
						                 modal : true,
						                 title : "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-search'></i> 报备确认</h4></div>",
						                 title_html : true,
						                 width : "800px",
						                 buttons : [ {
						                     text : "取消",
						                     "class" : "btn btn-xs",
						                     click : function() {
						                         $(this).dialog("close");
						                     }
						                 }, {
						                     text : "确认",
						                     "class" : "btn btn-primary btn-xs",
						                     click : function() {
						                    	 $(this).dialog("close");
													// 获取数据
													var stuts = $("#order_stuts").val();
													// 获取备注的数据
													var remark = $("#remark").val();
													// 请求后端修改备注状态
													$.ajax({
																url : "updateOrderStatus",
																type : "post",
																data : {
																	id : id,
																	status : stuts,
																	remark : remark
																},
																dataType : "json",
																success : function(json) {
																	var array = {};
																	Common.jqGridReload(gridSelector,array);
																	if (json.isSuccess) {
																		Common.messageBox("提示",json.msg,true);

																	} else {
																		Common.messageBox("提示",json.msg,false);
																	}
																},
																error : function() {
																	Common.messageBox("提示",Common.SERVER_EXCEPTION,false);
																}
															});
						                     }
						                 } ]
						             });
							
						
						}

						// Common.confirm("请确认是否要启用/禁用该商户？", function(){
						// $.ajax({
						// url : "lock",
						// type : "post",
						// data : {
						// merchantId : rowData.merchantId
						// },
						// dataType : "json",
						// success : function(json) {
						// if (json.isSuccess) {
						// Common.messageBox("提示", "禁用/启用角色成功！", true);
						// Common.jqGridReload(gridSelector);
						// } else {
						// Common.messageBox("提示", json.msg, false);
						// }
						// },
						// error : function() {
						// Common.messageBox("提示", Common.SERVER_EXCEPTION,
						// false);
						// }
						// });
						// });
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

		$.ajax({
			url : "savemerchantpermission",
			type : "post",
			data : {
				merchantPermissions : merchantPermissions,
				merchantId : rowData.merchantId
			},
			dataType : "json",
			success : function(json) {

				if (json.isSuccess) {

					Common.messageBox("提示", "保存商户权限成功！", true);

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
	 * **************************************按钮事件 end
	 * ***************************************
	 */
	Common.initSelect2("province", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "200px"
	});

	Common.initSelect2("city", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "200px"
	});
	Common.initSelect2("stuts", {
		width : "200px"
	});
	Common.initSelect2("project", {
		width : "200px"
	});

});