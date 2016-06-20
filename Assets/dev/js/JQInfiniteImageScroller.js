$.fn.JQInfiniteImageScroller = function($params) {
    var $slider = this;
    var $slides = this.find('li');

    var speed = 5;
    var width = 200;
    var height = 200;
    var gutter = 0;
    if($params != undefined) {
        speed = $params.speed != undefined ? $params.speed : speed;
        width = $params.width != undefined ? $params.width : width;
        height = $params.height != undefined ? $params.height : height;
        gutter = $params.gutter != undefined ? $params.gutter : gutter;
    }

    if($slider.is("ul")) {
        $slider.addClass('jqiis-slider');
        $slides.each(function(index, slide){
            var $slide = $(slide);
            $slider.width(width).height(height);
            $slide.addClass('jqiis-slide');

            var newPos;
            if($slide.prev().length > 0) {
                var $previousSlide = $slide.prev();
                newPos = $previousSlide.position().left + $previousSlide.width() + gutter;
            } else {
                newPos = 0;
            }

            $slide.css('left',newPos);
        });

        setInterval(function(){
            $('.jqiis-slide').each(function(){
                var newPos = parseFloat($(this).css('left'), 10) - speed;

                if(parseInt($(this).position().left) <= parseInt($(this).width() * -1)) {
                    var max = 0, $lastSlide;
                    $slides.each(function() {
                        if($(this).offset().left > max) {
                            max = $(this).offset().left;
                            $lastSlide = $(this);
                        }
                    });
                    newPos = parseInt($lastSlide.css('left')) + parseInt($lastSlide.width()) + gutter;
                }

                $(this).css('left', newPos);
            });
        }, 50);

    } else {
        console.error("Bad type parameter : $slider must be an ul");
        return false;
    }
};
