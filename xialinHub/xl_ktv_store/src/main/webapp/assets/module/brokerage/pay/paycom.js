var toSvaeFileInfo = "";
$(function() {
	$("#saveBtn").click(function(e) {
		
		var feeRatio = $("#fee_ratio").val();
		var payType = $("input[name='pay_type']:checked").val();
		var idcodePhoto = $("#idcodePhoto").val();
		var idcodeName = $("#idcodeName").val();
		var brokerageApplyId = $("#brokerage_apply_id").val();

		if (Common.isEmpty(payType)) {
			Common.messageBox("提示", "请选择转账方式！", false);
			return false;
		}
		
		if (Common.isEmpty(idcodePhoto)) {
			Common.messageBox("提示", "请上传附件！", false);
			return false;
		}
		
		if(!Common.checkRate(feeRatio)){
			Common.messageBox("提示", "请输入正确的金额！",false);
			return false;
		}
//		console.log(feeRatio+","+payType+","+idcodePhoto+","+idcodeName);
		
		$.ajax({
			url : "save",
			type : "post",
			data : {
				feeRatio : feeRatio,
				payType : payType,
				idcodePhoto : idcodePhoto,
				idcodeName : idcodeName,
				brokerageApplyId : brokerageApplyId,
				brokerage_att : 1
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.alert("操作成功！", true, back);
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
		location.href = "paycommission?activeTab=2";
	}

	$("#brokerage_att").uploadifive({
//		buttonClass : "btn btn-success",
		buttonText : "选择文件",
		uploadScript : "../../common/upload/file",
		fileSizeLimit : 1024 * 20,
		fileType : "image/*",
		queueSizeLimit : 1,
		removeCompleted : true,
		onUploadComplete : function(file, data) {
			var jsonData = eval("(" + data + ")");
			var htmlstr='<div><img class="img-div" src="'+"../../" + jsonData[0].httpUrl.substring(1)+jsonData[0].fileName+'"><h2 style="font-size:14px;margin:0px;">'+jsonData[0].srcFileName+'</h2 ></div>';
			var toSaveStr = jsonData[0].httpUrl+jsonData[0].smallFileName+":"+jsonData[0].srcFileName+";";
			toSvaeFileInfo += toSaveStr;
			$("#idcodePhoto").val(jsonData[0].httpPath);
	        $("#idcodeName").val(jsonData[0].fileName);
			$("#showImage").html(htmlstr);
//			alert(toSvaeFileInfo);
		}
	});
});
