/*jslint browser: true, indent: 4 */
/*global jQuery */

(function ($) {

    'use strict';

    $.fn.magGlass = function (options) {
        
        var $output, magHeight, magWidth;
        
        $output = $(options.output);
        magHeight = $output.height() / options.scale;
        magWidth = $output.width() / options.scale;

        $(this).each(function () {

            var maxX, maxY, $magBox, offsetLeft, offsetTop, largeImage;

            maxX = $(this).width() - magWidth;
            maxY = $(this).height() - magHeight;

            offsetLeft = $(this).offset().left + magWidth / 2;
            offsetTop = $(this).offset().top + magHeight / 2;

            largeImage = 'url(' + $(this).data('image') + ')';

            $magBox = $('<div>', { 'class': options.className || '' })
                .hide()
                .appendTo($(this));
            $magBox.outerHeight(magHeight)
                .outerWidth(magWidth);

            $(this).mouseenter(function () {
                $magBox.show();
                $output.css('backgroundImage', largeImage);
            }).mouseleave(function () {
                $magBox.hide();
                $output.css('backgroundImage', 'none');
            }).mousemove(function (e) {
                var x, y;
                x = Math.min(Math.max(0, e.pageX - offsetLeft), maxX);
                y = Math.min(Math.max(0, e.pageY - offsetTop), maxY);
                $magBox.css({
                    left: x,
                    top: y
                });
                $output.css('backgroundPosition', '-' + (options.scale * x) + 'px -' + (options.scale * y) + 'px');
            });
            
        });

        return this;

    };

}(jQuery));
