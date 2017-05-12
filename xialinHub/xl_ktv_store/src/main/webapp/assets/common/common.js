/**
 * 公共类
 */
var Common = function() {

};
// 需实例化的方法new Common().method1();
Common.prototype = {
	getGridJsonReader : function() {
		alert("xxxxxxxxxxxxxxxxx");
	},

	createGridOption : function(option) {
		$(window).on(
				'resize.jqGrid',
				function() {
					var widthOffset = 0;
					if (option.widthOffset) {
						widthOffset = parseInt(option.widthOffset.replace("px", ""));
					}
					$(option.gridSelector).jqGrid('setGridWidth',
							$("." + option.parentDOMClass).width() - widthOffset);
				})

		var parent_column = $(option.gridSelector).closest('[class*="col-"]');
		$(document).on(
				'settings.ace.jqGrid',
				function(ev, event_name, collapsed) {
					if (event_name === 'sidebar_collapsed'
							|| event_name === 'main_container_fixed') {
						setTimeout(function() {
							$(option.gridSelector).jqGrid('setGridWidth',
									parent_column.width());
						}, 0);
					}
				})

		var jsonReader = {
			root : "rows", // 明细数据入口
			page : "currentPage", // 当前页数
			total : "totalPages", // 总页数，特别注意这里是总页数
			records : "totalRecords", // 总记录数
			repeatitems : false
		// 这个地方是改变rows里面的格式的，设成false是我们熟知的格式，不清楚可以问我
		};
		
		var gridOption = {
			caption : option.title,
			url : option.url,
			datatype : "json", // 数据来源可配置local, json, xml
			mtype : "POST",
			postData : option.postData,
			jsonReader : jsonReader,
			height : option.height, // 高度，表格高度。可为数值、百分比或'auto'
			colNames : option.colNamesArray,
			colModel : option.colModel,
			sortable : option["sortable"] || true, //是否允许排序，默认 允许
			hidegrid: option["hidegrid"] || false, //是否显示折叠按钮,
			rownumbers : false, // 是否显示行号
			sortname : option.sortName,
			sortorder : option.sortOrder,
			/**
			 * ******************************页眉页脚配置start
			 * ********************************
			 */
			viewrecords : true, // 是否在页脚显示总条数
			rowNum : option.rowNum, // 单页数据条数
			rowList : option.rowList, // 用于改变显示行数的下拉列表框的元素数组。
			pager : option.pagerSelector, // 页脚用DIV
			altRows : true, // 设置为交替行表格,默认为false 一行底色深，一行底色浅
			toppager : false, // true在页眉处也显示页脚菜单
			recordtext : "第 {0} - {1} 条记录，共 {2} 条记录",// 显示记录数的格式
			pgtext : "第 {0} 页 / 共 {1} 页", // 页数显示格式
			/**
			 * ******************************页眉页脚配置end
			 * ********************************
			 */

			/**
			 * ******************************多选配置start
			 * **********************************
			 */
			multiselect : option.multiSelect, // 是否支持多选
			// multikey: "ctrlKey", // 按住ctrl键才能选择，此方法可以避免误选
			multiboxonly : true, // 是否只能通过前面的checkbox进行多选，设为false时，可以直接点数据就选中
			/**
			 * ******************************多选配置end
			 * **********************************
			 */
			prmNames : {
				page : "page",
				rows : "rows",
				sort : "sort",
				order : "order",
				search : "_search",
				nd : "nd",
				npage : null
			},
			rowNum : (typeof option.rowNum) == "undefined" ? 15 : option.rowNum,
			rowList : (typeof option.rowList) == "undefined" ? [ 15, 30, 45 ]
					: option.rowList,
			/**
			 * *********************ACE自己加的重载jqGrid中的一些样式，自己可以试一下 start
			 * *********************
			 */
			loadComplete : function() {
				var table = this;
				setTimeout(function() {
					Common.updatePagerIcons(table);
					Common.enableTooltips(table);
				}, 0);
			}
		/**
		 * *********************ACE自己加的重载jqGrid中的一些样式，自己可以试一下 end
		 * *********************
		 */
		};

		return gridOption;
	},

	createCombo : function(options) {
		$.ajax({
			url : options.url,
			dataType : "json",
			type : "post",
			data : options.data,
			success : function(json) {
				var $combo = $("#" + options.comboId);
				var comboOption = "";
				if (!Common.isEmpty(options.defaultTip)) {
					comboOption += "<option value=\"" + options.defaultTip.id
							+ "\">" + options.defaultTip.text + "</option>";
				}
				for (var i = 0; i < json.length; i++) {
					if (!Common.isEmpty(options.selectItemId)
							&& options.selectItemId == json[i].id) {
						comboOption += "<option selected=\"selected\" value=\""
								+ json[i].id + "\">" + json[i].text
								+ "</option>";
					} else {
						comboOption += "<option value=\"" + json[i].id + "\">"
								+ json[i].text + "</option>";
					}
				}

				$combo.html(comboOption);
			},
			error : function() {
			}
		});
	}
};

