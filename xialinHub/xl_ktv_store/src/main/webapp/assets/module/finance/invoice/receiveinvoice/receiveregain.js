var toSvaeFileInfo = "";
$(function() {
	Common.formValidate("scarletCreateForm", {
		cancelInvoiceNumber : {
			required : true,
			maxlength :8
		},
		cancelInvoiceCode : {
			required : true,
			maxlength : 12
		}
	}, {
		invoiceNumber : {
			required : "发票票号不能为空且",
			maxlength:"发票票号最大长度为8"
		},
		invoiceCode : {
			required : "发票代码不能为空",
			maxlength:"发票代码最大长度为12"
		}
	});
	
	//保存
	$("#saveBtn").click(function(e) {
		if (!$('#scarletCreateForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}

		var invoiceId = $("#invoiceId").val();
		var cancelInvoiceCode = $("#cancelInvoiceCode").val();
		var cancelInvoiceNumber = $("#cancelInvoiceNumber").val();
		var fingerprint = $("#fingerprint").val();
		
		$.ajax({
			url : "openinvoicereceiveregain",
			type : "post",
			data : {
				invoiceId :invoiceId,
				cancelInvoiceCode : cancelInvoiceCode,
				cancelInvoiceNumber : cancelInvoiceNumber,
				fingerprint:fingerprint
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.alert("回收成功！", true, back);
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
		var position = $("#position").val();
		if(position=="openInvoice"){
			location.href = "invoiceindex?type=openInvoiceInfo";
		}else{
			location.href = "recoveryinvoiceindex";
		}
	}
});
