/**
 *   
 */
function reinitIframe() {
	var iframe = document.getElementById("view_frame");
	try {
		var bHeight = iframe.contentWindow.document.body.scrollHeight;
		var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
		var height = Math.max(bHeight, dHeight);
		iframe.height = height;
	} catch (ex) {
	}
}
window.setInterval("reinitIframe()", 200);

function logout() {
	location.href = "logout";
}

var viewer;
function showPic(picUrlArray, clickImg){
	$("#imagesListHk").empty();
	var imgArr="";
	for(var i=0;i<picUrlArray.length;i++){
		if(clickImg==picUrlArray[i].src) {
			imgArr+='<li><img id="clickHkImg" src="'+picUrlArray[i].src.replace("s_","l_")+'" alt="'+picUrlArray[i].alt+'"/></li>';
		} else {
			imgArr+='<li><img src="'+picUrlArray[i].src.replace("s_","l_")+'" alt="'+picUrlArray[i].alt+'"/></li>';
		}
	}
	$("#imagesListHk").append(imgArr);
	if (viewer) {
		viewer.destroy();
	}
	viewer = new Viewer(document.getElementById('imagesListHk'));
	$("#clickHkImg").click();
//	viewer.show();
}
