$(function($) {
	// 初使化combo
	
	Common.initSelect2("storeId", {
		width : "200px"
	});
	
	Common.initSelect2("provinceId", {
		width : "200px"
	});
	
	Common.initSelect2("cityId", {
		width : "200px"
	});
	
	
	//表单
	Common.formValidate("brokerForm", {
		brokerName : {
			required : true,
			maxlength : 48
		},
		brokerTel : {
			required : true,
			maxlength : 11
		},
		idcode : {
			required : true,
			maxlength : 18
		},
		brokerPwd : {
			required : true,
			maxlength : 64
		}
	}, {
		brokerName : {
			required : "经纪人姓名不能为空.",
			maxlength : "经纪人姓名不能超过48位."
		},
		brokerTel : {
			required : "电话号码不能为空.",
			maxlength : "电话号码不能超过11位."
		},
		idcode : {
			required : "身份证号码不能为空.",
			maxlength : "身份证号码不超过18位."
		},
		brokerPwd : {
			required : "登录密码不能为空.",
			maxlength : "登录密码不能超过64位."
		}
	});
	
	//验证手机号checkPhone
	function checkPhone(phone){
		if(/^1\d{10}$/.test(phone)){
			return true;
		}else{
			return false;
		}
	}
	//验证15位身份证
	function checkID15(id){
		var pattern = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;
		if(id.match(pattern)){
			return true;
		}else{
			return false;
		}
	}
	
	//验证18位身份证
	function checkID18(id){
		var pattern = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
		if(id.match(pattern)){
			return true;
		}else{
			return false;
		}
	}
	
	/** **************************************按钮事件 start *************************************** */

	/**
	 * 保存
	 */
	$("#saveBtn").click(function(e) {
		if (!$('#brokerForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整或有误！", false);
			return false;
		}
		var storeId = $("#storeId").val();
		var provinceName = $("#provinceName").val();
		var cityName = $("#cityName").val();
		var brokerName = $("#brokerName").val();
		var brokerSex = $("#brokerSex").val();
		var brokerTel = $("#brokerTel").val();
		var idcode = $("#idcode").val();
		var brokerPwd = $("#brokerPwd").val();
		var idcodePhoto = $("#idcodePhoto").val()==""?null:$("#idcodePhoto").val();
		var status = $("#status").val();
		
		if (Common.isEmpty(storeId)) {
			Common.messageBox("提示", "请选择门店！", false);
			$("#storeId").select2("open");
			return false;
		}
		
		if(!Common.checkRate(brokerTel)){
			Common.messageBox("提示", "电话号码只能为数字", false);
			$("#brokerTel").focus();
			return false;
		}
		if(!checkPhone(brokerTel)){
			Common.messageBox("提示", "电话号码格式有误", false);
			$("#brokerTel").focus();
			return false;
		}
		
		if(!checkID18(idcode) && !checkID15(idcode)){
			Common.messageBox("提示", "身份证号码格式有误", false);
			$("#idcode").focus();
			return false;
		}
		
		var saveSupport = $("#saveSupport").val();
		if(saveSupport == 0){
			Common.messageBox("提示", "保存正在进行,请勿重复操作!", false);
			return false;
		}else if(saveSupport == 1){
			$("#saveSupport").val(0);
		}
		$.ajax({
			url : "update",
			type : "post",
			data : {
				storeId : storeId,
				provinceName : provinceName,
				cityName : cityName,
				brokerName : brokerName,
				brokerSex : brokerSex,
				brokerTel : brokerTel,
				idcode : idcode,
				brokerPwd : brokerPwd,
				idcodePhoto : idcodePhoto,
				status : status,
				fingerprint : $("#fingerprint").val(),
				brokerId : $("#brokerId").val()
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.alert("修改成功！", true, back);
				} else {
					Common.messageBox("提示", json.msg, false);
				}
				$("#saveSupport").val(1);
			},
			error : function() {
				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
				$("#saveSupport").val(1);
			}
		});
	});

	//返回
	$("#backBtn").click(back);
	
	function back() {
		location.href = "index";
	}

	$("#uploadFile").uploadifive({
		buttonText : "上传",
		//swf : '${path}/assert/plugins/uploadify/uploadify.swf',
		uploadScript : "../../common/upload/file",
		fileType : "*.jpg;*.jpeg;*.png;*.bmp",
		buttonClass : "inputstyle",
		queueSizeLimit : 1,
		removeCompleted : false,
		onUploadComplete : function(file, data) {
			var jsonData = eval("(" + data + ")");
			/*console.log(jsonData);*/
			var path = jsonData[0].httpUrl+jsonData[0].fileName;
			$("#idcodePhoto").val(path);
			$("#showPhoto").attr("src",$("#basePath").val()+path);
			Common.messageBox("提示", "身份证照片上传成功！", true);
			/*$.ajax({
				url : "import",
				data : {
					filePath : jsonData[0].diskPath
				},
				type : "post",
				dataType : "json",
				success : function(json) {
					Common.messageBox("提示", "身份证照片上传成功！", true);
				},
				error : function() {
					Common.messageBox("提示", "服务器繁忙,请稍后在重试！！", false);
				}
			});*/
		}
	});
	
	$("#uploadFile").parent().attr("style","line-height: 30px;overflow: hidden;text-align: center;");
	/** **************************************按钮事件 end *************************************** */
});