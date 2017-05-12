$(function($) {
	/**
	 * **************************************构造jqGrid start 查询出审核的签约资料预审管理列表
	 * ***************************************
	 */
	var gridSelector1 = "#grid-table-order-1";
	var pagerSelector1 = "#grid-pager-1";

	// 构造jqGrid配置信息
	var jqGridOption1 = new Common().createGridOption({
		pagerSelector : pagerSelector1,
		gridSelector : gridSelector1,
		parentDOMClass : "col-xs-12",
		title : "已审核",
		url : "getgriddatash",
		postData : {},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '项目报备ID', '预客户姓名', '手机号码', '身份证号码', '优惠告知书编号', '提交时间',
				'备注','审核人','审核时间','订单号' ],
		colModel : [ {
			name : "signAttId",
			index : "sign_att_id",
			width : 100,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "memberName",
			index : "member_name",
			width : '8%',
			sorttype : "string",
			editable : false
		}, {
			name : "memberTel",
			index : "member_tel",
			width : '8%',
			sorttype : "string",
			editable : false
		}, {
			name : "memberIdcode",
			index : "member_idcode",
			width : '8%',
			sorttype : "string",
			editable : false
		}, {
			name : "cheapCode",
			index : "cheap_code",
			width : '8%',
			sorttype : "string",
			editable : false,
			
		}, {
			name : "createTime",
			index : "create_time",
			width : '8%',
			sorttype : "string",
			editable : false
		}, {
			name : "remark",
			index : "remark",
			width : '8%',
			sorttype : "string",
			editable : false
		}, {
			name : "operatorName",
			index : "operator_name",
			width : '8%',
			sorttype : "string",
			editable : false
		}, {
			name : "auditTime",
			index : "audit_time",
			width : '8%',
			sorttype : "string",
			editable : false
		}, {
			name : "orderInfoId",
			index : "order_info_id",
			width : '8%',
			sorttype : "string",
			editable : false
		}
		]
	});



	// 渲染表格
	$(gridSelector1).jqGrid(jqGridOption1);

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
	$("#export-1").click(function() {
		location.href = "exportExcelSign";
	});
	/**
	 * 查看
	 */
	$("#check-1").click(function() {
		var selectedRowsId = Common
		.jqGridGetSelectedRow(gridSelector1);
		if (Common.isEmpty(selectedRowsId)
				|| selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想操作的数据！", false);
			return false;
		}
		// 获取到选中的数据
		var rowData = Common.jqGridGetRowData(gridSelector1,
				selectedRowsId);
		//获取ID
		var id=rowData.signAttId;
		location.href = "querySignInfo?id="+id+"&isedit=false";
		
	});
	//点击刷新
	$("#profile1").click(function(){
		 var params = {};
		 Common.jqGridReload(gridSelector1, params);
		
	})
	
	/**
	 * 搜索
	 */
	$("#serch-1").click(function() {
//		// 客户姓名
//		var cusname = $("#cusname-1").val();
//		// 编号
//		var cheapCode = $("#cheapCode-1").val();
//		// 手机号码
//		var memberTel = $("#memberTel-1").val();
//		// 身份证
//		var code = $("#code-1").val();
//		// 日期
//		var datepicker = $("#datepicker-1").val();
//		
//		
//		var array = {
//			"name" : cusname,
//			"cheapCode" : cheapCode,
//			"memberTel" : memberTel,
//			"memberIdcode":code,
//			"createTime":datepicker
//			
//		};
//
//		Common.jqGridReload(gridSelector1, array);
		
		
		 var dialog = $("#waitCondition1").removeClass('hide').dialog(
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
	                        		 name:$('#cusname-1').val(),
	                        		 cheapCode :$('#cheapCode-1').val(),
	                        		 memberTel :$('#memberTel-1').val(),
	                        		 memberIdcode : $('#code-1').val(),
	                        		 createTime : $('#datepicker-1').val()
	                        		
	                            
	                         };
	                         Common.jqGridReload(gridSelector1, params);
	                         $(this).dialog("close");
	                     }
	                 } ,{
	                     text : "重置",
	                     "class" : "btn btn-primary btn-xs",
	                     click : function() {
	                    	 $('#cusname-1').val("");
	                		 $('#cheapCode-1').val("");
	                		 $('#memberTel-1').val("");
	                		 $('#code-1').val("");
	                		 $('#datepicker-1').val("");
	                     }
	                 }]
	             });
	});

	/**
	 * 报备确认
	 */
	$("#lock-1")
			.click(
					function() {
						var selectedRowsId = Common
								.jqGridGetSelectedRow(gridSelector1);
						if (Common.isEmpty(selectedRowsId)
								|| selectedRowsId.length <= 0) {
							Common.messageBox("提示", "请选择一条你想操作的数据！", false);
							return false;
						}
						// 获取到选中的数据
						var rowData = Common.jqGridGetRowData(gridSelector1,
								selectedRowsId);
						// 必须是待报备状态确认才能确认
						var status = rowData.recordStatus;
						var id = rowData.orderCustomRecordId
						if ("报备待确认" != status) {
							Common.messageBox("提示", "当前报备状态[" + status
									+ "],不能再次确认", false);
							return false;
						} else {
							var dialog = $("#dialog-message")
									.removeClass('hide')
									.dialog(
											{
												modal : true,
												title : "报备确认",
												title_html : true,
												width : 500,
												height : 300,
												buttons : [
														{
															text : "取消",
															"class" : "btn btn-xs",
															click : function() {
																$(this).dialog("close");
															}
														},
														{
															text : "确定",
															"class" : "btn btn-primary btn-xs",
															click : function() {
																$(this).dialog("close");
																// 获取数据
																var stuts = $("#order_stuts").val();
																// 获取备注的数据
																var remark = $("#remark").val();
																// 请求后端修改备注状态
																$
																		.ajax({
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
																				Common.jqGridReload(gridSelector1,array);
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

				
					});

	/**
	 * 保存角色权限
	 */
	$("#save").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector1);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想保存权限的数据！", false, 2000);
			return false;
		}

		var rowData = Common.jqGridGetRowData(gridSelector1, selectedRowsId);

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

});