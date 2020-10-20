$(function() {
    // 当点击了li，此时不要执行 页面滚动事件里li的背景选择 --节流阀
    var flag = true;
    // 1. 显示隐藏导航栏
    var toolTop = $(".recommend").offset().top;
    toggleTool();

    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    }
    $(window).scroll(function() {
        toggleTool();
        // 滚动页面，改变导航栏的class
        if (flag) {
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top - 100) {
                    $(".fixedtool li").eq(i).addClass("currentli").siblings().removeClass();
                }
            });
        }
    });
    // 2.点击导航栏，跳转到相应内容区域
    $(".fixedtool li").click(function() {
        flag = false;
        // console.log($(this).index());
        // flag = false;
        // 当我们每次点击小li 就需要计算出页面要去往的位置 
        // 选出对应索引号的内容区的盒子 计算它的.offset().top
        var current = $(".floor .w").eq($(this).index()).offset().top;
        // 页面动画滚动效果
        $("body, html").stop().animate({
            scrollTop: current
        }, function() {
            // 打开节流阀，滚动页面让导航栏自动变颜色
            flag = true;
        });
        // 点击之后当前li添加类名，其余兄弟移除currentli类名
        $(this).addClass("currentli").siblings().removeClass();
    });
});