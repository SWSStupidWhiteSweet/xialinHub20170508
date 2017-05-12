/**
 * Created by thinkpad2 on 2017/3/17.
 */
$(function($) {
    /** **************************************构造jqGrid start *************************************** */
    var gridSelector = "#vacationOrderGrid-table";
    /*var pagerSelector = "#vacationOrderGrid-pager";*/
    var orderInfoId = $("#orderInfoId").val();
    // 构造jqGrid配置信息
    var jqGridOption = new Common().createGridOption({
        /*pagerSelector: pagerSelector,*/
        gridSelector: gridSelector,
        parentDOMClass: "vacationOrderGird",
        /*title: "订单信息",*/
        url: vacationPaths + "/order/vacation/getgriddata?orderInfoId="+orderInfoId,
        postData: {},
        multiSelect: false,
        height: "80px",
        /*widthOffset:"-1000px",*/
        sortName: "create_time",
        sortOrder: "desc",
        colNamesArray: ['订单ID','订单号', '客户', '项目', '渠道归属'
            , '报备人', '所属门店', '当前状态', '已收认筹金额', '认筹日期'],
        colModel: [{
            name: "orderInfoId",
            index: "order_info_Id",
            width: 60,
            sorttype: "string",
            align: "center",
            editable: false,
             hidden: true
        }, {
            name: "orderInfoCode",
            index: "order_info_code",
            width: 60,
            sorttype: "string",
            align: "center",
            editable: false/*,
             hidden: true*/
        }, {
            name: "customName",
            index: "custom_name",
            width: 60,
            sorttype: "string",
            editable: false
        }, {
            name: "projectInfoName",
            index: "project_info_name",
            width: 60,
            sorttype: "string",
            editable: false
        }, {
            name: "channelType",
            index: "channel_type",
            width: 60,
            sorttype: "string",
            editable: false,
            formatter: channelTypeFormatter
        }, {
            name: "brokerName",
            index: "broker_name",
            width: 60,
            sorttype: "string",
            editable: false
        }, {
            name: "storeName",
            index: "store_name",
            width: 60,
            sorttype: "string",
            editable: false
        },{
            name: "orderStatus",
            index: "order_status",
            width: 60,
            sorttype: "int",
            editable: false,
            formatter: orderStatusFormatter
        },{
            name: "realAccAmount",
            index: "real_acc_amount",
            width: 60,
            sorttype: "int",
            editable: false
        },{
            name: "groupBuyTime",
            index: "group_buy_time",
            width: 60,
            sorttype: "string",
            editable: false,
            formatter:dateFormatter
        }]
    });

    // 渲染表格
    $(gridSelector).jqGrid(jqGridOption);

    $(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变



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
                imgLi += '<input type="hidden" name="img_type" value="退房附件" />';
                imgLi += '<a href="'+vacationPaths+jsonData[0].httpPath.replace("s_","l_")+'"title="退房附件" data-rel="colorbox">';
                imgLi += '<img class="building_house_img" src="'+vacationPaths+jsonData[0].httpPath.replace("s_","")+'" > </a>';
                imgLi += '<div class="favourable msgDiv">';
                imgLi += '<span class="lbl cancleY" onclick="deleteFj(this);" >删除</span>';
                imgLi += '<span class="lbl cancleN">退房附件</span> </div> </li>';
                $("#attImg").append(imgLi);
                refreshFjs();
            }else{
                Common.messageBox("提示", "文件上传失败！", false);
            }
        }
    });

    /*日期插件*/
    $('.date-picker').datepicker({
        autoclose:true,
        startDate:new Date()
    });

    /*返回按钮*/
    $("#vacationBtnReset").click(back);

    function back() {
        location.href = vacationPaths+"/financial/orderrefundapply/index?pageFlag=vacationPlag";
    }

    /*保存按钮*/
    $("#saveBtn").click(function () {

        if(!$("#vacationTime").val()){
            Common.messageBox("提示", "请选择退房时间！", false);
            return false;
        }
        /*if(!$("#orderAttachmentName").val() || !$("#orderAttachmentUrl").val()){
            Common.messageBox("提示", "请上传附件！", false);
            return false;
        }*/
        $.post(
            vacationPaths+"/order/vacation/save",
            $("#vacationForm").serialize(),
            function (data) {
                if(data.isSuccess){
                    //Common.messageBox("提示", data.msg, true);
                    Common.alert(data.msg,true,function () {
                        window.location = vacationPaths+"/financial/orderrefundapply/index?pageFlag=vacationPlag";
                        Common.showMask();
                    });
                }else{
                    Common.messageBox("提示", data.msg, false);
                }
            }
        );
    });

});