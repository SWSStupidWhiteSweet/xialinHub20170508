$(function ($) {
    var gridSelector = "#grid-table";
    var pagerSelector = "#grid-pager";

    var jqGridOption = new Common().createGridOption({
        pagerSelector: pagerSelector,
        gridSelector: gridSelector,
        parentDOMClass: "col-sm-12",
        title: "咨询列表",
        url: "getgriddata",
        postData: {},
        multiSelect: true,
        height: "500px",
        sortName: "seek.create_time",
        sortOrder: "desc",
        colNamesArray: ['咨询ID', '咨询人', '会员电话', '咨询时间', '性别', '省份', '城市', '楼盘名称', '咨询事件', '咨询内容', '跟进时间', '来源', '咨询状态'],
        colModel: [{
            name: "memberSeekId",
            index: "member_seek_id",
            width: 60,
            sorttype: "int",
            editable: false,
            hidden: true
        },{
            name: "memberName",
            index: "member_name",
            width: 60,
            sorttype: "string",
            editable: false
        },{
            name: "memberTel",
            index: "member_tel",
            width: 90,
            sorttype: "string",
            editable: false
        },{
            name: "seekTimeStr",
            index: "seek_time",
            width: 110,
            sorttype: "string",
            editable: false
        },{
            name: "memberSex",
            index: "member_sex",
            width: 60,
            sorttype: "string",
            editable: false,
            formatter: sexFormatter
        },{
            name: "provinceName",
            index: "province_id",
            width: 60,
            sorttype: "string",
            editable: false
        },{
            name: "cityName",
            index: "city_id",
            width: 60,
            sorttype: "string",
            editable: false
        },{
            name: "buildingProjectName",
            index: "building_project_id",
            width: 110,
            sorttype: "string",
            editable: false
        },{
            name: "seekType",
            index: "seek_type",
            width: 60,
            sorttype: "string",
            editable: false
        },{
            name: "seekContent",
            index: "seek_content",
            width: 160,
            sorttype: "string",
            editable: false
        },{
            name: "lastTimeStr",
            index: "last_time",
            width: 110,
            sorttype: "string",
            editable: false
        },{
            name: "createSrc",
            index: "create_src",
            width: 60,
            sorttype: "string",
            editable: false
        },{
            name: "status",
            index: "status",
            width: 60,
            sorttype: "string",
            editable: false,
            formatter:complainStatus
        }]
    });

    // 选中行事件
   /* jqGridOption.onSelectRow = function (rowIndex, status) {
        rowData = $(gridSelector).getRowData(rowIndex);
    };*/

    // 渲染表格
    $(gridSelector).jqGrid(jqGridOption);

    $(window).triggerHandler('resize.jqGrid');

    Common.initSelect2("province", {
        allowClear : true,
        minimumResultsForSearch : Infinity,
        width : "220px"
    });

    Common.initSelect2("city", {
        allowClear : true,
        minimumResultsForSearch : Infinity,
        width : "220px"
    });
    Common.initSelect2("buildingProject", {
        allowClear: true,
        minimumResultsForSearch: Infinity,
        width: "200px"
    });

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
        // ranges : {
        //     //'最近1小时': [moment().subtract('hours',1), moment()],
        //     '今日': [moment().startOf('day'), moment()],
        //     '昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
        //     '最近7日': [moment().subtract('days', 6), moment()],
        //     '最近30日': [moment().subtract('days', 29), moment()],
        //     '本月': [moment().startOf("month"),moment().endOf("month")],
        //     '上个月': [moment().subtract(1,"month").startOf("month"),moment().subtract(1,"month").endOf("month")]
        // },
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

    // 搜索条件
    $("#query").click(function() {
        var dialog = $("#protect_condition").removeClass('hide').dialog({
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
                    Common.jqGridReload(gridSelector,{
                        memberName : $("#memberName").val(),
                        memberTel  : $('#memberTel').val(),
                        province : $("#province").val(),
                        city : $("#city").val(),
                        buildingProjectId : $("#buildingProject").val(),
                        complain_time : $("#failStartTime").val()
                    });
                    $(this).dialog("close");
                }
            },{
                text: "重置",
                "class": "btn btn-primary btn-xs",
                click: function () {
                    $('#memberName').val("");
                    $('#memberTel').val("");
                    $('#province').select2("val", "");
                    $('#city').select2("val", "");
                    $('#buildingProject').select2("val", "");
                    $('#failStartTime').val("");
                }
            } ]
        });
    });

    // 查看
    $('#view_complain').click(function () {
        var selectedRowsId = Common.jqGridGetSelectedRows(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条咨询信息！", false);
            return false;
        }else if(selectedRowsId.length>1){
            Common.messageBox("提示", "请仅选择一条咨询信息！", false);
            return false;
        }
        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
        window.location="../memberseek/view?memberSeekId=" + rowData.memberSeekId;
    });

    // 跟进
    $('#run_complain').click(function () {
        var selectedRowsId = Common.jqGridGetSelectedRows(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条咨询信息！", false);
            return false;
        }else if(selectedRowsId.length>1){
            Common.messageBox("提示", "请仅选择一条咨询信息！", false);
            return false;
        }
        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
        window.location = "../memberseek/follow?memberSeekId=" + rowData.memberSeekId;
    })
});