$(function(){
	
	/**
	 * 初始化时间控件
	 */
	$('#devSignTime').datepicker({autoclose:true});
	/**
	 * 初始化时间控件
	 */
	$('#onlineSignTime').datepicker({autoclose:true});
	
	//设置上传按钮显示在同一行
	$("#uploadifive-uploadFile").css("display","inline-block");
	
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
	 * 保存
	 */
	$("#saveBtn").click(function(){
		//订单id
		var orderInfoId = $("#orderInfoId").val();
		//开发商签约时间
		var devSignTime = $("#devSignTime").val();
		//网签时间
		var onlineSignTime = $("#onlineSignTime").val();
		//网签总价
		var onlineSignAmount = $("#onlineSignAmount").val();
		//备注
		var remark = $("#remark").val();
		var fingerprint = $("#fingerprint").val();
		
		//订单附件类型(用逗号隔开)
		var orderAttachmentType = $("#orderAttachmentTypeStr").val();
		//附件名称字符串(用逗号隔开)
		var orderAttachmentName = $("#orderAttachmentNameStr").val();
		//附件路径字符串(用逗号隔开)
		var orderAttachmentUrl = $("#orderAttachmentUrlStr").val();
		
		if(null == devSignTime || devSignTime == ''){
			window.parent.order.messageBox("提示", "请填写开发商签约时间！", false);
			return;
		}
		
		if(null == onlineSignAmount || onlineSignAmount == ''){
			window.parent.order.messageBox("提示", "请填写网签总价！", false);
			return;
		}
		
		var numReg = /^\d+(\.\d+)?$/ ; // 金额验证正则
		if(!numReg.test(onlineSignAmount)){
			window.parent.order.messageBox("提示", "请填网签总价,且只能填写数字！", false);
			return;
		}
		
		window.parent.order.confirm("您确定要提交成交审核申请吗？",function(){
			window.parent.order.showMask();
			$.ajax({
				url : "saveonlinesign",
				type : "post",
				data : {
					orderInfoId:orderInfoId,
					devSignTime:devSignTime,
					onlineSignTime:onlineSignTime,
					onlineSignAmount:onlineSignAmount,
					remark:remark,
					fingerprint:fingerprint,
					orderAttachmentType:orderAttachmentType,
					orderAttachmentName:orderAttachmentName,
					orderAttachmentUrl:orderAttachmentUrl
				},
				dataType : "json",
				success : function(json) {
					window.parent.order.hideMask();
					if (json.isSuccess) {
						window.parent.order.alert("修改订单成功！",true,function(){
							location.reload(true);
						});
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
})