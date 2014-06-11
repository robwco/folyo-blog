showWidgetOnThisPage = true

$(function(){

  // Google Analytics

  var trackEvent = function (category, action, label) {
    console.log('Tracking Event: '+category+', '+action+', '+label);
    ga('send', {
      'hitType': 'event',          // Required.
      'eventCategory': category,   // Required.
      'eventAction': action,      // Required.
      'eventLabel': label,
      'hitCallback': function () {
        // put any callback here
      }
    });
  }

  // tracker = new Boba({
  //   siteName: 'Folyo Blog',
  //   pageName: $('title').text(),
  //   defaultCategory: 'category',
  //   defaultAction: 'action',
  //   defaultLabel: 'label',
  //   watch: [
  //     ['click', '.mt-twitter', trackClick],
  //     ['click', '.mt-facebook', trackClick]
  //   ]
  // })

  $('.widget-share .mt-twitter').click(function(){trackEvent('socialClicks', 'Clicked Widget Twitter', 'clicked Twitter button')});
  $('.widget-share .mt-facebook').click(function(){trackEvent('socialClicks', 'Clicked Widget Facebook', 'clicked Facebook button')});
  $('.widget-share .mt-google').click(function(){trackEvent('socialClicks', 'Clicked Widget Google', 'clicked Google button')});
  $('.post-share .mt-twitter').click(function(){trackEvent('socialClicks', 'Clicked Share Twitter', 'clicked Twitter button')});
  $('.post-share .mt-facebook').click(function(){trackEvent('socialClicks', 'Clicked Share Facebook', 'clicked Facebook button')});
  $('.post-share .mt-google').click(function(){trackEvent('socialClicks', 'Clicked Share Google', 'clicked Google button')});
  $('#newsletter-submit').click(function(){trackEvent('newsletterSubmit', 'Submitted Newsletter', 'Submitted Newsletter')});

  $(".video").fitVids();

  $('.sidebar-toggle').click(function(){
    $('body').toggleClass('show-sidebar');
  });


  // blog post TOCs

  $('#toc').toc({
    'selectors': 'h3', //elements to use as headings
    'container': '.post-content', //element to find all selectors in
    'listType': '<ol/>',
    'smoothScrolling': false
  });

  // progress animated svg

  if(!!$('.progress path').length){
    var progressPath = document.querySelector('.progress path');
    var pathLength = progressPath.getTotalLength();
    // Clear any previous transition
    progressPath.style.transition = progressPath.style.WebkitTransition =
      'none';
    // Set up the starting positions
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    progressPath.getBoundingClientRect();
    // Define our transition
    progressPath.style.transition = progressPath.style.WebkitTransition =
      'stroke-dashoffset 300ms ease-in-out';
    // Go!
  }

  // --- Widgets ---

  // if newsletter has been submitted or dismissed 3 times or more, show share widget instead
  
  if($.cookie('newsletterSubmitted') || $.cookie('newsletterDismissed') >= 3){
    $('.widget-newsletter').hide();
    $('.widget-share').show();
  }

  // if share widget has been dismissed 3 times or more, show noWidgets widget instead

  if($.cookie('shareDismissed') >= 3){
    $('.widget-newsletter').hide();
    $('.widget-share').hide();
    $('.widget-nowidgets').show();
  }

  // if noWidgets widget has been dismissed 1 time, don't show anything

  if($.cookie('noWidgetsDismissed') >= 1){
    showWidgetOnThisPage = false;
  }

  // scroll events

  var scrollStuff = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var percent = Math.round(scroll * 100 / height);

    // if progress indicator exists, update progress
    if($('.progress path').length){

      var progress = pathLength - (scroll * pathLength / height);
      progressPath.style.strokeDashoffset = progress;
    
      var text = percent+"% read";
      if(percent >= 100){
        text += " – good job!";
      }else if(percent > 80){
        text += " – almost there!";
      }else if(percent > 60){
        text += " – keep going…";
      }else if(percent > 40){
        text += " – doing great";
      }
      $('.sidebar-indicator').text(text);

    }

    // show/hide newsletter
    if(percent > 70 && showWidgetOnThisPage == true){
      $('body').addClass('show-widget');

    }else{
      $('body').removeClass('show-widget');     
    }
  }

  scrollStuff();
  $(window).scroll(function() {
    scrollStuff();
  });


  // new Share(".share-button", {
  //   networks: {
  //     google_plus: {
  //     },
  //     twitter: {
  //     },
  //     facebook: {
  //     },
  //     pinterest: {
  //       enabled: false
  //     },
  //     email: {
  //       enabled: false
  //     }
  //   }
  // });


  // submit newsletter

  $('#newsletter-submit').click(function(){
    $.cookie('newsletterSubmitted', true);
  });

  // hide widget

  $('.widget-dismiss').click(function(){
    var p = $(this).parent();
    var dismissCount = 0;
    var widgetName = '';

    if(p.hasClass('widget-newsletter'))
      widgetName = 'newsletter';
    if(p.hasClass('widget-share'))
      widgetName = 'share';
    if(p.hasClass('widget-nowidgets'))
      widgetName = 'noWidgets';
    
    $('body').removeClass('show-widget');  
    showWidgetOnThisPage = false;
    dismissCount = parseInt($.cookie(widgetName+'Dismissed') || 0);
    $.cookie(widgetName+'Dismissed', ++dismissCount); 

    trackEvent("dismissWidget", widgetName+" x "+dismissCount, "Dismissed '"+widgetName+"' widget for the "+dismissCount+" time");

  });

});