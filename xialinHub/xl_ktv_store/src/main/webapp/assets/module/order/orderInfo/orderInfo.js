$(function($) {
		
	/**
	 * 初始化组件
	 */
	$('#fuelux-wizard-container')
	.ace_wizard({
		//step: 2 //optional argument. wizard will jump to step "2" at first
		//buttons: '.wizard-actions:eq(0)'
	})
	.on('actionclicked.fu.wizard' , function(e, info){
		//console.info(info);
	})
	.on('finished.fu.wizard', function(e) {
		bootbox.dialog({
			message: "Thank you! Your information was successfully saved!", 
			buttons: {
				"success" : {
					"label" : "OK",
					"className" : "btn-sm btn-primary"
				}
			}
		});
	}).on('stepclick.fu.wizard', function(e){
		//e.preventDefault();//this will prevent clicking and selecting steps
	}).on('mouseover.fu.wizard',function(e){
		
	});

	//组件对象
//	var orderWizard = $('#fuelux-wizard-container').data('fu.wizard')
//	function nextStep(){
//		//调用组件的"下一步"事件
//		orderWizard.next();
//	}
	
	//jump to a step
	/**
	var wizard = $('#fuelux-wizard-container').data('fu.wizard')
	wizard.currentStep = 3;
	wizard.setState();
	*/

	//determine selected step
	//wizard.selectedItem().step

	var isCurrent = false;
	/**
	 * 设置点击事件
	 */
	$(".steps > li").bind("click",function(e){
		var index = $(this).index();
        var iframeNo = index+1;
        loadIframe(iframeNo);
//        isCurrent = true;
//        $(".steps > li").addClass("complete").siblings().removeClass("complete");
//        $(this).addClass("complete");
        
	});
	
	$("#step1").trigger("click");
	/**
	 * 设置鼠标移入事件
	 */
	$(".steps > li").bind("mouseover",function(e){
		$(this).css("cursor","pointer");
		if($(this).hasClass("active")){
			isCurrent = true;
		}else{
			isCurrent = false;
			$(this).addClass("active");
		}
	});
	/**
	 * 设置鼠标移出事件
	 */
	$(".steps > li").bind("mouseout",function(e){
		/**if($(this).parent().prev() && $(this).parent().prev().hasClass("complete")){
			return;
		}else{
			if(!isCurrent){
				$(this).parent().removeClass("active");
			}
		}*/
		if(!isCurrent){
			$(this).removeClass("active");
		}
	});
	
	/**
	 * 设置高度
	 */
//	var documentHeight = $(document).height();
//	var headerHeight = $(".page-header").outerHeight(true);
//	var ulDivHeight = $(".ulDiv").outerHeight(true);
//	$(".step-pane").height(documentHeight - headerHeight - ulDivHeight-160);
	
	/**
	 * 下一步
	 */
	order.nextStep = function(index){
		$(".steps > li:eq("+index+")").click();
	}
	//消息提示框
	order.messageBox = function(title, msg, isSuccess, hideTime){
		Common.messageBox(title, msg, isSuccess, hideTime);
	}
	order.alert = function(msg, isSuccess, fn){
		Common.alert(msg, isSuccess, fn);
	}
	
	//确认提示框
	order.confirm = function(msg, fn){
		Common.confirm(msg, fn);
	}
	
	/**
	 * 加载遮罩层
	 */
	order.showMask = function(){
		Common.showMask("处理中...");
	}
	
	/**
	 * 去掉遮罩层
	 */
	order.hideMask = function(){
		Common.hideMask();
	}
	
	function loadIframe(iframeNo) {
		$.ajax({
			url : path+"/orderinfo/ajaxgetorderinfo",
			async: false,
			type : "post",
			data : {
				orderInfoId:orderInfoId
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					var data = json.result;
					var info = setLoadIframe(iframeNo,data.orderInfoId,data.orderStatus,data.recvAccAmount,data.ebStatus,data.projectPackageId,data.packageType,data.cheapCode);
					_loadIframe(iframeNo,info);
				} else {
					Common.messageBox("提示", json.msg, false);
				}
			},
			error : function() {
				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
			}
		});
    	
    	
    }
	
	function setLoadIframe(iframeNo,orderInfoId,orderStatus,recvAccAmount,ebStatus,packageId,packageType, cheapCode){
    	var info='';
    	if(orderInfoId == null || orderInfoId==''|| orderInfoId == 0){
    		$("#step2").attr("isCanClick","false");
    		$("#step3").attr("isCanClick","false");
			$("#step4").attr("isCanClick","false");
			$("#step5").attr("isCanClick","false");
    		return "录入订单，请先录入到访信息";
    	}
    	
    	//套餐类型,1非电商，2电商，3电商+非电商
    	if(packageId == null || packageId==''|| packageId==0){
    		$("#step1").attr("isCanClick","true");
    		$("#step2").attr("isCanClick","true");
			$("#step3").attr("isCanClick","false");
			$("#step4").attr("isCanClick","true");
			$("#step5").attr("isCanClick","false");
			if(iframeNo == 5){
				info = '没有选择套餐,不允许录入签约信息';
			}else{
				info = '没有选择套餐,不允许录入认筹信息';
			}
			
    	}else{
    		
    		if(packageType != 1 && (cheapCode == null || cheapCode == '') ){
        		$("#step1").attr("isCanClick","true");
        		$("#step2").attr("isCanClick","true");
    			$("#step3").attr("isCanClick","true");
    			$("#step4").attr("isCanClick","true");
    			$("#step5").attr("isCanClick","false");
    			return "请填写优惠告知书之后再转签约状态";
        	}
    		
    		if(packageType == 1 ){//没有认筹
    			$("#step1").attr("isCanClick","true");
        		$("#step2").attr("isCanClick","true");
    			$("#step3").attr("isCanClick","false");
    			$("#step3").hide();
    			$("#step4").attr("isCanClick","true");
    			$("#step5").attr("isCanClick","true");
    		}else{
    			$("#step1").attr("isCanClick","true");
        		$("#step2").attr("isCanClick","true");
    			$("#step3").attr("isCanClick","true");
    			$("#step3").show();
    			$("#step4").attr("isCanClick","true");
    			$("#step5").attr("isCanClick","true");
    		}
    		if(orderStatus == 1){//到访
    			$("#step2").attr("isCanClick","true");
    			$("#step3").attr("isCanClick","true");
    			$("#step4").attr("isCanClick","true");
    			$("#step5").attr("isCanClick","false");
    			info = '到访订单,不允许录入签约信息,请先录入完认购信息';
    		}else if(orderStatus == 2 && packageType!=1){//认筹
    			$("#step3").attr("isCanClick","true");
    			$("#step3").show();
    			$("#step4").attr("isCanClick","true");
        		$("#step5").attr("isCanClick","false");
        		info = '非认购,不允许录入签约信息';
        	}else if(orderStatus == 3){//认购
        		$("#step4").attr("isCanClick","true");
        		if(packageType==1){
        			$("#step5").attr("isCanClick","true");
        		}else{
        			if(recvAccAmount > 0 && ebStatus == 3){
        				$("#step5").attr("isCanClick","true");
        			}else{
        				$("#step5").attr("isCanClick","false");
        				info = '认筹费未收齐,不允许录入签约信息';
        			}
        		}
        	}else if(orderStatus == 4){//签约待审
        	}else if(orderStatus == 5){//成交有效
        	}else if(orderStatus == 6){//退款
        		//$("#step4").attr("isCanClick","false");
        		//$("#step5").attr("isCanClick","false");
        	}else if(orderStatus == 7){//退房
        	}else if(orderStatus == 8){//退款且退房
        	}else{
        		
        	}
    		
    	}
    	return info;
    }
	
	function _loadIframe(iframeNo,info) {
    	if($("#step"+iframeNo).attr("isCanClick") == 'false'){
    		if(iframeNo !=1){
    			Common.messageBox("提示", info, false);
    			
    			if($("#step"+iframeNo).hasClass("complete")){
    				iframeNo = iframeNo-1;
    				$("#step"+iframeNo).trigger("click");
    			}
    		}
    		return;	
    	}
    	
    	isCurrent = true;
    	$(".steps > li").addClass("complete").siblings().removeClass("complete");
    	$("#step"+iframeNo).addClass("complete");
        
    	if(iframeNo==1){
   			$("#editOrderTab"+iframeNo).attr("src", 
   					path+"/orderinfo/ordervisitinfo?orderInfoId="+orderInfoId+"&actionType="+actionType);
		} else if(iframeNo==2){
			$("#editOrderTab"+iframeNo).attr("src", 
					path+"/orderinfo/choosepackage?orderInfoId="+orderInfoId+"&actionType="+actionType);
		} else if(iframeNo==3){
			$("#editOrderTab"+iframeNo).attr("src", 
					path+"/orderinfo/orderagglomeration?orderInfoId="+orderInfoId+"&actionType="+actionType);
		} else if(iframeNo==4){
			$("#editOrderTab"+iframeNo).attr("src", 
					path+"/orderinfo/ordersubscription?orderInfoId="+orderInfoId+"&actionType="+actionType);
		} else if(iframeNo==5){
			$("#editOrderTab"+iframeNo).attr("src", 
					path+"/orderinfo/orderonlinesign?orderInfoId="+orderInfoId+"&actionType="+actionType);
		}
    	
    	/*$(".steps > li").addClass("active").siblings().removeClass("active");
    	$("#li"+iframeNo).addClass("active");
    	$(".project-tab > div").eq(iframeNo-1).show().siblings().hide();
    	var index =iframeNo -1;
    	 if(index==0){
             $("#begin").show();
             $("#advance1").hide();
             $("#advance2").hide();
             $("#end").hide();
         }else if(index==1){
             $("#begin").hide();
             $("#advance1").show();
             $("#advance2").hide();
             $("#end").hide();
         }else if(index==2){
             $("#begin").hide();
             $("#advance1").hide();
             $("#advance2").show();
             $("#end").hide();
         }else if(index==3){
             $("#begin").hide();
             $("#advance1").hide();
             $("#advance2").show();
             $("#end").hide();
         }else if(index==4){
             $("#begin").hide();
             $("#advance1").hide();
             $("#advance2").hide();
             $("#end").show();
         }*/
    }
	
})