Common.updatePagerIcons = function(table) {
	var replacement = {
		'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
		'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
		'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
		'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
	};
	$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon')
			.each(function() {
				var icon = $(this);
				var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

				if ($class in replacement)
					icon.attr('class', 'ui-icon ' + replacement[$class]);
			})
};

Common.enableTooltips = function(table) {
	$('.navtable .ui-pg-button').tooltip({
		container : 'body'
	});
	$(table).find('.ui-pg-div').tooltip({
		container : 'body'
	});
};

/**
 * 重新加载jqgrid
 * 
 * @param id
 * @param params {}
 */
Common.jqGridReload = function(id, params) {
	id = id.indexOf("#") == 0 ? id : "#" + id;

	$(id).jqGrid("setGridParam", {
		postData : params,
		page : 1
	}).trigger("reloadGrid"); // 重新载入
}
/**
 * 获取选中的行（单选）注意：此处的单选是表格本身的属性
 * 
 * @param id
 *            表格ID
 * @returns
 */
Common.jqGridGetSelectedRow = function(id) {
	id = id.indexOf("#") == 0 ? id : "#" + id;
	return $(id).jqGrid("getGridParam", "selrow");
}

/**
 * 获取选中的行（多选）注意：此处的单选是表格本身的属性，如果表格设置的不能多选，又用此方法获取选中，则失败！
 * 
 * @param id
 *            表格ID
 * @returns
 */
Common.jqGridGetSelectedRows = function(id) {
	id = id.indexOf("#") == 0 ? id : "#" + id;
	return $(id).jqGrid("getGridParam", "selarrrow");
}

/**
 * 删除行
 * 
 * @param id
 *            表格ID
 * @param rowIndex
 *            行索引
 */
Common.jqGridDeleteRow = function(id, rowIndex) {
	id = id.indexOf("#") == 0 ? id : "#" + id;
	$(id).jqGrid("delRowData", rowIndex);
}

/**
 * 获取行数据（JSON）
 * 
 * @param id
 * @param rowIndex
 */
Common.jqGridGetRowData = function(id, rowIndex) {
	id = id.indexOf("#") == 0 ? id : "#" + id;
	return $(id).jqGrid("getRowData", rowIndex);
}

/**
 * 设置某一行不选中
 * 
 * @param id
 * @param rowIndex
 */
Common.jqGridSetRowUnSelect = function(id, rowIndex) {
	id = id.indexOf("#") == 0 ? id : "#" + id;
	// 获取所有选中的行
	var allSelectRowsIndex = Common.jqGridGetSelectedRows(id);
	for (var i = 0; i < allSelectRowsIndex.length; i++) {
		if (rowIndex == allSelectRowsIndex[i]) {
			// 如果传入的行号被找到，则设置这一行不被选中
			$(id).jqGrid('setSelection', rowIndex);
			break;
		}
	}
}

/**
 * 设置所有行不选中
 */
