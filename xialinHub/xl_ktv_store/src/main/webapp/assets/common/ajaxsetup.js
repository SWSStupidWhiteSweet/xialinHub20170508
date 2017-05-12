// 用与设置全局的AJAX请求，目的是处理全局的AJAX事件，比如请求会话超时等操作
$(function(){
	$.ajaxSetup({
		contentType : "application/x-www-form-urlencoded;charset=utf-8",
		complete : function(XMLHttpRequest, textStatus) {
			// 通过XMLHttpRequest取得响应头，interceptorInfo
			var sessionStatus = XMLHttpRequest.getResponseHeader("interceptorInfo");
			var msg = "操作异常，请重新登录！！";
			var isTimeout = false;
			if (sessionStatus == "ajax_sessiontimeout") {
				// 这里怎么处理在你，这里跳转的登录页面
				msg = "由于您太久没操作，会话已过期，请重新登录！";
				isTimeout = true;
			} else if (sessionStatus == "permissionValid") {
				msg = "由于您当前没有操作权限，请重新登录！";
				isTimeout = true;
			}
			
			if (isTimeout) {
				if (typeof window.parent.parent.sessionTimeout == "function") {
					window.parent.parent.sessionTimeout(msg);
				} else if (typeof window.parent.sessionTimeout == "function") {
					window.parent.sessionTimeout(msg);
				} else {
					window.location.reload(); // 自已刷新一下，可跳回登录
				}
			}
		}
	});
});