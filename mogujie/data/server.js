let http = require('http');//引用http模块创建server服务器
let url = require('url');//处理url参数及路由
let fs = require('fs');//操作文件
let qs = require('querystring');//处理POST请求

http.createServer(function (request, response) {

    //根据路径执行程序
    let pathName = url.parse(request.url).pathname;

    switch(pathName){
        case '/index':
            //POST提交数据处理
            var post = '';

            // 通过request的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
            request.on('data', function(chunk){
                post += chunk;
            });

            // 在end事件触发后，通过qs.parse将post解析为真正的POST请求格式，然后向客户端返回。
            request.on('end', function(){
                if(post){//提交数据处理
                    post = qs.parse(post);//POST过来的数据对象化
                    if(post.file && post.data){
                        fs.writeFile(post.file, post.data, function(err) {//写入文件数据
                            if (err) {
                                return console.error(err);
                            }
                            console.log("数据写入成功！");
                        });
                    }
                }

            });

            //没有POST提交时，默认显示index.html页面
            fs.readFile(pathName.substr(1) + '.html', function (err, data) {
                if(err){
                    // 发送 HTTP 头部
                    // HTTP 状态值: 200 : OK
                    // 内容类型: text/html
                    response.writeHead(404, {'Content-Type': 'text/html'});
                }else{
                    // 发送 HTTP 头部
                    // HTTP 状态值: 200 : OK
                    // 内容类型: text/html
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    //response.write(data.toString());
                    response.end(data.toString());

                }

            });
            break;
        case '/getClass':
            let fenlei = JSON.parse(fs.readFileSync('class.json')),
                first = [],
                second = [],
                third = [];

            for (let i = 0; i < fenlei.length; i++) {
                if(fenlei[i].fid == 0){
                    first[fenlei[i].id] = fenlei[i];
                    first[fenlei[i].id]['sec'] = [];
                }
            }

            first = first.map(function (item) {
                for (let j = 0; j < fenlei.length; j++) {
                    if(item.id == fenlei[j].fid){
                        item['sec'].push(fenlei[j]);
                    }
                }

                return item;
            });

            first = first.map(function (item) {
                item.sec.map(function (it) {
                    !it.third ? it.third = [] : null;
                    for (let j = 0; j < fenlei.length; j++) {
                        if(it.id == fenlei[j].fid){
                            it['third'].push(fenlei[j]);
                        }
                    }
                    return it;
                });
                return item;
            });

            /*first.forEach(function (item) {
                for (var j = 0; j < item.sec.length; j++) {
                    var obj1 = item.sec[j];
                    console.log(obj1);

                }
            });
            */
            //console.log(first);
            break;

        default:
            fs.readFile(pathName.substr(1), function (err, data) {
                if(err){
                    // 发送 HTTP 头部
                    // HTTP 状态值: 200 : OK
                    // 内容类型: text/html
                    response.writeHead(404, {'Content-Type': 'text/html'});
                }else{
                    // 发送 HTTP 头部
                    // HTTP 状态值: 200 : OK
                    // 内容类型: text/html
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    response.end(data.toString());

                }
            });
    }

}).listen('3000');
console.log('后台访问地址：http://127.0.0.1:3000/index');