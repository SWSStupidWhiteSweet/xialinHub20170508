$(function(){
	Common.initSelect2("status", {
		width : "180px"
	});
	/**
	 * 绑定返回事件
	 */
	$("#backBtn").click(function() {
		back();
	});
	//初始化画廊
	$('.ace-thumbnails [data-rel="colorbox"]').colorbox(Common.colorbox_params);
	
	/**
	 * 绑定上传
	 */
	$("#upload").uploadifive({
		buttonClass : "btn btn-xs btn-info",
		buttonText : "上传截图附件",
		uploadScript : "../common/upload/file",
		fileSizeLimit : 1024 * 20,
		fileType : "image/*",
		height : "30px",
		width : "100px",
		queueSizeLimit : 1,
		multi : true,
		removeCompleted : true,
		onUploadComplete : function(file, data) {
			var data = eval("(" + data + ")")[0];
			var imgStr = 
				'<div class="col-sm-9" style="margin-left:25%;padding-left:20px;">'
				+'		<img title="'+data.srcFileName+'" src="..'+data.httpUrl+data.fileName+'" style="height: 200px;width: 200px;" /></div>'
			$("#upload_img").html(imgStr);
			$("#contentImg").val(data.httpPath);
		}
	});
	
	/**
	 * 保存
	 */
	$("#saveBtn").click(function(e) {
		//表单验证
		if (!$('#buildingContentForm').valid()) {
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}
		
		//获取页面数据
		var type = $("#type").val();
		var url = type == "add" ? "create" : "update";

		var buildingProjectId = $("#buildingProjectId").val();
		var title = $("#title").val();
		var content = $("#editor1").html();
		var tel = $("#tel").val();
		var status = $("#status").val();
		var contentImg = $("#contentImg").val();

		var contentId = $("#contentId").val();
		var fingerprint = $("#fingerprint").val();
		//验证下来选
		if(!status){
			Common.messageBox("提示", "请选择状态！", false);
			$("#status").select2("open");
			return false;
		}
		
		if(contentImg=='' || contentImg == null){
			Common.messageBox("提示", "请输上传图片！", false);
            return false;
		}
		
		//交互
		$.ajax({
			url : url,
			type : "post",
			data : {
				buildingProjectId : buildingProjectId,
				title : title,
				content : content,
				tel : tel,
				status : status,
				contentId : contentId,
				fingerprint : fingerprint,
				contentImg : contentImg
			},
			dataType : "json",
			success : function(json) {
				if (json.isSuccess) {
					Common.alert(json.msg, true, function(){
						back();
					});
				} else {
					Common.messageBox("提示", json.msg, false);
				}
			},
			error : function() {
				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
			}
		});
	});
	
	//定义验证提示
	Common.formValidate("buildingContentForm", {
		title: {
            required: true,
            maxlength: 48
        },
        content: {
            required: true
        },
        tel: {
            required: true,
			minlength : 8,
			maxlength : 11
        }
    }, {
    	title: {
            required: "标题名称不能为空.",
            maxlength: "标题名称不能48个汉字."
        },
        content: {
            required: "楼盘动态内容不能为空."
        },
        tel: {
            required: "联系电话不能为空.",
			minlength : "联系电话至少8位.",
			maxlength : "联系电话不能超过11位."
        }
    });
	
	
	/**
	 * 返回方法
	 */
	function back(){
        location.href = "../buildingproject/modify?buildingProjectId="+$("#buildingProjectId").val()+"&type=contentDiv";
	}
	
	//富文本编辑器初始化
	$('#editor1').ace_wysiwyg().prev().addClass('wysiwyg-style2');
});