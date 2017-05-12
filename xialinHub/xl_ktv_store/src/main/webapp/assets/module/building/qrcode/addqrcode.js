$(function() {
	Common.initSelect2("provinceId", {
		width : "50%"
	});
	Common.initSelect2("cityId", {
		width : "50%"
	});
	Common.initSelect2("buildingProjectId", {
		width : "50%"
	});
	Common.initSelect2("qrcodeType", {
		width : "50%"
	});

	$("#backBtn").click(function() {
		back();
	});

	/**
	 * 保存
	 */
	$("#saveBtn").click(function(e) {

		// 获取页面数据
		var qrcodeType = $("#qrcodeType").val();
		var provinceId = $("#provinceId").val();
		var cityId = $("#cityId").html();
		var buildingProjectId = $("#buildingProjectId").val();

		// 验证下来选
		if (!qrcodeType) {
			Common.messageBox("提示", "请选择二维码性质！", false);
			$("#qrcodeType").select2("open");
			return false;
		}
		if (!provinceId) {
			Common.messageBox("提示", "请选择省！", false);
			$("#provinceId").select2("open");
			return false;
		}
		if (!cityId) {
			Common.messageBox("提示", "请选择城市！", false);
			$("#cityId").select2("open");
			return false;
		}
		if (!buildingProjectId) {
			Common.messageBox("提示", "请选择楼盘！", false);
			$("#buildingProjectId").select2("open");
			return false;
		}

		// 交互
		$.ajax({
			url : "create",
			type : "post",
			data : {
				buildingProjectId : buildingProjectId,
				qrcodeType : qrcodeType,
				provinceId : provinceId,
				cityId : cityId,
				busiType : 1,
				expired : 30
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
	});

	function back() {
		location.href = "index";
	}
});