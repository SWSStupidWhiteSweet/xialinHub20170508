$(function() {
	Common.initSelect2("flowDefineId", {
		width : "100%"
	});
	/**
	 * 返回
	 */
	$("#backBtn").click(function() {
		back();
	});

	/**
	 * 审核通过
	 */
	$("#agree").click(function(e) {
		auditApply("agree", e);
	});

	/**
	 * 审核不通过
	 */
	$("#noAgree").click(function(e) {
		auditApply("noAgree", e);
	});
	
	/**
	 * 审核方法
	 */
	function auditApply(type, e) {
		// 表单验证
		if (!$('#auditTrialInfoForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}
		auditBrokerageApply($("#brokerageApplyId").val(),type,$("#remark").val(),$("#flowStartId").val());
	}
	
	/**
	 * 审核申请流程审核
	 */
	function auditBrokerageApply(brokerageApplyId,type,remark,flowStartId){
		$.ajax({
			url : "auditflowbrokerageapply",
			type : "post",
			data : {
				brokerageApplyId : brokerageApplyId,
				type : type,
				remark : remark,
				flowStartId : flowStartId
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.alert(json.msg, true, function() {
						back();
					});
				} else {
					Common.messageBox("提示", json.msg, false);
				}
			},
			error : function() {
				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
			}
		});
	}
	// 定义申请审核页面验证
	Common.formValidate("auditTrialInfoForm", {
		remark : {
			required : true,
			maxlength : 128
		}
	}, {
		remark : {
			required : "审核意见不能为空.",
			maxlength : "审核意见原因不能超过remark个字"
		}
	});
	function back() {
		location.href = "../flow/toflowwaitauditlist";
	}
});