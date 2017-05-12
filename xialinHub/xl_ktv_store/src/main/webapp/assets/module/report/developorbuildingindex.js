$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";
	
	Common.initSelect2("province", {
		width : "200px"
	});

	Common.initSelect2("city", {
		width : "200px"
	});

	Common.initSelect2("buildingProject", {
		width : "200px"
	});

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		widthOffset : "25px",
		parentDOMClass : "col-sm-12",
		title : "720看房统计",
		url : "getDeveloperBuildingGrid",
		postData : {},
		multiSelect : false,
		height : "500px",
		//sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : ['城市', '楼盘名称', '户型数量', '主力户型数量', '720全景板房量', '楼盘动态更新时间'],
		colModel : [
		    {name : "cityName", index : "city_name", width : 60, sorttype : "string", editable : false}, 
		    {name : "buildingProjectName", index : "building_project_name", width : 90, sorttype : "string", editable : false}, 
		    {name : "housecount", index : "housecount", width : 60, sorttype : "int", editable : false}, 
		    {name : "hotcount", index : "hotcount", width : 60, sorttype : "int", editable : false}, 
		    {name : "pcount", index : "pcount", width : 60, sorttype : "int", editable : false}, 
		    {name : "lastupdate", index : "lastupdate", width : 60, sorttype : "string", editable : false} 
		]
	});

	// 选中行事件
	jqGridOption.onSelectRow = function(rowIndex, status) {
		var rowData = $(gridSelector).getRowData(rowIndex);
	};

	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption); 

	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变
	/** **************************************构造jqGrid end *************************************** */
	
	

	/** **************************************按钮事件 start *************************************** */
	/**
	 * 刷新页面
	 */
	$("#paymentIndex").click(function() {
		location.href = "index";
	});
	
	$("#query").click(function() {
		query(gridSelector);
	});
	
	/** 导出 */
	$("#excel").click(function(e){
		Common.exportGrid({
			ajax: true,
	        url: "reportDevBuildingExecl",
	        param: {
				provinceId : $("#province").val(),
				cityId : $("#city").val(),
				buildingProjectId : $("#buildingProject").val()
			}
		})
    });
	
	function query(gridId) {
		var dialog = $("#condition").removeClass('hide').dialog({
				modal : true,
				title : "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-search'></i> 请选择查询条件</h4></div>",
				title_html : true,
				width : "500px",
				buttons : [ {
					text : "取消",
					"class" : "btn btn-xs",
					click : function() {
						$(this).dialog("close");
					}
				}, {
					text : "查询",
					"class" : "btn btn-primary btn-xs",
					click : function() {
						var provinceId = $("#province").val();
						var cityId = $("#city").val();
						var buildingProjectId = $("#buildingProject").val();

						Common.jqGridReload(gridId, {
							provinceId : provinceId,
							cityId : cityId,
							buildingProjectId : buildingProjectId
						});
						$(this).dialog("close");
					}
				} ,{
                    text : "重置",
                    "class" : "btn btn-primary btn-xs",
                    click : function() {
                        $('#province').select2("val", "");
                        $('#province').trigger("change");
                        $('#city').select2("val", "");
                        $('#city').trigger("change");
                        $('#buildingProject').select2("val", "");
                        $('#buildingProject').trigger("change");
                    }
                } ]
			});
	}
	/** **************************************按钮事件 end *************************************** */
	
//	selectBdForCity('buildingProjectId','buildingInfoId','projectInfoId');
//	$("#areapicker").areaPicker({
//		province_conf : {
//			tabTitle : "省份",
//			tabId : "province",
//			dataUrl : "../../common/getprovincecombo",
//			dataId : "id",
//			dataName : "text"
//		},
//		city_conf : {
//			tabTitle : "城市",
//			tabId : "city",
//			dataUrl : "../../common/getcitycombo",
//			pId : "pValue",
//			dataId : "id",
//			dataName : "text"
//		}
//	});
	
	//级联清除数据：楼盘[必选]-期数[必选]-项目[可选]
	function selectBdForCity(building_project_id, building_info_id, project_info_id) {
		$("#areapicker").areaPicker({
			province_conf : {
				tabTitle : "省份",
				tabId : "province",
				dataUrl : "../../common/getprovincecombo",
				dataId : "id",
				dataName : "text"
			},
			city_conf : {
				tabTitle : "城市",
				tabId : "city",
				dataUrl : "../../common/getcitycombo",
				pId : "pValue",
				dataId : "id",
				dataName : "text"
			},
	    	customer:{
	    		spanWidth: 200,
	    		clickCallback: function(id,value){
	    			$.ajax({
						type:"post",
						url:'../../common/getbuildingprojectcombo',
						data:{pValue: id},
						dataType:"json",
						success :function(data){
							if(data!=null){
								var bdProject = $("#"+building_project_id);
								bdProject.empty();
								var optionNull = $("<option>").text('请选择楼盘').val('');
		           				bdProject.append(optionNull);
		           				
		           				var bdInfo = $("#"+building_info_id);
		           				if(bdInfo) {
									bdInfo.empty();
									var optionNull = $("<option>").text('请选择楼盘期数').val('');
			           				bdInfo.append(optionNull);
		           				}
		           				
		           				if(project_info_id) {
			           				var _projectInfo = $("#"+project_info_id);
			           				_projectInfo.empty();
			           				var optionNull = $("<option>").text('请选择项目').val('');
			           				_projectInfo.append(optionNull);
		           				}
		           				
								for(var i=0;i<data.length;i++){
			           				var option = $("<option>").text(data[i].title).val(data[i].id);
			           				bdProject.append(option);
			           				//alert(item);
			           			}
							}
						}
					});//end buildingProject ajax
	    		}
	    	}//end customer
	    });
	}
});