/**
 * @Company : 重庆锐云科技有限公司
 * @Project : polyV2
 * @Author : LY
 * @Date : 2017/3/19 12:56
 * @Description: 申请退款页面js
 */
$(function($) {

    /*上传控件js*/
    $("#uploadFile").uploadifive({
//		buttonClass : "btn btn-success",
        buttonText : "选择文件",
        uploadScript : "../../common/upload/file",
        fileSizeLimit : 1024 * 20,
        fileType : "image/*",
        queueSizeLimit : 1,
        removeCompleted : true,
        onUploadComplete : function(file, data) {
            var jsonData = eval("(" + data + ")");
            if(jsonData[0].srcFileName && jsonData[0].httpPath){
                Common.messageBox("提示", "文件上传成功！", true);
                var imgLi = '<li style="border: 1px solid #333;" >';
                imgLi += '<input type="hidden" name="img_url" value="'+ jsonData[0].httpPath + '" />';
                imgLi += '<input type="hidden" name="img_name" value="'+ jsonData[0].srcFileName + '" />';
                imgLi += '<input type="hidden" name="img_type" value="退款附件" />';
                imgLi += '<a href="'+refundPaths+jsonData[0].httpPath.replace("s_","l_")+'"title="退款附件" data-rel="colorbox">';
                imgLi += '<img class="building_house_img" src="'+refundPaths+jsonData[0].httpPath.replace("s_","")+'" > </a>';
                imgLi += '<div class="favourable msgDiv">';
                imgLi += '<span class="lbl cancleY" onclick="deleteFj(this);" >删除</span>';
                imgLi += '<span class="lbl cancleN">退款附件</span> </div> </li>';
                $("#attImg").append(imgLi);
                refreshFjs();
            }else{
                Common.messageBox("提示", "文件上传失败！", false);
            }
        }/*,
        onError: function (errorType) {
            Common.messageBox("提示", "文件上传错误："+errorType, false);
        }*/
    });

    /*返回按钮*/
    $("#btnReset").click(back);

    function back() {
        location.href = "index";
    }

    /**
     * 提交审核
     *          1.判断该订单当日是否有流水
     */
    $("#subRefundApplyBtn").click(function () {
        $.post(
            refundPaths+"/financial/orderrefundapply/isHaveNowDayPosFinancial",
            {'orderInfoId':$("#orderInfoId").val()},
            function (data) {
                if(data.isSuccess){
                    Common.messageBox("提示", data.msg, true);
                }else{
                    addRefund();
                }
            }
        );
    });

    /**
     * 2.判断附件是否上传
     * 3.判断当前退款方式
     * 4.判断退款指定账号信息
     * 5.存储退款申请流程
     * @returns {boolean}
     */
    function addRefund(){
        var orderAttachmentNames = $("#orderAttachmentNames").val();
        var orderAttachmentUrls = $("#orderAttachmentUrls").val();
        /*if(orderAttachmentUrls=="" || orderAttachmentNames==""){
            Common.messageBox("提示", "请上传退款申请附件!", false);
            return false;
        };*/

        var isToSrc = 1;//1(原卡退还)    0(非原卡退还)
        $(".isToSrc").each(function() {
            if($(this).hasClass("active")){
                isToSrc = $(this).attr("value");
            }
        });
        var isAppoint = $("input[name='isAppoint']:checked").val();//原卡退还时:1(退回到一张卡) 0(全部原卡退还)是否指定账号

        var params = null;
        if(isToSrc==0){
            isAppoint=1;
            if($("#bankAccountName").val().trim()==""||$("#bankName").val().trim()==""||$("#bankAccountNumber").val().trim()==""){
                Common.messageBox("提示", "非原卡原退方式请填写全部指定信息!", false);
                return false;
            }else {
                if (!new RegExp("^[0-9]*$").test($("#bankAccountNumber").val()) || $("#bankAccountNumber").val().length > 20) {
                    Common.messageBox("提示", "请填正确卡号!", false);
                    return false;
                }
                //请求后台
                params = {
                    /*'orderAttType':orderAttType,*//*订单附件类型：5（退款附件）*/
                    'isToSrc':isToSrc,
                    'isAppoint':isAppoint,
                    'bankAccountName':$("#bankAccountName").val(),
                    'bankName':$("#bankName").val(),
                    'bankAccountNumber':$("#bankAccountNumber").val(),
                    'orderAttachmentNames':$("#orderAttachmentNames").val(),
                    'orderAttachmentUrls':$("#orderAttachmentUrls").val(),
                    'orderInfoId':$("#orderInfoId").val(),
                    'fingerprint':$("#fingerprint").val()
                };
                //addRefundInfo(params);
                //blpc.initFlowSelectOption('refund',addRefundInfo,params);
                initFlowSelectOption(addRefundInfo,params);

            }
        }else {
            if (isAppoint == undefined) {
                Common.messageBox("提示", "请选择原卡原退的退回方式!", false);
                return false;
            }else if(isAppoint==0) {
                var checkLength = $("input[name='checkCardInfo']:checked").length;
                if (checkLength==0 || checkLength < $("#refundInfoSize").val()) {
                    Common.messageBox("提示", "全部原卡原退方式<br/>请选择所有退款信息!", false);
                    return false;
                }else{
                    var selectRefundInfos = getSelectRefundInfo();
                    if(selectRefundInfos=="[]"){
                        Common.messageBox("提示", "退款持卡人或开户行值为空！请确认信息。", false);
                        return false;
                    };
                    Common.confirm("确定全部金额:"+$("#refundNum").text()+"退还到选择账号？",function refundFlow(){
                        params = {
                            /*'orderAttType':orderAttType,*/
                            'isToSrc':isToSrc,
                            'isAppoint':isAppoint,
                            /*'fileInfo':toSvaeFileInfo,*/
                            'orderAttachmentNames':$("#orderAttachmentNames").val(),
                            'orderAttachmentUrls':$("#orderAttachmentUrls").val(),
                            'orderInfoId':$("#orderInfoId").val(),
                            'fingerprint':$("#fingerprint").val(),
                            'selectRefundInfos':selectRefundInfos
                        };
                        //blpc.initFlowSelectOption('refund',addRefundInfo,params);
                        initFlowSelectOption(addRefundInfo,params);
                        //addRefundInfo(params);
                    });
                }
            }else if(isAppoint==1){
                var checkLength = $("input[name='checkCardInfo']:checked").length;
                if(checkLength==1){
                    var selectRefundInfos = getSelectRefundInfo();
                    if(selectRefundInfos=="[]"){
                        Common.messageBox("提示", "退款持卡人或开户行值为空！请确认信息。", false);
                        return false;
                    };
                    Common.confirm("确定全部金额:"+$("#refundNum").text()+"退还到选择账号？",function refundFlow(){
                        params = {
                            /*'orderAttType':orderAttType,*/
                            'isToSrc':isToSrc,
                            'isAppoint':isAppoint,
                            /*'finacneDistributionId':selectObject[0].finance_distribution_id,
                            'fileInfo':toSvaeFileInfo,*/
                            'orderAttachmentNames':$("#orderAttachmentNames").val(),
                            'orderAttachmentUrls':$("#orderAttachmentUrls").val(),
                            'orderInfoId':$("#orderInfoId").val(),
                            'fingerprint':$("#fingerprint").val(),
                            'selectRefundInfos':selectRefundInfos
                        };
                        //alert("发起退款流程！");
                        initFlowSelectOption(addRefundInfo,params);
                        //addRefundInfo(params);
                    });
                }else{
                    Common.messageBox("提示", "原卡原退指定卡号方式<br/>请选择退款信息且只选择一条记录!", false);
                    return false;
                }
            }
        }
    }

    /**
     * 获取退款选定信息
     */
    function getSelectRefundInfo(){
        var result = [];
        $("input[name='checkCardInfo']:checked").each(function () {
            var finance_distribution_id = $(this).parent().parent().prev().html().trim();
            var account_name = $("#account_name"+finance_distribution_id).val();
            var bank_name = $("#bank_name"+finance_distribution_id).val();
            if (bank_name=="" || account_name==""){
                return false;
            }
            var jsonObj = {
                'financeDistributionId' : finance_distribution_id,
                'payAccountName' : account_name,
                'payBankName' : bank_name};
            result.push(jsonObj);
        });
        return JSON.stringify(result);
    }

    /**
     * 保存添加退款信息
     * @param params
     */
    function addRefundInfo(params) {
        /*开始异步保存数据*/
        Common.showMask();
        $.ajax({
            url: refundPaths + "/financial/orderrefundapply/add",
            type: "post",
            data: params,
            dataType: "json",
            success: function (json) {
                if(json.isSuccess){
                    //Common.messageBox("提示", json.msg, true);
                    Common.alert(json.msg,true,function () {
                        window.location = refundPaths+"/financial/orderrefundapply/index";
                        Common.showMask();
                    });
                }else{
                    Common.messageBox("提示", json.msg, false);
                }
                Common.hideMask();
            },
            error: function () {
                Common.messageBox("提示", "保存退款申请记录失败，请稍候再试！！", false);
                Common.hideMask();
            }
        });
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
                            Common.hideMask();
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

    /*流程选择下拉框*/
    Common.initSelect2("refundFlows", {
        width: "200px"
    });

});
