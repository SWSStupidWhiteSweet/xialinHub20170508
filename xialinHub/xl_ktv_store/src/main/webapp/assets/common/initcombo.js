//$(function() {
//	$("select").each(function(index) {
//		var o = $(this);
//		init(o);
//	});
//
//	function init(o) {
//		var url = o.attr("url");
//		if (!Common.isEmpty(url)) {
//			var cascade = o.attr("cascade"); // 级联标志
//			var pvalue = o.attr("pvalue"); // 上级选中的值
//			var reader = o.attr("reader");
//			if ((typeof cascade == "undefined")
//					|| (cascade == "" && pvalue != "" && typeof pvalue != "undefined" && pvalue != null)) {
//				url = url + (pvalue != "" && pvalue != "undefined" && pvalue != null ? pvalue : "");
//				$.ajax({
//					url : url,
//					type : "post",
//					dataType : "json",
//					success : function(json) {
//						try {
//							var valueKey = "";
//							var textKey = "";
//							if (reader != "" && typeof reader != "undefined" && reader != null) {
//								var readerJson = eval("(" + reader + ")");
//								valueKey = readerJson.valueKey;
//								textKey = readerJson.textKey;
//							} else {
//								valueKey = "value";
//								textKey = "text";
//							}
//
//							var localHtml = "";
//							var showNullItem_ = o.attr("showNullItem"); // 是否显示空项,默认显示
//							if (typeof showNullItem_ != "undefined" && showNullItem_ == 'false') {
//							} else {
//								var nullItemText = o.attr("nullItemText") ? o.attr("nullItemText") : "";
//								localHtml = "<option value=\"\">" + nullItemText + "</option>";
//							}
//							
//							var defaultSelectValue = o.attr("defaultselectvalue");
//							for (var i = 0; i < json.length; i++) {
//								if (defaultSelectValue != "" && typeof defaultSelectValue != "undefined"
//									&& defaultSelectValue != null && defaultSelectValue == json[i][valueKey]) {
//									localHtml += "<option selected value=\"" + json[i][valueKey] + "\" >" + json[i][textKey] + "</option>";
//								} else {
//									localHtml += "<option value=\"" + json[i][valueKey] + "\" >" + json[i][textKey] + "</option>";
//								}
//							}
//
//							o.html(localHtml);
//							
//							initChosen(o);
//						} catch (e) {
//
//						}
//					},
//					error : function() {
//						console.error("下拉列表生成失败，" + o.attr("id"));
//
//						initChosen(o);
//					}
//				});
//			}
//		}
//	}
//
//	function initChosen(o) {
//		// 自身select加载完后，开始初始化chosen
//		/** ***********************************chosen控件初使化 start *********************************** */
//		o.chosen({
//			allow_single_deselect : true,
//			no_results_text: "没有找到您输入的结果："
//		});
//		// resize the chosen on window resize
//
//		$(window).off('resize.chosen').on('resize.chosen', function() {
//			o.next().css({
//				'width' : o.parent().width()
//			});
//		}).trigger('resize.chosen');
//
//		// resize chosen on sidebar collapse/expand
//		$(document).on('settings.ace.chosen', function(e, event_name, event_val) {
//			if (event_name != 'sidebar_collapsed')
//				return;
//
//			o.next().css({
//				'width' : o.parent().width()
//			});
//		});
//		
////		o.trigger("liszt:updated");
//		/** ***********************************chosen控件初使化 end *********************************** */
//	}
//});