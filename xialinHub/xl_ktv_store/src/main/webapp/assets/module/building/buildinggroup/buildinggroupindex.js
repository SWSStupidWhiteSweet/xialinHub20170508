$(function($) {
	Common.initSelect2("perType", {
		width : "120px"
	});
	Common.initSelect2("agentId", {
		width : "200px"
	});
	
	/** **************************************构造 groupGrid start *************************************** */
	var groupGridSelector = "#groupGrid";
	var grouppagerSelector ="#groupGridPager";
	var buildingProjectId = $("#buildingProjectId").val();

	// 构造jqGrid配置信息
	var groupGridOption = new Common().createGridOption({
		pagerSelector :grouppagerSelector,
		gridSelector :groupGridSelector,
		parentDOMClass : "col-sm-3",
		title : "销售团队",
		url : "getgrouplist",
		postData : {buildingProjectId:buildingProjectId,agentId:null},
		multiSelect : false,
		height : "500px",
		sortName : "operator_id",
		sortOrder : "desc",
		colNamesArray : ['团队ID','团队名称','联代方ID'],
		colModel : [ {
			name : "agentGroupId",
			index : "agent_group_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		},{
			name : "agentGroupName",
			index : "agent_group_name",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "agentId",
			index : "agent_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		}]
	});

	// 选中行事件,重载已添加人员
	groupGridOption.onSelectRow= function(rowIndex, status) {
		var rowData = $(groupGridSelector).getRowData(rowIndex);
		var params = {
				buildingProjectId:$("#buildingProjectId").val(),
				groupId:rowData.agentGroupId,
				agentId:rowData.agentId
		};
		Common.jqGridReload(gridSelector, params);
		
		$("#agentGroupId").val(rowData.agentGroupId);
		
		params = {
				buildingProjectId:$("#buildingProjectId").val(),
				selname:'',
				agentId:rowData.agentId
		};
		Common.jqGridReload(noBindGridSelector, params);
		
	};
	
	// 渲染表格
	$(groupGridSelector).jqGrid(groupGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造 groupGrid end *************************************** */
	
	/** **************************************构造bindOperatorGrid start *************************************** */
	var gridSelector = "#bindOperatorGrid";
	var pagerSelector = "#bindOperatorGridPager";
	
	// 构造jqGrid配置信息
	var bindGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-5",
		title : "已添加人员列表",
		url : "agentoperatoradd",
		postData : {buildingProjectId:buildingProjectId,groupId:'',agentId:null},
		multiSelect : true,
		height : "500px",
		sortName : "agent_operator_bind_id",
		sortOrder : "desc",
		colNamesArray : ['团队人员绑定ID','指纹','人员ID','人员所属团队','人员所属联代方','姓名', '手机号码','登录账号','当前授权'],
		colModel : [ {
			name : "agentOperatorBindId",
			index : "agent_operator_bind_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		},{
			name : "fingerprint",
			index : "fingerprint",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		},{
			name : "agentOperatorId",
			index : "agent_operator_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		},{
			name : "agentGroupId",
			index : "agent_group_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		},{
			name : "agentId",
			index : "agent_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		},{
			name : "operatorName",
			index : "operator_name",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "operatorTel",
			index : "operator_tel",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "operatorAccount",
			index : "operator_account",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "permessionType",
			index : "permession_type",
			width : 60,
			sorttype : "string",
			editable : false
		}]
	});
	// 渲染表格
	$(gridSelector).jqGrid(bindGridOption);

	$(window).triggerHandler('resize.jqGrid');

	/** **************************************构造bindOperatorGrid end *************************************** */
	
	/** **************************************构造bindOperatorGrid start *************************************** */
	var noBindGridSelector = "#noBindOperatorGrid";
	var noBindpagerSelector = "#noBindOperatorGridPager";

	// 构造jqGrid配置信息
	var noBindGridOption = new Common().createGridOption({
		pagerSelector : noBindpagerSelector,
		gridSelector : noBindGridSelector,
		parentDOMClass : "col-sm-4",
		title : "未添加人员列表",
		url : "notaddagent",
		postData : {buildingProjectId:buildingProjectId,selname:'',agentId:null},
		multiSelect : true,
		height : "500px",
		sortName : "operator_id",
		sortOrder : "desc",
		colNamesArray : ['人员ID','姓名','登录账号', '手机号码'],
		colModel : [ {
			name : "operatorId",
			index : "operator_id",
			width : 60,
			sorttype : "string",
			editable : false,
			hidden : true
		},{
			name : "operatorName",
			index : "operator_name",
			width : 60,
			sorttype : "string",
			editable : false
		},{
			name : "operatorAccount",
			index : "operator_account",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "operatorTel",
			index : "operator_tel",
			width : 60,
			sorttype : "string",
			editable : false
		}]
	});
	
	// 渲染表格
	$(noBindGridSelector).jqGrid(noBindGridOption);

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变

	/** **************************************构造bindOperatorGrid end *************************************** */

	/** **************************************按钮事件 start *************************************** */
	
	/*未添加联代方人员搜索*/
	$("#search").click(function() {
		var selname=$("#selname").val();
		var buildingProjectId = $("#buildingProjectId").val();
		var params = {
				buildingProjectId:buildingProjectId,
				selname:selname,
				agentId:$("#agentId").val()
		};
		Common.jqGridReload(noBindGridSelector,params);
	});
	
	/*添加销售团队*/
	$("#saveBtn").click(function(e) {
		//当前操作人员商户类型
		var merchantType=$("#merchantType").val();
		//当前联代方
		var agentId=$("#agentId").val();
		
		if(merchantType=="开发商"){
			if(Common.isEmpty(agentId)) {
				Common.messageBox("提示", "请选择联代方！", false);
				$("#agentId").select2("open");
				return false;
			}
		}
		
		var dialog = $("#salegroup").removeClass('hide').dialog({
			modal : true,
			title : "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-plus green'></i> 请输入您要添加的团队名称</h4></div>",
			title_html : true,
			width : "500px",
			buttons : [ {
				text : "取消",
				"class" : "btn btn-xs",
				click : function() {
					$(this).dialog("close");
				}
			}, {
				text : "添加",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					var agentGroupName = $("#agentGroupName").val();
					var buildingProjectId = $("#buildingProjectId").val();
					if(agentGroupName.length==""){
						Common.messageBox("提示", "请输入销售团队名称！", false);
						return false;
					}
					
					if(agentGroupName.length>64){
						Common.messageBox("提示", "请输入字数小于64位的销售团队名称！", false);
						return false;
					}
					$.ajax({
						url : "insertagentgroup",
						type : "post",
						data : {
							agentGroupName : agentGroupName,
							buildingProjectId:buildingProjectId,
							agentId:agentId
						},
						dataType : "json",
						success: function(json){
							if (json.isSuccess) {
			                    Common.messageBox("提示", "添加成功！", true);
			                    Common.jqGridReload(groupGridSelector);
			                } else {
			                    Common.messageBox("提示", json.msg, false);
			                }
					    },
						error: function() {
							Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
						}
					});
					$(this).dialog("close");
				}
			} ]
		});

	});

	//修改已绑定销售团队
	$("#updateBtn").click(function(){
		//当前联代方
		var agentId=$("#agentId").val();
		
		if(merchantType=="开发商"){
			if(Common.isEmpty(agentId)) {
				Common.messageBox("提示", "请选择联代方！", false);
				$("#agentId").select2("open");
				return false;
			}
		}
		
		var selectedRowsId = Common.jqGridGetSelectedRow(groupGridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择你想修改的销售团队！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(groupGridSelector, selectedRowsId);
		var lastGroupName=rowData.agentGroupName;
		$("#agentGroupName").val(lastGroupName)
		
		var dialog = $("#salegroup").removeClass('hide').dialog({
			modal : true,
			title : "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-plus green'></i>请输入您要修改的团队名称</h4></div>",
			title_html : true,
			width : "500px",
			buttons : [ {
				text : "取消",
				"class" : "btn btn-xs",
				click : function() {
					$(this).dialog("close");
				}
			}, {
				text : "修改",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					var agentGroupName = $("#agentGroupName").val();
					var buildingProjectId = $("#buildingProjectId").val();
					if(agentGroupName.length==""){
						Common.messageBox("提示", "请输入销售团队名称！", false);
						return false;
					}
					
					if(agentGroupName.length>64){
						Common.messageBox("提示", "请输入字数小于64位的销售团队名称！", false);
						return false;
					}
					
					if(agentGroupName==lastGroupName){
						Common.messageBox("提示", "修改成功！", true);
						return false;
					}
					$.ajax({
						url : "updateagentgroup",
						type : "post",
						data : {
							agentGroupName : agentGroupName,
							agentGroupId:rowData.agentGroupId,
							buildingProjectId:buildingProjectId,
							agentId:agentId
						},
						dataType : "json",
						success : function(json) {
							if (json.isSuccess) {
								Common.messageBox("提示", "修改成功！", true);
			                    Common.jqGridReload(groupGridSelector);
							} else {
								Common.messageBox("提示", json.msg, false);
							}
						},
						error : function() {
							Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
						}
					});
					$(this).dialog("close");
				}
			} ]
		});
		
	});
	
	//删除已绑定销售团队
	$("#deleteBtn").click(function(){
		var selectedRowsId = Common.jqGridGetSelectedRow(groupGridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择你想删除的销售团队！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(groupGridSelector, selectedRowsId);
		if(rowData.agentGroupName.indexOf("--管理组")>-1){
			Common.messageBox("提示", "管理组不能被删除！", false);
			return false;
		}
		 Common.confirm("请确认是否要删除该销售团队？", function () {
			$.ajax({
				type:"POST",
				url:"delgroup",
				data:{
					buildingProjectId:$("#buildingProjectId").val(),
					groupId:rowData.agentGroupId
				},
				success: function(json){
					if (json.isSuccess) {
	                    Common.messageBox("提示", "删除销售团队成功！", true);
	                    var params = {
	            				buildingProjectId:$("#buildingProjectId").val(),
	            				groupId:''
	            		};
	                    Common.jqGridReload(groupGridSelector);
	                    Common.jqGridReload(noBindGridSelector);
	                    Common.jqGridReload(gridSelector,params);
	                    
	                } else {
	                    Common.messageBox("提示", json.msg, false);
	                }
			    },
				error: function() {
					Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
				}
			});
		});
	});
	
	//添加人员
	$("#add").click(function(){
		var selectedRowsIdGroup= Common.jqGridGetSelectedRow(groupGridSelector);
		if (Common.isEmpty(selectedRowsIdGroup) || selectedRowsIdGroup.length <= 0) {
			Common.messageBox("提示", "请选择你想添加人员的销售团队！", false);
			return false;
		}
		var rowDataGroup = Common.jqGridGetRowData(groupGridSelector, selectedRowsIdGroup);
		if(rowDataGroup.agentGroupName.indexOf("--管理组")>-1){
			Common.messageBox("提示", "不能向管理组添加人员", false);
			return false;
		}
		var selectedRowsId = Common.jqGridGetSelectedRow(noBindGridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择你想添加的人员！", false);
			return false;
		}
		
		// 获取选中的未添加人员
		var operatorIds = "";
		operatorRows = Common.jqGridGetSelectedRows(noBindGridSelector);
		for (var i = 0; i < operatorRows.length; i++) {
			if (operatorRows[i] == "undefined") continue;
			var operatorId = Common.jqGridGetRowData(noBindGridSelector, operatorRows[i]).operatorId;
			if (Common.isEmpty(operatorId)) continue;
			operatorIds += operatorId + ",";
		}

		var buildingProjectId=$("#buildingProjectId").val();//楼盘ID

		$.ajax({
			type:"POST",
			url:"saveagentoperator",
			data:{
				operatorIds:operatorIds,
				agentGroupId:rowDataGroup.agentGroupId,
				buildingProjectId:buildingProjectId,
				agentId:rowDataGroup.agentId
			},
			dataType : "json",
			success: function(json){
				if (json.isSuccess) {
                    Common.messageBox("提示", "添加成功！", true);
                    Common.jqGridReload(noBindGridSelector);
                    Common.jqGridReload(gridSelector);
                } else {
                    Common.messageBox("提示", json.msg, false);
                }
		    },
			error: function() {
				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
			}
		});
	});
	
	//删除人员
	$("#delete").click(function(){
		// 获取选中的已添加人员
		var agentOperatorBindIds = "";
		operatorRows = Common.jqGridGetSelectedRows(gridSelector);
		for (var i = 0; i < operatorRows.length; i++) {
			if (operatorRows[i] == "undefined") continue;
			//绑定销售团队ID
			var agentOperatorBindId = Common.jqGridGetRowData(gridSelector, operatorRows[i]).agentOperatorBindId;
			//指纹
			var fingerprint= Common.jqGridGetRowData(gridSelector, operatorRows[i]).fingerprint;
			//角色类型
			var permessionType=Common.jqGridGetRowData(gridSelector, operatorRows[i]).permessionType;
			if(permessionType.indexOf("管理员")>-1){
				Common.messageBox("提示", "管理人员不能被删除！", false);
				return false;
			}
			if (Common.isEmpty(agentOperatorBindId)||Common.isEmpty(fingerprint)) continue;
			agentOperatorBindIds +=(agentOperatorBindId+"-"+fingerprint)+ ",";
		}
		if(agentOperatorBindIds!=""){
			agentOperatorBindIds=agentOperatorBindIds.substring(0,agentOperatorBindIds.length-1);
		}else{
			Common.messageBox("提示", "请选择您要删除的人员！", false);
			return false;
		}
		Common.confirm("请确认是删除此人员？", function(){
			$.ajax({
				type:"POST",
				url:"deleteagent",
				data:{
					agentOperatorBindIds:agentOperatorBindIds
				},
				success: function(json){
					if (json.isSuccess) {
                        Common.messageBox("提示", "删除成功！", true);
                        Common.jqGridReload(noBindGridSelector);
                        Common.jqGridReload(gridSelector);
                    } else {
                        Common.messageBox("提示", json.msg, false);
                    }
			    },
				error: function() {
					Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
				}
			});
		});
	});


	//生成二维码
	$("#createQrcode").click(function(){
		var param={};
		param.qrcodeType = 1; // 永久二维码
		param.busiType = 2; // 置业顾问二维码
		param.buildingProjectId = $("#buildingProjectId").val();
		param.agentId = $("#agentId").val();
		param.agentGroupId = $("#agentGroupId").val();
		
		if(Common.isEmpty($("#agentGroupId").val())) {
			Common.messageBox("提示", "请选择一个销售团队", false);
			return false;
		}
		//当前操作人员商户类型
		if($("#merchantType").val()=="开发商"){
			if(Common.isEmpty($("#agentId").val())) {
				Common.messageBox("提示", "您是开发商帐号，请选择需要生成二维码的联代方！", false);
				$("#agentId").select2("open");
				return false;
			}
		}
		console.log(param);
		
		$.ajax({
			type : "POST",
			url : "../building/qrcode/createqrcode",
			data : param,
			success : function(json) {
				if (json.messageBox) {
                    Common.messageBox("提示", json.msg, true);
                    Common.jqGridReload(noBindGridSelector);
                    Common.jqGridReload(gridSelector);
				} else {
					Common.messageBox("提示", json.msg, false);
				}
			},
			error : function() {
				Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
			}
		});
	});
	
	/*授权角色*/
    $("#permission").click(function() {
    	// 获取选中的已添加人员
		var agentOperatorBindIds = "";
		operatorRows = Common.jqGridGetSelectedRows(gridSelector);
		for (var i = 0; i < operatorRows.length; i++) {
			if (operatorRows[i] == "undefined") continue;
			//绑定销售团队ID
			var agentOperatorBindId = Common.jqGridGetRowData(gridSelector, operatorRows[i]).agentOperatorBindId;
			//指纹
			var fingerprint= Common.jqGridGetRowData(gridSelector, operatorRows[i]).fingerprint;
			//销售团队ID
			var agentGroupId= Common.jqGridGetRowData(gridSelector, operatorRows[i]).agentGroupId;
			
			//角色类型
			var permessionType=Common.jqGridGetRowData(gridSelector, operatorRows[i]).permessionType;
			if(permessionType.indexOf("管理员")>-1){
				Common.messageBox("提示", "管理人员不能被角色授权！", false);
				return false;
			}
			
			if (Common.isEmpty(agentOperatorBindId)||Common.isEmpty(fingerprint)||Common.isEmpty(agentGroupId)) continue;
			agentOperatorBindIds +=(agentOperatorBindId+"-"+fingerprint+"-"+agentGroupId)+ ",";
		}
		if(agentOperatorBindIds!=""){
			agentOperatorBindIds=agentOperatorBindIds.substring(0,agentOperatorBindIds.length-1);
		}else{
			Common.messageBox("提示", "请选择您要授权的人员！", false);
			return false;
		}
		
    	var dialog = $("#condition").removeClass('hide').dialog({
			modal : true,
			title : "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-search'></i> 请选择要授权的角色</h4></div>",
			title_html : true,
			width : "500px",
			buttons : [ {
				text : "取消",
				"class" : "btn btn-xs",
				click : function() {
					$(this).dialog("close");
				}
			}, {
				text : "授权",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					var permessionType=$("#perType").val();

					if (Common.isEmpty(permessionType)) {
						Common.messageBox("提示", "请选择授权角色类型！", false);
						$("#permessionType").select2("open");
						return false;
					}
					 $.ajax({
			                url : "updatepermessiontype",
			                type : "post",
			                data : {
								agentOperatorBindIds:agentOperatorBindIds,
								permessionType : permessionType
			                },
			                dataType : "json",
			                success : function(json) {
			                    if (json.isSuccess) {
			                        Common.messageBox("提示", "授权角色成功！", true);
			    					Common.jqGridReload(gridSelector);
			                    } else {
			                        Common.messageBox("提示", json.msg, false);
			                    }
			                },
			                error : function() {
			                    Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
			                }
			            });
					$(this).dialog("close");
				}
			} ]
		});
    });
    
    //选择联代方联动
    $("#agentId").change(function(){
    	 //销售团队参数
    	 var params1= {
  				buildingProjectId:$("#buildingProjectId").val(),
  				agentId:$("#agentId").val()
  		};
    	 
    	//已添加人员
     	var params2= {
 				buildingProjectId:$("#buildingProjectId").val(),
 				groupId:'',
 				agentId:$("#agentId").val()
 		};

 		//未添加人员
 	    var params3= {
 	 			buildingProjectId:$("#buildingProjectId").val(),
 	 			selname:'',
 	 			agentId:$("#agentId").val()
 	 	};
 	    
 	    //刷新页面
        Common.jqGridReload(groupGridSelector,params1);
        Common.jqGridReload(gridSelector,params2);
        Common.jqGridReload(noBindGridSelector,params3);
    });
	/** **************************************按钮事件 end *************************************** */
});


