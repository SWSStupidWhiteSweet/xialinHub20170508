$(function($) {
	Common.initSelect2("brokerCompanyType", {
		width : "120px"
	});
	Common.initSelect2("province", {
		width : "120px"
	});
	Common.initSelect2("city", {
		width : "120px"
	});
	Common.initSelect2("status", {
		width : "120px"
	});
	
	$("#query").click(function() {
		query("#grid-table");
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

					Common.jqGridReload(gridId, {
						brokerCompanyType : $("#brokerCompanyType").val(),
						provinceId : $("#province").val(),
						provinceName : $("#province").find("option:selected").text(),
						cityId : $("#city").val(),
						cityName : $("#city").find("option:selected").text(),
						brokerCompanyName : $("#brokerCompanyName").val(),
						director : $("#director").val(),
						directorTel : $("#directorTel").val(),
						status : $("#status").val(),
						createTime : $("#createTime").val()
					});

					$(this).dialog("close");
				}
			}, {
				text : "重置",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					$("#status").select2("val", "");
					$("#brokerCompanyType").select2("val", "");
					$("#province").select2("val", "");
					$("#city").select2("val", "");
					$("#brokerCompanyName").val("");
					$("#director").val("");
					$("#directorTel").val("");
					$("#createTime").val("");
				}
			} ]
		});
	}
	/** **************************************构造jqGrid start *************************************** */
	var gridSelector = "#grid-table";
	var pagerSelector = "#grid-pager";

	// 构造jqGrid配置信息
	var jqGridOption = new Common().createGridOption({
		pagerSelector : pagerSelector,
		gridSelector : gridSelector,
		parentDOMClass : "col-sm-12",
		title : "经纪公司列表",
		url : "getgriddata",
		postData : {},
		multiSelect : false,
		height : '555px',
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : ['id', '指纹', '经纪公司名称', '所属省', '所属市', '公司负责人', '负责人电话', '经纪公司类型', '登录账号', '创建人', '创建时间', '状态', '来源'],
		colModel : [ {
			name : "brokerCompanyId",
			index : "brokerCompanyId",
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
			name : "brokerCompanyName",
			index : "brokerCompanyName",
			width : 140,
			sorttype : "string",
			editable : false
		},{
			name : "provinceName",
			index : "provinceName",
			width : 50,
			sorttype : "string",
			editable : false
		}, {
			name : "cityName",
			index : "cityName",
			width : 50,
			sorttype : "string",
			editable : false
		}, {
			name : "director",
			index : "director",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "directorTel",
			index : "directorTel",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "brokerCompanyType",
			index : "brokerCompanyType",
			width : 50,
			sorttype : "string",
			editable : false
		}, {
			name : "loginAccount",
			index : "loginAccount",
			width : 60,
			sorttype : "string",
			editable : false
		}, {
			name : "operatorName",
			index : "operatorName",
			width : 40,
			sorttype : "int",
			editable : false
		}, {
			name : "createTime",
			index : "createTime",
			width : 70,
			sorttype : "string",
			editable : false,
			formatter : dateTimeFormatter
		}, {
			name : "status",
			index : "status",
			width : 30,
			sorttype : "string",
			editable : false,
			formatter : statusFormatter
		}, {
			name : "createSrc",
			index : "createSrc",
			width : 30,
			sorttype : "string",
			editable : false
		}]
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
	 * 跳转到新增回款页面
	 */
	$("#add").click(function() {
		location.href = "toadd";
	});
	
	/**
	 * 导出
	 */
	$("#excel").click(function() {
		var brokerCompanyType = $("#brokerCompanyType").val();
		var provinceId = $("#province").val();
		var provinceName = $("#province").find("option:selected").text();
		var cityId = $("#city").val();
		var cityName = $("#city").find("option:selected").text();
		var brokerCompanyName = $("#brokerCompanyName").val();
		var director = $("#director").val();
		var directorTel = $("#directorTel").val();
		var status = $("#status").val();
		var createTime = $("#createTime").val();
		location.href = "excel?brokerCompanyType="+brokerCompanyType+"&provinceId="+provinceId+"&provinceName="+provinceName+
						"&cityId="+cityId+"&cityName="+cityName+"&brokerCompanyName="+brokerCompanyName+"&director="+director+
						"&directorTel="+directorTel+"&status="+status+"&createTime="+createTime;
	});
	
	/**
	 * 导入
	 */
	$("#exportmod").click(function() {
		location.href = "exportmod";
	});

	/**
	 * 跳转到查看页面
	 */
	$("#view").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想查看的数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		location.href = "toshow?brokerCompanyId="+rowData.brokerCompanyId;
	});
	
	/**
	 * 重置
	 */
	/*$("#remove").click(function() {
		$("#status").select2("val", "");
		$("#brokerCompanyType").select2("val", "");
		$("#province").select2("val", "");
		$("#city").select2("val", "");
		$("#brokerCompanyName").val("");
		$("#director").val("");
		$("#directorTel").val("");
		$("#createTime").val("");
		Common.jqGridReload(gridSelector, {
			brokerCompanyType : $("#brokerCompanyType").val(),
			provinceId : $("#province").val(),
			provinceName : $("#province").find("option:selected").text(),
			cityId : $("#city").val(),
			cityName : $("#city").find("option:selected").text(),
			brokerCompanyName : $("#brokerCompanyName").val(),
			director : $("#director").val(),
			directorTel : $("#directorTel").val(),
			status : $("#status").val(),
			createTime : $("#createTime").val()
		});
	});*/

	/**
	 * 删除
	 */
	$("#delete").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想删除的数据！", false);
			return false;
		}

		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);

		Common.confirm("请确认是否要删除该经纪公司？", function() {
			$.ajax({
				url : "delete",
				type : "post",
				data : {
					brokerCompanyId : rowData.brokerCompanyId,
					fingerprint : rowData.fingerprint
				},
				dataType : "json",
				success : function(json) {
					if (json.isSuccess) {
						Common.alert("删除成功！", true);
						Common.jqGridDeleteRow("grid-table", selectedRowsId);
					} else {
						Common.messageBox("提示", json.msg, false);
					}
				},
				error : function() {
					Common.messageBox("提示", Common.SERVER_EXCEPTION, false);
				}
			});
		});
	});
	
	
	$("#edit").click(function() {
		var selectedRowsId = Common.jqGridGetSelectedRow(gridSelector);
		if (Common.isEmpty(selectedRowsId) || selectedRowsId.length <= 0) {
			Common.messageBox("提示", "请选择一条你想修改的数据！", false);
			return false;
		}
		var rowData = Common.jqGridGetRowData(gridSelector, selectedRowsId);
		location.href = "toedit?brokerCompanyId="+rowData.brokerCompanyId+"&fingerprint="+rowData.fingerprint;
	});
	
	$("#uploadFile").uploadifive({
		buttonText : "导入",
		//swf : '${path}/assert/plugins/uploadify/uploadify.swf',
		uploadScript : "../../common/upload/excel",
		fileType : "*.zip",
		buttonClass : "inputstyle",
		queueSizeLimit : 1,
		removeCompleted : true,
		onUploadComplete : function(file, data) {
			var jsonData = eval("(" + data + ")");
			console.log(jsonData[0]);
			$.ajax({
				url : "import",
				data : {
					diskPath : jsonData[0].diskPath
				},
				type : "post",
				dataType : "json",
				success : function(json) {
					if(json.isSuccess){
						Common.jqGridReload("grid-table");
						Common.messageBox("提示", json.msg, true);
					}else{
						Common.messageBox("提示", json.msg, false);
					}
				},
				error : function() {
					Common.messageBox("提示", "服务器繁忙,请稍后在重试！！", false);
				}
			});
		}
	});
	$("#uploadFile").parent().attr("style","line-height: 30px;overflow: hidden;text-align: center;");
	
	/** **************************************按钮事件 end *************************************** */
});