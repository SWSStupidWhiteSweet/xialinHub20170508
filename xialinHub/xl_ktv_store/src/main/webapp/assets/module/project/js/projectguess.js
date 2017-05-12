$(function() {
	
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#guesslist_grid-table";
	var pagerSelector = "#guesslist_grid-pager";
	var projectInfoId = $("#projectInfoId").val();
	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "项目列表",
		url : "../guess/getgriddata",
		postData : {
			projectInfoId : projectInfoId
		},
		sortName : "create_time",
		sortOrder : "desc",
		multiSelect : false,
		height : "500px",
		colNamesArray : ['测算ID','测算表名称', '项目名称', '电商刷卡总额', '代收款成交套数', '代收款总额', '收入小计（套数）','活动开始时间', '活动结束时间', '分销开始时间', '分销结束时间', '创建时间'],
        colModel : [ {
            name : "guessId",
            index : "guess_id",
            width : 30,
            sorttype : "string",
            editable : false,
            hidden : true
        }, {
        	name : "projectGuessName",
            index : "project_guess_name",
            width : 150,
            sorttype : "string",
            editable : false
        }, {
        	name : "projectInfoName",
            index : "projectInfoName",
            width : 150,
            sorttype : "string",
            editable : false
        }, {
        	name : "ebTotalAmount",
            index : "eb_total_amount",
            width : 100,
            sorttype : "string",
            editable : false
        }, {
        	name : "recvHouseCount",
            index : "recv_house_count",
            width : 100,
            sorttype : "string",
            editable : false
        }, {
        	name : "recvTotalAmount",
            index : "recv_total_amount",
            width : 100,
            sorttype : "string",
            editable : false
        }, {
        	name : "incomeHouseCount",
            index : "income_house_count",
            width : 100,
            sorttype : "string",
            editable : false
        }, {
            name : "activityStartDate",
            index : "activity_start_date",
            width : 120,
            sorttype : "string",
            editable : false
        }, {
            name : "activityEndDate",
            index : "activity_end_date",
            width : 150,
            sorttype : "string",
            editable : false
        }, {
            name : "distributionStartDate",
            index : "distribution_start_date",
            width : 150,
            sorttype : "string",
            editable : false
        }, {
            name : "distributionEndDate",
            index : "distribution_end_date",
            width : 120,
            sorttype : "string",
            editable : false
        }, {
            name : "createTime",
            index : "create_time",
            width : 100,
            sorttype : "string",
            editable : false
        }]
    });
	// 渲染表格
	$(gridSelector).jqGrid(jqGridOption);
	$(window).triggerHandler('resize.jqGrid');// 浏览器大小发生改变时，GRID跟着一起变
	/** **************************************构造jqGrid end *************************************** */
	
	/** *************************************** 按钮事件 start ************************************** */ 
	//模板下载
	$("#guess_downloadDemo").click(function(){
		location.href="../guess/download";
	});
	/** *************************************** 按钮事件 end ************************************** */ 
});