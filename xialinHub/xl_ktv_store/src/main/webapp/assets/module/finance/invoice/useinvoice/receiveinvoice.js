var toSvaeFileInfo = "";
$(function() {
	Common.initSelect2("drawOperatorId", {
		width : "200px"
	});
	
	
	//保存
	$("#saveBtn").click(function(e) {
		var invoiceId = $("#invoiceId").val();
		var drawOperatorId = $("#drawOperatorId").val();
		var drawTime = $("#drawTime").val();
		var fingerprint = $("#fingerprint").val();
		if (Common.isEmpty(drawOperatorId)) {
			Common.messageBox("提示", "请选择领用人！", false);
			$("#drawOperatorId").select2("open");
			return false;
		}
		if (Common.isEmpty(drawTime)) {
			Common.messageBox("提示", "请选择领用时间！", false);
			$("#drawTime").select2("open");
			return false;
		}
		$.ajax({
			url : "receiveinvoice",
			type : "post",
			data : {
				invoiceId :invoiceId,
				drawOperatorId :drawOperatorId,
				drawTime :drawTime,
				fingerprint:fingerprint
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.alert("领用成功！", true, back);
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
		location.href ="useinvoiceindex";
	}
});
