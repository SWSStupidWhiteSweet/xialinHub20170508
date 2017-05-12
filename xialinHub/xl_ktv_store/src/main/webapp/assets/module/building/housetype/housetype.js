$(function($) {
    var buildingProjectId =$("#buildingProjectId").val();
	var propertyId="";
	var propertyTypeId="";
    /**
	 * 新增页面跳转
	 * lx
     */
	$(".goAdd").click(function(){
        	propertyId=$(this).attr("data-value");
        	propertyTypeId=$(this).attr("art");
			window.parent.location.href = "add?buildingProjectId=" +buildingProjectId +"&propertyId="+propertyId+"&propertyTypeId="+propertyTypeId;
	});
    /**
	 * lx
	 * 删除户型
     */
	$(".blpc-btn-gray").click(function(){
				var houseId=$(this).attr('houseId');
				blpc.confirm("您确定要删除选中数据吗？",{
                          type:"warning",
                          sure:function(){
                        	  $.ajax({
				                        type:"POST",
				                        url:"deleteuserhouse",
				                        data: {houseId:houseId},
				                        success : function(json) {
				            				if (json.isSuccess) {
				            					Common.alert("删除成功等待审核！", true);
				            				} else {
				            					Common.messageBox("提示", json.msg, false);
				            				}
				            			},
				            			error : function() {
				            				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
				            			}
			                   });
			              }
				}
			                 );
				  });
    /**
	 * lx
	 * 修改页面跳转
     */
	 $(".blpc-btn-s").click(function(){
		   var houseId=$(this).attr('houseId');
				 propertyId=$(this).attr("data-value");
				 propertyTypeId=$(this).attr("art");
		   window.parent.location.href = "edit?houseId="+houseId+"&buildingProjectId="+buildingProjectId+"&propertyId="+propertyId+"&propertyTypeId="+propertyTypeId;
	 });
});
