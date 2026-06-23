$ = jQuery;
$(document).ready(function () {
    "use strict";

    const navBlock   = document.querySelector('.w-layout-grid.header-case');
    const navWraps   = document.querySelectorAll('.header-blog, .back-button-block, .w-layout-grid.header-case');
    const navLinks   = document.querySelectorAll('.tubik-button .button-text, .header-blog .header-wrapper .left-wrapper .logo-link .logo-text');
    const navLogo1   = document.querySelector('.header-blog .header-wrapper .left-wrapper .logo-link .logo-a .logo-desktop');
    const navLogo2   = document.querySelector('.header-blog .header-wrapper .left-wrapper .logo-link .logo-a');
    const arrowNav   = document.querySelectorAll('.back-button-block .back-button-wrapper .image-6');
    const navRight   = document.querySelector('.header-blog .header-wrapper .right-content');
    const searchWrapper = document.querySelector('.header-blog .header-wrapper .right-content .button-search-wrapper');
    const searchIcon = document.querySelector('.header-blog .header-wrapper .right-content .button-search-wrapper .search-icon');
    const newButtons = document.querySelectorAll('.tubik-button, .tubik-button .button-text');

    function animateNavbarOnScroll() {
        const viewportWidth = window.innerWidth;

        if (viewportWidth > 992) {
            const scrollY = window.scrollY;
            const progress = Math.min(scrollY / 600, 1); // Smooth transition from 0 to 1

            if (navBlock) {
                const startAlpha = 0.345;
                const endAlpha   = 0.85;
                const bgAlpha    = startAlpha + (endAlpha - startAlpha) * progress;

                navBlock.style.backgroundColor = `rgba(255,255,255,${bgAlpha})`;
            }

            // Animate height of .nav_wrap_new_div
            navWraps.forEach(navWrap => {
                const maxHeight = 6.15;
                const minHeight = 4.58;
                const heightVW = maxHeight - (maxHeight - minHeight) * progress;
                navWrap.style.height = `${heightVW}vw`;
            });

            // Animate font size of .nav-link
            navLinks.forEach(link => {
                const maxFont = 2.5;
                const minFont = 2.19;
                const fontVW = maxFont - (maxFont - minFont) * progress;
                link.style.fontSize = `${fontVW}vw`;
            });

            // Animate height of .nav-logo
            if (navLogo1 ?? navLogo2) {
                const maxLogoHeight = 3.13;
                const minLogoHeight = 2.71;
                const logoHeightVW = maxLogoHeight - (maxLogoHeight - minLogoHeight) * progress;
                navLogo1.style.height = `${logoHeightVW}vw`;
                navLogo2.style.height = `${logoHeightVW}vw`;
            }

            // Animate font size of .arrow-nav
            arrowNav.forEach(arrow => {
                const maxArrowFont = 2.5;
                const minArrowFont = 2.19;
                const arrowFontVW = maxArrowFont - (maxArrowFont - minArrowFont) * progress;
                arrow.style.fontSize = `${arrowFontVW}vw`;
            });

            if (navRight) {
                const startGapNav = 3;
                const endGapNav   = 2;
                const gapVWNav    = startGapNav - (startGapNav - endGapNav) * progress;
                navRight.style.gap = `${ gapVWNav }vw`;
            }

            if (searchIcon) {
                const startWH = 2.042;
                const endWH   = 1.838;
                const whVW    = startWH - (startWH - endWH) * progress;
                searchIcon.style.height = `${ whVW }vw`;
                searchIcon.style.width = `${ whVW }vw`;
            }

            if (searchWrapper) {
                const startGap = 0.8333;
                const endGap   = 0.625;
                const gapVW    = startGap - (startGap - endGap) * progress;

                searchWrapper.style.gap = `${gapVW}vw`;
            }

            if (newButtons.length) {
                const startBtnH = 2.7;
                const endBtnH   = 2.3995;
                const btnHvw    = startBtnH - (startBtnH - endBtnH) * progress;

                newButtons.forEach(btn => {
                    btn.style.height = `${btnHvw}vw`;
                });
            }
        }

        requestAnimationFrame(animateNavbarOnScroll);
    }

    requestAnimationFrame(animateNavbarOnScroll);

    function updateTextHeights() {
        $('.tubik-button').each(function(){
            var $btn = $(this);
            var h = $btn.find('.button-text').first().outerHeight();
            $btn.data('textHeight', h);
        });
    }

    updateTextHeights();
    $(window).on('resize scroll', updateTextHeights);

    function animateButton($button) {
        if ($button.data('animating')) {
            return;
        }
        $button.data('animating', true);

        var $texts     = $button.find('.button-text');
        var textHeight = $button.data('textHeight') || $texts.first().outerHeight();
        var $active    = $texts.filter('.active');

        if (!$active.length) {
            $texts.css({ opacity: 0, transition: 'none' });
            $texts.first()
                .addClass('active')
                .css({ bottom: 0, opacity: 1, transition: 'none' });
            $button.data('animating', false);
            return;
        }

        var idxActive = $texts.index($active);
        var moveUp = idxActive === 0
            ? textHeight
            : textHeight * 2;

        $active
            .css({ bottom: moveUp + 'px', opacity: 0, transition: 'none' })
            .removeClass('active');

        var $prev = $active.prev('.button-text');
        if (!$prev.length) {
            $prev = $texts.last();
        }

        var idx = $texts.index($prev);
        var bottomVal = idx === 0 ? 0 : textHeight + 'px';

        $prev
            .addClass('active')
            .css({ bottom: bottomVal, opacity: 1, transition: 'none' });

        setTimeout(function(){
            $active.css({ bottom: -textHeight + 'px' });
            $button.data('animating', false);
        }, 400);
    }

    $('.tubik-button').hover(
        function(){
            var $btn = $(this);
            clearTimeout($btn.data('timer'));
            if (!$btn.data('animating')) {
                var timer = setTimeout(function(){
                    animateButton($btn);
                }, 50);
                $btn.data('timer', timer);
            }
        },
        function(){
            clearTimeout($(this).data('timer'));
        }
    );
    //
    //
    // function easeOutCubic(t) {
    //     return 1 - Math.pow(1 - t, 3);
    // }
    //
    // function animateButton($button) {
    //     var $text = $button.find('.button-text');
    //     var $first = $text.first();
    //     var $active = $button.find('.button-text.active');
    //
    //     if (!$active.length) {
    //         $first.addClass('active');
    //         return;
    //     }
    //
    //     $active.animate({ bottom: '120px' }, 400, function () {
    //         $active.removeClass('active').css('bottom', '-50px');
    //         $active.prev().addClass('active').css('bottom', '0');
    //         if ($active.prev().length === 0) {
    //             $text.last().addClass('active');
    //         }
    //     }).promise().done(function () {
    //         $active.css('bottom', '');
    //     }).progress(function (animation, progress) {
    //         var easedProgress = easeOutCubic(progress);
    //         animation.elem.style.bottom = (120 * easedProgress) + 'px';
    //     });
    // }
    // $('.tubik-button').hover(
    //     function () {
    //         var $button = $(this);
    //         var timer = setTimeout(function () {
    //             animateButton($button);
    //         }, 400);
    //
    //         $button.data('timer', timer);
    //     },
    //     function () {
    //         clearTimeout($(this).data('timer'));
    //     }
    // );
    //


    $(".tabs .tab-title:first").addClass("active");
    $(".tab-content:first").css("display", "block");
    $(".tabs .tab-title").click(function () {
        var el = $(this).index();
        if (!$(this).hasClass('active')) {
            $(".tabs .tab-title").removeClass("active");
            $(this).addClass("active");
            $(this).parents('.tabs-block').find('.tab-content').hide().eq(el).show();
        }
    });

    // Copy URL - single post
    var $temp = $("<input>");
    var $url = $(location).attr('href');
    $('.clipboard').on('click', function () {
        $("body").append($temp);
        $temp.val($url).select();
        document.execCommand("copy");
        $temp.remove();
        // $('.clipboard').find('svg').remove();
        $('.clipboard').append(`<svg class="copied-svg" width="72" height="26" viewBox="0 0 72 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="72" height="26" rx="10" fill="#EAEAEA"/>
<path d="M22.15 14.018C21.744 15.712 20.148 17.182 17.614 17.182C14.366 17.182 12.518 14.858 12.518 12.002C12.518 9.16 14.366 6.822 17.614 6.822C20.12 6.822 21.52 8.152 22.136 9.972H20.722C20.176 8.726 19.252 8.026 17.614 8.026C15.22 8.026 13.946 9.846 13.946 12.002C13.946 14.144 15.206 15.978 17.614 15.978C19.294 15.978 20.33 15.166 20.736 14.018H22.15ZM26.629 17.182C24.445 17.182 22.975 15.544 22.975 13.388C22.975 11.218 24.445 9.594 26.629 9.594C28.813 9.594 30.283 11.218 30.283 13.388C30.283 15.544 28.813 17.182 26.629 17.182ZM24.319 13.388C24.319 14.844 25.257 16.048 26.629 16.048C28.015 16.048 28.939 14.844 28.939 13.388C28.939 11.918 28.015 10.714 26.629 10.714C25.257 10.714 24.319 11.918 24.319 13.388ZM35.4208 9.594C37.4508 9.594 38.7388 11.106 38.7388 13.36C38.7388 15.614 37.4508 17.168 35.4208 17.168C34.1188 17.168 33.2508 16.314 32.9848 15.614H32.9708V19.8H31.5988V9.762H32.9568V11.19H32.9708C33.2368 10.462 34.1188 9.594 35.4208 9.594ZM32.9008 13.36C32.9008 14.76 33.6148 16.034 35.1548 16.034C36.6388 16.034 37.3948 14.886 37.3948 13.36C37.3948 11.834 36.5968 10.714 35.1548 10.714C33.6288 10.714 32.9008 11.974 32.9008 13.36ZM41.5454 8.446H40.1034V7.004H41.5454V8.446ZM40.0754 17V9.762H41.4334V17H40.0754ZM49.7276 14.844C49.3076 16.37 48.0896 17.182 46.4516 17.182C44.3096 17.182 42.8676 15.628 42.8676 13.346C42.8676 11.162 44.3656 9.58 46.4376 9.58C48.9576 9.58 49.8116 11.596 49.8396 13.5V13.752H44.1696C44.2816 15.208 45.1776 16.062 46.4236 16.062C47.3616 16.062 48.1456 15.698 48.3976 14.844H49.7276ZM44.1836 12.702H48.4816C48.3696 11.498 47.6976 10.672 46.4236 10.672C45.1636 10.672 44.3656 11.498 44.1836 12.702ZM54.1563 9.594C55.4723 9.594 56.3543 10.462 56.6063 11.19H56.6203V7.004H57.9783V17H56.6203V15.614H56.6063C56.3403 16.314 55.4723 17.168 54.1703 17.168C52.1403 17.168 50.8383 15.614 50.8383 13.36C50.8383 11.106 52.1403 9.594 54.1563 9.594ZM52.1963 13.36C52.1963 14.886 52.9523 16.034 54.4363 16.034C55.9763 16.034 56.6903 14.76 56.6903 13.36C56.6903 11.974 55.9623 10.714 54.4363 10.714C52.9943 10.714 52.1963 11.834 52.1963 13.36Z" fill="black"/>
</svg>`);
        setTimeout(function () {
            $('.clipboard').find('.copied-svg').remove();

        }, 1500)


        // $(".copied").text("URL copied!");

        // setTimeout(function () {
        // $(".copied").text("URL copied!");
        // $(".copied").text("URL copied!").remove();
        // }, 1500)
    })
    $('.single-article').find('h2, h3').each(function() {
        $(this).find('span').contents().unwrap();
    });
});

