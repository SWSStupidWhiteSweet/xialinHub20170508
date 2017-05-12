/**
 * @Company : 重庆锐云科技有限公司
 * @Project : polyV2
 * @Author : LY
 * @Date : 2017/3/14 12:56
 * @Description: 退款/房管理js
 */
$(function($) {
    /** **************************************构造jqGrid start *************************************** */
    var gridSelector = "#refundGrid-table";
    var pagerSelector = "#refundGrid-pager";

    // 构造jqGrid配置信息
    var jqGridOption = new Common().createGridOption({
        /*shrinkToFit:false,
        autoScroll: true,
        autowidth:true,*/
        pagerSelector: pagerSelector,
        gridSelector: gridSelector,
        parentDOMClass: "refundGird",
        title: "用于退款申请订单列表",
        url: vacationOrRefundPaths+"/financial/orderrefundapply/getgriddata",
        postData: {},
        multiSelect: true,
        /*widthOffset:"-350px",*/
        height: "500px",
        sortName: "create_time",
        sortOrder: "desc",
        colNamesArray: ['订单ID','指纹','优惠告知书编号','订单号', '商户', '客户姓名', '客户手机号'
            , '项目名称', '城市', '订单类型','渠道类型','报备人','报备人手机'
            , '所属中介公司', '门店', '产品套餐', '订单状态', '认购房源'
            , '应收电商费', '已收电商费', '创建时间'],
        colModel: [{
            name: "orderInfoId",
            index: "order_info_id",
            width: 160,
            sorttype: "int",
            align:"center",
            editable: false,
             hidden: true
        },{
            name: "fingerprint",
            index: "fingerprint",
            width: 160,
            sorttype: "string",
            align:"center",
            editable: false,
            hidden: true
        },{
            name: "cheapCode",
            index: "cheap_code",
            width: 160,
            sorttype: "string",
            align:"center",
            editable: false,
            hidden: true
        },{
            name: "orderInfoCode",
            index: "order_info_code",
            width: 160,
            sorttype: "string",
            align:"center",
            editable: false/*,
            hidden: true*/
        }, {
            name: "merchantName",
            index: "merchant_name",
            width: 160,
            sorttype: "string",
            editable: false
        }, {
            name: "customName",
            index: "custom_name",
            width:160,
            sorttype: "string",
            editable: false
        }, {
            name: "customTel",
            index: "custom_tel",
            width: 160,
            sorttype: "string",
            editable: false
        }, {
            name: "projectInfoName",
            index: "project_info_name",
            width: 160,
            sorttype: "string",
            editable: false
        }, {
            name: "cityName",
            index: "city_name",
            width: 160,
            sorttype: "string",
            editable: false
        }, {
            name: "packageType",
            index: "package_type",
            width: 160,
            sorttype: "int",
            editable: false,
            formatter: packageTypeFormatter
        }, {
            name: "channelType",
            index: "channel_type",
            width: 160,
            sorttype: "int",
            editable: false,
            formatter: channelTypeFormatter
        }, {
            name: "brokerName",
            index: "broker_name",
            width: 160,
            sorttype: "string",
            editable: false
        }, {
            name: "brokerTel",
            index: "broker_tel",
            width: 160,
            sorttype: "string",
            editable: false
        }, {
            name: "brokerCompanyName",
            index: "broker_company_name",
            width: 160,
            sorttype: "string",
            editable: false
        }, {
            name: "storeName",
            index: "store_name",
            width: 160,
            sorttype: "string",
            editable: false
        }, {
            name: "projectPackageName",
            index: "project_package_name",
            width: 160,
            sorttype: "string",
            editable: false
        }, {
            name: "orderStatus",
            index: "order_status",
            width: 160,
            sorttype: "int",
            editable: false,
            formatter: orderStatusFormatter
        }, {
            name: "houseInfo",
            index: "houseInfo",
            width: 160,
            sorttype: "string",
            editable: false
        }, {
            name: "recvAccAmount",
            index: "recv_acc_amount",
            width: 160,
            sorttype: "int",
            editable: false
        }, {
            name: "realAccAmount",
            index: "real_acc_amount",
            width: 160,
            sorttype: "int",
            editable: false
        }, {
            name: "createTime",
            index: "create_time",
            width: 180,
            sorttype: "string",
            editable: false,
            formatter:dateTimeFormatter
        }]
    });

    // 渲染表格
    $(gridSelector).jqGrid(jqGridOption);
    $(gridSelector).setGridWidth($(window).width() * 0.975);
    /*$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变
    var refundGridRecords = $(gridSelector).jqGrid('getGridParam','records');
    if(refundGridRecords == 0 || refundGridRecords == null){
        $(gridSelector).setGridWidth($(window).width() * 0.975,true);
    }else{
        $(gridSelector).setGridWidth($(window).width() * 0.975,false);
    }*/

    /*点击刷新退款页面*/
    $("#refund").click(function () {
        Common.jqGridReload(gridSelector);
        $(gridSelector).setGridWidth($(window).width() * 0.975);
        /*if(refundGridRecords == 0 || refundGridRecords == null){
            $(gridSelector).setGridWidth($(window).width() * 0.975,true);
        }else{
            $(gridSelector).setGridWidth($(window).width() * 0.975,false);
        }*/
    });

    /*跳转申请退款页面*/
    $("#refundApply").click(function () {
        var selectedRowsId = Common.jqGridGetSelectedRows(gridSelector);

        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条您需要操作的数据！", false);
            return false;
        }else if(selectedRowsId.length>1){
            Common.messageBox("提示", "请仅选择一条您需要操作的数据！", false);
            return false;
        }
        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
        if(!rowData.cheapCode && rowData.cheapCode==''){
            Common.messageBox("提示","该订单没有填写优惠告知书，不能进行退款操作！",false);
            return false;
        }
        window.location = vacationOrRefundPaths+"/financial/orderrefundapply/refundapply?fingerprint="
            +rowData.fingerprint+"&&orderInfoId=" + rowData.orderInfoId;
    });

    /*省市联动*/
    Common.initSelect2("refundProvince", {
        allowClear : true,
        minimumResultsForSearch : Infinity,
        width : "200px"
    });

    Common.initSelect2("refundCity", {
        allowClear : true,
        minimumResultsForSearch : Infinity,
        width : "200px"
    });

    /*订单状态下拉初始化*/
    Common.initSelect2("refundOrderStatus", {
        width: "200px"
    });

    /*渠道类型下拉初始化*/
    Common.initSelect2("refundChannelType", {
        width: "200px"
    });

    /*门店下拉初始化*/
    Common.initSelect2("refundStroeId", {
        width: "200px"
    });

    /*中介公司下拉初始化*/
    Common.initSelect2("refundBrokerCompanyId", {
        width: "200px"
    });

    /*楼盘下拉初始化*/
    Common.initSelect2("refundBuildingProjectId", {
        width: "200px"
    });
    /*楼盘期数下拉初始化*/
    Common.initSelect2("refundBuildingInfoId", {
        width: "200px"
    });
    /*项目下拉初始化*/
    Common.initSelect2("refundProjectInfoId", {
        width: "200px"
    });

    /*日期区间选择*/
    $('#refundStartTime').daterangepicker({
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

    /**
     * 导出退款申请列表
     */
    $("#refundExcel").click(function() {
        var params = {
            timeFlag:$('#refundTimeFlag option:selected').val(),
            startTime :$('#refundStartTime').val(),
            orderInfoCode :$('#refundOrderInfoCode').val(),
            customName : $('#refundCustomName').val(),
            customTel : $('#refundCustomTel').val(),
            brokerName :$('#refundBrokerName').val(),
            brokerTel :$('#refundBrokerTel').val(),
            orderStatus : $('#refundOrderStatus').val(),
            channelType : $('#refundChannelType').val(),
            brokerCompanyId :$('#refundBrokerCompanyId').val(),
            storeId :$('#refundStroeId').val(),
            provinceId : $('#refundProvince').val(),
            cityId : $('#refundCity').val(),
            buildingProjectId :$('#refundBuildingProjectId').val(),
            buildingInfoId : $('#refundBuildingInfoId').val(),
            projectInfoId : $('#refundProjectInfoId').val()
        };
        var options={
            ajax:true,
            url:vacationOrRefundPaths+"/financial/orderrefundapply/excel",
            data:params,
            param:params
        };
        Common.exportGrid(options);
    });

    /**
     * 退款条件搜索
     */
    $('#searchRefund').click(function () {
        var dialog = $("#refundCondition").removeClass('hide')
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
                                timeFlag:$('#refundTimeFlag option:selected').val(),
                                startTime :$('#refundStartTime').val(),
                                orderInfoCode :$('#refundOrderInfoCode').val(),
                                customName : $('#refundCustomName').val(),
                                customTel : $('#refundCustomTel').val(),
                                brokerName :$('#refundBrokerName').val(),
                                brokerTel :$('#refundBrokerTel').val(),
                                orderStatus : $('#refundOrderStatus').val(),
                                channelType : $('#refundChannelType').val(),
                                brokerCompanyId :$('#refundBrokerCompanyId').val(),
                                storeId :$('#refundStroeId').val(),
                                provinceId : $('#refundProvince').val(),
                                cityId : $('#refundCity').val(),
                                buildingProjectId :$('#refundBuildingProjectId').val(),
                                buildingInfoId : $('#refundBuildingInfoId').val(),
                                projectInfoId : $('#refundProjectInfoId').val()
                            };
                            Common.jqGridReload("#refundGrid-table", params);
                            $(this).dialog("close");
                        }
                    }, {
                        text : "重置",
                        "class" : "btn btn-primary btn-xs",
                        click : function() {
                            $("#refundTimeFlag").val("0");
                            $("#refundStartTime").val("");
                            $("#refundOrderInfoCode").val("");
                            $('#refundCustomName').val("");
                            $("#refundCustomTel").val("");
                            $('#refundBrokerName').val("");
                            $("#refundBrokerTel").val("");
                            $('#refundOrderStatus').select2("val", "");
                            $("#refundChannelType").select2("val", "");
                            $("#refundBrokerCompanyId").select2("val", "");
                            $("#refundStroeId").select2("val", "");
                            $('#refundProvince').select2("val", "");
                            $('#refundProvince').trigger("change");
                        }
                    } ]
                });
    });





    /** *********************************************************************** 退房页面 js事件 ******************************************************* */
    /*退房列表第一次加载*/
    var vacationClick = 0;

    /**
     * 跳转到退房页面
     */
    var　vacationGridSelectors = "#vacationGrid-table";
    var vacationPagerSelectors = "#vacationGrid-pager";
    $("#vacation").click(function() {
        if(vacationClick==0){
            vacationClick = 1;
            var vacationJqGridOption = new Common().createGridOption({
                pagerSelector: vacationPagerSelectors,
                gridSelector: vacationGridSelectors,
                parentDOMClass: "vacationGird",
                title: "用于退房申请订单列表",
                url:  vacationOrRefundPaths+"/order/vacation/getgriddata",
                postData: {},
                /*widthOffset:"-1522px",*/
                multiSelect: true,
                height: "500px",
                sortName: "create_time",
                sortOrder: "desc",
                colNamesArray: ['订单ID', '订单号','指纹', '商户', '客户姓名', '客户手机号'
                    , '项目名称', '城市', '订单类型','渠道类型','报备人','报备人手机'
                    , '所属中介公司', '门店', '产品套餐', '订单状态', '认购房源'
                    , '应收电商费', '已收电商费', '应收回款', '已收回款','创建时间'],
                colModel: [{
                    name: "orderInfoId",
                    index: "order_info_id",
                    width: 60,
                    sorttype: "string",
                    align:"center",
                    editable: false,
                     hidden: true
                },{
                    name: "orderInfoCode",
                    index: "order_info_code",
                    width: 60,
                    sorttype: "string",
                    align:"center",
                    editable: false/*,
                     hidden: true*/
                },{
                    name: "fingerprint",
                    index: "fingerprint",
                    width: 60,
                    sorttype: "string",
                    align:"center",
                    editable: false,
                    hidden: true
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
                    name: "brokerName",
                    index: "broker_name",
                    width: 60,
                    sorttype: "string",
                    editable: false
                }, {
                    name: "brokerTel",
                    index: "broker_tel",
                    width: 60,
                    sorttype: "string",
                    editable: false
                }, {
                    name: "brokerCompanyName",
                    index: "broker_company_name",
                    width: 60,
                    sorttype: "string",
                    editable: false
                }, {
                    name: "storeName",
                    index: "store_name",
                    width: 60,
                    sorttype: "string",
                    editable: false
                }, {
                    name: "projectPackageName",
                    index: "project_package_name",
                    width: 60,
                    sorttype: "string",
                    editable: false
                }, {
                    name: "orderStatus",
                    index: "order_status",
                    width: 60,
                    sorttype: "int",
                    editable: false,
                    formatter: orderStatusFormatter
                }, {
                    name: "houseInfo",
                    index: "houseInfo",
                    width: 60,
                    sorttype: "string",
                    editable: false
                }, {
                    name: "recvAccAmount",
                    index: "recv_acc_amount",
                    width: 60,
                    sorttype: "int",
                    editable: false
                }, {
                    name: "realAccAmount",
                    index: "real_acc_amount",
                    width: 60,
                    sorttype: "int",
                    editable: false
                }, {
                    name: "recvDistAmount",
                    index: "recv_dist_amount",
                    width: 60,
                    sorttype: "int",
                    editable: false
                }, {
                    name: "realDistAmount",
                    index: "real_dist_amount",
                    width: 60,
                    sorttype: "int",
                    editable: false
                }, {
                    name: "createTime",
                    index: "create_time",
                    width: 60,
                    sorttype: "string",
                    editable: false,
                    formatter:dateTimeFormatter
                }]
            });

            // 渲染表格
            $(vacationGridSelectors).jqGrid(vacationJqGridOption);
            $(vacationGridSelectors).setGridWidth($(window).width() * 0.975);
            /*$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变
            var re_records = $(vacationGridSelectors).jqGrid('getGridParam','records');
            if(re_records == 0 || re_records == null){
                $(vacationGridSelectors).setGridWidth($(window).width() * 0.975,true);
            }else{
                $(vacationGridSelectors).setGridWidth($(window).width() * 0.975,false);
            }*/
        }else{
            Common.jqGridReload(vacationGridSelectors);
            $(vacationGridSelectors).setGridWidth($(window).width() * 0.975);
            /* var re_records = $(vacationGridSelectors).jqGrid('getGridParam','records');
             if(re_records == 0 || re_records == null){
                 $(vacationGridSelectors).setGridWidth($(window).width() * 0.975,true);
             }else{
                 $(vacationGridSelectors).setGridWidth($(window).width() * 0.975,false);
             }*/
        }
    });

    /*跳转申请退房详情页面*/
    $("#vacationApply").click(function () {
        var selectedRowsId = Common.jqGridGetSelectedRows(vacationGridSelectors);

        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条您需要操作的数据！", false);
            return false;
        }else if(selectedRowsId.length>1){
            Common.messageBox("提示", "请仅选择一条您需要操作的数据！", false);
            return false;
        }
        var rowData = Common.jqGridGetRowData(vacationGridSelectors, selectedRowsId);
        window.location = vacationOrRefundPaths+"/order/vacation/vacationapply?fingerprint="
            + rowData.fingerprint+"&&orderInfoId=" + rowData.orderInfoId;
    });

    /*省市联动*/
    Common.initSelect2("vacationProvince", {
        allowClear : true,
        minimumResultsForSearch : Infinity,
        width : "200px"
    });

    Common.initSelect2("vacationCity", {
        allowClear : true,
        minimumResultsForSearch : Infinity,
        width : "200px"
    });

    /*订单状态下拉初始化*/
    Common.initSelect2("vacationOrderStatus", {
        width: "200px"
    });

    /*渠道类型下拉初始化*/
    Common.initSelect2("vacationChannelType", {
        width: "200px"
    });

    /*门店下拉初始化*/
    Common.initSelect2("vacationStroeId", {
        width: "200px"
    });

    /*中介公司下拉初始化*/
    Common.initSelect2("vacationBrokerCompanyId", {
        width: "200px"
    });

    /*楼盘下拉初始化*/
    Common.initSelect2("vacationBuildingProjectId", {
        width: "200px"
    });
    /*楼盘期数下拉初始化*/
    Common.initSelect2("vacationBuildingInfoId", {
        width: "200px"
    });
    /*项目下拉初始化*/
    Common.initSelect2("vacationProjectInfoId", {
        width: "200px"
    });

    /*日期区间选择*/
    $('#vacationStartTime').daterangepicker({
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


    /**
     * 退房条件搜索 --从新加载数据
     */
    $('#searchVacation').click(function () {
        var dialog = $("#vacationCondition").removeClass('hide')
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
                                timeFlag:$('#vacationTimeFlag option:selected').val(),
                                startTime :$('#vacationStartTime').val(),
                                orderInfoCode :$('#vacationOrderInfoCode').val(),
                                customName : $('#vacationCustomName').val(),
                                customTel : $('#vacationCustomTel').val(),
                                brokerName :$('#vacationBrokerName').val(),
                                brokerTel :$('#vacationBrokerTel').val(),
                                orderStatus : $('#vacationOrderStatus').val(),
                                channelType : $('#vacationChannelType').val(),
                                brokerCompanyId :$('#vacationBrokerCompanyId').val(),
                                storeId :$('#vacationStroeId').val(),
                                provinceId : $('#vacationProvince').val(),
                                cityId : $('#vacationCity').val(),
                                buildingProjectId :$('#vacationBuildingProjectId').val(),
                                buildingInfoId : $('#vacationBuildingInfoId').val(),
                                projectInfoId : $('#vacationProjectInfoId').val()
                            };
                            Common.jqGridReload("#vacationGrid-table", params);
                            $(this).dialog("close");
                        }
                    }, {
                        text : "重置",
                        "class" : "btn btn-primary btn-xs",
                        click : function() {
                            $("#vacationTimeFlag").val("0");
                            $("#vacationStartTime").val("");
                            $("#vacationOrderInfoCode").val("");
                            $('#vacationCustomName').val("");
                            $("#vacationCustomTel").val("");
                            $('#vacationBrokerName').val("");
                            $("#vacationBrokerTel").val("");
                            $('#vacationOrderStatus').select2("val", "");
                            $("#vacationChannelType").select2("val", "");
                            $("#vacationBrokerCompanyId").select2("val", "");
                            $("#vacationStroeId").select2("val", "");
                            $('#vacationProvince').select2("val", "");
                            $('#vacationProvince').trigger("change");
                        }
                    } ]
                });
    });


    /**
     * 导出退房申请列表
     */
    $("#vacationExcel").click(function() {
        var params = {
            timeFlag:$('#vacationTimeFlag option:selected').val(),
            startTime :$('#vacationStartTime').val(),
            orderInfoCode :$('#vacationOrderInfoCode').val(),
            customName : $('#vacationCustomName').val(),
            customTel : $('#vacationCustomTel').val(),
            brokerName :$('#vacationBrokerName').val(),
            brokerTel :$('#vacationBrokerTel').val(),
            orderStatus : $('#vacationOrderStatus').val(),
            channelType : $('#vacationChannelType').val(),
            brokerCompanyId :$('#vacationBrokerCompanyId').val(),
            storeId :$('#vacationStroeId').val(),
            provinceId : $('#vacationProvince').val(),
            cityId : $('#vacationCity').val(),
            buildingProjectId :$('#vacationBuildingProjectId').val(),
            buildingInfoId : $('#vacationBuildingInfoId').val(),
            projectInfoId : $('#vacationProjectInfoId').val()
        };
        var options={
            ajax:true,
            url:vacationOrRefundPaths+"/order/vacation/excel",
            data:params,
            param:params
        };
        Common.exportGrid(options);
        //window.location=vacationOrRefundPaths+"/order/vacation/excel";
    });

    if(pageFlag=="vacationPage"){
        $("#vacation").click();
    }

});