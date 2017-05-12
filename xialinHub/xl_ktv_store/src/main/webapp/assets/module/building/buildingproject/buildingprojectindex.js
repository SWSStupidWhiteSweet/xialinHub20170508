$(function ($) {

    /** **************************************构造jqGrid start *************************************** */
    var gridSelector = "#grid-table";
    var pagerSelector = "#grid-pager";


    // 构造jqGrid配置信息
    var jqGridOption = new Common().createGridOption({
        pagerSelector: pagerSelector,
        gridSelector: gridSelector,
        parentDOMClass: "col-sm-12",
        title: "楼盘列表",
        url: "getgriddata",
        postData: {},
        multiSelect: false,
        height: "500px",
        sortName: "create_time",
        sortOrder: "desc",
        colNamesArray: ['楼盘ID', '楼盘名称', '开发商', '所属省', '所属市', '所属区', '楼盘地址', '售楼处电话', '均价', '销售状态', '状态', '创建时间'],
        colModel: [{
            name: "buildingProjectId",
            index: "building_project_id",
            width: 60,
            sorttype: "string",
            editable: false,
            hidden: true
        }, {
            name: "buildingProjectName",
            index: "building_project_name",
            width: 80,
            sorttype: "string",
            editable: false
        }, {
            name: "companyName",
            index: "company_name",
            width: 140,
            sorttype: "string",
            editable: false
        }, {
            name: "provinceName",
            index: "province_name",
            width: 40,
            sorttype: "string",
            editable: false
        }, {
            name: "cityName",
            index: "city_name",
            width: 40,
            sorttype: "string",
            editable: false
        }, {
            name: "districtName",
            index: "district_name",
            width: 40,
            sorttype: "string",
            editable: false
        }, {
            name: "address",
            index: "address",
            width: 160,
            sorttype: "string",
            editable: false
        }, {
            name: "tel",
            index: "tel",
            width: 80,
            sorttype: "string",
            editable: false
        }, {
            name: "price",
            index: "price",
            width: 40,
            sorttype: "string",
            editable: false,
            formatter: buildingPriceFormatter
        }, {
            name: "saleStatus",
            index: "sale_status",
            width: 60,
            sorttype: "int",
            editable: false,
            formatter: sale_statusFormatter
        }, {
            name: "status",
            index: "status",
            width: 40,
            sorttype: "int",
            editable: false,
            formatter: statusFormatter
        }, {
            name: "createTime",
            index: "create_time",
            width: 100,
            sorttype: "string",
            editable: false,
            formatter : dateTimeFormatter
        }]
    });

    // 选中行事件
    jqGridOption.onSelectRow = function (rowIndex, status) {
        var rowData = $(gridSelector).getRowData(rowIndex);

    };

    // 渲染表格
    $(gridSelector).jqGrid(jqGridOption);

    $(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变


    /** **************************************构造jqGrid end *************************************** */

    /** **************************************按钮事件 start *************************************** */



    /**
     * 跳转到新增楼盘页面
     */
    $("#add").click(function () {
        window.parent.location.href = "add";
    });

    /**
     * 跳转到配置楼盘页面
     */
    $("#config").click(function () {
        var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条你想修改的数据！", false);
            return false;
        }

        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

        window.parent.location.href = "modify?buildingProjectId=" + rowData.buildingProjectId;
    });
    /**
     * 跳转到修改楼盘页面
     */
    $("#edit").click(function () {
        var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条你想修改的数据！", false);
            return false;
        }

        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

        window.parent.location.href = "basemodify?buildingProjectId=" + rowData.buildingProjectId;
    });

    /**
     * 删除楼盘
     */
    $("#lock").click(function () {
        var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条你想删除的数据！", false);
            return false;
        }

        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

        Common.confirm("请确认是否要删除该楼盘？", function () {
            $.ajax({
                url: "delet",
                type: "post",
                data: {
                    buildingProjectId: rowData.buildingProjectId
                },
                dataType: "json",
                success: function (json) {
                    if (json.isSuccess) {
                        Common.messageBox("提示", "删除楼盘申请成功！", true);
                        Common.jqGridReload(gridSelector);
                    } else {
                        Common.messageBox("提示", json.msg, false);
                    }
                },
                error: function () {
                    Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
                }
            });
        });
    });
    /**
     * 跳转到楼盘详情页面
     */
    $("#details").click(function () {
        var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
        if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
            Common.messageBox("提示", "请选择一条你想查看的数据！", false);
            return false;
        }

        var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

        window.parent.location.href = "basedetails?buildingProjectId=" + rowData.buildingProjectId;
    });
    // /**
    //  * 跳转到联代方人员页面
    //  */
    // $("#agents").click(function () {
    //     var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
    //     if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
    //         Common.messageBox("提示", "请选择一条数据！", false);
    //         return false;
    //     }
    //
    //     var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
    //
    //     window.parent.location.href = "agentsindex?buildingProjectId=" + rowData.buildingProjectId;
    // });
    // /**
    //  * 跳转到销售团队页面
    //  */
    // $("#agentgroup").click(function () {
    //     var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
    //     if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
    //         Common.messageBox("提示", "请选择一条数据！", false);
    //         return false;
    //     }
    //
    //     var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
    //
    //     window.parent.location.href = "agentgroupindex?buildingProjectId=" + rowData.buildingProjectId;
    // });
    // /**
    //  * 跳转到案场配置页面
    //  */
    // $("#config").click(function () {
    //     var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
    //     if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
    //         Common.messageBox("提示", "请选择一条数据！", false);
    //         return false;
    //     }
    //
    //     var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
    //
    //     window.parent.location.href = "configindex?buildingProjectId=" + rowData.buildingProjectId;
    // });
    // /**
    //  * 跳转到楼盘相册管理页面
    //  */
    // $("#toalbuminfo").click(function () {
    //     var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
    //     if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
    //         Common.messageBox("提示", "请选择一条数据！", false);
    //         return false;
    //     }
    //
    //     var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
    //
    //     location.href = "../buildingalbum/toalbuminfo?buildingProjectId=" + rowData.buildingProjectId;
    // });
    // /**
    //  * 跳转到楼盘相册审核页面
    //  */
    // $("#toalbumaudit").click(function () {
    //     var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
    //     if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
    //         Common.messageBox("提示", "请选择一条数据！", false);
    //         return false;
    //     }
    //
    //     var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
    //
    //     location.href = "../buildingalbum/toalbumaudit?buildingProjectId=" + rowData.buildingProjectId;
    // });
    // /**
    //  * 跳转到物业管理页面
    //  */
    // $("#property").click(function () {
    //     var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
    //     if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
    //         Common.messageBox("提示", "请选择一条数据！", false);
    //         return false;
    //     }
    //
    //     var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
    //
    //     location.href = "../building/property/index?buildingProjectId=" + rowData.buildingProjectId;
    // });
    // /**
    //  * 跳转到户型管理页面
    //  */
    // $("#houseType").click(function () {
    //     var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
    //     if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
    //         Common.messageBox("提示", "请选择一条数据！", false);
    //         return false;
    //     }
    //
    //     var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
    //
    //     location.href = "../building/housetype/index?buildingProjectId=" + rowData.buildingProjectId;
    // });
    // /**
    //  * 父页面跳转楼盘期数
    //  */
    // $("#buildingInfo").click(function(){
    //     var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
    //     if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
    //         Common.messageBox("提示", "请选择一条你想管理的楼盘数据！", false);
    //         return false;
    //     }
    //
    //     var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
    //
    //     window.parent.location.href = "../buildinginfo/tobuildinginfoindex?buildingProjectId=" + rowData.buildingProjectId;
    // });
    // /**
    //  * 父页面跳转楼盘动态
    //  */
    // $("#buildingContent").click(function(){
    //     var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
    //     if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
    //         Common.messageBox("提示", "请选择一条你想管理的楼盘数据！", false);
    //         return false;
    //     }
    //
    //     var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
    //
    //     window.parent.location.href = "../buildingcontent/tobuildingcontent?buildingProjectId=" + rowData.buildingProjectId;
    // });
    /** **************************************按钮事件 end *************************************** */
});