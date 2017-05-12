$(function(){
	/**
	 * 初始化时间控件
	 */
	$('#tradeTime').datepicker({autoclose:true});
	
	/**
	 * 保存按钮
	 */
	$("#saveTradeInfo").click(function(e){
		// 应收金额
		var recvAccAmount = $("#recvAccAmount").val();
		// 已收金额
		var realAccAmount = $("#realAccAmount").val();
		// 本次填写的收款金额
		var ebAmount = $("#ebAmount").val();
		//收款时间
		var tradeTime = $("#tradeTime").val();
		//转账支行
		var payBankName = $("#payBankName").val();
		//持卡人姓名
		var payAccountName = $("#payAccountName").val();
		//银行账号
		var payAccountNumber = $("#payAccountNumber").val();
		//订单号
		var orderInfoId = $("#orderInfoId").val();
		
		if(!Common.checkRate(ebAmount)){
			window.parent.order.messageBox("提示", "输入的金额只能是数字！", false);
			return false;
		}
		if(ebAmount <= 0){
			window.parent.order.messageBox("提示", "输入的金额必须大于零！", false);
			return false;
		}
		
		if(parseFloat(ebAmount) > parseFloat((recvAccAmount-realAccAmount).toFixed(2))){
			window.parent.order.messageBox("提示", "输入的金额大于未收金额！", false);
			return false;
		}
		
		if(tradeTime == ''){
			window.parent.order.messageBox("提示", "选择收款时间！", false);
			return false;
		}
		
		
		if(payBankName == ''){
			window.parent.order.messageBox("提示", "转账支行不能为空！", false);
			return false;
		}
		
		if(payAccountNumber == ''){
			window.parent.order.messageBox("提示", "银行账号不能为空！", false);
			return false;
		}
		
		if(!new RegExp("^[0-9]*$").test($("#payAccountNumber").val())){
			window.parent.order.messageBox("提示", "请填正确银行账号！", false);
			return false;
		}
		window.parent.order.confirm("您确定要保存数据吗？",function(e){
			window.parent.order.showMask();
    		$.ajax({
    			url : path+"/order/gathering/savebanktransfer",
    			type : "post",
    			data : {
    				orderInfoId:orderInfoId,
    				ebAmount:ebAmount,
    				tradeTime:tradeTime,
    				payBankName:payBankName,
    				payAccountName:payAccountName,
    				payAccountNumber:payAccountNumber
    			},
    			dataType : "json",
    			success : function(json) {
    				window.parent.order.hideMask();
    				if (json.isSuccess) {
    					location.href = document.referrer;//返回上一页并刷新
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
	});
	
	$("#backBtn").click(function(){
			location.href = document.referrer;//返回上一页并刷新
	});
})