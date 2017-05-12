$(function($) {
	$('#isundetermined').on('click', function() {
		var price = $("#buildingInfoPrice");
		if($(this).attr("checked")=="checked"){
			price.val("");
			$(this).removeAttr("checked");
			price.removeAttr("readonly");
		}else{
			price.val("0");
			$(this).attr("checked","checked");
			price.attr("readonly","readonly");
		}
	});
	Common.initSelect2("saleStatus", {
		width : "180px"
	});
	
	Common.initSelect2("status", {
		width : "180px"
	});
	/**
	 * 绑定返回事件
	 */
	$("#backBtn").click(function() {
		back();
	});
	
	/**
	 * 保存
	 */
	$("#saveBtn").click(function(e) {
		//表单验证
		if (!$('#buildingInfoForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}
		//获取页面数据
		var actionType = $("#type").val();
		var url = actionType == "add" ? "create" : "update";
		
		var buildingProjectId = $("#buildingProjectId").val();
		var buildingInfoId = $("#buildingInfoId").val();
		var buildingInfoName = $("#buildingInfoName").val();
		var buildingInfoNa = $("#buildingInfoNa").val();
		var buildingInfoAlias = $("#buildingInfoAlias").val();
		var biref = $("#biref").val();
		var saleStatus = $("#saleStatus").val();
		var status = $("#status").val();
		var buildingInfoPrice = $("#buildingInfoPrice").val();

		if($("#isundetermined").attr("checked")!="checked" && !/^[0-9]*[1-9][0-9]*$/.test(buildingInfoPrice)){
			Common.messageBox("提示", "请填写正确的均价！", false);
			return false;
		}
		if($("#isundetermined").attr("checked")=="checked"){
            buildingInfoPrice=0;
		}
		//验证下来选
		if(!saleStatus){
			Common.messageBox("提示", "请选择销售状态！", false);
			$("#saleStatus").select2("open");
			return false;
		}
		if(!status){
			Common.messageBox("提示", "请选择状态！", false);
			$("#status").select2("open");
			return false;
		}
		
		//交互
		$.ajax({
			url : url,
			type : "post",
			data : {
				buildingInfoId : buildingInfoId,
				buildingProjectId : buildingProjectId,
				buildingInfoName : buildingInfoName,
				buildingInfoNa : buildingInfoNa,
				buildingInfoAlias : buildingInfoAlias,
				biref : biref,
				buildingInfoPrice : buildingInfoPrice,
				saleStatus : saleStatus,
				status : status
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.alert(json.msg, true, function(){
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
	
	//定义验证提示
	Common.formValidate("buildingInfoForm", {
		buildingInfoName: {
            required: true,
            maxlength: 48
        },
        buildingInfoNa: {
            required: true,
            maxlength: 48
        },
        buildingInfoAlias: {
            required: true,
            maxlength: 48
        },
        biref: {
            required: true
        },
        saleStatus: {
            required: true
        },
        buildingInfoPrice: {
            required: true
        }
    }, {
    	buildingInfoName: {
            required: "楼盘期数名称不能为空.",
            maxlength: "楼盘期数名称不能超过48个汉字."
        },
        buildingInfoNa: {
            required: "楼盘期数简称不能为空.",
            maxlength:  "楼盘期数简称不能超过48个字."
        },
        buildingInfoAlias: {
            required: "楼盘期数别名不能为空",
            maxlength: "楼盘期数别名不能超过48个字."
        },
        biref:{
            required: "楼盘期数简介不能为空.",
            maxlength: "物业公司名称不能超过40个字"
        },
        saleStatus: {
            required: "请选择销售状态."
        },
        buildingInfoPrice: {
            required: "楼盘期数均价不能为空."
        }
    });
	/**
	 * 返回方法
	 */
	function back(){
		location.href = "../buildingproject/modify?buildingProjectId="+$("#buildingProjectId").val()+"&type="+"buildingInfoDiv";
	}
});