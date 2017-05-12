$(function($) {
	
	/**
	 * 初始化套餐状态下拉框
	 */
//	Common.initSelect2("isStart", {
//		allowClear : true,
//		minimumResultsForSearch : Infinity,
//		width : "200px"
//	});
	
	/**
	 * 套餐查询
	 */
	$("#searchPackageInfo").click(function(e){
		var orderInfoId = $("#orderInfoId").val();
		var isStart = $("#isStart option:selected").val();
		var url = path+"/orderinfo/choosepackage?orderInfoId="+orderInfoId+"&actionType="+actionType+"&isStart="+isStart;
		window.location.href = url;
	});
	
	/**
	 * 下一步
	 */
	function nextStep(){
		window.parent.order.nextStep(2);
	}
	
	/**
	 * 返回
	 */
	$("#backBtn").click(function(){
		window.parent.order.confirm("您确认要执行取消操作吗？",function(){
			var url = path + "/orderinfo/orderinfoindex";
			window.parent.location.href = url;
		});
	});
	
	/**
	 * 保存套餐信息
	 */
	$("#savePackageBtn").click(function(e){
		
		var chk_value =[];
		$("input[name='package']:checked").each(function(){ 
			chk_value.push($(this).val());
		});
		
		var currentPackageId = $("#currentPackage").val();
		if(!Common.isEmpty(currentPackageId) && chk_value.length==0){
			window.parent.orderInfoId = $("#orderInfoId").val();
			window.parent.order.alert("套餐保存成功！", true, nextStep);
			return;
		}
		
   		if(chk_value.length==0) {
   			window.parent.order.messageBox("提示", "请选择套餐！", false);
   			return false;
   		}
   		if(chk_value.length>1) {
   			window.parent.order.messageBox("提示", "只能选择一个套餐！", false);
   			return false;
   		}
   		
   		var orderInfoId = $("#orderInfoId").val();
   		var projectPackageId = chk_value[0];
   		var groupFeeChargetype = $("#groupFeeChargetype"+projectPackageId).val();
   		var beforeTotalAmount = $("#beforeTotalAmount").val();
   		var groupFee = $("#groupFee"+projectPackageId).val();
   		
   		window.parent.order.showMask();
   		$.ajax({
			url : "saveorderpackageinfo",
			type : "post",
			data : {
				projectPackageId: projectPackageId,
				orderInfoId: orderInfoId, 
				groupFee: groupFee,
				groupFeeChargetype: groupFeeChargetype, 
				beforeTotalAmount: beforeTotalAmount
			},
			dataType : "json",
			success : function(json) {
				window.parent.order.hideMask();
				if (json.isSuccess) {
					window.parent.orderInfoId = json.result;
					window.parent.order.alert("套餐保存成功！", true, nextStep);
				} else {
					window.parent.order.messageBox("提示", json.msg, false);
				}
			},
			error : function() {
				window.parent.order.hideMask();
				window.parent.order.messageBox("提示", Common.SERVER_EXCEPTION, false);
			}
		});
	});
	
	/**
	 * 计算电商费
	 */
	$("#beforeTotalAmount").blur(function(){
    	var totalAmount = $(this).val();
    	var pkId = $("#pkIdTmp").val();
    	var groupFeePct = $("#groupFeePct"+pkId).val();
    	var ys = Math.round(accMul(totalAmount,accDiv(groupFeePct,100)));
    	$("#groupFee"+pkId).val(ys);
    	$("#spanRecvAccAmount").html(ys+" 元");
   	});
    
	/**
	 * 套餐点击事件
	 */
	$("input[type=radio]").click(function(e){
		var id_ = $(this).val();
    	if($("#groupFeeChargetype"+id_).val() ==2) {
    		$("#pkIdTmp").val(id_);
    		$("#showBeforeTotalAmountDiv").show();
    	} else {
    		$("#beforeTotalAmount").val("");
    		$("#spanRecvAccAmount").html("0 元");
    		$("#showBeforeTotalAmountDiv").hide();
    	}
	});
    
    //除法
    function accDiv(arg1,arg2){ 
    	var t1=0,t2=0,r1,r2; 
    	try{t1=arg1.toString().split(".")[1].length}catch(e){} 
    	try{t2=arg2.toString().split(".")[1].length}catch(e){} 
    	with(Math){ 
    		r1=Number(arg1.toString().replace(".","")) 
    		r2=Number(arg2.toString().replace(".",""))
    		return accMul((r1/r2),pow(10,t2-t1)); 
        } 
    } 
    // 乘法
    function accMul(arg1,arg2) 
    { 
    	var m=0,s1=arg1.toString(),s2=arg2.toString(); 
    	try{m+=s1.split(".")[1].length}catch(e){} 
    	try{m+=s2.split(".")[1].length}catch(e){} 
    	return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
    }
})