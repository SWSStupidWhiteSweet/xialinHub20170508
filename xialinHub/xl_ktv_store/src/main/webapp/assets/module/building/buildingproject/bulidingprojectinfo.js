$(function () {
    Common.formValidate("buildingProjectForm", {
        buildingProjectName: {
            required: true,
            maxlength: 40
        },
        address: {
            required: true,
            maxlength: 40
        },
        longitude: {
            required: true
        },
        latitude: {
            required: true
        },
        biref: {
            required: true,
            maxlength: 1024
        },
        propertyCompany: {
            required: true,
            maxlength: 40
        },
        tel: {
            required: true,
            minlength: 8,
            maxlength: 48

        },
        tel400: {
            required: true,
            minlength: 8,
            maxlength: 48
        },
        footprint: {
            required: true
        },
        floorArea: {
            required: true

        },
        greeningRatio: {
            required: true
        },
        houseTotal: {
            required: true,
            digits: true
        },
        parkingTotalUg: {
            required: true,
            digits: true
        },
        parkingTotalLg: {
            required: true,
            digits: true
        },
        provinceId: {
            required: true
        }
    }, {
        buildingProjectName: {
            required: "楼盘名称不能为空.",
            maxlength: "楼盘名称不能超过40个汉字."
        },
        address: {
            required: "楼盘地址不能为空.",
            maxlength: "楼盘地址不能超过40个汉字."
        },
        biref: {
            required: "楼盘描述不能为空",
            maxlength: "楼盘描述不能超过1024个字节"
        },
        propertyCompany: {
            required: "物业公司不能为空",
            maxlength: "物业公司名称不能超过40个字"
        },
        tel: {
            required: "售楼电话不能为空",
            maxlength: "最长48个字",
            minlength: "最短8个字"
        },
        tel400: {
            required: "营销400号码不能为空",
            maxlength: "最长48个字",
            minlength: "最短8个字"
        },
        footprint: {
            required: "占地面积不能为空"
        },
        floorArea: {
            required: "建筑面积不能为空"

        },
        greeningRatio: {
            required: "绿化率不能为空"
        },
        houseTotal: {
            required: "总户数不能为空"
        },
        parkingTotalUg: {
            required: "地下停车位不能为空"
        },
        parkingTotalLg: {
            required: "地上停车位不能为空"
        }
    });

    var flag = true;
    if (flag){
        $("#saveBtn").click(function (e) {
            flag = false;
            if (!$('#buildingProjectForm').valid()) {
                e.preventDefault();
                Common.messageBox("提示", "表单信息填写不完整！", false);
                flag = true;
                return false;
            }

            var actionType = $("#actionType").val();
            var url = actionType == "add" ? "create" : "update";

            var buildingProjectName = $('#buildingProjectName').val();
            var companyId = $('#companyId').val();
            var cityId = $('#cityId').val();
            var provinceId = $("#provinceId").val();
            var districtId = $('#districtId').val();
            var plateId = $("#plateId").val();
            var sky720url=$("#sky720url").val();
            var buildingProjectId = $('#buildingProjectId').val();
            var startDate = $('#startDate').val();
            var joinDate = $('#joinDate').val();
            var address = $('#address').val();
            var longitude = $('#longitude').val();
            var latitude = $('#latitude').val();
            var biref = $('#biref').val();
            var propertyCompany = $('#propertyCompany').val();
            var tel = $('#tel').val();
            var tel400 = $('#tel400').val();
            var saleStatus = $('#saleStatus').val();
            var status = $('#status').val();
            var footprint = $('#footprint').val();
            var floorArea = $('#floorArea').val();
            var volumeRatio = $('#volumeRatio').val();
            var greeningRatio = $('#greeningRatio').val();
            var houseTotal = $('#houseTotal').val();
            var parkingTotalUg = $('#parkingTotalUg').val();
            var parkingTotalLg = $('#parkingTotalLg').val();
            var price = $('#price').val();
            var buildingInfoSort = $('#buildingInfoSort').val();


            if (Common.isEmpty(companyId)) {
                Common.messageBox("提示", "请选择开发商！", false);
                $("#companyId").select2("open");
                flag = true;
                return false;
            }

            if (Common.isEmpty(status)) {
                Common.messageBox("提示", "请选择状态！", false);
                $("#status").select2("open");
                flag = true;
                return false;
            }

            if (Common.isEmpty(provinceId)) {
                Common.messageBox("提示", "请选择所属省！", false);
                $("#provinceId").select2("open");
                flag = true;
                return false;
            }

            if (Common.isEmpty(cityId)) {
                Common.messageBox("提示", "请选择所属市！", false);
                $("#cityId").select2("open");
                flag = true;
                return false;
            }
            if (Common.isEmpty(districtId)) {
                Common.messageBox("提示", "请选择所属区！", false);
                $("#districtId").select2("open");
                flag = true;
                return false;
            }
            if (Common.isEmpty(plateId)) {
                Common.messageBox("提示", "请选择所属板块！", false);
                $("#plateId").select2("open");
                flag = true;
                return false;
            }
            if (Common.isEmpty(startDate) && (!$('#startDateUndetermined').is(':checked'))) {

                Common.messageBox("提示", "请选择开盘时间！", false);
                $("#startDate").select2("open");
                flag = true;
                return false;

            }
            if (Common.isEmpty(joinDate) && (!$('#jionDateUndetermined').is(':checked'))) {

                Common.messageBox("提示", "请选择交房时间！", false);
                $("#joinDate").select2("open");
                flag = true;
                return false;

            }

            if ((!Common.isEmpty(startDate)) && (!Common.isEmpty(joinDate)) && (startDate > joinDate)) {
                Common.alert("提示", "交房时间比开盘时间早了！", false);
                flag = true;
                return false;
            }

            if ($('#startDateUndetermined').is(':checked')) {
                startDate = "1970-01-01";
            }
            if ($('#jionDateUndetermined').is(':checked')) {
                joinDate = "1970-01-01";
            }
            var regJD = /^[\-\+]?(0?\d{1,2}\.\d{1,6}|1[0-7]?\d{1}\.\d{1,6}|180\.0{1,6})$/;
            if (!regJD.test(longitude)) {
                Common.alert("请输入正确的经度(-180到180之间，并输入1到6位小数)", false);
                flag = true;
                return false;
            }
            var regWD = /^[\-\+]?([0-8]?\d{1}\.\d{1,6}|90\.0{1,6})$/;
            if (!regWD.test(latitude)) {
                Common.alert("请输入正确的纬度（-90到90之间，并输入1到6位小数）", false);
                flag = true;
                return false;
            }

            if (Common.isEmpty(saleStatus)) {
                Common.messageBox("提示", "请选择销售状态！", false);
                $("#saleStatus").select2("open");
                flag = true;
                return false;
            }
            var tagsArr = $('#tags').val();
            var tags = "";
            if(!Common.isEmpty(tagsArr)) {

                $('#tags option').each(function () {
                    for (var i = 0; i < tagsArr.length; i++) {
                        if (!Common.isEmpty($(this).attr("value")) && $(this).attr("value") == tagsArr[i]) {

                            tags += "{tag_id:" + $(this).attr("value") + ",tag_name:" + $(this).text() + "},";
                        }
                    }

                });
                tags = tags.substring(0, tags.length - 1);
                tags = "[" + tags + "]";
            }
            var footprintReg = /^\d+(\.\d+)?$/;
            if (!footprintReg.test(footprint)) {
                Common.messageBox("提示", "占地面积请输入大于零的数！", false);
                flag = true;
                return false;
            }
            if (!footprintReg.test(floorArea)) {
                Common.messageBox("提示", "建筑面积请输入大于零的数！", false);
                flag = true;
                return false;
            }
            if (Common.isEmpty(price) && (!$('#priceUndetermined').is(':checked')) ) {
                Common.messageBox("提示", "请输入价格！", false);
                flag = true;
                return false;

            }
            if(!Common.isEmpty(price) && (!$('#priceUndetermined').is(':checked'))){
                if(isNaN(price) || price<0){
                    Common.messageBox("提示", "价格请输入大于等于0数字", false);
                    flag = true;
                    return false;
                }
            }
            if ($('#priceUndetermined').is(':checked')) {
                price = 0;
            }


            if (volumeRatio > 100) {
                Common.alert("容积率太大，不正常", false);
                flag = true;
                return false;
            }
            var greenReg = /^\+?[1-9][0-9]*$/;
            var green100 = greeningRatio * 100;
            if (greeningRatio * 100 > 9999 || greeningRatio * 100 < 1 || !greenReg.test(green100)) {
                Common.alert("绿化率为100以内的两位小数", false);
                flag = true;
                return false;
            }
            $.ajax({
                url: url,
                type: "post",
                data: {
                    buildingProjectId: buildingProjectId,
                    companyId: companyId,
                    buildingProjectName: buildingProjectName,
                    provinceId: provinceId,
                    cityId: cityId,
                    districtId: districtId,
                    plateId: plateId,
                    startDate: startDate,
                    joinDate: joinDate,
                    address: address,
                    longitude: longitude,
                    latitude: latitude,
                    sky720url:sky720url,
                    biref: biref,
                    propertyCompany: propertyCompany,
                    tel: tel,
                    tel400: tel400,
                    saleStatus: saleStatus,
                    status: status,
                    tags: (tags),
                    footprint: footprint,
                    floorArea: floorArea,
                    volumeRatio: volumeRatio,
                    greeningRatio: greeningRatio,
                    houseTotal: houseTotal,
                    parkingTotalUg: parkingTotalUg,
                    parkingTotalLg: parkingTotalLg,
                    price: price,
                    buildingInfoSort: buildingInfoSort
                },
                dataType: "json",
                success: function (json) {
                    if (json.isSuccess) {
                        flag = true;
                        Common.alert("申请成功，请等待审核", true, back);
                    } else {
                        flag = true;
                        Common.messageBox("提示", json.msg, false);
                    }
                }

                ,
                error: function () {
                    flag = true;
                    Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
                }
            })
            ;
        });
}
    $("#baseDetails").click(function (e) {
        location.href="details?buildingProjectId="+$("#buildingProjectId").val();
    })

    $("#backBtn").click(back);

    function back() {
        location.href = "buildingprojectindex";
    }
    Common.initSelect2("provinceId", {
        allowClear: true,
        minimumResultsForSearch: Infinity,
        width: "380px"
    });
    Common.initSelect2("cityId", {

        width: "380px"
    });
    Common.initSelect2("districtId", {

        width: "380px"
    });
    Common.initSelect2("plateId", {

        width: "380px"
    });
    Common.initSelect2("saleStatus", {
        width: "380px"
    });
    Common.initSelect2("status", {
        width: "380px"
    });
    Common.initSelect2("tags", {
        width: "380px"
    });
    Common.initSelect2("companyId", {
        minimumResultsForSearch : 1,
        width: "380px"
    });


});
/**
 * 计算容积率
 * lx
 */
function jsVolumeRate() {
    var footprint = $('#footprint').val();
    var floorArea = $('#floorArea').val();
    var volumeRatio =0;
    if (Common.isEmpty(footprint) || Common.isEmpty(floorArea) || footprint == 0) {
        volumeRatio=0
    }else {
        volumeRatio = (floorArea / footprint).toFixed(2);
    }
    $('#volumeRatio').val(volumeRatio);
}
