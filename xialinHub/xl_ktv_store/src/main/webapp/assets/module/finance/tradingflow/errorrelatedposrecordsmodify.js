$(function($) {
	// 初使化combo
	Common.initSelect2("province_id", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	Common.initSelect2("city_id", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	Common.initSelect2("buiding", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	Common.initSelect2("project_info_id", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "150px"
	});
	
	
	
	/** **************************************按钮事件 start *************************************** */

	/**
	 * 保存
	 */
	$("#saveBtn").click(function(){
		var project_info_id = $("#project_info_id").val();
		var eb_account_detail_id = $("#eb_account_detail_id").val();
		if(project_info_id == null || project_info_id == ""){
			Common.messageBox("提示", "请选择项目！", false);
			return false;
		}
		$.ajax({
			url : "errorrelatedposrecordsmodifysave",
			type : "post",
			dataType : "json",
			data : {
				project_info_id : project_info_id,
				eb_account_detail_id : eb_account_detail_id
			},
			success : function(json){
				if (json.isSuccess) {
					Common.alert("修改项目成功！", true,back);
				} else {
					Common.messageBox("提示", json.msg, false);
				}
			},
			error : function(){
				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
			}
		});
	});
	
	/**
	 * 返回 
	 */
	$("#backBtn").click(function() {
		back();
	});
	
	function back(){
		location.href = "index?activeTab=4";
	}

	/** **************************************按钮事件 end *************************************** */
});