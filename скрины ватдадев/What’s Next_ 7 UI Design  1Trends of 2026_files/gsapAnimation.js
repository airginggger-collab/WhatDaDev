(function () {
    'use strict'

    var homeController = new ScrollMagic.Controller();

    var worksList = ScrollMagic.Scene({
        triggerElement: '.more-article-tag',
        offset: 0,
        reverse: true
    }).setTween(TweenMax.fromTo($('.addthis-smartlayers'),1,
        {
            x:'0%',
        },
        {
            x:'100%',
        }
    ),1).addTo(homeController);




    var windowHeight = window.innerHeight;

    var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if(is_safari) {
        $('.top-home .content .for-anim-1 span').css('margin-top','0px');
    }

    if($(window).width() > 767) {

        // TweenMax.staggerFromTo($('.logo img, .menu a'), 2,
        //     {
        //         x: '-100%',
        //         opacity: 1,
        //         ease: Power3.easeOut,
        //     },
        //     {
        //         x: '0%',
        //         opacity: 1,
        //         ease: Power3.easeOut,
        //         onComplete: function () {
        //             $('.top-home .content').css('overflow', 'visible');
        //         }
        //     }, 0.1);

        // TweenMax.fromTo($('#canvas-dog'),1,
        //     {
        //         opacity: 0,
        //     },
        //     {
        //         opacity: 1,
        //         delay: 2,
        //     }
        // )

        TweenMax.staggerFromTo($('.top-home .content .bottom'), 2,

            {
                opacity: 0,
                ease: Power3.easeOut,
            },
            {
                opacity: 1,
                ease: Power3.easeOut,
                delay: 2,

            }, 0.1);

        TweenMax.staggerFromTo($('.top-home .content .for-anim-2 span'), 1,

            {
                y: '200%',
                ease: Power3.easeOut,
                onComplete: function () {
                    $('.top-home .content').css('overflow', 'visible');

                }
            },
            {
                y: '0%',
                ease: Power3.easeOut,
                delay: 1,
                // onComplete: function () {
                //     TweenMax.fromTo($('#canvas-dog'),1,
                //         {
                //             opacity: 0,
                //         },
                //         {
                //             opacity: 1,
                //         }
                //     )
                // }
            }, 0.3);

        TweenMax.staggerFromTo($('.top-home .content .for-anim-1 span i'), 1,
            {
                y: '200%',
                ease: Power3.easeOut,
            },
            {
                y: '0%',
                ease: Power3.easeOut,
                delay: 0
            }, 0.3);


        TweenMax.staggerFromTo($('.price-top h1 span i'), 1,
            {
                y: '200%',
                ease: Power3.easeOut,
            },
            {
                y: '0%',
                ease: Power3.easeOut,
                delay: 0.3
            }, 0.3);

            TweenMax.staggerFromTo($('.price-top p span'), 1,
            {
                y: '200%',
                ease: Power3.easeOut,
            },
            {
                y: '0%',
                ease: Power3.easeOut,
                delay: 1
            }, 0.3);

            TweenMax.staggerFromTo($('.price-top img'), 2,
            {
                opacity: '0',
                y: '10%',
                ease: Power3.easeOut,
            },
            {
                opacity: '1',
                y: '0%',
                ease: Power3.easeOut,
                delay: 1.8
            }, 1);


        var worksList = new ScrollMagic.Scene({
            triggerElement: '.home .information h2',
            offset: -350,
            reverse: false
        }).setTween(TweenMax.fromTo($('.services .information h2, .services .information .border, .services .information p span'), 0.7,
            {
                y: 200,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1
            }, 0.1)).addTo(homeController);

        var worksList = new ScrollMagic.Scene({
            triggerElement: '.books .content h2',
            offset: -350,
            reverse: false
        }).setTween(TweenMax.fromTo($('.books .content h2, .books .content .border, .books .content p span'), 0.7,
            {
                y: 200,
                opacity: 0,
                ease: Power4.easeOut,
            },
            {
                y: 0,
                opacity: 1,
                ease: Power4.easeOut,

            }, 0.1)).addTo(homeController);
    }
    // TweenMax.staggerFromTo($('.logo img, .menu a'), 2, 
    //     {
    //         x: '-100%',
    //         opacity: 1,
    //         ease:Power3.easeOut,
    //     },
    //     {
    //         x: '0%',
    //         opacity: 1, 
    //         ease:Power3.easeOut,
    //         onComplete: function () {
    //             $('.top-home .content').css('overflow','visible');
    //         }
    //     },0.1);



    if($(window).width() > 767) {

        var worksList = new ScrollMagic.Scene({
            triggerElement: '.home .information h2',
            offset: -350,
            reverse: false
        }).setTween(TweenMax.fromTo($('.services .information h2, .services .information .border, .services .information p span'), 0.7,
            {
                y: 200,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1
            }, 0.1)).addTo(homeController);

        var worksList = new ScrollMagic.Scene({
            triggerElement: '.books .content h2',
            offset: -350,
            reverse: false
        }).setTween(TweenMax.fromTo($('.books .content h2, .books .content .border, .books .content p span'), 0.7,
            {
                y: 200,
                opacity: 0,
                ease: Power4.easeOut,
            },
            {
                y: 0,
                opacity: 1,
                ease: Power4.easeOut,

            }, 0.1)).addTo(homeController);
    }

    // $('.app-item').each(function(){
    //     if($('.home, .page-template-works').length > 0 )
    //     var currentElement = this;
    //     var offset = document.body.clientHeight/2 - document.body.clientHeight
    //     var $mask = $(this).find('.animate-mask');
    //     var $mask2 = $(this).find('.animate-mask-2');
    //     var $content = $(this).find('.content');
    //
    //     var worksList = new ScrollMagic.Scene({
    //         triggerElement: currentElement,
    //         offset: offset + 200,
    //         reverse: false
    //     }).setTween(TweenMax.staggerFromTo($(this),0.5,
    //         {
    //             y: 0,
    //             ease:Power1.easeOut,
    //         },
    //         {
    //             y:0,
    //             ease:Power1.easeOut,
    //             onComplete: function () {
    //                 TweenMax.fromTo($mask2,0.5,
    //                     {
    //                         height: '100%',
    //                         ease:Power3.easeOut,
    //                     },
    //                     {
    //                         height: '0%',
    //                         ease:Power3.easeOut,
    //                         onComplete: function () {
    //                             TweenMax.fromTo($mask,0.5,
    //                                 {
    //                                     height: '100%',
    //                                     ease:Power3.easeOut,
    //                                 },{
    //                                     height: '0%',
    //                                     ease:Power3.easeOut,
    //                                     onComplete: function () {
    //                                         TweenMax.fromTo($content,1.5,
    //                                             {
    //                                                 opacity: 0,
    //                                                 ease:Power3.easeOut,
    //                                             },
    //                                             {
    //                                                 opacity: 1,
    //                                                 ease:Power3.easeOut,
    //                                             },0.1);
    //                                     }
    //                                 })
    //                         }
    //                     },0.1);
    //             }
    //         })).addTo(homeController);
    // });



    if($(window).width() > 767) {


        var worksList = new ScrollMagic.Scene({
            triggerElement: '.choices .col-6',
            offset: -350,
            reverse: false
        }).setTween(TweenMax.staggerFromTo($('.choices .col-12'), 1,
            {
                y: 200,
                opacity: 0,
                ease: Power4.easeOut,
            },
            {
                y: 0,
                opacity: 1,
                ease: Power4.easeOut,
            }, 0.15)).addTo(homeController);

        var worksList = new ScrollMagic.Scene({
            triggerElement: '.books .list .col-md-4',
            offset: windowHeight - windowHeight - windowHeight / 3,
            reverse: false
        }).setTween(TweenMax.staggerFromTo($('.books .list .col-md-4'), 1,
            {
                y: 100,
                opacity: 0,
                ease: Power3.easeOut,
            },
            {
                y: 0,
                opacity: 1,
                ease: Power3.easeOut,
            }, 0.15)).addTo(homeController);
    }



    var worksList = new ScrollMagic.Scene({
        triggerElement: '.social-info-wrap',
        triggerHook: 'onLeave',
        duration: '100%',
        reverse: true
    }).setTween(TweenMax.staggerFromTo($('.next-page-mask'),1,
        {
            opacity: 0.7,
            ease:Power3.easeOut,
        },
        {
            opacity: 0,
            ease:Power3.easeOut,
        },0)).addTo(homeController);




// fix flashing -next-page- on ipad
        var worksList = new ScrollMagic.Scene({
            triggerElement: '.social-info-wrap',
            triggerHook: 'onStart',
            offset: -300,
            reverse: true
        }).setTween(TweenMax.staggerFromTo($('.next-page'),0.1,
            {
                opacity: 0,
                ease:Power3.easeOut,
            },
            {
                opacity: 1,
                ease:Power3.easeOut,
            },0)).addTo(homeController);


    // var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});

    // // build scenes
    // new ScrollMagic.Scene({triggerElement: "#parallax1"})
    //                 .setTween("#parallax1 > div", {y: "80%", ease: Linear.easeNone})
    //                 .addIndicators()
    //                 .addTo(controller);

    // new ScrollMagic.Scene({triggerElement: "#parallax2"})
    //                 .setTween("#parallax2 > div", {y: "80%", ease: Linear.easeNone})
    //                 .addIndicators()
    //                 .addTo(controller);

    // new ScrollMagic.Scene({triggerElement: "#parallax3"})
    //                 .setTween("#parallax3 > div", {y: "80%", ease: Linear.easeNone})
    //                 .addIndicators()
    //                 .addTo(controller);


})();


window.onload = function () {



};


