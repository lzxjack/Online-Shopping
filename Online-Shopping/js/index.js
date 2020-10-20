window.addEventListener('load', function() {
    // 获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 鼠标经过focus 就显示左右按钮，停止计时器
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; // 清空计时器
    });
    // 鼠标离开focus 就隐藏左右按钮，调用定时器
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            // 手动调用点击事件
            arrow_r.click();
        }, 2000);
    });

    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        // 创建 li
        var li = document.createElement('li');
        // 设置自定义属性，记录小圆圈索引号
        li.setAttribute('index', i);
        // li插入ol
        ol.appendChild(li);
        // 小圈圈排他思想 生成圈圈同时 直接绑定事件
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 点击小圈圈，移动图片，移动的是ul
            // 点击li，拿到当前的索引号
            var index = this.getAttribute('index');
            // 当点击了li之后，就要把index给num，实现同步
            num = index;
            // 当点击了li之后，就要把index给circle，实现同步
            circle = index;
            animate(ul, -index * focusWidth, 1);
        });
    }
    // ol里第一个li的类名设置为current
    ol.children[0].className = 'current';
    var num = 0;
    // circle控制小圆圈的播放
    var circle = 0;
    // 克隆第一章图片li，放到ul最后面
    // 要在生成小圆圈之后克隆
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 点击右侧按钮，图片滚动
    arrow_r.addEventListener('click', function() {
        // 如果到了最后一张图片，ul要快速复原：left改为0
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * focusWidth, 1);
        // circle控制小圆圈的播放
        circle++;
        circle = circle == ol.children.length ? 0 : circle;
        circleChange();
    });

    // 点击左侧按钮，图片滚动
    arrow_l.addEventListener('click', function() {
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * focusWidth + 'px';

        }
        num--;
        animate(ul, -num * focusWidth, 1);
        // circle控制小圆圈的播放
        circle--;
        circle = circle < 0 ? (ol.children.length - 1) : circle;
        circleChange();
    });

    function circleChange() {
        // 排他其他
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下自己
        ol.children[circle].className = 'current';
    }
    var timer = setInterval(function() {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000);
});