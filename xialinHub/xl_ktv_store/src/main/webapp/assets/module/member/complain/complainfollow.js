$(function ($) {
    $('#saveBtn').click(function () {
        var memberComplainId = $('#memberComplainId').val();
        var answerContent = $('#answerContent').val();
        if (answerContent == null || answerContent == ''){
            alert('回复内容不能为空!');
            return
        }
        $.ajax({
            url: "../membercomplain/addcomplainanswer",
            type: "post",
            data: {answerContent : answerContent, memberComplainId : memberComplainId},
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