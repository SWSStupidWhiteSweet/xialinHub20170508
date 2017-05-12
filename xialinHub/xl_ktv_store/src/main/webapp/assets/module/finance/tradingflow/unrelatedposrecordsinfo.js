$(function($) {
	// 初使化combo
	Common.initSelect2("province", {
		width : "200px"
	});
	
	Common.initSelect2("city", {
		width : "200px"
	});
	Common.initSelect2("buildingProjectId", {
		width : "200px"
	});
	
	Common.initSelect2("pay_account_type", {
		width : "200px"
	});
	
	Common.initSelect2("project_info_name", {
		width : "200px"
	});
	
	Common.initSelect2("pos_terminal_code", {
		width : "200px"
	});
	
	//表单
	Common.formValidate("unrelatedposrecordsinfoForm", {
		pos_terminal_code : {
			required : true,
			maxlength : 40
		},
		pay_bank_name : {
			required : true,
			maxlength : 20
		},
		pay_account_name : {
			required : true,
			maxlength : 20
		},
		pay_account_number : {
			required : true,
			maxlength : 26
		},
		eb_amount : {
			required : true,
			maxlength : 20
		},
		bank_serial_id : {
			required : true,
			maxlength : 40
		},
		trade_ref_code : {
			required : true,
			maxlength : 30
		}
	}, {
		pos_terminal_code : {
			required : "终端编号不能为空.",
			maxlength : "终端编号不能超过40位."
		},
		pay_bank_name : {
			required : "开户行不能为空.",
			maxlength : "开户行不能超过20位."
		},
		pay_account_name : {
			required : "持卡人不能为空.",
			maxlength : "持卡人不能超过20位."
		},
		pay_account_number : {
			required : "刷卡银行卡号不能为空.",
			maxlength : "刷卡银行卡号不能超过26位."
		},
		eb_amount : {
			required : "刷卡金额不能为空.",
			maxlength : "刷卡金额不超过20位."
		},
		bank_serial_id : {
			required : "银行流水号不能为空.",
			maxlength : "银行流水号不超过40位."
		},
		trade_ref_code : {
			required : "交易参考号不能为空.",
			maxlength : "交易参考号最长30位."
		}
	});
	
	/** **************************************按钮事件 start *************************************** */
	
	/**
	 * 保存
	 */
	$("#saveBtn").click(function(e) {
		/*if (!$('#unrelatedposrecordsinfoForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}*/
		if (!$('#unrelatedposrecordsinfoForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整或有误！", false);
			return false;
		}
		var province = $("#province").val();
		var city = $("#city").val();
		var buildingProjectId = $("#buildingProjectId").val();
		var project_info_id = $("#project_info_name").val();
		var pos_terminal_code = $("#pos_terminal_code").find("option:selected").text();
		var pay_bank_name = $("#pay_bank_name").val();
		var pay_account_name = $("#pay_account_name").val();
		var pay_account_number = $("#pay_account_number").val();
		var eb_amount = $("#eb_amount").val();
		var eb_amount_fee = $("#eb_amount_fee").val();
		var tradeTime = $("#tradeTime").val();
		var bank_serial_id = $("#bank_serial_id").val();
		var trade_ref_code = $("#trade_ref_code").val();
		var pay_account_type = $("#pay_account_type").val();
		
		if (Common.isEmpty(province)) {
			Common.messageBox("提示", "请选择省！", false);
			$("#province").select2("open");
			return false;
		}
		if (Common.isEmpty(city)) {
			Common.messageBox("提示", "请选择市！", false);
			$("#city").select2("open");
			return false;
		}
		if (Common.isEmpty(buildingProjectId)) {
			Common.messageBox("提示", "请选择楼盘！", false);
			$("#buildingProjectId").select2("open");
			return false;
		}
		if (Common.isEmpty(project_info_id)) {
			Common.messageBox("提示", "请选择项目！", false);
			$("#project_info_name").select2("open");
			return false;
		}
		if (Common.isEmpty($("#pos_terminal_code").val())) {
			Common.messageBox("提示", "请选择POS机！", false);
			$("#pos_terminal_code").select2("open");
			return false;
		}
		
		
		if (Common.isEmpty(tradeTime)) {
			Common.messageBox("提示", "请选择刷卡日期！", false);
			return false;
		}
		
		if (Common.isEmpty(pay_account_type)) {
			Common.messageBox("提示", "请选择卡片类型！", false);
			$("#pay_account_type").select2("open");
			return false;
		}
		
		if(!Common.checkRate(pay_account_number)){
			Common.messageBox("提示", "银行卡号只能为数字", false);
			$("#pay_account_number").focus();
			return false;
		}
		if(pay_account_number.length < 10){
			Common.messageBox("提示", "银行卡号长度大于10", false);
			$("#pay_account_number").focus();
			return false;
		}
		if(!Common.checkRate(eb_amount)){
			Common.messageBox("提示", "刷卡金额只能为数字", false);
			$("#eb_amount").focus();
			return false;
		}
		if(!Common.isEmpty(eb_amount_fee) && !Common.checkRate(eb_amount_fee)){
			Common.messageBox("提示", "刷卡手续费只能为数字", false);
			$("#eb_amount_fee").focus();
			return false;
		}
		
		//pos手续费校验
		var isExit = true;
		if(!Common.isEmpty(eb_amount_fee)){
			$.ajax({
				url : "checkfee",
				type : "post",
				data : {
					posTerminalCode : pos_terminal_code,
					pay_account_type : pay_account_type
				},
				async : false,
				dataType : "json",
				success : function(json) {
					var data = eval(json);
					if (data != 0 && data < eb_amount_fee) {
						Common.messageBox("提示", "刷卡手续费超过了该POS机最高手续费("+data+")!", false);
						$("#eb_amount_fee").focus();
						isExit = false;
					}
				}
			});
		}
		if(isExit == false){
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
			url : "saveunrelatedpos",
			type : "post",
			data : {
				projectInfoId : project_info_id,
				posTerminalCode : pos_terminal_code,
				pay_bank_name : pay_bank_name,
				pay_account_name : pay_account_name,
				payAccountNumber : pay_account_number,
				ebAmount : eb_amount,
				feeAmount : eb_amount_fee,
				tradeTimeString : tradeTime,
				bankSerialId : bank_serial_id,
				tradeRefCode : trade_ref_code,
				pay_account_type : pay_account_type
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.alert("添加成功！", true, back);
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

	//返回
	$("#backBtn").click(back);
	function back() {
		location.href = "index?activeTab=2";
	}

	/** **************************************按钮事件 end *************************************** */
	
	
});