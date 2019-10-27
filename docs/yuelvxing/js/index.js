/*
 *  business logic layer
 * */


requirejs([requirePath.CONFIG], function () {
    // index 
    require(['bootstrap', 'common', 'lodash', 'lazyload'], function (bs, common, _, lazyload) {
        $(function () {
            /*navbar-fix*/
            common.scrollNav();
            /* weixin */
            common.weixinHover();
            /* goTop */
            common.goTop();
            /* register */
            $('#btn_register').click(function () {
                window.location.href = './pages/user/register.html'
            });
            /* user login */
            $('#loginSubmit').click(function () {
                var email = $('#loginEmail').val();
                var password = $('#loginPassword').val();
                if (email != '' && password != '') {
                    var data = {
                        email: email,
                        password: password
                    };
                    $.ajax({
                        url: '/api/user/login',
                        type: 'POST',
                        data: data,
                        dataType: 'json',
                        success: function (res) {
                            if (res.status) {
                                var email = res.data.data.email;
                                window.location.href = './pages/user/usercenter/home.html#/home/' + email;
                            }
                        },
                        error: function (err) {
                            console.log(err)
                        }
                    })
                }
            });
        });
        /*feedback-submit*/
        $("#btn_fd").on('click', function () {
            common.fb_submit();
        });
        /*幻灯片滚动*/
        $('#carousel').carousel({interval: 5000});
        //

        /*var data = {
         title: '10种好食材值得你为其远行',
         imgSrc: './img/post/fish.jpg'
         };
         $.ajax({
         url : '/api/article/addList',
         type: 'POST',
         data: data,
         success : function(res){

         }
         });*/
        /* read article list */
        var filter = {
            data: 'title imgSrc'
        };
        $.ajax({
            url: '/api/article/findList',
            type: 'POST',
            data: filter,
            success: function (res) {
                $.get('../templates/articleList.tpl.html', function (tplhtml) {
                    var compiled = _.template(tplhtml);
                    var html = compiled({list: res.data});
                    $('#ipost_list').append(html);
                    $('img.lazy').lazyload({
                        effect: "fadeIn"
                    });
                })
            },
            error: function (err) {
                console.log(err)
            }
        });


    });
});

