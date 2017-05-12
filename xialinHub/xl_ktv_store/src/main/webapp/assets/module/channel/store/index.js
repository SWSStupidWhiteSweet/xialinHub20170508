$(function($) {
	Common.initSelect2("storeType", {
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
						storeType : $("#storeType").val(),
						provinceId : $("#province").val(),
						provinceName : $("#province").find("option:selected").text(),
						cityId : $("#city").val(),
						cityName : $("#city").find("option:selected").text(),
						storeName : $("#storeName").val(),
						director : $("#director").val(),
						directorTel : $("#directorTel").val(),
						status : $("#status").val(),
						createTime : $("#createTime").val(),
						brokerCompanyName : $("#brokerCompanyName").val()
					});

					$(this).dialog("close");
				}
			} , {
				text : "重置",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					$("#status").select2("val", "");
					$("#storeType").select2("val", "");
					$("#province").select2("val", "");
					$("#city").select2("val", "");
					$("#storeName").val("");
					$("#director").val("");
					$("#directorTel").val("");
					$("#createTime").val("");
					$("#brokerCompanyName").val("");
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
		title : "门店列表",
		url : "getgriddata",
		postData : {},
		multiSelect : false,
		height : '555px',
		sortName : "create_time",
		sortOrder : "desc",
		colNamesArray : ['id', '指纹', '所属公司', '门店编码', '门店名称', '所属省', '所属市', '所属区县', '负责人', '负责人电话', '门店地址', '经营状态', '登录账号', '创建人', '创建时间', '来源'],
		colModel : [ {
			name : "storeId",
			index : "storeId",
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
			width : 240,
			sorttype : "string",
			editable : false,
			fixed:true
		},{
			name : "storeCode",
			index : "storeCode",
			width : 120,
			sorttype : "string",
			editable : false,
			fixed:true
		},{
			name : "storeName",
			index : "storeName",
			width : 200,
			sorttype : "string",
			editable : false,
			fixed:true
		},{
			name : "provinceName",
			index : "provinceName",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed:true
		}, {
			name : "cityName",
			index : "cityName",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed:true
		}, {
			name : "districtName",
			index : "districtName",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed:true
		}, {
			name : "director",
			index : "director",
			width : 80,
			sorttype : "string",
			editable : false,
			fixed:true
		}, {
			name : "directorTel",
			index : "directorTel",
			width : 100,
			sorttype : "string",
			editable : false,
			fixed:true
		}, {
			name : "storeAddr",
			index : "storeAddr",
			width : 160,
			sorttype : "string",
			editable : false,
			fixed:true
		}, {
			name : "status",
			index : "status",
			width : 60,
			sorttype : "string",
			editable : false,
			fixed:true
		}, {
			name : "loginAccount",
			index : "loginAccount",
			width : 120,
			sorttype : "string",
			editable : false,
			fixed:true
		}, {
			name : "operatorName",
			index : "operatorName",
			width : 80,
			sorttype : "int",
			editable : false,
			fixed:true
		}, {
			name : "createTime",
			index : "createTime",
			width : 140,
			sorttype : "string",
			editable : false,
			fixed:true
		}, {
			name : "createSrc",
			index : "createSrc",
			width : 60,
			sorttype : "string",
			editable : false,
			fixed:true
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
		var storeType = $("#storeType").val();
		var provinceId = $("#province").val();
		var provinceName = $("#province").find("option:selected").text();
		var cityId = $("#city").val();
		var cityName = $("#city").find("option:selected").text();
		var storeName = $("#storeName").val();
		var director = $("#director").val();
		var directorTel = $("#directorTel").val();
		var status = $("#status").val();
		var createTime = $("#createTime").val();
		var brokerCompanyName = $("#brokerCompanyName").val();
		
		location.href = "excel?storeType="+storeType+"&provinceId="+provinceId+"&provinceName="+provinceName+"&cityId="+cityId+
						"&cityName="+cityName+"&storeName="+storeName+"&director="+director+"&directorTel="+directorTel+"&status="+status+
						"&createTime="+createTime+"&brokerCompanyName="+brokerCompanyName;
	});
	
	/**
	 * 模板下载
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
		location.href = "toview?storeId="+rowData.storeId;
	});
	
	/**
	 * 重置
	 */
	/*$("#remove").click(function() {
		$("#status").select2("val", "");
		$("#storeType").select2("val", "");
		$("#province").select2("val", "");
		$("#city").select2("val", "");
		$("#storeName").val("");
		$("#director").val("");
		$("#directorTel").val("");
		$("#createTime").val("");
		$("#brokerCompanyName").val("");
		Common.jqGridReload(gridSelector, {
			storeType : $("#storeType").val(),
			provinceId : $("#province").val(),
			provinceName : $("#province").find("option:selected").text(),
			cityId : $("#city").val(),
			cityName : $("#city").find("option:selected").text(),
			storeName : $("#storeName").val(),
			director : $("#director").val(),
			directorTel : $("#directorTel").val(),
			status : $("#status").val(),
			createTime : $("#createTime").val(),
			brokerCompanyName : $("#brokerCompanyName").val()
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

		Common.confirm("请确认是否要删除该门店？", function() {
			$.ajax({
				url : "delete",
				type : "post",
				data : {
					storeId : rowData.storeId,
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
		location.href = "toedit?storeId="+rowData.storeId+"&fingerprint="+rowData.fingerprint;
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