/**
 * Created by user on 2016/6/2.
 */

/**
 * blpc全局对象
 * @type {{documentReady: blpc.documentReady}}
 */
var blpc = {
	
	serverPath:"/common/",
    actionList:{
        getProvince:"getProvince",
        getCitys:"getCitys",
        getDistricts:"combo/areacascade/district",
        getPlates:"combo/areacascade/plate"
    },
    /**
     * 页面初始化动作
     * @param call
     */
    documentReady: function (call, lastCall) {

        $(document).ready(function(){
            call();//初始化表格的工作请放到这个callback中

            //初始化checkbox和radio
            blpc._initCheckboxAndRadio();
            //初始化form
            blpc._initForm();

            //初始化日期选择框
            $(".blpc-date-input").click(function(){
                WdatePicker({skin:'blpc'});
            });

            //初始化导出框
//            $("#export_btn").click(function (e) {
//                blpc.popExport({
//                    sure:blpc.exportGrid({})
//                });
//            });
            blpc.initMoreCondition();

            if (lastCall != null) {
                lastCall();//业务操作请放到这个callback中
            }
        });
    },
    
    initMoreCondition:function(){
    	var position = $(".blpc-more-condition-btn").position();
    	var moCond = 300;
	    	if(position) {
		    	$(".blpc-more-condition").css({
		    		"top":position.top+$(".blpc-more-condition-btn").outerHeight()+5,
		    		"left":position.left
		    	});
		    	$(".blpc-more-condition-btn").click(function(e){
		    		$(".blpc-more-condition").slideToggle();
		    		var mB = $(".blpc-grid-wrap").width();
		    		var mL = $(".blpc-more-condition").offset().left;
		    		var remLeft = mL + moCond;
		    		if(remLeft>mB){
		    			$(".blpc-more-condition").css({
		    				 "right":0,
		    				 "left":""
		    			});
		    		}
		    	});
	    	}
    },

    exportGrid: function (options) {
		options = options || {};
        var data = options["data"] || [];  //数据，json格式
        var page_size = parseInt(options["page_size"]) || 20; //pagesize
        var ajax = options["ajax"] || false; //使用启用ajax
        var url = options["url"] || ""; //请求地址
        var param = options["param"] || {}; //请求参数
	    var paramurl = options["paramurl"] || {}; //请求参数
	    var tableId= options["tableId"] || $this.attr("id");
        var opts = {
            page_size: page_size,
            tableId : tableId
        };
        
        var colum_settings = [];
        var colum_render = {};
        var colum_data_format = {};
        $("#"+tableId).find("thead th").each(function (index) {
        	if($(this).find("input").length<1){
        		var id_ = $(this).attr("col-id");
        		var hidden_ = $(this).attr("hidden");
        		var alias_ = $(this).attr("other-name"); 
        		if(!hidden_ && id_!='index') {
	        		var text_ = $(this).text();
	        		if(alias_)text_ = alias_;
	        		var column = {
	        			k: text_,
	        			v: id_
	        		};
	        		colum_settings.push(column);
        		}
        		if(typeof $(this).attr("render") != "undefined" && $(this).attr("render") != null) {
        			colum_render[id_] = $(this).attr("render");
        		}
        		if(typeof $(this).attr("dataFormat") != "undefined" && $(this).attr("dataFormat") != null) {
        			colum_data_format[id_] = $(this).attr("dataFormat");
        		}
        	}
        }); //end find th
        
        param['pageSize'] = page_size;
        param['pageIndex'] = current_page;
        param['renderColum'] = JSON.stringify(colum_render);
        param['dataFormatColum'] = JSON.stringify(colum_data_format);
        param['param'] = JSON.stringify(colum_settings);
        
        if(ajax) {
        	var paramArr = [];
			for(var key in param) paramArr.push(key+"="+encodeURIComponent(param[key]));
        	window.location.href = url+"?exportGrid=1&"+paramArr.join("&");
        	
        }//end if ajax
        
    },

    /**
     * 获取iframe的高度
     * @returns {number}
     */
    iframeHeight:function (isChild){
        if(isChild){
            return blpc.getParentIframeHeight();
        }else{
            return blpc.getClientHeight() - 80 - 25 - 43 - 25;//根据需求修改
        }
    },

    /**
     * 获取父页面的高度
     */
    getParentClientHeight:function (){
        return parent.document.body.scrollHeight > parent.document.documentElement.scrollHeight ? parent.document.body.scrollHeight : parent.document.documentElement.scrollHeight;
    },

    /**
     * 在父页面中打开一个iframe
     * @param obj
     */
    openParentNewFrame:function(obj){
        var frame_id = self.frameElement.getAttribute("id");
        var tab_id="";
        if(frame_id.indexOf("frame_")==0){
            tab_id= frame_id.substring(6,frame_id.length);
        }else{
            tab_id= frame_id;
        }
        if(tab_id==frame_id){
            var ppid= '';
            if(window.parent.window.frameElement){
            	ppid = window.parent.window.frameElement.getAttribute("id");
            }
            if(ppid.indexOf("frame_")==0){
                tab_id= ppid.substring(6,ppid.length);
            }else{
                tab_id= ppid;
            }
            obj["iid"]=frame_id;
        }else{
            obj["iid"]=0;
        }
        obj["pid"]=tab_id;
    	try{
        	window.parent.openNewIframe(obj);
    	}catch(e){
        	window.parent.parent.openNewIframe(obj);
    	} 
    },

    /**
     * 获取高度
     * @returns {number}
     */
    getClientHeight:function (){
        //var browser = navigator.userAgent;
        return document.body.scrollHeight > document.documentElement.scrollHeight ? document.body.scrollHeight : document.documentElement.scrollHeight;
    },

    /**
     * 将字符串转换为JSON
     * @param str
     */
    strToJson: function (str) {
        if (typeof str === 'string') {
            return JSON && JSON.parse(str);
        }
    },
    /**
     * 将json转换为字符串
     * @param json
     */
    jsonToStr: function (json) {
        if (typeof json === 'object') {
            return JSON && JSON.stringify(json);
        }
    },

    equalArray: function (a1, a2) {
        if (a1.length != a2.length) return false;
        for (var i = 0; i < a1.length; i++) {
            var j = blpc.isContain(a2, a1[i]);
            if (j < 0) {
                return false;
            } else {
                a2.splice(j, 1);
            }
        }
        return true;
    },

    isContain: function (_arr, _element) {
        for (var i = 0; i < _arr.length; i++) {
            if (_arr[i] == _element) {
                return i;
            }
        }
        return -1;
    },

    getParentIframeHeight: function () {
        var s = '0px';
        if(parent.document.getElementsByClassName("iframeClass")[0]){
        	s = parent.document.getElementsByClassName("iframeClass")[0].style.height;
        }
        var height = parseInt(s.substring(0, s.length - 2));
        return height;
    },
    /**
     * 设置table的高度
     */
    setTableHeight: function (tableId) {
        var iframe_height = $("#" + tableId).parents().filter("html").parent().height() || 0;
        var aboutM_height = $(".aboutMoney").outerHeight(true) || 0;
        var head_heigth = $(".blpc-head").outerHeight(true) || 0;
		var polySecher_height = $(".poly-header-secher").outerHeight(true) || 0;
		var markList_height = $(".blpc-area-right-mark-top").outerHeight() || 0;
        var posCard_height = $(".pos_card").outerHeight(true) || 0;
        var foot_height = 45;
        $("#"+tableId).parent().css("height", iframe_height - polySecher_height - head_heigth - markList_height - aboutM_height - posCard_height - foot_height-2);
    },
    /**
     * 使用iCheck插件直接初始化checkbox和radio
     * @private
     */
    _initCheckboxAndRadio:function(){
        $("input").iCheck({
            checkboxClass: 'icheckbox-blpc',
            radioClass: 'iradio-blpc',
            increaseArea: '' // optional
        });
    },
    /**
     * 初始化form
     * @private
     */
    _initForm: function () {
        $("input[type='text'],input[type='password'],textarea").each(function () {
            var o = $(this);
            var required = o.attr("required");
            if (required == "required") {
                o.after('<span class="blpc-required-star">*</span>');
            }
            var readonly = o.attr("readonly");
            if(readonly!=null && readonly=="readonly"){
                o.addClass("blpc-readonly-input");
                return true;
            }
            o.Tip({
                content: "",
                direction: "right"
            });
            (function (o) {
                o.blur(function (e) {
                    var warning = false;
                    var maxlen = o.attr("maxlen");
                    var required = o.attr("required");
                    var warning_text = "";
                    if (required == "required") {
                        if (blpc.trim(o.val()) == "") {
                            warning = true;
                            warning_text = "本字段为必填字段，请填写";
                        }
                    }
                    if (maxlen != null) {
                        var length = blpc.lenFor(blpc.trim(o.val()));
                        if (length > maxlen) {
                            warning = true;
                            warning_text = "本字段长度最大为" + maxlen + "个字符，请重新填写";
                        }
                    }
//                    o.Tip({
//                        content: warning_text,
//                        direction: "right"
//                    });
                    if (warning) {
                        o.addClass("blpc-input-warning");
                        o.Tip("content",warning_text);
//                        o.data("tip").options.content = warning_text;
                        o.Tip("show");
                    } else {
                        o.removeClass("blpc-input-warning");
                        o.Tip("hide");
                    }
                });
            })(o);
        });
        
        blpc.initSelect();

    },
    initSelect:function(id){
    	if(id != null){
    		_init($("#"+id));
    	}else{
    		$("select").each(function (index) {
        		var o = $(this);
        		_init(o);
            });
    	}
    	
    	function _init(o){
            var required = o.attr("required");
            if (required == "required") {
                o.after('<span class="blpc-required-star">*</span>');
            }
            var direction_ = o.attr("direction");
            if(direction_==null ||  typeof direction_=="undefined"){
            	direction_ = "right";
            }
            var readonly = o.attr("readonly");
            if(readonly!=null && readonly=="readonly"){
                o.addClass("blpc-readonly-input");
            }
            
            var url = o.attr("url");
            if (url != "" && typeof url != "undefined" && url != null) {
            	var cascade = o.attr("cascade"); // 级联标志
            	var pvalue = o.attr("pvalue"); // 上级选中的值
            	var reader = o.attr("reader");
            	if ((typeof cascade == "undefined") || (cascade == "" && pvalue != "" && typeof pvalue != "undefined" && pvalue != null)) {
            		url = url + (pvalue != "" && pvalue != "undefined" && pvalue != null ? pvalue : "");
            		$.ajax({
            			url : url,
            			type : "post",
            			dataType : "json",
            			success : function(json) {
            				try {
            					var valueKey = "";
            					var textKey = "";
            					if (reader != "" && typeof reader != "undefined" && reader != null ) {
            						var readerJson = eval("(" + reader + ")");
            						valueKey = readerJson.valueKey;
            						textKey = readerJson.textKey;
            					} else {
            						valueKey = "value";
            						textKey = "text";
            					}
            					
            					var localHtml = "";
            					var showNullItem_ = o.attr("showNullItem"); //是否显示空项,默认显示
            					if(typeof showNullItem_ != "undefined" && showNullItem_ =='false') {
            					} else {
            						var nullItemText = o.attr("nullItemText") ? o.attr("nullItemText"):"==请选择==";
        							localHtml = "<option value=\"\">"+nullItemText+"</option>";
            					}
            					for (var i = 0; i < json.length; i++) {
            						localHtml += "<option value=\"" + json[i][valueKey] + "\" >" + json[i][textKey] + "</option>";
            					}
            					
            					o.html(localHtml);
            					
            					var defaultSelectValue = o.attr("defaultselectvalue");
            					if (defaultSelectValue != "" && typeof defaultSelectValue != "undefined" && defaultSelectValue != null) {
            						o.val(defaultSelectValue);
            					}
            					//HKCHEN: 设置初始默认值，还有问题
            					var defaultfirst = o.attr("defaultfirst");
            					if (defaultfirst != "" && typeof defaultfirst != "undefined" && defaultfirst != null) {
//            						console.log("-----------"+o.attr("id"));
            						$("#"+o.attr("id")+" option:eq(1)").prop("selected", true);
            						console.log(("#"+o.attr("id")+" :selected").text());
            						o.change();
            					}
            					//HKCHEN: 自动加载后值改变
            					var autochange_ = o.attr("autochange");
            					if (typeof autochange_ != "undefined" && autochange_ != null) {
            						o.change(); 
            					}
            				} catch (e) {
            					
            				}
            			},
            			error : function() {
            				console.error("下拉列表生成失败，" + o.attr("id"));
            			}
            		});
            	}
            }
            
            // 为级联下拉列表加上selectedchange事件
            var child = o.attr("child");
            if (child != null && child != "" && child != "undefined") {
            	o.change(function() {
            		// 清除级联子标签的选项
            		cleanChildSelect(o);
            		var pValue = o.val(); // 当前选中的ID
            		var childId = o.attr("child");
            		if ( typeof childId == "undefined") {
            			return false;
            		}
            		
            		var childObj = $("#" + childId);
            		var childUrl = childObj.attr("url");
            		if(pValue==''||typeof childId == "undefined")return;
            		$.ajax({
            			url : childUrl + pValue,
            			type : "post",
            			dataType : "json",
            			success : function(json) {
            				try {
            					var valueKey = "";
            					var textKey = "";
            					var reader = childObj.attr("reader");
            					if (reader != "" && typeof reader != "undefined" && reader != null ) {
            						var readerJson = eval("(" + reader + ")");
            						valueKey = readerJson.valueKey;
            						textKey = readerJson.textKey;
            					} else {
            						valueKey = "value";
            						textKey = "text";
            					}
            					
            					//var localHtml = "<option value=\"\">==请选择==</option>";
            					var localHtml = "";
            					var showNullItem_ = childObj.attr("showNullItem"); //是否显示空项,默认显示
            					if(typeof showNullItem_ != "undefined" && showNullItem_=='false') {
            					} else {
            						var nullItemText = childObj.attr("nullItemText") ? childObj.attr("nullItemText") : "==请选择==";
        							localHtml = "<option value=\"\">"+nullItemText+"</option>";
            					}
            					for (var i = 0; i < json.length; i++) {
            						localHtml += "<option value=\"" + json[i][valueKey] + "\" >" + json[i][textKey] + "</option>";
            					}
            					childObj.html(localHtml);
            				} catch (e) {
            					
            				}
            			},
            			error : function() {
            				// alert("下拉列表生成失败，" + o.attr("id"));
            			}
            		});
            	});
            }
            // select的必填信息
            o.change(function() {
				if (required != null && required == "required") {
					if (blpc.trim(o.val()) == "") {
	                	if(o.data("tip")){
	                		o.Tip("content","本字段为必填字段，请填写");
	                	}else{
	                        o.Tip({
	                        	content:"本字段为必填字段，请填写",
	                            direction: direction_
	                        });
	                	}
	                	o.Tip("show");
					} else {
						if (o.data("tip")) {
							o.Tip("hide");
						}
					}
				}
			});
    	}
        
        function cleanChildSelect(obj) {
        	var childId = obj.attr("child");
    		if ( typeof childId == "undefined") {
    			return false;
    		} else {
    			// 有子级联
    			var childObj = $("#" + childId);
    			var localHtml = "";
				var showNullItem_ = childObj.attr("showNullItem"); //是否显示空项,默认显示
				if(typeof showNullItem_ != "undefined" && showNullItem_=='false') {
				} else {
					var nullItemText = childObj.attr("nullItemText") ? childObj.attr("nullItemText"):"==请选择==";
					localHtml = "<option value=\"\">"+nullItemText+"</option>";
				}
    			childObj.html(localHtml);
    			
    			cleanChildSelect(childObj);
    		}
        }
    },
    /**
     * 格式化金额
     * @param {number} m 必选 金额
     * @param {int} n 可选 保留几位小数默认2位
     * @returns {number} 返回格式化后的金额
     */
    formatMoney: function (m, n) {
        var n = n || 2;
        if (typeof m != 'number') {
            m = Number(m);
        }
        var _j = Math.pow(10, n);
        m = (Math.ceil(m * _j)) / _j;
        return m.toFixed(n);
    },
    /**
     * 过滤字符串，去掉头尾空格
     * @method trim
     * @param  {String} str 必选 字符串
     * @returns {String}  去掉空格的字符串
     */
    trim: function (str) {
        if (String.prototype.trim) {
            return str == null ? "" : String.prototype.trim.call(str);
        } else {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
    },

    /**
     * 过滤所有字符串，去掉所有的空格
     * @method trimAll
     * @param  {String} str 必选 字符串
     * @returns {String} 去掉空格的字符串
     */
    trimAll: function (str) {
        return str.replace(/\s*/g, '');
    },
    /**
     * 设置时间选择器
     * @param  {String} id 要关联的其他选着器的input标签ID
     * @param  {int} type 1：设置最大值 0：设置最小值
     */
    createWdatePicker : function(id,type){
    	if(type==1){
    		WdatePicker({skin:'blpc',maxDate:$("#"+id).val()});
    	}else if(type==0){
    		WdatePicker({skin:'blpc',minDate:$("#"+id).val()});
    	}
    },
    /**
     * 获取字符串字节长度
     * @param str
     * @returns {number}
     */
    lenFor: function (str) {
        var byteLen = 0, len = str.length;
        if (str) {
            for (var i = 0; i < len; i++) {
                if (str.charCodeAt(i) > 255) {
                    byteLen += 2;
                }
                else {
                    byteLen++;
                }
            }
            return byteLen;
        }
        else {
            return 0;
        }
    },
    /**
     * 获取表格中选中的行
     * @param gridId 表格id
     * @return checked 选中的行jquery对象数组
     */
    getGridSelected: function (gridId) {
    	var selectItems = [];
        var grid = $("#" + gridId);
        var rows_check = grid.find("tbody").find("input[type='checkbox'],input[type='radio']");
        //var checked = [];
        rows_check.each(function (index) {
        	var selectItem = {};
            var o = $(this);
            if (o.prop("checked")) {
            	var tmpTr = o.parent().parent().parent();
            	tmpTr.find("td").each(function(index, element){
            		var tmpTh = grid.find("th:eq(" + index + ")");
            		var tmpColId = tmpTh.attr("col-id");
            		if(tmpColId != null){
            			selectItem[tmpColId] = element.innerText;
            		}
            	});
            	selectItems.push(selectItem);
                //checked.push(o.parent().parent().parent());
            }
        });
        return selectItems;
    },
    /**
     * 获取表格中最先选中的一行
     * @param gridId 表格id
     * @return checked 选中的行jquery对象
     */
    getGridSelectedOne: function (gridId) {
    	var selectItem = {};
        var grid = $("#" + gridId);
        var rows_check = grid.find("tbody").find("input[type='checkbox'],input[type='radio']");
        rows_check.each(function (index) {
            var o = $(this);
            if (o.prop("checked")) {
            	var tmpTr = o.parent().parent().parent();
            	tmpTr.find("td").each(function(index, element){
            		var tmpTh = grid.find("th:eq(" + index + ")");
            		var tmpColId = tmpTh.attr("col-id");
            		if(tmpColId != null){
            			selectItem[tmpColId] = element.innerText;
            			return selectItem;
            		}
            	});
            }
        });
        return selectItem;
    },
    /**
     * 检验字符串是否是html
     * @param htmlStr
     * @returns {boolean}
     */
    checkHtml: function (htmlStr) {
        var reg = /<[^>]+>/g;
        return reg.test(htmlStr);
    },
    /**
     * 校验身份证
     * @param code
     * @returns {boolean}
     * @constructor
     */
    IdentityCodeValidStrong:function(str){
        var sId = str;
        if (sId.length == 15) {
            if(!/^\d{14}(\d|x)$/i.test(sId)){
                return false;
            } else  {
                sId=sId.substr(0,6)+'19'+sId.substr(6,9);
                sId+= getVCode(sId);
            }
        }
        function getVCode(CardNo17) {
            var Wi = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1);
            var Ai = new Array('1','0','X','9','8','7','6','5','4','3','2');
            var cardNoSum = 0;
            for (var i=0; i<CardNo17.length; i++)cardNoSum+=CardNo17.charAt(i)*Wi[i];
            var seq = cardNoSum%11;
            return Ai[seq];
        }
        var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"} ;

        var iSum=0 ;
        var info="" ;
        if(!/^\d{17}(\d|x)$/i.test(sId)){
            return false;
        }
        sId=sId.replace(/x$/i,"a");
        if(aCity[parseInt(sId.substr(0,2))]==null){
            return false;
        }
        sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
        var d=new Date(sBirthday.replace(/-/g,"/")) ;
        if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate())){
            return false;
        }
        for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
        if(iSum%11!=1){
            return false;
        }
        return true;
    },
    /**
     * 身份证弱校验，只校验位数和末尾
     * @param idcard
     */
    IdentityCodeValid:function(idcard){
    	var reg;
    	if(idcard.length == 15){
    		reg = /^\d{14}(\d|x|X)$/;
    		
    	}else{
    		reg = /^\d{17}(\d|x|X)$/;
    	}
    	return reg.test(idcard)
    },
    /**
     * 实例化流程选择框
     * @param flowType			流程业务类型	
     * @param callBackFun		回调函数
     * @param callBackFunParam	回调函数的参数var callBackFunParam = {}
	 * add by chentianjin 2016-09-01
     */
    initFlowSelectOption:function (flowType,callBackFun,callBackFunParam){
    	$.ajax({
			url : path+"/flow/flowAbout/initFlowOption",
			type : "post",
			dataType : "json",
			data:{
				flowType:flowType
			},
			success : function(json) {
				blpc.prompt("", {
		            title:"流程选择框",
		            content:"<div><label style='width: 100%;text-align:center;'>请选择要发起的流程：</label><select id='flowDefineId' class='blpc-select blpc-select-b'>"+json.msg+"</select></div>",
		            sure:function(){
		            	callBackFunParam.flowDefineId = $("#flowDefineId").val();
		            	callBackFun(callBackFunParam);
		            },
		            cancel:function(){
		            }
		        });
			},
			error : function() {
				blpc.alert("获得流程发起的选择项失败！！");
			}
		});
    },
    ShowImage:function(pic){
    	window.open(pic);
    },
    /**
     * 验证时间 yyyy-mm-dd HH:mi:ss
     * @param testdate
     * @returns {boolean}
     */
    validateTime:function (time) {
        if(blpc.trim(time)=="")return true;
        //年月日时分秒正则表达式
        var r=time.match(/^(\d{1,4})\-(\d{1,2})\-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
        if(r==null){
            //alert("请输入格式正确的日期\n\r日期格式：yyyy-mm-dd\n\r例    如：2008-08-08\n\r");
            return false;
        }
        var d=new Date(r[1],r[2]-1,r[3],r[4],r[5],r[6]);
        var num = (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[2]&&d.getDate()==r[3]&&d.getHours()==r[4]&&d.getMinutes()==r[5]&&d.getSeconds()==r[6]);
        if(num==0){
            //alert("请输入格式正确的日期\n\r日期格式：yyyy-mm-dd\n\r例    如：2008-08-08\n\r");
        }
        return (num!=0);
    },
    /**
     * 验证日期 yyyy-mm-dd
     * @param date
     * @returns {boolean}
     */
    validateDate: function (date) {
        if(blpc.trim(date)=="")return true;
        //年月日正则表达式
        var r=date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if(r==null){
            //alert("请输入格式正确的日期\n\r日期格式：yyyy-mm-dd\n\r例    如：2008-08-08\n\r");
            return false;
        }
        var d=new Date(r[1],r[3]-1,r[4]);
        var num = (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
        if(num==0){
            //alert("请输入格式正确的日期\n\r日期格式：yyyy-mm-dd\n\r例    如：2008-08-08\n\r");
        }
        return (num!=0);
    },
    /**
     * 校验email
     * @param email
     * @returns {boolean}
     */
    validateEmail:function(email){
        var reg = /([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})/;
        return reg.test(email);
    },
    /**
     * 验证整数
     * @param num
     * @returns {boolean}
     */
    validateInt: function (num) {
        var reg = /^-?\d+$/;
        return reg.test(num);
    },
    /**
     * 验证浮点数
     * @param num
     * @returns {boolean}
     */
    validateFloat:function(num){
        var reg = /^(-?\d+)(\.\d+)?$/;
        return reg.test(num);
    },
    /**
     * 验证座机号码
     * @param tel
     * @returns {boolean}
     */
    validateTel:function(tel){
        var reg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?|(400\-[0-9]{0,7}\-[0-9]{1,7})?$/;
        return reg.test(tel);
    },
    /**
     * 验证手机号码
     * @param mobile
     * @returns {boolean}
     */
    validateMobile: function (mobile) {
        //var reg = /^(?:13\d|15[89])-?\d{5}(\d{3}|\*{3})$/;
    	var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
        return reg.test(mobile);
    },
    /**
     * 验证是否是URL
     * @method isUrl
     * @param {string} str 字符串
     * @returns {boolean} true/fasle
     */
    validateUrl:function(str){
        return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(str);
    },
    /**
     * 验证是否是中文字符
     * @method isChinese
     * @param {string} str 字符串
     * @returns {boolean} true/fasle
     */
    validateChinese:function(str){
        return /[\u4e00-\u9fa5]/g.test(str);
    },
    /**
     * 验证是否是IP地址
     * @method isIp
     * @param {string} str 字符串
     * @returns {boolean} true/fasle
     */
    validateIp:function(str){
        return /^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/.test(str);
    },
    /**
     * 设置组件为禁用状态
     * @param obj
     */
    disabled:function(obj){

    },

    /**
     * 弹出框组件
     * 基本参数    说明
     *    type    显示的内容图标类型，默认为“info”(什么图标都没有)，还要success,error,warning
     *    title    弹出的标题文本
     *    width    弹出的层的宽度(默认：0)
     *    height    弹出的层的高度(默认：0)
     * 样式参数
     *    background    遮罩层背景色(默认：#000(黑色))
     *    opacity    透明度(0：完全透明；1：不透明，默认：0.5)
     *    duration    三种预定淡出(入)速度之一的字符串("slow", "normal", or "fast")或表示动画时长的毫秒数值(如：1000)，(默认:"normal")
     *    showTitle    是否显示标题(默认：true)
     *    dragOpacity    drag为true时，拖动弹层时的透明度(默认：1(不透明))
     * 动作参数
     *    escClose    是不可以按下“ESC”关闭(默认：true)
     *    popMaskClose    是否可以点击遮罩层关闭 (默认：false)
     *    drag    是否可以拖动弹层(默认：true)
     *    content    自定义内容区区(添加了content属性，则msg参数不起作用)
     *    bottom     自定义底部按钮区，确认按钮带blpc-pop-sure类,取消按钮带blpc-pop-cancel类
     * 回调方法
     *    sure   确认回调方法(包括export),
     *    cancel   取消回调方法
     *    ready  弹出框初始化完成回调
     */
    /**
     * 弹出框
     * @param msg
     * @param arg
     */
    alert: function (msg, arg) {
        var alertDefaults = {
            popType: "alert",
            title: "提示",
            content: msg===undefined?"":msg,
            bottom:'<a href="javascript:void(0);" class="blpc-btn-l blpc-pop-sure">确定</a>',
            type:"info",
            sure: function () {

            },
            cancel : function() {
            	
            },
            ready:function(){
            	
            }
        };
        var opt = $.extend({}, this._defaults_args, alertDefaults, arg);
        this._creatLayer(opt)
    },
    confirm: function (msg, arg) {
        var confirmDefaults = {
            popType: "confirm",
            title: "请选择",
            content: msg===undefined?"":msg,
            bottom:'<a href="javascript:void(0);" class="blpc-btn-s blpc-pop-sure">确定</a><a href="javascript:void(0);" class="blpc-btn-d blpc-pop-cancel">取消</a>',
            type:"info",
            cancel: function () {},
            sure: function () {},
            ready:function(){
            	
            }
        };
        var opt = $.extend({}, this._defaults_args, confirmDefaults, arg);
        this._creatLayer(opt)
    },
    prompt: function (msg, arg) {
        var promptDefaults = {
            popType: "prompt",
            title: "请输入",
            content: "<p>"+(msg===undefined?"":msg)+"</p><div><input type='text'></div>",
            bottom:'<a href="javascript:void(0);" class="blpc-btn-s blpc-pop-sure">确定</a><a href="javascript:void(0);" class="blpc-btn-d blpc-pop-cancel">取消</a>',
            type:"info",
            cancel: function () {

            },
            sure: function (value) {

            },
            ready:function(){
            	
            }
        };
        var opt = $.extend({}, this._defaults_args, promptDefaults, arg);
        this._creatLayer(opt)

    },
    Ban:function(msg, arg){
        var promptDefaults = {
            popType: "prompt",
            title: "是否取消已禁止结佣",
            content: "<p>"+(msg===undefined?"":msg)+"</p><div><textarea class='blpc-away-area' placeholder='备注'></textarea></div>",
            bottom:'<a href="#" class="blpc-btn-s blpc-pop-sure">确定</a><a href="#" class="blpc-btn-d blpc-pop-cancel">取消</a>',
            type:"info",
            cancel: function () {

            },
            sure: function (value) {

            }
        };
        var opt = $.extend({}, this._defaults_args, promptDefaults, arg);
        this._creatLayer(opt)
    },
    popExport:function(arg){
        var promptDefaults = {
            popType: "export",
            title: "请输入",
            content: '导出第 <input class="blpc-txt-s blpc-export-front" type="text"/>页至第 <input class="blpc-txt-s blpc-export-back" name="" type="text"/>页的数据',
            bottom:'<a href="#" class="blpc-btn-s blpc-fr blpc-export-btn">生成excel</a>',
            sure: function (obj) {

            },
            ready:function(){
            	
            }
        };
        var opt = $.extend({}, this._defaults_args, promptDefaults, arg);
        this._creatLayer(opt)
    },
    closeSimplePop: function () {
        this._closeLayer();
    },
    _defaults_args: {
        icon: "",
        title: "",
        content: "",
        bottom:"",
        width: 428,
        height: 100,
        background: "#fff",
        opacity: 0.5,
        duration: "normal",
        escClose: true,
        popMaskClose: false,
        drag: true,
        dragOpacity: 1,
        popType: "alert",
        type: "info"
    },
    _creatLayer: function (opt) {
        var self = this;
        //$(".popMask").empty().remove();
        $(".blpc-pop-mask").empty().remove();
        $(".blpc-pop-main").empty().remove();
        $("body").append("<div class='blpc-pop-mask'></div>");
        var $mask = $(".blpc-pop-mask");
        $mask.css({
            "background-color": opt.background,
            filter: "alpha(opacity=" + opt.opacity * 100 + ")",
            "-moz-opacity": opt.opacity,
            opacity: opt.opacity
        });
        opt.popMaskClose &&
        $mask.bind("click", function () {
            self._closeLayer()
        });
        opt.escClose && $(document).bind("keyup", function (e) {
            try {
                e.keyCode == 27 && self._closeLayer()
            } catch (f) {
                self._closeLayer()
            }
        });
        $mask.fadeIn(opt.duration);
        var wrap = '<table border="0" cellpadding="0" cellspacing="0" id="warning" class="blpc-pop-main blpc-ejectbox" width="'+opt.width+'">\
            <tr class="blpc-ejectbox-top">\
            <td class="blpc-ejectbox-topl" width="35"></td>\
            <td class="blpc-ejectbox-topc">\
            <h2 class="blpc-pop-title">'+opt.title+'</h2>\
            <a href="#" class="close blpc-pop-close"></a>\
            </td>\
            <td class="blpc-ejectbox-topr" width="35"></td>\
            </tr>\
            <tr class="blpc-ejectbox-center" height="'+opt.height+'">\
            <td class="blpc-ejectbox-centerl"></td>\
            <td align="center" valign="top" class="blpc-ejectbox-centerc">\
            <p class="blpc-pop-content">'+opt.content+'</p>\
            </td>\
            <td class="blpc-ejectbox-centerr"></td>\
            </tr>\
            <tr class="blpc-ejectbox-bottom">\
            <td class="blpc-ejectbox-bottoml"></td>\
            <td valign="top" align="center" class="blpc-ejectbox-bottomc blpc-pop-bottom">\
            '+opt.bottom+'</td>\
            <td class="blpc-ejectbox-bottomr"></td>\
            </tr>\
            </table>';
        $("body").append(wrap);
        /**
         *  如果页面出现滚动条点击按钮时的弹出框要向上滚动才能看见，现在刷新滚动条到顶端
         */
        // start add by xialin
        var topWin= (function (p,c){
            while(p!=c){
                c = p       
                p = p.parent
            }
            return c
        })(window.parent,window);
        $(topWin.document).find("iframe").each(function(){
        	$(this).contents().find('body').scrollTop(0);
        });
        // end add by xialin
        var $popMain = $(".blpc-pop-main");
        var icon_class = "";
        if(opt.popType!="export"){
            switch(opt.type){
                case "success":
                    icon_class = "blpc-ico2";
                    break;
                case "error":
                    icon_class = "blpc-ico3";
                    break;
                case "warning":
                    icon_class = "blpc-ico1";
                    break;
                default:
                    break;
            }
        }
        $popMain.find(".blpc-pop-content").addClass(icon_class);
        $(".blpc-pop-close").bind("click", function () {
            $mask.fadeOut(opt.duration);
            $popMain.fadeOut(opt.duration);
            //$mask.remove();
            //$popMain.remove();
        });
//        console.log($(window).height());
//        console.log($(document).height());
//        console.log($(document.body).height());
//        console.log($(top.window.document).height());
        var topHeight = $(top.window.document).height() - 80 - 43;
        $popMain.css({
            left: $(window).width() / 2 - $popMain.width() / 2 + "px",
            top: topHeight / 2 - $popMain.height() / 2 + "px"
        });
        $(window).resize(function () {
            $popMain.css({
                left: $(window).width() / 2 - $popMain.width() / 2 + "px",
                top: topHeight / 2 - $popMain.height() / 2 + "px"
            });
        });
        opt.drag && this._drag(opt.dragOpacity);
        switch (opt.popType) {
            case "alert":
                $popMain.fadeIn(opt.duration, function () {
                    $popMain.attr("style", $popMain.attr("style").replace("FILTER:", ""))
                });
                $(".blpc-pop-sure").bind("click", function () {
                    var flag = opt.sure();
                    if(flag == null || flag){//return false不关闭弹出框
                    	self._closeLayer();
                    }
                });
                $(".blpc-pop-close").bind("click", function () {
                	var flag = opt.cancel();
                    if(flag == null || flag){//return false不关闭弹出框
                    	self._closeLayer();
                    }
                });
                break;
            case "confirm":
                $popMain.fadeIn(opt.duration, function () {
                    $popMain.attr("style", $popMain.attr("style").replace("FILTER:", ""))
                });
                $(".blpc-pop-sure").bind("click",function () {
                    var flag = opt.sure();
                    if(flag == null || flag){//return false不关闭弹出框
                    	self._closeLayer();
                    }
                });
                $(".blpc-pop-cancel").bind("click", function () {
                    opt.cancel();
                    self._closeLayer();
                });
                break;
            case "prompt":
                $popMain.fadeIn(opt.duration, function () {
                    $popMain.attr("style", $popMain.attr("style").replace("FILTER:", ""))
                });
                $(".blpc-pop-sure").bind("click",function () {
                    var result = {};
                    $(".blpc-pop-main input").each(function(index){
                        result[$(this).attr("id") || "input"+index] = $(this).val();
                    });
                    var flag = opt.sure(result);
                    if(flag == null || flag){//return false不关闭弹出框
                    	self._closeLayer();
                    }
                });
                $(".blpc-pop-cancel").bind("click", function () {
                    opt.cancel();
                    self._closeLayer();
                });
                break;
            case "export":
                $popMain.fadeIn(opt.duration, function () {
                    $popMain.attr("style", $popMain.attr("style").replace("FILTER:", ""))
                });
                $(".blpc-export-btn").bind("click",function(){
                    var result = {
                        front:$(".blpc-export-front").val(),
                        back:$(".blpc-export-back").val()
                    };
                    var flag = opt.sure(result);
                    if(flag == null || flag){//return false不关闭弹出框
                    	self._closeLayer();
                    }
                });
                break;
            default:
                break;
        }
        if(typeof opt.ready == "function"){
        	opt.ready();
        }
    },
    _closeLayer: function () {
        $(".blpc-pop-close").triggerHandler("click")
    },
    _drag: function (d) {
        var isDown = false, b, g;
        $(".blpc-ejectbox-top").bind("mousedown", function (e) {
            if ($(".blpc-pop-main:visible").length > 0) {
                isDown = true;
                b = e.pageX - parseInt($(".blpc-pop-main").css("left"), 10);
                g = e.pageY - parseInt($(".blpc-pop-main").css("top"), 10);
                $(".blpc-ejectbox-top").css({
                    cursor: "move"
                })
            }
        });
        $(".blpc-ejectbox-top").bind("mousemove", function (e) {
            if (isDown && $(".blpc-pop-main:visible").length > 0) {
                d != 1 && $(".blpc-pop-main").fadeTo(0, d);
                var f = e.pageX - b;
                e = e.pageY - g;
                if (f < 0) f = 0;
                if (f > $(window).width() - $(".blpc-pop-main").width()) f = $(window).width() - $(".blpc-pop-main").width() - 2;
                if (e <
                    0) e = 0;
                if (e > $(window).height() - $(".blpc-pop-main").height()) e = $(window).height() - $(".blpc-pop-main").height() - 2;
                $(".blpc-pop-main").css({
                    top: e,
                    left: f
                })
                var $this = $(this);
                if($this.next().find("table").hasClass("fixed_thead")){
                	var vhead = $this.next().find("table");
                	vhead.css("left", f + 35);
                }
            }
        }).bind("mouseup", function () {
            if ($(".blpc-pop-main:visible").length > 0) {
                isDown = false;
                d != 1 && $(".blpc-pop-main").fadeTo(0, 1);
                $(".blpc-ejectbox-top").css({
                    cursor: "auto"
                })
            }
        })
    },
    //弹出框组件结束

    /**
     * ajax封装
     */
    submit:function(options){
        var opts = $.extend({},blpc.submitDefaultOpt,options);
        if(blpc.validateForm(opts["id"])){
            opts["data"] = opts["id"]!=""?blpc.transJsonById(opts["id"]) : opts["data"];
            var data = $.extend({},opts["data"],options["otherParam"]);
            opts["data"] = data;
            opts["success"]= function(data){
	    		//poly.hideMask();
	    		(options["success"] || function(data){})(data);
	    	}
	    	opts["error"] = function(XMLHttpRequest, textStatus, errorThrown){
	    		//poly.hideMask();
	    		(options["error"] || function(XMLHttpRequest, textStatus, errorThrown){})
	    			(XMLHttpRequest, textStatus, errorThrown);
	    	}
            delete opts["id"];
            console.log(opts);
            $.ajax(opts);
        } else {
        	$.hideMask();
        }
    },
    //TODO 加密提交
    submitEncrypt:function(options){

    },
    submitDefaultOpt:{
        id:"",//需要提交的组件的id(可以是div，form或者其他组件)
        url:"",
        type:"post",
        async:true,
        dataType:"json",
        data:{}
    },
    /**
     * 将id元素中的表单元素封装成json
     * @param id
     * @param flag true表示得到空值对象
     * @returns {{}}
     */
    transJsonById:function(id, flag){
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
    },
    /**
     * 将id元素中的表单元素封装成数组
     * @param id
     * @param flag true表示得到空值对象
     * @returns []
     * add by chentianjin 
     */
    transArrayById:function(id, flag){
        var jsonObj = blpc.transJsonById("queryForm");
        var paramArr = [];
        for(var key in jsonObj) paramArr.push(key+"="+jsonObj[key]);
        return paramArr;
    },
    /**
     * 将id元素中的表单元素的显示内容封装成字符串
     * @param id
     * @param flag true表示得到空值对象
     * @returns String
     * add by chentianjin 
     */
    transJsonByTitle:function(id, flag){
    	flag = flag || false;
        var formItems = ["input","select","textarea"],
            jsonObj = {};
        for(var i =0;i<formItems.length;i++){
            var formItem = formItems[i];
            $("#"+id).find(formItem).each(function(index){
                var item = $(this);
                if(item.attr("disabled")) return true;
                if(formItem=="input"){
                	if(!item.attr("paramTitle")) {
                        throw new Error("请为input[type='text']添加paramTitle");
                    }
                    if($.trim(item.val())!="" || flag){
                    	jsonObj[item.attr("paramTitle")] = item.val();
                    }
                }else{
                    if(!item.attr("paramTitle")) {
                        throw new Error("请为select添加paramTitle");
                    }
                    if($.trim(item.val())!="" || flag){
                    	jsonObj[item.attr("paramTitle")] = item.find("option:selected").text();
                    }
                }
            });
        }
        var paramArr = [];
        for(var key in jsonObj) paramArr.push(key+"："+jsonObj[key]);
        var str = paramArr.join("；")==""?"":paramArr.join("；")+"；"
        return str;
    },
    /**
     * 将id元素中的name为某只的所有表单元素的显示内容封装成字符串，并且通过sort元素排序
     * @param id
     * @param flag true表示得到空值对象
     * @returns String
     * add by chentianjin 
     */
    transJsonByTitleAndName:function(id,name,flag){
    	flag = flag || false;
        jsonObj = {};
        var sort = 0;
        $("#"+id).find("[name="+name+"]").each(function(index){
        	sort++;
        	$("#"+id).find("[name="+name+"]").each(function(index){
                var item = $(this);
                if(item.attr("disabled")) return true;
                if(sort==item.attr("sort")){
                	if(item[0].tagName=="INPUT"){
                    	if(!item.attr("paramTitle")) {
                            throw new Error("请为input[type='text']添加paramTitle");
                        }
                        if($.trim(item.val())!="" || flag){
                        	jsonObj[item.attr("paramTitle")] = item.val();
                        }
                    }else{
                        if(!item.attr("paramTitle")) {
                            throw new Error("请为select添加paramTitle");
                        }
                        if($.trim(item.val())!="" || flag){
                        	jsonObj[item.attr("paramTitle")] = item.find("option:selected").text();
                        }
                    }
                }
            });
        });
        var paramArr = [];
        for(var key in jsonObj) paramArr.push(key+"："+jsonObj[key]);
        var str = paramArr.join("；")==""?"":paramArr.join("；")+"；"
        return str;
    },
    /**
     * 校验表单，校验id元素下的表单元素，校验其填写是否规范
     *
     * 必填：required属性
     * 长度: maxlen属性
     * 格式校验: datatype属性
     *   包含的值有：idcard  date  email  number  phone  url
     *
     *
     * @param id
     * @return boolean
     */
    validateForm:function(id){
        if(blpc.trim(id)=="") return true;
        var formItems = ["input","select","textarea"],
            validatePass = true;
        var savePwd = "";
        for(var i =0;i<formItems.length;i++){
            var formItem = formItems[i];
            $("#"+id).find(formItem).each(function(index){
                var item = $(this);
                var val = blpc.trim(item.val());
                var required = item.attr("required");
                var maxlen = item.attr("maxlen");
                var decimal = item.attr("decimal");
                var direction_ = item.attr("directionxx");
                console.log(item.val()+"=direction="+direction_);
                if(direction_ ==null || typeof direction_ == "undefined" ) {
                	direction_ = "right";
                }
                var datatype = blpc.trim(item.attr("datatype"));
                if(required!=null && required == "required" && val==""){
                	if(item.data("tip")){
                		item.Tip("content","本字段为必填字段，请填写");
                	}else{
                        item.Tip({
                        	content:"本字段为必填字段，请填写",
                            direction: direction_
                        });
                	}
                	item.Tip("show");
                    validatePass = false;
                    return false;
                }
                if(maxlen!=null && parseInt(maxlen)<blpc.getStrLen(val)){
                	if(val.indexOf(".") > -1 && datatype=="number"){
                		if(parseInt(maxlen) < blpc.getStrLen(val)-1){
	                		item.Tip("content","本字段长度最大为" + maxlen + "个字符，请重新填写");
    	                	item.Tip("show");
    	                    validatePass = false;
    	                    return false;
                		}
                	}else{
	                	if(item.data("tip")){
	                		item.Tip("content","本字段长度最大为" + maxlen + "个字符，请重新填写");
	                	}else{
	                        item.Tip({
	                        	content:"本字段长度最大为" + maxlen + "个字符，请重新填写",
	                            direction: direction_
	                        });
	                	}
	                	item.Tip("show");
	                    validatePass = false;
	                    return false;
                	}
                }
                if(decimal!=null){
                	//alert(decimal)
                	var decimals=decimal.split(",")
                	if(decimals.length==2){
                		//alert(decimals.length)
                		eval("var re =/(^\\d{1,"+(decimals[0]-decimals[1])+ "}\\.\\d{1,"+decimals[1]+"}$)|(^\\d{1,"+(decimals[0]-decimals[1])+"}$)/;");  
                		//alert(re)
                		//alert(val)
                		if(val.match(re) == null) {  
                    		item.Tip("content","请按正确的格式填写，整数最长" + (decimals[0]-decimals[1])+"位，小数最长"+decimals[1] + "位，请重新填写");
    	                	item.Tip("show");
    	                    validatePass = false;
    	                    return false;
                        } 
                	}
                }
                if(datatype!=null && datatype!="" && ""!=val){
                    switch (datatype){
                        case "idcard":
                            if(!blpc.IdentityCodeValid(val)){
                            	if(item.data("tip")){
                            		item.Tip("content","身份证验证失败，请检查身份证是否输入正确");
                            	}else{
                                    item.Tip({
                                    	content:"身份证验证失败，请检查身份证是否输入正确",
                                        direction: direction_
                                    });
                            	}
                            	item.Tip("show");
                                validatePass = false;
                                return false;
                            }
                            break;
                        case "date":
                            if(!blpc.validateTime(val) && !blpc.validateDate(val)){
                            	if(item.data("tip")){
                            		item.Tip("content","日期校验失败，请检查日期是否输入正确");
                            	}else{
                                    item.Tip({
                                    	content:"日期校验失败，请检查日期是否输入正确",
                                        direction: direction_
                                    });
                            	}
                            	item.Tip("show");
                                validatePass = false;
                                return false;
                            }
                            break;
                        case "email":
                            if(!blpc.validateEmail(val)){
                            	if(item.data("tip")){
                            		item.Tip("content","邮箱校验失败，请检查邮箱地址是否输入正确");
                            	}else{
	                                item.Tip({
	                                	content:"邮箱校验失败，请检查邮箱地址是否输入正确",
	                                    direction: direction_
	                                });
                            	}
                            	item.Tip("show");
                            	validatePass = false;
                            	return false;
                            }
                            break;
                        case "number":
                            if(!blpc.validateInt(val) && !blpc.validateFloat(val)){
                            	if(item.data("tip")){
                            		item.Tip("content","您输入的不是数字，请重新输入");
                            	}else{
                                    item.Tip({
                                    	content:"您输入的不是数字，请重新输入",
                                        direction: direction_
                                    });
                            	}
                            	item.Tip("show");
                                validatePass = false;
                                return false;
                            }
                            break;
                        case "positivenumber":
                            if(!blpc.validateInt(val) && !blpc.validateFloat(val) || (val<0)){
                            	if(item.data("tip")){
                            		item.Tip("content","您输入的不是正数，请重新输入");
                            	}else{
                                    item.Tip({
                                    	content:"您输入的不是正数，请重新输入",
                                        direction: direction_
                                    });
                            	}
                            	item.Tip("show");
                                validatePass = false;
                                return false;
                            }
                            break;
                        case "phone":
                            if(!blpc.validateTel(val) && !blpc.validateMobile(val)){
                            	if(item.data("tip")){
                            		item.Tip("content","您输入的电话号码有误，请重新输入");
                            	}else{
                                    item.Tip({
                                    	content:"您输入的电话号码有误，请重新输入",
                                        direction: direction_
                                    });
                            	}
                            	item.Tip("show");
                                validatePass = false;
                                return false;
                            }
                            break;
                        case "mobilePhone":
                            if(!blpc.validateMobile(val)){
                            	if(item.data("tip")){
                            		item.Tip("content","您输入的手机号码有误，请重新输入");
                            	}else{
                                    item.Tip({
                                    	content:"您输入的手机号码有误，请重新输入",
                                        direction: direction_
                                    });
                            	}
                            	item.Tip("show");
                                validatePass = false;
                                return false;
                            }
                            break;
                        case "password":
                            if(savePwd == ""){
                            	savePwd = val;
                            }else if(val != savePwd){
                            	savePwd = val;
                            	item.Tip({
                                    direction: direction_
                                });
                                item.Tip("content","您两次密码不一致，请重新输入");
                                item.Tip("show");
                                validatePass = false;
                                return false;
                            }
                            break;
                        case "password2":
                        	if(blpc.validateChinese(val)){
                        		if(item.data("tip")){
                            		item.Tip("content","您输入的密码有误，中文不能设置成密码");
                            	}else{
                                    item.Tip({
                                    	content:"您输入的密码有误，中文不能设置成密码",
                                        direction: direction_
                                    });
                            	}
                            	item.Tip("show");
                                validatePass = false;
                                return false;
                        	}
                        	if(val.length<6||val.length>10){
                        		if(item.data("tip")){
                            		item.Tip("content","您输入的密码长度有误，请输入长度为6到10位长度的密码");
                            	}else{
                                    item.Tip({
                                    	content:"您输入的密码长度有误，请输入长度为6到10位长度的密码",
                                        direction: direction_
                                    });
                            	}
                            	item.Tip("show");
                                validatePass = false;
                                return false;
                        	}
                        	
                            break;
                        case "url":
                            if(!blpc.validateUrl(val)){
//                            	if(item.data("tip")){
                            		item.Tip("content","您输入的地址有误，请重新输入");
//                            	}else{
//                                    item.Tip({
//                                    	content:"您输入的地址有误，请重新输入",
//                                        direction: direction_
//                                    });
//                                    item.Tip("content","您输入的地址有误，请重新输入");
//                            	}
                            	item.Tip("show");
                                validatePass = false;
                                return false;
                            }
                        default:
                            break;
                    }
                }
//                item.Tip("hide");
            });
        }
        return validatePass;
    },
    /**
     * 判断字符串是否为空
     * @param value
     * @returns {Boolean}
     */
    isNull : function(value) {
    	return typeof (value) == "undefined" || value == "" || value == null;
    },
    /**
     * 获取字符串长度，中文3字节
     * @param s
     * @returns {Number}
     */
    getStrLen : function(s) {
    	var len = 0;
    	for (var i = 0; i < s.length; i++) {
    		if (s.charCodeAt(i) > 127 || s.charCodeAt(i) == 94) {
    			len += 3; // utf-8中文是三个字节
    		} else {
    			len++;
    		}
    	}
    	return len;
    },
    /**
     * 将json数据设置到页面上
     * checkbox 和 radio的值都在前面加上一个|线
     * 形如|1|2 和 |1
     * @param json
     */
    setFormData:function(json){
        for(var key in json){
            var item = json[key];
            if(item.indexOf("|")==0){
                var checkList = item.split("|");
                for(var i=1;i<checkList.length;i++){
                    $("input[name='"+key+"'][value='"+checkList[i]+"']").iCheck("check");
                }
            }else{
                $("#"+key).val(item);
            }
        }
    },
    /**
     * 省和市，二级联动菜单初始化(单选型)
     * @param provinceId 省级输入框的id
     * @param cityId 市级输入框的id
     *
     */
    provinceCityLink:function(provinceId,cityId,fun){
    	var PROVINCE_ID = "province_id",
    		PROVINCE_NAME = "province_name",
    		CITY_ID = "city_id",
    		CITY_NAME = "city_name",
    		ATTR_NAME = "data-id";
    	
        //首先添加两个多选框
        var province = $("#"+provinceId);
        var city = $("#"+cityId);
        var pro_pull = $("<div class='blpc-pull-div blpc-province-pull'><ul></ul></div>");
        var city_pull = $("<div class='blpc-pull-div blpc-city-pull'><ul></ul></div>");
        pro_pull.css({
            "top":province.offset().top + province.height()+"px",
            "left":province.offset().left+"px"
        });
        city_pull.css({
            "top":city.offset().top + city.height()+"px",
            "left":city.offset().left+"px"
        });
        blpc.getProvinces(function(provinces){
        	for(var i=0;i<provinces.length;i++){
                var p = $("<li><a id='"+provinces[i][PROVINCE_ID]+"'>"+provinces[i][PROVINCE_NAME]+"</a></li>");
                (function(p,city_pull,province,city){
                    p.click(function () {
                        var id = p.find("a").attr("id");
                        var value = p.text();
                        province.val(value);
                        province.attr(ATTR_NAME,id);
                        city.val("");
                        city.attr(ATTR_NAME,"");
                        blpc.getCitys(id,function(n_citys){
                            city_pull.html("<ul></ul>");
                            for(var j=0;j<n_citys.length;j++){
                                var m = $("<li><a id='"+n_citys[j][CITY_ID]+"'>"+n_citys[j][CITY_NAME]+"</a></li>");
                                (function(m,city){
                                    m.click(function () {
                                        city.val(m.text());
                                        city.attr(ATTR_NAME,m.find("a").attr("id"));
                                        if(typeof fun == "function"){
                                        	fun(m.find("a").attr("id"), m.text());	
                                        }
                                        $(".blpc-city-pull").slideToggle();
                                        $(".blpc-province-pull").slideUp();
                                    });
                                })(m,city);
                                city_pull.find("ul").append(m);
                            }
                            $(".blpc-province-pull").slideToggle();
                            $(".blpc-city-pull").slideUp();
                        });
                    });
                })(p,city_pull,province,city);
                pro_pull.find("ul").append(p);
            }
        	pro_pull.click(function(e){
            	e.stopPropagation();
            });
            city_pull.click(function(e){
            	e.stopPropagation();
            });
            province.after(pro_pull);
            city.after(city_pull);
            province.click(function(e){
                $(".blpc-province-pull").slideToggle();
                $(".blpc-city-pull").slideUp();
                e.stopPropagation();
            });
            city.click(function (e) {
                $(".blpc-city-pull").slideToggle();
                $(".blpc-province-pull").slideUp();
                e.stopPropagation();
            });
            document.onclick=function(){
                $(".blpc-province-pull").slideUp();
                $(".blpc-city-pull").slideUp();
            };
        });
        
//        var d_citys = dsy["Items"]["0_0"];
//        for(var i=0;i<d_citys.length;i++){
//            var p = $("<li><a id='"+i+"'>"+d_citys[i]+"</a></li>");
//            (function(p,city){
//                p.click(function(e){
//                    city.val(p.text());
//                    $(".blpc-city-pull").slideToggle();
//                });
//            })(p,city);
//            city_pull.find("ul").append(p);
//        }
    },/**
     * 省和市，二级联动菜单初始化(多选型)
     * @param provinceId 省级输入框的id
     * @param cityId 市级输入框的id
     *
     */
    provinceCityLinkTwo:function(id){
        var provinceIdStr = "province_id",
            provinceNameStr = "province_name",
            cityParentIdStr = "province_id",
            cityIdStr = "city_id",
            cityNameStr = "city_name";

        if(id==null || blpc.trim(id)=="") return;
        //callback = callback || function(data){};
        //首先，初始化控件的样式
        var html = '<input type="text" id="province_id" style="display: none;">\
            <input type="text" readonly id="select_province" class="blpc-input-select blpc-small-input" placeholder="选择省">\
            <input type="text" readonly id="select_city" class="blpc-input-select blpc-small-input" placeholder="选择城市">\
            <div class="blpc-citys-wrap">\
            <div>\
            <span>选择城市列表:</span>\
            </div>\
            <ul>\
            </ul>\
            </div>';
        $("#"+id).html(html);
        //实现两个下拉框的点击逻辑
        var province = $("#select_province");
        var city = $("#select_city");
        var pro_pull = $("<div class='blpc-pull-div blpc-province-pull'><ul></ul></div>");
        var city_pull = $("<div class='blpc-pull-div blpc-city-pull'><ul></ul></div>");
        pro_pull.css({
            "top":province.offset().top + province.height()+"px",
            "left":province.offset().left+"px"
        });
        city_pull.css({
            "top":city.offset().top + city.height()+"px",
            "left":city.offset().left+"px"
        });
        province.after(pro_pull);
        city.after(city_pull);
        province.click(function(e){
            $(".blpc-province-pull").slideToggle();
            $(".blpc-city-pull").slideUp();
            e.stopPropagation();
        });
        city.click(function (e) {
        	$(".blpc-province-pull").slideUp();
            city_pull.find("ul li").remove();
            blpc.getCitys($("#province_id").val(),function(citys){
                for(var i=0;i<citys.length;i++) {
                    var cityItem = citys[i];
                    if(cityItem[cityNameStr] == "县"){
                    	continue;
                    }
                    var c = $("<li><a id='" + cityItem[cityIdStr] + "' proid='" + cityItem[cityParentIdStr] + "'>" + cityItem[cityNameStr] + "</a></li>");
                    (function (c) {
                        c.find("a").click(function (e) {
                            var o = $(this);
                            var id = "city_"+ o.attr("id") + o.attr("proid");
                            var list = $(".blpc-citys-wrap ul").find("a[id='"+id+"']");
                            if(list.length<1){
                                var ci = $("<li><a id='"+id+"' cityid='" + o.attr("id") + "' proid='" + o.attr("proid") + "'>" + o.text() + "</a><i></i></li>");
                                (function(ci){
                                    ci.find("i").click(function () {
                                        $(this).parent().remove();
                                    });
                                })(ci);
                                $(".blpc-citys-wrap ul").append(ci);
                            }
                            e.stopPropagation();
                        });
                    })(c);
                    city_pull.find("ul").append(c);
                }
                $(".blpc-city-pull").slideToggle();
            });
            e.stopPropagation();
        });
        blpc.getProvinces(function(provinces){
            console.log(provinces);
            for(var i=0;i<provinces.length;i++){
                var proItem = provinces[i];
                var p = $("<li><a id='"+proItem[provinceIdStr]+"'>"+proItem[provinceNameStr]+"</a></li>");
                (function(p){
                    p.click(function (e) {
                        var proid = p.find("a").attr("id");
                        var proname = p.find("a").text();
                        $("#province_id").val(proid);
                        $("#select_province").val(proname);
                        $(".blpc-province-pull").slideToggle();
                    });
                })(p);
                pro_pull.find("ul").append(p);
            }
        });
        document.onclick=function(){
            $(".blpc-province-pull").slideUp();
            $(".blpc-city-pull").slideUp();
        };
    },
    /**
     * 实现一个输入框的省份和城市列表
     */
    provinceCityLinkThree:function(){
    	
    },
    /**
     * 获取省份列表
     * @param callback
     * 返回数据格式形如[{province_id:1,province_name:重庆市}]
     */
    getProvinces: function(callback){
        $.ajax({
            url:blpc.serverPath+blpc.actionList.getProvince,
            data:{},
            type: "POST",
            dataType:"json",
            type:"post",
            success:callback,
            error: function () {
                blpc.alert("数据加载失败",{
                    type:"error"
                });
            }
        });
    },
    /**
     * 获取城市列表
     * @param provinceId
     * @param callback
     * 返回数据形如[{province_id:1,city_id:2,city_name:重庆市}]
     */
    getCitys:function(provinceId,callback){
        $.ajax({
            url:blpc.serverPath+blpc.actionList.getCitys,
            data:{"provinceId":provinceId},
            type: "POST",
            dataType:"json",
            type:"post",
            success:callback,
            error:function(){
                blpc.alert("数据加载失败",{
                    type:"error"
                })
            }
        });
//        var list = [{proid:1,cityid:2,cityname:"重庆市"},{proid:1,cityid:3,cityname:"渝中区"}];
//        callback(list);
    },
    /**
     * 
     * @param cityId
     * @param callback
     * 返回数据形如[{cityId:1,districtId:2,districtName:重庆市}]
     */
    getDistricts:function(cityId,callback){
    	$.ajax({
            url:blpc.serverPath+blpc.actionList.getDistricts,
            data:{"pValue":cityId},
            type: "POST",
            dataType:"json",
            type:"post",
            success:callback,
            error:function(){
                blpc.alert("数据加载失败",{
                    type:"error"
                })
            }
        });
    },
    /**
     * 
     * @param cityId
     * @param callback
     * 返回数据形如[{districtId:1,plateId:2,plateName:重庆市}]
     */
    getPlates:function(districtId,callback){
    	$.ajax({
            url:blpc.serverPath+blpc.actionList.getPlates,
            data:{"pValue":districtId},
            type: "POST",
            dataType:"json",
            type:"post",
            success:callback,
            error:function(){
                blpc.alert("数据加载失败",{
                    type:"error"
                })
            }
        });
    },
    /**
     * 获取选中的citys
     * @returns {Array}
     */
    getSelectedCitysTwo:function(){
        var result = [];
        $(".blpc-citys-wrap li a").each(function(index){
            var o = $(this);
            var item = {proid: o.attr("proid"),cityid: o.attr("cityid"),cityname: o.text()};
            result.push(item);
        });
        return result;
    },
    /**
     * 通用上传组件封装
     * 传入div的id
     * 为uploadify组件增加几个参数
     *   1.hasStop  ---是否添加停止上传按钮
     *   2.isPopover  --是否是弹出框上传
     * 使用本方法时不用设置queueID属性
     * 
     * isPopover属性默认为false，
     * 当isPopover属性为false时，需要在界面添加一个div，并将该div的id传入本方法
     * 当isPopover属性为true时，不需要在基面添加div，直接传入一个自定义的id即可。
     * 
     * 在使用本方法之前需要给页面引入jquery.uploadify.min.js文件和uploadify.css文件
     * 
     * 使用uploadifive时也可以使用fileTypeExts属性，限制上传文件的类型，格式形如"*.gif; *.jpg; *.png"，
     * 如果传入此参数，那么只有校验通过的文件才允许上传
     *   
     * @param options
     */
    commonUploadPlugin:function(divId,options){
    	/**
    	 * uploadify方式，需要安装flash插件才能使用，支持浏览器更多
    	 */
    	/*var queueId = 'queue_'+divId;
    	var input_id = 'upload_'+divId;
    	var defaultOpts = {
    			"buttonText" : "请选择",
				"auto" : false,
				'swf'      : '',
				'uploader' : '',
				"multi" : true,
				"queueID" : queueId,
				"onUploadSuccess" : function(file, data, resp) {
					var jsonData = eval("(" + data + ")");
					console.log(jsonData);
				},
				isPopover:false,
				hasStop:false
    	};
    	var opts = $.extend(true,{},defaultOpts,options);
    	var html = '<form id="fileUploadForm_'+divId+'" method="post" enctype="multipart/form-data">\
				<div id="'+queueId+'"></div>\
				<input id="'+input_id+'" type="file">\
			<div class="upload-btn-style">\
				<a href=\'javascript:$("#'+input_id+'").uploadify("upload", "*")\'>上传文件</a>';
		if(opts["hasStop"]){
			html += '<a href=\'javascript:$("#'+input_id+'").uploadify("stop")\'>停止上传</a>';
		}
		html += "</div></form>";
    	if(!opts["isPopover"]){
	    	$("#"+divId).addClass("blpc-upload-plugin").append($(html));
    	}else{
    		blpc.alert("",{
    			content:html,
    			width:450,
    			height:160
    		});
    	}
    	if(opts.uploader.indexOf("\?") > -1){
    		opts.uploader = opts.uploader + "&t="+new Date().getTime();
    	}else{
    		opts.uploader = opts.uploader + "?t="+new Date().getTime();
    	}
    	
    	$('#'+input_id).uploadify(opts);*/
    	//文件后缀解析,传入文件名
    	var suffixParser = function(str,fileName){
    		console.log(str+":"+fileName);
    		var arr = str.split(";");
    		var new_arr = [];
    		for(var i=0;i<arr.length;i++){
    			var item = arr[i];
    			var suffix = item.substring(item.lastIndexOf('.') + 1);
    			new_arr.push(suffix);
    		}
    		var file_suffix = (fileName.substring(fileName.lastIndexOf('.') + 1)).toLocaleLowerCase();
    		var t= new_arr.indexOf(file_suffix);
    		return t!=-1;
    	}
    	
    	/**
    	 * uploadifive方式,使用h5的方式，不用安装任何插件，但是最低版本只支持到ie10
    	 */
    	var queueId = 'queue_'+divId;
    	var input_id = 'upload_'+divId;
    	var defaultOpts = {
				'buttonText' : '请选择',
				'queueID' : queueId,
				'auto' : false,
				'method' : 'POST',
				'multi' : true,
				'removeCompleted' : true,
				'isPopover':false,
				'hasStop':false
    	}
    	var opts = $.extend(true,{},defaultOpts,options);
    	if(opts["uploadScript"] == null){
    		opts["uploadScript"] = opts["uploader"];
    	}
    	if(opts["onUploadComplete"] == null){
    		opts["onUploadComplete"] = opts["onUploadSuccess"];
    	}
    	delete opts["swf"];
    	delete opts["uploader"];
    	delete opts["onUploadSuccess"];
    	var html = '<div id="'+queueId+'"></div>\
				<input id="'+input_id+'" type="file">\
			<div class="upload-btn-style">\
				<a href=\'javascript:$("#'+input_id+'").uploadifive("upload")\'>上传文件</a>';
		if(opts["hasStop"]){
			html += '<a href=\'javascript:$("#'+input_id+'").uploadifive("cancel", $(".uploadifive-queue-item").first().data("file"))\'>停止上传</a>';
		}
		html += "</div>";
    	if(!opts["isPopover"]){
	    	$("#"+divId).addClass("blpc-upload-plugin").append($(html));
    	}else{
    		blpc.alert("",{
    			content:html,
    			width:450,
    			height:160
    		});
    	}
    	var u = opts["onUpload"];
    	if(opts["fileTypeExts"]){
    		//校验文件类型
    		(function(fileTypeExts,uploadFun){
		    	opts["onUpload"] = function(i){
	    			$(".uploadifive-queue-item").each(function(index){
		    			var file = $(this).data("file");
		    			console.log(file);
		    			var fileName = file.name;
		    			if(!suffixParser(fileTypeExts,fileName)){
		    				$("#"+input_id).uploadifive("cancel", $(".uploadifive-queue-item").first().data("file"));
		    				blpc.alert("只允许上传"+fileTypeExts+"等类型的文件");
		    			}
		    		});
	    			
 	    			if(typeof uploadFun === "function"){
	    	    		uploadFun(i);
	    	    	}
  		    	}
		    	delete opts["fileTypeExts"];
    		})(opts["fileTypeExts"],u);
    	}
    	
    	$('#'+input_id).uploadifive(opts);
    },
    /**
     * 关闭指定tab页
     * @param {} tabId
     */
    closeTab: function(tabId){
    	try{
    		window.parent.Addtabs.close("tab_" + tabId);
    	}catch(e){
    		window.parent.parent.Addtabs.close("tab_" + tabId);
    	}
    },
    /**
     * 调用指定页面的指定方法
     * @param id 打开tab页时的data-addtab属性值
     * @param funName 调用方法的名称
     * @param obj 传入的参数对象
     */
    callFunById:function(id,funName,obj){ 
    	/**
    	if(typeof funName ==="string"){
    		var frame = $(top.window.document).find("#"+id);
    		console.log(frame);
    		var fn,str = "fn.call(this,";
    		fn = frame.document[funName];
    		if(arguments.length>2){
		        for(var i = 2;i<arguments.length;i++){
		            str += "'"+arguments[i]+"',";
		        }
		    }
		    str = str.substring(0,str.length-1) + ")";
		    eval(str);
    	}
    	*/
    	var frame_id = "frame_"+id;
    	if(typeof funName ==="string"){
    		var frame = window.parent.document.getElementById(frame_id);
    		if(frame==null) { //两层嵌套
    			frame = window.parent.parent.document.getElementById(frame_id);
    		}
    		if(frame != null){
    			frame.contentWindow[funName](obj);
    		}
    	}
    },
    /**
     * 刷新子页面iframe的Grid(适用与楼盘管理和项目管理这种两层的子页面 )
     */
    refreshIframeGrid: function(tabId,iframeId,funName,obj){ 
    	var frame_id = "frame_"+tabId;
    	try{
	    	if(typeof funName ==="string"){
	    		$($(window.parent.frames["frame_"+tabId]).contents()
	    			.find("#"+iframeId))[0].contentWindow[funName](obj);
	    	}
    	}catch(e){console.error(e)}
    },
    /**
     * 刷新子页面iframe高度(适用与楼盘管理和项目管理这种两层的子页面 )
     */
    refreshChildFrameHeight:function(){
    	var frame_id = self.frameElement.getAttribute("id");
		var main = $(window.parent.document).find("#"+frame_id);
		var thisheight = $(document.body).height()+60;
		main.height(thisheight); 
    },
    /**
     * 表格实现列拖动大小
     * params
     */
   colResizable:function($this, params){
	   //预设值
       var defaultOptions = {
		   disabledColumns:[], // 禁止列拖动，参数数组，如[0,1] 前两列不能拖动
		   resizeMode:'overflow' //拖动模式 [values: 'fit', 'flex', 'overflow']
       };
       var options = $.extend({}, defaultOptions, params);
       //拖动列头大小
	   var oLeft = -1;
	   $this.colResizable({
			liveDrag:false,
			disabledColumns:options.disabledColumns,
			resizeMode:options.resizeMode,
			partialRefresh:true,
			postback:true,
			flush:true,
			onResize:function(e){
				var tableObj = $(e.currentTarget);
				tableObj.find("thead:first th:visible").each(function(i, e){
					   $(e).removeAttr("addwidth");
				   });
				if($("#" + tableObj.attr("id")+"_thead").length > 0){
		        	//多表格等其他初始位置不一样的问题
		        	if(oLeft == -1){
		            	var tmpArr = [];
		            	tableObj.parents().each(function(i, e){
		            		if(jQuery.inArray($(e).position().left, tmpArr) == -1){
		            			tmpArr.push($(e).position().left);
		            			oLeft += $(e).position().left;
		            		}
		            	});
		        	}
					$("#" + tableObj.attr("id")+"_thead").remove();
					var table = $('<table id="'+tableObj.attr("id")+'_thead" class="fixed_thead"></table>');
					table.width(tableObj.find("tbody").width());
					var thead = tableObj.find("thead").clone(true);
					table.append(thead);
					tableObj.parent().prepend(table);
					$("#" + tableObj.attr("id")+"_thead").css("left", (oLeft - $(this).scrollLeft()) + "px");
					//解决拖动之后thead没有边框的问题。modify by chentianjin 2016-09-08
		        	$("#" + tableObj.attr("id")+"_thead th").css("border-left", "1px solid #dadada");
				}
			}
       });
		function getRealWidth() {
			$this.find("thead:first th:visible").each(function(i, e) {
				var obj = $(e);
				obj.attr("addwidth", e.clientWidth);
			});
		}
		/* 其他拖动模式需要
		// 监听窗口变化
		$(window).resize(function() {
			getRealWidth();
		});
		// 自动调整TH宽度
		getRealWidth();
		*/
   },
  //展示大图，mode = 1单击，mode = 2双击
    showPic: function (className,mode) {
    	if(mode == undefined ){
    		mode = 2;
    	}
    	if(mode == 1){//单击
    		$(className).click(function(){
    		    var picUrlArray=[];
    			var firstImg=$(this).attr('src').replace(path,'');
    			picUrlArray.push(firstImg);
    			$(className).each(function(){
    				var tmpImg=$(this).attr('src').replace(path,'');
    				if(tmpImg!=firstImg){
    					picUrlArray.push(tmpImg);
    				}
    				
    			});
    			window.parent.parent.showPic(picUrlArray);
    		});
    	}else if(mode == 2){//双击
    		$(className).dblclick(function(){
    		    var picUrlArray=[];
    			var firstImg=$(this).attr('src').replace(path,'');
    			picUrlArray.push(firstImg);
    			$(className).each(function(){
    				var tmpImg=$(this).attr('src').replace(path,'');
    				if(tmpImg!=firstImg){
    					picUrlArray.push(tmpImg);
    				}
    				
    			});
    			window.parent.parent.showPic(picUrlArray);
    		});
    	}
    }
};

var data_list = [];
var current_page = 1;
/**
 *
 * testData:$(".blpc-table").blpc_table({data:[{'choose':'1',index:'key',city:'重庆',total_name:'保利地产',short_name:'保利',account:'developer',status:'1'},{'choose':'1',index:'key',city:'重庆',total_name:'保利地产',short_name:'保利',account:'developer',status:'1'},{'choose':'1',index:'key',city:'重庆',total_name:'保利地产',short_name:'保利',account:'developer',status:'1'},{'choose':'1',index:'key',city:'重庆',total_name:'保利地产',short_name:'保利',account:'developer',status:'1'},{'choose':'1',index:'key',city:'重庆',total_name:'保利地产',short_name:'保利',account:'developer',status:'1'},{'choose':'1',index:'key',city:'重庆',total_name:'保利地产',short_name:'保利',account:'developer',status:'1'},{'choose':'1',index:'key',city:'重庆',total_name:'保利地产',short_name:'保利',account:'developer',status:'1'},{'choose':'1',index:'key',city:'重庆',total_name:'保利地产',short_name:'保利',account:'developer',status:'1'},{'choose':'1',index:'key',city:'重庆',total_name:'保利地产',short_name:'保利',account:'developer',status:'1'},{'choose':'1',index:'key',city:'重庆',total_name:'保利地产',short_name:'保利',account:'developer',status:'1'},{'choose':'1',index:'key',city:'重庆',total_name:'保利地产',short_name:'保利',account:'developer',status:'1'},{'choose':'1',index:'key',city:'重庆',total_name:'保利地产',short_name:'保利',account:'developer',status:'1'},{'choose':'1',index:'key',city:'重庆',total_name:'保利地产',short_name:'保利',account:'developer',status:'1'}]});
 * 操作列中为标签添加operate属性，值为调用的方法，方法接受参数为本行的json数据
 */
(function ($) {
    /**
     * blpc_table初始化方法
     * @param options
     */
    $.fn.blpc_table = function (options) {
        var $this = $(this);
        //防止浏览器窗口变大变小样式问题
        $this.parent().css("min-width", $this.parent().width());
//        console.log($this.attr("id"));
        options = options || {};
        var data = options["data"] || [];  //数据，json格式
        var page_size = parseInt(options["page_size"]) || 20; //pagesize
        var ischeckbox = options["checkbox"] || false; //是否含有checkbox
        var isradio = options["radio"] || false; //是否含有radio
        var ajax = options["ajax"] || false; //使用启用ajax
        var url = options["url"] || ""; //请求地址
        var param = options["param"] || {}; //请求参数
	    var paramurl = options["paramurl"] || {}; //请求参数
	    var paramurlpath= options["paramurlpath"] || {};
	    var paramurlattach= options["paramurlattach"] || {};
	    var tableId= options["tableId"] || $this.attr("id");
	    var height = options["height"] || 0;
	    var noresize = options["noresize"] || false;
	    var nofixhead = options["nofixhead"] || false;
	    var resizeOptions = options["resizeoptions"] || {};
	    
	    var completeFn=options["complete"]||function(){};//grid构建完成回调函数
	    
        if (ischeckbox == true && isradio == true) {
            throw new Error("不能同时是checkbox和radio");
        }
        var opts = {
            page_size: page_size,
            ischeckbox: ischeckbox,
            isradio: isradio,
            tableId : tableId
        };
        //初始化操作
//        console.log(tableId);
        if(tableId == ""){
        	backInitial();
        }else{
        	backInitial(tableId);
        }
        var colum_settings = [];
        var colum_render = {};
        var colum_data_format = {};
        $this.find("thead th").each(function (index) {
        	//解决刷新表格时空列的问题
        	if($(this).find("input").length<1){
        		var id_ = $(this).attr("col-id");
        		var column = {
        			id: id_,
        			format:$(this).attr("format"),
        			btn_text: $(this).attr("btn_text"),
        			btn_title: $(this).attr("btn_title"),
        			btn_class: $(this).attr("btn_class"),
        			btn_fun: $(this).attr("btn_fun")
        		};
        		colum_settings.push(column);
        		if(typeof $(this).attr("render") != "undefined" && $(this).attr("render") != null) {
        			colum_render[id_] = $(this).attr("render");
        		}
        		if(typeof $(this).attr("dataFormat") != "undefined" && $(this).attr("dataFormat") != null) {
        			colum_data_format[id_] = $(this).attr("dataFormat");
        		}
        	}
        });
        var html = $('<a class="blpc-page-number">\
                        <span >1</span>\
                        </a>');
        $(".blpc-pagination-prev").after(html);
        $(".blpc-pagination .blpc-curr-page").text(current_page);
        //为table表头添加checkbox
        if (ischeckbox && $("#"+tableId).find("input").length<1) {
            var head_checkbox = $('<th width="60px"><input type="checkbox" id="'+tableId+'_head_checkbox" class="blpc-head-checkbox"></th>');
            /*
            head_checkbox.find("input").on("ifChecked", function () {
                $("#"+tableId+" input[type='checkbox']").iCheck("check");
            });
            head_checkbox.find("input").on("ifUnchecked",function(){
                $("#"+tableId+" input[type='checkbox']").iCheck("uncheck");
            });
            */
            $("#"+tableId+" thead tr").prepend(head_checkbox);
        }
        if (isradio && $("#"+tableId).find("input").length<1) {
            var head_radio = $('<th width="60px"><input type="hidden"/></th>');
            $("#"+tableId+" thead tr").prepend(head_radio);
        }
        //设置固定表头
        var oLeft = -1;
        var oLeftW = $this.parent().css("border-left-width") || "0px";
        oLeftW = parseInt(oLeftW);
        $("#"+tableId).parent().scroll(function(e){
        	if(nofixhead){
        		return;
        	}
        	//多表格等其他初始位置不一样的问题
        	if(oLeft == -1){
            	var tmpArr = [];
            	$("#"+tableId).parents().each(function(i, e){
            		if(jQuery.inArray($(e).position().left, tmpArr) == -1){
            			tmpArr.push($(e).position().left);
            			oLeft += $(e).position().left;
            		}
            	});
        	}
            if ($(this).scrollTop() > 0) {
                if ($("#"+tableId+"_thead").length == 0) {
                	/*
                	var tmpWidth = $(this).width()- 18;
                    var thead = $('<table id="'+tableId+'_thead" class="fixed_thead" style="width:'+tmpWidth+'px">' + $("#"+tableId).find("thead").html() + '</table>');
                    if($("#"+tableId).find("thead").html()){
                    	thead.find(".icheckbox-blpc").on("click", function () {
                    		var o = $(this);
                    		if(o.hasClass("checked")){
                    			$("#"+tableId+" thead input[type='checkbox']").iCheck("uncheck");
                    		}else{
                    			$("#"+tableId+" thead input[type='checkbox']").iCheck("check");
                    		}
                    		o.toggleClass("checked");
                        });
                    	$(this).prepend(thead);
                    }
                    */
                    var table = $('<table id="'+tableId+'_thead" class="fixed_thead"></table>');
                    if(oLeftW === 0){
                    	table.width($this.outerWidth() - 2);
                    }else{
                    	table.width($this.outerWidth());
                    }
                    var thead = $("#"+tableId).find("thead").clone(true);
                    thead.find("th").each(function(i, e){
                    	var $e = $(e);
                    	if(typeof($e.attr("addwidth")) != "undefined"){
                    		$e.width($e.attr("addwidth"));
                    	}
                    });
                    table.append(thead);
                    $(this).prepend(table);
                }
            } else {
            	$("#"+tableId+"_thead").remove();
            }
        	$("#"+tableId+"_thead").css("left", (oLeft - $(this).scrollLeft() + 1 + oLeftW) + "px");
        	//解决列表滚动之后thead没有边框的问题。modify by chentianjin 2016-09-08
        	$("#"+tableId+"_thead th").css("border-left", "1px solid #dadada");
        	oLeft = -1;
        });
        if(ajax){
            //如果是使用的ajax，首先初始化表格，然后异步请求数据，请求数据成功之后设置数据
            //为表格添加进度条
            var loading = $('<div class="blpc-loading"></div>');
            $("#"+opts.tableId).parent().append(loading);
            param['pageSize'] = page_size;
            param['pageIndex'] = current_page;
            param['renderColum'] = JSON.stringify(colum_render);
            param['dataFormatColum'] = JSON.stringify(colum_data_format);
            $.ajax({
                url:url,
                type:"POST",
                data:param,
                dataType:"json",//这里测试是使用的jsonp，正式使用时应该是json
                success:function(data){
                    $(".blpc-loading").remove();
                    data_list = data['data'];
                    var pages = Math.ceil(data['total'] / page_size);//计算页数
                    $(".blpc-pagination .blpc-total-page").text(pages == 0 ? 1 : pages);
                    $(".blpc-pagination-totalcount span").text(data['total']);
                    //为上下页添加点击事件
                    $(".blpc-pagination-prev").unbind();
                    $(".blpc-pagination-prev").click(function (e) {
                        if (current_page < 2) {
                            console.log("first page");
                            return;
                        }
                        current_page = current_page - 1;
                        setAjaxData(opts, current_page, colum_settings, $this,param,url,paramurl,paramurlpath,paramurlattach);
                    });
                    $(".blpc-pagination-next").unbind();
                    $(".blpc-pagination-next").click(function (e) {
                        if (current_page > pages - 1) {
                            console.log("last page");
                            return;
                        }
                        current_page = current_page + 1;
                        setAjaxData(opts, current_page, colum_settings, $this,param,url,paramurl,paramurlpath,paramurlattach);
                    });
                    $(".blpc-pagination-first").unbind();
                    $(".blpc-pagination-first").click(function (e) {
                        current_page = 1;
                        setAjaxData(opts, current_page, colum_settings, $this,param,url,paramurl,paramurlpath,paramurlattach);
                    });
                    $(".blpc-pagination-last").unbind();
                    $(".blpc-pagination-last").click(function (e) {
                        current_page = (pages == 0 ? 1 : pages);
                        setAjaxData(opts, current_page, colum_settings, $this,param,url,paramurl,paramurlpath,paramurlattach);
                    });
                    $(".blpc-jump-page input").unbind();
                    $(".blpc-jump-page input").keypress(function (e) {
                        if (e.keyCode == 13) {
                            var val = parseInt($(this).val());
                            /*if (val > pages || val == 0 || pages == 0) {
                                return false;
                            } else {
                                current_page = val;
                                setAjaxData(opts, current_page, colum_settings, $this,param,url);
                            }*/
                            var reg = /^-?\d+$/;
                            if(val <= pages && reg.test(val) && val != 0 && pages != 0){
                            	current_page = val;
                                setAjaxData(opts, current_page, colum_settings, $this,param,url,paramurl,paramurlpath,paramurlattach);
                            }else{
                            	return false;
                            }
                        }
                    });
                    setGridList(data_list, opts, colum_settings, $this,paramurl,paramurlpath,paramurlattach);
                    refreshTableHead(opts.tableId);
                    //执行构建完成grid的回调
                    if(completeFn && typeof completeFn==='function'){
                    	completeFn(data_list, options, data['edata']);
                    }
                    if(!noresize){
                    	blpc.colResizable($this, resizeOptions);
                    }
                },
                error:function(){
                    $(".blpc-loading").remove();
                    $(".blpc-grid-wrap").append($('<div class="blpc-grid-error">数据加载失败，请稍后重试</div>'));
                }
            });
        }else{
            //数据分页显示
            data_list = data;
            var pages = Math.ceil(data_list.length / page_size);//计算页数
            $(".blpc-pagination .blpc-total-page").text(pages == 0 ? 1 : pages);
            $(".blpc-pagination-totalcount span").text(data_list.length);
            //为上下页添加点击事件
            $(".blpc-pagination-prev").click(function (e) {
                if (current_page < 2) {
                    console.log("first page");
                    return;
                }
                current_page = current_page - 1;
                setData(opts, current_page, data_list, colum_settings, $this, pages);
            });
            $(".blpc-pagination-next").click(function (e) {
                if (current_page > pages - 1) {
                    console.log("last page");
                    return;
                }
                current_page = current_page + 1;
                setData(opts, current_page, data_list, colum_settings, $this, pages);
            });
            $(".blpc-pagination-first").click(function (e) {
                current_page = 1;
                setData(opts, current_page, data_list, colum_settings, $this, pages);
            });
            $(".blpc-pagination-last").click(function (e) {
                current_page = (pages == 0 ? 1 : pages);
                setData(opts, current_page, data_list, colum_settings, $this, pages);
            });
            $(".blpc-jump-page input").unbind();
            $(".blpc-jump-page input").keypress(function (e) {
                if (e.keyCode == 13) {
                    var val = parseInt($(this).val());
                    var reg = /^-?\d+$/;
                    if(val <= pages && reg.test(val) && val != 0 && pages != 0){
                    	current_page = val;
                        setData(opts, current_page, data_list, colum_settings, $this, pages);
                    } else {
                        return false;
                    }
                }
            });
            var current_data = getCurrentData(page_size, current_page, data_list);
            setGridList(current_data, opts, colum_settings, $this,paramurl,paramurlpath,paramurlattach);
            refreshTableHead(opts.tableId);
            if(!noresize){
            	blpc.colResizable($this, resizeOptions);
            }
        }
        //$(".blpc-grid-wrap").css("height",600);
        if(height==0){
        	blpc.setTableHeight(opts.tableId);
        }else{
        	$("#"+opts.tableId).parent().css("height",height);
        }
        return $this;
    };

    function setAjaxData(opts, current_page, colum_settings, $this,param,url,paramurl,paramurlpath,paramurlattach){
    	var tableId = opts['tableId'];
    	if(tableId == ""){
    		clearData();
    	}else{
    		clearData(tableId);
    	}
    	$(".blpc-loading").remove();
        var loading = $('<div class="blpc-loading"></div>');
        $(".blpc-grid-wrap").append(loading);
        param['pageSize'] = opts['page_size'];
        param['pageIndex'] = current_page;
        console.log(param);
        $.ajax({
            url: url,
            type: "POST",
            data: param,
            dataType: "json",//这里测试是使用的jsonp，正式使用时应该是json
            success: function (data) {
                $(".blpc-loading").remove();
                var current_data = data['data'];
                if (current_data == null && current_data == "") {
                    clearData();
                    $(".blpc-curr-page").text(0);
                    $(".blpc-page-number").text(0);
                    refreshTableHead(0);
                } else {
                    setGridList(current_data, opts, colum_settings, $this,paramurl,paramurlpath,paramurlattach);
                    $(".blpc-curr-page").text(current_page);
                    $(".blpc-page-number").text(current_page);
                    refreshTableHead(opts.tableId);
//                    blpc.colResizable($("#" + tableId));
                }
            },
            error: function () {
                $(".blpc-loading").remove();
                $(".blpc-grid-wrap").append($('<div class="blpc-grid-error">数据加载失败，请稍后重试</div>'));
            }
        });
    }

    function setData(opts, current_page, data_list, colum_settings, $this) {
        clearData();
        var current_data = getCurrentData(opts["page_size"], current_page, data_list);
        setGridList(current_data, opts, colum_settings, $this);
        $(".blpc-curr-page").text(current_page);
        $(".blpc-page-number").text(current_page);
        refreshTableHead(opts.tableId);
    }

    function refreshTableHead(tableId){
        $('#'+tableId).find("input").iCheck({
        	checkboxClass: 'icheckbox-blpc',
            radioClass: 'iradio-blpc'
        });
        var head_checkbox = $("#"+tableId+" thead input");
        head_checkbox.on("ifChecked", function () {
            $("#"+tableId+" input[type='checkbox']").iCheck("check");
            $(".fixed_thead thead").iCheck("check");
        });
        head_checkbox.on("ifUnchecked",function(){
            $("#"+tableId+" input[type='checkbox']").iCheck("uncheck");
            $(".fixed_thead thead").iCheck("uncheck");
        });
    }

    function clearData() {
        $(".blpc-table tbody").html("");
    }
    
    function clearData(tableId) {
        $("#" + tableId + " tbody").html("");
        //reset resizable
        $(".JCLRgrip").height("0px");
    }

    function getCurrentData(page_size, current_page, data_list) {
        var current_data = [];
        for (var i = (current_page - 1) * page_size; i < (current_page) * page_size; i++) {
            current_data.push(data_list[i]);
        }
        return current_data;
    }

    function setGridList(data, opts, colum_settings, $this,paramurl,paramurlpath,paramurlattach) {
    	var hiddenObj = {};
    	$this.find("thead th").each(function (index) {
    		var tmpKey = $(this).attr("col-id");
    		var tmpValue = $(this).attr("hidden") || "";
			hiddenObj[tmpKey] = tmpValue;
        });
        var page_size = opts["page_size"];
        data = eval(data);
        for (var i = 1; i <= page_size; i++) {
        	if(data == null)break;
            var item = data[i - 1];
            if (item == null)break;
//            if (blpc.equalArray(colum_settings, Object.keys(item))) {
                var html = "<tr>";
                if (opts["ischeckbox"]) {
                    html += '<td><input type="checkbox" id="table_checkbox' + i + '" name="blpc-table-checkbox"></td>';
                }
                if (opts["isradio"]) {
                    html += '<td><input type="radio" id="table_radio' + i + '" name="blpc-table-radio"></td>';
                }
                var titleLength = colum_settings.length;
                for (var j=0; j<titleLength;j++) {
                	var td = item[colum_settings[j]["id"]]==null?"":item[colum_settings[j]["id"]];
                	if(colum_settings[j]["id"] == "index"){
                		td = (page_size * (current_page - 1)) + i;
                	}
                    if (blpc.checkHtml(td)) {
                        var operates = $(td);
                        var tmpTd = "";
                        for (var k = 0; k < operates.length; k++) {
                            var m = $(operates[k]);
                            var funstr = m.attr("operate") + "(" + blpc.jsonToStr(item) + ")";
                            m.attr("onclick", funstr);
                            tmpTd += operates[k].outerHTML;
                        }
                        td = tmpTd;
                    }
                    if(hiddenObj[colum_settings[j]["id"]]){
                       
                    	html += "<td hidden>" + td + "</td>";
                    	
                    }else{
                    	var format = colum_settings[j]["format"];
                    	//添加format回调方法
                    	if(typeof window[format] === "function" ){
//                    		td = this.apply(format,item[colum_settings[j]["id"]]);
                    		td = window[format](item[colum_settings[j]["id"]],item);
                    	}
                    	var btn_title_ = colum_settings[j]["btn_title"];
                		if(paramurl!=null&&paramurl != "undefined"&&paramurl != ""&&colum_settings[j]["id"]==paramurl){
                           html += "<td><a title='楼盘期数信息管理' id='"+paramurl+j+"' class='tableUrl' href=\"javascript:void(0);\" url=\""+paramurlpath+"?"+paramurlattach+"="+item[paramurlattach]+"\">"+ td +"</a></td>";
                           
                        }else if(typeof btn_title_!='undefined'){
                        	var btn_text_ = colum_settings[j]["btn_text"];
                        	if(typeof btn_text_=='undefined'){
                        		btn_text_ = td;
                        	}
                        	var btn_class_ = colum_settings[j]["btn_class"];
                        	if(typeof btn_class_=='undefined'){
                        		btn_class_ = 'blpc_btn_s';
                        	}
                           html += "<td><a title='"+btn_title_+"' class='"+btn_class_+"' href='javascript:void(0);' onclick='"+colum_settings[j]["btn_fun"]+"("+blpc.jsonToStr(item)+")'>"+ btn_text_ +"</a></td>";
                        }else{
	                    	if(!blpc.checkHtml(td)){
	                    		html += "<td title='" + td + "'>" + td + "</td>";
	                    	}else{
	                    		html += "<td>" + td + "</td>";
	                    	}
                    	}
                    }
                }
//                for (var key in item) {
//                    var td = item[key];
//                    if (blpc.checkHtml(td)) {
//                        var operates = $(td);
//                        for (var j = 0; j < operates.length; j++) {
//                            var m = $(operates[j]);
//                            var funstr = m.attr("operate") + "(" + blpc.jsonToStr(item) + ")";
//                            m.attr("onclick", funstr);
//                        }
//                        td = operates[0].outerHTML;
//                    }
//                    html += "<td>" + td + "</td>"
//                }
                html += "</tr>";
                var h = $(html);
                $this.append(h);
				$(".tableUrl").click(function(event){
				    blpc.openParentNewFrame($(this));
				    event.stopPropagation();
				});
//            } else {
//                throw new Error("数据和表头不符");
//            }
        }
        //modify by chentianjin 2016-09-02 修改点击行中的按钮操作和input框会选择复选框或者单选框的问题。
        var trs = $("#"+opts.tableId+" tbody tr");
        trs.children("td").each(function (index) {
        	var td = $(this);
        	//定义boolean，记录不能添加点击时间td
        	var htmlstr = td.html();
        	var noCanAddClick = (htmlstr.indexOf("<input")>=0 /*&& htmlstr.indexOf("checkbox")<0 && htmlstr.indexOf("radio")<0*/) || htmlstr.indexOf("<a")>=0 || htmlstr.indexOf("<select")>=0;
        	if(!noCanAddClick){
        		$(td).click(function(e){
                    $("#"+opts.tableId+" input").iCheck("uncheck");
                    td.parent().find("input").iCheck("toggle");
                    var tableId = opts["tableId"];
                    if(tableId == "table_role"){
                		var selectItem = {};
                		td.parent().find("td").each(function(index, element){
                			var tmpTh = $(this).parent().parent().parent().find("th:eq(" + index + ")");
                			var tmpColId = tmpTh.attr("col-id");
                			if(tmpColId != null){
                				selectItem[tmpColId] = element.innerText;
                			}
                			selRole = selectItem.role_id;
                		});
                		//loadUser();
                		if($("#user").length > 0){
        	        		$("#user").blpc_table({
        	        			checkbox:true,
        	        			page_size:999,
        	        			url: path + "/system/userMgr/getUserGrid",
        	        			param:{role_id:selRole, type:"relrole"},
        	        			ajax:true,
        	        			tableId:"user",
        	        			noresize:true,
        	        			complete:function(){$("#user").parent().scrollTop(1);$("#user").parent().animate({scrollTop: '0px'}, 1);}
        	        		});
                		}
                	}
        		});
        	}
        });
        /*
        $("#"+opts.tableId+" tbody tr").click(function(e){
            var o = $(this);
            $("#"+opts.tableId+" input").iCheck("uncheck");
            o.find("input").iCheck("toggle");
            var tableId = opts["tableId"];
        	if(tableId == "table_role"){
        		var selectItem = {};
        		$(this).find("td").each(function(index, element){
        			var tmpTh = $(this).parent().parent().parent().find("th:eq(" + index + ")");
        			var tmpColId = tmpTh.attr("col-id");
        			if(tmpColId != null){
        				selectItem[tmpColId] = element.innerText;
        			}
        			selRole = selectItem.role_id;
        		});
        		//loadUser();
        		if($("#user").length > 0){
	        		$("#user").blpc_table({
	        			checkbox:true,
	        			page_size:999,
	        			url: path + "/system/userMgr/getUserGrid",
	        			param:{role_id:selRole, type:"relrole"},
	        			ajax:true,
	        			tableId:"user",
	        			noresize:true,
	        			complete:function(){$("#user").parent().scrollTop(1);$("#user").parent().animate({scrollTop: '0px'}, 1);}
	        		});
        		}
        	}
        });*/
    }

    function backInitial() {
        current_page = 1;
        clearData();
        $(".blpc-pagination-prev").unbind("click");
        $(".blpc-pagination-next").unbind("click");
        $(".blpc-page-number").remove();
        $(".blpc-pagination-curr span").text("");
        $(".blpc-grid-error").remove();
        $(".blpc-loading").remove();
    }
    
    function backInitial(tableId) {
        current_page = 1;
        clearData(tableId);
//        $("#"+tableId+"_thead").remove();
        document.getElementById(tableId).scrollTop = 0;
        $(".blpc-pagination-prev").unbind("click");
        $(".blpc-pagination-next").unbind("click");
        $(".blpc-page-number").remove();
        $(".blpc-pagination-curr span").text("");
        $(".blpc-grid-error").remove();
        $(".blpc-loading").remove();
    }    

    function getFixNumbers(pages, fixNo) {
        var result = {
            frontNo: [],
            backNo: []
        };
        for (var i = 1; i <= pages; i++) {
            if (i <= fixNo) {
                result.frontNo.push(i);
            } else if (pages - 1 <= fixNo) {
                result.backNo.push(i);
            }
        }
        return result;
    }
    /**
     * tip组件
     * defaultOptions :{
     *       content : '',//内容
     *       direction : 'bottom',//弹出方向，相对于选中元素
     *       html : false,//是否允许内容为html元素
     *       template : '<div class="blpc-tip"></div>'//弹出框模版
     *   }
     */
    var Tip = function (element, options) {
        this.init(element, options);
    };
    Tip.prototype = {
        constructor: Tip,
        init: function (element, options) {
            this.element = $(element);
            this.options = $.extend({}, this.defaultOptions, options);
            this.tip = this.getTip();
            var container = this.tip;
            //设置内容
            if (this.options.html) {
                container.html(this.options.content);
            } else {
                container.text(this.options.content);
            }
            $("body").append(this.tip);
            this.tip.css({display: "none"});
        },
        show: function () {
//            if (!this.tip) {
                this.tip = this.getTip();
//                var container = this.tip;
//                //设置内容
//                if (this.options.html) {
//                    container.html(this.options.content);
//                } else {
//                    container.text(this.options.content);
//                }
                //添加tip到body
//                $("body").append(this.tip);
                this.tip.css({display: "block"});
                //计算tip的位置
                var eLeft = this.element.offset().left;
                var eTop = this.element.offset().top;
                var eWidth = this.element.innerWidth();
                var eHeight = this.element.innerHeight();
                var tipw = this.tip.outerWidth();
                var tiph = this.tip.outerHeight();
                var top;
                var left;
                //console.log(eLeft + ":" + eTop + ":" + eWidth + ":" + eHeight + ":" + tipw + ":" + tiph);
                switch (this.options.direction) {
                    case 'top' :
                        top = eTop - tiph - 10;
                        left = (eLeft - tipw / 2) + eWidth / 2;
                        this.tip.css({top: top, left: left});
                        this.tip.addClass("blpc-tip-top");
                        break;
                    case 'left' :
                        top = (eTop - tiph / 2) + eHeight / 2;
                        left = eLeft - tipw - 15;
                        this.tip.css({top: top, left: left});
                        this.tip.addClass("blpc-tip-left");
                        break;
                    case 'bottom' :
                        top = eTop + eHeight + 10;
                        left = (eLeft - tipw / 2) + eWidth / 2;
                        this.tip.css({top: top, left: left});
                        this.tip.addClass("blpc-tip-bottom");
                        break;
                    case 'right' :
                        top = (eTop - tiph / 2) + eHeight / 2;
                        left = eLeft + eWidth + 15;
                        this.tip.css({top: top, left: left});
                        this.tip.addClass("blpc-tip-right");
                        break;
                    default:
                        break;
                }
//            } else {
//                this.tip.css({display: 'block'});
//            }
        },
        hide: function () {
            this.getTip().css({display: "none"});
//        	this.getTip().remove();
        },
        content: function (text) {
            this.getTip().text(text);
//        	this.options.content = text;
        },
        html: function (html) {
            this.getTip().html(html);
//        	this.options.html = true;
//        	this.options.content = html;
        },
        getTip: function () {
            return this.tip ? this.tip : $(this.options.template);
        },
        get:function(){
        	return this.data("tip");
        },
        defaultOptions: {
            content: '',
            direction: 'right',
            html: false,
            template: '<div class="blpc-tip"></div>'
        }
    };
    $.fn.Tip = function (option,param) {
        return this.each(function () {
            var e = $(this);
            var data = e.data('tip');
            var options = typeof option == "object" && option;
            if (!data) {
                e.data("tip", new Tip(this, options));
            }
            if (typeof option == 'string') {
                data[option](param);
            };
        });
    }
})(jQuery);

/**
 * 遮罩层
 * options:
 * 		msg:显示内容，默认为"请稍等..."
 * 		duration:持续时间,默认为不消失
 */
(function($){
	
	var MASK_CLASS = "blpc-mask";
	var CONTENT_CLASS = "blpc-mask-content";
	var CONTENT_CENTER_CLASS = "blpc-mask-content-center";
	var SPINNER_CLASS = "blpc-spinner";
	var MESSAGE_CLASS = "blpc-mask-message";
	
	$.showMask = function(options){
		var opts = $.extend({},{msg:"请稍等...",duration:0},options);
		$("."+MASK_CLASS).remove();
		var mask = $('<div class="blpc-mask">\
						    <div class="blpc-mask-content">\
						    	<div class="blpc-mask-content-center">\
							        <span class="blpc-spinner"></span>\
							        <span class="blpc-mask-message">请稍等...</span>\
						        </div>\
						    </div>\
						</div>');
		var topHeight = $(top.window.document).height()/2 - 80 - 43;
		var totalHeight = $(document.body).height();
		mask.css({
			"height":totalHeight
		});
		mask.find("."+CONTENT_CLASS).css({
			"top":topHeight
		});
		mask.find("."+MESSAGE_CLASS).text(opts["msg"]);
		$("body").append(mask);
		if(opts["duration"] != null && typeof opts["duration"] === "number" && opts["duration"] != 0){
			setTimeout("$.hideMask()",opts["duration"]);
		}
	}
	
	$.hideMask = function(){
		$("."+MASK_CLASS).remove();
	}
	
})(jQuery);

/**
 * 省市区板块四级联动菜单(单选框形式)
 * 可自由扩展其他的选择内容
 */
(function($){
    var html = '<div class="poly-prov-tip"><span class="poly-prov-title"></span></div><span class="poly-prov-span">\
                <span class="poly-prov-default"></span>\
                <span class="poly-prov-title">\
                </span>\
                <div class="poly-prov-arrorw"></div>\
                <div class="poly-prov-reset"></div>\
                </span><div class="poly-prov-dropdown">\
                <div class="poly-prov-select-wrap">\
                <div class="poly-prov-tab">\
                </div>\
                <div class="poly-prov-content">\
                </div>\
                </div>\
                </div>';
    var loading = '<div class="poly-prov-loading"></div>';

    function _resetPicker(that,customer){
        var entity = that.data("poly_prov_entity");
        entity.find(".poly-prov-default").css("display","block");
        entity.find(".poly-prov-title .poly-prov-item").text("");
        entity.find(".poly-prov-content ul li").removeClass("poly-active");
        entity.find(".poly-prov-content ul").not(":eq(0)").empty();
        var tabList = customer["tabList"];
        for(var i=0;i<tabList.length;i++){
            var item = tabList[i];
            $("#"+item["dataId"]).val("");
            $("#"+item["dataName"]).val("");
        }
        that.val("");
    }

    /**
     * 自定义选择器的创建方法
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
    function _createPicker(that,customer){
        var entity = $(html);
        var prov_tip = entity.first();
        var prov_span = entity.eq(1);
        var prov_drop = entity.last();
        var click_callback = customer["clickCallback"];
        entity.find(".poly-prov-default").text(customer["defaultTitle"]);
        that.css("display","none");

        prov_span.click(function(e){
            e.stopPropagation();
            prov_drop.toggleClass("poly-open");
            $(this).toggleClass("poly-open");
            entity.find(".poly-prov-tab a").eq(0).trigger("click");
        });

        $(document).click(function(e){
            prov_span.removeClass("poly-open");
            prov_drop.removeClass("poly-open");
            prov_tip.css("display","none");
        });

        prov_span.hover(function(e){
            //var span_height = prov_span.outerHeight();
            //var title_width = $(this).find(".poly-prov-title").outerHeight();
            //if(title_width > span_height){
            //    prov_tip.css("display","block");
            //}
            var title = "";
            prov_span.find(".poly-prov-item").each(function(index){
                title += $(this).text();
            });
            prov_span.attr("title",title);
        },function(){
            prov_tip.css("display","none");
        });

        //鼠标移入tip时也显示
        //prov_tip.hover(function(){
        //    prov_tip.css("display","block");
        //},function(){
        //    prov_tip.css("display","none");
        //});

        prov_span.find(".poly-prov-reset").click(function(e){
            e.stopPropagation();
            prov_tip.css("display","none");
            prov_drop.removeClass("poly-open");
            that.provincePickerReset();
        });

        entity.find(".poly-prov-title").on("click",".poly-prov-item",function(e){
            e.stopPropagation();
            prov_span.addClass("poly-open");
            prov_drop.addClass("poly-open");
            entity.find(".poly-prov-tab a").eq($(this).index()).trigger("click");
        });

        entity.find(".poly-prov-tab").on("click","a",function(e){
            e.stopPropagation();
            var _this = $(this);
            _this.siblings().removeClass("poly-active");
            _this.addClass("poly-active");
            entity.find(".poly-prov-content > div").removeClass("poly-active");
            entity.find(".poly-prov-content > div").eq(_this.index()).addClass("poly-active");

        });

        entity.find(".poly-prov-content").on("click","li",function(e){
            e.stopPropagation();
            var _this = $(this);
            _this.siblings().removeClass("poly-active");
            _this.addClass("poly-active");
        });

        for(var i=0;i<customer["tabList"].length;i++){
            prov_span.find(".poly-prov-title").append('<span class="poly-prov-item"></span>');
            prov_tip.find(".poly-prov-title").append('<span class="poly-prov-item"></span>');
        }

        for(var i=0;i<customer["tabList"].length;i++){
            var row = customer["tabList"][i];
            var nextRow = customer["tabList"][i+1];
            (function(row,nextRow,that,entity,i,prov_span,prov_tip,prov_drop,click_callback){
                entity.find(".poly-prov-content").append('<div class="poly-prov-'+row["tabId"]+' poly-active"><ul class="poly-prov-ul"></ul></div>');
                entity.find(".poly-prov-tab").append('<a>'+row["tabTitle"]+'</a>');
                if( row["defaultVal"] != null){
                    entity.find(".poly-prov-default").css("display","none");
                    that.after('<input type="text" id="'+row["dataId"]+'" style="display: none;" value="'+(row["defaultVal"][row["dataId"]] || "")+'"><input type="text" id="'+row["dataName"]+'" style="display: none;" value="'+(row["defaultVal"][row["dataName"]] || "")+'">');
                    if(i==customer["tabList"].length-1){
                        prov_span.find(".poly-prov-item").eq(i).text("/ "+(row["defaultVal"][row["dataName"]] || ""));
                        prov_tip.find(".poly-prov-item").eq(i).text("/ "+(row["defaultVal"][row["dataName"]] || ""));
                    }else{
                        if(i==0){
                            prov_span.find(".poly-prov-item").eq(i).text((row["defaultVal"][row["dataName"]] || "")+" ");
                            prov_tip.find(".poly-prov-item").eq(i).text((row["defaultVal"][row["dataName"]] || "")+" ");
                        }else{
                            prov_span.find(".poly-prov-item").eq(i).text("/ "+(row["defaultVal"][row["dataName"]] || "")+" ");
                            prov_tip.find(".poly-prov-item").eq(i).text("/ "+(row["defaultVal"][row["dataName"]] || "")+" ");
                        }
                    }
                }else{
                    that.after('<input type="text" id="'+row["dataId"]+'" style="display: none;"><input type="text" id="'+row["dataName"]+'" style="display: none;">');
                }
                if(i==0){
                    entity.find(".poly-prov-"+row["tabId"]).prepend(loading);
                    $.ajax({
                        url:row["dataUrl"],
                        data:{},
                        dataType:"json",
                        success:function(list){
                            entity.find(".poly-prov-"+row["tabId"]+" .poly-prov-loading").remove();
                            for(var j=0;j<list.length;j++){
                                var li = list[j];
                                var item = $('<li id="'+li[row["dataId"]]+'">'+li[row["dataName"]]+'</li>');
                                entity.find(".poly-prov-"+row["tabId"]+" ul").append(item);
                            }
                        },
                        error:function(){
                            throw new Error("数据加载失败");
                        }
                    });
                }
                if(i==customer["tabList"].length-1 && customer["tabList"].length > 1){
                    entity.find(".poly-prov-"+row["tabId"]).on("click","li",function(e){
                        var _this = $(this);
                        $("#"+row["dataId"]).val(_this.attr("id"));
                        that.val(_this.attr("id"));
                        $("#"+row["dataName"]).val(_this.text());
                        prov_span.find(".poly-prov-item").eq(i).text("/ "+_this.text());
                        prov_tip.find(".poly-prov-item").eq(i).text("/ "+_this.text());
                        entity.find(".poly-prov-default").css("display","none");
                        prov_drop.toggleClass("poly-open");
                        prov_span.toggleClass("poly-open");
                        if(typeof click_callback === "function"){
                        	click_callback.apply(this,[_this.attr("id"),_this.text(),row["dataId"],row["dataName"]]);
                        }
                    });
                }else{
                    entity.find(".poly-prov-"+row["tabId"]).on("click","li",function(e){
                        var _this = $(this);
                        $("#"+row["dataId"]).val(_this.attr("id"));
                        that.val("");
                        $("#"+row["dataName"]).val(_this.text());
                        entity.find(".poly-prov-tab a").eq(i+1).trigger("click");
                        if(i==0){
                            prov_span.find(".poly-prov-item").eq(i).text(_this.text()+" ");
                            prov_tip.find(".poly-prov-item").eq(i).text(_this.text()+" ");
                        }else{
                            prov_span.find(".poly-prov-item").eq(i).text("/ "+_this.text()+" ");
                            prov_tip.find(".poly-prov-item").eq(i).text("/ "+_this.text()+" ");
                        }
                        entity.find(".poly-prov-default").css("display","none");
                        prov_span.find(".poly-prov-item").eq(i).nextAll().text("");
                        prov_tip.find(".poly-prov-item").eq(i).nextAll().text("");
                        var data ={};
                        if(nextRow != null){
	                        data[nextRow["pId"]||row["dataId"]] = _this.attr("id");
	                        entity.find(".poly-prov-"+nextRow["tabId"]).prepend(loading);
	                        entity.find(".poly-prov-"+row["tabId"]).nextAll().find("ul").empty();
	                        $.ajax({
	                            url:nextRow["dataUrl"],
	                            data:data,
	                            dataType:"json",
	                            success:function(list){
	                                entity.find(".poly-prov-"+nextRow["tabId"]+" .poly-prov-loading").remove();
	                                for(var j=0;j<list.length;j++){
	                                    var li = list[j];
	                                    var item = $('<li id="'+li[nextRow["dataId"]]+'">'+li[nextRow["dataName"]]+'</li>');
	                                    entity.find(".poly-prov-"+nextRow["tabId"]+" ul").append(item);
	                                }
	                            },
	                            error:function(){
	                                throw new Error("数据加载失败");
	                            }
	                        });
                        }else{
                        	prov_drop.toggleClass("poly-open");
                            prov_span.toggleClass("poly-open");
                        }
                        if(typeof click_callback === "function"){
                        	click_callback.apply(this,[_this.attr("id"),_this.text(),row["dataId"],row["dataName"]]);
                        }
                    });
                }
            })(row,nextRow,that,entity,i,prov_span,prov_tip,prov_drop,click_callback);
        }
        that.after(entity);
        that.data("poly_prov_entity",entity);
        prov_span.css({
            "width":customer["spanWidth"]+"px"
        });
        prov_drop.css({
            "top":prov_span.offset().top+prov_span.outerHeight(),
            "left":prov_span.offset().left,
            "width":customer["dropWidth"]+"px"
        });
        prov_tip.css({
            "top":prov_span.offset().top-prov_tip.outerHeight()-5,
            "left":prov_span.offset().left
        });
    }

    /**
     * show_city 是否显示城市，默认显示
     * show_county 是否显示县级，默认不显示
     * show_plate 是否显示板块，默认不显示
     * province_conf省级配置
     * city_conf市级配置
     * county_conf县级配置
     * plate_conf板块配置
     * @type {}
     * @private
     */
    var _defaultArgs = {
        customer:{
            spanWidth:300,
            dropWidth:350,
            clickCallback:function(){},
        },
        show_city:true,
        show_county:false,
        show_plate:false,
        show_own_province:false,
        show_own_city:false,
        province_conf:{
            tabTitle:"省份",
            tabId:"province",
            dataUrl:blpc.serverPath + "combo/areacascade/province",
            dataId:"provinceId",
            dataName:"provinceName"
        },
        city_conf:{
            tabTitle:"城市",
            tabId:"city",
            dataUrl:blpc.serverPath + "combo/areacascade/city",
            pId:"pValue",
            dataId:"cityId",
            dataName:"cityName"
        },
        county_conf:{
            tabTitle:"区县",
            tabId:"district",
            dataUrl:blpc.serverPath + "combo/areacascade/district",
            pId:"pValue",
            dataId:"districtId",
            dataName:"districtName"
        },
        plate_conf:{
            tabTitle:"板块",
            tabId:"plate",
            dataUrl:blpc.serverPath + "combo/areacascade/plate",
            pId:"pValue",
            dataId:"plateId",
            dataName:"plateName"
        },
        own_province_conf:{
        	tabTitle:"省份",
            tabId:"province",
            dataUrl:blpc.serverPath + "combo/areacascade/operateownprovince",
            dataId:"provinceId",
            dataName:"provinceName"
        },
        own_city_conf:{
        	tabTitle:"城市",
            tabId:"city",
            dataUrl:blpc.serverPath + "combo/areacascade/operateowncity",
            pId:"pValue",
            dataId:"cityId",
            dataName:"cityName"
        }
    };

    /**
     * 初始化方法
     */
    $.fn.provincePicker = function(options){
        var that = this;
        var opts = $.extend(true,{},_defaultArgs,options);//深拷贝
        $.fn.provincePicker.globalOpt = opts;
        if(opts["customer"]["tabList"] == null){
        	var defaultTitle,tabList;
        	if(opts["show_own_city"]===true || opts["show_own_province"]===true){
        		if(opts["show_own_city"]){
        			defaultTitle = "请选择省";
        			tabList = [opts["own_province_conf"]];
        			
        			defaultTitle += "/市";
        			tabList.push(opts["own_city_conf"]);
        		}else{
        			defaultTitle = "请选择省份";
        			tabList = [opts["own_province_conf"]];
        		}
        	}else{
	            if(opts["show_plate"]===true)opts["show_county"] = true;
	            if(opts["show_county"] === true)opts["show_city"] = true;
	
	            defaultTitle = "请选择省";
	            tabList = [opts["province_conf"]];
	            if(opts["show_city"]===true){
	                defaultTitle += "/市";
	                tabList.push(opts["city_conf"]);
	                if(opts["show_county"]===true){
	                    defaultTitle += "/区县";
	                    tabList.push(opts["county_conf"]);
	                    if(opts["show_plate"]===true){
	                        defaultTitle += "/板块";
	                        tabList.push(opts["plate_conf"]);
	                    }
	                }
	            }
        	}
            opts["customer"]["defaultTitle"] = defaultTitle;
            opts["customer"]["tabList"] = tabList;
            $.fn.provincePicker.globalOpt["customer"] = opts["customer"];
            _createPicker(that,opts["customer"]);
        }else{
            _createPicker(that,opts["customer"]);
        }
        return that;
    };

    /**
     * 重置方法
     */
    $.fn.provincePickerReset = function(){
        var opts = $.fn.provincePicker.globalOpt;
        _resetPicker(this,opts["customer"]);
        return this;
    }
})(jQuery);



/**
 * ajax
 */
(function($){

    var pendingRequests = {};
    /**
     * 注册ajaxPrefilter防止ajax重复提交
     * 目前做的的是在单个页面上防止相同url地址的重复提交
     */
    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
    	if(options.url.indexOf("/common/") < 0){
	        var key = options.url+options.data;
	//        console.log(options);
	        if (!pendingRequests[key]) {
	//        	console.log("in");
	            pendingRequests[key] = jqXHR;
	        }else{
	//        	console.log("abort");
	            jqXHR.abort(); //放弃后触发的提交(不进入服务端)
	            //pendingRequests[key].abort(); // 放弃先触发的提交
	        }
	
	        var complete = options.complete;
	        options.complete = function(jqXHR, textStatus) {
	            pendingRequests[key] = null;
	            if ($.isFunction(complete)) {
	                complete.apply(this, arguments);
	            }
	        };
    	}
    });

})(jQuery);

