$(function() {
    // 页面每次加载，就自动渲染一次数据
    load();
    $("#title").on("keydown", function(event) {
        // 判断用户按下了回车键(13)
        if (event.keyCode == 13) {
            if ($(this).val() == "") {
                alert("请输入待办事项！");
            } else {
                // 先读取本地存取原来的数据
                var local = getData();
                // 把最新的数据追加给local
                local.push({ title: $(this).val(), done: false });
                // 把local存到本地存储
                saveData(local);
                load();
                // 加载完毕后删除input中的文本
                $(this).val("");
            }
        }
    });

    //删除操作
    $("ol,ul").on("click", "a", function() {
        // 获取本地存储
        var data = getData();
        // 修改数据
        var index = $(this).attr("id");
        // console.log(index);
        // 元素.splice(从第几个位置开始删除，删除几个)
        data.splice(index, 1);
        // 保存到本地存储
        saveData(data);
        // 重新渲染页面
        load();
    });

    // 正在进行、已经完成操作
    $("ol,ul").on("click", "input", function() {
        var data = getData();
        var index = $(this).siblings("a").attr("id");
        // console.log(index);
        data[index].done = $(this).prop("checked");
        saveData(data);
        load();
    });


    // 读取本地存储的数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            // 本地存储的数据格式是字符串，需要转化成对象
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    // 保存本地存储数据
    function saveData(data) {
        // 存储前要转化为字符串
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    // 渲染加载数据
    function load() {
        var data = getData();
        // console.log(data);
        // 遍历之前先清空ol和ul里的内容
        $("ol,ul").empty();
        var todoCount = 0; // 正在进行的个数
        var doneCount = 0; // 已完成的个数
        // 遍历数据data
        $.each(data, function(i, n) {
            // console.log(n);
            // 追加数据，并创建自定义id索引号
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'> <p>" + n.title + "</p> <a href='javascript:;' id=" + i + "></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox'> <p>" + n.title + "</p> <a href='javascript:;' id=" + i + "></a></li>");
                todoCount++;
            }
        });
        // 修改显示的个数
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
});