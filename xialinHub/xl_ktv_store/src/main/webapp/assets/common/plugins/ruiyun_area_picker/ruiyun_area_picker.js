/**
 * 省市区板块四级联动菜单(单选框形式)
 * 可自由扩展其他的选择内容
 */
(function($){
    var html = '<div class="ruiyun-area-picker-tip"><span class="ruiyun-area-picker-title"></span></div><span class="ruiyun-area-picker-span">\
                <span class="ruiyun-area-picker-default"></span>\
                <span class="ruiyun-area-picker-title">\
                </span>\
                <div class="ruiyun-area-picker-arrorw"></div>\
                <div class="ruiyun-area-picker-reset"></div>\
                </span><div class="ruiyun-area-picker-dropdown">\
                <div class="ruiyun-area-picker-select-wrap">\
                <div class="ruiyun-area-picker-tab">\
                </div>\
                <div class="ruiyun-area-picker-content">\
                </div>\
                </div>\
                </div>';
    var loading = '<div class="ruiyun-area-picker-loading"></div>';

    function _resetPicker(that, customer) {
		var entity = that.data("poly_prov_entity");
		entity.find(".ruiyun-area-picker-default").css("display", "block");
		entity.find(".ruiyun-area-picker-title .ruiyun-area-picker-item").text("");
		entity.find(".ruiyun-area-picker-content ul li").removeClass("ruiyun-area-picker-active");
		entity.find(".ruiyun-area-picker-content ul").not(":eq(0)").empty();
		var tabList = customer["tabList"];
		for (var i = 0; i < tabList.length; i++) {
			var item = tabList[i];
			$("#" + item["tabId"] + "Id").val("");
			$("#" + item["tabId"] + "Name").val("");
		}
		that.val("");
	}

    /**
	 * 自定义选择器的创建方法
	 * 
	 * @param that
	 * @param customer
	 *        {
     *
     *              spanWidth:250,选择框的宽度
     *              dropWidth:300,弹出tab框的宽度
     *              defaultTitle:"ceshi",刚开始时显示的文字
     *              clickCallback:function(id,value,idkey,valuekey),选项的点击回调事件,this指代当前的span标签
     *              tabList:[
     *                  {
     *                      tabTitle:"TEST",弹出框tab页的标题
     *                      tabId:"test",弹出框tabcontent的class后缀
     *                      dataUrl:"http://www.baidu.com"，数据请求url地址，返回json格式[{dataId:value,dataName:value}]
     *                      pId:"pValue",向url请求数据时传入的参数名称(不传入本参数时默认为前一个tab的dataId，第一个tab可不传入本参数)
     *                      dataId:"dataId",返回数据内容的id的key，同时也是隐藏输入框的id
     *                      dataName:"dataName",返回数据内容的名称的key，同时也是隐藏输入框的id
     *                      defaultVal:{dataId:value,dataName:value}dataId为配置的dataId，dataName为配置的dataName
     *                  }
     *              ]
     *        }
	 */
    function _createPicker(that, customer) {
		var entity = $(html);
		var prov_tip = entity.first();
		var prov_span = entity.eq(1);
		var prov_drop = entity.last();
		var click_callback = customer["clickCallback"];
		entity.find(".ruiyun-area-picker-default").text(customer["defaultTitle"]);
		that.css("display", "none");

		prov_span.click(function(e) {
			e.stopPropagation();
			prov_drop.toggleClass("ruiyun-area-picker-open");
			$(this).toggleClass("ruiyun-area-picker-open");
			entity.find(".ruiyun-area-picker-tab a").eq(0).trigger("click");
		});

		$(document).click(function(e) {
			prov_span.removeClass("ruiyun-area-picker-open");
			prov_drop.removeClass("ruiyun-area-picker-open");
			prov_tip.css("display", "none");
		});

		prov_span.hover(function(e) {
			// var span_height = prov_span.outerHeight();
			// var title_width = $(this).find(".ruiyun-area-picker-title").outerHeight();
			// if(title_width > span_height){
			// prov_tip.css("display","block");
			// }
			var title = "";
			prov_span.find(".ruiyun-area-picker-item").each(function(index) {
				title += $(this).text();
			});
			prov_span.attr("title", title);
		}, function() {
			prov_tip.css("display", "none");
		});

		// 鼠标移入tip时也显示
		// prov_tip.hover(function(){
		// prov_tip.css("display","block");
		// },function(){
		// prov_tip.css("display","none");
		// });

		prov_span.find(".ruiyun-area-picker-reset").click(function(e) {
			e.stopPropagation();
			prov_tip.css("display", "none");
			prov_drop.removeClass("ruiyun-area-picker-open");
			that.areaPickerReset();
		});

		entity.find(".ruiyun-area-picker-title").on("click", ".ruiyun-area-picker-item", function(e) {
			e.stopPropagation();
			prov_span.addClass("ruiyun-area-picker-open");
			prov_drop.addClass("ruiyun-area-picker-open");
			entity.find(".ruiyun-area-picker-tab a").eq($(this).index()).trigger("click");
		});

		entity.find(".ruiyun-area-picker-tab").on("click", "a", function(e) {
			e.stopPropagation();
			var _this = $(this);
			_this.siblings().removeClass("ruiyun-area-picker-active");
			_this.addClass("ruiyun-area-picker-active");
			entity.find(".ruiyun-area-picker-content > div").removeClass("ruiyun-area-picker-active");
			entity.find(".ruiyun-area-picker-content > div").eq(_this.index()).addClass("ruiyun-area-picker-active");

		});

		entity.find(".ruiyun-area-picker-content").on("click", "li", function(e) {
			e.stopPropagation();
			var _this = $(this);
			_this.siblings().removeClass("ruiyun-area-picker-active");
			_this.addClass("ruiyun-area-picker-active");
		});

		for (var i = 0; i < customer["tabList"].length; i++) {
			prov_span.find(".ruiyun-area-picker-title").append('<span class="ruiyun-area-picker-item"></span>');
			prov_tip.find(".ruiyun-area-picker-title").append('<span class="ruiyun-area-picker-item"></span>');
		}

		for (var i = 0; i < customer["tabList"].length; i++) {
			var row = customer["tabList"][i];
			var nextRow = customer["tabList"][i + 1];
			(function(row, nextRow, that, entity, i, prov_span, prov_tip, prov_drop, click_callback) {
				entity.find(".ruiyun-area-picker-content").append(
						'<div class="ruiyun-area-picker-' + row["tabId"] + ' ruiyun-area-picker-active"><ul class="ruiyun-area-picker-ul"></ul></div>');
				entity.find(".ruiyun-area-picker-tab").append('<a>' + row["tabTitle"] + '</a>');
				if (row["defaultVal"] != null) {
					entity.find(".ruiyun-area-picker-default").css("display", "none");
					that.after('<input type="text" id="' + row["tabId"] + "Id" + '" style="display: none;" value="'
							+ (row["defaultVal"][row["dataId"]] || "") + '"><input type="text" id="' + row["tabId"] + "Name"
							+ '" style="display: none;" value="' + (row["defaultVal"][row["dataName"]] || "") + '">');
					if (i == customer["tabList"].length - 1) {
						prov_span.find(".ruiyun-area-picker-item").eq(i).text("/ " + (row["defaultVal"][row["dataName"]] || ""));
						prov_tip.find(".ruiyun-area-picker-item").eq(i).text("/ " + (row["defaultVal"][row["dataName"]] || ""));
					} else {
						if (i == 0) {
							prov_span.find(".ruiyun-area-picker-item").eq(i).text((row["defaultVal"][row["dataName"]] || "") + " ");
							prov_tip.find(".ruiyun-area-picker-item").eq(i).text((row["defaultVal"][row["dataName"]] || "") + " ");
						} else {
							prov_span.find(".ruiyun-area-picker-item").eq(i).text("/ " + (row["defaultVal"][row["dataName"]] || "") + " ");
							prov_tip.find(".ruiyun-area-picker-item").eq(i).text("/ " + (row["defaultVal"][row["dataName"]] || "") + " ");
						}
					}
				} else {
					that.after('<input type="text" id="' + row["tabId"] + "Id" + '" style="display: none;"><input type="text" id="'
							+ row["tabId"] + "Name" + '" style="display: none;">');
				}
				if (i == 0) {
					entity.find(".ruiyun-area-picker-" + row["tabId"]).prepend(loading);
					$.ajax({
						url : row["dataUrl"],
						data : {},
						dataType : "json",
						success : function(list) {
							entity.find(".ruiyun-area-picker-" + row["tabId"] + " .ruiyun-area-picker-loading").remove();
							for (var j = 0; j < list.length; j++) {
								var li = list[j];
								var item = $('<li id="' + li[row["dataId"]] + '">' + li[row["dataName"]] + '</li>');
								entity.find(".ruiyun-area-picker-" + row["tabId"] + " ul").append(item);
							}
						},
						error : function() {
							throw new Error("数据加载失败");
						}
					});
				}
				if (i == customer["tabList"].length - 1 && customer["tabList"].length > 1) {
					entity.find(".ruiyun-area-picker-" + row["tabId"]).on("click", "li", function(e) {
						var _this = $(this);
						$("#" + row["tabId"] + "Id").val(_this.attr("id"));
						that.val(_this.attr("id"));
						$("#" + row["tabId"] + "Name").val(_this.text());
						prov_span.find(".ruiyun-area-picker-item").eq(i).text("/ " + _this.text());
						prov_tip.find(".ruiyun-area-picker-item").eq(i).text("/ " + _this.text());
						entity.find(".ruiyun-area-picker-default").css("display", "none");
						prov_drop.toggleClass("ruiyun-area-picker-open");
						prov_span.toggleClass("ruiyun-area-picker-open");
						if (typeof click_callback === "function") {
							click_callback.apply(this, [ _this.attr("id"), _this.text(), row["dataId"], row["dataName"] ]);
						}
					});
				} else {
					entity.find(".ruiyun-area-picker-" + row["tabId"]).on(
							"click",
							"li",
							function(e) {
								var _this = $(this);
								$("#" + row["tabId"] + "Id").val(_this.attr("id"));
								that.val("");
								$("#" + row["tabId"] + "Name").val(_this.text());
								entity.find(".ruiyun-area-picker-tab a").eq(i + 1).trigger("click");
								if (i == 0) {
									prov_span.find(".ruiyun-area-picker-item").eq(i).text(_this.text() + " ");
									prov_tip.find(".ruiyun-area-picker-item").eq(i).text(_this.text() + " ");
								} else {
									prov_span.find(".ruiyun-area-picker-item").eq(i).text("/ " + _this.text() + " ");
									prov_tip.find(".ruiyun-area-picker-item").eq(i).text("/ " + _this.text() + " ");
								}
								entity.find(".ruiyun-area-picker-default").css("display", "none");
								prov_span.find(".ruiyun-area-picker-item").eq(i).nextAll().text("");
								prov_tip.find(".ruiyun-area-picker-item").eq(i).nextAll().text("");
								var data = {};
								if (nextRow != null) {
									data[nextRow["pId"] || row["dataId"]] = _this.attr("id");
									entity.find(".ruiyun-area-picker-" + nextRow["tabId"]).prepend(loading);
									entity.find(".ruiyun-area-picker-" + row["tabId"]).nextAll().find("ul").empty();
									$.ajax({
										url : nextRow["dataUrl"],
										data : data,
										dataType : "json",
										success : function(list) {
											entity.find(".ruiyun-area-picker-" + nextRow["tabId"] + " .ruiyun-area-picker-loading").remove();
											for (var j = 0; j < list.length; j++) {
												var li = list[j];
												var item = $('<li id="' + li[nextRow["dataId"]] + '">' + li[nextRow["dataName"]]
														+ '</li>');
												entity.find(".ruiyun-area-picker-" + nextRow["tabId"] + " ul").append(item);
											}
										},
										error : function() {
											throw new Error("数据加载失败");
										}
									});
								} else {
									prov_drop.toggleClass("ruiyun-area-picker-open");
									prov_span.toggleClass("ruiyun-area-picker-open");
								}
								if (typeof click_callback === "function") {
									click_callback
											.apply(this, [ _this.attr("id"), _this.text(), row["dataId"], row["dataName"] ]);
								}
							});
				}
			})(row, nextRow, that, entity, i, prov_span, prov_tip, prov_drop, click_callback);
		}
		that.after(entity);
		that.data("poly_prov_entity", entity);
		prov_span.css({
			"width" : customer["spanWidth"] + "px"
		});
		prov_drop.css({
			"top" : prov_span.offset().top + prov_span.outerHeight(),
			"left" : prov_span.offset().left,
			"width" : customer["dropWidth"] + "px"
		});
		prov_tip.css({
			"top" : prov_span.offset().top - prov_tip.outerHeight() - 5,
			"left" : prov_span.offset().left
		});
	}

    /**
	 * show_city 是否显示城市，默认显示 show_county 是否显示县级，默认不显示 show_plate 是否显示板块，默认不显示 province_conf省级配置 city_conf市级配置 county_conf县级配置
	 * plate_conf板块配置
	 * 
	 * @type {}
	 * @private
	 */
	var _defaultArgs = {
		customer : {
			spanWidth : 300,
			dropWidth : 350,
			clickCallback : function() {
			},
		},
		show_city : true,
		show_county : false,
		show_plate : false,
		show_own_province : false,
		show_own_city : false,
		province_conf : {
			tabTitle : "省份",
			tabId : "province",
			dataUrl : "combo/areacascade/province",
			dataId : "provinceId",
			dataName : "provinceName"
		},
		city_conf : {
			tabTitle : "城市",
			tabId : "city",
			dataUrl : "combo/areacascade/city",
			pId : "pValue",
			dataId : "cityId",
			dataName : "cityName"
		},
		county_conf : {
			tabTitle : "区县",
			tabId : "district",
			dataUrl : "combo/areacascade/district",
			pId : "pValue",
			dataId : "districtId",
			dataName : "districtName"
		},
		plate_conf : {
			tabTitle : "板块",
			tabId : "plate",
			dataUrl : "combo/areacascade/plate",
			pId : "pValue",
			dataId : "plateId",
			dataName : "plateName"
		},
		own_province_conf : {
			tabTitle : "省份",
			tabId : "province",
			dataUrl : "combo/areacascade/operateownprovince",
			dataId : "provinceId",
			dataName : "provinceName"
		},
		own_city_conf : {
			tabTitle : "城市",
			tabId : "city",
			dataUrl : "combo/areacascade/operateowncity",
			pId : "pValue",
			dataId : "cityId",
			dataName : "cityName"
		}
	};

    /**
	 * 初始化方法
	 */
	$.fn.areaPicker = function(options) {
		var that = this;
		var opts = $.extend(true, {}, _defaultArgs, options);// 深拷贝
		$.fn.areaPicker.globalOpt = opts;
		if (opts["customer"]["tabList"] == null) {
			var defaultTitle, tabList;
			if (opts["show_own_city"] === true || opts["show_own_province"] === true) {
				if (opts["show_own_city"]) {
					defaultTitle = "请选择省";
					tabList = [ opts["own_province_conf"] ];

					defaultTitle += "/市";
					tabList.push(opts["own_city_conf"]);
				} else {
					defaultTitle = "请选择省份";
					tabList = [ opts["own_province_conf"] ];
				}
			} else {
				if (opts["show_plate"] === true)
					opts["show_county"] = true;
				if (opts["show_county"] === true)
					opts["show_city"] = true;

				defaultTitle = "请选择省";
				tabList = [ opts["province_conf"] ];
				if (opts["show_city"] === true) {
					defaultTitle += "/市";
					tabList.push(opts["city_conf"]);
					if (opts["show_county"] === true) {
						defaultTitle += "/区县";
						tabList.push(opts["county_conf"]);
						if (opts["show_plate"] === true) {
							defaultTitle += "/板块";
							tabList.push(opts["plate_conf"]);
						}
					}
				}
			}
			opts["customer"]["defaultTitle"] = defaultTitle;
			opts["customer"]["tabList"] = tabList;
			$.fn.areaPicker.globalOpt["customer"] = opts["customer"];
			_createPicker(that, opts["customer"]);
		} else {
			_createPicker(that, opts["customer"]);
		}
		return that;
	};

    /**
     * 重置方法
     */
    $.fn.areaPickerReset = function() {
		var opts = $.fn.areaPicker.globalOpt;
		_resetPicker(this, opts["customer"]);
		return this;
	}
    
    /**
     * 获取值
     */
    $.fn.getSelected = function () {
    	var that = $(this);
    	var inputArray = that.nextAll("input");
    	var selectValues = {};
    	for (var i = 0; i < inputArray.length; i++) {
    		selectValues[$(inputArray[i]).attr("id")] = $(inputArray[i]).val();
    	}
    	
    	return selectValues.length <= 0 ? null : selectValues;
	}
})(jQuery);