$(function($) {
	// 初使化combo
	Common.initSelect2("provinceId", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	Common.initSelect2("cityId", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	Common.initSelect2("buildingProjectId", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	Common.initSelect2("projectInfoId", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	Common.initSelect2("channelType", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	/** **************************************构造jqGrid start *************************************** */
	var gridSelectorUseful = "#usefulTransPublicGrid";
	var pagerSelectorUseful = "#usefulTransPublicGridPager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelectorUseful,
		gridSelector : gridSelectorUseful,
		widthOffset : "25px",
		parentDOMClass : "col-sm-12",
		title : "有效对公转账列表",
		url : "usefultranspublicdata",
		postData : {},
		multiSelect : false,
		height : "485px",
		sortName : "create_time",
		sortOrder : "desc",
		
		colNamesArray : [ '城市', '项目', '订单号', '转账金额', '转账银行', '银行账号', '客户姓名', '渠道', '套餐金额', '优惠告知书编号'],
		colModel : [{
			name : "cityName",
			index : "city_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "projectInfoName",
			index : "project_info_name",
			width : 140,
			sorttype : "string",
			editable : false
		}, {
			name : "orderInfoCode",
			index : "order_info_code",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "ebAmount",
			index : "eb_amount",
			width : 60,
			sorttype : "BigDecimal",
			editable : false
		}, {
			name : "bankName",
			index : "bank_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "payAccountNumber",
			index : "pay_account_number",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "customName",
			index : "custom_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "channelType",
			index : "channel_type",
			width : 60,
			sorttype : "byte",
			editable : false,
			formatter : formatType
		}, {
			name : "groupFee",
			index : "group_fee",
			width : 60,
			sorttype : "BigDecimal",
			editable : false
		}, {
			name : "cheapCode",
			index : "cheap_code",
			width : 60,
			sorttype : "string",
			editable : false
		}]
	});

	// 渲染表格
	$(gridSelectorUseful).jqGrid(jqGridOption);
	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */
	
	
	/** **************************************构造jqGrid start *************************************** */
	var gridSelectorUseless = "#uselessTransPublicGrid";
	var pagerSelectorUseless = "#uselessTransPublicGridPager";

	// 构造jqGrid配置信息
	var jqGridOption2 = new Common().createGridOption({
		pagerSelector : pagerSelectorUseless,
		gridSelector : gridSelectorUseless,
		parentDOMClass : "col-sm-12",
		widthOffset : "25px",
		title : "无效对公转账列表",
		url : "uselesstranspublicdata",
		postData : {},
		multiSelect : false,
		height : "485px",
		sortName : "create_time",
		sortOrder : "desc",
		
		colNamesArray : [ '城市', '项目', '订单号', '转账金额', '转账银行', '银行账号', '客户姓名', '渠道', '套餐金额', '优惠告知书编号'],
		colModel : [{
			name : "cityName",
			index : "city_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "projectInfoName",
			index : "project_info_name",
			width : 140,
			sorttype : "string",
			editable : false
		}, {
			name : "orderInfoCode",
			index : "order_info_code",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "ebAmount",
			index : "eb_amount",
			width : 60,
			sorttype : "BigDecimal",
			editable : false
		}, {
			name : "bankName",
			index : "bank_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "payAccountNumber",
			index : "pay_account_number",
			width : 100,
			sorttype : "string",
			editable : false
		}, {
			name : "customName",
			index : "custom_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "channelType",
			index : "channel_type",
			width : 60,
			sorttype : "byte",
			editable : false,
			formatter : formatType
		}, {
			name : "groupFee",
			index : "group_fee",
			width : 60,
			sorttype : "BigDecimal",
			editable : false
		}, {
			name : "cheapCode",
			index : "cheap_code",
			width : 60,
			sorttype : "string",
			editable : false
		}]
	});

	// 渲染表格
	$(gridSelectorUseless).jqGrid(jqGridOption2);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */
	
	function formatType(value){
		switch (value) {
		case 1:
			return "自然来访";
		case 2:
			return "中介";
		case 3:
			return "线上";
		default:
			return "未知";
		}
	}
	
	
	/** **************************************按钮事件 start *************************************** */

	/**
	 * 条件查询
	 */
	$('#search').click(function () {
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
                            var params = {
                            		cityId : $("#cityId").val(),
                            		provinceId : $("#provinceId").val(),
                    				buildingProjectId : $("#buildingProjectId").val(),
                    				projectInfoId : $("#projectInfoId").val(),
                    				channelType : $("#channelType").val(),
                    				customName : $("#customName").val(),
                    				bankName : $("#bankName").val(),
                    				cheapCode : $("#cheapCode").val()
                            };
                            $.ajax({
                    			type:"post",
                    			url:"usefultranspubliccount",
                    			datatype:"json",
                    			data:params,
                    			success:function(data){
                    				$("#group_fee_count").text(data.group_fee_count);
                    				$("#eb_count").text(data.eb_count);
                    				$("#eb_amount_count").text(data.eb_amount_count);
                    			}
                    		});
                            Common.jqGridReload("usefulTransPublicGrid", params);
                            $(this).dialog("close");
                        }
                    }  ,{
                 	text : "重置",
                     "class" : "btn btn-primary btn-xs",
                     click : function() {
                     	$("#provinceId").select2("val","");
                        	$("#provinceId").trigger("change");
                        	$("#channelType").select2("val","");
                        	$("#customName").val("");
                        	$("#bankName").val("");
                        	$("#cheapCode").val("");
                     }
                 }]
                });
    });
	/*$("#search").click(function() {
		var params = {
				cityId : $("#cityId").val(),
				buildingProjectId : $("#buildingProjectId").val(),
				projectInfoId : $("#projectInfoId").val(),
				channelType : $("#channelType").val(),
				customName : $("#customName").val(),
				bankName : $("#bankName").val(),
				cheapCode : $("#cheapCode").val()
		};
		Common.jqGridReload("usefulTransPublicGrid", params);
	});*/
	
	/**
	 * 导出
	 */
	$("#export").click(function() {
		var cityId = $("#cityId").val();
		var buildingProjectId = $("#buildingProjectId").val();
		var projectInfoId = $("#projectInfoId").val();
		var channelType = $("#channelType").val();
		var customName = $("#customName").val();
		var bankName = $("#bankName").val();
		var cheapCode = $("#cheapCode").val();
		var provinceId = $("#provinceId").val();
		location.href = "usefultranspublic_export?cityId="+cityId+"&buildingProjectId="+buildingProjectId+"&projectInfoId="+
						projectInfoId+"&channelType="+channelType+"&customName="+customName+"&bankName="+bankName+
						"&cheapCode="+cheapCode+"&provinceId="+provinceId;
	});

	/** **************************************按钮事件 end *************************************** */
	
	/** **************************************按钮事件 start *************************************** */

	/**
	 * 条件查询
	 */
	$('#search2').click(function () {
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
                            var params = {
                            		cityId : $("#cityId").val(),
                            		provinceId : $("#provinceId").val(),
                    				buildingProjectId : $("#buildingProjectId").val(),
                    				projectInfoId : $("#projectInfoId").val(),
                    				channelType : $("#channelType").val(),
                    				customName : $("#customName").val(),
                    				bankName : $("#bankName").val(),
                    				cheapCode : $("#cheapCode").val()
                            };
                            /* $.ajax({
                    			type:"post",
                    			url:"errorrelatedposrecordsdatacount",
                    			datatype:"json",
                    			data:params,
                    			success:function(data){
                    				$("#group_count").text(data.group_count);
                    				$("#group_fee_count").text(data.group_fee_count);
                    				$("#eb_count").text(data.eb_count);
                    				$("#eb_amount_count").text(data.eb_amount_count);
                    				$("#eb_amount_fee_count").text(data.eb_amount_fee_count);
                    			}
                    		}); */
                            Common.jqGridReload("uselessTransPublicGrid", params);
                            $(this).dialog("close");
                        }
                    } ,{
                    	text : "重置",
                        "class" : "btn btn-primary btn-xs",
                        click : function() {
                        	$("#provinceId").select2("val","");
                        	$("#provinceId").trigger("change");
                        	$("#channelType").select2("val","");
                        	$("#customName").val("");
                        	$("#bankName").val("");
                        	$("#cheapCode").val("");
                        }
                    }]
                });
    });
	/*$("#search").click(function() {
		var params = {
				cityId : $("#cityId").val(),
				buildingProjectId : $("#buildingProjectId").val(),
				projectInfoId : $("#projectInfoId").val(),
				channelType : $("#channelType").val(),
				customName : $("#customName").val(),
				bankName : $("#bankName").val(),
				cheapCode : $("#cheapCode").val()
		};
		Common.jqGridReload("uselessTransPublicGrid", params);
	});*/
	
	/**
	 * 导出
	 */
	$("#export2").click(function() {
		var cityId = $("#cityId").val();
		var buildingProjectId = $("#buildingProjectId").val();
		var projectInfoId = $("#projectInfoId").val();
		var channelType = $("#channelType").val();
		var customName = $("#customName").val();
		var bankName = $("#bankName").val();
		var cheapCode = $("#cheapCode").val();
		var provinceId = $("#provinceId").val();
		location.href = "uselesstranspublicexport?cityId="+cityId+"&buildingProjectId="+buildingProjectId+"&projectInfoId="+
						projectInfoId+"&channelType="+channelType+"&customName="+customName+"&bankName="+bankName+
						"&cheapCode="+cheapCode+"&provinceId="+provinceId;
	});

	/** **************************************按钮事件 end *************************************** */
});