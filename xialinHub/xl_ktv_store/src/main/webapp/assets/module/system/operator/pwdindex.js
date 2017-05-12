$(function() {
	$('#modifyPwdForm').validate({
		errorElement : 'div',
		errorClass : 'help-block',
		focusInvalid : false,
		ignore : "",
		rules : {
			oldPwd : {
				required : true,
				minlength : 6
			},
			newPwd : {
				required : true,
				minlength : 6
			},
			confirmPwd : {
				required : true,
				minlength : 6,
				equalTo : "#newPwd"
			}
		},

		messages : {
			oldPwd : {
				required : "原密码不能为空.",
				minlength : "密码长度最小为6个字符."
			},
			newPwd : {
				required : "新密码不能为空.",
				minlength : "密码长度最小为6个字符."
			},
			confirmPwd : {
				required : "再次输入新密码不能为空.",
				minlength : "密码长度最小为6个字符."
			}
		},

		highlight : function(e) {
			$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
		},

		success : function(e) {
			$(e).closest('.form-group').removeClass('has-error');// .addClass('has-info');
			$(e).remove();
		},

		errorPlacement : function(error, element) {
			if (element.is('input[type=checkbox]') || element.is('input[type=radio]')) {
				var controls = element.closest('div[class*="col-"]');
				if (controls.find(':checkbox,:radio').length > 1)
					controls.append(error);
				else
					error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
			} else if (element.is('.select2')) {
				error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
			} else if (element.is('.chosen-select')) {
				error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
			} else
				error.insertAfter(element.parent());
		},

		submitHandler : function(form) {
			alert();
		},
		invalidHandler : function(form) {
		}
	});
	
	$("#modifyPwdBtn").click(function(e){
		//表单验证
		if (!$('#modifyPwdForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}
		//获取页面数据
		
		var oldPwd = $("#oldPwd").val();
		var newPwd = $("#newPwd").val();
		var confirmPwd = $("#confirmPwd").val();
		
		if(newPwd!=confirmPwd){
			Common.messageBox("提示", "两次密码不一样，请确认！", false);
			return false;
		}
		
		//交互
		$.ajax({
			url : "modifypwd",
			type : "post",
			data : {
				oldPwd : oldPwd,
				newPwd : newPwd
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.alert(json.msg, true, function(){
						history.go(0);
					});
				} else {
					Common.messageBox("提示", json.msg, false);
				}
			},
			error : function() {
				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
			}
		});
	});
});