$.fn.InfiniteSlideScroller = function($params) {
    var $slider = this;
    var $slides = this.find('li');

    var slides = new Array();

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
        $slider.addClass('iss-slider');
        $slides.each(function(index, slide){
            var $slide = $(slide);
            slides.push(slide);
            $slider.width(width).height(height);
            $slide.addClass('iss-slide');

            var newPos;
            if($slide.prev().length > 0) {
                var $previousSlide = $slide.prev();
                newPos = $previousSlide.position().left + $previousSlide.width() + gutter;
            } else {
                newPos = 0;
            }

            $slide.css('left', newPos);
        });

        console.log(slides);

        setInterval(function(){
            $('.iss-slide').each(function(){
                var newPos = parseFloat($(this).css('left'), 10) - speed;

                if(parseInt($(this).position().left) <= parseInt($(this).width() * -1)) {
                    $lastSlide = $(slides[slides.length - 1]);
                    newPos = parseInt($lastSlide.position().left) + parseInt($lastSlide.width()) + gutter;
                    slides.push(slides.shift());
                    console.log(slides);
                }

                $(this).css('left', newPos);
            });
        }, 50);

    } else {
        console.error("Bad type parameter : $slider must be an ul");
        return false;
    }
};
