$(function($) {
	var buildingInfoId="${param.building_info_id}";
 	var propertyTypeId="${param.property_type_id}";
 	console.log(buildingInfoId+"  ： "+propertyTypeId);
 	var option="";
 	var path=$("#path").val();
 	var ishideShowRoom=0;
 	for(var i=0;i<10;i++){
 		option+='<option value="'+i+'">'+i+'</option>';
 	}
 	$("#roomTotal").append(option);
 	$("#livingRoomTotal").append(option);
 	$("#kitchenTotal").append(option);
 	$("#bathroomTotal").append(option);

    $("#houseMainImg").uploadifive({
//		buttonClass : "btn btn-success",
        buttonText : "选择文件",
        uploadScript : "../../common/upload/file",
        fileSizeLimit : 1024 * 20,
        fileType : "image/*",
        queueSizeLimit : 1,
        removeCompleted : true,
        onUploadComplete : function(file, data) {
            var jsonData = eval("(" + data + ")");
            var htmlstr='<div><img src="'+"../../" + jsonData[0].httpPath.substring(1)+'"><h2 style="font-size:14px;margin:0px;">'+jsonData[0].srcFileName+'</h2 ></div>';
            var toSaveStr = jsonData[0].httpUrl+jsonData[0].smallFileName+":"+jsonData[0].srcFileName+";";
            toSvaeFileInfo += toSaveStr;
            $("#houseMainImgImage").html(htmlstr);
//			alert(toSvaeFileInfo);
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
              window.parent.Addtabs.close("tab_addUserHouse");
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
		   ajaxJson.buildingProjectId=$("#buildingProjectId").val();
		   ajaxJson.propertyTypeId=1;
		   ajaxJson.propertyId=1;

		   $(".matting-img").each(function(){
                   var albumtype=$(this).attr('albumtype');
                   if(albumtype=='housePic'){
                     if(ajaxJson['houseImgList']!=null&&ajaxJson['houseImgList']!="undefined"){
			               ajaxJson['houseImgList']+=","+$(this).attr('id');
			            }else{
			                 ajaxJson['houseImgList']=$(this).attr('id');
			           }
                   }
                   if(albumtype=='prototypeRoom'){
                   if(ishideShowRoom==1){
                     if(ajaxJson['showHouseList']!=null&&ajaxJson['showHouseList']!="undefined"){
			               ajaxJson['showHouseList']+=","+$(this).attr('id');
			            }else{
			                 ajaxJson['showHouseList']=$(this).attr('id');
			           }
                   }}
             });

		     console.log('houseImgList');
		     console.log(ajaxJson['houseImgList']);
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
             blpc.confirm("您确定要保存本条数据吗？",{
	            type:"warning",
	        	sure:function(){
	        		 $.showMask(); 
	         $.ajax({
				type:"POST",
				url:"saveUserHouse?actionType=a",
				dataType:"json",
			    contentType:"application/json;charset=utf-8",
				data:JSON.stringify(ajaxJson),
				success: function(data){
				        console.log(data);
				       var msgcode=data.msgcode;
				       $.hideMask();
				       if(msgcode=='successed'){
					         blpc.alert("添加成功",{
                                        type:"info",
                                        sure:function(){
                                        	 window.location.href = "index?buildingProjectId=" +buildingProjectId;
                                       } 
                              });
                       }else{
                            if(msgcode=='error'){
				               blpc.alert(data.msg);
				            }
                       }
			    },
				error: function() {
					$.hideMask();
					 blpc.alert("添加失败!");
					
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
    blpc.documentReady(function(){
    $("#prototypehide").hide();
     
		var options = "";
		$("p.blpc-houseinfo-label").click(function(){
			var label=$(this).attr("class");
			if(label!='undefined'&&label=='blpc-houseinfo-label'){
				$(this).removeClass("blpc-houseinfo-label").addClass("blpc-houseinfo-label-link");
			}else{
				$(this).removeClass("blpc-houseinfo-label-link").addClass("blpc-houseinfo-label");
			}
		});
    });
});	 