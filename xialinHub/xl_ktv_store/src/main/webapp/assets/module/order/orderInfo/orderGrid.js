$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "订单列表",
		url : "getgriddata",
		postData : {},
		multiSelect : true,
		height : "450",
		sortName : "order_info_id",
		sortOrder : "desc",
		colNamesArray : [ '订单记录ID','指纹','收费情况', '订单号', '客户姓名', '客户手机', '项目名称', '城市', '套餐类型', '渠道归属','报备人','所属经纪公司','所属经纪门店','联代方','订单状态',
		                  '认购房源楼栋','单元','房号','应收电商费','已收电商费','应收回款','已收回款','创建时间','到访时间','审核状态'],
		colModel : [ {
			name : "orderInfoId",
			index : "order_info_id",
			width : 60,
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
		},{
			name : "ebStatus",
			index : "eb_status",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		},{
			name : "orderInfoCode",
			index : "order_info_code",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "customName",
			index : "custom_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "customTel",
			index : "custom_tel",
			width : 60,
			sorttype : "string",
			editable : false,
			formatter : phoneFormatter
		}, {
			name : "projectInfoName",
			index : "project_info_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "cityName",
			index : "city_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "packageType",
			index : "package_type",
			width : 60,
			sorttype : "int",
			editable : false,
			formatter : packageTypeFormatter
		},{
			name : "channelType",
			index : "channel_type",
			width : 60,
			sorttype : "int",
			editable : false, 
			formatter : channelTypeFormatter
		},{
			name : "brokerName",
			index : "broker_name",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "brokerCompanyName",
			index : "broker_company_name",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "storeName",
			index : "store_name",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "agentName",
			index : "agent_name",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "orderStatus",
			index : "order_status",
			width : 60,
			sorttype : "int",
			editable : false,
			formatter : orderStatusFormatter
		},{
			name : "houseBuilding",
			index : "house_building",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "houseUnit",
			index : "house_unit",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "houseNumber",
			index : "house_number",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "recvAccAmount",
			index : "recv_acc_amount",
			width : 60,
			sorttype : "int",
			editable : false
		},{
			name : "realAccAmount",
			index : "real_acc_amount",
			width : 60,
			sorttype : "int",
			editable : false
		},{
			name : "recvDistAmount",
			index : "recv_dist_amount",
			width : 60,
			sorttype : "int",
			editable : false
		},{
			name : "realDistAmount",
			index : "real_dist_amount",
			width : 60,
			sorttype : "int",
			editable : false
		},{
			name : "createTime",
			index : "create_time",
			width : 60,
			sorttype : "int",
			editable : false
		},{
			name : "realVisitTime",
			index : "real_visit_time",
			width : 60,
			sorttype : "int",
			editable : false
		},{
			name : "auditStatus",
			index : "audit_status",
			width : 60,
			sorttype : "int",
			editable : false,
			formatter : auditStatusFormatter
		} ]
	});

	// 选中行事件
	jqGridOption.onSelectRow = function(rowIndex, status) {
		var rowData = $(gridSelector).getRowData(rowIndex);

	};

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */

	/** **************************************按钮事件 start *************************************** */
	/**
	 * 跳转到新增订单页面
	 */
	$("#add").click(function() {
		window.parent.location.href = "addorder";
	});

	/**
	 * 跳转到修改订单页面
	 */
	$("#edit").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			window.parent.orderIndex.messageBox("提示", "请选择一条你想修改的数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		if(rowData.orderStatus == '成交有效' || rowData.orderStatus == '退款' || rowData.orderStatus == '退房' || rowData.orderStatus == '退房且退款'){
			window.parent.orderIndex.messageBox("提示", "当前订单已经审核，不能修改！", false);
			return false;
		}
		window.parent.location.href = "addorder?orderInfoId="+rowData.orderInfoId;
	});

	/**
	 * 作废订单
	 */
	$("#lock").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			window.parent.orderIndex.messageBox("提示", "请选择一条你想作废的数据！", false);
			return false;
		}

		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

		window.parent.orderIndex.confirm("请确认是否要作废该订单？", function() {
			$.ajax({
				url : "lockorderInfo",
				type : "post",
				data : {
					orderInfoId:rowData.orderInfoId,
					fingerprint:rowData.fingerprint
				},
				dataType : "json",
				success : function(json) {
					if (json.isSuccess) {
						window.parent.orderIndex.messageBox("提示", "作废成功!", true);
						Common.jqGridReload(gridSelector);
					} else {
						window.parent.orderIndex.messageBox("提示", json.msg, false);
					}
				},
				error : function() {
					window.parent.orderIndex.messageBox("提示", Common.SERVER_EXCEPTION, false);
				}
			});
		});
	});
	
	/**
	 * 查看
	 */
	$("#lookInfo").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			window.parent.orderIndex.messageBox("提示", "请选择一条你想查看的数据！", false);
			return false;
		}

		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		window.parent.location.href = "lookorderinfo?orderInfoId="+rowData.orderInfoId;
	});
	
	/**
	 * 时间段选择器
	 */
	$('#queryDate').daterangepicker({
        applyClass : 'btn-sm btn-success',
        cancelClass : 'btn-sm btn-default',
        locale: {
            applyLabel: '确认',
            cancelLabel: '取消',
            fromLabel : '起始时间',
            toLabel : '结束时间',
            customRangeLabel : '自定义',
            firstDay : 1
        },
        ranges : {
            //'最近1小时': [moment().subtract('hours',1), moment()],
            //'今日': [moment().startOf('day'), moment()],
            //'昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
            //'最近7日': [moment().subtract('days', 6), moment()],
            //'最近30日': [moment().subtract('days', 29), moment()],
            //'本月': [moment().startOf("month"),moment().endOf("month")],
            //'上个月': [moment().subtract(1,"month").startOf("month"),moment().subtract(1,"month").endOf("month")]
        },
        opens : 'right',    // 日期选择框的弹出位置
        separator : '至',
        showWeekNumbers : true,     // 是否显示第几周
 
        //timePicker: true,
        //timePickerIncrement : 10, // 时间的增量，单位为分钟
        //timePicker12Hour : false, // 是否使用12小时制来显示时间
         
        //maxDate : moment(),           // 最大时间
        format: 'YYYY-MM-DD'
    }, function(start, end, label) { // 格式化日期显示框
        $('#beginTime').val(start.format('YYYY-MM-DD'));
        $('#endTime').val(end.format('YYYY-MM-DD'));
    })
    .next().on('click', function(){
        $(this).prev().focus();
    });
	/**
	 * 省下拉框
	 */
	 Common.initSelect2("province", {
        allowClear: true,
        minimumResultsForSearch: Infinity,
        width: "200px"
    });
	 /**
	  * 市下拉框
	  */
	 Common.initSelect2("city", {
            allowClear: true,
            minimumResultsForSearch: Infinity,
            width: "200px"
        });
	 /**
	  * 楼盘下拉框
	  */
	 Common.initSelect2("buildingProject", {
            allowClear: true,
            minimumResultsForSearch: Infinity,
            width: "200px"
        });
	 /**
	  * 项目下拉框
	  */
	 Common.initSelect2("projectInfo", {
            allowClear: true,
            minimumResultsForSearch: Infinity,
            width: "200px"
        });
	 /**
	  * 楼盘期数下拉框
	  */
	 Common.initSelect2("buildingInfo", {
            allowClear: true,
            minimumResultsForSearch: Infinity,
            width: "200px"
        });
	 /**
	  * 订单状态下拉框
	  */
	 Common.initSelect2("orderStatus", {
            allowClear: true,
            minimumResultsForSearch: Infinity,
            width: "200px"
        });
	 /**
	  * 中介公司下拉框
	  */
	 Common.initSelect2("company", {
            allowClear: true,
            minimumResultsForSearch: Infinity,
            width: "200px"
        });
	 /**
	  * 来源渠道下拉框
	  */
	 Common.initSelect2("channelType", {
            allowClear: true,
            minimumResultsForSearch: Infinity,
            width: "200px"
        });
	 /**
	  * 门店（经纪门店）下拉框
	  */
	 Common.initSelect2("store", {
         allowClear: true,
         minimumResultsForSearch: Infinity,
         width: "200px"
     });
	 
	
	/**
	 * 搜索
	 */
	$('#search').click(function () {
        var dialog = $("#condition").removeClass('hide')
            .dialog(
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
                        	var queryDate = $("#queryDate").val();
                        	var startTime = "";
                        	var endTime ="";
                        	if(!Common.isEmpty(queryDate)){
                        		var queryDateArray = queryDate.split('至');
                        		startTime = queryDateArray[0];
                        		endTime = queryDateArray[0];
                        	}
                            var params = {
                            	timeFlag:$("#timeType").val(),
	                            startTime:startTime,
	                            endTime:endTime,
	                            orderInfoCode:$("#orderInfoCode").val(),
	                            cheapCode:$("#cheapCode").val(),
	                            customName:$("#customName").val(),
	                            customTel:$("#customTel").val(),
                                provinceId:$('#province').val(),
                                cityId :$('#city').val(),
                                buildingProjectId:$("#buildingProject").val(),
                                projectInfoId:$("#projectInfo").val(),
                                //buildingInfoId:$("#buildingInfo").val(),
                                orderStatus :$('#orderStatus').val(),
                                brokerCompanyId : $('#company').val(),
                                storeId : $('#store').val(),
                                channelType: $('#channelType').val(),
                                brokerName:$("#brokerName").val()
                            };
                            Common.jqGridReload("grid-table", params);
                            $(this).dialog("close");
                        }
                    }, {
                        text : "重置",
                        "class" : "btn btn-primary btn-xs",
                        click : function() {
                        	$("#timeType").val("1");
                        	$("#queryDate").val("");
                        	$("#orderInfoCode").val("");
                        	$("#cheapCode").val("");
                        	$("#customName").val("");
                        	$("#customTel").val("");
                        	$('#province').select2("val", "");
                        	$('#province').trigger("change");
                        	$('#orderStatus').select2("val", "");
                        	$('#company').select2("val", "");
                        	$('#store').select2("val", "");
                        	$('#channelType').select2("val", "");
                        	$("#brokerName").val("");
                        }
                    } ]
                });



    });
	
	/**
	 * 导出
	 */
	$("#importOut").click(function(){
		var queryDate = $("#queryDate").val();
    	var startTime = "";
    	var endTime ="";
    	if(!Common.isEmpty(queryDate)){
    		var queryDateArray = queryDate.split('至');
    		startTime = queryDateArray[0];
    		endTime = queryDateArray[0];
    	}
        var params = {
        	timeFlag:$("#timeType").val(),
            startTime:startTime,
            endTime:endTime,
            orderInfoCode:$("#orderInfoCode").val(),
            cheapCode:$("#cheapCode").val(),
            customName:$("#customName").val(),
            customTel:$("#customTel").val(),
            provinceId:$('#province').val(),
            cityId :$('#city').val(),
            buildingProjectId:$("#buildingProject").val(),
            projectInfoId:$("#projectInfo").val(),
            //buildingInfoId:$("#buildingInfo").val(),
            orderStatus :$('#orderStatus').val(),
            brokerCompanyId : $('#company').val(),
            storeId : $('#store').val(),
            channelType: $('#channelType').val(),
            brokerName:$("#brokerName").val()
        };
		Common.exportGrid({
			ajax:true,
			url:"excel",
			param:params
		});
	});
	
	/**
	 * 批量收款
	 */
	$("#batchReceipt").click(
			function() {
				var selectedRows = Common.jqGridGetSelectedRows(gridSelector);
				if (Common.isEmpty(selectedRows) || selectedRows.length <= 0) {
					window.parent.orderIndex.messageBox("提示", "请选择一条你想操作的数据！", false);
					return false;
				}
				// 存放项目名称
				var list = new Array();
				//存放ID
				var listid = new Array();
				// 因为这里是多选所以要循环查询数据
				for (var index = 0; index < selectedRows.length; index++) {
					var selectedRowsId = selectedRows[index];
					var rowData = Common.jqGridGetRowData(gridSelector,
							selectedRowsId);

					var type = rowData.packageType;// 先判断是否有这个套餐
					if (type == undefined || type == null || type == "") {
						window.parent.orderIndex.messageBox("提示", "存在未选择套餐类型的订单，不允许批量收款 ！",false);
						return false;
					}
					// 判断是否收款
					var status = rowData.ebStatus;
					if (status =="3") {
						window.parent.orderIndex.messageBox("提示", "存在已收完款的订单，不允许批量收款 ！", false);
						return false;
					}
					// 将项目放入数组里面
					var projectInfoName = rowData.projectInfoName;
					list.push(projectInfoName);
					//将ID放入数组
					var orderInfoId = rowData.orderInfoId;
					listid.push(orderInfoId);
				}
				// 再判断选择的数据是否都在同一个项目里面
				if (list.length != 0) {
					var temp=0;
					var fristname = list[0];
					for (var i = 0; i < list.length; i++) {
                     if(list[0]==fristname){
                    	 temp++;
                     }
					}
					if(temp!=list.length){
						window.parent.orderIndex.messageBox("提示", "存在不在同一项目的订单，不允许批量收款 ！", false);
						return false;
					}
				}
				
				//验证完之后出现新的页面退款页面
				window.parent.location.href = "getOrderInfoTk?ids=" + listid.toString();

			});
	/** **************************************按钮事件 end *************************************** */
});