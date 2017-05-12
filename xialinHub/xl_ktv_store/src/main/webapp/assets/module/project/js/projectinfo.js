$(function() {
	//预加载图片选择事件
	addProjectHouseUnion();
	Common.formValidate("projectForm", {
		info_projectInfoName : {
			required : true
		},
		info_cooperationStart : {
			required : true
		},
		info_cooperationEnd : {
			required : true
		},
		info_saleEndDate : {
			required : true
		},
		info_contacts : {
			required : true
		},
		info_contactsTel : {
			required : true
		},
		info_startCode : {
			required : true
		},
		info_endCode : {
			required : true
		},
		info_developerRule : {
			required : true
		},
		info_commissionRule : {
			required : true
		},
		info_settlementHours : {
			required : true
		},
		info_contactsTel : {
			required : true,
			minlength : 8,
			maxlength : 11
		}
	}, {
		info_projectInfoName : {
			required : "项目名称不能为空。"
		},
		info_cooperationStart : {
			required : "项目合作开始日期不能为空。"
		},
		info_cooperationEnd : {
			required : "项目合作结束日期不能为空。"
		},
		info_saleEndDate : {
			required : "认购截止日期不能为空。"
		},
		info_contacts : {
			required : "现场联系人不能为空。"
		},
		info_contactsTel : {
			required : "现场联系人联系方式不能为空。"
		},
		info_startCode : {
			required : "优惠告知书编号（起）不能为空。" 
		},
		info_endCode : {
			required : "优惠告知书编号（止）不能为空。"
		},
		info_developerRule : {
			required : "开发商界定规则不能为空。"
		},
		info_commissionRule : {
			required : "帮客佣金规则不能为空。"
		},
		info_settlementHours : {
			required : "帮客结佣周期不能为空。"
		},
		info_contactsTel : {
			required : "联系电话不能为空.",
			minlength : "联系电话至少8位.",
			maxlength : "联系电话不能超过11位."
		}
	});
	
	Common.initSelect2("info_province", {
		minimumResultsForSearch : Infinity,
		width : "200px"
	});
	
	Common.initSelect2("info_city", {
		minimumResultsForSearch : Infinity,
		width : "200px"
	});
	
	Common.initSelect2("info_buildingProject",{
		minimumResultsForSearch : Infinity,
		width : "200px"
	});
	
	Common.initSelect2("info_disp",{
		minimumResultsForSearch : Infinity,
		width : "200px"
	});
	
	$("#info_backBtn").click(back);
	
	$("#info_saveBtn").click(function(e){
		var actionType = $("#actionType").val();
		var url = actionType == "add" ? "save" : "update";
		var projectInfoId = $("#projectInfoId").val();
		var provinceId=$("#info_province").val();
		var provinceName = $("#info_province").find("option:selected").text();
		var cityId=$("#info_city").val();
		var cityName = $("#info_city").find("option:selected").text();
		var buildingProjectId = $("#info_buildingProject").val();
		var buildingProjectName = $("#info_buildingProject").find("option:selected").text();
		var disp = $("#info_disp").val();
		var cooperationStart=$("#info_cooperationStart").val();    
		var cooperationEnd = $("#info_cooperationEnd").val();    
		var saleEndDate=$("#info_saleEndDate").val();
    	var merchantId = $("#info_merchantId").val();
    	var merchantName = $("#info_merchantName").val();
    	var address = $("#info_address").val();
    	var projectInfoName = $("#info_projectInfoName").val();
    	var projectManager = $("input[name='info_projectManager']:checked").val();
    	var projectManagerAssistant = "";
    	$("input[name='info_projectManagerAssistant']").each(function(){
    		projectManagerAssistant += $(this).is(':checked') ? $(this).val()+"," : "";
    	});
    	
    	projectManagerAssistant = projectManagerAssistant.length>0 ? projectManagerAssistant.substring(0,projectManagerAssistant.length-1) : '';
    	var contacts = $("#info_contacts").val();
    	var contactsTel = $("#info_contactsTel").val();
    	var contractAttachmentId = $("#info_contractAttachmentId").val();
    	var projectDevEmpUnion = "";
    	$("input[name='info_projectDevEmpUnion']").each(function(){
    		projectDevEmpUnion += $(this).is(':checked') ? $(this).val()+"," : "";
    	});
    	projectDevEmpUnion = projectDevEmpUnion.length>0 ? projectDevEmpUnion.substring(0,projectDevEmpUnion.length-1) : '';
    	if (Common.isEmpty(provinceId)) {
			Common.messageBox("提示", "请选择所属省！", false);
			$("#info_province").select2("open");
			return false;
		}
		if (Common.isEmpty(cityId)) {
			Common.messageBox("提示", "请选择所属市！", false);
			$("#info_city").select2("open");
			return false;
		}
		if(Common.isEmpty(buildingProjectId)) {
			Common.messageBox("提示", "请选择楼盘！", false);
			$("#info_buildingProject").select2("open");
			return false;
		}
		if(Common.isEmpty($("#info_contractAttachmentId").val())){
			Common.messageBox("提示", "请上传开发商合同附件！", false);
			return false;
		}
		if(Common.isEmpty(disp)){
			Common.messageBox("提示", "请选择显示范围！", false);
			$("#info_disp").select2("open");
			return false;
		}
		if(Common.isEmpty(cooperationStart)){
			Common.messageBox("提示", "项目合作开始日期不能为空！", false);
			$("#cooperationStart").focus();
			return false;
		}
		if(Common.isEmpty(cooperationEnd)){
			Common.messageBox("提示", "项目合作结束日期不能为空！", false);
			$("#cooperationEnd").focus();
			return false;
		}
		if(Common.isEmpty(saleEndDate)){
			Common.messageBox("提示", "认购截止日期不能为空！", false);
			$("#saleEndDate").focus();
			return false;
		}
    	if(cooperationStart > cooperationEnd) { 
    		Common.messageBox("提示", "项目合作开始日期 必须早于 项目合作结束日期！", false);
	    	return false;
    	}
    	if(cooperationStart > saleEndDate) { 
    		Common.messageBox("提示", "项目合作开始日期 必须早于 认购截止日期！", false);
	    	return false;
    	}
    	if(Common.isEmpty(projectManager)) { 
    		Common.messageBox("提示", "请选择项目经理！", false);
	    	return false;
    	}
    	if(Common.isEmpty(projectManagerAssistant)) { 
    		Common.messageBox("提示", "请选择项目文员！", false);
	    	return false;
    	}
    	if(Common.isEmpty(projectDevEmpUnion)) { 
    		Common.messageBox("提示", "请选择开发商对接人！", false);
	    	return false;
    	}
    	if (!$('#projectForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}
    	var startCode = $("#info_startCode").val();
    	var endCode = $("#info_endCode").val();
    	var disp = $("#info_disp").val();
    	var developerRule = $("#info_developerRule").val();
    	var commissionRule = $("#info_commissionRule").val();
    	var settlementHours = $("#info_settlementHours").val();
    	var descriptPrice = $("#info_descriptPrice").val();
    	var descriptHouse = $("#info_descriptHouse").val();
    	var descriptSupporting = $("#info_descriptSupporting").val();
    	var descriptTraffic = $("#info_descriptTraffic").val();
    	var descriptEdu = $("#info_descriptEdu").val();
    	var descriptPlanning = $("#info_descriptPlanning").val();
    	var descriptCharacteristic = $("#info_descriptCharacteristic").val();
    	var descriptProperty = $("#info_descriptProperty").val();
    	var descriptBrand = $("#info_descriptBrand").val();
    	var descriptContrast = $("#info_descriptContrast").val();
    	var descriptOther = $("#info_descriptOther").val();
    	var customAge = $("#info_customAge").val();
    	var customIntent = $("#info_customIntent").val();
    	var customBudget = $("#info_customBudget").val();
    	var customProfession = $("#info_customProfession").val();
    	var customWork = $("#info_customWork").val();
    	var customLive = $("#info_customLive").val();
    	var customOther = $("#info_customOther").val();
    	var customSkill = $("#info_customSkill").val();
    	var houseUnionStr = getUnionHouse();
    	Common.showMask("请稍候......");
    	$.ajax({
			url : url,
			type : "post",
			data : {
				projectInfoId : projectInfoId,
				projectInfoName : projectInfoName,
				provinceId : provinceId,
				provinceName : provinceName,
				cityId : cityId,
				cityName : cityName,
				buildingProjectId : buildingProjectId,
				buildingProjectName : buildingProjectName,
				merchantId : merchantId,
				disp : disp,
				cooperationStart : cooperationStart,
				cooperationEnd : cooperationEnd,
				saleEndDate : saleEndDate,
				projectManager : projectManager,
				projectManagerAssistant : projectManagerAssistant,
				contacts : contacts,
				contactsTel : contactsTel,
				contractAttachmentId : contractAttachmentId,
				projectDevEmpUnion : projectDevEmpUnion,
				startCode : startCode,
				endCode : endCode,
				developerRule : developerRule,
				commissionRule : commissionRule,
				settlementHours : settlementHours,
				descriptPrice : descriptPrice,
				descriptHouse : descriptHouse,
				descriptSupporting : descriptSupporting,
				descriptTraffic : descriptTraffic,
				descriptEdu : descriptEdu,
				descriptPlanning : descriptPlanning,
				descriptCharacteristic : descriptCharacteristic,
				descriptProperty : descriptProperty,
				descriptBrand : descriptBrand,
				descriptContrast : descriptContrast,
				descriptOther : descriptOther,
				customAge : customAge,
				customIntent : customIntent,
				customBudget : customBudget,
				customProfession : customProfession,
				customWork : customWork,
				customLive : customLive,
				customOther : customOther,
				customSkill : customSkill,
				houseUnionStr : houseUnionStr
			},
			dataType : "json",
			success : function(json) {
				Common.hideMask();
				if (json.isSuccess) {
					Common.alert(json.msg, true, function(){
						back();
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

	function getUnionHouse(){
		var phuList = '[';
		$("#projectHouseUnionImg li").each(function(){
			var houseId = $(this).attr("id").replace("li","");
			var isCommend = $("#chkUnionHouse"+houseId).is(":checked") ? 1 : 0;
			var houseCount = $("#houseNum"+houseId).val();
			var phu = '{houseId:'+houseId+",isCommend:"+isCommend+",houseCount:"+houseCount+"},";
			phuList+=phu;
		});
		phuList = phuList.length>1 ? phuList.substring(0,phuList.length-1) : phuList;
		phuList+=']';
		return phuList;
	}
	
	function back(){
		location.href = "index";
	}
	
	var actionType = $("#actionType").val();
	$("#info_province").bind("change",function(){
		if(actionType=='add'){
			clean();			
		}
	});
	
	$("#info_city").bind("change",function(){
		if(actionType=='add'){
			clean();
		}
	});
	
	$("#info_buildingProject").bind("change",function(){
		if($(this).val()>0 && actionType=='add') {
			getBuildingInfo();
		}
	});
	
	function getBuildingInfo(){
		var pid = $("#projectInfoId").val();
		var bpid = $("#info_buildingProject").val();
		Common.showMask("正在获取楼盘数据......");
		$.ajax({
			url : "getbuildingprojectinfo",
			type : "post",
			data : {
				buildingProjectId : bpid,
				projectInfoId : pid
			},
			dataType : "json",
			success : function(json) {
				Common.hideMask();
				if (json.isSuccess) {
					initProjectData(json.result);
				} else {
					clean();
					Common.messageBox("提示", json.msg, false);
				}
			},
			error : function() {
				clean();
				Common.hideMask();
				Common.messageBox("提示", json.msg, false);
			}
		});
	}
	
	function initProjectData(data){
		clean();
		$("#info_merchantId").val(data.buildingProjectBaseEntity.merchantId);
		$("#info_merchantName").val(data.buildingProjectBaseEntity.merchantName);
		$("#info_developerName2").val(data.buildingProjectBaseEntity.merchantName);
		$("#info_address").val(data.buildingProjectBaseEntity.address);
		var manager_html="";
		var assistant_html="";
		var projectDevEmpUnion="";
		var buildingHouseImg = "";
		var buildingMainImg = "../../assets/img/default_building.png";
		//楼盘封面图
		buildingMainImg = "../../"+data.buildingProjectBaseEntity.colPicUrl==null ? data.buildingProjectBaseEntity.colPicUrl : buildingMainImg;
		//项目经理和项目文员
		for(var i=0;i<data.managerList.length;i++){
			var operator = data.managerList[i];
			manager_html += "<label class=\"middle radio-padding\"><input class=\"ace\" value="+operator.operatorId+" type=\"radio\"" +
				 "name=\"info_projectManager\"><span class=\"lbl\">"+operator.operatorName+"</span></label>";
			assistant_html += "<label class=\"middle radio-padding\"><input class=\"ace\" value="+operator.operatorId+" type=\"checkbox\"" +
			 "name=\"info_projectManagerAssistant\"><span class=\"lbl\">"+operator.operatorName+"</span></label>";
		}
		//开发商对接人
		for(var i=0;i<data.systemOperatorList.length;i++){
			var operator = data.systemOperatorList[i];
			projectDevEmpUnion += "<label class=\"middle radio-padding\"><input class=\"ace\" value="+operator.operatorId+" type=\"checkbox\"" +
			 "name=\"info_projectDevEmpUnion\"><span class=\"lbl\">"+operator.operatorName+"</span></label>";
		}
		//楼盘户型
		for(var i=0;i<data.buildingHouseList.length;i++){
			var buildingHouse = data.buildingHouseList[i];
			buildingHouseImg += "<li><a href=\"javascript:void();\" data-rel=\"colorbox\">"+
								"<img id=\"img"+buildingHouse.houseId+"\" class=\"building_house_img\" "+
								"src=\"../../"+buildingHouse.houseMainImg+"\"></a>"+
								"<div class=\"favourable\"><input class=\"ace all_hose_check\" type=\"checkbox\" value=\""+buildingHouse.houseId+"\" id=\"chkHouse"+buildingHouse.houseId+"\"/>"+
								"<span class=\"lbl\" id=\"content"+buildingHouse.houseId+"\">"+buildingHouse.houseId+"["+buildingHouse.col1+"]"+buildingHouse.floorArea+"平"+"</span></div></li>";
		}
		$("#buildingMainImg").attr("src",buildingMainImg);
		$("#managerDiv").html(manager_html);
		$("#assistantDiv").html(assistant_html);
		$("#buildingHouseImg").html(buildingHouseImg);
		$("#projectDevEmpUnionDiv").html(projectDevEmpUnion);
		addProjectHouseUnion();
	}
	
	function addProjectHouseUnion(){
		$(".all_hose_check").each(function(){
			$(this).bind("click",function(){
				var houseId = $(this).val();
				if($(this).is(":checked")){
					var content = $("#content"+houseId).html();
					var imgSrc = $("#img"+houseId).attr("src");
					var projectHouseUnionImg ="<li id=\"li"+houseId+"\"><a href=\"javascript:void();\" data-rel=\"colorbox\">"+
						"<img class=\"building_house_img\" src=\""+imgSrc+"\">"+
						"</a><div class=\"hose-des\"><p class=\"lbl\">"+content+"</p></div>"+
						"<div class=\"pro-recommend\"><input type=\"checkbox\" name=\"isNominate\" "+
						"id=\"chkUnionHouse"+houseId+"\"/>是否推荐</div><div class=\"favourable\">"+
						"<p>房源数量</p><p> <input type=\"text\" id=\"houseNum"+houseId+"\" maxlen=\"5\" value=\"0\" style=\"padding: 0 5px;text-align:center;\"></p>"+
						"<p class=\"favourable-num\">此数量为参考数量，非实际数量</p>\</div></li>";
					$("#projectHouseUnionImg").append(projectHouseUnionImg);
				}
				if(!$(this).is(":checked")){
					$("#li"+houseId).remove();
				}
			});
		});
	}
	
	function clean(){
		$("#info_merchantId").val("");
		$("#info_merchantName").val("");
		$("#info_address").val("");
		$("#managerDiv").html("");
		$("#assistantDiv").html("");
		$("#projectDevEmpUnionDiv").html("");
		$("#buildingHouseImg").html("");
		$("#projectHouseUnionImg").html("");
	}
	
	$("#uploadBtn").uploadifive({
		buttonText : "选择文件",
		uploadScript : "../../common/upload/file",
		fileSizeLimit : 1024 * 20,
		fileType : "image/*",
		queueSizeLimit : 1,
		multi : true,
		removeCompleted : true,
		onUploadComplete : function(file, data) {
			savePic(data);
		}
	});
	
	function savePic(data){
		Common.showMask("请稍候......");
		var jsonData = eval("(" + data + ")")[0];
		$.ajax({
			url : "upload",
			type : "post",
			dataType : "json",
			data : {
				attachmentName : jsonData.srcFileName,
				attachmentUrl : jsonData.httpPath
			},
			success : function(json) {
				Common.hideMask();
				if (json.isSuccess) {
					$("#info_contractAttachmentName").val(jsonData.srcFileName);
					$("#info_contractAttachmentId").val(json.result);
					Common.alert(json.msg, true);
				} else {
					Common.alert(json.msg, false);
				}
			}
		});
	}
});