$(function($) {
	/**
	 * 绑定返回事件
	 */
	$("#backBtn").click(function() {
		back();
	});
	/**
	 * 绑定通过事件
	 */
	$("#agree").click(function(){
		var historyTotal = $("#historyTotal").val();
		if(historyTotal>0){
			Common.confirm("确定要审核当前数据，并且将之前的未审核数据置为不通过吗？",function(){
				auditProject('agree','yes','系统默认审核');
			});
		}else{
			auditProject('agree','no');
		}
	});
	/**
	 * 绑定不通过事件
	 */
	$("#noAgree").click(function(){
		Common.prompt("请输入拒绝理由!","请输入拒绝理由",function(noAgreeRemark){
			auditProject('noAgree','no',noAgreeRemark);
		});
	});
	/**
	 * 审核方法
	 * isUpdateHis		是否连同当前审核这条以前的未审核的一起审核通过，
	 * noAgreeRemark	审核不通过理由
	 */
	function auditProject(type,isUpdateHis,noAgreeRemark){
		var buildingProjectLogId = $("#buildingProjectLogId").val();
		$.ajax({
			url : "audit",
			type : "post",
			dataType : "json",
			data : {
				buildingProjectLogId : buildingProjectLogId,
				type : type,
				isUpdateHis : isUpdateHis,
				noAgreeRemark : noAgreeRemark
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
	function back(){
		location.href = "buildingprojectindex?type=projectLogInfo";
	}
});