$(function($) {
	/**
	 * 通过
	 */
	$("#agree").click(function(e) {
		auditApply("agree", e);
	});
	/**
	 * 不通过
	 */
	$("#noAgree").click(function(e) {
		auditApply("noAgree", e);
	});

	$("#auditBackBtn").click(function() {
		auditBack();
	});
	// 定义申请审核页面验证
	Common.formValidate("applyAuditForm", {
		auditRemark : {
			required : true,
			maxlength : 256
		}
	}, {
		auditRemark : {
			required : "审核备注不能为空.",
			maxlength : "禁止结佣原因不能超过256个字"
		}
	});
	/**
	 * 审核页面返回方法
	 */
	function auditBack() {
		location.href = "../brokerage/index?type=brokerageApplyList";
	}

	/**
	 * 审核方法
	 */
	function auditApply(type, e) {
		// 表单验证
		if (!$('#applyAuditForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}

		var brokerageDistributionId = $("#brokerageDistributionId").val();
		var auditRemark = $("#auditRemark").val();
		var orderInfoId = $("#orderInfoId").val();
		var applyAmount = $("#applyAmount").val();
		var brokerageType = $("#brokerageType").val();

		$.ajax({
			url : "audit",
			type : "post",
			data : {
				brokerageDistributionId : brokerageDistributionId,
				type : type,
				auditRemark : auditRemark,
				orderInfoId : orderInfoId,
				applyAmount : applyAmount,
				brokerageType : brokerageType
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.alert(json.msg, true, function() {
						auditBack();
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
});