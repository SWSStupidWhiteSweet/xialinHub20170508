var toSvaeFileInfo = "";
$(function() {
	Common.initSelect2("payWay", {
		width : "200px"
	});
	Common.initSelect2("companyId", {
		width : "200px"
	});
	Common.initSelect2("projectInfoId", {
		width : "200px"
	});
	
	Common.formValidate("paymentForm", {
		devAmount : {
			required : true,
			maxlength : 7
		},
		tradeTime : {
			required : true,
			maxlength : 40
		},
		payWay : {
			required : true,
			minlength : 8,
			maxlength : 23,
			digits : true
		},
		companyId : {
			required : true,
			maxlength : 16
		}
	}, {
		devAmount : {
			required : "回款金额."
		},
		tradeTime : {
			required : "回款时间不能为空."
		},
		payWay : {
			required : "回款方式不能为空."
		},
		companyId : {
			required : "回款开发商不能为空."
		}
	});

	$("#saveBtn").click(function(e) {
		if (!$('#paymentForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}

		var operateType = $("#operateType").val();
		var url = operateType == "add" ? "save" : "update";

		var devAmount = $("#devAmount").val();
		var tradeTime = $("#tradeTime").val();
		var payWay = $("#payWay").val();
		var companyId = $("#companyId").val();
		var remark = $("#remark").val();
		var projectInfoId = $("#projectInfoId").val();

		if (Common.isEmpty(tradeTime)) {
			Common.messageBox("提示", "请选择回款时间！", false);
			$("#tradeTime").datepicker('show');
			return false;
		}
		
		if (Common.isEmpty(payWay)) {
			Common.messageBox("提示", "请选择回款方式！", false);
			$("#payWay").select2("open");
			return false;
		}
		
		if (Common.isEmpty(companyId)) {
			Common.messageBox("提示", "请选择回款开发商！", false);
			$("#companyId").select2("open");
			return false;
		}
		
		if(Common.isEmpty(projectInfoId)) {
			Common.messageBox("提示", "请选择回款项目！", false);
			$("#projectInfoId").select2("open");
			return false;
		}
		
		if(Common.isEmpty(toSvaeFileInfo)) {
			Common.messageBox("提示", "请上传附件！", false);
			return false;
		}
		
		$.ajax({
			url : url,
			type : "post",
			data : {
				recvAmount : devAmount,
				tradeTime : tradeTime,
				payWay : payWay,
				companyId : companyId,
				fileInfo : toSvaeFileInfo,
				remark : remark,
				projectInfoId : projectInfoId
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.alert("回款记录添加成功！", true, back);
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

	$("#financeAttachment").uploadifive({
//		buttonClass : "btn btn-success",
		buttonText : "选择文件",
		uploadScript : "../../common/upload/file",
		fileSizeLimit : 1024 * 20,
		fileType : "image/*",
		queueSizeLimit : 1,
		removeCompleted : true,
		onUploadComplete : function(file, data) {
			var jsonData = eval("(" + data + ")");
			var htmlstr='<div><img id="image" class="img-div" src="'+ "../../" + jsonData[0].httpUrl.substring(1)
			+ jsonData[0].fileName+'"><h2 style="font-size:14px;margin:0px;">'+jsonData[0].srcFileName+'</h2 ></div>';
			var toSaveStr = jsonData[0].httpUrl+jsonData[0].smallFileName+":"+jsonData[0].srcFileName+";";
			toSvaeFileInfo += toSaveStr;
			$("#showImage").html(htmlstr);
		}
	});
	
	
});
