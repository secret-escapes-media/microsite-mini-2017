(function ($, root, undefined) {$(function () {'use strict'; // on ready start
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////
//        General
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


function GetQueryStringParams(sParam){
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++){
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam){
      return sParameterName[1];
    }
  }
}​


// launches modal if query string
var modalQuery = GetQueryStringParams('modal');

if (modalQuery) {
  var targetModal = modalQuery;
  $('body').addClass('disable-scroll');
  $('#modal-' + targetModal).fadeIn('250', function(){
    $(this).removeClass('is-closed').addClass('is-open');
  });
}


///////////////////////////////////////
//    Sticky header
///////////////////////////////////////

$(window).scroll(function(){
  var st = $(document).scrollTop();
  var bannerH = $('.banner').outerHeight();
  var navH = $('.microsite__navigation').outerHeight();
  var offset = bannerH - navH;
  if(st > offset){
    $('.microsite__navigation').addClass('microsite__navigation--stuck');
  }else{
    $('.microsite__navigation').removeClass('microsite__navigation--stuck');
  }
});


///////////////////////////////////////
//    Competition page map
///////////////////////////////////////

// Map  sizing
function journey_map_size(){
  var map = $('.journey__map-content');
  var wh = $(window).height();
  var map_width = map.outerWidth();
  map.css({
    'height': wh - 105 + 'px',
    'width': map_width + 'px'
  });
};
$(document).ready(function(){ journey_map_size(); });
$(window).resize(function(){ journey_map_size(); });


$(document).scroll(function(){

  if($('body').hasClass('competition')){

    var st = $(document).scrollTop();
    var wh = $(window).height();
    var map = $('.journey__map');
    var map_offset = $('.journey').offset().top - 130;
    // End point
    var oranamara = $('#oranamara').offset().top;
    var map_end = oranamara - wh - 45;

    if( st > map_offset && st < map_end ){
      map.addClass('journey__map--fixed');
      if( st < map_end ){
        map.removeClass('journey__map--end');
      }
    }else{
      map.removeClass('journey__map--fixed');
      if( st > map_end ){
        map.addClass('journey__map--end');
      }
    }

  }

});


///////////////////////////////////////
//    Modal Carousel
///////////////////////////////////////

function modal_slider_next(){
  var parent    = $('#modal__slider');
  var current   = parent.find('.slide').not(".modal__item-inactive");
  var next = current.next('.slide');

  if( next.length == 0 ) {
    var next = parent.find('.slide').first();
  }
  current.addClass('modal__item-inactive');
  next.removeClass('modal__item-inactive');
}

function modal_slider_previous(){
  var parent    = $('#modal__slider');
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


///////////////////////////////////////
//    Generic Carousel
///////////////////////////////////////

function slider_next(){
  var parent    = $('#slider');
  var current   = parent.find('.slide').not(".slide--inactive");
  var next = current.next('.slide');

  if( next.length == 0 ) {
    var next = parent.find('.slide').first();
  }
  current.fadeOut();
  next.fadeIn();
  current.addClass('slide--inactive');
  next.removeClass('slide--inactive');
}

function slider_previous(){
  var parent    = $('#slider');
  var current   = parent.find('.slide').not(".slide--inactive");
  var previous = current.prev('.slide');

  if( previous.length == 0 ) {
    var previous = parent.find('.slide').last();
  }
  current.fadeOut();
  previous.fadeIn();
  current.addClass('slide--inactive');
  previous.removeClass('slide--inactive');
}

$('#slider__next').click(function(){ slider_next(); });
$('#slider__previous').click(function(){ slider_previous(); });

$(document).ready(function(){
  setInterval(function(){ slider_next(); }, 6000);
});

$(document).on('keyup', function(e) {
  if(e.which === 37){
    slider_previous();
  }else if(e.which === 39) {
    slider_next();
  }
});



///////////////////////////////////////
//    Equal height offers
///////////////////////////////////////

function offer_resize() {
  // Get an array of all element heights
  var elementHeights = $('.offer--fixed-height').map(function() {
    return $(this).height();
  }).get();

  // Math.max takes a variable number of arguments
  // `apply` is equivalent to passing each height as an argument
  var maxHeight = Math.max.apply(null, elementHeights);

  // Set each height to the max height
  $('.offer--fixed-height').height(maxHeight);
}

$(document).ready(function(){ offer_resize(); });
$(window).resize(function(){ offer_resize(); });



///////////////////////////////////////////////////////////////////////////////
});})(jQuery, this); // on ready end