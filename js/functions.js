
var transparent = true;
var window_height = $(window).height();
var navbar_height = $('nav').outerHeight() + 50;

$( document ).ready(function() {
    fixNavbar();
    fixClients();
    initMap();

    $("#siteName").fitText(1, { minFontSize: '35px', maxFontSize: '100px' });

    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });

    $(window).scroll(function(){
        fixNavbar();
    });

    if ( $(window).width() > 767 ) {
        initAnimations();
        $('.image-container').parallax({
            speed :	0.25
        });

    } else {
            $('[class*="add-animation"]').each(function(){
                $(this).css('opacity', 1);
            });
    }

    $( 'a[href^="#"]' ).on('click', function(e) {
        e.preventDefault();
        if ($(this).attr('id') == 'brand' || $(this).attr('id') == 'selectedLang') {
            $('html, body').animate({scrollTop: 0}, 900);
        } else {
            $('html, body').animate({scrollTop: $(this.hash).offset().top - navbar_height}, 900);
        }
    } );

    $('#navbarSideButton').on('click', function() {
        $('#navbarSide').addClass('reveal');
        $('.overlay').show();
    });

    $('.overlay').on('click', function(){
        $('#navbarSide').removeClass('reveal');
        $('.overlay').hide();
    });

    $('.client-selector').on('click', function(){
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        var animationName = 'animated zoomIn';
        $('[class*="client-selector"]').each(function(){
            $(this).removeClass('active');
        });

        $('[class*="testimonials"]').each(function(){
            $(this).removeClass('active');
        });

        $(this).addClass('active');

        var index = $(this).data('index');
        $('[class*="testimonials"]').each(function(i){
            if ( index == i ) {
                $('.quotes').addClass(animationName).one(animationEnd, function() {
                    $(this).removeClass(animationName);
                });
                $(this).addClass(animationName + ' active').one(animationEnd, function() {
                    $(this).removeClass(animationName);
                });
            }
        });

    });

    $('#contactButton').on('mouseenter mouseleave', function(event){
        $('.fa-paper-plane').toggleClass('animated slideInRight');
    });

    $('.work-container').on('mouseenter mouseleave', function(event){
        $(this).find('.show-gallery-overlay').removeClass('animated fadeOut');
        if (event.type == 'mouseenter'){
            $(this).find('.show-gallery-overlay').addClass('animated fadeIn');
        } else {
            $(this).find('.show-gallery-overlay').addClass('animated fadeOut');
        }

    });

    $('.work-container').on('click', function(){

        $('.work-wrapper').css('left', '-100%');
        $('.gallery').show();

        workLoad($(this));

    });

    $('.go-back').on('click',function(){
        $('.work-wrapper').css('left', '0%');
        $('.gallery').hide(800);
    });
});


function animation(arg) {
    var el            = arg[0];
    var direction     = arg[1];
    var animationType = 'fadeIn';
    if (direction == 'down') {
        el.addClass('animated ' + animationType);
    } else {
        el.removeClass('animated ' + animationType);
    }

}

function initAnimations() {
    $('[class*="add-animation"]').each(function(){

         offset_diff = 30;

        if ($(this).hasClass('title')){
            offset_diff = 110;
        }

        var waypoints = $(this).waypoint(function(direction) {
            var animationOrder = $(this.element).data('order');
            switch (animationOrder) {
                case 'first':
                    setTimeout(animation, 200, [$(this.element), direction]);
                    break;
                case 'second':
                    setTimeout(animation, 400, [$(this.element), direction]);
                    break;
                case 'third':
                    setTimeout(animation, 600, [$(this.element), direction]);
                    break;
                case 'fourth':
                    setTimeout(animation, 800, [$(this.element), direction]);
                    break;
                default:
                    setTimeout(animation, 0, [$(this.element), direction]);

            }

         }, {
           offset: window_height - offset_diff
       });
    });
}

function fixClients(){
    $('li.client-selector').each(function(i){
        if (i === 0) {
            $(this).addClass('active');
        }
    });

    $('span.client-selector').each(function(i){
        if (i === 0) {
            $(this).addClass('active');
        }
    });

    $('[class*="testimonials"]').each(function(i){
        if (i == 1) {
            $(this).addClass('active');
        }
    });
}

function fixNavbar() {
    if ( $(window).scrollTop() > window_height - 200 ) {
        if (transparent) {
            transparent = false;
            $('nav[role="navigation"]').removeClass('navbar-transparent');
            $("img").css("background-color", "#343434");
        }
    } else {
        if( !transparent ) {
            transparent = true;
            $('nav[role="navigation"]').addClass('navbar-transparent');
            $("img").css("background-color", "orange");
        }
    }
}

function workLoad($target){
    $.ajaxSetup ({ cache: false });
    var spinner  = '<div class="loader">Loading...</div>',
        newFile  = $target.data('file'),
        newHtml  = '/work/'+ newFile +'.html',
        newTitle =  $target.find('.card-title').text();

        $( '.project-load' ).html(spinner).load(newHtml);
        $( '.project-title' ).text(newTitle);
}

function initMap(){
    var myLatlng = new google.maps.LatLng(48.7938094, 2.3553952);

    var mapOptions = {
      zoom: 14,
      center: myLatlng,
      scrollwheel: false,
      disableDefaultUI: true,
      styles: [{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"},{"gamma":"1.82"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"gamma":"1.96"},{"lightness":"-9"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"on"},{"lightness":"25"},{"gamma":"1.00"},{"saturation":"-100"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#ffaa00"},{"saturation":"-43"},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"simplified"},{"hue":"#ffaa00"},{"saturation":"-70"}]},{"featureType":"road.highway.controlled_access","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"on"},{"saturation":"-100"},{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"saturation":"-100"},{"lightness":"40"},{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"gamma":"0.80"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"off"}]}]
    };

    var map = new google.maps.Map(document.getElementById("contactUsMap"), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        title:"4 Rue René Balayn, 94800 Villejuif, France"
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);
}


$.fn.parallax = function(options) {

    var windowHeight = $(window).height();

    // Establish default settings
    var settings = $.extend({
        speed        : 0.15
    }, options);

    // Iterate over each object in collection
    return this.each( function() {

        // Save a reference to the element
        var $this = $(this);

        // Set up Scroll Handler
        $(document).scroll(function(){
            if ( $(window).width() < 767 ) {
                return false;
            }
            var scrollTop = $(window).scrollTop();
            var offset = $this.offset().top;
            var height = $this.outerHeight();

            // Check if above or below viewport
            if (offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
                return;
            }

            var yBgPosition = Math.round((offset - scrollTop) * settings.speed);

            // Apply the Y Background Position to Set the Parallax Effect
            $this.css('background-position', 'center ' + yBgPosition + 'px');

        });
    });
};

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {
    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('load.fittext orientationchange.fittext', resizer);
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );
