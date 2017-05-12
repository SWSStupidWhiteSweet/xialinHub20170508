/**
 * Created by user on 2016/5/31.
 */
$(document).ready(function(){
    initMenu();
});

function block(event) {
    if (window.event) {
        event = window.event;
        event.returnValue = false;
    } else {
        event.preventDefault();
    }
}

function disableScroll(){
    $(document.body).css({
        "overflow-x":"hidden",
        "overflow-y":"hidden"
    });
}



function initMenu(){
    //设置menu的高度
    var totalHeight = getClientHeight() - 80 - 30;//减去顶部导航栏的高度和底部的高度
    var singleHeight = Math.floor(totalHeight/14);//获取每个menu菜单的高度，总高度除以总菜单数

    $(".blpc-menu li, .list-group td:not(.blpc-adaptive)").css({
        "height":singleHeight
    });
    $(".blpc-menu,.list-group,.blpc-middle-content-wrap,.blpc-menu-info,.blpc-workbench").css({
        "height":totalHeight
    });
    $(".blpc-menu-info-head,.blpc-menu-left").css({
        "height":singleHeight
    });
    /*===============*/

    var item = $(".blpc-menu .list-group-item, .blpc-menu .table-group-item");

    item.each(function(index){
        var i = $(this);
        i.hover(function(e){
            var o = $(this);
            var data_show = o.find("a").attr("data-show");
            if(data_show==null){
                return;
            }
            o.addClass("blpc-active");
            $("#"+data_show).show();
        },function(e){
            var o = $(this);
            var data_show = o.find("a").attr("data-show");
            (function(data_show,o){
                $("#"+data_show).hover(function(e){
                    o.addClass("blpc-active");
                    $("#"+data_show).show();
                },function(e){
                    o.removeClass("blpc-active");
                    $("#"+data_show).hide();
                })
            })(data_show,o);
            o.removeClass("blpc-active");
            $("#"+data_show).hide();
        });
    });

    $(".blpc-menu-info-close").click(function (e) {
        var o = $(this);
        var parent = o.parent().parent().parent();
        var data_show = parent.attr("id");
        parent.hide();
    });


    $("#menu_indent").click(function (e) {
        $(".blpc-menu").toggleClass("blpc-menu-min");
        $(".blpc-menu-info").toggleClass("blpc-menu-info-min");
        $(".blpc-middle-content-wrap").toggleClass("blpc-middle-content-big");
        $(".blpc-workbench").toggleClass("blpc-workbench-min");
        $(".blpc-text-wrap, .table-group-item-text").toggle(1000);
    });

}

/**
 * 获取高度
 * @returns {number}
 */
function getClientHeight(){
    //var browser = navigator.userAgent;
    return document.body.scrollHeight > document.documentElement.scrollHeight ? document.body.scrollHeight : document.documentElement.scrollHeight;
}

/**
 * 获取iframe的document
 * @param id frame id
 * @returns {HTMLDocument}
 */
function getChildFrame(id){
    return document.getElementById(id).contentWindow.document;
}

function openNewIframe(obj){
    console.log(obj.iid+"openNewIframe");
    Addtabs.add({
        id: obj.attr('data-addtab'),
        pid:obj.pid,
        iid:obj.iid,
        title: obj.attr('title') ? obj.attr('title') : obj.text(),
        content: Addtabs.options.content ? Addtabs.options.content : obj.attr('content'),
        url: obj.attr('url'),
        ajax: obj.attr('ajax') ? true : false
    });
}

/**
 * 调用iframe中的方法
 * @param frame_id
 * @param fun_name 方法名称
 * @param paramList 参数列表
 */
function callFrameFun(frame_id,fun_name){
    var fn,str = "fn.call(this,";
    if(fun_name.indexOf(".")>-1){
        var arr = fun_name.split(".");
        var oname = arr[0],funname=arr[1];
        var obj = document.getElementById(frame_id).contentWindow[oname];
        fn = obj[funname];
    }else{
        fn = document.getElementById(frame_id).contentWindow[fun_name];
    }
    console.log(fn);
    if(arguments.length>2){
        for(var i = 2;i<arguments.length;i++){
            str += "'"+arguments[i]+"',";
        }
    }
    str = str.substring(0,str.length-1) + ")";
    eval(str);
}

function iframeHeight(){
    return getClientHeight() - 80 - 30 - 40 - 43 - 25;//根据需求修改
}
