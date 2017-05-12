$(function() {
	Common.formValidate("companyForm", {
		companyName : {
			required : true,
			maxlength : 40
		}
	}, {
		companyName : {
			required : "总公司名称不能为空.",
			maxlength : "总公司名称不能超过40个汉字."
		}
	});
	
	$("#saveBtn").click(function(e) {
		if (!$('#companyForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}

		var actionType = $("#actionType").val();
		var url = actionType == "add" ? "create" : "update";

		var companyId = $("#companyId").val();
		var parentId = $("#parentId").val();
		var companyName = $("#companyName").val();
		var provinceId = $("#province").val();
		var provinceName = $("#province").select2("data").text;
		var cityId = $("#city").val();
		var cityName = $("#city").select2("data").text;
		
		if (Common.isEmpty(provinceId)) {
			Common.messageBox("提示", "请选择所属省！", false);
			$("#province").select2("open");
			return false;
		}
		
		if (Common.isEmpty(cityId)) {
			Common.messageBox("提示", "请选择所属市！", false);
			$("#city").select2("open");
			return false;
		}
		
		$.ajax({
			url : url,
			type : "post",
			data : {
				parentId : parentId,
				companyName : companyName,
				provinceId : provinceId,
				provinceName : provinceName,
				cityId : cityId,
				cityName : cityName,
				companyId : companyId
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.alert("公司保存成功！", true, back);
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
		location.href = "companyindex";
	}
	
	Common.initSelect2("province", {
		width : "200px"
	});
	
	Common.initSelect2("city", {
		width : "200px"
	});
});