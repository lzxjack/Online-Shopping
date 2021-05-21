window.addEventListener('load', function() {
    var preview_img = document.querySelector('.preview-img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    // 显示与隐藏
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    });
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    });
    // 盒子跟随鼠标移动
    preview_img.addEventListener('mousemove', function(e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        var maskMax = preview_img.offsetHeight - mask.offsetHeight;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';

        // 大图
        var bigImg = document.querySelector('.bigImg');
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        var bigX = bigMax * maskX / maskMax;
        var bigY = bigMax * maskY / maskMax;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    });
});