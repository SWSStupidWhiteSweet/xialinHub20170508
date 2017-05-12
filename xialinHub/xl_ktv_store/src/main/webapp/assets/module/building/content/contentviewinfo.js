$(function(){
	/**
	 * 绑定返回事件
	 */
	$("#backBtn").click(function() {
		back();
	});
	/**
	 * 绑定通过事件
	 */
	$("#agreeBtn").click(function(){
		auditProject('agree');
	});
	/**
	 * 绑定不通过事件
	 */
	$("#noAgreeBtn").click(function(){
		Common.prompt("请输入拒绝理由!","请输入拒绝理由",function(noAgreeRemark){
			auditProject('noAgree',noAgreeRemark);
		});
	});
	//初始化画廊
	$('.ace-thumbnails [data-rel="colorbox"]').colorbox(Common.colorbox_params);
	/**
	 * 审核方法
	 * isUpdateHis		是否连同当前审核这条以前的未审核的一起审核通过，
	 * noAgreeRemark	审核不通过理由
	 */
	function auditProject(audtiType,auditReason){
		var contentId = $("#contentId").val();
		var fingerprint = $("#fingerprint").val();
		$.ajax({
			url : "audit",
			type : "post",
			dataType : "json",
			data : {
				contentId : contentId,
				audtiType : audtiType,
				fingerprint : fingerprint,
				auditReason : auditReason
			},
			success : function(json) {
				if (json.isSuccess) {
					Common.alert(json.msg,true,function(){
						back();
					});
				} else {
					Common.alert(json.msg,false);
				}
			}
		});
	}
	
	/**
	 * 返回方法
	 */
	function back(){
        location.href =  "../buildingproject/modify?buildingProjectId="+$("#buildingProjectId").val()+"&type=contentDiv";
	}
});