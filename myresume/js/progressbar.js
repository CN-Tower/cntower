/**
 * Created by Stone on 2015/10/14.
 */
define('jym.progressbar', ['jym.constants'], function(constants) {

    function DrawArcBar(config) {
        var canvasid = config.cvsid;
        var perid = config.perid;
        var color = config.color;
        var percent = config.percent;
        var width = config.width;
        var height = config.height;
        var linewidth = config.linewidth;
        var bg = document.getElementById(canvasid);
        bg.width = width;
        bg.height = height;
        var arcx = width / 2;
        var arcy = height;
        var arcr = (width - linewidth) / 2;

        var ctx = bg.getContext('2d');

        var circ = Math.PI * 2;
        var quart = Math.PI;

        function draw(current, now) {
            //画底色
            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            ctx.strokeStyle = "#edeeeb";
            ctx.lineWidth = linewidth;
            ctx.arc(arcx, arcy, arcr, quart, circ, false);
            ctx.stroke();
            if (now !== 0) {
                //画线
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.lineWidth = linewidth;
                ctx.arc(arcx, arcy, arcr, quart, (circ * current) + quart, false);
                ctx.stroke();
            }


        }

        var t = 0;
        var per = 0;
        var timer = null;

        function loadCanvas(now) {

            timer = setInterval(function() {
                if (now < 0.005) {
                    draw(0, 0);
                    return;
                }
                if (t >= now) {
                    clearInterval(timer);
                } else {
                    t += 0.005;
                    per += 1;
                    draw(t, now);
                    var txtele = document.getElementById(perid);
                    txtele.innerHTML = now !== 0 ? per + "%" : 0 + "%";

                }
            }, 15);
        }

        loadCanvas(0.5 * percent);
        timer = null;
    }

    return {
        DrawArcBar: function(config) {

            var id = config.id !== undefined ? config.id : 'cvs_div_1';
            var def = {
                cvsid: "cvs_" + id,
                perid: "per_" + id,
                txtid: "perTxt_" + id,
                color: constants.CSS.COLOR.PROGRESSBAR,
                percent: 0,
                width: 100,
                height: 50,
                linewidth: 5
            };
            if (config.color !== undefined) def.color = config.color;
            if (config.percent !== undefined) def.percent = config.percent;
            if (config.width !== undefined) def.width = config.width;
            if (config.height !== undefined)def.height = config.height;
            if (config.linewidth !== undefined)def.linewidth = config.linewidth;
            var prochtml = '<canvas id="' + def.cvsid + '">' + def.percent + '</canvas>';
            prochtml += '<span class="ui-span-bartext" id="' + def.txtid + '">融资进度</span>';
            prochtml += '<span class="ui-span-percent" id="' + def.perid + '">0%</span>';
            if ($('#' + id)) {
                $("#" + id).html(prochtml);
            }
            var myCanvas = document.getElementById(def.cvsid);
            if (myCanvas === null || !myCanvas.getContext) {

                prochtml = '<span class="ui-span-bartext" id="' + def.txtid + '">融资进度</span>';
                prochtml += '<span class="ui-span-percent" id="' + def.perid + '">' + Math.floor(def.percent * 100) + '%</span>';
                $("#" + id).html(prochtml);
            }
            else {
                try {
                    DrawArcBar(def);
                } catch (e) {
                    //alert(JSON.stringify(def));

                }
            }
        }
    };
});


