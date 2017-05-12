var toSvaeFileInfo="";
$(function() {
	Common.initSelect2("brokerCompanyType", {
		width : "200px"
	});
	Common.initSelect2("province", {
		width : "200px"
	});
	Common.initSelect2("city", {
		width : "200px"
	});
	Common.initSelect2("status", {
		width : "200px"
	});
	Common.initSelect2("taxpayerType", {
		width : "200px"
	});
	
	
	Common.formValidate("form", {
		brokerCompanyName : {
			required : true,
			maxlength : 40,
		},
		bankName : {
			required : true,
			maxlength : 40,
		},
		bankAccountName : {
			required : true,
			maxlength : 40,
		},
		bankAccount : {
			required : true,
			maxlength : 32,
		},
		director : {
			required : true,
			maxlength : 10,
		},
		directorTel : {
			required : true,
			minlength : 11,
			maxlength : 11,
			number : true
		},
		loginAccount : {
			required : true,
			maxlength : 16,
		},
		loginPwd : {
			required : true,
			maxlength : 32,
		}
	}, {
		brokerCompanyName : {
			required : "经纪公司名称不能为空."
		},
		bankName : {
			required : "开户行不能为空."
		},
		bankAccountName : {
			required : "账户名称不能为空."
		},
		bankAccount : {
			required : "账号不能为空."
		},
		director : {
			required : "公司负责人不能为空."
		},
		directorTel : {
			required : "负责人电话不能为空."
		},
		loginAccount : {
			required : "登录账号不能为空."
		},
		loginPwd : {
			required : "登录密码不能为空."
		}
	});

	$("#saveBtn").click(function(e) {
		if (!$('#form').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}

		var actionType = $("#actionType").val();
		var url = actionType == "add" ? "add" : "update";

		var brokerCompanyId = $("#brokerCompanyId").val();
		var brokerCompanyName = $("#brokerCompanyName").val();
		var brokerCompanyType = $("#brokerCompanyType").val();
		var taxpayerType = $("#taxpayerType").val();
		var provinceId = $("#province").val();
		var provinceName = $("#province").find("option:selected").text();
		var cityId = $("#city").val();
		var cityName = $("#city").find("option:selected").text();
		var bankName = $("#bankName").val();
		var bankAccountName = $("#bankAccountName").val();
		var bankAccount = $("#bankAccount").val();
		var director = $("#director").val();
		var directorTel = $("#directorTel").val();
		var status = $("#status").val();
		var loginAccount = $("#loginAccount").val();
		var loginPwd = $("#loginPwd").val();
		var oldPwd = $("#oldPwd").val();

		if (Common.isEmpty(brokerCompanyType)) {
			Common.messageBox("提示", "请选择经纪公司类型！", false);
			$("#brokerCompanyType").select2("open");
			return false;
		}
		
		if (Common.isEmpty(taxpayerType)) {
			Common.messageBox("提示", "请选择纳税人类型！", false);
			$("#taxpayerType").select2("open");
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
		
		if (Common.isEmpty(status)) {
			Common.messageBox("提示", "请选择状态！", false);
			$("#status").select2("open");
			return false;
		}
		
//		if(Common.isEmpty(toSvaeFileInfo)) {
//			Common.messageBox("提示", "请上传附件！", false);
//			return false;
//		}
		
		$.ajax({
			url : url,
			type : "post",
			data : {
				brokerCompanyName : brokerCompanyName,
				brokerCompanyType : brokerCompanyType,
				taxpayerType : taxpayerType,
				provinceId : provinceId,
				provinceName : provinceName,
				cityId : cityId,
				cityName : cityName,
				bankName : bankName,
				bankAccountName : bankAccountName,
				bankAccount : bankAccount,
				director : director,
				directorTel : directorTel,
				offerAttachmentId : 0,
				status : status,
				loginAccount : loginAccount,
				loginPwd : loginPwd,
				attachmentName : $("#contractAttachment_srcFileName").val(),
				attachmentUrl : $("#contractAttachment_httpPath").val(),
				oldPwd : oldPwd,
				brokerCompanyId : brokerCompanyId
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.alert(json.msg, true, back);
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

	$("#contractAttachmentId").uploadifive({
//		buttonClass : "btn btn-success",
		buttonText : "选择文件",
		uploadScript : "../../common/upload/file?attachmentTypeCode=channel_broker_company_contract",
		fileSizeLimit : 1024 * 20,
		fileType : "image/*",
		queueSizeLimit : 1,
		removeCompleted : true,
		onUploadComplete : function(file, data, resp) {
			var jsonData = eval("(" + data + ")");
			console.log(jsonData);
			$("#contractAttachmentInfo").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文件【" + jsonData[0].srcFileName + "】上传成功！");
			$("#contractAttachmentInfo").attr("href", "${path}" + jsonData[0].httpPath);
			$("#contractAttachment_srcFileName").val(jsonData[0].srcFileName);
			$("#contractAttachment_diskPath").val(jsonData[0].diskPath);
			$("#contractAttachment_httpPath").val(jsonData[0].httpPath);
			$("#contractAttachmentId").val(jsonData[0].attachmentId);
			var htmlstr='<div><img id="image" class="img-div" onclick="Common.ShowImage('+ "../../" 
				+ jsonData[0].httpUrl.substring(1)+jsonData[0].fileName+')" src="'+ "../../" + jsonData[0].httpUrl.substring(1)
				+ jsonData[0].fileName+'"><h2 style="font-size:14px;margin:0px;">'+jsonData[0].srcFileName+'</h2 ></div>';
			$("#showImage").html(htmlstr);
		}
	});
});
