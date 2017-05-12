$(function() {
	Common.formValidate("operatorForm", {
		companyName : {
			required : true,
			maxlength : 40
		},
		operatorAccount : {
			required : true,
			maxlength : 48
		},
		operatorPwd : {
			required : true,
			maxlength : 64
		},
		operatorCode : {
			required : true,
			maxlength : 16
		},
		operatorName : {
			required : true,
			maxlength : 16
		},
		operatorTel : {
			required : true,
			minlength : 8,
			maxlength : 11
		}
	}, {
		companyName : {
			required : "总公司名称不能为空.",
			maxlength : "总公司名称不能超过40个汉字."
		},
		operatorAccount : {
			required : "登录账号不能为空.",
			maxlength : "登录账号不能超过48个字符."
		},
		operatorPwd : {
			required : "登录密码不能为空.",
			maxlength : "登录密码不能超过64个字符."
		},
		operatorCode : {
			required : "操作员编号不能为空.",
			maxlength : "操作员编号不能超过16个字符."
		},
		operatorName : {
			required : "操作员姓名不能为空.",
			maxlength : "操作员姓名不能超过16个字符."
		},
		operatorTel : {
			required : "联系电话不能为空.",
			minlength : "联系电话至少8位.",
			maxlength : "联系电话不能超过11位."
		}
	});
	
	$("#saveBtn").click(function(e) {
		if (!$('#operatorForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}

		var actionType = $("#actionType").val();
		var url = actionType == "add" ? "create" : "update";

		var companyId = $("#companyId").val();
		var companyName = $("#companyName").val();
		var operatorAccount = $("#operatorAccount").val();
		var operatorPwd = $("#operatorPwd").val();
		var operatorCode = $("#operatorCode").val();
		var operatorName = $("#operatorName").val();
		var operatorTel = $("#operatorTel").val();
		var operatorId = $("#operatorId").val();
		var operatorOldPwd = $("#operatorOldPwd").val();
		
		$.ajax({
			url : url,
			type : "post",
			data : {
				companyId : companyId,
				companyName : companyName,
				operatorAccount : operatorAccount,
				operatorPwd : operatorPwd,
				operatorCode : operatorCode,
				operatorName : operatorName,
				operatorTel : operatorTel,
				operatorOldPwd : operatorOldPwd,
				operatorId : operatorId
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.alert("操作员保存成功！", true, back);
				} else {
					Common.messageBox("提示", json.msg, false);
				}
			},
			error : function() {
				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
			}
		});
	});
	
	$("#backBtn").click(back);
	
	function back() {
		location.href = "operatorindex";
	}
});