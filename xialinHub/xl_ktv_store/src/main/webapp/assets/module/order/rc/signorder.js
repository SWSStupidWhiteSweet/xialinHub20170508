$(function($) {
	/**
	 * **************************************构造jqGrid start 查询出未审核的签约资料预审管理列表
	 * ***************************************
	 */
	var gridSelector = "#grid-table-order";
	var pagerSelector = "#grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-xs-12",
		title : "未审核",
		url : "getgriddata",
		postData : {},
		multiSelect : false,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '项目报备ID', '预客户姓名', '手机号码', '身份证号码', '优惠告知书编号', '提交时间',
				'备注' ],
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
		location.href = "exportExcelNoSign";
	});
	/**
	 * 审核
	 */
	$("#check").click(function() {
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
		//获取ID
		var id=rowData.signAttId;
		location.href = "querySignInfo?id="+id+"&isedit=true";
		
	});
	/**
	 * 查看
	 */
	$("#query").click(function() {
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
		//获取ID
		var id=rowData.signAttId;
		location.href = "querySignInfo?id="+id+"&isedit=false";
		
	});
	/**
	 * 搜索
	 */
	$("#serch").click(function() {
//		// 客户姓名
//		var cusname = $("#cusname").val();
//		// 编号
//		var cheapCode = $("#cheapCode").val();
//		// 手机号码
//		var memberTel = $("#memberTel").val();
//		// 身份证
//		var code = $("#code").val();
//		// 日期
//		var datepicker = $("#datepicker").val();
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
//		Common.jqGridReload(gridSelector, array);
		
		
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
	                        		 name:$('#cusname').val(),
	                        		 cheapCode :$('#cheapCode').val(),
	                        		 memberTel :$('#memberTel').val(),
	                        		 memberIdcode : $('#code').val(),
	                        		 createTime : $('#datepicker').val()
	                        		
	                            
	                         };
	                         Common.jqGridReload(gridSelector, params);
	                         $(this).dialog("close");
	                     }
	                 },{
	                     text : "重置",
	                     "class" : "btn btn-primary btn-xs",
	                     click : function() {
	                    	 $('#cusname').val("");
	                		 $('#cheapCode').val("");
	                		 $('#memberTel').val("");
	                		 $('#code').val("");
	                		 $('#datepicker').val("");
	                		
	                     }
	                 } ]
	             });
	});
	
	
	//点击刷新
	$("#home1").click(function(){
		 var params = {};
		 Common.jqGridReload(gridSelector, params);
		
	})

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
						// 请求后端修改备注状态
						$.ajax({
									url : "examineSignInfo",
									type : "post",
									data : {
										id : id,
										content : content,
										status:"1"
									},
									dataType : "json",
									success : function(json) {
										if (json.isSuccess) {
											Common.messageBox("提示",json.msg,true);

										} else {
											Common.messageBox("提示",json.msg,false);
										}
									},
								
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