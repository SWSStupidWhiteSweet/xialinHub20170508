var toSvaeFileInfo = "";
$(function() {
	$("#info").hide();
	Common.formValidate("scarletCreateForm", {
		invoiceNumber : {
			required : true,
			maxlength :8
		},
		invoiceCode : {
			required : true,
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
			maxlength :48
		}
	}, {
		invoiceNumber : {
			required : "发票票号不能为空",
			maxlength:"发票票号最大长度为8"
		},
		invoiceCode : {
			required : "发票代码不能为空",
			maxlength:"发票代码最大长度为12"
		},
		invoiceAmount : {
			required : "发票金额不能为空",
			maxlength:"发票金额最大长度为12"
		},
		invoiceTime : {
			required : "发票开具时间不能为空."
		},
		invoiceTitle : {
			required : "付款方不能为空且只能输入48位.",
			maxlength:"付款方最大长度为48"
		}
	});

	 /*根据订单编号查询*/
	$("#search").click(function() {
		var code = $.trim($("#orderInfoCode").val());
		if(code == null || code =='undefine' || code == ""){
			Common.messageBox("提示", "请输入订单编号！", false);
			return false;
		}
		$.ajax({
			url : "findorderbycode",
			type : "post",
			data : {
				orderInfoCode :code
			},
			dataType : "json",
			success : function(json) {
				if (json.result == "true") {
					$("#info").show();
					$("#customName").val(json.customName);
			      	$("#cheapCode").val(json.cheapCode);
			      	$("#groupFee").val(json.groupFee);
			      	$("#orderInfoId").val(json.orderInfoId);
			      	$("#invoiceAmount").val(json.groupFee);
				} else {
					$("#info").hide();
					$("#customName").val("");
			      	$("#cheapCode").val("");
			      	$("#groupFee").val("");
			      	$("#orderInfoId").val("");
					Common.messageBox("提示", json.msg, false);
				}
			},
			error : function() {
				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
			}
		});
	});
	
	//保存
	$("#saveBtn").click(function(e) {
		if (!$('#scarletCreateForm').valid()) {
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
		var reg=/^[1-9]{1}\d*(\.\d{1,2})?$/;
		
		if(invoiceTime==null||invoiceTime=="undefined"){
			Common.messageBox("提示", "发票开具时间必须选择！", false);
		}
		if(reg.test(invoiceAmount)==false){
			Common.messageBox("提示", "发票金额最多有两位小数！", false);
		}
		
		$.ajax({
			url : "addscarletcomplement",
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
					Common.alert("添加红字发票成功！", true, back);
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
		location.href = "scarletinvoiceindex";
	}
});
