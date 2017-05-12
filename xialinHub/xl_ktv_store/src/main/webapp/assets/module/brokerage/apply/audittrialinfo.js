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
		if(type=="noAgree"){
			auditBrokerageApply($("#brokerageApplyId").val(),type,'',$("#remark").val());
		}else{
			var dialog = $("#condition").removeClass('hide').dialog(
					{
						modal : true,
						title : "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-search'></i> 请选择要发起的流程</h4></div>",
						title_html : true,
						width : "500px",
						buttons : [ {
							text : "取消",
							"class" : "btn btn-xs",
							click : function() {
								$(this).dialog("close");
							}
						}, {
							text : "确定",
							"class" : "btn btn-primary btn-xs",
							click : function() {
								var flowDefineId = $("#flowDefineId").val();
								if(flowDefineId==null || flowDefineId == ""){
									Common.messageBox("提示", "请选择要发起流程！", false);
									return false;
								}else{
									auditBrokerageApply($("#brokerageApplyId").val(),type,flowDefineId,$("#remark").val());
									$(this).dialog("close");
								}
							}
						} ]
					});
		}
	}
	
	/**
	 * 审核申请
	 */
	function auditBrokerageApply(brokerageApplyId,type,flowDefineId,remark){
		$.ajax({
			url : "auditbrokerageapply",
			type : "post",
			data : {
				brokerageApplyId : brokerageApplyId,
				type : type,
				flowDefineId : flowDefineId,
				remark : remark
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
		location.href = "../brokerage/tobrokerageapplytrial";
	}
});