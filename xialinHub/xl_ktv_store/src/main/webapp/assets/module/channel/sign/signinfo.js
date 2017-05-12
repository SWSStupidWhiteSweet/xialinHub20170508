$(function($) {
	Common.formValidate("signForm", {
		signName : {
			required : true
		},
		signTime : {
			required : true
		},
		cooperationStart : {
			required : true
		},
		cooperationEnd : {
			required : true
		}
	}, {
		signName : {
			required : "签约名称不能为空。"
		},
		signTime : {
			required : "签约时间不能为空。"
		},
		cooperationStart : {
			required : "合作开始日期不能为空。"
		},
		cooperationEnd : {
			required : "合作结束日期不能为空。"
		}
	});
	
	/** **************************************按钮事件 start *************************************** */
	Common.initSelect2("projectProvince", {
		minimumResultsForSearch : Infinity,
		width : "200px"
	});

	Common.initSelect2("projectCity", {
		minimumResultsForSearch : Infinity,
		width : "200px"
	});
	
	Common.initSelect2("projectInfoId", {
		minimumResultsForSearch : Infinity,
		width : "200px"
	});
	
	Common.initSelect2("brokerCompanyProvince", {
		minimumResultsForSearch : Infinity,
		width : "200px"
	});

	Common.initSelect2("brokerCompanyCity", {
		minimumResultsForSearch : Infinity,
		width : "200px"
	});
	
	Common.initSelect2("brokerCompanyId", {
		minimumResultsForSearch : Infinity,
		width : "200px"
	});
	
	Common.initSelect2("agentId", {
		minimumResultsForSearch : Infinity,
		width : "200px"
	});
	
	$("#contract_uploadBtn").uploadifive({
		buttonText : "选择附件",
		uploadScript : "../../common/upload/file",
		fileSizeLimit : 1024 * 20,
		fileType : "image/*",
		queueSizeLimit : 1,
		multi : true,
		removeCompleted : true,
		onUploadComplete : function(file, data) {
			saveContractPic(data);
		}
	});
	
	function saveContractPic(data){
		var jsonData = eval("(" + data + ")")[0];
		$.ajax({
			url : "upload",
			type : "post",
			dataType : "json",
			data : {
				attachmentName : jsonData.srcFileName,
				attachmentUrl : jsonData.httpPath,
				attachmentType : '合同呈批件'
			},
			success : function(json) {
				if (json.isSuccess) {
					$("#contractAttachmentName").val(jsonData.srcFileName);
					$("#contractAttachmentId").val(json.result);
					Common.alert(json.msg, true);
				} else {
					Common.alert(json.msg, false);
				}
			}
		});
	}
	
	$("#agreement_uploadBtn").uploadifive({
		buttonText : "选择附件",
		uploadScript : "../../common/upload/file",
		fileSizeLimit : 1024 * 20,
		fileType : "image/*",
		queueSizeLimit : 1,
		multi : true,
		removeCompleted : true,
		onUploadComplete : function(file, data) {
			saveAgreementPic(data);
		}
	});
	
	function saveAgreementPic(data){
		var jsonData = eval("(" + data + ")")[0];
		$.ajax({
			url : "upload",
			type : "post",
			dataType : "json",
			data : {
				attachmentName : jsonData.srcFileName,
				attachmentUrl : jsonData.httpPath,
				attachmentType : '场外非电商协议附件'
			},
			success : function(json) {
				if (json.isSuccess) {
					$("#agreementAttachmentName").val(jsonData.srcFileName);
					$("#agreementAttachmentId").val(json.result);
					Common.alert(json.msg, true);
				} else {
					Common.alert(json.msg, false);
				}
			}
		});
	}
	
	$("#saveBtn").click(function(){
		var actionType = $("#actionType").val();
		var url = actionType == "add" ? "save" : "update";
		
		var signId = $("#signId").val();
		var projectInfoId = $("#projectInfoId").val();
		var brokerCompanyId = $("#brokerCompanyId").val();
		var signName = $("#signName").val();
		var agentId = $("#agentId").val();
		var signTime = $("#signTime").val();
		var cooperationStart = $("#cooperationStart").val();
		var cooperationEnd = $("#cooperationEnd").val();
		var contractAttachmentId = $("#contractAttachmentId").val();
		var agreementAttachmentId = $("#agreementAttachmentId").val();
		var fingerprint = $("#fingerprint").val();
		
		if(Common.isEmpty(projectInfoId)){
			Common.messageBox("提示", "请选择项目！", false);
			$("#projectInfoId").select2("open");
			return false;
		}
		if(Common.isEmpty(brokerCompanyId)){
			Common.messageBox("提示", "请选择经纪公司！", false);
			$("#brokerCompanyId").select2("open");
			return false;
		}
		if(Common.isEmpty(agentId)){
			Common.messageBox("提示", "请选择联代方！", false);
			$("#agentId").select2("open");
			return false;
		}
		if(Common.isEmpty(signTime)){
			Common.messageBox("提示", "签约时间不能为空！", false);
			$("#signTime").focus();
			return false;
		}
		if(Common.isEmpty(cooperationStart)){
			Common.messageBox("提示", "合作开始日期不能为空！", false);
			$("#cooperationStart").focus();
			return false;
		}
		if(Common.isEmpty(cooperationEnd)){
			Common.messageBox("提示", "合作结束日期不能为空！", false);
			$("#cooperationEnd").focus();
			return false;
		}
		if (!$('#signForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}
		if(signTime > cooperationStart) { 
    		Common.messageBox("提示", "合作开始日期 不能小于 签约时间！", false);
	    	return false;
    	}
		if(cooperationStart > cooperationEnd) { 
    		Common.messageBox("提示", "合作结束日期 不能小于 合作开始日期！", false);
	    	return false;
    	}
		
		$.ajax({
			url : url,
			type : 'post',
			data : {
				signId : signId,
				projectInfoId : projectInfoId,
				brokerCompanyId : brokerCompanyId,
				signName : signName,
				agentId : agentId,
				signTime : signTime,
				cooperationStart : cooperationStart,
				cooperationEnd : cooperationEnd,
				contractAttachmentId : contractAttachmentId,
				agreementAttachmentId : agreementAttachmentId,
				fingerprint : fingerprint
			},
			dataType : 'json',
			success : function(json){
				if (json.isSuccess) {
					Common.alert(json.msg, true, function(){
						location.href="index";
					});
				} else {
					Common.messageBox("提示", json.msg, false);
				}
			},
			error : function(){
				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
			}
		});
		
	}); 
	
	$("#backBtn").click(function(){
		location.href="index";
	});
	/** **************************************按钮事件 end *************************************** */
});