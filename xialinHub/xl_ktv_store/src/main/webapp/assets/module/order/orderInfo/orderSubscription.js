$(function(){
	
	/**
	 * 初始化时间控件
	 */
	$('#realBuyTime').datepicker({autoclose:true});
	
	//设置上传按钮显示在同一行
	$("#uploadifive-uploadFile").css("display","inline-block");
	
	/**
	 * 其他购房人开关
	 */
	$("#otherBuyerBtn").click(function(e){
		if($(this).is(':checked')){
			$("#otherBuyerA").show();
			$("#otherBuyerParent").show();
		}else{
			$("#otherBuyerA").hide();
			$("#otherBuyerParent").hide();
		}
	});
	
	/**
	 * 增加其他购房人按钮
	 */
	$("#otherBuyerA").click(function(){
		var otherBuyerParent = $("#otherBuyerParent");
    	var html = '';
    	html += '<div class="otherBuyerDiv" nameKey="otherBuyerDiv">';
    	html += '<label class="poly-form-alone-label">购房人:&nbsp;&nbsp;</label>';
    	html += '<input class="poly-small-input" type="text" value="">&nbsp;&nbsp;';
    	html += '<label class="poly-check-group-one">联系电话:&nbsp;&nbsp;</label>';
    	html += '<input class="poly-small-input" type="text" value="">&nbsp;&nbsp;';
    	html += '<label class="poly-check-group-one">关系:&nbsp;&nbsp;</label>';
    	html += '<select class="otherSelect">';
    		html += '<option value="1" >夫妻</option>';
    		html += '<option value="2" >父母</option>';
    		html += '<option value="3" >子女</option>';
    		html += '<option value="4" >亲戚</option>';
    		html += '<option value="5" >朋友</option>';
    	html += '</select>';
    	html += '<span class="poly-content-del" onclick="delOtherBuyer(this);"><i class="ace-icon fa fa-trash-o bigger-200 orange"></i></span>';
    	html += '</div>';
    	
    	//设置iframe高度
		setIframeHeight(40);
		
    	otherBuyerParent.append(html);
	});
	
	/**
	 * 户型切换事件
	 */
	$("#house").change(function(){
		var id= $('#house option:selected').attr('value');
		var houseName= $('#house option:selected').attr('houseName');
		var roomTotal= $('#house option:selected').attr('roomTotal');
		var livingRoomTotal= $('#house option:selected').attr('livingRoomTotal');
		var kitchenTotal= $('#house option:selected').attr('kitchenTotal');
		var bathroomTotal= $('#house option:selected').attr('bathroomTotal');
		var kitchenTotal= $('#house option:selected').attr('bathroomTotal');
    	var floorArea = $('#house option:selected').attr('floorArea');
    	var useArea = $('#house option:selected').attr('useArea');
    	var giveArea = $('#house option:selected').attr('giveArea');
    	
   		$("#houseIdSpan").html("ID"+id);
       	$("#houseNameSpan").html("认购户型："+houseName);
       	$("#houseInfoSpan").html(roomTotal+"室"+livingRoomTotal+"厅"+bathroomTotal+"卫"+kitchenTotal+"厨");
       	$("#houseFloorAreaSpan").html("建筑面积："+floorArea+"平米");
       	$("#houseUseAreaSpan").html("套内面积："+useArea+"平米");
       	$("#houseGiveAreaSpan").html("赠送面积："+giveArea+"平米");
	});
	
	/**
     * 验证手机号码
     */
	function validateMobile(mobile){
        //var reg = /^(?:13\d|15[89])-?\d{5}(\d{3}|\*{3})$/;
    	var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
        return reg.test(mobile);
    }
	
	/**
	 * 刷新购房人信息
	 */
    function refreshOtherBuyer(){
    	var info = '';
    	var jsonstr = "[]";
    	var jsonarray = eval('('+jsonstr+')');
    	var flag = true;
    	$("div[namekey='otherBuyerDiv']").each(function(){
    		var jsonTemp = {"name":$(this).children().eq(1).val(),"mobile":$(this).children().eq(3).val(),"relation":$(this).children().eq(5).val()};
    		if(null == $(this).children().eq(3) || !validateMobile($(this).children().eq(3).val())){
    			info = "请填写正确的购房人电话";
    			flag = false;
    		}
    		if(null == $(this).children().eq(1) || $(this).children().eq(1).val() == ''){
    			info = "请填写正确的购房人姓名";
    			flag = false;
    		}
    		if(null == $(this).children().eq(5) || $(this).children().eq(5).val() == ''){
    			flag = false;
    			info = "请选择购房人关系";
    		}
    		jsonarray.push(jsonTemp);
    	});
    	
    	$("#buyerRelation").val(JSON.stringify(jsonarray));
    	if($("#buyerRelation").val() == '[]'){
    		flag =  false;
    		info = "请添加其他购房人";
    	}
    	return info;
    }
    
    /**
	 * 下一步
	 */
	function nextStep(){
		window.parent.order.nextStep(4);
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
	 * 保存
	 */
	$("#saveBtn").click(function(){
		
		var orderInfoId = $("#orderInfoId").val();
		var fingerprint = $("#fingerprint").val();
		var realBuyTime = $("#realBuyTime").val();
   		if(null == realBuyTime || realBuyTime == ''){
   			window.parent.order.messageBox("提示", "请选择认购时间！", false);
   			return;
   		}
		
   		var houseBuilding = $("#houseBuilding").val();
   		if(null == houseBuilding || houseBuilding == ''){
   			window.parent.order.messageBox("提示", "请填写楼栋信息！", false);
   			return;
   		}

   		var houseUnit = $("#houseUnit").val();
   		if(null == houseUnit || houseUnit == ''){
   			window.parent.order.messageBox("提示", "请填写单元信息！", false);
   			return;
   		}
   		var houseNumber = $("#houseNumber").val();
   		if(null == houseNumber || houseNumber == ''){
   			window.parent.order.messageBox("提示", "请填写认购房号！", false);
   			return;
   		}
   		
   		var houseId = $("#house option:selected").val();
   		if(null == houseId || houseId == ''){
   			window.parent.order.messageBox("提示", "请选择认购户型！", false);
   			return;
   		}
   		
   		var numReg = /^\d+(\.\d+)?$/ ; // 金额验证正则
    	var houseAmount = $("#houseAmount").val();
     	
   		if(!numReg.test(houseAmount)){
   			window.parent.order.messageBox("提示", "请填写认购总价,且只能填写数字！", false);
   			return;
   		}
   		
   		var info = refreshOtherBuyer();
		if($("#isOtherBuyer").val()==2&&info!=''){
			window.parent.order.messageBox("提示", info, false);
			return;
		}
		
		var buyerRelation = $("#buyerRelation").val();
		var remark = $("#remark").val();
		//订单附件类型(用逗号隔开)
		var orderAttachmentType = $("#orderAttachmentTypeStr").val();
		//附件名称字符串(用逗号隔开)
		var orderAttachmentName = $("#orderAttachmentNameStr").val();
		//附件路径字符串(用逗号隔开)
		var orderAttachmentUrl = $("#orderAttachmentUrlStr").val();
		
		window.parent.order.confirm("您确定要保存数据吗？",function(){
			window.parent.order.showMask();
			$.ajax({
				url : "savesubscription",
				type : "post",
				data : {
					orderInfoId:orderInfoId,
					realBuyTime:realBuyTime,
					houseBuilding:houseBuilding,
					houseUnit:houseUnit,
					houseNumber:houseNumber,
					houseId:houseId,
					houseAmount:houseAmount,
					buyerRelation:buyerRelation,
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
	
	//设置iframe的高度
	function setIframeHeight(moreHeight){
		var documentHeight = $(document).height();
		window.parent.setDocumentHeight(4,documentHeight+moreHeight);
	}

})