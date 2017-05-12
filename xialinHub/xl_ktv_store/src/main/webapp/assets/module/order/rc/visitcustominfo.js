jQuery(function($) {

	
	Common.initSelect2("stuts", {
		width : "305px"
	});
	// 验证
	Common.formValidate("merchantForm", {
		customName : {
			required : true,
			maxlength : 40
		},
		stuts : {
			required : true,
			maxlength : 40
		},
		datepicker : {
			required : true,
			minlength : 8,
			maxlength : 23,
			
		}
	}, {
		customName : {
			required : "客户名称不能为空.",
			maxlength : "客户名称不能超过40个汉字."
		},
		stuts : {
			required : "联代方不能为空."

		},
		datepicker : {
			required : "日期不能为空",

		}
	});

	
	//取消
	$("#cancels").click(function(){
		
		 location.href = "toVisitIndex";
	})
	/**
	 * 提交
	 */
	$("#pass").click(function(e) {
		if (!$('#merchantForm').valid()) {
//			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}

		// 获取下拉框的数据
		var agentid = $("#stuts").val();
		var agentname = $("#stuts").text();
		if (agentid == undefined || agentid == "") {
			Common.messageBox("提示", "联代方不能为空！", false);
			return false;
		}
		var cusname=$("#customName").val();
		var id=$("#id").val();
		var time=$("#datepicker12").val();
		// 请求后端确认到访
		$.ajax({
					url : "confirmVisit",
					type : "post",
					data : {
						id : id,
						time : time,
						agentid : agentid,
						agentname : agentname,
						cusname : cusname
						
					},
					dataType : "json",
					success : function(json) {
						if (json.isSuccess) {
							Common.alert(json.msg,true,function(){
								 location.href = "toVisitIndex";
							});
							
						} else {
							Common.messageBox("提示",json.msg,false);
						}
					},
					error : function() {
						Common.messageBox("提示",Common.SERVER_EXCEPTION,false);
					}
				});
	})
});
