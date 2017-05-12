$(function($) {
	/**
	 * 绑定返回事件
	 */
	$("#backBtn").click(function() {
		back();
	});

	/**
	 * 申请结佣
	 */
	$("#apply").click(function(e) {
		// 表单验证
		if (!$('#applyOrProhibitForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}

		// 获取页面数据
		var residueAmount = $("#residueAmount").val();
		var brokerageType = $("#brokerageType").val();
		var orderInfoId = $("#orderInfoId").val();
		var applyAmount = $("#applyAmount").val();
		var applyRemark = $("#applyRemark").val();
		var agentId = $("#agentId").val();
		var brokerCompanyId = $("#brokerCompanyId").val();
		var storeId = $("#storeId").val();
		var brokerageObject = $("#brokerageObject").val();

		// 验证其他数据
		var footprintReg = /^\d+(\.\d+)?$/;
		if (!footprintReg.test(applyAmount)) {
			Common.messageBox("提示", "请输入正确的申请结佣金额！", false);
			return false;
		}
		if ((applyAmount - residueAmount) > 0) {
			Common.messageBox("提示", "您申请的金额大于剩余可结佣金额", false);
			return false;
		}
		// 交互
		submit("apply", {
			applyAmount : applyAmount,
			applyRemark : applyRemark,
			brokerageType : brokerageType,
			orderInfoId : orderInfoId,
			agentId : agentId,
			brokerCompanyId : brokerCompanyId,
			storeId : storeId,
			brokerageObject : brokerageObject
		});
	});
	/**
	 * 禁止结佣
	 */
	$("#prohibit").click(function(e) {
		// 表单验证
		if (!$('#applyOrProhibitForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}

		// 获取页面数据
		var residueAmount = $("#residueAmount").val();
		var brokerageType = $("#brokerageType").val();
		var orderInfoId = $("#orderInfoId").val();
		var prohibitAmount = $("#prohibitAmount").val();
		var prohibitRemark = $("#prohibitRemark").val();

		// 验证其他数据
		var footprintReg = /^\d+(\.\d+)?$/;
		if (!footprintReg.test(prohibitAmount)) {
			Common.messageBox("提示", "请输入正确的禁止结佣金额！", false);
			return false;
		}
		if ((prohibitAmount - residueAmount) > 0) {
			Common.messageBox("提示", "您禁止的金额大于剩余可结佣金额", false);
			return false;
		}
		// 交互
		submit("prohibit", {
			prohibitAmount : prohibitAmount,
			prohibitRemark : prohibitRemark,
			brokerageType : brokerageType,
			orderInfoId : orderInfoId
		});
	});

	// 定义验证提示
	Common.formValidate("applyOrProhibitForm", {
		applyAmount : {
			required : true
		},
		applyRemark : {
			required : true,
			maxlength : 128
		},
		prohibitAmount : {
			required : true
		},
		prohibitRemark : {
			required : true,
			maxlength : 256
		}
	}, {
		applyAmount : {
			required : "申请结佣金额不能为空."
		},
		applyRemark : {
			required : "申请结佣备注不能为空.",
			maxlength : "申请结佣备注不能超过128个字."
		},
		prohibitAmount : {
			required : "禁止结佣金额不能为空",
		},
		prohibitRemark : {
			required : "禁止结佣原因不能为空.",
			maxlength : "禁止结佣原因不能超过256个字"
		}
	});
	/**
	 * 返回方法
	 */
	function back() {
		location.href = "../brokerage/index";
	}
	/**
	 * 提交后台
	 */
	function submit(url, params) {
		$.ajax({
			url : url,
			type : "post",
			data : params,
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

});