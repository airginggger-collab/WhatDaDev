(function () {


  document.querySelector('.blog-footer .hire-us a').addEventListener('click', function( event ) {
    ga('send', 'event', 'goToContact', 'click');
  });


  function sliderPadding() {
    var conW = $('.container').width();
    var winW = document.body.clientWidth;
    var res  = winW - conW;
    return res/2;
  }


  $('.popular-slider').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    useTransform: true,
    customPadding: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
        slidesToShow: 1,
        slidesToScroll: 1
        }
      }
    ]
  });


  setTimeout(function () {
    aspectWidthHeight('.popular-article .item');
  },1000);


  var $carouselPopular = $('.popular-slider');
  $(document).on('keydown', function(e) {
    if(e.keyCode == 37) {
      $carouselPopular.slick('slickPrev');
    }
    if(e.keyCode == 39) {
      $carouselPopular.slick('slickNext');
    }
  });


    $(window).on('resize',function () {
        $('.popular-slider .slick-list').css('padding','0px ' + sliderPadding() + 'px');
        aspectWidthHeight('.popular-article .item');
    });


    // init slider for mobile
    if(window.matchMedia('(max-width: 544px)').matches)
    {

        $(".m-book-slider").slick({
          dots: true,
        });

    }


    // fix for blog page "padding for slider"

    $('.popular-slider .slick-list, .company-slider .slick-list').css('padding-left', (document.body.clientWidth-$('.container').width())/2);
    $('.popular-slider .slick-list, .company-slider .slick-list').css('padding-right', (document.body.clientWidth-$('.container').width())/2);

    $( window ).on('resize',function() {
      $('.popular-slider .slick-list, .company-slider .slick-list').css('padding-left', (document.body.clientWidth-$('.container').width())/2);
      $('.popular-slider .slick-list, .company-slider .slick-list').css('padding-right', (document.body.clientWidth-$('.container').width())/2);
    });


  // Contact form



  // if($(window).width() > 992 && $('.page-template-blog').length < 1) {
  //     if(templateUrl.mac == 'yes') {
  //         $("html").easeScroll({stepSize:60});
  //     } else {
  //         $("html").easeScroll();
  //     }
  // }

  $(window).on('load', function () {
    // new Smooth()
  })


  //gereration user id to make every letter individualy
  $('#user-id').val(Date.now());


  //END Contact form


    // header trigger "squeeze on scroll"

    $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
        $('.header-home, .header-blog').addClass('squeeze');
        $('.home__bottom-bar').addClass('slide-out');
      } else {
        $('.header-home, .header-blog').removeClass('squeeze');
        $('.home__bottom-bar').removeClass('slide-out');
      }

    });


    function aspectWidthHeight(selector) {
      $(selector).css('height', $(selector).innerWidth() + 'px');
    }

    $(window).on('resize load',function () {
      aspectWidthHeight('.last-article .big-article');
      aspectWidthHeight('.last-article .small-article .for-image');

      aspectWidthHeight('.bottom-article .for-image');
    });

    $('.header-blog .search').on('click',function () {
      if($(window).width() > 1024) {
        $('.search-input').focus();
      }
    });
    $('.header-blog .search,.blog-search .close-search').on('click',function (e) {
      $('.blog-search').toggleClass('blog-search-active');
      // $('section, header').toggleClass('search-blur');
      setTimeout(function() {
        $('body').toggleClass('overflow-h-bg');
        if ($('body').hasClass('overflow-h-bg')){
          $('.blog-search .search-input').focus();
        }
      }, 100);

    });


    $(window).on('load resize',function () {
      $('.for-live-search').css('max-height', document.body.clientHeight - $('.container-p').innerHeight() + 'px');
    });

    $('.blog-search .word-for-search span').on('click',function (e) {
      var word = $(this).html();
      $('.search-input').val(word).keyup()
    });

    $('.search-input').on('keyup',function (e) {

      var word = $(this).val();
      if(word.length < 3) {
        return
      }
      var block = $('.for-live-search');
      var template = _.template($('#live-search').html());

      setTimeout(function(){


      $.ajax({
        url      : templateUrl.url + '/livesearch.php',
        type     : 'post',
        data     : 'word=' + word,
        dataType : 'json',
        success  : function (data) {

          $('.for-live-search').html('');


          if(data.length != 0) {
            console.log(data);
            block.append(template({data: data,error: false, word: word}));
          } else {
            block.append(template({data: data,error: true, word: word}));
          }

          TweenMax.staggerFromTo($('.live-search-block,.live-search-bottom'), 1,
            {
              y: '200',
              opacity: 0,
              ease:Power3.easeOut,
            },
            {
              y: '0',
              opacity: 1,
              ease:Power3.easeOut,
              delay: 0
            },0.1);

        }
      });


    },700);


      if(e.which == 13) {
        $('#searchform').submit();
      }
    });



    $('.single-article .content p').each(function () {
      if($(this).find('img').length) {
        $(this).addClass('full-img');
      }
      if($(this).find('em').length) {
          $(this).addClass('full full-em');
      }
    });

    $('.single-article .content blockquote').each(function () {
      $(this).find('p').addClass('full');
    });

    // $('.blog-subscribe').click(function() {
    //   $('html, body').animate({
    //     scrollTop: $(".subscribe-block-2").offset().top - 100
    //   }, 2000);
    // });
  if($('.single-article').length > 0) {
    $('.content p').each(function () {
        if($(this).children().length > 0 || $(this).html().trim().length > 6) {

        } else {
          $(this).css('display','none')
        }
    });
    $(window).on('scroll', function () {
      var hs = $('.content hr').offset().top;
      console.log(hs);
      console.log($(window).scrollTop());
      if (hs < $(window).scrollTop()) {
        $('.at4-share').addClass('at4-share-active');
        $('.at-share-dock-outer').addClass('at4-share-active-2');
      } else {
        $('.at-share-dock-outer').removeClass('at4-share-active-2');
        $('.at4-share').removeClass('at4-share-active');
      }

    });
  }




  function onHeight(arch, element) {
    var nav = $(element),
        animateTime = 500,
        navLink = $(arch);
        navLink.click(function(){
          if(nav.height() === 0){
            autoHeightAnimate(nav, animateTime);
          } else {
            nav.stop().animate({ height: '0' }, animateTime);
          }
        });
  }
  function autoHeightAnimate(element, time){
    var curHeight = element.height(), // Get Default Height
        autoHeight = element.css('height', 'auto').height(); // Get Auto Height
    element.height(curHeight); // Reset to Default Height
    element.stop().animate({ height: autoHeight }, time); // Animate to Auto Height
  }

  onHeight('.case-on-1','.case-block-1');
  onHeight('.case-on-2','.case-block-2');
  onHeight('.case-on-3','.case-block-3');
  onHeight('.case-on-4','.case-block-4');




  $(window).on('load resize',function () {
    if ($(window).width() < 768) {
      $('.services .information p span,.books .content .text span').css('display','inline');
    } else {
      $('.services .information p span,.books .content .text span').css('display','inline-block');
    }

  });


    $('.header-blog .black-button, .big-article img,.small-article img, .services-top .list .item, .services-top .list p, .watch-button, .default-ar, .vacancy-name').addClass('transition-tubik');
    $('.header-home .logo,.header-home .logo img, .menu a, .header-home, .header-home .menu ul li a, .header-blog, .biggest-article img, .header-blog .logo-link span, .header-blog .logo-link .logo').addClass('transition-tubik-300');





})();


const paragraphs = document.querySelectorAll('.single-article .content p');
paragraphs.forEach((paragraph) => {
  if (paragraph.querySelector('iframe')) {
    paragraph.classList.add('has-iframe');
  }
});






