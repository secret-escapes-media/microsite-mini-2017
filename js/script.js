(function ($, root, undefined) {$(function () {'use strict'; // on ready start
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////
//        general
///////////////////////////////////////

  // css tricks snippet - http://css-tricks.com/snippets/jquery/smooth-scrolling/
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 45
          }, 500);
          return false;
        }
      }
    });
  });

  // inserts current year
  $('.js-year').html(new Date().getFullYear());

  // detects touch device
  if ("ontouchstart" in document.documentElement){
    $('html').addClass('touch');
  }


///////////////////////////////////////
//        Navigation
///////////////////////////////////////

  // mobile nav toggle open & close
  $('.js-toggle-mobile-nav').on('click', function(e) {
    $('.mobile-nav').toggleClass('is-open').toggleClass('is-closed');
  });

  // current page nav highlight
  var currentPage = $('body').data('current-page');
  $('.' + currentPage + ' .site-nav__item--' + currentPage).addClass('site-nav__item--current');
  $('.' + currentPage + ' .banner__navigation__item--' + currentPage).addClass('banner__navigation__item--current');


///////////////////////////////////////
//      SVG image swap
///////////////////////////////////////

  // finds image with class and swaps .png with .svg in img source string
  if (Modernizr.svgasimg) {
    var svgSwap = $('img.js-svg-swap');
    svgSwap.each( function() {
      var currentSrc = $(this).attr('src'),
          newSrc = currentSrc.replace('.png', '.svg');
      $(this).attr('src', newSrc);
    });
  }


///////////////////////////////////////
//      Parallax
//      [ example: <div class="parallax" data-parallax-speed="0.2"> ]
///////////////////////////////////////

  // $(document).scroll(function(){
  //   var scrolled = $(document).scrollTop();
  //   $('.parallax').each(function(){
  //     var speed = $(this).attr('data-parallax-speed');
  //     var offset = $(this).offset();
  //     var parallax = -(scrolled - offset.top) * speed ;
  //     $(this).css('background-position', 'center ' + parallax + 'px');
  //   });
  // });




///////////////////////////////////////
//    Generic modal
///////////////////////////////////////

var modal          = $('.js-modal'),
    modalLaunchBtn = $('.js-open-modal'),
    modalCloseBtn  = $('.js-close-modal'),
    modalCloseAreas  = $('.modal__content, .js-modal');

modalLaunchBtn.click(function(){

  var targetModal = $(this).attr('data-modal');
  var modalItem = $(this).attr('data-modal-item');

  if(modalItem){
    $('.modal__item').addClass('modal__item-inactive');
    $('#modal__item-' + modalItem ).removeClass('modal__item-inactive');
  }

  // disable scrolling on background content (doesn't work iOS)
  $('body').addClass('disable-scroll');
  // // open modal
  $('#modal-' + targetModal).fadeIn('250', function(){
    $(this).removeClass('is-closed').addClass('is-open');
  });

});

// closes modal
function modalClose(event){
  event.preventDefault();
  // enable scrolling
  $('body').removeClass('disable-scroll');
  // close modal with fade
  modal.fadeOut('250', function(){
    $(this).removeClass('is-open').addClass('is-closed');
  });
}

// closes modal on close icon click
modalCloseBtn.on('click', function(event) {
  modalClose(event);
});

// closes modal on background click
modalCloseAreas.on('click', function(event) {
  if (event.target !== this){
    return;
  }
  modalClose(event);
});

// closes modal on escape key press
$(document).keyup(function(event) {
   if (event.keyCode == 27) {
     modalClose(event);
    }
});


///////////////////////////////////////
//    Sticky header
///////////////////////////////////////

$(window).scroll(function(){
  var st = $(document).scrollTop();
  var bannerH = $('.banner').outerHeight();
  var navH = $('.banner__navigation').outerHeight();
  var offset = bannerH - navH;
  if(st > offset){
    $('.banner__navigation').addClass('banner__navigation--stuck');
  }else{
    $('.banner__navigation').removeClass('banner__navigation--stuck');
  }
});


///////////////////////////////////////
//    Competition page map
///////////////////////////////////////

// Map  sizing
function competition_map_size(){
  var map = $('.competition-feed__map-content');
  var wh = $(window).height();
  var map_width = map.outerWidth();
  map.css({
    'height': wh - 105 + 'px',
    'width': map_width + 'px'
  });
};
$(document).ready(function(){ competition_map_size(); });
$(window).resize(function(){ competition_map_size(); });


$(document).scroll(function(){

  if($('body').hasClass('competition')){

    var st = $(document).scrollTop();
    var wh = $(window).height();
    var map = $('.competition-feed__map');
    var map_offset = $('.competition-feed').offset().top - 105;
    // End point
    var oranamara = $('#oranamara').offset().top;
    var map_end = oranamara - wh - 45;

    if( st > map_offset && st < map_end ){
      map.addClass('competition-feed__map--fixed');
      if( st < map_end ){
        map.removeClass('competition-feed__map--end');
      }
    }else{
      map.removeClass('competition-feed__map--fixed');
      if( st > map_end ){
        map.addClass('competition-feed__map--end');
      }
    }

  }

});


///////////////////////////////////////
//    Carousel
///////////////////////////////////////

function modal_slider_next(){
  var parent    = $('#modal_slider');
  var current   = parent.find('.slide').not(".modal__item-inactive");
  var next = current.next('.slide');

  if( next.length == 0 ) {
    var next = parent.find('.slide').first();
  }
  current.addClass('modal__item-inactive');
  next.removeClass('modal__item-inactive');
}

function modal_slider_previous(){
  var parent    = $('#modal_slider');
  var current   = parent.find('.slide').not(".modal__item-inactive");
  var previous = current.prev('.slide');

  if( previous.length == 0 ) {
    var previous = parent.find('.slide').last();
  }
  current.addClass('modal__item-inactive');
  previous.removeClass('modal__item-inactive');
}


$('#modal_slider--next').click(function(){ modal_slider_next(); });
$('#modal_slider--previous').click(function(){ modal_slider_previous(); });

$(document).on('keyup', function(e) {
  if(e.which === 37){
    modal_slider_previous();
  }else if(e.which === 39) {
    modal_slider_next();
  }
});



///////////////////////////////////////////////////////////////////////////////
});})(jQuery, this); // on ready end