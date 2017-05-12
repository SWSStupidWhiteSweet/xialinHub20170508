/**
 * @Company : 重庆锐云科技有限公司
 * @Project : polyV2
 * @Author : LY
 * @Date : 2017/3/30 12:56
 * @Description: 退款待审核流程页面js
 */
$(function($) {

    var auditPath="";
    if(openType=='audit'){
        auditPath = refundAuditFlowPaths+"/financial/orderrefundapply/audit";
    }
    if(openType=='view'){
        $("#passBtn").hide();
        $("#noPassBtn").hide();
        $("#opinionDiv").hide();
    }else{
        $("#passBtn").click(function () {
            auditApply('1');
        });
        $("#noPassBtn").click(function () {
            auditApply('2');
        });
    }
    $("#backBtn").click(function () {
        backView(openType);
    });

    function auditApply(auditStatue){
        var opinion = $("#vacationRemark").val();
        if(opinion.length>=128){
            Common.messageBox("提示", "您填写的意见超出最大范围！", false);
            return false;
        }
        if(opinion==""){
            Common.messageBox("提示", "请填写审批意见！", false);
            return false;
        }
        var param = {
            auditStatue:auditStatue,
            opinion:$("#vacationRemark").val(),
            orderInfoId:$("#orderInfoId").val(),
            orderRefundApplyId:$("#orderRefundApplyIds").val(),
            fingerprint:$("#orderFingerprint").val(),
            refundfingerprint:$("#refundfingerprint").val()
        };
        /*if(openType=='audit'&&auditStatue=="1"){
            //这种结果需要发起流程
           initFlowSelectOption(auditApplyAjax,param);
        }else{*/
            auditApplyAjax(param);
        /*}*/
    }

    /**
     * 退款流程
     */
    function initFlowSelectOption(callBackFun,callBackFunParams){
        var dialog = $("#refundFlow").removeClass('hide')
            .dialog(
                {
                    modal : true,
                    title : "<div class='widget-header widget-header-small'>" +
                    "<h4 class='smaller'><i class='ace-icon fa fa-search'></i> 流程选择框</h4>" +
                    "</div>",
                    title_html : true,
                    width : "400px",
                    buttons : [ {
                        text : "取消",
                        "class" : "btn btn-xs",
                        click : function() {
                            $(this).dialog("close");
                        }
                    }, {
                        text : "确认",
                        "class" : "btn btn-primary btn-xs",
                        click : function() {
                            var flowDefineIds =$('#refundFlows').val();
                            if(flowDefineIds){
                                callBackFunParams.flowDefineId=flowDefineIds;
                                callBackFun(callBackFunParams);
                                //$(this).dialog("close");
                            }else{
                                Common.alert("请选择要发起的流程！",true);
                            }
                        }
                    } ]
                });
    }

    /**
     * 审核结果提交
     * @param param
     */
    function auditApplyAjax(param){
        Common.showMask();
        $.ajax({
            url : auditPath,
            type : "post",
            data : param,
            dataType : "json",
            success : function(json) {
                Common.hideMask();
                if(json.isSuccess){
                    Common.alert(json.msg,true,function () {
                        window.location=refundAuditFlowPaths+"/flow/toflowwaitauditlist";
                        Common.showMask();
                    });
                }else{
                    Common.messageBox("提示",json.msg,false);
                }
            },
            error : function() {
                Common.hideMask();
                Common.messageBox("提示","审批失败，请稍候再试！",false);
            }
        });
    }

    /*流程选择下拉框*/
    Common.initSelect2("refundFlows", {
        width: "200px"
    });

    /**
     * 返回
     * @param openType
     */
    function backView(openType){
        if(openType=='audit'){
            window.location=refundAuditFlowPaths+"/flow/toflowwaitauditlist";
        }else{
            window.location=refundAuditFlowPaths+"/flow/toflowhaveauditlist";
        }
        Common.showMask();
    }
})