Common.jqGridSetAllRowUnSelect = function(id) {
	id = id.indexOf("#") == 0 ? id : "#" + id;
	// 获取所有选中的行
	var allSelectRowsIndex = Common.jqGridGetSelectedRows(id);

	// 此处由于一旦setSelection后allSelectRowsIndex会变化，所以此处在处理前要重新存一次
	var selectRowIndexs = "";
	for (var i = 0; i < allSelectRowsIndex.length; i++) {
		selectRowIndexs += allSelectRowsIndex[i] + ",";
	}

	// 去掉最后一个逗号
	if (selectRowIndexs.length > 0) {
		selectRowIndexs = selectRowIndexs.substring(0,
				selectRowIndexs.length - 1);
	}

	var idxArray = selectRowIndexs.split(",");

	for (var i = 0; i < idxArray.length; i++) {
		$(id).jqGrid('setSelection', idxArray[i]);
	}
}

/**
 * 设置某一行选中
 * 
 * @param id
 * @param rowIndex
 */
Common.jqGridSetRowSelect = function(id, rowIndex) {
	id = id.indexOf("#") == 0 ? id : "#" + id;

	// 获取所有选中的行
	var isSelect = false;
	var allSelectRowsIndex = Common.jqGridGetSelectedRows(id);
	for (var i = 0; i < allSelectRowsIndex.length; i++) {
		if (rowIndex == allSelectRowsIndex[i]) {
			// 如果传入的行号被找到，则标识该行已被选中
			isSelect = true;
			break;
		}
	}

	if (!isSelect) {
		// 如果所有选中行中没有要求的这一行，则选中这一行
		$(id).jqGrid('setSelection', rowIndex);
	}
}

/**
 * 设置所有行选中
 */
Common.jqGridSetAllRowSelect = function(id) {
	id = id.indexOf("#") == 0 ? id : "#" + id;
	var $grid = $(id);
	for (var i = 1; i <= $grid.getRowData().length; i++) {
		Common.jqGridSetRowSelect(id, i);
	}
}

/**
 * 让combo选中一条数据
 * 
 * @param comboId
 * @param value
 */
Common.comboSelectItem = function(comboId, value) {
	comboId = comboId.indexOf("#") == 0 ? comboId : "#" + comboId;
	$(comboId).children("option[value='" + value + "']").attr("selected",
			"selected");
}

Common.select2EmptyOption = "<option value=''> </option>";
Common.initSelect2 = function(comboId, option) {
	var combo = $("#" + comboId);

	if (!option.onChangeEvent) {
		if (option.width) {
			combo.css("width", option.width);
		}

		combo.html(Common.select2EmptyOption);

		combo.select2({
			allowClear : true,
			minimumResultsForSearch : option.minimumResultsForSearch!=null?option.minimumResultsForSearch:Infinity
		}); // 初使化combo
	}

	if (combo.attr("cascade") && !(option.cascadePass == true)) {
		// 有级联标志，所以不能加载数据，数据应由上级触发
		return false;
	}

	var url = "";
	if (combo.attr("url")) {
		url = combo.attr("url");
	} else {
		url = option.url;
	}

	$.ajax({
		url : url,
		type : "post",
		data : $.extend({}, option.params),
		dataType : "json",
		success : function(json) {
			if (json.length > 0) {
				for (var i = 0; i < json.length; i++) {
					combo.append("<option value='" + json[i].id + "'>" + json[i].text + "</option>");
				}

				if (combo.attr("child")) {
					var childArray = combo.attr("child").split(",");
					// 如果有配置下级ID，那个在选择后应触发
					combo.unbind("change");
					combo.change(function() {
						for (var i = 0; i < childArray.length; i++) {
							// 清空子级
							var childObj = $("#" + childArray[i]);
							childObj.select2("val", "");
							childObj.html(Common.select2EmptyOption);
							
							if (childObj.attr("child")) {
								// 如果还有子级还有子级，则触发子级的change事件
								childObj.trigger("change");
							}
							
							// 重新加载子级
							Common.initSelect2(childArray[i], {
								params : {
									pValue : $(this).val()
								},
								cascadePass : true,
								onChangeEvent : true
							});
						}
					})

				}

				if (!Common.isEmpty(combo.attr("selectval"))) {
					combo.select2("val", combo.attr("selectval").split(",")).trigger("change");
				}
			}
		}
	});
}

