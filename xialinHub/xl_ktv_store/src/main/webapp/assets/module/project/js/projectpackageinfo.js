$(function() {
	Common.initSelect2("packagelist_packageType", {
		minimumResultsForSearch : Infinity,
		width : "200px"
	});
	Common.initSelect2("packagelist_packageIsStart", {
		minimumResultsForSearch : Infinity,
		width : "200px"
	});
	Common.initSelect2("packagelist_groupFeeChargetype", {
		minimumResultsForSearch : Infinity,
		width : "120px"
	});
	Common.initSelect2("packagelist_groupType", {
		minimumResultsForSearch : Infinity,
		width : "120px"
	});
	Common.initSelect2("packagelist_devReturnType", {
		minimumResultsForSearch : Infinity,
		width : "120px"
	});
	Common.initSelect2("packagelist_commissionFrontType", {
		minimumResultsForSearch : Infinity,
		width : "120px"
	});
	Common.initSelect2("packagelist_commissionBackType", {
		minimumResultsForSearch : Infinity,
		width : "120px"
	});
	
	//电商/非电商选择
	$("#packagelist_packageType").bind("change",function(){
		var packageType = $(this).val();
		$("#groupFeeAllDiv").removeClass("hide");
		$("#devReturnAllDiv").removeClass("hide");
		$("#commissionFrontDiv").removeClass("hide");
		$("#commissionBackDiv").removeClass("hide");
		//非电商
		if(packageType == '1'){
			$("#groupFeeAllDiv").addClass("hide");
			$("#commissionFrontDiv").addClass("hide");
		}
		//电商
		if(packageType == '2'){
			$("#devReturnAllDiv").addClass("hide");
			$("#commissionBackDiv").addClass("hide");
		}
	});
	
	//认筹费类型选择
	$("#packagelist_groupFeeChargetype").bind("change", function(){
		var groupFeeChargetype = $("#packagelist_groupFeeChargetype").val();
		$("#groupFeeDiv").removeClass("hide");
		$("#groupFeePctDiv").removeClass("hide");
		//按金额
		if(groupFeeChargetype == '1'){
			$("#groupFeePctDiv").addClass('hide');
		}
		//按比例
		if(groupFeeChargetype == '2'){
			$("#groupFeeDiv").addClass('hide');
		}
	});
	
	//团购类型选择
	$("#packagelist_groupType").bind("change", function(){
		var groupType = $("#packagelist_groupType").val();
		$("#gruopDeductionDiv").removeClass('hide');
		$("#groupDiscountDiv").removeClass('hide');
		//折扣
		if(groupType == '1'){
			$("#gruopDeductionDiv").addClass('hide');
		}
		//抵扣
		if(groupType == '2'){
			$("#groupDiscountDiv").addClass('hide');
		}
	});
	
	//开发商回款类型
	$("#packagelist_devReturnType").bind("change", function(){
		var devReturnType = $("#packagelist_devReturnType").val();
		$("#devReturnPriceDiv").removeClass('hide');
		$("#devReturnRatioDiv").removeClass('hide');
		//按金额
		if(devReturnType == '1'){
			$("#devReturnRatioDiv").addClass('hide');
		}
		//按比例
		if(devReturnType == '2'){
			$("#devReturnPriceDiv").addClass('hide');
		}
	});
	
	//前佣类型
	$("#packagelist_commissionFrontType").bind("change", function(){
		var commissionFrontType = $("#packagelist_commissionFrontType").val();
		$("#commissionFrontPriceDiv").removeClass('hide');
		$("#commissionFrontRatioDiv").removeClass('hide');
		//按金额
		if(commissionFrontType == '1'){
			$("#commissionFrontRatioDiv").addClass('hide');
		}
		//按比例
		if(commissionFrontType == '2'){
			$("#commissionFrontPriceDiv").addClass('hide');
		}
	});
	
	//后佣类型
	$("#packagelist_commissionBackType").bind("change", function(){
		var commissionBackType = $("#packagelist_commissionBackType").val();
		$("#commissionBackPriceDiv").removeClass('hide');
		$("#commissionBackRatioDiv").removeClass('hide');
		//按金额
		if(commissionBackType == '1'){
			$("#commissionBackRatioDiv").addClass('hide');
		}
		//按比例
		if(commissionBackType == '2'){
			$("#commissionBackPriceDiv").addClass('hide');
		}
	});
	
	//非电商判断
	function packageType1(){
		var devReturnType = $("#packagelist_devReturnType").val();
		var isCommissionBack = $("#packagelist_isCommissionBack").is(":checked") ? 1 : 0;
		var commissionBackType = $("#packagelist_commissionBackType").val();
		
		if(devReturnType == ''){
			Common.messageBox("提示", "请选择回款类型！", false);
			$("#packagelist_devReturnType").select2("open");
			return false;
		}
		if(isCommissionBack == 1){
			if(commissionBackType == ''){
				Common.messageBox("提示", "请选择后佣类型！", false);
				$("#packagelist_commissionBackType").select2("open");
				return false;
			}
		}
	}
	//电商判断
	function packageType2(){
		var groupFeeChargetype = $("#packagelist_groupFeeChargetype").val();
		var groupType = $("#packagelist_groupType").val();
		var isCommissionFront = $("#packagelist_isCommissionFront").is(":checked") ? 1 : 0;
		var commissionFrontType = $("#packagelist_commissionFrontType").val();
		
		if(groupFeeChargetype == ''){
			Common.messageBox("提示", "请选择认筹费类型！", false);
			$("#packagelist_groupFeeChargetype").select2("open");
			return false;
		}
		if(groupType == ''){
			Common.messageBox("提示", "请选择团购类型！", false);
			$("#packagelist_groupType").select2("open");
			return false;
		}
		if(isCommissionFront == 1){
			if(commissionFrontType == ''){
				Common.messageBox("提示", "请选择前佣类型！", false);
				$("#packagelist_commissionFrontType").select2("open");
				return false;
			}
		}
	}
	
	//保存
	$("#packagelist_SaveBtn").click(function(){
		var actionType = $("#actionType").val();
		var url = actionType == "add" ? "save" : "update";
		
		var projectInfoId = $("#projectInfoId").val();
		var projectPackageId = $("#projectPackageId").val();
		
		var projectPackageName = $("#packagelist_projectPackageName").val().trim();
		var packageType = $("#packagelist_packageType").val();
		var packageIsStart = $("#packagelist_packageIsStart").val();
		
		var groupFeeChargetype = $("#packagelist_groupFeeChargetype").val();
		var groupFee = $("#packagelist_groupFee").val();
		var groupFeePct = $("#packagelist_groupFeePct").val();
		
		var groupType = $("#packagelist_groupType").val();
		var gruopDeduction = $("#packagelist_gruopDeduction").val();
		var groupDiscount = $("#packagelist_groupDiscount").val();
		
		var devReturnType = $("#packagelist_devReturnType").val();
		var devReturnPrice = $("#packagelist_devReturnPrice").val();
		var devReturnRatio = $("#packagelist_devReturnRatio").val();
		
		var isCommissionFront = $("#packagelist_isCommissionFront").is(":checked") ? 1 : 0;
		var commissionFrontType = $("#packagelist_commissionFrontType").val();
		var commissionFrontPrice = $("#packagelist_commissionFrontPrice").val();
		var commissionFrontRatio = $("#packagelist_commissionFrontRatio").val();
		var commissionFrontDiff = $("#packagelist_commissionFrontDiff").val();
		var isCommissionBack = $("#packagelist_isCommissionBack").is(":checked") ? 1 : 0;
		var commissionBackType = $("#packagelist_commissionBackType").val();
		var commissionBackPrice = $("#packagelist_commissionBackPrice").val();
		var commissionBackRatio = $("#packagelist_commissionBackRatio").val();
		var commissionBackDiff = $("#packagelist_commissionBackDiff").val();
		var startDate = $("#packagelist_startDate").val();
		var endDate = $("#packagelist_endDate").val();
		var content = $("#packagelist_content").val();
		var packageHouseStr = getPackageHouseStr();
		
		if(Common.isEmpty(projectInfoId)){
			Common.messageBox("提示", "请先添加项目信息！", false);
			return false;
		}
		
		if(Common.isEmpty(projectPackageName)){
			Common.messageBox("提示", "套餐名称不能为空！", false);
			$("#packagelist_projectPackageName").focus();
			return false;
		}
		if(Common.isEmpty(packageType)){
			Common.messageBox("提示", "请选择套餐类型！", false);
			$("#packagelist_packageType").select2("open");
			return false;
		}		
		if(Common.isEmpty(startDate)){
			Common.messageBox("提示", "请选择开始日期！", false);
			$("#packagelist_startDate").select2("open");
			return false;
		}
		if(Common.isEmpty(endDate)){
			Common.messageBox("提示", "请选择结束日期！", false);
			$("#packagelist_endDate").select2("open");
			return false;
		}
		if(startDate > endDate) { 
    		Common.messageBox("提示", "开始日期 必须早于结束日期！", false);
	    	return false;
    	}
		//非电商判断
		if(packageType == '1'){
			packageType1();
		}
		//电商判断
		if(packageType == '2'){
			packageType2();
		}
		//电商+非电商
		if(packageType == '3'){
			packageType1();
			packageType2();
		}
		Common.showMask("请稍候......");
		$.ajax({
			url : url,
			type : "post",
			data : {
				projectInfoId : projectInfoId,
				projectPackageId : projectPackageId,
				projectPackageName : projectPackageName,
				packageType : packageType,
				isStart : packageIsStart,
				groupFeeChargetype : groupFeeChargetype,
				groupFee : groupFee,
				groupFeePct : groupFeePct,
				groupType : groupType,
				gruopDeduction : gruopDeduction,
				groupDiscount : groupDiscount,
				devReturnType : devReturnType,
				devReturnPrice : devReturnPrice,
				devReturnRatio : devReturnRatio,
				isCommissionFront : isCommissionFront,
				commissionFrontType : commissionFrontType,
				commissionFrontPrice : commissionFrontPrice,
				commissionFrontRatio : commissionFrontRatio,
				commissionFrontDiff : commissionFrontDiff,
				isCommissionBack : isCommissionBack,
				commissionBackType : commissionBackType,
				commissionBackPrice : commissionBackPrice,
				commissionBackRatio : commissionBackRatio,
				commissionBackDiff : commissionBackDiff,
				startDate : startDate,
				endDate : endDate,
				content : content,
				packageHouseStr : packageHouseStr
			},
			dataType : "json",
			success : function(json){
				Common.hideMask();
				if (json.isSuccess) {
					Common.alert("保存成功，请等待审核！", true, function(){
						location.href="../info/skipPage?projectInfoId="+projectInfoId+"&tabId=projectpackage";
					});
				} else {
					Common.messageBox("提示", json.msg, false);
				}
			},
			error : function(){
				Common.hideMask();
				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
			}
		});
	});
	
	//获取套餐的合作户型
	function getPackageHouseStr(){
		var projectPackageId =$("#projectPackageId").val();
		var phuList = '[';
		$("#projectHouseUnionImg li").each(function(){
			var houseId = $(this).attr("id").replace("li","");
			if($("#chkUnionHouse"+houseId).is(":checked")){
				var houseUnionId = $("#chkUnionHouse"+houseId).val();
				var phu = '{houseId:'+houseId+",houseUnionId:"+houseUnionId+"},";
				phuList+=phu;
			}
		});
		phuList = phuList.length>1 ? phuList.substring(0,phuList.length-1) : phuList;
		phuList+=']';
		return phuList;
	}
	
	//取消
	$("#packagelist_BackBtn").click(function(){
//		var projectInfoId = $("#projectInfoId").val();
//		location.href = "../info/skipPage?projectInfoId=" + projectInfoId +"&tabId=projectpackage";
		history.go(-1);
	});
});