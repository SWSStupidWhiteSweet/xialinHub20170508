jQuery(function($) {
	// 初始化图片框
	var colorbox_params = {
		reposition : true,
		scalePhotos : true,
		scrolling : false,
		previous : '<i class="icon-arrow-left"></i>',
		next : '<i class="icon-arrow-right"></i>',
		close : '&times;',
		current : '{current} of {total}',
		maxWidth : '100%',
		maxHeight : '100%',
		onOpen : function() {
			document.body.style.overflow = 'hidden';
		},
		onClosed : function() {
			document.body.style.overflow = 'auto';
		},
		onComplete : function() {
			$.colorbox.resize();
		}
	};
	$(".ace-thumbnails [data-rel='colorbox']").colorbox(colorbox_params);
	// 通过函数
	$("#pass").click(function() {
		var content = $("#content").val();
		var id = $("#id").val();

		// 请求后端修改备注状态
		$.ajax({
			url : "examineSignInfo",
			type : "post",
			data : {
				id : id,
				content : content,
				status : "1"
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.messageBox("提示", json.msg, true);
					location.href = "toSignOrderIndex";

				} else {
					Common.messageBox("提示", json.msg, false);
				}
			},

		});
	});
	// 不通过函数
	$("#nopass").click(function() {
		var content = $("#content").val();
		var id = $("#id").val();
		// 请求后端修改备注状态
		$.ajax({
			url : "examineSignInfo",
			type : "post",
			data : {
				id : id,
				content : content,
				status : "2"

			},
			dataType : "json",
			success : function(json) {

				if (json.isSuccess) {
					Common.messageBox("提示", json.msg, true);
					location.href = "toSignOrderIndex";
				} else {
					Common.messageBox("提示", json.msg, false);
				}
			},

		});
	});
	// 取消
	// 不通过函数
	$("#cancels").click(function() {
		location.href = "toSignOrderIndex";
	});
});