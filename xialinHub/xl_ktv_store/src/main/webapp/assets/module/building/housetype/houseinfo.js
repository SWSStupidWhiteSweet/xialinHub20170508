var toSvaeFileInfo = "";
var showHouseListInfo="";
$(function () {
    Common.formValidate("buildingProjectForm", {
        houseName: {
            required: true,
            maxlength: 40
        },
        roomTotal: {
            required: true,
            digits: true
        },
        livingRoomTotal: {
            required: true,
            digits: true
        },
        bathroomTotal: {
            required: true,
            digits: true
        },
        kitchenTotal: {
            required: true,
            digits: true
        },
        houseDescript: {
            required: true,
            maxlength:200
        },
        floorArea: {
            required: true
        },
        useArea: {
            required: true
        },
        giveArea: {
            required: true
        },
        show720Url: {
            required: true
        }
    }, {
        houseName: {
            required: "户型名称不能为空.",
            maxlength: "户型名称不能超过40个汉字."
        },
        roomTotal: {
            required: "几室不能为空.",
            digits: "几室只能位数字"
        },
        livingRoomTotal: {
            required: "几厅不能为空",
            digits: "几厅只能位数字"
        },
        bathroomTotal:{
            required: "几卫不能为空",
            digits: "几卫只能位数字"
        },
        kitchenTotal: {
            required: "几厨不能为空",
            digits: "几厨只能位数字"
        },
        floorArea: {
            required: "建筑面积不能为空",

        },
        useArea: {
            required: "套内面积不能为空"
        },
        giveArea: {
            required: "赠送面积不能为空"

        },
        houseDescript: {
            required: "户型卖点不能为空",
            maxlength:"户型卖点最多200个字"
        },
        show720Url: {
            required: "720URL不能为空"
        }
    });
    //户型图列表上传
    $("#houseImgList").uploadifive({
        buttonText : "选择文件",
        uploadScript : "../../common/upload/file",
        fileSizeLimit : 1024 * 20,
        fileType : "image/*",
        queueSizeLimit : 1,
        removeCompleted : true,
        onUploadComplete : function(file, data) {

            var jsonData = eval("(" + data + ")");
            var htmlstr='<span  onclick="reUpload(this)"><img style="width:200px;height:200px;" name="'+jsonData[0].httpPath+'" src="'+"../../" + jsonData[0].httpPath.substring(1).replace('s_','')+'"></span>';
            var toSaveStr = jsonData[0].httpUrl+jsonData[0].smallFileName+":"+jsonData[0].srcFileName+";";
            toSvaeFileInfo += htmlstr;
            $.ajax({
                url : "saveimg",
                data : {

                    albumPicDiskPath : jsonData[0].diskPath,
                    albumPicUrl: jsonData[0].httpPath,
                    albumPicDescript:"户型图",
                    buildingProjectId:$('#buildingProjectId').val(),
                    albumPicName:jsonData[0].srcFileName
                },
                type : "post",
                dataType : "json",
                success : function(json) {
                    if(json.isSuccess){
                        var picId=$('#houseImgListImage').attr("data-value");
                        picId+=(json.msg+',');

                        var h=$("#houseImgListImage").html();
                        $('#houseImgListImage').attr("data-value",picId);
                        $("#houseImgListImage").html(h+htmlstr);
                    }
                },
                error : function() {
                    Common.messageBox("提示", "服务器繁忙,请稍后在重试！！", false);
                }
            });
        }
    });
    //封面图上传
    $("#houseMainImg").uploadifive({
        buttonText : "选择文件",
        uploadScript : "../../common/upload/file",
        fileSizeLimit : 1024 * 20,
        fileType : "image/*",
        queueSizeLimit : 1,
        removeCompleted : true,
        onUploadComplete : function(file, data) {

            var jsonData = eval("(" + data + ")");
            console.log(jsonData);
            var htmlstr='<div><img style="width:200px;height:200px;" name="'+jsonData[0].httpPath+'" src="'+"../../" + jsonData[0].httpPath.substring(1).replace('s_','')+'"><h2 style="font-size:14px;margin:0px;">'+jsonData[0].srcFileName+'</h2 ></div>';
            var toSaveStr = jsonData[0].httpUrl+jsonData[0].smallFileName+":"+jsonData[0].srcFileName+";";
           // toSvaeFileInfo += toSaveStr;


            $.ajax({
                url : "saveimg",
                data : {

                    albumPicDiskPath : jsonData[0].diskPath,
                    albumPicUrl: jsonData[0].httpPath,
                    albumPicDescript:"封面图",
                    buildingProjectId:$('#buildingProjectId').val(),
                    albumPicName:jsonData[0].srcFileName
                },
                type : "post",
                dataType : "json",
                success : function(json) {
                   if(json.isSuccess){

                       $('#showHouseMainImg').attr("data-value",json.msg);
                       $("#showHouseMainImg").html(htmlstr);
                   }
                },
                error : function() {
                    Common.messageBox("提示", "服务器繁忙,请稍后在重试！！", false);
                }
            });
        }
    });
    //样板间列表上传
    $("#showHouseList").uploadifive({

        buttonText : "选择文件",
        uploadScript : "../../common/upload/file",
        fileSizeLimit : 1024 * 20,
        fileType : "image/*",
        queueSizeLimit : 1,
        removeCompleted : true,
        onUploadComplete : function(file, data) {

            var jsonData = eval("(" + data + ")");
            console.log(jsonData);
            var albumPicUrl= jsonData[0].httpPath.substring(1);
            var htmlstr='<span  onclick="reUpload(this)"><img style="width:200px;height:200px;" name="'+jsonData[0].httpPath+'" src="'+"../../" + jsonData[0].httpPath.substring(1).replace('s_','')+'"></span>';
            var toSaveStr = jsonData[0].httpUrl+jsonData[0].smallFileName+":"+jsonData[0].srcFileName+";";
            showHouseListInfo += htmlstr;

            $.ajax({
                url : "saveimg",
                data : {

                    albumPicDiskPath : jsonData[0].diskPath,
                    albumPicUrl: jsonData[0].httpPath,
                    albumPicDescript:"样板间",
                    buildingProjectId:$('#buildingProjectId').val(),
                    albumPicName:jsonData[0].srcFileName
                },
                type : "post",
                dataType : "json",
                success : function(json) {
                    if(json.isSuccess){
                        var picId=$('#showHouseListImg').attr("data-value");
                        picId+=(json.msg+',');
                        $('#showHouseListImg').attr("data-value",picId);
                        var h= $("#showHouseListImg").html();
                        $("#showHouseListImg").html(h+htmlstr);
                    }
                },
                error : function() {
                    Common.messageBox("提示", "服务器繁忙,请稍后在重试！！", false);
                }
            });
        }
    });

    $("#saveBtn").click(function (e) {
        if (!$('#houseTypeForm').valid()) {
            e.preventDefault();
            Common.messageBox("提示", "表单信息填写不完整！", false);
            return false;
        }

        var actionType = $("#actionType").val();
        var url = actionType == "add" ? "create" : "update";
        var houseName = $('#houseName').val();
        var roomTotal = $('#roomTotal').val();
        var livingRoomTotal=$('#livingRoomTotal').val();
        var bathroomTotal=$('#bathroomTotal').val();
        var kitchenTotal=$('#kitchenTotal').val();
        var orientation=$('#orientation').val();
        var floorArea=$('#floorArea').val();
        var useArea=$('#useArea').val();
        var giveArea=$('#giveArea').val();
        var housePrice=$('#housePrice').val();
        var houseHot=$('#houseHot').val();
        var houseDescript=$('#houseDescript').val();
        var show720Url=$('#show720Url').val();
        var showHouseMainImg=$('#showHouseMainImg').attr("data-value");
        var houseImgListImage=$('#houseImgListImage').attr("data-value");
        var showHouseListImg=$('#showHouseListImg').attr("data-value");


          if (Common.isEmpty(orientation)) {
              Common.messageBox("提示", "请选择朝向！", false);
              $("#orientation").select2("open");
              return false;
          }

        var tagsArr=$('#houseTag').val();
        var tags = "";
        if (!Common.isEmpty(tagsArr)) {
            $('#houseTag option').each(function () {
                for (var i = 0; i < tagsArr.length; i++) {
                    if (!Common.isEmpty($(this).attr("value")) && $(this).attr("value") == tagsArr[i]) {

                        tags += "{tag_id:" + $(this).attr("value") + ",tag_name:" + $(this).text() + "},";
                    }
                }

            });
            tags = tags.substring(0, tags.length - 1);
            tags = "[" + tags + "]";
        }
        if (Common.isEmpty(showHouseMainImg)){
            Common.messageBox("提示", "请选择上传封面图！", false);
            return false;
        }


          if (Common.isEmpty(houseHot)) {
              Common.messageBox("提示", "请选择是否热卖户型！", false);
              $("#houseHot").select2("open");
              return false;
          }

          var footprintReg = /^\d+(\.\d+)?$/;
          if(! footprintReg.test(floorArea)){
              Common.messageBox("提示", "建筑面积请输入大于零的数！", false);
              return false;
          }
            if(! footprintReg.test(useArea)){
                Common.messageBox("提示", "套内面积请输入大于零的数！", false);
                return false;
            }

          if(Common.isEmpty(housePrice)&&(!$('#priceUndetermined').is(':checked'))){
              Common.messageBox("提示", "请输入价格！", false);
              return false;

          }
          if($('#priceUndetermined').is(':checked')){
              housePrice=0;
          }
        $.ajax({
            url: url,
            type: "post",
            data: {
                houseId:$('#houseId').val(),
                buildingProjectId:$('#buildingProjectId').val(),
                propertyTypeId: $('#propertyTypeId').val(),
                propertyId:$('#propertyId').val(),
                houseName:houseName,
                roomTotal :roomTotal,
                livingRoomTotal:livingRoomTotal,
                bathroomTotal:bathroomTotal,
                kitchenTotal:kitchenTotal,
                orientation:orientation,
                floorArea:floorArea,
                useArea:useArea,
                giveArea:giveArea,
                housePrice:housePrice,
                houseHot:houseHot,
                houseDescript:houseDescript,
                show720Url:show720Url,
                houseTag:tags,
                houseMainImg:showHouseMainImg,
                houseImgList:houseImgListImage,
                showHouseList:showHouseListImg
    },
        dataType : "json",
            success: function (json) {
            if (json.isSuccess) {
                Common.alert("申请成功，请等待审核", true, back);
            } else {
                Common.messageBox("提示", json.msg, false);
            }
        }

        ,
        error : function () {
            Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
        }
    })
        ;
    });


    $("#backBtn").click(back);



    Common.initSelect2("houseHot", {

        width: "200px"
    });
    Common.initSelect2("houseTag", {

        width: "200px"
    });
    Common.initSelect2("orientation", {

        width: "200px"
    });
    /**
     * 回显图片
     * @type {*}
     */
    var actionType = $("#actionType").val();
    if(actionType=="update"){
        var houseImgListImage=$('#houseImgListImage').attr("data-value");
        var showHouseListImg=$('#showHouseListImg').attr("data-value");
        var ids=houseImgListImage+","+showHouseListImg;
        $.ajax({
            url: "picbyids",
            type: "post",
            data: {
               ids:ids
            },
            dataType : "json",
            success: function (json) {
                var jsonArr=eval(json);
                var showHouse="";
                var housePicId="";
                var showPicId="";
                var houseImg="";
                for(var i=0;i<jsonArr.length;i++){
                    if("12"==jsonArr[i].albumId){
                        var htmlstr='<span  onclick="reUpload(this)"><img  style="width: 200px;height: 200px;" name="'+jsonArr[i].albumPicUrl+'"  src="'+"../../" + jsonArr[i].albumPicUrl+'"></span>';
                        showPicId+=(jsonArr[i].albumPicId+",");
                        showHouse+=htmlstr;
                    }else {
                        var htmlstr='<span  onclick="reUpload(this)"><img  style="width: 200px;height: 200px;" name="'+jsonArr[i].albumPicUrl+'" src="'+"../../" + jsonArr[i].albumPicUrl+'"></span>';
                        housePicId+=(jsonArr[i].albumPicId+",")
                        houseImg+=htmlstr;
                    }
                }
                $('#showHouseListImg').attr("data-value",showPicId);
                $("#showHouseListImg").html(showHouse);

                $('#houseImgListImage').attr("data-value",housePicId);
                $("#houseImgListImage").html(houseImg);
            }

            ,
            error : function () {
                Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
            }
        })
        ;
    }



});
function back() {
    var buildingProjectId=$('#buildingProjectId').val();
    location.href = "../../buildingproject/modify?buildingProjectId="+buildingProjectId+"&type="+"houseInfo";
}


/**
 * lx
 * 点击拖图片删除
 * @param e
 */
function reUpload(e) {
    if(confirm("你想删除这张图片吗？")){
        var urlStr=$(e).find("img").attr("name");
        $.ajax({
            url : "reupload",
            data : {

                albumPicUrl: urlStr
            },
            type : "post",
            dataType : "json",
            success : function(json) {
                if(json.isSuccess){
                    var picId=$(e).parent().attr("data-value");
                    $(e).parent().attr("data-value",picId.replace(json.msg+',',''));
                    $(e).remove()
                }
            },
            error : function() {
                Common.messageBox("提示", "服务器繁忙,请稍后在重试！！", false);
            }
        });
    }
}