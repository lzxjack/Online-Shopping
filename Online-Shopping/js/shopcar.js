$(function() {
    // 1.全选 全不选功能
    $(".checkall").change(function() {
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item");
        }
    });

    // 2.如果小复选框的个数等于3，就把全选按钮也选上
    $(".j-checkbox").change(function() {
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });

    // 3.增减商品的数量
    $(".increment").click(function() {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        // 计算商品价格
        // var p = $(this).parent().parent().siblings(".p-price").html();
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        // toFixed(2) 保留两位小数
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });
    $(".decrement").click(function() {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });


    // 4.用户修改文本框的值， 计算小计模块
    $(".itxt").change(function() {
        var n = $(this).val();
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });
    // 先调用一次，没点击的时候也要计算一次
    getSum();
    // 计算总计和总额
    function getSum() {
        var count = 0;
        var money = 0;
        $(".itxt").each(function(i, ele) {
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);
        $(".p-sum").each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text("￥" + money.toFixed(2));
    }

    // 删除商品模块
    // (1)删除当前商品
    $(".p-action a").click(function() {
        $(this).parents(".cart-item").remove();
        getSum();
    });
    // (2)删除选中商品
    $(".remove-batch").click(function() {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });
    // (3)清空购物车
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        getSum();
    });
});