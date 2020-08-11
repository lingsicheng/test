// 轮播图
function move(){
    ! function(window, document, $, undefined) {
    var $slideWp = $(".slide_wp"),
        imgSz = $slideWp.find("ul img").size(),
        liW = $slideWp.find("ul li").width(),
        curIdx = 0,
        timer,
        timer2;

    var init = function() {
        renderIdx();
        $slideWp.find("ul li").first().clone().appendTo($slideWp.find("ul"));
        initEvent();
        autoPlay();
    };

    var initEvent = function() {
        $slideWp.find(".handle_btn").click(onHandleBtnClk);
        $slideWp.hover(onMouseEnter, onMouseOut);
        $slideWp.find("ol li").hover(onMouseEnterIdx, onMouseOutIdx);
    };

    var onMouseOutIdx = function() {
        clearTimeout(timer2);
    };

    var onMouseEnterIdx = function() {
        var $this = $(this),
            curIdx = $this.index();
        timer2 = setTimeout(function() {
            $slideWp.find(".handle_btn").eq(1).trigger("click", curIdx);
        }, 300);
    };

    var onMouseOut = function() {
        autoPlay();
    };

    var onMouseEnter = function() {
        clearInterval(timer);
    };

    var onHandleBtnClk = function(e, data) {
        var $this = $(this),
            thisIdx = $slideWp.find(".handle_btn").index(this);
        data || data == 0 ? curIdx = data : (thisIdx ? curIdx++ : curIdx--);
        if (curIdx < 0) {
            $slideWp.find("ul").css("margin-left", liW * imgSz * -1);
            curIdx = imgSz - 1;
        }

        if (curIdx > imgSz) {
            $slideWp.find("ul").css("margin-left", 0);
            curIdx = 1;
        }
        $slideWp.find("ul").stop().animate({
            marginLeft: liW * curIdx * -1
        });

        $slideWp.find("ol li").eq(curIdx == imgSz ? 0 : curIdx).addClass("on").siblings(".on").removeClass(
            "on");
    };

    var renderIdx = function() {
        var $olWp = $slideWp.find("ol"),
            lisArr = [];
        $.each(new Array(imgSz), function(i) {
            lisArr.push('<li class="', i ? "" : "on", '"></li>');
        });
        $olWp.html(lisArr.join(""));
    };

    function autoPlay() {
        timer = setInterval(function() {
            $slideWp.find(".handle_btn").eq(1).click();
        }, 2000);
    }

    init();
    }(window, document, jQuery);
}
