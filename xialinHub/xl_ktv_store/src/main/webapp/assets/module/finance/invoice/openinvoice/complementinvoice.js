var toSvaeFileInfo = "";
$(function() {
	Common.formValidate("tagCreateForm", {
		invoiceNumber : {
			required : true,
			maxlength :8
		},
		invoiceCode : {
			//required : true,
			maxlength : 12
		},
		invoiceAmount : {
			required : true,
			maxlength :9
		},
		invoiceTime : {
			required : true
		},
		invoiceTitle : {
			required : true,
			maxlength :9
		}
	}, {
		invoiceNumber : {
			required : "发票票号不能为空且只能八位"
		},
		invoiceCode : {
			required : "发票代码只能12位."
		},
		invoiceAmount : {
			required : "发票金额不能为空且只能输12位以内的数."
		},
		invoiceTime : {
			required : "发票开具时间不能为空."
		},
		invoiceTitle : {
			required : "付款方不能为空且只能输入48位."
		}
	});

	//保存
	$("#saveBtn").click(function(e) {
		if (!$('#tagCreateForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}

		var orderInfoId = $("#orderInfoId").val();
		var orderInfoCode = $("#orderInfoCode").val();
		var groupFee = $("#groupFee").val();
		var customName = $("#customName").val();
		var cheapCode = $("#cheapCode").val();
		var invoiceNumber = $("#invoiceNumber").val();
		var invoiceCode = $("#invoiceCode").val();
		var invoiceAmount = $("#invoiceAmount").val();
		var invoiceTime = $("#invoiceTime").val();
		var invoiceTitle = $("#invoiceTitle").val();
		var invoiceContent = $("#invoiceContent").val();
		var invoiceType = $("#invoiceType").val();
		var status=$("#status").val();
		
		$.ajax({
			url : "complement",
			type : "post",
			data : {
				orderInfoId : orderInfoId,
				orderInfoCode : orderInfoCode,
				groupFee : groupFee,
				customName : customName,
				cheapCode : cheapCode,
				invoiceNumber : invoiceNumber,
				invoiceCode : invoiceCode,
				invoiceAmount : invoiceAmount,
				invoiceTime : invoiceTime,
				invoiceTitle:invoiceTitle,
				invoiceContent : invoiceContent,
				invoiceType : invoiceType,
				status : status
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.alert("补全发票成功！", true, back);
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
		location.href = "invoiceindex";
	}
});
