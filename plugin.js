$.fn.html5pl = function() {
  
  var audioTag = $('<audio>').attr({'id':'html5p'}).append($('<source>'));
  
  $('body').append(audioTag);

  var player = $('audio').get(0);
   
  player.songs = [];
  player.state = -1;

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
      next = $("<span class='next'> ☞ </span>");
      holder.append(pause);
      holder.append(next);
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
          if (player.state < 0 ){
              player.play();
          } else { 
              player.play();
          }
          $(this).addClass('pause').html('pause').removeClass('play');
        }
        player.play();
      });

      // next

      $('.next').live('click',function(e){
        e.preventDefault();
        player.pause();
        player.state++;
        if (player.state == player.songs.length) {
            player.state = 0;
        }
        console.log(player.state,player.songs[player.state].title,player.songs.length);
        $(player).find('source').attr('src', player.songs[player.state].url);
        player.load();
        player.play();
      });

      player.addEventListener('ended', function(e) {
        $('.next').trigger('click');
      });

    }
    
    var playFilelist = function(pl){
      console.log(pl);
      $(player).find('source').attr('src',pl[0].url);
    }

    playFilelist(player.songs);
    createControls();
    $('.next').trigger('click');
};


