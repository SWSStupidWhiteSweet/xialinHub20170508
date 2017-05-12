$(function($) {
	$("#backBtn").click(function() {
		close();
	});
	$("#passBtn").click(function() {
		auditApply('1');
	});
	$("#noPassBtn").click(function() {
		auditApply('2');
	});
});
// 关闭页面
function close(){
	location.href ="index";
}
function auditApply(auditStatue){
	var opinion = $("#opinion").val();
	if(opinion==""){
		 Common.messageBox("提示", "请填写审批意见！！", false);
		return false;
	}
	var vacationfingerprint=$("#vacationfingerprint").val();
	var orderVacationApplyId=$("#orderVacationApplyId").val();
	var fingerprint=$("#fingerprint").val();
	var orderInfoId=$("#orderInfoId").val();
	$.ajax({
		url : "audit",
		type : "post",
		data : {
			auditStatue:auditStatue,
			opinion:opinion,
			orderInfoId:orderInfoId,
			fingerprint:fingerprint,
			orderVacationApplyId:orderVacationApplyId,
			vacationfingerprint:vacationfingerprint
		},
		dataType : "json",
		success : function(json) {
			if(json.isSuccess==true){
				 Common.messageBox("提示", json.msg, false);
				 location.href ="index";
			}
		},
		error : function() {
			 Common.messageBox("提示", "审批失败，请稍候再试！！", false);
			// location.href ="getvacationauditgrid?auditStatus=0&rows=15&page=1&sort=create_time&order=desc";
		}
	});
}