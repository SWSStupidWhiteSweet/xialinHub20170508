var toSvaeFileInfo = "";
$(function() {
	Common.initSelect2("tagCategory", {
		width : "200px"
	});
	Common.initSelect2("tagSubCategory", {
		width : "200px"
	});
	
	Common.formValidate("tagCreateForm", {
		tagName : {
			required : true,
			maxlength : 24
		}
	}, {
		tagName : {
			required : "标签名称不能为空.",
			maxlength : "标签名称最大长度为24"
		}
	});

	$("#saveBtn").click(function(e) {
		if (!$('#tagCreateForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}

		var tagId= $("#tagId").val();
		var tagName = $("#tagName").val();
		var tagCategory = $("#tagCategory").val();
		var tagSubCategory = $("#tagSubCategory").val();
		var fingerprint=$("#fingerprint").val();
		
		$.ajax({
			url : "modifiy",
			type : "post",
			data : {
				tagName : tagName,
				tagCategory : tagCategory,
				tagSubCategory : tagSubCategory,
				tagId : tagId,
				fingerprint:fingerprint
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.alert("标签修改成功！", true, back);
				} else {
					Common.messageBox("提示", json.msg, false);
				}
			},
			error : function() {
				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
			}
		});
	});

	$("#backBtn").click(back);

	function back() {
		location.href = "index";
	}
});
