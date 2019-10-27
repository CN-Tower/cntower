function indexLoaded() {
  /**
   * 初始化wow.js
   */
  if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))) {
    new WOW().init();
  }

  /**
   * 滑动到指定区域
   */
  $(document).scrollTop(0);

  $(".logo").click(function () {
    scrollToSec('#section-1', 1000);
  });
  $(".btn-con:even").click(function () {
    scrollToSec('#section-5', 1000);
  });
  $(".btn-con:odd").click(function () {
    scrollToSec('#section-1', 1000);
  });
  $('#nav li a').click(function () {
    scrollToSec($(this).attr("href"));
    return false;
  });

  var isScrolling = false;

  function scrollToSec(secId) {
    if (!isScrolling) {
      activeNav(secId);
      isScrolling = true;
      $("html:not(:animated),body:not(:animated)").animate({
        scrollTop: $(secId).offset().top
      }, 1000, function () {
        isScrolling = false;
      });
    }
  }

  var currentSecId = '#section-1';

  $(window).scroll(function () {
    if (!isScrolling) {
      $(".section").each(function () {
        var ot = $(this).offset().top;
        var st = $(window).scrollTop();
        var curSecId = '#' + $(this).attr('id');
        if (st + 360 >= ot && st < ot + $(this).height() && curSecId !== currentSecId) {
          currentSecId = curSecId;
          activeNav(curSecId);
        }
      });
    }
  });

  function activeNav(secId) {
    $('.topnav li a').each(function () {
      if ($(this).attr("href") === secId) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  }

  /**
   * 个人信息二维码
   */
  var $toInfo = $("#nav .toInfo")
    , $infoQr = $("#nav .infoQr");

  $toInfo.mouseenter(function (e) {
    $infoQr.stop(true, true).fadeIn();
    $(this).on("mouseleave", function () {
      $infoQr.stop(true, true).fadeOut()
    });
  }).click(function () {
    $infoQr.stop(true, true).fadeOut();
    $(this).off("mouseleave", function () {
      $infoQr.stop(true, true).fadeOut()
    });
  });

  /**
   * 头像上的弹出框提示
   */
  var $photo = $(".photo")
    , $prompt = $("#section-1 .prompt")
    , promptY, promptX;

  $photo.hover(function () {
    $prompt.stop(true, true).fadeIn();
  }, function () {
    $prompt.stop(true, true).fadeOut();
  }).mousemove(function (e) {
    promptY = e.pageY;
    promptX = e.pageX;
    promptSY = $(document).scrollTop();
    promptSX = $(document).scrollLeft();
    $prompt.css({
      top: promptY - promptSY + 30,
      left: promptX - promptSX - 25
    })
  });

  /**
   * 项目经验的抽屉效果
   */
  var $project = $("#section-4 .projectBox dl")
    , $pdt = $project.find("dt")
    , $pdd = $project.find("dd")
    , $em = $("#section-4 .projectBox dt em")

  $pdt.each(function (i) {
    $(this).click(function () {
      $em
        .css({ transform: "rotate(0deg)" })
        .eq(i).css({ transform: "rotate(-90deg)" });
      $pdd
        .stop().animate({ width: "0" })
        .eq(i).stop().animate({ width: "386px" })
    })
  });
}
