$(function() {
	//初始化画廊
	$('.ace-thumbnails [data-rel="colorbox"]').colorbox(Common.colorbox_params);
	/**
	 * 绑定上传
	 */
	$("#upload").uploadifive({
		buttonClass : "btn btn-xs btn-info",
		buttonText : "上传截图附件",
		uploadScript : "../common/upload/file",
		fileSizeLimit : 1024 * 20,
		fileType : "image/*",
		height : "30px",
		width : "100px",
		queueSizeLimit : 1,
		multi : true,
		removeCompleted : true,
		onUploadComplete : function(file, data) {
			var data = eval("(" + data + ")")[0];
			var imgStr = 
				'<div class="col-sm-9" style="margin-left:25%;margin-top:-50px;">'
				+'	<a href="..'+data.httpUrl+data.fileName+'" data-rel="colorbox" data-rel="colorbox" style="margin-right: 26px;">'
				+'		<img title="'+data.srcFileName+'" src="..'+data.httpUrl+data.fileName+'" style="height: 200px;width: 200px;" />'
				+'	</a>'
				+'<div style="margin-top:5px;font-size: 16px;">'+data.srcFileName+'</div>';
			$("#upload_img").html(imgStr);
			$("#imgInfo").val(data.fileName+":"+data.httpPath);
		}
	});
	/**
	 * 绑定返回按钮
	 */
	$("#backbtn").click(function() {
		back();
	});
	/**
	 * 绑定保存方法
	 */
	$("#saveInfo").click(function(e){
		// 表单验证
		if (!$('#receivablesForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}
		
		var bankAccountNumber = $("#bankAccountNumber").val();
		var bankName = $("#bankName").val();
		var bankAccountName = $("#bankAccountName").val();
		var tradeAmount = $("#tradeAmount").val();
		var remark = $("#remark").val();
		var financeCollectionId = $("#financeCollectionId").val();
		var brokerageType = $("#brokerageType").val();
		var imgInfo = $("#imgInfo").val();
		var residueAmount = $("#residueAmount").val();

		var footprintReg = /^\d+(\.\d+)?$/;
		if(! footprintReg.test(bankAccountNumber)){
            Common.messageBox("提示", "请输入正确的银行帐号！", false);
            return false;
        }
		
        if(! footprintReg.test(tradeAmount)){
            Common.messageBox("提示", "请输入正确的交易金额！", false);
            return false;
        }
        
        if(tradeAmount > residueAmount){
        	Common.messageBox("提示", "交易金额大于剩余追回金额！", false);
            return false;
        }
        
    	if(imgInfo=='' || imgInfo == null){
			Common.messageBox("提示", "请输上传截图附件！", false);
            return false;
		}
        
		$.ajax({
			url : "savereceivables",
			type : "post",
			data : {
				bankAccountNumber : bankAccountNumber,
				bankName : bankName,
				bankAccountName : bankAccountName,
				tradeAmount : tradeAmount,
				remark : remark,
				financeCollectionId : financeCollectionId,
				brokerageType : brokerageType,
				imgInfo : imgInfo
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.alert(json.msg, true, function() {
						back();
					});
				} else {
					Common.messageBox("提示", json.msg, false);
				}
			},
			error : function() {
				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
			}
		});
	});
	
	// 定义申请审核页面验证
	Common.formValidate("receivablesForm", {
		bankAccountNumber : {
			required : true,
			maxlength : 32
		},
		bankName : {
			required : true,
			maxlength : 63
		},
		bankAccountName : {
			required : true,
			maxlength : 63
		},
		tradeAmount : {
			required : true
		},
		remark : {
			required : true,
			maxlength : 128
		}
	}, {
		bankAccountNumber : {
			required : "账号不能为空",
			maxlength : "账号不能超过20个字"
		},
		bankName : {
			required : "开户银行不能为空",
			maxlength : "开户银行不能超过64个字"
		},
		bankAccountName : {
			required : "账户名称不能为空",
			maxlength : "账户名称不能超过64个字"
		},
		tradeAmount : {
			required : "收款金额不能为空"
		},
		remark : {
			required : "备注不能为空",
			maxlength : "备注不能超过128个字"
		}
	});
	
	/**
	 * 返回
	 */
	function back(){
		location.href = "../brokerage/tobrokeragerecover";
	}
});