$(window).scroll(function() {
    if ($(document).scrolltop() > 50) {
        $('nav').addClass('shrink');
    } else {
        $('nav').removeClass('shrink');
    }
});