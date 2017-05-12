$(function($) {	
	
	var buildingInfoId="${param.building_info_id}";
	var zjArr='${tagMap}';
	var	houseType = '${houseType}'
	var houseId='${houseId}';
	var path=$("#path").val();
	var curfingerprint="";
	var option="";
	var ishideShowRoom=0;
	for(var i=0;i<10;i++){
		option+='<option value="'+i+'">'+i+'</option>';
	}
	$("#roomTotal").append(option);
	$("#livingRoomTotal").append(option);
	$("#kitchenTotal").append(option);
	$("#bathroomTotal").append(option); 
 
	$("#uploadFile").uploadifive({
//		buttonClass : "btn btn-success",
		buttonText : "选择文件",
		uploadScript : "../../common/upload/file",
		fileSizeLimit : 1024 * 20,
		fileType : "image/*",
		//fileTypeExts : "*.jpg;*.jpeg;*.png;*.bmp",
		queueSizeLimit : 1,
		removeCompleted : true,
		onUploadComplete : function(file, data) {
			var jsonData = eval("(" + data + ")");
			alert(jsonData[0].srcFileName);
			var addimg= $(this).attr("id");
			var showimg='';
		    showimg+='<div class="matting-img-wrap">';
        	showimg+='<img src="'+path+jsonData[0].httpPath+'" id = "'+jsonData[0].httpPath+'"  albumtype="'+addimg+'" class="matting-img"/>';
        	showimg+='<div class="matting-img-bottom">';
        	showimg+='<input class="ismainCheck" name="mainImg"  type="radio" art="'+jsonData[0].httpPath+'" >';
        	showimg+='<span>设置列表封面图</span>';
       		showimg+='</div>';
       		showimg+='<div class="matting-img-close" art="'+jsonData[0].httpPath+'"></div></div>';
       		$("#"+addimg).append(showimg);
       		$('.matting-img').dblclick(function(){
			var picUrlArray=[];
			$('.matting-img').each(function(){
				picUrlArray.push($(this).attr('src').replace('${path}',''));
				
			});
			window.parent.showPic(picUrlArray);
		});
		blpc._initCheckboxAndRadio();
		 $(".matting-img-close").click(function(){
			 $(this).parent().remove();
		  });
		}
	});
   
    
    $("#haveShowImg").change(function(){
    var selectValue=$(this).val();
    if(selectValue==0){
      $("#prototypehide").hide();
      ishideShowRoom=0;
    }else{
    $("#prototypehide").show();
      ishideShowRoom=1;
    }
    });
    $("#cancel_btn").click(function(){
    	        blpc.confirm("您确定要取消本条数据吗？",{
    	            type:"warning",
    	              sure:function(){
    	            window.parent.Addtabs.close("tab_editUserHouse");
    	            }
    	        });
    });
    
   
    $("#save_btn").click(function(){
        if(blpc.validateForm("add_house")){
               var ajaxJson= blpc.transJsonById("add_house");
               var tags=[]
               var i=0;
    		   $(".blpc-houseinfo-label-link").each(function(){
    			  var labelStatus={};
    			   labelStatus.tagId=$(this).attr("tagId");
    			   labelStatus.tagName=$(this).text();
    			   tags[i]=labelStatus;
    			   i=i+1;
    			   });
    	       console.log(tags);
    		   ajaxJson.houseTag=JSON.stringify(tags);
    		   var ishousehot= $("#houseHotTrue").prop("checked");
    		   if(ishousehot){
    		      ajaxJson.houseHot=1;
    		   }else{
    		      ajaxJson.houseHot=0;
    		   }
    		   ajaxJson.buildingProjectId=1;
    		   ajaxJson.propertyTypeId=1;
    		   ajaxJson.propertyId=1;
    		   $(".matting-img").each(function(){
                       var albumtype=$(this).attr('albumtype');
                       if(albumtype=='housePic'){
                         if(ajaxJson['houseImgList']!=null&&ajaxJson['houseImgList']!="undefined"){
    			               	 ajaxJson['houseImgList']+=","+$(this).attr('art');
    			            }else{
    			                 ajaxJson['houseImgList']=$(this).attr('art');
    			           }
                       }
                       if(albumtype=='prototypeRoom'){
                    	   if(ishideShowRoom==1){
                    		   if(ajaxJson['showHouseList']!=null&&ajaxJson['showHouseList']!="undefined"){
                    			   ajaxJson['showHouseList']+=","+$(this).attr('art');
                    		   }else{
    			                 ajaxJson['showHouseList']=$(this).attr('art');
                    		   }
                    	   }
                    	}
                 });
    		     var valTest=false;
    		     if(ajaxJson['houseImgList']==null||ajaxJson['houseImgList']=="undefined"||ajaxJson['housePicList']==""){
    		    	$("#valhousePic").show();
    		    	valTest=true;
    		     }
    		     console.log('showHouseList');
    		     console.log(ajaxJson['showHouseList']);
    		     if(ishideShowRoom==1){
    		     if(ajaxJson['showHouseList']==null||ajaxJson['showHouseList']=="undefined"||ajaxJson['showHouseList']==""){
    		    	  $("#valprototypeRoom").show();
    		    	  valTest=true;
    		     }}
    		     if(valTest){
    		    	 blpc.confirm("请正确填入数据",{
    		             type:"warning"
    		             });
    		    	 return;
    		     }
                 $(".ismainCheck").each(function(){
                       var isture= $(this).prop("checked");
                       if(isture==true){
                         ajaxJson['houseMainImg']=$(this).attr('art');
                       }
                     });
                 if(ajaxJson['houseMainImg']=='undefined'||ajaxJson['houseMainImg']==null){
                	 var tmp=ajaxJson['houseImgList'].split(',');
                	 console.log(tmp);
                	 ajaxJson['houseMainImg']=tmp[0];
                 }
            ajaxJson.fingerprint=curfingerprint;
            console.log(ajaxJson);
            blpc.confirm("您确定要保存本条数据吗？",{
	            type:"warning",
	        	sure:function(){
	        		 $.showMask(); 
         	$.ajax({
				type:"POST",
				url: "saveUserHouse?actionType=e",
				dataType:"json",
			    contentType:"application/json;charset=utf-8",
				data:JSON.stringify(ajaxJson),
				success : function(json) {
    				if (json.isSuccess) {
    					Common.alert("保存成功！", true, back);
    				} else {
    					Common.messageBox("提示", json.msg, false);
    				}
    			},
    			error : function() {
    				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
    			}
			});
        }
		});
		}else{
		    blpc.confirm("请正确填入数据",{
            type:"warning"
            });
		}
    });
    
    //初始化
    blpc.documentReady(function(){
    		$("#prototypehide").hide();
			$("p.blpc-houseinfo-label").click(function(){
				var label=$(this).attr("class");
				if(label!='undefined'&&label=='blpc-houseinfo-label'){
				 	$(this).removeClass("blpc-houseinfo-label").addClass("blpc-houseinfo-label-link");
				}else{
				 	$(this).removeClass("blpc-houseinfo-label-link").addClass("blpc-houseinfo-label");
				}
			});
			if(houseType.houseImgList!=null&&houseType.houseImgList!='undefined'&&houseType.showHouseList!=''){
			    	   var array = houseType.houseImgList.split(",");
			    	   for(var j=0;j<array.length;j++){
			    	   			var loadimg='';
			    	   			loadimg+='<div class="matting-img-wrap">';
			    	   			loadimg+='<img src="'+path+array[j]+'" art="'+array[j]+'" albumtype="housePic" class="matting-img"/>';
			    	   			loadimg+='<div class="matting-img-bottom">';
			    	   			loadimg+='<input class="ismainCheck" name="mainImg" type="radio" art="'+array[j]+'">';
			    	   			loadimg+='<span>设置列表封面图</span>';
			    	   			loadimg+='</div>';
			    	   			loadimg+='<div class="matting-img-close" art="'+array[j]+'"></div></div>';
			    	   			$("#housePic").append(loadimg);
						} 
			 }
				    
			 $("#houseName").val(houseType.houseName);
			 $("#roomTotal").val(houseType.roomTotal);
			 $("#livingRoomTotal").val(houseType.livingRoomTotal);
			 $("#kitchenTotal").val(houseType.kitchenTotal);
			 $("#bathroomTotal").val(houseType.bathroomTotal);
			 $("#floorArea").val(houseType.floorArea);
			 $("#useArea").val(houseType.useArea);
			 $("#giveArea").val(houseType.giveArea);
			 $("#housePrice").val(houseType.housePrice);
			 $("#show720Url").val(houseType.show720Url);
			 $("#orientationId").val(houseType.orientation);
			 curfingerprint=houseType.fingerprint;
			           
			 //样板间
			 if(houseType.showHouseList!=null&&houseType.showHouseList!='undefined'&&houseType.showHouseList!=''){
			       $("#haveShowImg").val(1);
			       $("#prototypehide").show();
			       ishideShowRoom=1;
			       var array = houseType.showHouseList.split(",");
			        	 for(var j=0;j<array.length;j++){
			        		   var loadimg='';
			        		   loadimg+='<div class="matting-img-wrap">';
			        		   loadimg+='<img src="'+path+array[j]+'" art="'+array[j]+'" albumtype="prototypeRoom" class="matting-img"/>';
			        		   loadimg+='<div class="matting-img-bottom">';
			        		   loadimg+='<input class="ismainCheck" name="mainImg" type="radio" art="'+array[j]+'">';
			        		   loadimg+='<span>设置列表封面图</span>';
			        		   loadimg+='</div>';
			        		   loadimg+='<div class="matting-img-close" art="'+array[j]+'"></div></div>';
			        		   $("#prototypeRoom").append(loadimg);
			        	   }
			 }else{
			       $("#haveShowImg").val(0);
			        	  	ishideShowRoom=0;
			 }
			 blpc._initCheckboxAndRadio();
			       
			 if(houseType.houseHot==1){
			       $("#houseHotTrue").iCheck("check")
			 }else{
			       $("#houseHotFalse").iCheck("check")
			 }
			 $("#houseDescript").val(houseType.houseDescript);
			 var house_mainImg=houseType.houseMainImg;
			 if(house_mainImg!=null&&house_mainImg!=''&&house_mainImg!='undefined'){
			        $(".ismainCheck").each(function(){
			        	var isture= $(this).attr("art");
			        	if(isture==house_mainImg){
			        		$(this).iCheck("check")
			        	}
			        });
			 }
			          
			 var tagSelect=jQuery.parseJSON(houseType.houseTag);
			 $(".blpc-houseinfo-label").each(function(){
			        var tagId=$(this).attr('tagId');
			        console.log(tagId);
			        for(var i=0;i<tagSelect.length;i++){
			             if(tagSelect[i].tagId==tagId){
			                 $(this).removeClass("blpc-houseinfo-label").addClass("blpc-houseinfo-label-link");
			             }
			        }
			 });
			 $(".matting-img-close").click(function(){
			        $(this).parent().remove();
			 });
			 $('.matting-img').dblclick(function(){
					var picUrlArray=[];
					$('.matting-img').each(function(){
						picUrlArray.push($(this).attr('src'));
					});
					window.parent.showPic(picUrlArray);
			 });
			
    });
});