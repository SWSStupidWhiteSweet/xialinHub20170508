$(function() {
	Common.initSelect2("province", {
		allowClear: true,
        minimumResultsForSearch: Infinity,
		width : "200px"
	});
	Common.initSelect2("city", {
		width : "200px"
	});
	Common.initSelect2("district", {
		width : "200px"
	});
	Common.initSelect2("plate", {
		width : "200px"
	});
	Common.initSelect2("status", {
		width : "200px"
	});
	Common.initSelect2("storeType", {
		width : "200px"
	});
	Common.initSelect2("brokerCompanyId", {
		width : "200px"
	});
	
	
	Common.formValidate("form", {
		storeName : {
			required : true,
			maxlength : 40,
		},
		storeAddr : {
			required : true,
			maxlength : 40,
		},
		director : {
			required : true,
			maxlength : 40,
		},
		directorTel : {
			required : true,
			maxlength : 11,
			minlength : 11,
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
		storeName : {
			required : "门店名称不能为空."
		},
		storeAddr : {
			required : "门店地址不能为空."
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

		var storeId = $("#storeId").val();
		var storeName = $("#storeName").val();
		var storeAddr = $("#storeAddr").val();
		var longitude = $("#longitude").val();
		var latitude = $("#latitude").val();
		var provinceId = $("#province").val();
		var provinceName = $("#province").find("option:selected").text();
		var districtId = $("#district").val();
		var districtName = $("#district").find("option:selected").text();
		var plateId = $("#plate").val();
		var plateName = $("#plate").find("option:selected").text();
		var cityId = $("#city").val();
		var cityName = $("#city").find("option:selected").text();
		var storeType = $("#storeType").val();
		var brokerCompanyId = $("#brokerCompanyId").val();
		var director = $("#director").val();
		var directorTel = $("#directorTel").val();
		var status = $("#status").val();
		var loginAccount = $("#loginAccount").val();
		var loginPwd = $("#loginPwd").val();
		var oldPwd = $("#oldPwd").val();
		
		if (Common.isEmpty(longitude) || Common.isEmpty(latitude)) {
			Common.messageBox("提示", "请在地图选择门店位置！", false);
			return false;
		}
		
		if (Common.isEmpty(brokerCompanyId)) {
			Common.messageBox("提示", "请选择所属公司！", false);
			$("#brokerCompanyId").select2("open");
			return false;
		}
		
		if (Common.isEmpty(storeType)) {
			Common.messageBox("提示", "请选择门店类型！", false);
			$("#storeType").select2("open");
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
		
		if (Common.isEmpty(districtId)) {
			Common.messageBox("提示", "请选择所属区县！", false);
			$("#district").select2("open");
			return false;
		}
		
		if (Common.isEmpty(plateId)) {
			Common.messageBox("提示", "请选择所属板块！", false);
			$("#plate").select2("open");
			return false;
		}
		
		if (Common.isEmpty(status)) {
			Common.messageBox("提示", "请选择营业状态！", false);
			$("#status").select2("open");
			return false;
		}
		
		$.ajax({
			url : url,
			type : "post",
			data : {
				storeId : storeId,
				storeName : storeName,
				storeAddr : storeAddr,
				provinceId : provinceId,
				provinceName : provinceName,
				cityId : cityId,
				cityName : cityName,
				districtId : districtId,
				districtName : districtName,
				plateId : plateId,
				plateName : plateName,
				director : director,
				directorTel : directorTel,
				status : status,
				loginAccount : loginAccount,
				loginPwd : loginPwd,
				attachmentName : $("#contractAttachment_srcFileName").val(),
				attachmentUrl : $("#contractAttachment_httpPath").val(),
				oldPwd : oldPwd,
				brokerCompanyId : brokerCompanyId,
				longitude : longitude,
				latitude : latitude,
				storeType : storeType
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
			var htmlstr='<div><img id="image" class="img-div" onclick="Common.ShowImage('+ "../../" + jsonData[0].httpUrl.substring(1)+jsonData[0].fileName+')" style="width: 70px;height: 70px;" src="'+ "../../" + jsonData[0].httpUrl.substring(1)+jsonData[0].fileName+'"><h2 style="font-size:14px;margin:0px;">'+jsonData[0].srcFileName+'</h2 ></div>';
			$("#showImage").html(htmlstr);
		}
	});
});
