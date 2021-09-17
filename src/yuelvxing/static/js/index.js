/*
 *  business logic layer
 * */


requirejs([requirePath.CONFIG], function () {
    // index 
    require(['bootstrap', 'common'], function (bs, common) {
        $(function () {
            /*navbar-fix*/
            common.scrollNav();
        });
        /*feedback-submit*/
        $("#btn_fd").on('click', function () {
            common.fb_submit();
        });
        /*幻灯片滚动*/
        $('#carousel').carousel({interval: 5000});
    });
});

