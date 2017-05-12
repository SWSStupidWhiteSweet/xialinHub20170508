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
	$("#groupType").bind("change", function(){
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
	//点击返回
    $("#packagelist_backBtn").click(function(){
//    	var data=$("#projectInfoId").val();
//    	location.href = "../info/skipPage?projectInfoId=" + data+"&tabId=projectpackage";
    	history.go(-1);
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

});
	

