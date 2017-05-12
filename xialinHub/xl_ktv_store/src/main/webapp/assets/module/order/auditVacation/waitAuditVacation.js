/**
 * @Company : 重庆锐云科技有限公司
 * @Project : polyV2
 * @Author : LY
 * @Date : 2017/3/18. 12:56
 * @Description: 退房待审核页面js
 */
$(function($) {
    /** **************************************构造jqGrid start *************************************** */
    var waitGridSelector = "#waitAuditGird-table";
    var waitPagerSelector = "#waitAuditGird-pager";
    // 构造jqGrid配置信息
    var waitJqGridOption = new Common().createGridOption({
        pagerSelector: waitPagerSelector,
        gridSelector: waitGridSelector,
        parentDOMClass: "waitAuditGird",
        title: "退房待审核订单列表",
        url: auditVacationPaths + "/order/auditvacation/getvacationauditgrid?auditStatus=0",
        postData: {},
        /*widthOffset:"-1500px",*/
        multiSelect: true,
        height: "500px",
        sortName: "create_time",
        sortOrder: "desc",
        colNamesArray: ['订单ID','订单指纹','退房指纹','退房申请ID','订单号', '商户名称', '客户姓名', '客户手机号'
            , '项目名称', '城市', '项目类型', '渠道类型',  '认购户型'
            , '认购总价', '网签总价', '认购时间'],
        colModel: [{
            name: "orderInfoId",
            index: "order_info_id",
            width: 60,
            sorttype: "int",
            editable: false,
            hidden: true
        },{
            name: "fingerprint",
            index: "fingerprint",
            width: 60,
            sorttype: "int",
            editable: false,
            hidden: true
        },{
            name: "vacationFingerprint",
            index: "vacationFingerprint",
            width: 60,
            sorttype: "int",
            editable: false,
            hidden: true
        },{
            name: "orderVacationApplyId",
            index: "order_vacation_apply_id",
            width: 60,
            sorttype: "int",
            editable: false,
            hidden: true
        },{
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
        }]
    });

    // 渲染表格
    $(waitGridSelector).jqGrid(waitJqGridOption);
    $(waitGridSelector).setGridWidth($(window).width() * 0.975);
    /*$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变
    var waitGridRecords = $(waitGridSelector).jqGrid('getGridParam','records');
    if(waitGridRecords == 0 || waitGridRecords == null){
        $(waitGridSelector).setGridWidth($(window).width() * 0.975,true);
    }else{
        $(waitGridSelector).setGridWidth($(window).width() * 0.975,false);
    }*/

    /*点击刷新退房待审核页面*/
    $("#wait").click(function () {
        Common.jqGridReload(waitGridSelector);
        $(waitGridSelector).setGridWidth($(window).width() * 0.975);
        /*var waitGridRecords = $(waitGridSelector).jqGrid('getGridParam','records');
         if(waitGridRecords == 0 || waitGridRecords == null){
         $(waitGridSelector).setGridWidth($(window).width() * 0.975,true);
         }else{
         $(waitGridSelector).setGridWidth($(window).width() * 0.975,false);
         }*/
    });

    /*日期区间选择*/
    $('#waitStartTime').daterangepicker({
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
    Common.initSelect2("waitProvince", {
        allowClear : true,
        minimumResultsForSearch : Infinity,
        width : "200px"
    });

    Common.initSelect2("waitCity", {
        allowClear : true,
        minimumResultsForSearch : Infinity,
        width : "200px"
    });

    /*渠道类型下拉初始化*/
    Common.initSelect2("waitChannelType", {
        width: "200px"
    });

    /*项目类型下拉初始化*/
    Common.initSelect2("waitPackageType", {
        width: "200px"
    });

    /*订单状态下拉初始化*/
    Common.initSelect2("waitOrderStatus", {
        width: "200px"
    });

    /*项目下拉初始化*/
    Common.initSelect2("waitProjectInfoId", {
        width: "200px"
    });

    /*楼盘下拉初始化*/
    Common.initSelect2("waitBuildingProjectId", {
        width: "200px"
    });

    //审核
    $("#audit").click(function(){
    	var selectedRowsId = Common.jqGridGetSelectedRow(waitGridSelector);
        if (Common.isEmpty(selectedRowsId)|| selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条你想操作的数据！", false);
            return false;
        }
    	
		if (selectedRowsId.length > 1) {
		    Common.messageBox("提示", "每次最多只能选择一条数据！！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(waitGridSelector,selectedRowsId);
		location.href = "auditVacation?orderInfoId="+rowData.orderInfoId+"&fingerprint="+rowData.fingerprint
				+"&orderVacationApplyId="+rowData.orderVacationApplyId+"&vacationfingerprint="+rowData.vacationFingerprint;
		//$(this).attr("url", path+"/order/vacation/auditVacation
    });
    
    
    /**
     * 退房待审核条件搜索 --从新加载数据
     */
    $('#searchWait').click(function () {
        var dialog = $("#waitCondition").removeClass('hide')
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
                                timeFlag:$('#waitTimeFlag option:selected').val(),
                                startTime :$('#waitStartTime').val(),
                                orderInfoCode :$('#waitOrderInfoCode').val(),
                                channelType : $('#waitChannelType').val(),
                                customName : $('#waitCustomName').val(),
                                customTel : $('#waitCustomTel').val(),
                                provinceId : $('#waitProvince').val(),
                                cityId : $('#waitCity').val(),
                                buildingProjectId :$('#waitBuildingProjectId').val(),
                                projectInfoId : $('#waitProjectInfoId').val(),
                                packageType :$('#waitPackageType').val(),
                                orderStatus : $('#waitOrderStatus').val(),
                                brokerName :$('#waitBrokerName').val(),
                                brokerTel :$('#waitBrokerTel').val(),
                                auditStatus:0
                            };
                            Common.jqGridReload("#waitAuditGird-table", params);
                            $(this).dialog("close");
                        }
                    }, {
                        text : "重置",
                        "class" : "btn btn-primary btn-xs",
                        click : function() {
                            $("#waitTimeFlag").val("0");
                            $("#waitStartTime").val("");
                            $("#waitOrderInfoCode").val("");
                            $("#waitChannelType").select2("val", "");
                            $('#waitCustomName').val("");
                            $("#waitCustomTel").val("");
                            $('#waitProvince').select2("val", "");
                            $('#waitProvince').trigger("change");
                            $('#waitPackageType').select2("val", "");
                            $('#waitOrderStatus').select2("val", "");
                            $("#waitBrokerName").val("");
                            $("#waitBrokerTel").val("");
                        }
                    } ]
                });
    });

    /**
     * 导出退款申请列表
     */
    $("#waitExcel").click(function() {
        var params = {
            timeFlag:$('#waitTimeFlag option:selected').val(),
            startTime :$('#waitStartTime').val(),
            orderInfoCode :$('#waitOrderInfoCode').val(),
            channelType : $('#waitChannelType').val(),
            customName : $('#waitCustomName').val(),
            customTel : $('#waitCustomTel').val(),
            provinceId : $('#waitProvince').val(),
            cityId : $('#waitCity').val(),
            buildingProjectId :$('#waitBuildingProjectId').val(),
            projectInfoId : $('#waitProjectInfoId').val(),
            packageType :$('#waitPackageType').val(),
            orderStatus : $('#waitOrderStatus').val(),
            brokerName :$('#waitBrokerName').val(),
            brokerTel :$('#waitBrokerTel').val(),
            auditStatus:0
        };
        var options={
            ajax:true,
            url:auditVacationPaths+"/order/auditvacation/waitexcel",
            data:params,
            param:params
        };
        Common.exportGrid(options);
    });

});