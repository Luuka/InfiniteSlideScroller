(function( $ ){

    var methods = {
        init : function(options) {
            var $slider = this;
            var $slides = this.find('li');

            var slides = new Array();

            var settings = $.extend({
                speed: 5,
                width: '200px',
                height: '200px',
                gutter: 0,
            }, options );

            if($slider.is("ul")) {
                $slider.addClass('iss-slider');
                $slides.each(function(index, slide){
                    var $slide = $(slide);
                    slides.push(slide);
                    $slider.width(settings.width).height(settings.height);
                    $slide.addClass('iss-slide');

                    var newPos;
                    if($slide.prev().length > 0) {
                        var $previousSlide = $slide.prev();
                        newPos = $previousSlide.position().left + $previousSlide.width() + settings.gutter;
                    } else {
                        newPos = 0;
                    }

                    $slide.css('left', newPos);
                });

                setInterval(function(){
                    $('.iss-slide').each(function(){
                        var newPos = parseFloat($(this).css('left'), 10) - settings.speed;

                        if(parseInt($(this).position().left) <= parseInt($(this).width() * -1)) {
                            $lastSlide = $(slides[slides.length - 1]);
                            newPos = parseInt($lastSlide.position().left) + parseInt($lastSlide.width()) + settings.gutter;
                            slides.push(slides.shift());
                        }

                        $(this).css('left', newPos);
                    });
                }, 50);

            } else {
                console.error("Bad type parameter : $slider must be an ul");
                return false;
            }
        },
        show : function( ) {    },
        hide : function( ) {  },
        update : function( content ) {  }
    };

    $.fn.InfiniteSlideScroller = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
        }
    };


})( jQuery )
