let searchRender=(function ($) {
    //选项卡
    let tableSe = function () {
        function ChangeTab(tabBox, options) {
            //=>参数初始化
            var _default = {
                initIndex: 0,
                eventType: 'click'
            };
            for (var key in options) {
                if (options.hasOwnProperty(key)) {
                    _default[key] = options[key];
                }
            }
            this.initIndex = _default.initIndex;
            this.eventType = _default.eventType;
            this.tabBox = tabBox;
            this.init();
        }
        ChangeTab.prototype = {
            constructor: ChangeTab,
            change: function () {
                var _this = this;
                for (var i = 0; i < _this.tabList.length; i++) {
                    _this.tabList[i].myIndex = i;
                    _this.tabList[i]['on' + _this.eventType] = function () {
                        //=>this:当前点击的这个LI,不是实例(_this是实例)
                        _this.tabList[_this.prevIndex].className = '';
                        _this.conList[_this.prevIndex].className = 'sp_type_nav';
                        this.className = 'select';
                        _this.conList[this.myIndex].className = 'sp_type_nav select';
                        _this.prevIndex = this.myIndex;
                    }
                }
            },
            clear: function () {
                //=>清空所有的样式类
                for (var i = 0; i < this.tabList.length; i++) {
                    this.tabList[i].className = '';
                    this.conList[i].className = 'sp_type_nav';
                }
                //=>初始化默认的选中页卡
                this.tabList[this.initIndex].className = 'select';
                this.conList[this.initIndex].className = 'sp_type_nav select';
            },
            init: function () {
                //=>获取当前页卡区域中的元素(LI & DIV)
                this.tab = utils.children(this.tabBox, 'ul')[0];
                this.tabList = utils.children(this.tab, 'li');
                this.conList = utils.children(this.tabBox, 'div');
                this.prevIndex = 0;

                //=>实现页卡切换
                this.clear();
                this.change();
            }
        };
        window.CT = ChangeTab;
    };

    let tabBoxList = utils.getElementsByClassName('sp_type_nav');
    // new ChangeTab(tabBoxList[0]);

    let productData = null;
    //获取商品数据
    let getData = function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'json/product.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var result = xhr.responseText;
                productData = utils.toJSON(result);
                console.log(productData);
            }
        };
        xhr.send(null);
    };

    let oul = document.getElementsByClassName("pro_lists_s")[0];
    let menu = document.getElementsByClassName("menu_z")[0],
        likea = menu.getElementsByTagName("a");
    //显示商品
    let bindHTML = function () {
        if (!productData) return;
        let str=``;
        for (let i = 0; i < productData.length; i++) {
            let item = productData[i];
            str+=`<li data-time="${item.time}" data-price="${item.price}" data-hot="${item.hot}">
                <img src="" alt="">
                <p class="pro_txt">${item.title}</p>
                <div class="pro_pri">
                    <p class="newpro">¥${item.price}</p>
                    <p class="oldpro">￥${item.price*0.8}</p>
                    <span>
                        <img class="hot_pic" src="" alt="">
                    </span>
                </div>
            </li>`;
        }
        // console.log(str);
        oul.innerHTML = str;
    };
    //商品排序
    let change=function () {
        let olists=oul.getElementsByTagName('li');
        olists=utils.toArray(olists);
        let _this=this,
            index=_this.myIndex,
            method=_this.myMethod;
        for(let k=0;k<likea;k++){
            if(k!==index){
                likea[k].myIndex=-1;
            }
        }
        let attrs=['data-time', 'data-price', 'data-hot'],
            attrList=attrs[index];
        olists.sort(function (cur,next) {
            let curInn=cur.getAttribute(attrList),
                nextInn=next.getAttribute(attrList);
            if(index===0){
                curInn=curInn.replace(/-/g,'');
                nextInn=nextInn.replace(/-/g,'');
            }
            return (curInn-nextInn)*method;
        });
        let frg=document.createDocumentFragment();
        for (var i = 0; i < likea.length; i++) {
            frg.appendChild(likea[i]);
        }
        oul.appendChild(frg);
        frg=null;
    };

    //绑定点击事件排序
    let bindEvent=function () {
        for (var i = 0; i < likea.length; i++) {
            let curLists=likea[i];
            curLists.myMethod=-1;
            curLists.myIndex=i;
            curLists.onclick=function () {
                console.log(1111);
                this.myMethod*=-1;
                change.call(this);
            }
        }
    };

    return {
        init:function () {
            getData();
            bindHTML();
            bindEvent();
        }
    }
})(Zepto);
searchRender.init();
