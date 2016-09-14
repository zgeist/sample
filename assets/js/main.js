(function(){

    'use strict';

    var topNav = $('#top-nav'),
        navBar = $('.navbar'),
        btnUp = $('.btn-up'),
        loader = $('#loader'),
        body = $('body'),
        searchField = $('.search-form input');

    loader.one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(){

        setTimeout(function(){
            $('.header-features').addClass('show-up');
        }, 1000)

    });


    $(window).on('load', function(){

        setTimeout(function(){
            loader.addClass('hide');
            body.removeClass('preloader');
        }, 1500);

    });

    /* Initialize carousels */

    $('.carousel').slick({
        slidesToShow: 1,
        centerPadding: '',
        variableWidth: true,
        speed: 500,
        asNavFor: '.features-carousel',
        prevArrow: $('.note-slider-control .slider-prev'),
        nextArrow: $('.note-slider-control .slider-next')
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide){

        $('.note-slider-control > span').text(slick.$slides[nextSlide].getAttribute('data-title'))

    });

    $('.features-carousel').slick({
        slidesToShow: 1,
        asNavFor: '.carousel',
        fade: true,
        speed: 500,
        prevArrow: $('.note-slider-control .slider-prev'),
        nextArrow: $('.note-slider-control .slider-next')
    });

    $('.testimonials-carousel').slick({
        slidesToShow: 1,
        arrows: false,
        dots: true,
        speed: 500,
        fade: true
    });

    $('.screenshot-carousel').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        speed: 500,
        dots: true,
        responsive: [
            {
                breakpoint: 1201,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('form.contact-form').on('submit', function(e) {
        /* Listen all contact form on submit event */

        $.ajax({
            type: "post",
            url: "sendmail.php",
            data: $(this).serializeArray(),
            error: function(data){
                alertify.alert(JSON.parse(data.responseText).message, function(){}, 'error');
            },
            success: function(data){
                alertify.alert(data.message, function(){}, 'success');
            }
        });

        return false;
    });

    $('.subscribe').each(function(i, form) {
        var action;
        if (action = $(form).attr('action')) {
            return $(form).ajaxChimp({
                url: action,
                callback: function(res) {
                    if (res.result === "success") {
                        alertify.alert(res.msg, function(){}, 'success');
                    }
                    if (res.result === "error") {
                        alertify.alert(res.msg, function(){}, 'error');
                    }
                }
            });
        }
    });

    $('#main-navbar').onePageNav({
        currentClass: "active",
        changeHash: false
    });

    $('.mobile-menu-btn').on('click', function(e){

        $(this).toggleClass('active');
        navBar.toggleClass('open');
        body.toggleClass('no-scroll');

    });

    btnUp.on('click', function(e){

        $('html, body').animate({
            scrollTop: 0
        }, 1000, 'swing')

        return false;
    });

    function headerFix(){

        topNav.toggleClass('overlay', window.scrollY > 60);

        btnUp.length ? btnUp.toggleClass('show', window.scrollY > 700) : null;

        if(window.innerWidth <= 768){
            navBar.css({
                height: window.innerHeight - topNav.height()
            });
        }else{
            navBar.css({
                height: ""
            });
        }

        requestAnimationFrame(headerFix);
    }

    headerFix();

    $('.search-btn').on('click', function(e){

        navBar.toggleClass('search-bar-on');

        searchField[0].focus();

        searchField.one('blur', function(){
            navBar.toggleClass('search-bar-on');
        });

        body.off('click.search').on('click.search', function(e){
            if(e.target.tagName.toLowerCase() !== 'input'){
                navBar.removeClass('search-bar-on');
            }
        });

        return false;
    });

    $('.collapse-zone-control button').on('click', function(e){

        $('html, body').animate({
            scrollTop: $(e.target.getAttribute('data-target')).offset().top - 100
        }, 1000, 'swing');

        $(e.target.getAttribute('data-target')).toggleClass('out');

        return false;
    });

})();