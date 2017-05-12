$(function() {
	
	Common.formValidate("projectConfigForm", {
		recordProtectHours : {
			required : true,
			digits:true,
			//number : true,
			maxlength : 20,
			min:0
		},
		visitProtectHours : {
			required : true,
			//number : true,
			digits:true,
			maxlength : 20,
			min:0
		},
		customProtectHours : {
			required : true,
			//number : true,
			digits:true,
			maxlength : 20,
			min:0
		},
		isAutoReceives : {
			required : true
		},
		isVisit : {
			required : true
		},
		isTel : {
			required : true
		},
		isDeveploerConfirm : {
			required : true
		},
		dealRatio : {
			required : true,
			number : true,
			maxlength : 10,
			min:0
		},
		customRatio : {
			required : true,
			number : true,
			maxlength : 10,
			min:0
		}
	}, {
		recordProtectHours : {
			required : "报备保护期设置不能为空。",
			//number:"输入内容过长！",
			digits:"只能输入大于零的整数",
			maxlength : "输入内容过长！",
			min:"输入内容不合法！"
		},
		visitProtectHours : {
			required : "到访保护期设置不能为空。",
			digits:"只能输入大于零的整数",
			//number:"输入内容过长！",
			maxlength : "输入内容过长！",
			min:"输入内容不合法！"
		},
		customProtectHours : {
			required : "业绩保护期设置不能为空。",
			//number:"输入内容过长！",
			digits:"只能输入大于零的整数",
			maxlength : "输入内容过长！",
			min:"输入内容不合法！"
		},
		isAutoReceives : {
			required : "自动报备确认设置不能为空。"
		},
		isVisit : {
			required : "到访为王设置不能为空。"
		},
		isTel : {
			required : "是否全号报备设置不能为空。"
		},
		isDeveploerConfirm : {
			required : "开发商确认报备设置不能为空。"
		},
		dealRatio : {
			required : "二手成交套数比例预测值设置不能为空。",
			number:"输入内容过长！",
			maxlength : "输入内容过长！",
			min:"输入内容不合法！"
		},
		customRatio : {
			required : "客源比例超限值设置不能为空。",
			number:"输入内容过长！",
			maxlength : "输入内容过长！",
			min:"输入内容不合法！"
		}
	});
	
	Common.initSelect2("isAutoReceives", {
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	
	Common.initSelect2("isVisit", {
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	
	Common.initSelect2("isTel",{
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	
	Common.initSelect2("isDeveploerConfirm",{
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	
	$("#configlist_saveBtn").click(function(e){
		var actionType = $("#actionType").val();
		var url = actionType == "add" ? "save" : "update?projectInfoId="+$("#projectId").val();
		
    	var recordProtectHours = $("#recordProtectHours").val();
    	var visitProtectHours = $("#visitProtectHours").val();
    	var customProtectHours = $("#customProtectHours").val();
    	var isAutoReceives = $("#isAutoReceives").val();
    	var isVisit = $("#isVisit").val();
    	var isTel = $("#isTel").val();
    	var isDeveploerConfirm = $("#isDeveploerConfirm").val();
    	var dealRatio = $("#dealRatio").val();
    	var customRatio = $("#customRatio").val();
    	//var projectInfoId =$("#projectId").val();
    	var projectInfoId = $("#projectInfoId").val();
    	var radius = $("#radius").val();
    	if (!$('#projectConfigForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}
    	if(Common.isEmpty(isAutoReceives)){
    		Common.messageBox("提示", "请选择自动报备确认设置！", false);
    		$("#isAutoReceives").select2("open");
    		return false;
    	}
    	/*if(Common.checkRate(recordProtectHours)){
    		Common.messageBox("您输入的不是数字", "请重新输入！", false);
    		//$("#recordProtectHours").select2("open");
    		return false;
    	}*/
    	if(Common.isEmpty(isVisit)){
    		Common.messageBox("提示", "请选择到访为王设置！", false);
    		$("#isVisit").select2("open");
    		return false;
    	}
    	if(Common.isEmpty(isTel)){
    		Common.messageBox("提示", "请选择是否全号报备设置！", false);
    		$("#isTel").select2("open");
    		return false;
    	}
    	if(Common.isEmpty(isDeveploerConfirm)){
    		Common.messageBox("提示", "请选择开发商确认报备设置！", false);
    		$("#isDeveploerConfirm").select2("open");
    		return false;
    	}
    	Common.showMask("请稍候......");
    	$.ajax({
			url : url,
			type : "post",
			data : {
				recordProtectHours : recordProtectHours,
				visitProtectHours : visitProtectHours,
				customProtectHours : customProtectHours,
				isAutoReceives : isAutoReceives,
				isVisit : isVisit,
				isTel : isTel,
				isDeveploerConfirm : isDeveploerConfirm,
				dealRatio : dealRatio,
				customRatio : customRatio,
				projectInfoId:projectInfoId,
				radius : radius
			},
			dataType : "json",
			success : function(json) {
				Common.hideMask();
				if (json.isSuccess) {
					Common.alert("保存成功，请等待审核！", true, function(){
						var data=$("#projectInfoId").val();
				    	location.href = "../info/skipPage?projectInfoId=" + data+"&tabId=projectconfig";
				    	//location.href="../info/skipPage?projectInfoId="+projectInfoId+"&tabId=projectpackage";
				    	/*Common.jqGridReload("#configloglist_grid-table", {});
                		Common.jqGridReload("#configlist_grid-table", {});*/
					});
                } else {
                    Common.messageBox("提示", json.msg, false);
                }
			},
			error : function() {
				Common.hideMask();
				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
			}
		});
	});
	
	$("#configlist_backBtn").click(function(){
    	var data=$("#projectInfoId").val();
    	location.href = "../info/skipPage?projectInfoId=" + data+"&tabId=projectconfig";
    });
});