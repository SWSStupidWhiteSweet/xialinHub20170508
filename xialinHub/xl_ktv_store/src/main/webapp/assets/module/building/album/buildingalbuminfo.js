$(function($) {
	
	/**
	 * 初始化上传按钮
	 */
	for(var i=0;i<$("#size").val();i++){
		if($("#upload_"+(i+1))){
			$("#upload_"+(i+1)).uploadifive({
				buttonClass : "btn btn-xs btn-info",
				buttonText : "上传相册图片",
				uploadScript : "../common/upload/file",
				fileSizeLimit : 1024 * 20,
				fileType : "image/*",
				height : "30px",
				width : "100%",
				queueSizeLimit : 1,
				multi : true,
				removeCompleted : true,
				onUploadComplete : function(file, data) {
					var albumId = $(this).attr("albumId");
					Common.prompt("请输入图片描述!(选填)",null,function(albumPicDescript){
						savePicLog(data,albumId,albumPicDescript);
					},"yes");
				}
			});
		}
	}
	/**
	 * 绑定保存按钮
	 */
	$("#saveBtn").click(function(){
		var descriptInfoStr = "";//所有描述的信息
		var cover = "";//设置为封面
		var carousel = "";//设置为轮播
		//封装数据    相册ID=描述=路径;相册ID2=描述2=路径2
		for(var i=0;i<$("#size").val();i++){
			if($("#describe_"+(i+1)).val())
			descriptInfoStr+= $("#describe_"+(i+1)).val()+"="+$("#describe_url_"+(i+1)).val()+"="+(i+1)+";";
		}
		$('input[name="radio_cover"]:checked').each(function(){
			cover=this.value;
		});
		$('input[name="check_carousel"]:checked').each(function(){
			carousel+=this.value+",";
		});
		descriptInfoStr = descriptInfoStr.substring(0,descriptInfoStr.length-1);
		carousel = carousel.substring(0,carousel.length-1);
		
		$.ajax({
			url : "savepiccfg",
			type : "post",
			dataType : "json",
			data : {
				buildingProjectId : $("#buildingProjectId").val(),
				cover : cover,
				carousel : carousel,
				descriptInfoStr : descriptInfoStr
			},
			success : function(json) {
				if (json.isSuccess) {
					Common.alert(json.msg, true,function(){
						window.scrollTo(0,0);
						location.reload();
					});
				} else {
					Common.alert(json.msg, false);
				}
			}
		});
		
	});
	function savePicLog(data,albumId,albumPicDescript){
		var jsonData = eval("(" + data + ")")[0];
		$.ajax({
			url : "create",
			type : "post",
			dataType : "json",
			data : {
				albumId : albumId,
				buildingProjectId : $("#buildingProjectId").val(),
				albumPicName : jsonData.fileName,
				albumPicUrl : jsonData.httpPath,
				albumPicDiskPath : jsonData.diskPath,
				albumPicDescript : albumPicDescript
			},
			success : function(json) {
				if (json.isSuccess) {
					Common.alert(json.msg, true);
				} else {
					Common.alert(json.msg, false);
				}
			}
		});
	}
});
/**
 * 删除图片
 */
function deletePic(albumPicId) {
	Common.confirm("你确定删除该图片吗？", function() {
		$.ajax({
			url : "delete",
			type : "post",
			dataType : "json",
			data : {
				albumPicId : albumPicId
			},
			success : function(json) {
				if (json.isSuccess) {
					Common.alert(json.msg, true, function() {
						location.reload();
					});
				} else {
					Common.alert(json.msg, false);
				}
			}
		});
	});
}
/**
 * 审核不通过
 */
function auditNoAgree(albumPicLogId) {
	Common.prompt("请输入不通过理由!", "请输入不通过理由", function(auditReason) {
		audit(albumPicLogId, "noAgree", auditReason);
	});
}

/**
 * 审核通过
 */
function auditAgree(albumPicLogId) {
	audit(albumPicLogId, "agree");
}
/**
 * 审核
 */
function audit(albumPicLogId, type, auditReason) {
	$.ajax({
		url : "audit",
		type : "post",
		dataType : "json",
		data : {
			albumPicLogId : albumPicLogId,
			type : type,
			auditReason : auditReason
		},
		success : function(json) {
			if (json.isSuccess) {
				Common.alert(json.msg, true, function() {
					location.reload();
				});
			} else {
				Common.alert(json.msg, false);
			}
		}
	});
}

function clickParentPic(thisObj) {
	var picUrlArray=[];
	var clickImg=$(thisObj).attr('src');
	$('.ace-thumbnails [data-xx="hk"]').each(function(){
		var tmpImg=$(this).attr('src');
		var tmpAlt=$(this).attr('alt');
		picUrlArray.push({src:tmpImg, alt:tmpAlt});
	});
	if(typeof window.parent.parent.showPic =='function') {
		window.parent.parent.showPic(picUrlArray, clickImg);
	}
}