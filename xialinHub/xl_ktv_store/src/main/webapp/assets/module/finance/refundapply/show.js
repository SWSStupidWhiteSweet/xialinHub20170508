$(function($) {
	var toSvaeFileInfo = "";
	$("#saveBtn").click(function(e) {
		var haveError = false;
		var rows_check = $("#orderInfoRefundTbody").children();
		var orderRefundDetails = "";
    	var orderAttType = 14;
		/* if(orderAttType && toSvaeFileInfo==""){
    		blpc.alert("请上传退款支付附件！");
    		return;
    	}; */
		rows_check.each(function (index) {
        	var tmpTr = $(this);
        	var selecttype = tmpTr.find("select").val();//获得当前列的打款方式
        	if(selecttype==0){
        		Common.messageBox("提示", "您有打款方式未勾选！请核对！", false);
				haveError = true;
				return false; //跳出循环
        	}
        	var feeratio = tmpTr.find("input[type='text']").val();//获得当前列的手续费金额
           	if(feeratio==''){
           		Common.messageBox("提示", "您有手续费未填写！请核对！", false);
				haveError = true;
				return false; //跳出循环
			}
        	//验证是否数字
         	if(isNaN(feeratio) || feeratio<0 ){
        		haveError = true;
        		Common.messageBox("提示", "请输入正确手续费金额！", false);
				return false; //跳出循环
			}
          	//验证输入金额是否超出订单所需回款金额
        	if(tmpTr.find("td").eq(5).html()-feeratio<0){
        		Common.messageBox("提示", "您的手续费有超出退款金额项！请核对。", false);
				haveError = true;
				return false; //跳出循环
        	}
        	var order_refund_detail_id = tmpTr.find("td").eq(0).html();//获得当前列退款详情ID
        	var fingerprint = tmpTr.find("td").eq(1).html();//获得当前列退款详情指纹
         	var tempStr = order_refund_detail_id+":"+fingerprint+":"+selecttype+":"+feeratio+";";
         	orderRefundDetails += tempStr;
        });
		//财务反馈: 取消必选项
//		if(Common.isEmpty(toSvaeFileInfo)) {
//			Common.messageBox("提示", "请上传附件！", false);
//			return false;
//		}
		
		if(haveError)return;
		
		$.ajax({
			url : "saverefunddetailinfo",
			type : "post",
			data : {
				orderRefundDetails:orderRefundDetails,
				orderInfoId:$("#orderInfoId").val(),
				orderFingerprint:$("#orderFingerprint").val(),
				orderRefundApplyId:$("#orderRefundApplyId").val(),
				applyFingerprint:$("#applyFingerprint").val(),
				orderAttType:orderAttType,
				fileInfo:toSvaeFileInfo,
				remark:$("#remark").val()
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.alert("确认打款成功！", true, back);
				} else {
					Common.messageBox("提示", json.msg, false);
				}
			},
			error : function() {
				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
			}
		});
	});

	$("#backBtn").click(back);

	function back() {
		if($("#operateType").val() == "show"){
			location.href = "index?activeTab=2";
		}else{
			location.href = "index";
		}
	}

	$("#attrs").uploadifive({
//		buttonClass : "btn btn-success",
		buttonText : "选择文件",
		uploadScript : "../../common/upload/file",
		fileSizeLimit : 1024 * 20,
		fileType : "image/*",
		queueSizeLimit : 1,
		removeCompleted : true,
		onUploadComplete : function(file, data) {
			var jsonData = eval("(" + data + ")");
			var htmlstr='<div><img class="img-div" src="'+"../../" + jsonData[0].httpPath.substring(1)+'"><h2 style="font-size:14px;margin:0px;">'+jsonData[0].srcFileName+'</h2 ></div>';
			var toSaveStr = jsonData[0].httpUrl+jsonData[0].smallFileName+":"+jsonData[0].srcFileName+";";
			toSvaeFileInfo += toSaveStr;
			$("#showImage").html(htmlstr);
//			alert(toSvaeFileInfo);
		}
	});
});
