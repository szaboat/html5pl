$.fn.html5pl = function() {
  
  $().createControls();
  
  /**************************************/
  var audioTag = $('<audio>').attr({'id':'html5p'}).append($('<source>'));

  $('body').append(audioTag);
  
  var songs = [];

  $('a').each(function(){
    if($(this).attr('href').match(/mp3|m4a/)){
      songs.push(this);
    }
  });

  $('html5p source').attr('src',songs[0][1]);

  $().playFilelist(songs);


  /**************************************/ 
  /*$('a').each(function(){
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
  
  */
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
}

$.fn.playFilelist = function(pl){
  console.log(pl);
  var player = $('#html5p');
  player.find('source').attr('src',pl[0]);
  player.get(0).play();
}
