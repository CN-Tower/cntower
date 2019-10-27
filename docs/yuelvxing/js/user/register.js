/**
 *  user login
 */

requirejs([requirePath.CONFIG], function () {
    require(['jquery'], function ($) {
        $(function () {
            // 验证数据
            // do something
            $('#submit').click(function () {
                var username = $('#username').val();
                var email = $('#email').val();
                var password = $('#password').val();
                var data = {
                    username: username,
                    email: email,
                    password: password
                };
                $.ajax({
                    url: '/api/user/register',
                    type: 'POST',
                    data: data,
                    dataType: 'json',
                    success: function (res) {
                        if (res.status) {
                            alert('注册成功');
                            var email = data.email;
                            window.location.href = '../../pages/user/usercenter/home.html#/home/' + email;
                        } else {
                            alert('注册失败')
                        }
                    },
                    error: function (err) {
                        console.log(err)
                    }
                });
            });
            
        })
    });
});

/* login valid */
define('validate', ['jquery'], function () {

});

/* exception handling */

define('error', ['jquery'], function (ele, info) {
    var validField = $(ele).attr('data-valid'); // name
    var $tip = $('#' + ele + '-tip'); // name-tip
    var $error = $('#' + ele + '-error'); // name-error
    $error.html(info);
    $tip.hide();
});

define('success', ['jquery'], function (ele, info) {

});

/* email valid */
define('emailValid', ['jquery'], function () {
    var ele = $('#email');
    var email = $.trim(ele.val());
    if (email == '') {

    } else {

    }
});

