$(function(){
	
	/**
	 * 初始化时间控件
	 */
	$('#groupBuyTime').datepicker({autoclose:true});
	
	//设置上传按钮显示在同一行
	$("#uploadifive-uploadFile").css("display","inline-block");
	
	/**
	 * 优惠告知书编号搜索
	 */
	$("#searchCheapCode").click(function(e){
		var cheapCode = $("#cheapCode").val();
		if(cheapCode == null || cheapCode == ''){
			window.parent.order.messageBox("提示", "请输入优惠告知书编号！", false);
			return;
		}
		var orderInfoId = $("#orderInfoId").val();
		window.parent.order.showMask();
		$.ajax({
			url : "searchcheapcode",
			type : "post",
			data : {
				cheapCode:cheapCode,
				orderInfoId:orderInfoId
			},
			dataType : "json",
			success : function(json) {
				window.parent.order.hideMask();
				if (json.isSuccess) {
					$("#search-msg").text(json.result.rsMsg);
					if(json.result.signAtt){
						var msa = json.result.signAtt;
						if(json.result.memberInfo){
							var memberInfo = json.result.memberInfo;
							var trHtml = '<tr>';
							trHtml += '<td class="center">' + memberInfo.memberName + '</td>';
							trHtml += '<td class="center">' + memberInfo.memberTel + '</td>';
							trHtml += '<td class="center">' + memberInfo.memberIdcode + '</td>';
							trHtml += '<td class="center">' + formatDate(new Date(memberInfo.createTime)) + '</td>';
							//trHtml += '<td class="center"><a href="javascript:void(0);" data-addtab="project_view_setting" class="blpc-addtab-btn blpc_btn_s">查看详情</a></td>';
							trHtml += '</tr>';
							$("#member-info-table tbody").html(trHtml);
							
							//设置iframe高度
							var divHeight = $("#memberDiv").outerHeight(true);
							setIframeHeight(divHeight);
							
							$("#memberDiv").show();
						}
					}
				} else {
					window.parent.order.hideMask();
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
	 * 银行转账按钮
	 */
	$("#bankTransfer").click(function(e){
		var orderInfoId = $("#orderInfoId").val();
		location.href = path+"/order/gathering/banktransfer?orderInfoId="+orderInfoId;
	});
	
	/**
	 * 旧pos收款按钮
	 */
	$("#oldPos").click(function(e){
		var orderInfoId = $("#orderInfoId").val();
		location.href = path+"/order/gathering/oldpos?orderInfoId="+orderInfoId;
	});
	
	/**
	 * 新pos收款按钮
	 */
	$("#newPos").click(function(e){
		var orderInfoId = $("#orderInfoId").val();
		location.href = path+"/order/gathering/newpos?orderInfoId="+orderInfoId;
	});
	
	/**
	 * 下一步
	 */
	function nextStep(){
		window.parent.order.nextStep(3);
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
	 * 保存按钮
	 */
	$("#saveBtn").click(function(e){
		//订单id
		var orderInfoId = $("#orderInfoId").val();
		var fingerprint = $("#fingerprint").val();
		//认筹时间
		var groupBuyTime = $("#groupBuyTime").val();
		//优惠告知书编号
		var cheapCode = $("#cheapCode").val();
		
		//订单附件类型(用逗号隔开)
		var orderAttachmentType = $("#orderAttachmentTypeStr").val();
		//附件名称字符串(用逗号隔开)
		var orderAttachmentName = $("#orderAttachmentNameStr").val();
		//附件路径字符串(用逗号隔开)
		var orderAttachmentUrl = $("#orderAttachmentUrlStr").val();
		
		if(groupBuyTime==null || groupBuyTime==''){
			window.parent.order.messageBox("提示", "认筹时间不能为空！", false);
			return false;
		}
		if(cheapCode==null || $.trim(cheapCode)==''){
			window.parent.order.messageBox("提示", "优惠告知书编号不能为空！", false);
			return false;
		}
		if($.trim(cheapCode).length > 24){
			window.parent.order.messageBox("提示", "优惠告知书编号不能超过24位！", false);
			return false;
		}
		window.parent.order.confirm("您确定要保存数据吗？",function(e){
			window.parent.order.showMask();
			$.ajax({
				url : "saveorderagglomeration",
				type : "post",
				data : {
					groupBuyTime:groupBuyTime,
					cheapCode:cheapCode,
					orderInfoId:orderInfoId,
					fingerprint:fingerprint,
					orderAttachmentType:orderAttachmentType,
					orderAttachmentName:orderAttachmentName,
					orderAttachmentUrl:orderAttachmentUrl
				},
				dataType : "json",
				success : function(json) {
					window.parent.order.hideMask();
					if (json.isSuccess) {
						window.parent.orderInfoId = json.result;
						window.parent.order.alert("修改订单成功！",true,nextStep);
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
	
	//设置iframe的高度
	function setIframeHeight(moreHeight){
		var documentHeight = $(document).height();
		window.parent.setDocumentHeight(3,documentHeight+moreHeight+50);
	}
	
})