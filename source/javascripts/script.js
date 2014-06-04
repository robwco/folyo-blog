showNewsletter = true

$(function(){
  // $(".video").fitVids();
  $('.sidebar-toggle').click(function(){
    $('body').toggleClass('show-sidebar');
  });

  $(window).scroll(function() {
    var scroll = $(window).scrollTop() + $(window).height();
    var height = $(document).height();
    var percent = Math.round(scroll * 100 / height);
    console.log(scroll, height, percent)
    if(percent > 70 && showNewsletter == true){
      $('body').addClass('show-newsletter');
    }else{
      $('body').removeClass('show-newsletter');     
    }
  });
  $('.newsletter-dismiss').click(function(){
    $('body').removeClass('show-newsletter');  
    showNewsletter = false;
  });

});