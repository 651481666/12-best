var banner = (function () {
    var data,
        timer,
        bannerColor =document.getElementById('banner_color'),
        bannerCenter = document.getElementById('banner-center'),
        wrapper = bannerCenter.getElementsByClassName('banner_run')[0],
        focus = bannerCenter.getElementsByClassName('focus')[0];
        

    var wrapperList = null,
        focusList = null,
        imgList = null,
        containerWidth = bannerCenter.offsetWidth;

    var _default = {
        index: 0,
        autoInterval:3000
    };
    var index,
        autoInterval;

    var autoTimer = null;

    function initDefault(options) {
        for (var obj in options) {
            if (options.hasOwnProperty(obj)) {
                _default[obj] = options[obj];
            }

        }
        index = _default.index;
        autoInterval = _default.autoInterval;
    }

    function initChange() {
        utils.css(wrapper, {left: -containerWidth * index});
        focusList[index].className += 'select';
    }

    function getData() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'json/banner.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = utils.toJSON(xhr.responseText);
            }
        };
        xhr.send(null);
    }

    function bindData() {
        var str = ``,
            strF = ``;
        for (var i = 0; i < data.length; i++) {
            var cur = data[i];
            str += `<li class="slide"><a href="${cur.link}"><img src="" data-img='${cur.img}' alt="${cur.desc}"></a></li>`;
            strF += `<li></li>`
        }

        wrapper.innerHTML = str;
        focus.innerHTML = strF;
        wrapperList = wrapper.getElementsByClassName('slide');
        focusList = focus.getElementsByTagName('li');
        imgList = wrapper.getElementsByTagName('img');
        wrapper.appendChild(wrapperList[0].cloneNode(true));
        utils.css(wrapper, 'width', (data.length + 1) * containerWidth);
    }

    function lazyImg(curImg) {
        curImg.load = true;
        var newImg = new Image;
        newImg.src = curImg.getAttribute('data-img');
        newImg.onload = function () {
            curImg.src = newImg.src;
            curImg.style.display = 'block';
            animate({
                curEle: curImg,
                target: {opacity: 1},
                duration: 200
            });
            newImg = null;
        }
    }

    function deyCode() {
        for (var i = 0; i < imgList.length; i++) {
            var curImg = imgList[i];
            lazyImg(curImg);
        }
        clearTimeout(timer);
    }

    function autoMove() {
        switch (index){
            case 0:
                bannerColor.style.background='rgba(255, 183, 49,1)';
                break;
            case 1:
                bannerColor.style.background='rgba(61, 100, 188,1)';
                break;
            case 2:
                bannerColor.style.background='rgba(180, 0, 0,1)';
                break;
            case 3:
                bannerColor.style.background='rgba(63, 65, 148,1)';
                break;
            case 4:
                bannerColor.style.background='rgba(127, 89, 255,1)';
                break;
            case 5:
                bannerColor.style.background='rgba(255, 183, 49,1)';
        }
        index++;

        if (index >= data.length+1) {
            utils.css(wrapper, 'left', 0);
            index = 1;
        }
        change();
    }

    function change() {
        animate({
            curEle: wrapper,
            target: {left: -containerWidth * index},
            duration: 300,
        });
        select();
    }

    function select() {
        // console.log(index);
        var temp=index;
        if(temp===data.length){
            temp=0;
        }
        for (var i = 0; i < focusList.length; i++) {
            var obj = focusList[i];
            obj.className= i === temp ? 'select' : '';
        }

    }

    function click() {
        bannerCenter.onmouseenter=function () {
            clearInterval(autoTimer);
        };
        bannerCenter.onmouseleave=function () {
            autoTimer = setInterval(autoMove, autoInterval);
        };
    }

    function bindFocus () {
        for (var i = 0; i < focusList.length; i++) {
            var obj = focusList[i];
            obj.myIndex=i;
            focusList[i].mouseenter=function () {
                index=this.myIndex;
                change();
            }

        }
    }

    return {
        init: function (options) {
            initDefault(options);

            getData();
            bindData();

            timer = setTimeout(deyCode, 500);

            initChange();
            autoTimer = setInterval(autoMove, autoInterval);
            click();
            bindFocus();
        }
    }
})();

banner.init({index: 1, autoInterval: 3000});