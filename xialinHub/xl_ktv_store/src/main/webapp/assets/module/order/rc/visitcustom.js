var iphone;
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
		title : "到访客户",
		url : "getGridDataToVisit",
		postData : {},
		multiSelect : false,
		height : "500px",
		sortName : "confirm_visit_time",
		sortOrder : "desc",
		colNamesArray : [ '项目报备ID', '项目名称', '所属省份', '所属城市', '客户姓名', '客户手机',
				'是否全号', '报备时间', '经纪公司', '门店', '经纪人', '经纪人电话', '到访时间', '确认人',
				'确认时间', '状态' ],
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
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "provinceName",
			index : "province_name",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "cityName",
			index : "city_name",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "customName",
			index : "custom_name",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "customTel",
			index : "custom_tel",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "isAllTel",
			index : "is_all_tel",
			width : 100,
			sorttype : "string",
			editable : false,
			formatter : isAllTelFormatter
		}, {
			name : "recordTime",
			index : "record_time",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "brokerCompanyName",
			index : "broker_company_name",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "storeName",
			index : "store_name",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "brokerName",
			index : "broker_name",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "brokerTel",
			index : "broker_tel",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "realVisitTime",
			index : "real_visit_time",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "confirmVisitOperatorName",
			index : "confirm_visit_operator_name",
			width : 100,
			sorttype : "int",
			editable : false

		}, {
			name : "confirmVisitTime",
			index : "confirm_visit_time",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "recordStatus",
			index : "record_status",
			sorttype : "string",
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
		location.href = "exportExcelVisit";
	});
	/**
	 * 搜索
	 */
	$("#serch").click(function() {
//		// 客户姓名
//		var cusname = $("#cusname").val();
//		// 客户号码
//		var custel = $("#custel").val();
//		
//		// 获取省
//		var province = $("#province").val();
//		// 获取城市
//		var city = $("#city").val();
//		// 项目
//		var project = $("#project").val();
//		// 状态
//		var stuts = $("#stuts").val();
//
//		var array = {
//			"cusname" : cusname,
//			"cusiphone" : custel,
//			
//			"province" : province,
//			"city" : city,
//			"stuts" : stuts,
//			"project" : project
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
	                        		 cusname:$('#cusname').val(),
	                        		 cusiphone :$('#custel').val(),
	     
	                        		 province : $('#province').val(),
	                        		 city : $('#city').val(),
	                        		 project : $('#project').val(),
	                        		 stuts : $('#stuts').val()
	                            
	                         };
	                         Common.jqGridReload(gridSelector, params);
	                         $(this).dialog("close");
	                     }
	                 },{
	                     text : "重置",
	                     "class" : "btn btn-primary btn-xs",
	                     click : function() {
	                    	 $('#cusname').val("");
	                		 $('#custel').val("");
	                		
	                		 $('#province').select2("val", "");
	                		 $('#city').select2("val", "");
	                		 $('#project').select2("val", "");
	                		 $('#stuts').select2("val", "");
	                     }
	                 } ]
	             });
	});

	/**
	 * 补全号码
	 */
	$("#lock").click(
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
					
					
						var isAllTel = rowData.isAllTel;
						iphone=rowData.customTel;
						var id=rowData.orderCustomRecordId;
						if ("否" != isAllTel) {
							Common.messageBox("提示", "当前已经是全号报备，不能修改", false);
							return false;
						} else {
							//分解号码
							var frist=iphone.substring(0,3);
							var last=iphone.substring(7,11);
							$("#frist").html(frist);
							$("#last").html(last);
							var dialog = $("#dialog-message")
									.removeClass('hide')
									.dialog(
											{
												modal : true,
												title : "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-search'></i>补全号码</h4></div>",
												title_html : true,
												width : 400,
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
																var v=$("#midel").val();
											                	var reg = /^\d{4}$/;
											                	if(!v || !reg.test(v)){
											                		Common.messageBox("提示", "请输入正确手机号码!", false);
											                		
											                		return false;
											                	}else{
											                		$(this).dialog("close");
																	// 获取数据
																	var midel = $("#midel").val();
																	var frist=$("#frist").html();
																	var last=$("#last").html();
																	var iphone=frist+midel+last
																	
																	// 请求后端修改备注状态
																	$.ajax({
																				url : "completionIphone",
																				type : "post",
																				data : {
																					id : id,
																					iphone : iphone
																					
																				},
																				dataType : "json",
																				success : function(json) {
																					var array = {};
																					if (json.isSuccess) {
																						Common.messageBox("提示",json.msg,true);
																						Common.jqGridReload(gridSelector,array);
																					} else {
																						Common.messageBox("提示",json.msg,false);
																					}
																				},
																				error : function() {
																					Common.messageBox("提示",Common.SERVER_EXCEPTION,false);
																				}
																			});
											                	}
															

															}
														} ]
											});
						}

				
					});

	/**
	 * 确认到访有效
	 */
	$("#save").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想保存权限的数据！", false, 2000);
			return false;
		}
		

		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		var id=rowData.orderCustomRecordId;
		//选择数据的状态
        var recordStatus=rowData.recordStatus;
        if("报备有效"!=recordStatus){
        	Common.messageBox("提示", "当前记录非报备有效状态，不能确认到访！", false, 2000);
			return false;
        }
        //判断当前数据是否已经补全号码，
        var istell=rowData.isAllTel;
        if("否"==istell){
        	Common.messageBox("提示", "当前记录非全号，请先补全号码再确认！", false, 2000);
			return false;
        }
        location.href = "toVisitInfo?id="+id;
        
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