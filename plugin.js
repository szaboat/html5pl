$.fn.html5pl = function() {
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
};

$.fn.c = function() {
  console.log('foo');
}