var dspTime = 0;
/**
 * 提示框
 * 
 * @param msg
 *            信息
 * @param isSuccess
 *            是否成功
 * @param hideTime
 *            自动关闭时间（毫秒）
 */
Common.staticAlert = function(msg, isSuccess, hideTime) {
	var divId = "system_alert";

	if ($("#" + divId).length <= 0) {
		// 要显示的提示框
		var html = "<div class=\"\" style=\"display: none\" id=\"" + divId
				+ "\">";
		html += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\">";
		html += "<i class=\"ace-icon fa fa-times\"></i>";
		html += "</button>";
		html += "<i class=\"\" id=\"system_alert_icon\"></i>";
		html += "<div id=\"system_alert_msg\" style=\"margin:-22px 0 0 22px\"></div>"
		html += "</div>";
		// 将提示框加入到page-content-area的最前面
		$(".page-content-area").prepend(html);
	}

	// 根据状态设置提示框的样式
	var $msgBox = $("#" + divId);
	if (isSuccess) {
		$msgBox.attr("class", "alert alert-block alert-success");
		$("#system_alert_icon").attr("class", "ace-icon fa fa-check green")
	} else {
		$msgBox.attr("class", "alert alert-danger");
		$("#system_alert_icon").attr("class", "ace-icon fa fa-times")
	}

	$("#system_alert_msg").html(msg);

	$msgBox.show();
	dspTime = new Date().getTime();

	if (hideTime > 0) {
		setTimeout(function() {
			if (new Date().getTime() - dspTime >= hideTime) {
				$msgBox.hide();
				// $msgBox.animate({
				// opacity: "hide"
				// }, "slow");
			}
		}, hideTime);
	}
}

Common.alert = function(msg, isSuccess, fn) {
	var btn = {};

	if (isSuccess) {
		btn = {
			"success" : {
				"label" : "<i class='ace-icon fa fa-check'></i> 确定",
				"className" : "btn-sm btn-success",
				"callback" : fn
			}
		}
	} else {
		btn = {
			"danger" : {
				"label" : "<i class='ace-icon fa fa-check'></i> 确定",
				"className" : "btn-sm btn-danger",
				"callback" : fn
			}
		}
	}

	bootbox.dialog({
		message : "<span class='bigger-110'>" + msg + "</span>",
		buttons : btn
	});
}

/**
 * 消息提示框
 * 
 * @param title
 *            标题
 * @param msg
 *            消息
 * @param isSuccess
 *            是否成功
 * @param hideTime
 *            自动关闭时间（毫秒）
 */
Common.messageBox = function(title, msg, isSuccess, hideTime) {
	$.gritter.add({
		title : title,
		text : msg,
		time : Common.isEmpty(hideTime) ? 2000 : hideTime,
		class_name : isSuccess ? 'gritter-success' : 'gritter-error'
	});
}
/**
 * 弹出输入框
 * 
 * @param title
 *            弹出框标题
 * @param nullMsg
 *            弹出输入框输入内容为空时候的提示语句
 * @param canNull
 * 			  是否可以为空   yes/no
 * @param callBack
 *            回调函数（回调函数会把输入内容传入）
 */
Common.prompt = function(title, nullMsg, callBack, canNull) {
	bootbox.prompt(title, function(data) {
		if (data !== null) {
			if (data == '')
				if (canNull != null && canNull == "yes")
					callBack(data);
				else
					Common.alert(nullMsg, false);
			else
				callBack(data);
		}
	});
}
/**
 * 确认提示框
 * 
 * @param msg
 *            消息
 * @param fn
 *            确认后的回调函数
 */
Common.confirm = function(msg, fn) {
	bootbox.confirm(msg, function(result) {
		if (result) {
			setTimeout(fn, 0);
		}
	});
}

