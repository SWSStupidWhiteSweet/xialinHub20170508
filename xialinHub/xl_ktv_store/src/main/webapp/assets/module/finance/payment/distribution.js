function myFunction(e){
	var input = ($(e).val()!='')?($(e).val()):0;
	if(!Common.checkRate(input)){
		$("#money").html("<span style='color:red;'>请输入正确的金额！</span>");
		Common.messageBox("提示", "请输入正确的金额！");
		return;
	}
	var money = 0;
	$(".count").each(function(){
		money += Number($(this).val());
	});
	if(($("#notdis").text())-(money)<0){
		$("#money").html("<span style='color:red;'>金额超出可分配上限！</span>");
		Common.messageBox("提示", "金额超出可分配上限！");
		return;
	}
	$("#money").text(($("#notdis").text())-(money));
}
$(function($) {
	
	Common.initSelect2("borkerCompanyId", {
		width : "120px"
	});
	Common.initSelect2("storeId", {
		width : "120px"
	});
	Common.initSelect2("channelType", {
		width : "120px"
	});
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "可分配订单",
		url : "getordergriddata",
		postData : {devAccountDetailId:$("#devAccountDetailId").val()},
		multiSelect : false,
		height : '520px',
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ '订单ID', '指纹', '订单号', '订单类型', '客户姓名', '客户电话', '渠道', '报备人', '报备人电话', '所属公司',
		                  '所属门店', '产品套餐', '认购房源', '网签价格', '应收回款', '已回款金额', '本次回款金额'],
		colModel : [ {
			name : "orderInfoId",
			index : "orderInfoId",
			width : 60,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "fingerprint",
			index : "fingerprint",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "orderInfoCode",
			index : "orderInfoCode",
			width : 160,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "packageType",
			index : "packageType",
			width : 100,
			sorttype : "string",
			editable : false,
			formatter : packageTypeFormatter,
			fixed : true
		}, {
			name : "customName",
			index : "customName",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "customTel",
			index : "customTel",
			width : 120,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "channelType",
			index : "channelType",
			width : 80,
			sorttype : "int",
			editable : false,
			formatter : channelTypeFormatter,
			fixed : true
		}, {
			name : "brokerName",
			index : "brokerName",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "brokerTel",
			index : "brokerTel",
			width : 120,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "brokerCompanyName",
			index : "brokerCompanyName",
			width : 200,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "storeName",
			index : "storeName",
			width : 200,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "projectPackageName",
			index : "projectPackageName",
			width : 160,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "house",
			index : "house",
			width : 120,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "onlineSignAmount",
			index : "onlineSignAmount",
			width : 100,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "recvDistAmount",
			index : "recvDistAmount",
			width : 100,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "realDistAmount",
			index : "realDistAmount",
			width : 100,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "input",
			index : "input",
			width : 100,
			editable : false,
			formatter:inputFormatter,
			fixed : true
		}
		]
	});
	function inputFormatter(value){
		return "<input class='count' type='number' onchange='myFunction(this);'>";
	}
	

	// 选中行事件
	jqGridOption.onSelectRow = function(rowIndex, status) {
		var rowData = $(gridSelector).getRowData(rowIndex);
	};

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */

	/** **************************************按钮事件 start *************************************** */

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
                            		customName : $("#customName").val(),
                    				brokerName : $("#brokerName").val(),
                    				orderInfoCode : $("#orderInfoCode").val(),
                    				borkerCompanyId : $("#borkerCompanyId").val(),
                    				storeId : $("#storeId").val(),
                    				channelType : $("#channelType").val()
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
                            Common.jqGridReload("grid-table", params);
                            $(this).dialog("close");
                        }
                    }  ,{
                    	text : "重置",
                        "class" : "btn btn-primary btn-xs",
                        click : function() {
                        	$("#customName").val("");
                        	$("#brokerName").val("");
                        	$("#orderInfoCode").val("");
                        	$("#borkerCompanyId").select2("val","");
                        	$("#storeId").select2("val","");
                        	$("#channelType").select2("val","");
                        }
                    }]
                });
    });

	/**
	 * 保存分配
	 */
	$("#save").click(function() {
		var distributionInfo = "";
		var count = 0;
		$(".count").each(function(){
			
			var money = Number($(this).val());
			if(!Common.checkRate(money)){
				$("#money").html("<span style='color:red;'>请输入正确的金额！</span>");
				Common.messageBox("提示", "请输入正确的金额！");
				return;
			}
			
			count += money;
			if(Common.checkRate(money) && Number(money)>0){
				var tmpTr = $(this).parent().parent();
				var tempStr = tmpTr.find("td").eq(0).html()+":"+tmpTr.find("td").eq(1).html()+":"+money+";";
				distributionInfo += tempStr;
			}
			
		});
		
		if(($("#notdis").text())-(count)<0){
			$("#money").html("<span style='color:red;'>金额超出可分配上限！</span>");
			Common.messageBox("提示", "金额超出可分配上限！");
			return;
		}
		
		if(count == 0){
			Common.messageBox("提示", "请输入回款金额！");
			return;
		}
		
		Common.confirm("请确认是否要分配这些条订单的回款？", function() {
			$.ajax({
				url : "savedistribution",
				type : "post",
				data : {
					distributionInfo:distributionInfo,
					devAccountDetailId:$("#devAccountDetailId").val(),
					fingerprint:$("#fingerprint").val()
				},
				dataType : "json",
				success : function(json) {
					if (json.isSuccess) {
						Common.alert("分配成功！", true, back);
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
	
	function back(){
		location.href = "index";
	}
	
	$("#distribution").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想分配的回款！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		location.href = "distributionAboutMoney?devAccountDetailId="+rowData.devAccountDetailId+"&fingerprint="+rowData.fingerprint;
	});
	/** **************************************按钮事件 end *************************************** */
	
});