$(function() {

	
//	$( "#realVisitTime" ).datepicker({
//		showOtherMonths: true,
//		selectOtherMonths: false,
//		language: 'zh-CN',
//		timePicker:true
//		//isRTL:true,
//		/*
//		changeMonth: true,
//		changeYear: true,
//		showButtonPanel: true,
//		beforeShow: function() {
//			//change button colors
//			var datepicker = $(this).datepicker( "widget" );
//			setTimeout(function(){
//				var buttons = datepicker.find('.ui-datepicker-buttonpane')
//				.find('button');
//				buttons.eq(0).addClass('btn btn-xs');
//				buttons.eq(1).addClass('btn btn-xs btn-success');
//				buttons.wrapInner('<span class="bigger-110" />');
//			}, 0);
//		}
//		 */
//	});
	
	/**
	 * 初始化时间插件
	 */
	$('#realVisitTime').datetimepicker({ format:"YYYY-MM-DD HH:mm:ss"});
	
	/**
	 * 初始化省下拉框
	 */
	Common.initSelect2("province", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "200px"
	});
	
	/**
	 * 初始化市下拉框
	 */
	Common.initSelect2("city", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "200px"
	});
	
	/**
	 * 初始化楼盘下拉框
	 */
	Common.initSelect2("buildingProject", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "200px"
	});
	
	/**
	 * 初始化期数下拉框
	 */
	Common.initSelect2("buildingInfo", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "200px"
	});
	
	/**
	 * 初始化项目下拉框
	 */
	Common.initSelect2("projectInfo", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "200px"
	});
	
	
	/**
	 * 初始联贷方下拉框
	 */
	Common.initSelect2("agentId", {
		allowClear : true,
		minimumResultsForSearch : Infinity,
		width : "200px"
	});
	
	//设置上传按钮显示在同一行
	$("#uploadifive-uploadFile").css("display","inline-block");
	
	/**
     * 验证手机号码
     */
	function validateMobile(mobile){
        //var reg = /^(?:13\d|15[89])-?\d{5}(\d{3}|\*{3})$/;
    	var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
        return reg.test(mobile);
    }
	
	/**
	 * 客户搜索按钮
	 */
	$("#searchCustomInfo").click(function(e){
		$("#orderRecordTable").hide();
		$("#reordInfoDiv").hide();
		
		//城市id
		var cityId = $("#city option:selected").val();
		//项目id
		var projectInfoId = $("#projectInfo option:selected").val();
		//客户手机号
		var customTel = $("#customTel").val();
		if(Common.isEmpty(cityId)){
			window.parent.order.messageBox("提示", "请选择所属省/市！", false)
			$("#city").select2("open");
			return false;
		}
		if(Common.isEmpty(projectInfoId)){
			window.parent.order.messageBox("提示", "请选择所属项目！", false);
			$("#projectInfo").select2("open");
			return false;
		}
		if(!validateMobile(customTel)){
			window.parent.order.messageBox("提示", "请输入正确的手机号！", false);
			return false;
		}
		//设省值
		$("#provinceId").val($("#province option:selected").val());
		$("#provinceName").val($("#province option:selected").text());
		//设市值
		$("#cityId").val($("#city option:selected").val());
		$("#cityName").val($("#city option:selected").text());
		//设楼盘值
		$("#buildingProjectId").val($("#buildingProject option:selected").val());
		//设项目值
		$("#projectInfoId").val($("#projectInfo option:selected").val());
		
		//清除相关字段
		cleanRecordInfo();
		window.parent.order.showMask();
		$.ajax({
			url : "getordercustomrecord",
			type : "post",
			data : {
				cityId : cityId,
				projectInfoId : projectInfoId,
				customTel :customTel
			},
			dataType : "json",
			success : function(json) {
				window.parent.order.hideMask();
				if (json.isSuccess) {
					var rs = json.result;
//					if(rs.dataList && rs.dataList.length>0){
//						appendRecordTable(rs.dataList,rs.isAllTel);
//					}
					
					if(rs.gridinfo){
						$("#customerGridTip").html(rs.gridinfo);
					}
					if(rs.channelTypeName){
						$("#channelTypeName").html(rs.channelTypeName);
						$("#channelType").val(rs.channelTypeId);
					}
					if(rs.remark){
						$("#channelRemark").html(rs.remark);
					}
					if(rs.isCustomer){
						$("#customInfoId").val(rs.customInfoId);
						$("#customName").val(rs.customName);
						$("input[name=customSex][value='"+rs.customSex+"']").attr("checked","checked");
					}
					if(orderConstant.isAllTel.ALL_TEL == rs.isAllTel && rs.isVisitValid){
						if(rs.currentRecord){
							//console.info(rs.currentRecord);
							$("#orderCustomRecordId").val(rs.currentRecord.orderCustomRecordId);
							$("#agentId").select2("val", rs.currentRecord.agentId).trigger("change");
							$("#agentId").attr("disabled","disabled");
							$("#customInfoId").val(rs.currentRecord.coustomInfoId);
							$("#customName").val(rs.currentRecord.customName);
							$("input[name=customSex][value='"+rs.currentRecord.customSex+"']").attr("checked",true);
							$("#brokerId").val(rs.currentRecord.brokerId);
							$("#brokerName").html(rs.currentRecord.brokerName);
							$("#brokerTel").html(rs.currentRecord.brokerTel);
							$("#brokerCompanyId").val(rs.currentRecord.brokerCompanyId);
							$("#brokerCompanyName").html(rs.currentRecord.brokerCompanyName);
							$("#storeId").val(rs.currentRecord.storeId);
							$("#storeName").html(rs.currentRecord.storeName);
							$("#realVisitTime").val(rs.currentRecord.realVisitTime);
							
							//设置iframe的高度
							var divHeight = $("#reordInfoDiv").outerHeight(true);
							setIframeHeight(divHeight);
							
							$("#reordInfoDiv").show();
						}
					}else{
//						$("#orderRecordTable").show();
						//console.info(rs.dataList)
						if(rs.dataList && rs.dataList.length>0){
							appendRecordTable(rs.dataList,rs.isAllTel);
							//设置iframe的高度
							var tableHeight = $("#orderRecordTable").outerHeight(true);
							setIframeHeight(tableHeight);
							$("#orderRecordTable").show();
						}
					}
					
					if(!rs.currentRecord && orderConstant.channelType.ZJ == rs.channelTypeId){
						$("#saveOrderBtn").attr("disabled","true");
						$("#saveOrderBtn").removeClass("btn-info");
					}else{
						$("#saveOrderBtn").removeAttr("disabled");
						$("#saveOrderBtn").addClass("btn-info");
					}
					
				} else {
					Common.messageBox("提示", json.msg, false);
				}
			},
			error : function() {
				window.parent.order.hideMask();
				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
			}
		});
	});
	
	function cleanRecordInfo(){
		$("#customerGridTip").html("");
		$("#channelTypeName").html("");
		$("#channelType").val("");
		$("#channelRemark").html("");
		//$("#agentId").select2("val", "").trigger("change");
		$("#customInfoId").val("");
		$("#customName").val("");
		//$("input[name=customSex]").attr("checked","");
		$("#brokerId").val("");
		$("#brokerName").html("");
		$("#brokerTel").html("");
		$("#brokerCompanyId").val("");
		$("#brokerCompanyName").html("");
		$("#storeId").val("");
		$("#storeName").html("");
		$("#realVisitTime").val("");
	}
	
	/**
	 * 设置报备信息表格
	 */
	function appendRecordTable(tableDate,isAllTel){
		$("#recordTable").html("");
		var recordHtml = "";
		for(var i=0;i<tableDate.length;i++){
			recordHtml += "<tr><td class='center'>"+tableDate[i].customName+"</td>";
			recordHtml += "<td class='center'>"+tableDate[i].customTel+"</td>";
			recordHtml += "<td class='center'>"+tableDate[i].projectInfoName+"</td>";
			recordHtml += "<td class='center'>"+isStartFormatteShelves(tableDate[i].isStart)+"</td>";
			recordHtml += "<td class='center'>"+tableDate[i].buildingProjectName+"</td>";
			recordHtml += "<td class='center'>"+tableDate[i].brokerName+"</td>";
			recordHtml += "<td class='center'>"+tableDate[i].brokerTel+"</td>";
			recordHtml += "<td class='center'>"+tableDate[i].brokerCompanyName+"</td>";
			recordHtml += "<td class='center'>"+tableDate[i].storeName+"</td>";
			recordHtml += "<td class='center'>"+orderRecdStatusFormatter(tableDate[i].recordStatus)+"</td>";
			recordHtml += "<td class='center'>"+formatConfirmVisit(tableDate[i],isAllTel)+"</td></tr>";
		}
		$("#recordTable").append(recordHtml);
	}
	
	/**
	 * 设置操作按钮
	 */
	function formatConfirmVisit(rowDate,isAllTel){
		var text_ = "报备确认";
		//报备有效
		if(orderConstant.recordStatus.RECORD_STATUS_RECORD_EFFECT == rowDate.recordStatus){
			text_ = "到访确认";
			return "<a title='"+text_+"' class='btnA' href='javascript:void(0);' onclick='confirmVisit(2,null,"+rowDate.orderCustomRecordId+");' >"+text_+"</a>";
		//到访确认 且 号码不全 补全号码
		}else if(orderConstant.recordStatus.RECORD_STATUS_VISTI_EFFECT == rowDate.recordStatus && orderConstant.isAllTel.NOT_ALL_TEL == isAllTel){
			text_ = "补全号码"
			return "<a title='"+text_+"' class='btnA' href='javascript:void(0);' onclick='confirmVisit(3,\""+rowDate.customTel+"\");' >"+text_+"</a>";
		//报备待确认
		}else if(orderConstant.recordStatus.RECORD_STATUS_RECORD_WAIT != rowDate.recordStatus) { 
			return "无";
		}
		return "<a title='"+text_+"' class='btnA' href='javascript:void(0);' onclick='confirmVisit(1,\""+rowDate.customTel+"\");' >"+text_+"</a>";
	}
	
	/**
	 * 设置按钮跳转url
	 */
	/*function confirmVisit(value) {
		//跳转到确认到访界面
//		var custom_record_id = obj.custom_record_id;
//		var record_status = obj.record_status_id;
//		
//		//报备有效
//		if(constants.recordStatus.RECORD_STATUS_RECORD_WAIT==record_status) {
//			$(this).attr("title", "客户报备管理");
//			$(this).attr("data-addtab", "custom_info_list");
//			$(this).attr("url", path+"/custom/record/index?customRecordId="+custom_record_id);
//		} else if(constants.recordStatus.RECORD_STATUS_RECORD_EFFECT==record_status) {
//			$(this).attr("title", "到访确认["+obj.custom_name+"]");
//			$(this).attr("data-addtab", "confirmVisitTab");
//			$(this).attr("url", path+"/order/visit/confirm?customRecordId="+custom_record_id+"&buildingInfoId="+obj.building_info_id);
//		//到访确认且号码不全时去补全号码
//		} else if(constants.recordStatus.RECORD_STATUS_VISTI_EFFECT == record_status && constants.isAllTel.NOT_ALL_TEL == obj.is_all_tel){
//			$(this).attr("title", "客户到访管理");
//			$(this).attr("data-addtab", "confirmToAddTelTab");
//			$(this).attr("url", path+"/order/visit/index");
//		}
//		blpc.openParentNewFrame($(this));
		var url = "";
		switch (value) {
	        case 1:
	        	url = path + "/order/rc/index";
	        	window.parent.location.href = url;
	        	break;
	        case 2:
	        	url = path + "/order/rc/toVisitIndex";
	        	window.parent.location.href = url;
	        	break;
	        case 3:
	        	url = path + "/order/rc/toVisitIndex";
	        	window.parent.location.href = url;
	        	break;
	        default:
	            return false;
	    }
	}*/
	/**
	 * 下一步
	 */
	function nextStep(){
		window.parent.order.nextStep(1);
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
	 * 保存订单信息
	 */
	$("#saveOrderBtn").click(function(e){
		//渠道归属
		var channelType = $("#channelType").val();
		//客户名称
		var customName = $("#customName").val();
		//客户电话
		var customTel = $("#customTel").val();
		//到访时间
		var realVisitTime = $("#realVisitTime").val();
		
		//省id
		var provinceId = "";
		//省名称
		var provinceName = "";
		//城市id
		var cityId = "";
		//城市名称
		var cityName = "";
		//项目id
		var projectInfoId = "";
		//楼盘id
		var buildingProjectId = "";
		
		//联贷方id
		var agentId = $("#agentId option:selected").val();
		
		if(Common.isEmpty(customName)){
			window.parent.order.messageBox("提示", "请输入客户姓名！", false);
			return false;
		}
		
		if(Common.isEmpty(actionType)){
			return false;
		}else{
			if(actionType == 'add'){
				if(Common.isEmpty(channelType)){
					window.parent.order.messageBox("提示", "请输入客户手机号并搜索，系统判定渠道归属！", false);
					return false;
				}
				if(Common.isEmpty(realVisitTime)){
					window.parent.order.messageBox("提示", "请选择到访时间！", false);
					return false;
				}
				
				provinceId = $("#provinceId").val();
				provinceName = $("#provinceName").val();
				cityId = $("#cityId").val();
				cityName = $("#cityName").val();
				buildingProjectId = $("#buildingProjectId").val();
				projectInfoId = $("#projectInfoId").val();
			}else{
				
				//省id
				provinceId = $("#province option:selected").val();
				//省名称
				provinceName = $("#province option:selected").text();
				//城市id
				cityId = $("#city option:selected").val();
				//城市名称
				cityName = $("#city option:selected").text();
				//项目id
				projectInfoId = $("#projectInfo option:selected").val();
				//楼盘id
				buildingProjectId = $("#buildingProject option:selected").val();
			}
		}
		
		if(Common.isEmpty(provinceId)){
			window.parent.order.messageBox("提示", "请选择所属省！", false);
			$("#province").select2("open");
			return false;
		}
		if(Common.isEmpty(cityId)){
			window.parent.order.messageBox("提示", "请选择所属市！", false);
			$("#city").select2("open");
			return false;
		}
		if(Common.isEmpty(buildingProjectId)){
			window.parent.order.messageBox("提示", "请选择所属楼盘！", false);
			$("#buildingProject").select2("open");
			return false;
		}
		if(Common.isEmpty(projectInfoId)){
			window.parent.order.messageBox("提示", "请选择所属项目！", false);
			$("#projectInfo").select2("open");
			return false;
		}
		if(Common.isEmpty(agentId)){
			window.parent.order.messageBox("提示", "请选择所属联代方！", false);
			$("#agent").select2("open");
			return false;
		}
		if(Common.isEmpty(customTel)){
			window.parent.order.messageBox("提示", "请输入客户手机号！", false);
			return false;
		}
		
		
		//报备id
		var orderCustomRecordId = $("#orderCustomRecordId").val();
		//客户id
		var customInfoId = $("#customInfoId").val();
		//客户性别
		var customSex = $("input[name=customSex]:checked").val();
		if(Common.isEmpty(customSex)){
			customSex = 0;
		}
		//经纪公司id
		var brokerCompanyId = $("#brokerCompanyId").val();
		//经纪公司名称
		var brokerCompanyName = $("#brokerCompanyName").text();
		//门店id
		var storeId = $("#storeId").val();
		//门店名称
		var storeName = $("#storeName").text();
		//经纪人id
		var brokerId = $("#brokerId").val();
		//经纪人姓名
		var brokerName = $("#brokerName").text();
		//经纪人电话
		var brokerTel = $("#brokerTel").text();
		
		//订单附件类型(用逗号隔开)
		var orderAttachmentType = $("#orderAttachmentTypeStr").val();
		//附件名称字符串(用逗号隔开)
		var orderAttachmentName = $("#orderAttachmentNameStr").val();
		//附件路径字符串(用逗号隔开)
		var orderAttachmentUrl = $("#orderAttachmentUrlStr").val();
		var dataParam;
		var url;
		if(actionType == 'add'){
			url = "saveorderinfo";
			dataParam = {
					agentId:agentId,
					provinceId:provinceId,
					provinceName:provinceName,
					cityId:cityId,
					cityName:cityName,
					orderCustomRecordId:orderCustomRecordId,
					channelType:channelType,
					customInfoId:customInfoId,
					customName:customName,
					customSex:customSex,
					customTel:customTel,
					brokerCompanyId:brokerCompanyId,
					brokerCompanyName:brokerCompanyName,
					storeId:storeId,
					storeName:storeName,
					brokerId:brokerId,
					brokerName:brokerName,
					brokerTel:brokerTel,
					realVisitTime:realVisitTime,
					projectInfoId:projectInfoId,
					buildingProjectId:buildingProjectId,
					orderAttachmentType:orderAttachmentType,
					orderAttachmentName:orderAttachmentName,
					orderAttachmentUrl:orderAttachmentUrl
				}
		}else{
			var orderInfoId = $("#orderInfoId").val();
			var fingerprint = $("#fingerprint").val();
			url = "updateorderinfo";
			dataParam = {
					orderInfoId:orderInfoId,
					customName:customName,
					customSex:customSex,
					fingerprint:fingerprint,
					orderAttachmentType:orderAttachmentType,
					orderAttachmentName:orderAttachmentName,
					orderAttachmentUrl:orderAttachmentUrl
				}
		}
		window.parent.order.confirm("您确认要生成订单吗？",function(){
			$("#saveOrderBtn").attr("disabled","disabled");
			window.parent.order.showMask();
			$.ajax({
				url : url,
				type : "post",
				data : dataParam,
				dataType : "json",
				success : function(json) {
					window.parent.order.hideMask();
					if (json.isSuccess) {
						window.parent.actionType = "modify";
						window.parent.orderInfoId = json.result;
						if(actionType == 'add'){
							window.parent.order.alert("生成订单成功！",true,nextStep);
						}else{
							window.parent.order.alert("修改订单成功！",true,nextStep);
						}
					}else{
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
	
	//设置iframe的高度
	function setIframeHeight(moreHeight){
		var documentHeight = $(document).height();
		window.parent.setDocumentHeight(1,documentHeight+moreHeight);
	}
});