Common.formValidate = function(formId, rules, messages) {
	$("#" + formId)
			.validate(
					{
						errorElement : 'div',
						errorClass : 'help-block',
						focusInvalid : false,
						ignore : "select",
						rules : rules,
						messages : messages,

						highlight : function(e) {
							$(e).closest('.form-group').removeClass('has-info')
									.addClass('has-error');
						},

						success : function(e) {
							$(e).closest('.form-group')
									.removeClass('has-error');// .addClass('has-info');
							$(e).remove();
						},

						errorPlacement : function(error, element) {
							if (element.is('input[type=checkbox]')
									|| element.is('input[type=radio]')) {
								var controls = element
										.closest('div[class*="col-"]');
								if (controls.find(':checkbox,:radio').length > 1)
									controls.append(error);
								else
									error.insertAfter(element.nextAll(
											'.lbl:eq(0)').eq(0));
							} else if (element.is('.select2')) {
								error
										.insertAfter(element
												.siblings('[class*="select2-container"]:eq(0)'));
							} else if (element.is('.chosen-select')) {
								error
										.insertAfter(element
												.siblings('[class*="chosen-container"]:eq(0)'));
							} else
								error.insertAfter(element.parent());
						},

						submitHandler : function(form) {
							alert();
						},
						invalidHandler : function(form) {
						}
					});
}

/**
 * 判断是否为空
 * 
 * @param s
 */
Common.isEmpty = function(s) {
	return s == "" || null == s || typeof s == "undefined" || s == "NaN";
}

Common.SERVER_EXCEPTION = "服务器繁忙，请稍候再试！！";

/**
 * 检查是否为数字（正则表达式）
 * @param input
 * @returns {Boolean}
 */
Common.checkRate = function(input) {
	var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
	var nubmer = input;
	if (!re.test(nubmer)) {
		return false;
	}
	return true;
};

/**
 * 查看大图
 * @param pic
 */
Common.ShowImage = function(pic){
	window.open(pic);
};

Common.exportGrid = function (options) {
	options = options || {};
    var data = options["data"] || [];  //数据，json格式
    var ajax = options["ajax"] || false; //使用启用ajax
    var url = options["url"] || ""; //请求地址
    var param = options["param"] || {}; //请求参数
    var paramurl = options["paramurl"] || {}; //请求参数
//    param['pageSize'] = page_size;
//    param['pageIndex'] = current_page;
    
    if(ajax) {
    	var paramArr = [];
		for(var key in param) paramArr.push(key+"="+encodeURIComponent(param[key]));
    	window.location.href = url+"?"+paramArr.join("&");
    	
    }//end if ajax
    
}

/**
 * 加载遮罩层
 * @param divId 需要挡住的层ID
 * @param loadStr 加载时的文字
 */
Common.showMask = function(loadStr) {
	if (Common.isEmpty(loadStr)) {
		loadStr = "正在加载数据请稍候......";
	}
	
	$("body").mask(loadStr);
}

/**
 * 去掉遮罩层
 * @param divId 初挡住的层ID
 */
Common.hideMask = function() {
	$("body").unmask();
}
/**
 * 画廊参数
 * add  by chentianjin
 */
Common.colorbox_params = {
	reposition:true,
	scalePhotos:true,
	scrolling:false,
	opacity : 0.65,
	previous:'<i class="ace-icon fa fa-arrow-left"></i>',
	next:'<i class="ace-icon fa fa-arrow-right"></i>',
	close:'&times;',
	current:'{current}/{total}',
	maxWidth:'100%',
	maxHeight:'100%',
	rel:'group',
	onOpen:function(){
		document.body.style.overflow = 'hidden';
	},
	onClosed:function(){
		document.body.style.overflow = 'auto';
	},
	onComplete:function(){
		$.colorbox.resize();
	}
};

/**
 * Form表单重置
 * @param id form表单ID,为空默认Id为:findForm
 */
Common.resetForm = function(id) {
	id = id || "findForm";
	$('#'+id)[0].reset();
	//处理form无法直接reset的地方
    var formItems = ["select"];
    for(var i =0;i<formItems.length;i++){
        var formItem = formItems[i];
        $("#"+id).find(formItem).each(function(index){
            var item = $(this);
            if(formItem=="select"){
            	item.select2("val", "");
            	item.trigger("change");
            } else { //预留后期其他处理
               
            }
        });
    }
}
