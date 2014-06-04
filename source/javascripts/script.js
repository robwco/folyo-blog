showNewsletter = true

$(function(){
  // $(".video").fitVids();
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
  

  // scroll events

  var scrollStuff = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var percent = Math.round(scroll * 100 / height);

    // update progress
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
    $('.sidebar-percent').text(text);

    // show/hide newsletter
    if(percent > 70 && showNewsletter == true){
      $('body').addClass('show-newsletter');
    }else{
      $('body').removeClass('show-newsletter');     
    }
  }

  scrollStuff();
  $(window).scroll(function() {
    scrollStuff();
  });

  // hide newsletter widget

  $('.newsletter-dismiss').click(function(){
    $('body').removeClass('show-newsletter');  
    showNewsletter = false;
  });

});