(function($){
	/**
	* ajax完成后判断登录权限
	*/
	$(document).ajaxComplete(function(event, request, settings){
          var rt = request.responseText;
          if(rt && rt.indexOf("!need login!") > -1){
        	  $(event.currentTarget).find("body").append(rt);
          }
	 });
	
})(jQuery);


/*!
 * 集成iCheck组件，提供强大的checkbox和radio样式替换
 * iCheck v1.0.2, http://git.io/arlzeA
 * ===================================
 * Powerful jQuery and Zepto plugin for checkboxes and radio buttons customization
 *
 * (c) 2013 Damir Sultanov, http://fronteed.com
 * MIT Licensed
 */

(function ($) {

    // Cached vars
    var _iCheck = 'iCheck',
        _iCheckHelper = _iCheck + '-helper',
        _checkbox = 'checkbox',
        _radio = 'radio',
        _checked = 'checked',
        _unchecked = 'un' + _checked,
        _disabled = 'disabled',
        _determinate = 'determinate',
        _indeterminate = 'in' + _determinate,
        _update = 'update',
        _type = 'type',
        _click = 'click',
        _touch = 'touchbegin.i touchend.i',
        _add = 'addClass',
        _remove = 'removeClass',
        _callback = 'trigger',
        _label = 'label',
        _cursor = 'cursor',
        _mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);

    // Plugin init
    $.fn[_iCheck] = function (options, fire) {

        // Walker
        var handle = 'input[type="' + _checkbox + '"], input[type="' + _radio + '"]',
            stack = $(),
            walker = function (object) {
                object.each(function () {
                    var self = $(this);

                    if (self.is(handle)) {
                        stack = stack.add(self);
                    } else {
                        stack = stack.add(self.find(handle));
                    }
                });
            };

        // Check if we should operate with some method
        if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(options)) {

            // Normalize method's name
            options = options.toLowerCase();

            // Find checkboxes and radio buttons
            walker(this);

            return stack.each(function () {
                var self = $(this);

                if (options == 'destroy') {
                    tidy(self, 'ifDestroyed');
                } else {
                    operate(self, true, options);
                }

                // Fire method's callback
                if ($.isFunction(fire)) {
                    fire();
                }
            });

            // Customization
        } else if (typeof options == 'object' || !options) {

            // Check if any options were passed
            var settings = $.extend({
                    checkedClass: _checked,
                    disabledClass: _disabled,
                    indeterminateClass: _indeterminate,
                    labelHover: true
                }, options),

                selector = settings.handle,
                hoverClass = settings.hoverClass || 'hover',
                focusClass = settings.focusClass || 'focus',
                activeClass = settings.activeClass || 'active',
                labelHover = !!settings.labelHover,
                labelHoverClass = settings.labelHoverClass || 'hover',

            // Setup clickable area
                area = ('' + settings.increaseArea).replace('%', '') | 0;

            // Selector limit
            if (selector == _checkbox || selector == _radio) {
                handle = 'input[type="' + selector + '"]';
            }

            // Clickable area limit
            if (area < -50) {
                area = -50;
            }
            
            if(area == null){
            	area = 0;
            }

            // Walk around the selector
            walker(this);

            return stack.each(function () {
                var self = $(this);

                // If already customized
                tidy(self);

                var node = this,
                    id = node.id,

                // Layer styles
                    offset = -area + '%',
                    //初始化一次 有个隐藏BUG
                    //size = '100%',
                    size = 100 + (area * 2) + '%',
                    layer = {
                        position: 'absolute',
                        top: offset,
                        left: offset,
                        display: 'block',
                        width: size,
                        height: size,
                        margin: 0,
                        padding: 0,
                        background: '#fff',
                        border: 0,
                        opacity: 0
                    },

                // Choose how to hide input
                    hide = _mobile ? {
                        position: 'absolute',
                        visibility: 'hidden'
                    } : area ? layer : {
                        position: 'absolute',
                        opacity: 0
                    },

                // Get proper class
                    className = node[_type] == _checkbox ? settings.checkboxClass || 'i' + _checkbox : settings.radioClass || 'i' + _radio,

                // Find assigned labels
                    label = $(_label + '[for="' + id + '"]').add(self.closest(_label)),

                // Check ARIA option
                    aria = !!settings.aria,

                // Set ARIA placeholder
                    ariaID = _iCheck + '-' + Math.random().toString(36).substr(2, 6),

                // Parent & helper
                    parent = '<div class="' + className + '" ' + (aria ? 'role="' + node[_type] + '" ' : ''),
                    helper;

                // Set ARIA "labelledby"
                if (aria) {
                    label.each(function () {
                        parent += 'aria-labelledby="';

                        if (this.id) {
                            parent += this.id;
                        } else {
                            this.id = ariaID;
                            parent += ariaID;
                        }

                        parent += '"';
                    });
                }

                // Wrap input
                parent = self.wrap(parent + '/>')[_callback]('ifCreated').parent().append(settings.insert);

                // Layer addition
                helper = $('<ins class="' + _iCheckHelper + '"/>').css(layer).appendTo(parent);

                // Finalize customization
                self.data(_iCheck, {o: settings, s: self.attr('style')}).css(hide);
                !!settings.inheritClass && parent[_add](node.className || '');
                !!settings.inheritID && id && parent.attr('id', _iCheck + '-' + id);
                parent.css('position') == 'static' && parent.css('position', 'relative');
                operate(self, true, _update);

                // Label events
                if (label.length) {
                    label.on(_click + '.i mouseover.i mouseout.i ' + _touch, function (event) {
                        var type = event[_type],
                            item = $(this);

                        // Do nothing if input is disabled
                        if (!node[_disabled]) {

                            // Click
                            if (type == _click) {
                                if ($(event.target).is('a')) {
                                    return;
                                }
                                operate(self, false, true);

                                // Hover state
                            } else if (labelHover) {

                                // mouseout|touchend
                                if (/ut|nd/.test(type)) {
                                    parent[_remove](hoverClass);
                                    item[_remove](labelHoverClass);
                                } else {
                                    parent[_add](hoverClass);
                                    item[_add](labelHoverClass);
                                }
                            }

                            if (_mobile) {
                                event.stopPropagation();
                            } else {
                                return false;
                            }
                        }
                    });
                }

                // Input events
                self.on(_click + '.i focus.i blur.i keyup.i keydown.i keypress.i', function (event) {
                    var type = event[_type],
                        key = event.keyCode;

                    // Click
                    if (type == _click) {
                        return false;

                        // Keydown
                    } else if (type == 'keydown' && key == 32) {
                        if (!(node[_type] == _radio && node[_checked])) {
                            if (node[_checked]) {
                                off(self, _checked);
                            } else {
                                on(self, _checked);
                            }
                        }

                        return false;

                        // Keyup
                    } else if (type == 'keyup' && node[_type] == _radio) {
                        !node[_checked] && on(self, _checked);

                        // Focus/blur
                    } else if (/us|ur/.test(type)) {
                        parent[type == 'blur' ? _remove : _add](focusClass);
                    }
                });

                // Helper events
                helper.on(_click + ' mousedown mouseup mouseover mouseout ' + _touch, function (event) {
                    var type = event[_type],

                    // mousedown|mouseup
                        toggle = /wn|up/.test(type) ? activeClass : hoverClass;

                    // Do nothing if input is disabled
                    if (!node[_disabled]) {

                        // Click
                        if (type == _click) {
                            operate(self, false, true);

                            // Active and hover states
                        } else {

                            // State is on
                            if (/wn|er|in/.test(type)) {

                                // mousedown|mouseover|touchbegin
                                parent[_add](toggle);

                                // State is off
                            } else {
                                parent[_remove](toggle + ' ' + activeClass);
                            }

                            // Label hover
                            if (label.length && labelHover && toggle == hoverClass) {

                                // mouseout|touchend
                                label[/ut|nd/.test(type) ? _remove : _add](labelHoverClass);
                            }
                        }

                        if (_mobile) {
                            event.stopPropagation();
                        } else {
                            return false;
                        }
                    }
                });
            });
        } else {
            return this;
        }
    };

    // Do something with inputs
    function operate(input, direct, method) {
        var node = input[0],
            state = /er/.test(method) ? _indeterminate : /bl/.test(method) ? _disabled : _checked,
            active = method == _update ? {
                checked: node[_checked],
                disabled: node[_disabled],
                indeterminate: input.attr(_indeterminate) == 'true' || input.attr(_determinate) == 'false'
            } : node[state];

        // Check, disable or indeterminate
        if (/^(ch|di|in)/.test(method) && !active) {
            on(input, state);

            // Uncheck, enable or determinate
        } else if (/^(un|en|de)/.test(method) && active) {
            off(input, state);

            // Update
        } else if (method == _update) {

            // Handle states
            for (var each in active) {
                if (active[each]) {
                    on(input, each, true);
                } else {
                    off(input, each, true);
                }
            }

        } else if (!direct || method == 'toggle') {

            // Helper or label was clicked
            if (!direct) {
                input[_callback]('ifClicked');
            }

            // Toggle checked state
            if (active) {
                if (node[_type] !== _radio) {
                    off(input, state);
                }
            } else {
                on(input, state);
            }
        }
    }

    // Add checked, disabled or indeterminate state
    function on(input, state, keep) {
        var node = input[0],
            parent = input.parent(),
            checked = state == _checked,
            indeterminate = state == _indeterminate,
            disabled = state == _disabled,
            callback = indeterminate ? _determinate : checked ? _unchecked : 'enabled',
            regular = option(input, callback + capitalize(node[_type])),
            specific = option(input, state + capitalize(node[_type]));

        // Prevent unnecessary actions
        if (node[state] !== true) {

            // Toggle assigned radio buttons
            if (!keep && state == _checked && node[_type] == _radio && node.name) {
                var form = input.closest('form'),
                    inputs = 'input[name="' + node.name + '"]';

                inputs = form.length ? form.find(inputs) : $(inputs);

                inputs.each(function () {
                    if (this !== node && $(this).data(_iCheck)) {
                        off($(this), state);
                    }
                });
            }

            // Indeterminate state
            if (indeterminate) {

                // Add indeterminate state
                node[state] = true;

                // Remove checked state
                if (node[_checked]) {
                    off(input, _checked, 'force');
                }

                // Checked or disabled state
            } else {

                // Add checked or disabled state
                if (!keep) {
                    node[state] = true;
                }

                // Remove indeterminate state
                if (checked && node[_indeterminate]) {
                    off(input, _indeterminate, false);
                }
            }

            // Trigger callbacks
            callbacks(input, checked, state, keep);
        }

        // Add proper cursor
        if (node[_disabled] && !!option(input, _cursor, true)) {
            parent.find('.' + _iCheckHelper).css(_cursor, 'default');
        }

        // Add state class
        parent[_add](specific || option(input, state) || '');

        // Set ARIA attribute
        if (!!parent.attr('role') && !indeterminate) {
            parent.attr('aria-' + (disabled ? _disabled : _checked), 'true');
        }

        // Remove regular state class
        parent[_remove](regular || option(input, callback) || '');
    }

    // Remove checked, disabled or indeterminate state
    function off(input, state, keep) {
        var node = input[0],
            parent = input.parent(),
            checked = state == _checked,
            indeterminate = state == _indeterminate,
            disabled = state == _disabled,
            callback = indeterminate ? _determinate : checked ? _unchecked : 'enabled',
            regular = option(input, callback + capitalize(node[_type])),
            specific = option(input, state + capitalize(node[_type]));

        // Prevent unnecessary actions
        if (node[state] !== false) {

            // Toggle state
            if (indeterminate || !keep || keep == 'force') {
                node[state] = false;
            }

            // Trigger callbacks
            callbacks(input, checked, callback, keep);
        }

        // Add proper cursor
        if (!node[_disabled] && !!option(input, _cursor, true)) {
            parent.find('.' + _iCheckHelper).css(_cursor, 'pointer');
        }

        // Remove state class
        parent[_remove](specific || option(input, state) || '');

        // Set ARIA attribute
        if (!!parent.attr('role') && !indeterminate) {
            parent.attr('aria-' + (disabled ? _disabled : _checked), 'false');
        }

        // Add regular state class
        parent[_add](regular || option(input, callback) || '');
    }

    // Remove all traces
    function tidy(input, callback) {
        if (input.data(_iCheck)) {

            // Remove everything except input
            input.parent().html(input.attr('style', input.data(_iCheck).s || ''));

            // Callback
            if (callback) {
                input[_callback](callback);
            }

            // Unbind events
            input.off('.i').unwrap();
            $(_label + '[for="' + input[0].id + '"]').add(input.closest(_label)).off('.i');
        }
    }

    // Get some option
    function option(input, state, regular) {
        if (input.data(_iCheck)) {
            return input.data(_iCheck).o[state + (regular ? '' : 'Class')];
        }
    }

    // Capitalize some string
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Executable handlers
    function callbacks(input, checked, callback, keep) {
        if (!keep) {
            if (checked) {
                input[_callback]('ifToggled');
            }

            input[_callback]('ifChanged')[_callback]('if' + capitalize(callback));
        }
    }
})(window.jQuery || window.Zepto);


