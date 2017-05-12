$(function($) {
	/**
	 * 绑定返回事件
	 */
	$("#backBtn").click(function() {
		back();
	});
	/**
	 * 绑定通过事件
	 */
	$("#agree").click(function(){
		var historyTotal = $("#historyTotal").val();
		if(historyTotal>0){
			Common.confirm("你审核的日志之前仍然有未审核数据，确定要审核当前数据，并且将之前的数据置为不通过嘛？",function(){
				auditProject('agree','yes','系统默认审核');
			});
		}else{
			auditProject('agree','no');
		}
	});
	/**
	 * 绑定不通过事件
	 */
	$("#noAgree").click(function(){
		Common.prompt("请输入拒绝理由!","请输入拒绝理由",function(noAgreeRemark){
			auditProject('noAgree','no',noAgreeRemark);
		});
	});
	/**
	 * 审核方法
	 * isUpdateHis		是否连同当前审核这条以前的未审核的一起审核通过，
	 * noAgreeRemark	审核不通过理由
	 */
	function auditProject(type,isUpdateHis,noAgreeRemark){
		var houseLogId = $("#houseLogId").val();
		$.ajax({
			url : "audit",
			type : "post",
			dataType : "json",
			data : {
                houseLogId : houseLogId,
				type : type,
				isUpdateHis : isUpdateHis,
				noAgreeRemark : noAgreeRemark
			},
			success : function(json) {
				if (json.isSuccess) {
					Common.alert(json.msg,true,function(){
						back();
					});
				} else {
					Common.alert(json.msg,false);
				}
			}
		});
	}
	function back(){
		location.href = "../../buildingproject/modify?buildingProjectId="+$('#buildingProjectId').val()+"&type=houseInfoLog";
	}

    /**
     * 回显图片
     * @type {*}
     */
        var houseImgListImage=$('#houseImgListImage').attr("data-value");
        echo(houseImgListImage,"houseImgListImage","info");
        var houseImgListImageLog=$('#houseImgListImageLog').attr("data-value");
        echo(houseImgListImageLog,"houseImgListImageLog","loginfo");
        var showHouseListImg=$('#showHouseListImg').attr("data-value");
        echo(showHouseListImg,"showHouseListImg","info");
        var showHouseListImgLog=$('#showHouseListImgLog').attr("data-value");
        echo(showHouseListImgLog,"showHouseListImgLog","loginfo");

        
    
});

function echo(ids,divId,type) {
	var url="";
	if(type=="info"){
		url="picbyids";
	}else {
		url="piclogbyids";
	}
    $.ajax({
        url: url,
        type: "post",
        data: {
            ids:ids
        },
        dataType : "json",
        success: function (json) {
            var jsonArr=eval(json);
            var showHouse="";
            for(var i=0;i<jsonArr.length;i++){
                    var htmlstr='<span ><img  style="width: 200px;height: 200px;" src="'+"../../" + jsonArr[i].albumPicUrl+'"></span>';
                    showHouse+=htmlstr;
            }

            $("#"+divId).html(showHouse);
        }

        ,
        error : function () {
            Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
        }
    });

}