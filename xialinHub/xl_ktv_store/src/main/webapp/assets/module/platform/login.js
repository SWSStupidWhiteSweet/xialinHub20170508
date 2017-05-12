$(function() {
	$("#loginBtn").click(function(e) {
		var accountNo = $("#accountNo").val();
		var pwd = $("#pwd").val();
		
		if (Common.isEmpty(accountNo)) {
			Common.messageBox("提示", "请输入登录账号！", false, 2000);
			return false;
		}
		
		if (Common.isEmpty(pwd)) {
			Common.messageBox("提示", "请输入登录密码！", false, 2000);
			return false;
		}
		
		$.ajax({
			url : "login",
			data : {
				accountNo : accountNo,
				pwd : pwd
			},
			type : "post",
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					location.href = "center";
				} else {
					Common.messageBox("提示", json.msg, false, 2000);
				}
			},
			error : function() {
				Common.messageBox("提示", Common.SERVER_EXCEPTION, false, 2000);
			}
		});
	});
	
	$("body").keydown(function() {
	    if (event.keyCode == "13") {//keyCode=13是回车键
	        $("#loginBtn").click();
	    }
	});    
});