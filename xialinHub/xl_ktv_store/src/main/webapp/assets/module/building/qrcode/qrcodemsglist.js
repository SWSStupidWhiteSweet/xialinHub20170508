$(function($) {
	$('.date-picker').datepicker({autoclose:true});
	Common.initSelect2("provinceId", {
		width : "50%"
	});
	Common.initSelect2("cityId", {
		width : "50%"
	});
	Common.initSelect2("buildingProjectId", {
		width : "50%"
	});
	Common.initSelect2("timeType", {
		width : "50%"
	});
	Common.initSelect2("qrcodeType", {
		width : "50%"
	});
	Common.initSelect2("busiType", {
		width : "50%"
	});
	Common.initSelect2("qrcodeStatus", {
		width : "50%"
	});
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "楼盘动态信息列表",
		widthOffset : "30px",
		url : "findAllQrcode",
		postData : {},
		multiSelect : false,
		height : "550px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '二维码','二维码ID', '二维码性质','二维码类型', '楼盘名称','渠道名称', '添加时间', '到期时间' ,'二维码状态'],
		colModel : [  {
			name : "qrcode",
			index : "qrcode",
			width : 60,
			sorttype : "int",
			editable : false,
			hidden : true
		},{
			name : "building_qrcode_id",
			index : "building_qrcode_id",
			width : 60,
			sorttype : "int",
			editable : false,
		}, {
			name : "qrcode_type",
			index : "qrcode_type",
			width : 100,
			sorttype : "String",
			editable : false,
			formatter : typeQrcodeFormatter
		}, {
			name : "busi_type",
			index : "busi_type",
			width : 100,
			sorttype : "string",
			editable : false,
			formatter : busiTypeQrcodeFormatter
		}, {
			name : "building_project_name",
			index : "building_project_name",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "qrcode_channel_name",
			index : "qrcode_channel_name",
			width : 100,
			sorttype : "string",
			editable : false
		},  {
			name : "create_time_str",
			index : "create_time_str",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "expired_date",
			index : "expired_date",
			width : 100,
			sorttype : "String",
			editable : false
		}, {
			name : "status",
			index : "status",
			width : 100,
			sorttype : "int",
			editable : false,
			formatter : statusQrcodeFormatter
		}]
	});

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/**
	 * **************************************构造jqGrid end ***************************************
	 */

	/**
	 * **************************************按钮事件 start ***************************************
	 */
	/**
	 * 搜索
	 */
	$("#search").click(
			function() {
				var dialog = $("#condition").removeClass('hide')
						.dialog(
								{
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
											getGrid();
											$(this).dialog("close");
										}
									},{
										text : "重置",
										"class" : "btn btn-primary btn-xs",
										click : function() {
											Common.initSelect2("provinceId", {width : "50%"});
											Common.initSelect2("cityId", {width : "50%"});
											Common.initSelect2("buildingProjectId", {width : "50%"});
											Common.initSelect2("timeType", {width : "50%"});
											Common.initSelect2("qrcodeType", {width : "50%"});
											Common.initSelect2("busiType", {width : "50%"});
											Common.initSelect2("qrcodeStatus", {width : "50%"});
											document.getElementById("searchForm").reset();
										}
									} ]
								});
			});
	/**
	 * 导出
	 */
	$("#excel").click(function() {
		location.href = "excel?provinceId="+$("#provinceId").val()+"&cityId="+$("#cityId").val()+"&buildingProjectId="+$("#buildingProjectId").val()
			+"&timeType="+$("#timeType").val()+"&startDate="+$("#startDate").val()+"&endDate="+$("#endDate").val()+"&qrcodeType="+$("#qrcodeType").val()
			+"&busiType="+$("#busiType").val()+"&qrcodeStatus="+$("#qrcodeStatus").val()+"&buildingQrcodeId="+$("#buildingQrcodeId").val()+"&qrcodeChannelName="+$("#qrcodeChannelName").val();
	});
	/**
	 * 下载二维码
	 */
	$("#dowload").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你要下载的数据！", false);
			return false;
		}
		
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		location.href = "download?qrcode="+rowData.qrcode+"&qrcodeChannelName="+rowData.qrcode_channel_name;
	});
	/**
	 * 作废
	 */
	$("#destroy").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你要作废的数据！", false);
			return false;
		}

		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

		$.ajax({
			url : "destroy",
			type : "post",
			data : {
				buildingQrcodeId : rowData.building_qrcode_id
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
	});

	/**
	 * 跳转新增页面
	 */
	$("#add").click(function(){
		location.href = "add";
	});
	/**
	 * 获得页面数据方法
	 */
	function getGrid(){
		var params = {
				provinceId : $("#provinceId").val(),
				cityId : $("#cityId").val(),
				buildingProjectId : $("#buildingProjectId").val(),
				timeType : $("#timeType").val(),
				startDate : $("#startDate").val(),
				endDate : $("#endDate").val(),
				qrcodeType : $("#qrcodeType").val(),
				busiType : $("#busiType").val(),
				qrcodeStatus : $("#qrcodeStatus").val(),
				buildingQrcodeId : $("#buildingQrcodeId").val(),
				qrcodeChannelName : $("#qrcodeChannelName").val()
		};
		Common.jqGridReload(gridSelector, params);
	}
	/**
	 * **************************************按钮事件 end ***************************************
	 */
});