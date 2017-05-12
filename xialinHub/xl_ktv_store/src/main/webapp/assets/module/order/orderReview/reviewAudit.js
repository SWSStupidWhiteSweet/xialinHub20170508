$(function(){
	
	/**
	 * 通过
	 */
	$("#pass").click(function(){
		audit(1);
	});
	
	/**
	 * 不通过
	 */
	$("#notPass").click(function(){
		audit(2);
	});
	
	/**
	 * 审核操作
	 */
	function audit(auditStatus){
		var auditOpinion = $("#auditOpinion").val();
		if(Common.isEmpty(auditOpinion)){
			Common.messageBox("提示","请填写审核意见！",false);
			return false;
		}
		var orderInfoId = $("#orderInfoId").val();
		
		Common.confirm("您确定要执行此操作吗？",function(e){
			$("#pass").attr("disabled","disabled");
			$("#notPass").attr("disabled","disabled");
			Common.showMask("处理中...");
    		$.ajax({
    			url : path+"/orderreview/audit",
    			type : "post",
    			data : {
    				orderInfoId:orderInfoId,
    				auditStatus:auditStatus,
    				auditOpinion:auditOpinion
    			},
    			dataType : "json",
    			success : function(json) {
    				Common.hideMask();
    				if (json.isSuccess) {
						Common.alert("操作成功",true,function(){
							var url = path + "/orderreview/orderreviewindex";
							location.href = url;
						 });
    					
    				} else {
    					Common.messageBox("提示", json.msg, false);
    				}
    			},
    			error : function() {
    				Common.hideMask();
    				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
    			}
    		});
		});
	}
})