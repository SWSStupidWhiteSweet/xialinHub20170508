$(function(){
	
	/**
	 * 上传控件
	 */
	var orderAttachmentNameStr = "";
	var orderAttachmentUrlStr = "";
	var orderAttachmentTypeStr = "";
	$("#uploadFile").uploadifive({
//		buttonClass : "btn btn-success",
		buttonText : "选择文件",
		uploadScript : "../common/upload/file",
		fileSizeLimit : 1024 * 20,
		fileType : "image/*",
		queueSizeLimit : 1,
		removeCompleted : true,
		onUploadComplete : function(file, data) {
			var jsonData = eval("(" + data + ")");
			orderAttachmentNameStr += "," + jsonData[0].srcFileName;
			orderAttachmentUrlStr += "," + jsonData[0].httpPath;
			orderAttachmentTypeStr += "," + $("#fjNameDiv option:selected").text();
			$("#orderAttachmentNameStr").val(orderAttachmentNameStr);
			$("#orderAttachmentUrlStr").val(orderAttachmentUrlStr);
			$("#orderAttachmentTypeStr").val(orderAttachmentTypeStr);
		}
	});
	
})