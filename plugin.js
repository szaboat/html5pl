$.fn.html5pl = function() {
  
  $().createControls();
  
  var paused;
  
  $('a').each(function(){
    if($(this).attr('href').match(/mp3/)){
      audio = $('<audio>');
      source = $('<source>').attr('src',$(this).attr('href'));
      audio.append(source);
      $(this).append(audio);
    }
  });
  
  $('audio').each(function(index){
    if(index == 0){
      this.play();
      $(this).parent().css('background',"yellow");
    }
  });
  
  $('.pause').live('click',function(){
    var paused;
    $('audio').each(function(){
      if(!this.ended) {
        this.pause();
        paused = this;
      }
    });
    $(this).html('play').addClass('play').removeClass('pause');
  });
  
  $('.play').live('click',function(){
    $('audio').each(function(){
      if(this.paused) {
        this.play();
      }
    });    
    $(this).addClass('pause').html('pause').removeClass('play');
  });
  
};

$.fn.createControls = function(){
  holder = $('<div>').css({
    'position':'absolute',
    'top':'0',
    'right':'0',
    'width': '35px',
    'height': '20px',
    'background':'yellow',
    'color':'black',
    'padding':'1em'
  });
  pause = $("<span class='pause'>pause</span>");
  holder.append(pause);
  $('body').append(holder);
}

$.fn.c = function() {
  console.log('foo');
}