$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#posTerminalGrid";
	var pagerSelector = "#posTerminalGridPager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "pos终端管理列表",
		url : "getgridsearchdata",
		postData : {},
		multiSelect : true,
		height : "500px",
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : [ 'POS机ID', 'POS机指纹', 'POS机类型', '终端编号', '终端商户号', '城市', '所在项目', '刷卡手续费', '使用时间', '银行账户名称', '账号', '开户行', '刷卡笔数', '状态', '添加时间'],
		colModel : [ {
			name : "posId",
			index : "pos_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "fingerprint",
			index : "fingerprint",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}, {
			name : "posTypeString",
			index : "pos_type_string",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "terminalNo",
			index : "terminal_no",
			width : 140,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "terminalMerchantNo",
			index : "terminal_merchant_no",
			width : 140,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "cityName",
			index : "city_name",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "projectInfoName",
			index : "project_info_name",
			width : 180,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "cardFee",
			index : "card_fee",
			width : 380,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "useTime",
			index : "use_time",
			width : 180,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "bankAccountName",
			index : "bank_account_name",
			width : 100,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "bankAccount",
			index : "bank_account",
			width : 160,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "bankName",
			index : "bank_name",
			width : 120,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "ebcount",
			index : "eb_count",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed : true
		}, {
			name : "status",
			index : "status",
			width : 60,
			sorttype : "int",
			editable : false,
			formatter : myStatus,
			fixed : true
		}, {
			name : "createTimeString",
			index : "create_time_string",
			width : 140,
			sorttype : "string",
			editable : false,
			fixed : true
		}]
	});

	// 选中行事件
	/*jqGridOption.onSelectRow = function(rowIndex, status) {
		var rowData = $(gridSelector).getRowData(rowIndex);
		
		$.ajax({
			url : "getoperatorrole",
			type : "post",
			dateType : "josn",
			data : {
				operatorId : rowData.operatorId
			},
			success : function(json) {
				Common.jqGridSetAllRowUnSelect(roleGridSelector);
				
				if (Common.isEmpty(json.result)) return;
				
				// 循环所有角色
				var obj = $(roleGridSelector).jqGrid("getRowData");
				
			    var roleArray = json.result.split(",");
				
				for (var i = 0; i < obj.length; i++) {
					if ($.inArray(obj[i].roleId, roleArray) >= 0) {
						$(roleGridSelector).setSelection(i + 1, false); // rowIndex从1开始
					}
				}
			}
		});
		
		$(roleGridSelector).setSelection(3, false);
	};*/

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造jqGrid end *************************************** */
	
	Common.initSelect2("province", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	
	Common.initSelect2("city", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	Common.initSelect2("posTypeString", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	
	function myStatus(value) {
		switch (value) {
		case 0:
			return "<span style=\"color:red\">未使用</span>";
		case 1:
			return "<span style=\"color:blue\">使用中</span>";
		default:
			return "未知状态";
		}
	}

	/** **************************************按钮事件 start *************************************** */
	$("#add").click(function(){
		location.href = "add";
	});
	
	$("#edit").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRows(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length != 1) {
			Common.messageBox("提示", "请选择一条你想修改的数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		location.href = "edit?posId=" + rowData.posId;
	});
	
	$("#updateStatus").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRows(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length < 1) {
			Common.messageBox("提示", "请选择至少一条你想更改状态的数据！", false);
			return false;
		}
		
		Common.confirm("确认更改选中的状态吗?",function(){
			// 获取选中的pos机
			var posIds = "";
			var rowDatas = Common.jqGridGetSelectedRows(gridSelector);
			for (var i = 0; i < rowDatas.length; i++) {
				if (rowDatas[i] == "undefined") continue;
				posIds += Common.jqGridGetRowData(gridSelector, rowDatas[i]).posId + ",";
			}
			posIds = posIds.substr(0,posIds.length-1);
			$.ajax({
				url : "updatestatus",
				type : "post",
				dataType : "json",
				data : {
					posIds : posIds
				},
				success : function(json) {
					if (json.isSuccess) {
						Common.alert("状态更改成功！", true,function(){
							location.href = "index";
						});
					} else {
						Common.messageBox("提示", json.msg, false);
					}
				}
			});
		});
	});
	
	//pos调动
	$("#transfer").click(function(){
		// 获取选中的pos机
		var posIds = "";
		var rowDatas = Common.jqGridGetSelectedRows(gridSelector);
		for (var i = 0; i < rowDatas.length; i++) {
			if (rowDatas[i] == "undefined") continue;
			if(Common.jqGridGetRowData(gridSelector, rowDatas[i]).status == "<span style=\"color:red\">未使用</span>"){
				Common.messageBox("提示", "请选择未停用的设备！！", false);
				return;
			} 
			posIds += Common.jqGridGetRowData(gridSelector, rowDatas[i]).posId + ",";
		}
		if(posIds != ""){
			posIds = posIds.substr(0,posIds.length-1);
		}
		location.href = "totransfer?posIds="+posIds;
	});
	
	//查找
	/*$("#search").click(function(){
		var  params = {
				cityId:$("#city").val(),
				posTypeString:$("#posTypeString").val()=="选择POS类型"?"":$("#posTypeString").val(),
				status:$("#status").val()=="-1"?"":$("#status").val(),
				terminalNo:$("#terminalNo").val(),
				projectInfoName:$("#projectInfoName").val()
		};
		Common.jqGridReload("posTerminalGrid",params);
	});*/
	
	//查看调动记录
	$("#lookTransfer").click(function(){
		var rowDatas= Common.jqGridGetSelectedRows(gridSelector);
		if (Common.isEmpty(rowDatas) || rowDatas.length != 1) {
			Common.messageBox("提示", "请选择一条数据！", false);
			return false;
		}
		var posId = "";
		for (var i = 0; i < rowDatas.length; i++) {
			if (rowDatas[i] == "undefined") continue;
			posId = Common.jqGridGetRowData(gridSelector, rowDatas[i]).posId;
		}
		location.href = "tolooktransfer?posId=" + posId;
	});
	
	//查看pos机流水
	$("#lookFlow").click(function(){
		var rowDatas= Common.jqGridGetSelectedRows(gridSelector);
		if (Common.isEmpty(rowDatas) || rowDatas.length != 1) {
			Common.messageBox("提示", "请选择一条数据！", false);
			return false;
		}
		var posId = "";
		for (var i = 0; i < rowDatas.length; i++) {
			if (rowDatas[i] == "undefined") continue;
			posId = Common.jqGridGetRowData(gridSelector, rowDatas[i]).posId;
		}
		location.href = "tolookflow?posId=" + posId;
	});
	
	//导出
	$("#export").click(function(){
		var cityId = $("#city").val();
		var posTypeString = $("#posTypeString").val()=="选择POS类型"?"":$("#posTypeString").val();
		var status = $("#status").val()=="-1"?"":$("#status").val();
		var terminalNo = $("#terminalNo").val();
	    var projectInfoName = $("#projectInfoName").val();
	    var provinceId = $("#province").val();
		location.href = "export?cityId="+cityId+"&posTypeString="+posTypeString+"&status="+status+"&terminalNo="+terminalNo+
						"&projectInfoName="+projectInfoName+"&provinceId="+provinceId;
	});
	/** **************************************按钮事件 end *************************************** */
});