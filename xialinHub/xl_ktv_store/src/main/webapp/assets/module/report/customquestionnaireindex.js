$(function($) {
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#dataGridTable";
	var pagerSelector = "#dataGridPager";
	
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
		parentDOMClass : "col-sm-12",
		title : "客户调查问卷",
		url : "getCustomQuestionnaireGrid",
		postData : {},
		sortable: true,
		multiSelect : false,
		height : "500px",
		//sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : ['城市','楼盘名称','微信昵称','电话号码','填写时间','第一次到访','第二次到访','第三次到访','三次以上',
		                 '广州日报','南方都市报','羊城晚报','南方日报','大粤网','搜狐焦点','网易房产','新浪乐居','搜房房天下',
		                 '房产频道','安居客','其他网媒','公交候车亭','地铁广告','户外大牌','电梯广告','短信',
		                 '电话','DM投递','朋友介绍','途径周边','其他补充','补充内容'],
		colModel : [
		    {name:"city_name" ,index:"city_name",width:90,fixed:true, sorttype:"string",editable: false},
			{name:"building_project_name" ,index:"building_project_name",fixed:true,width:120, sorttype:"string",editable: false},
			{name:"nickname",index:"nickname" ,width:110, sorttype:"string",fixed:true,editable: false, align:'center'},
			{name:"member_tel",index:"member_tel" ,width:100, sorttype:"int",fixed:true,editable: false, align:'center'},
			{name:"create_time",index:"create_time" ,width:130, sorttype:"string",fixed:true,editable: false, align:'center',formatter: formartDateTime},
			{name:"access_first",index:"access_first" ,width:75, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"access_second" ,index:"access_second",width:75, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"access_third",index:"access_third" ,width:75, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"access_more" ,index:"access_more",width:75, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"np_guangzhou",index:"np_guangzhou" ,width:60, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"np_southcity",index:"np_southcity" ,width:60, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"np_yangcheng_evening",index:"np_yangcheng_evening" ,width:60, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"np_southdaily" ,index:"np_southdaily",width:60, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"media_dayue" ,index:"media_dayue",width:60, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"media_souhu" ,index:"media_souhu",width:60, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"media_yiwang",index:"media_yiwang" ,width:60, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"media_xinlang" ,index:"media_xinlang",width:60, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"media_soufang" ,index:"media_soufang",width:60, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"media_fangchan",index:"media_fangchan" ,width:60, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"media_anjuke",index:"media_anjuke" ,width:60, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"media_other" ,index:"media_other",width:60, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"oad_gongjiaozhan",index:"oad_gongjiaozhan" ,width:60, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"oad_ditie" ,index:"oad_ditie",width:60, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"oad_huwaidapai",index:"oad_huwaidapai" ,width:60, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"oad_dianti",index:"oad_dianti" ,width:60, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"iad_sms" ,index:"iad_sms",width:60, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"iad_phone" ,index:"iad_phone",width:60, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"iad_dm",index:"iad_dm" ,width:60, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"other_friends" ,index:"other_friends",width:60, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"other_periphery" ,index:"other_periphery",width:60, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"other_other" ,index:"other_other",width:60, sorttype:"int",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}},
			{name:"other_content" ,index:"other_content",width:130, sorttype:"string",editable: false,fixed:true, align:'center',formatter:'select',editoptions:{value:"1:1;0:"}}
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
	$("#query").click(function() {
		query(gridSelector);
	});
	
	/** 导出 */
	$("#excel").click(function(e){
		Common.exportGrid({
			ajax: true,
	        url: "reportCustomQuestionnaireExecl",
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
	
});