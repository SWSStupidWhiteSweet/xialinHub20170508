$(function(){
	
	/**
	 * 搜索按钮
	 */
	$("#searchTransRefNo").click(function(e){
		var tradeRefCode = $("#tradeRefCode").val();
		if(tradeRefCode == null || tradeRefCode == ''){
			window.parent.order.messageBox("提示", "请输入交易参考号！", false);
			return;
		}
		if(tradeRefCode.length !=12){
			window.parent.order.messageBox("提示", "请输入12位交易参考号！", false);
			return;
		}
		
		$.ajax({
			url : path+"/order/gathering/searchtransrefno",
			type : "post",
			data : {
				//ebAccountDetailType:2,
				tradeRefCode:tradeRefCode
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					var trHtml = '<tr>';
					trHtml += '<td class="center">'+json.result.posTerminalCode+'</td>';
					trHtml += '<td class="center">'+json.result.tradeRefCode+'</td>';
					trHtml += '<td class="center">'+json.result.payAccountNumber+'</td>';
					trHtml += '<td class="center">'+json.result.ebAmount+'</td>';
					trHtml += '<td class="center">'+formatDate(new Date(json.result.tradeTime))+'</td>';
					if(json.result.status == 1){
						trHtml += '<td class="center">已付款</td>';
					}else if(json.result.status == 2){
						trHtml += '<td class="center">已撤销</td>';
					}else{
						trHtml += '<td class="center">未知状态</td>';
					}
					if(json.result.agentName){
						trHtml += '<td class="center">'+json.result.agentName+'</td>';
					}else{
						trHtml += '<td class="center">无</td>';
					}
					
					trHtml += '<td class="center"><a href="javascript:void(0);" class="btnA" id="linkBtn" onclick="linkOrder('+json.result.ebAccountDetailId+');">关联订单</a></td>';
					trHtml += '</tr>';
					$("#feadTable tbody").html(trHtml);
				} else {
					$("#feadTable tbody").html("");
					window.parent.order.messageBox("提示", json.msg, false);
				}
			},
			error : function() {
				$("#feadTable tbody").html("");
				window.parent.order.messageBox("提示", Common.SERVER_EXCEPTION, false);
			}
		});
	});
	
	$("#backBtn").click(function(){
		location.href = document.referrer;//返回上一页并刷新
	});
	
	/**
	 * 时间格式化
	 */
	function formatDate(date){     
		var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();     
        var minute = date.getMinutes();     
        var second = date.getSeconds();     
        if(month < 10){
        	month = "0" + month;
        }
        if(day < 10){
        	day = "0" + day;
        }
        if(hour < 10){
        	hour = "0" + hour;
        }
        if(minute < 10){
        	minute = "0" + minute;
        }
        if(second < 10){
        	second = "0" + second;
        }
        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;     
	}
	
})
