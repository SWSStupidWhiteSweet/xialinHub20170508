var toSvaeFileInfo = "";
$(function() {
	$(".modal-dialog").hide();
	Common.initSelect2("agentIds", {
		width : "200px",
		minimumResultsForSearch : 1
	});
	Common.initSelect2("operatorId", {
		width : "200px",
		minimumResultsForSearch : 1
	});
	
	Common.initSelect2("recvSmsOperatorId", {
		width : "200px",
		minimumResultsForSearch : 1
	});

	
	//表单验证
	Common.formValidate("configCreateForm", {
		tobuyHours : {
			required : true,
			maxlength : 20,
			digits : true
		},
		tosignHours : {
			required : true,
			maxlength : 20,
			digits : true
		}
	}, {
		tobuyHours : {
			required : "认筹转认购时间不能为空.",
			maxlength : "最大长度为20",
			digits : "时间为小时数"
		},
		tosignHours : {
			required : "认购转签约时间不能为空.",
			maxlength : "最大长度为20",
			digits : "时间为小时数"
		}
	});

	//保存/更改案场配置提交
	$("#saveBtn").click(function(e) {
		$("#saveBtn").attr("disabled",true);
		if (!$('#configCreateForm').valid()) {
			$("#saveBtn").removeAttr("disabled");
			e.preventDefault();
			Common.messageBox("提示", "表单信息填写不完整！", false);
			return false;
		}
		var tobuyHours = $("#tobuyHours").val();
		var url = $("#url").val();
		var tosignHours = $("#tosignHours").val();
		var buildingProjectId = $("#buildingProjectId").val();
		var fingerprint=$("#fingerprint").val();
		var buildingConfigId = $("#buildingConfigId").val();
		
		//获取选中的标签
		var agentIds = "";
		$("#selAgentIds").find("div").each(function(index,element){ 
			agentIds+=$(element).attr("name")+","; 
		}); 
		
		//联代方ID-人员ID
		var agentOperatorIds="";
		var bool=true;
		$("#selAgentIds").find("div").each(function(index,element){ 
			if($(element).attr("class")=="agents" && $(element).attr("value").split("-")[1]==""){
				bool=false;
				return false;
			}
			agentOperatorIds+=$(element).attr("value")+","; 
		}); 
		
		if(bool==false){
			$("#saveBtn").removeAttr("disabled");
			Common.messageBox("提示", "新选联代方必须绑定联代方管理人员！", false);
			return false;
		}
		
		if(agentIds.length>0){
			//去掉末尾逗号
			agentIds=agentIds.substring(0,agentIds.length-1);
			agentOperatorIds=agentOperatorIds.substring(0,agentOperatorIds.length-1);
		}
		
		/*if (Common.isEmpty(agentIds)) {
			Common.messageBox("提示", "请选择联代方！", false);
			$("#agentIds").select2("open");
			return false;
		}
		*/
		var a=agentIds;
		$.ajax({
			url : url,
			type : "post",
			data : {
				agentIds :""+ a+"",
				tobuyHours : tobuyHours,
				tosignHours : tosignHours,
				fingerprint:fingerprint,
				buildingConfigId:buildingConfigId,
				agentOperatorIds:agentOperatorIds,
				buildingProjectId:buildingProjectId,
				recvSmsOperatorId:$("#recvSmsOperatorId").val()
			},
			dataType : "json",
			success : function(json) {
				$("#saveBtn").removeAttr("disabled");
				if (json.isSuccess) {
					Common.alert("楼盘案场配置成功！", true,back);
				} else {
					Common.messageBox("提示", json.msg, false);
				}
			},
			error : function() {
				$("#saveBtn").removeAttr("disabled");
				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
			}
		});
	});
	
	$("#backBtn").click(back);

	function back() {
		window.parent.location.href = "modify?buildingProjectId="+$("#buildingProjectId").val()+"&type=configDiv";
	}
});
//移除标签
function removeAgent(id,text){
	 Common.confirm("请确认是否要取消该代理公司？", function () {
		$("#agentIds").append("<option value='"+id+"'>"+text+"</option>");
		$("div#agent"+id+"").remove();
		$("#agentOperatorCombo").html("<select id=\"operatorId\" name=\"operatorId\" data-placeholder=\"选择联代方人员\" onchange=\"selectAgent();\" url=\"../common/getallagentoperatorcombo\"></select>");
		Common.initSelect2("operatorId", {
			width : "200px"
		});
	});
}

//移除选中项，显示到标签
function selectAgent(){
	var agentid=$("#agentIds option:selected").val();
	var agenttext=$("#agentIds option:selected").text();
	
	var operatorid=$("#operatorId option:selected").val();
	var operatortext=$("#operatorId option:selected").text();
	
	if (Common.isEmpty(agentid)) {
		Common.messageBox("提示", "请选择联代方！", false);
		$("#agentIds").select2("open");
		return false;
	}
	
	if (Common.isEmpty(operatorid)) {
		Common.messageBox("提示", "请选择联代方人员！", false);
		$("#operatorId").select2("open");
		return false;
	}
	
	$("#agentIds option[value='"+agentid+"']").remove();
	$("#operatorId").html("");
	$("#operatorId").attr("data-placeholder","选择联代方人员");
	$("#selAgentIds").append("<div class=\"agents\" id=\"agent"+agentid+"\"  name=\""+agentid+"\" value=\""+agentid+"-"+operatorid+"-"+agenttext+"\" onclick=\"removeAgent("+agentid+",'"+agenttext+"');\" class=\"agents btn btn-white btn-default btn-round\">"+
			""+agenttext+"--"+operatortext+"<i class=\"ace-icon fa fa-trash-o orange\"></i></div>");
}