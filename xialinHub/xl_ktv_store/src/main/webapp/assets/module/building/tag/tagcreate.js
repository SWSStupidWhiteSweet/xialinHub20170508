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
		},
		tagCategory : {
			required : true
		},
		tagSubCategory : {
			required : true
		}
	}, {
		tagName : {
			required : "标签名称不能为空.",
			maxlength:"标签名称最大长度为24"
		},
		tagCategory : {
			required : "标签类型不能为空."
		},
		tagSubCategory : {
			required : "子标签类型不能为空."
		}
	});

	$("#saveBtn").click(function(e) {
		if (!$('#tagCreateForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}

		var tagName = $("#tagName").val();
		var tagCategory = $("#tagCategory").val();
		var tagSubCategory = $("#tagSubCategory").val();
		var h= $("input:radio:checked").val();
		if (Common.isEmpty(tagCategory)) {
			Common.messageBox("提示", "请选择标签类型！", false);
			$("#tagCategory").select2("open");
			return false;
		}
		
		if (Common.isEmpty(tagSubCategory)) {
			Common.messageBox("提示", "请选择子标签类型！", false);
			$("#tagSubCategory").select2("open");
			return false;
		}
		
		$.ajax({
			url : "save",
			type : "post",
			data : {
				tagName : tagName,
				tagCategory : tagCategory,
				tagSubCategory : tagSubCategory,
				hide:h
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.alert("标签添加成功！", true, back);
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
