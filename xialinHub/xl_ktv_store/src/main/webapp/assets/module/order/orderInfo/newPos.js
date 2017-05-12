$(function(){
	var timer = null ;
	/**
	 * 生成支付订单号
	 */
	$("#createBillCode").click(function(e){
		// 订单id
		var orderInfoId = $("#orderInfoId").val();
		// 应收金额
		var recvAccAmount = $("#recvAccAmount").val();
		// 已收金额
		var realAccAmount = $("#realAccAmount").val();
		// 本次收款金额
		var billMoney = $("#billMoney").val();
		var numReg = /^\d+(\.\d+)?$/; // 金额验证正则
 		if(!numReg.test(billMoney)){
 			window.parent.order.messageBox("提示", "必须输入正确的金额！", false);
			return;
		}
		
		if(billMoney <= 0){
			window.parent.order.messageBox("提示", "输入的金额必须大于零！", false);
			return;
		}
		
		if(parseFloat(billMoney) > parseFloat((recvAccAmount-realAccAmount).toFixed(2))){
			window.parent.order.messageBox("提示", "输入的金额大于未收金额！", false);
			return;
		}
		
		$.ajax({
			url : path+"/order/gathering/createbillno",
			type : "post",
			data : {
				orderInfoId:orderInfoId,
				billMoney:billMoney
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					$("#bill-no").text(json.result.replace(/(.{4})/g,"$1 "));
					// 生成条形码Bar code
					$("#bar-code").attr("src",path+'/order/gathering/createbarcode?orderNo=' + json.result);
					// 生成二维码Qr code
					// $("#qr-code").attr("src",'${path}/order/gathering/createQrCode?orderNo=' + data.billNo);
					//设置金额
					$("#bill-Money").html("金额："+billMoney);
					
					if(timer != null){
						clearInterval(timer);
					}
					timer = setInterval(function(){ 
						scroll_refresh(json.result); 
					}, 5000);
					
				} else {
					window.parent.order.messageBox("提示", json.msg, false);
				}
			},
			error : function() {
				window.parent.order.messageBox("提示", Common.SERVER_EXCEPTION, false);
			}
		});
	});
	
	// 查询流水是否已收，收完后，刷新页面
	function scroll_refresh(billNo){
		var orderInfoId = $("#orderInfoId").val();
		$.ajax({
			url : path+"/order/gathering/checkbill",
			type : "post",
			data : {
				orderInfoId:orderInfoId,
				billNo:billNo
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					window.parent.order.messageBox("提示", json.msg, true);
					location.href = document.referrer;//返回上一页并刷新
				} 
			},
			error : function() {
				window.parent.order.messageBox("提示", Common.SERVER_EXCEPTION, false);
			}
		});
	}
	
	$("#backBtn").click(function(){
		location.href = document.referrer;//返回上一页并刷新
	});
})