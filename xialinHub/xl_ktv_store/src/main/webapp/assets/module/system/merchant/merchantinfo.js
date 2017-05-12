$(function() {
	Common.formValidate("merchantForm", {
		merchantName : {
			required : true,
			maxlength : 40
		},
		merchantAddr : {
			required : true,
			maxlength : 40
		},
		merchantTel : {
			required : true,
			minlength : 8,
			maxlength : 23,
			digits : true
		},
		merchantContact : {
			required : true,
			maxlength : 16
		},
		province : {
			required : true
		},
		companyName : {
			required : true,
			maxlength : 40
		},
		operatorAccount : {
			required : true,
			maxlength : 16
		},
		operatorPwd : {
			required : true,
			maxlength : 16
		}
	}, {
		merchantName : {
			required : "商户名称不能为空.",
			maxlength : "商户名称不能超过40个汉字."
		},
		merchantAddr : {
			required : "商户地址不能为空.",
			maxlength : "商户地址不能超过40个汉字."
		},
		merchantTel : {
			required : "联系电话不能为空.",
			minlength : "联系电话不少于8位.",
			maxlength : "联系电话不超过23位.",
			digits : "联系电话必须是数字."
		},
		merchantContact : {
			required : "联系人不能为空.",
			maxlength : "联系人名称不能超过16个汉字."
		},
		companyName : {
			required : "总公司名称不能为空.",
			maxlength : "总公司名称不能超过40个汉字."
		},
		operatorAccount : {
			required : "超管账户不能为空.",
			maxlength : "超管账户最长16个字节."
		},
		operatorPwd : {
			required : "超管密码不能为空.",
			maxlength : "超管密码最长16个字节."
		}
	});

	$("#saveBtn").click(function(e) {
		if (!$('#merchantForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}

		var actionType = $("#actionType").val();
		var url = actionType == "add" ? "create" : "update";

		var merchantId = $("#merchantId").val();
		var merchantName = $("#merchantName").val();
		var merchantAddr = $("#merchantAddr").val();
		var merchantTel = $("#merchantTel").val();
		var merchantContact = $("#merchantContact").val();
		var merchantType = $("#merchantType").val();
		var companyName = $("#companyName").val();
		var provinceId = $("#province").val();
		var cityId = $("#city").val();
		var operatorAccount = $("#operatorAccount").val();
		var operatorPwd = $("#operatorPwd").val();

		if (Common.isEmpty(merchantType)) {
			Common.messageBox("提示", "请选择商户类型！", false);
			$("#merchantType").select2("open");
			return false;
		}
		
		if (Common.isEmpty(provinceId)) {
			Common.messageBox("提示", "请选择所属省！", false);
			$("#province").select2("open");
			return false;
		}
		
		if (Common.isEmpty(cityId)) {
			Common.messageBox("提示", "请选择所属市！", false);
			$("#city").select2("open");
			return false;
		}
		
		$.ajax({
			url : url,
			type : "post",
			data : {
				merchantId : merchantId,
				merchantName : merchantName,
				merchantAddr : merchantAddr,
				merchantTel : merchantTel,
				merchantContact : merchantContact,
				merchantType : merchantType,
				companyName : companyName,
				provinceId : provinceId,
				cityId : cityId,
				operatorAccount : operatorAccount,
				operatorPwd : operatorPwd
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.alert("商户保存成功！", true, back);
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
		location.href = "index";
	}

	Common.initSelect2("merchantType", {
		width : "200px"
	});
	
	Common.initSelect2("province", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "200px"
	});
	
	Common.initSelect2("city", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "200px"
	});
});
