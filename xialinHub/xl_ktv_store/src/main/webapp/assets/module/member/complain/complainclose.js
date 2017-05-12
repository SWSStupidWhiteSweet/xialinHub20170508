$(function ($) {
    $('#saveBtn').click(function () {
        var memberComplainId = $('#memberComplainId').val();
        var closeReason = $('#closeReason').val();
        if (closeReason == null || closeReason == ''){
            alert('关闭原因不能为空!');
            return
        }
        $.ajax({
            url: "../membercomplain/updateclose",
            type: "post",
            data: {closeReason : closeReason, memberComplainId : memberComplainId},
            dataType: "json",
            success: function (json) {
                if(json.isSuccess){
                    Common.alert(json.msg, true, function() {
                    	window.location = "../membercomplain/index";
                    });
                }else{
                    Common.messageBox("提示", json.msg, false);
                }
                Common.hideMask();
            },
            error: function () {
                Common.messageBox("提示", "投诉关闭失败，请稍候再试！！", false);
                Common.hideMask();
            }
        });
    });
    $('#vacationBtnReset').click(function () {
        window.history.go(-1);
    });
});