'use strict';
/**
 * Swipe.js extend jQuery adding the swipe functinality to DOM elements.
 *
 * How to use:
 * 1. bind a dom element e.g. var el = $('div.class');
 * 2. assign the siwpe method e.g. el.swipe(function(direction, offset, status){...});
 */

(function ($) {

    $.fn.swipe = function (callback) {

        var status = {

            touchDown         : false,
            position          : null,

        },

        cache = {

            $el: $(this)

        },

        swipeInfo = function (event) {

            var x = 0,
                y = 0,
                dx = '',
                dy = '';

            if (event.originalEvent !== 'undefined') {

                x = event.originalEvent.pageX;
                y = event.originalEvent.pageY;

            }

            if (event.type === 'touchmove' || event.type === 'touchend') {

                x = event.originalEvent.changedTouches[0].pageX;
                y = event.originalEvent.changedTouches[0].pageY;

            }

            if (event.originalPosition !== 'undefined') {

                dx = (x > status.position.x) ? 'right' : 'left';
                dy = (y > status.position.y) ? 'down' : 'up';

            }

            return {

                direction: {

                    x : dx,
                    y : dy

                },
                offset: {

                    x : x - status.position.x,
                    y : status.position.y - y

                },
                status: {

                    event: event.type

                }

            };

        };

        cache.$el.on('touchstart', function (event) {

            status.touchDown = true;

            status.position = {

                x : event.originalEvent.changedTouches[0].pageX,
                y : event.originalEvent.changedTouches[0].pageY

            };

        });

        cache.$el.on('touchend', function (event) {

            var info = swipeInfo(event);

            status.touchDown = false;
            status.position = null;
            
            callback(event, info.direction, info.offset, info.status);

        });

        cache.$el.on('touchmove', function (event) {

            var info;

            if (!status.touchDown) {

                return;

            }

            info = swipeInfo(event);

            callback(event, info.direction, info.offset, info.status);

        });

    };

})(jQuery);
