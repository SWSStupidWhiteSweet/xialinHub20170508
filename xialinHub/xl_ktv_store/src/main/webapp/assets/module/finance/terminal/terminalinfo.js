$(function(){
	Common.formValidate("posTerminalForm", {
		terminalNo : {
			required : true,
			maxlength : 40
		},
		terminalMerchantNo : {
			required : true,
			maxlength : 40
		},
		svrFeeRatioD : {
			required : true,
			maxlength : 16
		},
		svrFeeMaxD : {
			required : true,
			maxlength : 16
		},
		svrFeeRatioC : {
			required : true,
			maxlength : 16
		},
		svrFeeMaxC : {
			required : false,
			maxlength : 16
		},
		bankName : {
			required : true,
			maxlength : 16
		},
		bankAccount : {
			required : true,
			maxlength : 26
		},
		bankAccountName : {
			required : true,
			maxlength : 16
		}
	}, {
		terminalNo : {
			required : "终端编号不能为空.",
			maxlength : "终端编号不能超过40位."
		},
		terminalMerchantNo : {
			required : "终端商户编号不能为空.",
			maxlength : "终端商户编号不能超过40位."
		},
		svrFeeRatioD : {
			required : "借记卡手续费率不能为空.",
			maxlength : "借记卡手续费率不超过16位."
		},
		svrFeeMaxD : {
			required : "借记卡单笔最高手续费不能为空.",
			maxlength : "借记卡单笔最高手续费不能超过16位."
		},
		svrFeeRatioC : {
			required : "贷记卡手续费率不能为空.",
			maxlength : "贷记卡手续费率不超过16位."
		},
		svrFeeMaxC : {
			maxlength : "贷记卡单笔最高手续费最长16位."
		},
		bankName : {
			required : "开户行不能为空.",
			maxlength : "开户行最长16位."
		},
		bankAccount : {
			required : "账号不能为空.",
			maxlength : "账号最长26个位."
		},
		bankAccountName : {
			required : "户名不能为空.",
			maxlength : "户名最长16个位."
		}
	});
	
	$("#saveBtn").click(function(e){
		if (!$('#posTerminalForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整,或有误！", false);
			return false;
		}
		var actionType = $("#actionType").val();
		var url = actionType == "add" ? "create" : "update";
		
		var posId = $("#posId").val();
		var terminalNo = $("#terminalNo").val();
		var terminalMerchantNo = $("#terminalMerchantNo").val();
		var svrFeeRatioD = $("#svrFeeRatioD").val();
		var svrFeeMaxD = $("#svrFeeMaxD").val();
		var svrFeeRatioC = $("#svrFeeRatioC").val();
		var svrFeeMaxC = Common.isEmpty($("#svrFeeMaxC").val())?"0":$("#svrFeeMaxC").val();
		var bankName = $("#bankName").val();
		var bankAccount = $("#bankAccount").val();
		var bankAccountName = $("#bankAccountName").val();
		var posType = $("#posType").val();
		var fingerprint = $("#fingerprint").val();
		
		if(!Common.checkRate(svrFeeRatioD)){
			Common.messageBox("提示", "借记卡手续费率只能为数字", false);
			$("#svrFeeRatioD").focus();
			return false;
		}
		if(!checknum(svrFeeRatioD)){
			Common.messageBox("提示", "借记卡手续费率格式有误!", false);
			$("#svrFeeRatioD").focus();
			return false;
		}
		if(!Common.checkRate(svrFeeMaxD)){
			Common.messageBox("提示", "借记卡最高手续费只能为数字", false);
			$("#svrFeeMaxD").focus();
			return false;
		}
		if(!Common.checkRate(svrFeeRatioC)){
			Common.messageBox("提示", "贷记卡手续费率只能为数字", false);
			$("#svrFeeRatioC").focus();
			return false;
		}
		if(!checknum(svrFeeRatioC)){
			Common.messageBox("提示", "借记卡手续费率格式有误!", false);
			$("#svrFeeRatioC").focus();
			return false;
		}
		if(!Common.checkRate(svrFeeMaxC)){
			Common.messageBox("提示", "贷记卡最高手续费只能为数字", false);
			$("#svrFeeMaxC").focus();
			return false;
		}
		if(!Common.checkRate(bankAccount)){
			Common.messageBox("提示", "账号只能为数字", false);
			$("#bankAccount").focus();
			return false;
		}
		
		var saveSupport = $("#saveSupport").val();
		if(saveSupport == 0){
			Common.messageBox("提示", "保存正在进行,请勿重复操作!", false);
			return false;
		}else if(saveSupport == 1){
			$("#saveSupport").val(0);
		}
		$.ajax({
			url : url,
			type : "post",
			data : {
				posId :posId,
				posType : posType,
				terminalNo : terminalNo,
				terminalMerchantNo : terminalMerchantNo,
				svrFeeRatioD : svrFeeRatioD,
				svrFeeMaxD : svrFeeMaxD,
				svrFeeRatioC : svrFeeRatioC,
				svrFeeMaxC : svrFeeMaxC,
				bankName : bankName,
				bankAccount : bankAccount,
				bankAccountName : bankAccountName,
				fingerprint : fingerprint
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					if(url == "create"){
						Common.alert("POS设备添加成功！", true,back);
					}else{
						Common.alert("POS设备修改成功！", true,back);
					}
				} else {
					Common.messageBox("提示", json.msg, false);
				}
				$("#saveSupport").val(1);
			},
			error : function() {
				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
				$("#saveSupport").val(1);
			}
		});
	});
	
	function checknum(num){
		var pattern = /^[1-9]?\d(\.\d+)?$/;
		if(num.match(pattern)){
			return true;
		}else{
			return false;
		}
	}
	
	$("#backBtn").click(back);

	function back() {
		location.href = "index";
	}
});