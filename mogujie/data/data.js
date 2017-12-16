/*var time = new Date();

var user = [];
user[0] = {uid:1, uname: 'guohiu', pwd:123456, createTime: time.getTime()};
user[1] = {uid:2, uname: 'chenxuelan', pwd:123456, createTime: time.getTime()};
user[2] = {uid:3, uname: 'tianle', pwd:123456, createTime: time.getTime()};
user[3] = {uid:4, uname: 'zhaolei', pwd:123456, createTime: time.getTime()};
user[4] = {uid:5, uname: 'saisai', pwd:123456, createTime: time.getTime()};
user[5] = {uid:6, uname: 'junjie', pwd:123456, createTime: time.getTime()};
console.log(JSON.stringify(user));
console.log(user);*/

(function ($) {
    $('.form').find('.submit').on('click', function (e) {
        let $parent = $(this).parents('.form'),
            $fileName = $parent.find('tr:first td:eq(1)').text(),
            $inputs = $parent.find('*[data-name]');

        if($inputs.length){

            $.ajax({
                url:'http://127.0.0.1:3000/' + $fileName,
                dataType:'json',
                success: function (data) {
                    //console.log(data);
                    let temp = {};
                    let time = new Date();

                    //最新一条信息ID
                    temp.id = (data.length || 0) + 1;

                    $.each($inputs, function (index, item) {
                        temp[$(item).data('name')] = $.trim($(item).val());
                    });

                    temp.createTime = time.getTime();
                    data.push(temp);

                    //写入文件
                    $.ajax({
                        url:'http://127.0.0.1:3000/index',
                        data: {file: $fileName, data:JSON.stringify(data)},//
                        type:'post',
                        success: function () {
                            //写入成功
                            $inputs.val('');
                        }
                    });
                }
            });




        }




    });
})(jQuery);