$(function () {

  "use strict";

  var wind = $(window);

  //smooth scroll
  $.scrollIt({
    upKey: 38,             // key code to navigate to the next section
    downKey: 40,           // key code to navigate to the previous section
    easing: 'linear',      // the easing function for animation
    scrollTime: 1000,       // how long (in ms) the animation takes
    activeClass: 'active', // class given to the active nav element
    onPageChange: null,    // function(pageIndex) that is called when page is changed
  });


  // Navbar
  var navBtn = $('.nav-btn');
  function toggleNav() {
      navBtn.toggleClass('open');
      $('nav').toggleClass('open');
      $('.container').toggleClass('open');
  }
  navBtn.click(function() {
      toggleNav();
  })
  $('nav ul li a').click(function(e) {
      toggleNav();
  })


  // typejs
  $('.info h4 span').typed({
      strings: ["DESIGNER","DEVELOPER","CREATIVE"],
      loop: true,
      startDelay: 1000,
      backDelay: 1500
  });



  // magnificPopup
  $('.portfolio .link').magnificPopup({
    delegate: 'a',
    type: 'image'
  });

  // stellar
  wind.stellar();

  // isotope
  $('.gallery').isotope({
    // options
    itemSelector: '.item-img'
  });

  var $gallery = $('.gallery').isotope({
    // options
  });

  // filter items on button click
  $('.filtering').on( 'click', 'button', function() {

      var filterValue = $(this).attr('data-filter');

      $gallery.isotope({ filter: filterValue });

  });

  $('.filtering').on( 'click', 'button', function() {

      $(this).addClass('active').siblings().removeClass('active');

  });

  //** owl carousel cliant
  var sync1 = $("#sync1");
  var sync2 = $("#sync2");
  var slidesPerPage = 3; //globaly define number of elements per page
  var syncedSecondary = true;

    sync1.owlCarousel({
      items : 1,
      slideSpeed : 2000,
      autoplay: true,
      dots: false,
      loop: true,
      responsiveRefreshRate : 200,
    }).on('changed.owl.carousel', syncPosition);

    sync2
      .on('initialized.owl.carousel', function () {
        sync2.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
      items : slidesPerPage,
      dots: false,
      smartSpeed: 200,
      slideSpeed : 500,
      slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
      responsiveRefreshRate : 100
    }).on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
    //if you set loop to false, you have to restore this next line
    //var current = el.item.index;

    //if you disable loop you have to comment this block
    var count = el.item.count-1;
    var current = Math.round(el.item.index - (el.item.count/2) - .5);

    if(current < 0) {
      current = count;
    }
    if(current > count) {
      current = 0;
    }

    //end block

    sync2
    .find(".owl-item")
    .removeClass("current")
    .eq(current)
    .addClass("current");
    var onscreen = sync2.find('.owl-item.active').length - 1;
    var start = sync2.find('.owl-item.active').first().index();
    var end = sync2.find('.owl-item.active').last().index();

    if (current > end) {
      sync2.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
      sync2.data('owl.carousel').to(current - onscreen, 100, true);
    }
  }

  function syncPosition2(el) {
    if(syncedSecondary) {
      var number = el.item.index;
      sync1.data('owl.carousel').to(number, 100, true);
    }
  }

  sync2.on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).index();
    sync1.data('owl.carousel').to(number, 300, true);
  });


  $('.parallax').sparallax();


  // init the validator
  // validator files are included in the download package
  // otherwise download from http://1000hz.github.io/bootstrap-validator

  $('#contact-form').validator();


  // when the form is submitted
  $('#contact-form').on('submit', function (e) {

      // if the validator does not prevent form submit
      if (!e.isDefaultPrevented()) {
          var url = "contact.php";

          // POST values in the background the the script URL
          $.ajax({
              type: "POST",
              url: url,
              data: $(this).serialize(),
              success: function (data)
              {
                  // data = JSON object that contact.php returns

                  // we recieve the type of the message: success x danger and apply it to the
                  var messageAlert = 'alert-' + data.type;
                  var messageText = data.message;

                  // let's compose Bootstrap alert box HTML
                  var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

                  // If we have messageAlert and messageText
                  if (messageAlert && messageText) {
                      // inject the alert to .messages div in our form
                      $('#contact-form').find('.messages').html(alertBox);
                      // empty the form
                      $('#contact-form')[0].reset();
                  }
              }
          });
          return false;
      }
  });


  // Preloader

  $(window).on("load",function (){
      $(".loading").fadeOut(500);
  });

})
