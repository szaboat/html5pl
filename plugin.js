$.fn.html5pl = function() {
  
  var audioTag = $('<audio>').attr({'id':'html5p'}).append($('<source>'));
  
  $('body').append(audioTag);

  var player = $('audio').get(0);
   
  player.songs = [];

  $('a').each(function(){
    if($(this).attr('href').match(/mp3|m4a/)){
      var song = {
        title: this.innerText,
        url: this.href
      }
      player.songs.push(song);
    }   
  });

  $('html5p source').attr('src',player.songs[0].url);


    var createControls = function(){
      holder = $('<div>').css({
        'position':'absolute',
        'top':'0',
        'right':'0',
        'height': '20px',
        'background':'yellow',
        'color':'black',
        'padding':'1em',
        'font-family':'sans'
      });
      pause = $("<span class='play'>play</span>");
      holder.append(pause);
      $('body').append(holder);
     
      // play
 
      $('.pause').live('click',function(){
        var paused;
        if(!player.ended) {
          player.pause();
          paused = this;
        }
        $(this).html('play').addClass('play').removeClass('pause');
      });

      // pause
      
      $('.play').live('click',function(){
        if(player.paused) {
          player.play();
        }
        $(this).addClass('pause').html('pause').removeClass('play');
      });

      player.addEventListener('ended', function(e) {
        console.log('ended');
      });

    }
    
    var playFilelist = function(pl){
      console.log(pl);
      $(player).find('source').attr('src',pl[0].url);
    }

    playFilelist(player.songs);
    createControls();
};


