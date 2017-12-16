~function () {
    var bannerColor=document.getElementById('banner_color');

    var menuLeft=bannerColor.getElementsByClassName('menu_left')[0],
        menuCenter=bannerColor.getElementsByClassName('menu_center')[0];

    menuLeft.addEventListener('mouseenter',showdetail,false);
    menuLeft.addEventListener('mouseleave',hidedetail,false);
    function showdetail() {
        var theme=this.getElementsByClassName('theme')[0],
            themeLi=this.getElementsByTagName('li');
        for (var i = 0; i < themeLi.length; i++) {


        }

        menuCenter.style.display='block';
    }
    function hidedetail(e) {
        menuCenter.style.display='none';
    }
}();