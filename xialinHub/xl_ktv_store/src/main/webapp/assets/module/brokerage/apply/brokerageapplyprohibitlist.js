$(function($) {
	Common.initSelect2("province", {
		width : "70%"
	});
	Common.initSelect2("city", {
		width : "70%"
	});
	Common.initSelect2("brokerageType", {
		width : "70%"
	});
	/**
	 * **************************************构造jqGrid start
	 * ***************************************
	 */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "已禁止结佣列表",
		url : "getbrokerageapplyprohibitgrid",
		postData : {},
		multiSelect : false,
		height : "500px",
		sortName : "order_info_id",
		sortOrder : "desc",
		colNamesArray : [ '订单ID', '订单号', '电商项目名称', '所属城市', '佣金类型', '结佣公司',
				'结佣门店', '经纪人', '结佣对象类型', '应结佣金', '禁结佣金', '已结佣金', '操作人', '操作时间',
				'禁止结佣原因' ],
		colModel : [ {
			name : "order_info_id",
			index : "order_info_id",
			width : 60,
			sorttype : "int",
			editable : false,
			hidden : true
		}, {
			name : "order_info_code",
			index : "order_info_code",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "project_info_name",
			index : "project_info_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "city_name",
			index : "city_name",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "brokerage_type",
			index : "brokerage_type",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "broker_company_name",
			index : "broker_company_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "store_name",
			index : "store_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "broker_name",
			index : "broker_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "brokerage_object",
			index : "brokerage_object",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "settle_amount",
			index : "settle_amount",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "forbid_amount",
			index : "forbid_amount",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "real_amount",
			index : "real_amount",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "operator_name",
			index : "operator_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "forbid_time",
			index : "forbid_time",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "forbid_reason",
			index : "forbid_reason",
			width : 60,
			sorttype : "string",
			editable : false
		} ]
	});

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
	$("#search").click(
			function() {
				var dialog = $("#condition").removeClass('hide').dialog(
					{
						modal : true,
						title : "<div class='widget-header widget-header-small'><h4 class='smaller'>"
								+ "<i class='ace-icon fa fa-search'></i> 请选择查询条件</h4></div>",
						title_html : true,
						width : "500px",
						buttons : [
							{
								text : "取消",
								"class" : "btn btn-xs",
								click : function() {$(this).dialog("close");}
							},
							{
								text : "查询",
								"class" : "btn btn-primary btn-xs",
								click : function() {
									getGrid();
									$(this).dialog("close");
									}
							},{
								text : "重置",
								"class" : "btn btn-primary btn-xs",
								click : function() {
									Common.initSelect2("province", {width : "70%"});
									Common.initSelect2("city", {width : "70%"});
									Common.initSelect2("brokerageType", {width : "70%"});
									document.getElementById("searchForm").reset();
								}
							}]
					});
			});
	/**
	 * 导出
	 */
	$("#excelprohibitlist").click(
			function() {
				location.href = "excelprohibitlist?province="
						+ $("#province").val() + "&city=" + $("#city").val()
						+ "&customInfoName=" + $("#customInfoName").val()
						+ "&orderInfoCode=" + $("#orderInfoCode").val()
						+ "&brokerName=" + $("#brokerName").val()
						+ "&projectName=" + $("#projectName").val()
						+ "&brokerageType=" + $("#brokerageType").val();
			});

	/**
	 * 接触禁结佣金
	 */
	$("#openBrohibit").click(function() {

		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你要接禁的数据！", false);
			return false;
		}

		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

		Common.prompt("请输入取消禁止结佣理由理由!",null, function(remark) {
			$.ajax({
				url : "openBrohibit",
				type : "post",
				data : {
					remark : remark,
					orderInfoId : rowData.order_info_id,
					brokerageType : rowData.brokerage_type
				},
				dataType : "json",
				success : function(json) {
					if (json.isSuccess) {
						Common.alert(json.msg, true, function() {
							getGrid();
						});
					} else {
						Common.messageBox("提示", json.msg, false);
					}
				},
				error : function() {
					Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
				}
			});
		},"yes");

	});

	/**
	 * 获得页面数据方法
	 */
	function getGrid() {
		var params = {
			province : $("#province").val(),
			city : $("#city").val(),
			customInfoName : $("#customInfoName").val(),
			orderInfoCode : $("#orderInfoCode").val(),
			brokerName : $("#brokerName").val(),
			projectName : $("#projectName").val(),
			brokerageType : $("#brokerageType").val()
		};
		Common.jqGridReload(gridSelector, params);
	}
	/**
	 * **************************************按钮事件 end
	 * ***************************************
	 */
});