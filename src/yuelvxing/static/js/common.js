
/*scroll*/
define(['jquery'], function ($) {
    return {
        /* fixed-navbar */
        scrollNav: function () {
            $(window).scroll(function () {
                if ($(window).scrollTop() > 80) {
                    $("#navbar").addClass("navbar-fixed-top");
                }
                else {
                    $("#navbar").removeClass("navbar-fixed-top");
                }
            })
        },
        /* fixed-sidebar */
        fb_submit: function () {
            var text = $.trim($("#fd_text").val());
            var contact = $.trim($("#fd_contact").val());
            if (text == '' || contact == '') {
                alert("请填写您的意见和联系方式");
                return false;
            }
            if(true){
                /* 需要正则验证email,qq号码 */
            }
            var data = {
                fb_text: text,
                fb_contact: contact
            };
            $.ajax({
                url: '/api/feedback',
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function (res) {
                    alert('提交成功!');
                    $('#btn_fd_cancel').trigger('click');
                },
                error: function (err) {
                    alert('系统故障，稍微重试！');
                }
            })
        }
    }
});