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
	
	$("#datePeriod").daterangepicker({
		applyClass : 'btn-sm btn-success',
		cancelClass : 'btn-sm btn-default',
		locale : {
			applyLabel : '确认',
			cancelLabel : '取消',
			fromLabel : '起始时间',
			toLabel : '结束时间',
			customRangeLabel : '自定义',
			firstDay : 1
		},
		ranges : {
			'今日' : [ moment().startOf('day'), moment() ],
			'最近7日' : [ moment().subtract('days', 6), moment() ],
			'本月' : [ moment().startOf("month"), moment().endOf("month") ],
			'上个月' : [ moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month") ]
		},
		opens : 'right', // 日期选择框的弹出位置
		separator : ' 至 ',
		showWeekNumbers : true, // 是否显示第几周
		// timePicker: true,
		// timePickerIncrement : 10, // 时间的增量，单位为分钟
		// timePicker12Hour : false, // 是否使用12小时制来显示时间
		// maxDate : moment(), // 最大时间
		format : 'YYYY-MM-DD'

	}, function(start, end, label) { // 格式化日期显示框
		$('#beginTime').val(start.format('YYYY-MM-DD'));
		$('#endTime').val(end.format('YYYY-MM-DD'));
	}).next().on('click', function() {
		$(this).prev().focus();
	});

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "预约看房客户",
		url : "getCustomBookingHouseGrid",
		postData : {},
		sortable: true,
		multiSelect : false,
		height : "500px",
		//sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : ['城市','楼盘名称','客户姓名','客户电话','看房时间','报名时间'],
		colModel : [
		    {name:"city_name" ,index:"city_name",width:90, sorttype:"string",editable: false},
			{name:"building_project_name" ,index:"building_project_name",width:120, sorttype:"string",editable: false},
			{name:"member_name",index:"member_name" ,width:110, sorttype:"string",editable: false, align:'center'},
			{name:"member_tel",index:"member_tel" ,width:100, sorttype:"int",editable: false, align:'center'},
			{name:"visit_time",index:"visit_time" ,width:130, sorttype:"string",editable: false, align:'center',formatter: formartDateTime},
			{name:"enter_time",index:"enter_time" ,width:130, sorttype:"string",editable: false, align:'center',formatter: formartDateTime}
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
	        url: "reportCustomBookingHouseExecl",
	        param: {
	        	province : $("#province").val(),
				city : $("#city").val(),
				buildingProject : $("#buildingProject").val(),
				customInfo : $("#customInfo").val(),
				datePeriod : $("#datePeriod").val()
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
//					Common.jqGridReload(gridId, transJsonById("findForm"));
					Common.jqGridReload(gridId, {
						province : $("#province").val(),
						city : $("#city").val(),
						buildingProject : $("#buildingProject").val(),
						customInfo : $("#customInfo").val(),
						datePeriod : $("#datePeriod").val()
					});
					$(this).dialog("close");
				}
			} ,{
                text : "重置",
                type: "btn btn-primary",
                "class":"btn",
                click : function() {
                	Common.resetForm();
                }
            }]
		});
	}
	/** **************************************按钮事件 end *************************************** */
	
});

/**
 * 将id元素中的表单元素封装成json
 * @param id
 * @param flag true表示得到空值对象
 * @returns {}
 */
function transJsonById(id, flag){
	flag = flag || false;
    var formItems = ["input","select","textarea"],
        jsonObj = {};
    for(var i =0;i<formItems.length;i++){
        var formItem = formItems[i];
        $("#"+id).find(formItem).each(function(index){
            var item = $(this);
            if(item.attr("disabled")) return true;
            if(formItem=="input"){
                var type = item.attr("type");
                switch (type.toLocaleLowerCase()){
                    case "radio":
                        if(!item.attr("name")) {
                            throw new Error("请为radio添加name");
                        }
                        if(!item.prop("checked")){
                            return true;
                        }
                        jsonObj[item.attr("name")] = "|"+item.val();
                        break;
                    case "checkbox": //checkbox结果显示为  |2|3|4
                        if(!item.attr("name")) {
                            throw new Error("请为checkbox添加name");
                        }
                        if(!item.prop("checked")){
                            return true;
                        }
                        jsonObj[item.attr("name")] = (jsonObj[item.attr("name")] === undefined ? "" : jsonObj[item.attr("name")]) + "|"+item.val();
                        break;
                    case "text":
                    case "password":
                    case "hidden":
                        if(!item.attr("id")) {
                            throw new Error("请为input[type='text']添加id");
                        }
                        if($.trim(item.val())!="" || flag){
                        	jsonObj[item.attr("id")] = item.val();
                        }
                    default:
                        break;
                }
            }else{
                if(!item.attr("id")) {
                    throw new Error("请为select添加id");
                }
                if($.trim(item.val())!="" || flag){
                	jsonObj[item.attr("id")] = item.val();
                }
            }
        });
    }
    return jsonObj;
}
