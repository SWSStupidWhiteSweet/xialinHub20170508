/**
 * @Company : 重庆锐云科技有限公司
 * @Project : polyV2
 * @Author : LY
 * @Date : 2017/3/20. 10:22
 * @Description: 退房审核未通过页面js
 */
$(function($) {
    /** **************************************构造jqGrid start *************************************** */
    var failAuditGridSelector = "#failAuditGird-table";
    var failAuditPagerSelector = "#failAuditGird-pager";
    var failClick=0;
    $("#fail").click(function () {
        if(failClick==0) {
            failClick = 1;
            // 构造jqGrid配置信息
            var failJqGridOption = new Common().createGridOption({
                pagerSelector: failAuditPagerSelector,
                gridSelector: failAuditGridSelector,
                parentDOMClass: "failAuditGird",
                title: "退房审核未通过列表",
                url: auditVacationPaths + "/order/auditvacation/getvacationauditgrid?auditStatus=2",
                postData: {},
                multiSelect: true,
                /*widthOffset:"-1522px",*/
                height: "500px",
                sortName: "audit_time",
                sortOrder: "desc",
                colNamesArray: ['订单ID', '退房申请ID', '订单号', '商户名称', '客户姓名', '客户手机号'
                    , '项目名称', '城市', '项目类型', '渠道类型','认购房源', '认购户型'
                    , '认购总价', '网签总价', '认购时间','申请人','申请时间'
                    ,'审核人','审核时间','审核意见','备注'],
                colModel: [{
                    name: "orderInfoId",
                    index: "order_info_id",
                    width: 60,
                    sorttype: "int",
                    editable: false,
                    hidden: true
                }, {
                    name: "orderVacationApplyId",
                    index: "order_vacation_apply_id",
                    width: 60,
                    sorttype: "int",
                    editable: false,
                    hidden: true
                }, {
                    name: "orderInfoCode",
                    index: "order_info_code",
                    width: 60,
                    sorttype: "string",
                    align: "center",
                    editable: false
                }, {
                    name: "merchantName",
                    index: "merchant_name",
                    width: 60,
                    sorttype: "string",
                    editable: false
                }, {
                    name: "customName",
                    index: "custom_name",
                    width: 60,
                    sorttype: "string",
                    editable: false
                }, {
                    name: "customTel",
                    index: "custom_tel",
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
                    name: "cityName",
                    index: "city_name",
                    width: 60,
                    sorttype: "string",
                    editable: false
                }, {
                    name: "packageType",
                    index: "package_type",
                    width: 60,
                    sorttype: "int",
                    editable: false,
                    formatter: packageTypeFormatter
                }, {
                    name: "channelType",
                    index: "channel_type",
                    width: 60,
                    sorttype: "int",
                    editable: false,
                    formatter: channelTypeFormatter
                }, {
                    name: "houseInfo",
                    index: "houseInfo",
                    width: 60,
                    sorttype: "string",
                    editable: false
                }, {
                    name: "houseType",
                    index: "house_type",
                    width: 60,
                    sorttype: "string",
                    editable: false
                }, {
                    name: "houseAmount",
                    index: "house_amount",
                    width: 60,
                    sorttype: "int",
                    editable: false
                }, {
                    name: "onlineSignAmount",
                    index: "online_sign_amount",
                    width: 60,
                    sorttype: "int",
                    editable: false
                }, {
                    name: "realBuyTime",
                    index: "real_buy_time",
                    width: 60,
                    sorttype: "string",
                    editable: false
                }, {
                    name: "operatorName",
                    index: "operator_name",
                    width: 60,
                    sorttype: "string",
                    editable: false
                }, {
                    name: "createTime",
                    index: "create_time",
                    width: 60,
                    sorttype: "string",
                    editable: false,
                    formatter:dateTimeFormatter
                }, {
                    name: "auditOperatorName",
                    index: "audit_operator_name",
                    width: 60,
                    sorttype: "string",
                    editable: false
                }, {
                    name: "auditTime",
                    index: "audit_time",
                    width: 60,
                    sorttype: "string",
                    editable: false,
                    formatter:dateTimeFormatter
                }, {
                    name: "auditOpinion",
                    index: "opinion",
                    width: 60,
                    sorttype: "string",
                    editable: false
                }, {
                    name: "remark",
                    index: "remark",
                    width: 60,
                    sorttype: "string",
                    editable: false
                }]
            });

            // 渲染表格
            $(failAuditGridSelector).jqGrid(failJqGridOption);
            $(failAuditGridSelector).setGridWidth($(window).width() * 0.975);
            /*$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变
            var failGridRecords = $(failAuditGridSelector).jqGrid('getGridParam','records');
            if(failGridRecords == 0 || failGridRecords == null){
                $(failAuditGridSelector).setGridWidth($(window).width() * 0.975,true);
            }else{
                $(failAuditGridSelector).setGridWidth($(window).width() * 0.975,false);
            }*/
        }else {
            Common.jqGridReload(failAuditGridSelector);
            $(failAuditGridSelector).setGridWidth($(window).width() * 0.975);
        }
    });

    /*点击刷新退房审核失败列表页面*/
    /*$("#fail").click(function () {
        Common.jqGridReload(failAuditGridSelector);
        if(failGridRecords == 0 || failGridRecords == null){
            $(failAuditGridSelector).setGridWidth($(window).width() * 0.975,true);
        }else{
            $(failAuditGridSelector).setGridWidth($(window).width() * 0.975,false);
        }
    });*/

    /*日期区间选择*/
    $('#failStartTime').daterangepicker({
        applyClass : 'btn-sm btn-success',
        cancelClass : 'btn-sm btn-default',
        locale: {
            applyLabel: '确认',
            cancelLabel: '取消',
            fromLabel : '起始时间',
            toLabel : '结束时间',
            customRangeLabel : '自定义',
            firstDay : 1
        },
        ranges : {
            //'最近1小时': [moment().subtract('hours',1), moment()],
            '今日': [moment().startOf('day'), moment()],
            '昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
            '最近7日': [moment().subtract('days', 6), moment()],
            '最近30日': [moment().subtract('days', 29), moment()],
            '本月': [moment().startOf("month"),moment().endOf("month")],
            '上个月': [moment().subtract(1,"month").startOf("month"),moment().subtract(1,"month").endOf("month")]
        },
        opens : 'right',    // 日期选择框的弹出位置
        separator : ' 至 ',
        showWeekNumbers : true,     // 是否显示第几周
        //timePicker: true,
        //timePickerIncrement : 10, // 时间的增量，单位为分钟
        //timePicker12Hour : false, // 是否使用12小时制来显示时间
        //maxDate : moment(),           // 最大时间
        format: 'YYYY-MM-DD'
    }, function(start, end, label) { // 格式化日期显示框
        $('#beginTime').val(start.format('YYYY-MM-DD'));
        $('#endTime').val(end.format('YYYY-MM-DD'));
    })
        .next().on('click', function(){
        $(this).prev().focus();
    });

    /*省市联动*/
    Common.initSelect2("failProvince", {
        allowClear : true,
        minimumResultsForSearch : Infinity,
        width : "200px"
    });

    Common.initSelect2("failCity", {
        allowClear : true,
        minimumResultsForSearch : Infinity,
        width : "200px"
    });

    /*渠道类型下拉初始化*/
    Common.initSelect2("failChannelType", {
        width: "200px"
    });

    /*项目类型下拉初始化*/
    Common.initSelect2("failPackageType", {
        width: "200px"
    });

    /*订单状态下拉初始化*/
    Common.initSelect2("failOrderStatus", {
        width: "200px"
    });

    /*项目下拉初始化*/
    Common.initSelect2("failProjectInfoId", {
        width: "200px"
    });

    /*楼盘下拉初始化*/
    Common.initSelect2("failBuildingProjectId", {
        width: "200px"
    });

    /**
     * 退房待审核条件搜索 --从新加载数据
     */
    $('#searchFail').click(function () {
        var dialog = $("#failCondition").removeClass('hide')
            .dialog(
                {
                    modal : true,
                    title : "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-search'></i> 请选择查询条件</h4></div>",
                    title_html : true,
                    width : "800px",
                    buttons : [ {
                        text : "取消",
                        "class" : "btn btn-xs",
                        click : function() {
                            $(this).dialog("close");
                        }
                    }, {
                        text : "查询",
                        "class" : "btn btn-primary btn-xs",
                        click : function() {
                            var params = {
                                timeFlag:$('#failTimeFlag option:selected').val(),
                                startTime :$('#failStartTime').val(),
                                orderInfoCode :$('#failOrderInfoCode').val(),
                                channelType : $('#failChannelType').val(),
                                customName : $('#failCustomName').val(),
                                customTel : $('#failCustomTel').val(),
                                provinceId : $('#failProvince').val(),
                                cityId : $('#failCity').val(),
                                buildingProjectId :$('#failBuildingProjectId').val(),
                                projectInfoId : $('#failProjectInfoId').val(),
                                packageType :$('#failPackageType').val(),
                                orderStatus : $('#failOrderStatus').val(),
                                brokerName :$('#failBrokerName').val(),
                                brokerTel :$('#failBrokerTel').val(),
                                auditStatus:2
                            };
                            Common.jqGridReload("#failAuditGird-table", params);
                            $(this).dialog("close");
                        }
                    } , {
                        text : "重置",
                        "class" : "btn btn-primary btn-xs",
                        click : function() {
                            $("#failTimeFlag").val("0");
                            $("#failStartTime").val("");
                            $("#failOrderInfoCode").val("");
                            $("#failChannelType").select2("val", "");
                            $('#failCustomName').val("");
                            $("#failCustomTel").val("");
                            $('#failProvince').select2("val", "");
                            $('#failProvince').trigger("change");
                            $('#failPackageType').select2("val", "");
                            $('#failOrderStatus').select2("val", "");
                            $("#failBrokerName").val("");
                            $("#failBrokerTel").val("");
                        }
                    }]
                });
    });

    /**
     * 导出退款申请列表
     */
    $("#failExcel").click(function() {
        var params = {
            timeFlag:$('#failTimeFlag option:selected').val(),
            startTime :$('#failStartTime').val(),
            orderInfoCode :$('#failOrderInfoCode').val(),
            channelType : $('#failChannelType').val(),
            customName : $('#failCustomName').val(),
            customTel : $('#failCustomTel').val(),
            provinceId : $('#failProvince').val(),
            cityId : $('#failCity').val(),
            buildingProjectId :$('#failBuildingProjectId').val(),
            projectInfoId : $('#failProjectInfoId').val(),
            packageType :$('#failPackageType').val(),
            orderStatus : $('#failOrderStatus').val(),
            brokerName :$('#failBrokerName').val(),
            brokerTel :$('#failBrokerTel').val(),
            auditStatus:2
        };
        var options={
            ajax:true,
            url:auditVacationPaths+"/order/auditvacation/passorfailexcel",
            data:params,
            param:params
        };
        Common.exportGrid(options);
    });
});
