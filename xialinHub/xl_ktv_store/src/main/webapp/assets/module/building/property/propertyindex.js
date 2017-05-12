$(function($) {
	
	var propertyTypes=null;
	var buildingTypes=null;
	var propertys = null;
	var buildingProjectId =$("#buildingProjectId").val();
	//buildingProjectId = 1;

	var fingerprint={};
	function createbuildingType(property_type_id){
            
		var buildingTypeHtml="";
            buildingTypeHtml+='<div class="estate-row-input">';
            for(var i=0;i<buildingTypes.length;i++){
            if(property_type_id==buildingTypes[i].propertyTypeId){
                 buildingTypeHtml+='<div class="estate-check-group">';
				 buildingTypeHtml+='<input type="checkbox" name="building_type_'+property_type_id+'" class="building_type_'+property_type_id+'" buildType="'+buildingTypes[i].buildingTypeId+'" proType="'+property_type_id+'">';
				 buildingTypeHtml+='<label>'+buildingTypes[i].buildingTypeName+'</label>';
				 buildingTypeHtml+='</div>';
             }	
          }
		  buildingTypeHtml+='</div>';
		  return buildingTypeHtml;
     }
	
	function findPropertyName(property_type_id){
        for(var i=0;i<propertyTypes.length;i++){
           if(propertyTypes[i].propertyTypeId==property_type_id){
             return propertyTypes[i].propertyTypeName;
           }
        }
        return "Unknow";
    }
	
    function createbuilding(property_type_id){
            var html='<div id="property_type_'+property_type_id+'" class="estate-card" propertyId="">\
					<div class="estate-card-title">'+findPropertyName(property_type_id)+'</div>\
					<div class="estate-content-row">\
						<div class="estate-row-title">建筑类型:</div>\
						<div class="estate-val" id="val'+property_type_id+'" style="color:red" hidden>建筑类型为必选项</div>\
						<div  class="estate-row-input">'+ createbuildingType(property_type_id)+ '</div>\
					</div>\
					<div class="estate-content-row">\
						<div class="estate-row-title">物业费:</div>\
						<div class="estate-val" id="valPropertyPrice'+property_type_id+'" style="color:red" hidden>物业费为必选项</div>\
						<div class="estate-row-input">\
							<input type="text" class="blpc-middle-input" placeholder="2.30元/平方米/月" id="property_price_'+property_type_id+'">元\
							<input type="checkbox" id="property_price_undetermined_'+property_type_id+'">待定\
						</div>\
					</div>\
					<div class="estate-content-row">\
						<div class="estate-row-title">均价:</div>\
						<div class="estate-val" id="valPrice'+property_type_id+'" style="color:red" hidden>均价为必选项</div>\
						<div class="estate-row-input">\
							<input type="text" class="blpc-middle-input" placeholder="14000/平方米" id="price_'+property_type_id+'">元\
							<input type="checkbox" id="price_undetermined_'+property_type_id+'"/>待定\
						</div>\
					</div>\
					<div class="estate-content-row">\
						<div class="estate-row-title">产权年限:</div>\
						<div class="estate-row-input">\
							<select class="blpc-select" id="property_rights_years_'+property_type_id+'">\
				                <option value="70">70年</option>\
				                <option value="50">50年</option>\
				                <option value="40">40年</option>\
				                <option value="35">35年</option>\
				                <option value="20">20年</option>\
				            </select>\
						</div>\
					</div>\
					<div class="estate-content-row">\
						<div class="estate-row-title">装修情况:</div>\
						<div class="estate-val" id="decoration'+property_type_id+'" style="color:red" hidden>装修情况为必选项</div>\
						<div class="estate-row-input">\
							<div class="estate-check-group">\
								<input type="radio" name="decoration_type_'+property_type_id+'" class="decoration_type_'+property_type_id+'" value="1">\
								<label>毛坯</label>\
							</div>\
							<div class="estate-check-group">\
								<input type="radio" name="decoration_type_'+property_type_id+'" class="decoration_type_'+property_type_id+'" value="2">\
								<label>简装</label>\
							</div>\
							<div class="estate-check-group">\
								<input type="radio" name="decoration_type_'+property_type_id+'" class="decoration_type_'+property_type_id+'" value="3">\
								<label>精装</label>\
							</div>\
						</div>\
					</div>\
				</div>';
		  return html;
       } 
    
       $.ajax({
		    type:"POST",
		    url: "getPropertyInit",
		    data:{
				buildingProjectId : buildingProjectId
			},
			dataType : "json",
		    success: function(data){
		         console.log(data);
		         propertyTypes=data.propertytypeList;
		         buildingTypes=data.buildingtypeList;
		         propertys=data.propertyList;
		         for(var i=0;i<propertyTypes.length;i++){
		        	 var loadHtmlProperty="";
		        	 loadHtmlProperty+='<div class="estate-check-group">';
		        	 loadHtmlProperty+='<input type="checkbox" name="estate_type" class="estate-type" value="'+propertyTypes[i].propertyTypeId+'">';
		        	 loadHtmlProperty+='<label>'+propertyTypes[i].propertyTypeName+'</label></div>';
		        	 $("#property_type").append(loadHtmlProperty);
			     
		        	 $("#building_type").append(createbuilding(propertyTypes[i].propertyTypeId));
			    }
			    $(".estate-card").each(function(){
			    	 $(this).hide();
			    });
			     blpc._initCheckboxAndRadio();
			     for(var i=0;i<propertys.length;i++){
			        fingerprint[propertys[i].propertyTypeId]=propertys[i].fingerprint;
			        $("#property_type_"+propertys[i].propertyTypeId).attr("propertyId",propertys[i].propertyId);
			        $("#property_rights_years_"+propertys[i].propertyTypeId).val(propertys[i].propertyRightsYears);
			        if(propertys[i].propertyPrice==0){
			        	$("#property_price_undetermined_"+ propertys[i].propertyTypeId).parent("div").addClass("checked");
                        $("#property_price_undetermined_"+ propertys[i].propertyTypeId).attr("checked","checked");
                    }else {
                        $("#property_price_" + propertys[i].propertyTypeId).val(propertys[i].propertyPrice);
                    }
                     if(propertys[i].price==0){
						$("#price_undetermined_"+ propertys[i].propertyTypeId).parent("div").addClass("checked");
                         $("#price_undetermined_"+ propertys[i].propertyTypeId).attr("checked","checked");
                     }else {
                         $("#price_" + propertys[i].propertyTypeId).val(propertys[i].price);
                     }
			         $(".building_type_"+propertys[i].propertyTypeId).each(function(){
			           var buildingType_id= $(this).attr('buildType');
			           var buildingTypeChecked= propertys[i].buildType.split('|');
			           for(var j=0;j<buildingTypeChecked.length;j++){
			             if(buildingTypeChecked[j]==buildingType_id){
			               $(this).iCheck("check");
			             }
			           }
			         });
			         $(".decoration_type_"+propertys[i].propertyTypeId).each(function(){
			           var decoration_type_id= $(this).attr('value');
			             
			             if(propertys[i].decorationTypeId==decoration_type_id){
			               $(this).iCheck("check");
			             }
			         });
			         $(".estate-type").each(function(){
			         var propertyIdChecked=$(this).attr('value');
			        if(propertys[i].propertyTypeId==propertyIdChecked){
			            $(this).iCheck("check");
			            $("#property_type_"+propertyIdChecked).show();
			        }});
			       
			     }
			    
			      $(".estate-type").each(function(){
			      var propertyType= $(this).attr('value');
			      $(this).on('ifChanged',function(event){
			       if($(this).prop("checked")){
			        $("#property_type_"+propertyType).show();
			       }else{
			        $("#property_type_"+propertyType).hide();
			       }
			     })
			     });
			    
		    },
		    error:function(){
		   	}
		});

	$("#save").click(function(){
	   var buildingPropertyArray=[];
	   $(".estate-val").each(function(){
	      $(this).hide();
	   });
	   var isValidate="false";
	   $(".estate-card").each(function(){
	       var property_type_id=$(this).attr("id").replace("property_type_","");
	       var ishidden=$("#property_type_"+property_type_id).is(":hidden");
	       if(ishidden==false){
	          var building_property={};
	          building_property.buildingProjectId= buildingProjectId;
	          $(".building_type_"+property_type_id).each(function(){
	                if($(this).prop("checked")){
	                      if(building_property.buildType==null||building_property.buildType=="undefined"||building_property.buildType==""){
	                    	  building_property.buildType=$(this).attr("buildType");
	                      }else{
	                    	  building_property.buildType+="|"+$(this).attr("buildType");
	                      }
	                }
	           });
	          console.log(building_property);
	           $(".decoration_type_"+property_type_id).each(function(){
	               if($(this).prop("checked")){
	                  building_property.decorationTypeId=$(this).attr("value");
	               }
	           });
	           
	           building_property.price=$("#price_"+property_type_id).val();
	           building_property.propertyId=$("#property_type_"+property_type_id).attr("propertyId");
	           building_property.propertyPrice=$("#property_price_"+property_type_id).val();
	           building_property.propertyRightsYears=$("#property_rights_years_"+property_type_id).val();
	           building_property.propertyTypeId=property_type_id;
	           building_property.fingerprint=fingerprint[property_type_id];
	           if(building_property.buildType==null||building_property.buildType=="undefined"||building_property.buildType==""){
	        	   isValidate="true";
	        	   $("#val"+property_type_id).show();
	           }
               if($("#price_undetermined_"+ property_type_id).is(':checked')){
                   building_property.price=0;
               }
	           if(building_property.price==null||building_property.price=="undefined"||building_property.price==""){
                   if(!$("#price_undetermined_"+ property_type_id).is(':checked')) {
                       isValidate = "true";
                       $("#valPrice" + property_type_id).show();
                   }
	           }
	           if(!blpc.validateInt(building_property.price) && !blpc.validateFloat(building_property.price)){
	               isValidate="true";
	               $("#valPrice"+property_type_id).text("请输入数字!");
	               $("#valPrice"+property_type_id).show();
	           }
               if($("#property_price_undetermined_"+ property_type_id).is(':checked')){
                   building_property.propertyPrice=0;
               }
	           if(building_property.propertyPrice==null||building_property.propertyPrice=="undefined"||building_property.propertyPrice==""){
                   if(!$("#property_price_undetermined_"+ property_type_id).is(':checked')) {
                       isValidate = "true";
                       $("#valPropertyPrice" + property_type_id).show();
                   }
	           }
	           if(!blpc.validateInt(building_property.propertyPrice) && !blpc.validateFloat(building_property.propertyPrice)){
	               isValidate="true";
	               $("#valPropertyPrice"+property_type_id).text("请输入数字!");
	               $("#valPropertyPrice"+property_type_id).show();
	           }
	           if(building_property.decorationTypeId==null||building_property.decorationTypeId=="undefined"||building_property.decorationTypeId==""){
	               isValidate="true";
	               $("#decoration"+property_type_id).show();
	           }
	           if(isValidate=="true"){
	        	   return;
	           }
	           buildingPropertyArray.push(building_property);
	       }
	    });
	    if(isValidate=="true"){
			Common.messageBox("提示", "表单信息填写不完整！", false);
	    	return ;
	    }
	    $.showMask();

	    $.ajax({

				type:"POST",
				url:"addAsEditProperty?buildingprojectid="+buildingProjectId,
				dataType:"json",
			    contentType:"application/json;charset=utf-8",
				data:JSON.stringify(buildingPropertyArray),
				success: function(data){
				       console.log(data);

				       $.hideMask();
				       if(data.isSuccess){
				    	  Common.alert(data.msg,true,function(){
				    		  history.go(0);
				    	  });
				       }else{
                                Common.alert("提示", Common.SERVER_EXCEPTION,false);
                       }
			    },
				error: function() {
					 $.hideMask();
                    Common.alert("提示", Common.SERVER_EXCEPTION,false);
					 blpc.alert("添加失败!");
				}
			});
	});	
	$("#canle_btn").click(function(e){
		Common.confirm("您确定要取消本条数据吗？",function() {
	            	window.location.reload();
	        });
	 });
});	 