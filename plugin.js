(function($) {
    $.fn.html5pl = function() {
  
    var audioTag = $('<audio>').attr({'id':'html5p'}).append($('<source>'));
      
      $('body').append(audioTag);
      
      var player = $('audio').get(0);

      player.songs = [];
      player.state = -1;

      $('a').each(function(){
        var href = $(this).attr('href') || ''; 
        if(href.match(/mp3|m4a/)){
          var song = {
            title: this.innerText,
            url: this.href
          }
          player.songs.push(song);
        }   
      });

      $('html5p source').attr('src',player.songs[0].url);

      (function(){
        holder = $('<div>').css({
          'position':'fixed',
          'top':'0',
          'right':'0',
          'height': '20px',
          'background':'yellow',
          'color':'black',
          'padding':'1em',
          'font-family': 'Helvetica, sans'
        }).addClass('player');
        pause = $("<span class='play'>play</span>");
        prev = $("<span class='prev'> &#171; </span>");
        next = $("<span class='next'> &#187; </span>");
        
        holder.append(pause);
        holder.append(prev);
        holder.append(next);
        $('body').append(holder);
      })();
        
      var playFilelist = function(pl){
        console.log(pl);
        $(player).find('source').attr('src',pl[0].url);
      }
        
      // play

      $('.pause').live('click',function(){
        if(!player.ended) {
          player.pause();
        }
        $(this).html('play').addClass('play').removeClass('pause');
      });

      // pause

      $('.play').live('click',function(){
        player.play();
        if(player.state=-1)
          player.state++
        $(this).addClass('pause').html('pause').removeClass('play');
      });

      // next

      $('.next').live('click',function(e){
        e.preventDefault();
        player.pause();
        player.state++;
        if (player.state == player.songs.length)
            player.state = 0
        console.log(player.state,player.songs[player.state]);
        $(player).find('source').attr('src', player.songs[player.state].url);
        loadAndPlay();
      });

      // prev

      $('.prev').live('click',function(e){
        e.preventDefault();
        player.pause();
        if (player.state > 0)
          player.state--;
        if (player.state == player.songs.length)
            player.state = 0
        $(player).find('source').attr('src', player.songs[player.state].url);
        loadAndPlay();
      });

      var loadAndPlay = function(){
        $('.play').trigger('click');
        player.load();
        player.play();
        document.title = 'Playing: ' + player.songs[player.state].title;
      }

      /*player.addEventListener('ended', function(e) {
        console.log('start next');
        $('.next').trigger('click');
      });*/

      // ended event was not fired correctly
      player.addEventListener('timeupdate', function(evt) {
        if(player.currentTime == player.duration)
            $('.next').trigger('click');
      });

      playFilelist(player.songs);
    };
})(jQuery);
