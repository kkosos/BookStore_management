
$(document).keyup(function(e) {
	if (e.keyCode == 27) {
    if($('#mySidenav').width()==0){
        $('#mySidenav').width(250);
        $('#main').css('margin-left','250px');
        $('#header').css('margin-left','250px');        
    }
    else {
        $('#mySidenav').width(0);
        $('#main').css('margin-left','0');
        $('#header').css('margin-left','0');
    }
  }
});
$(function() {
  $('.toggle-nav').click(function() {
    if($('#mySidenav').width()==0){
        $('#mySidenav').width(250);
        $('#main').css('margin-left','250px');
        $('#header').css('margin-left','250px');    
    }
    else {
        $('#mySidenav').width(0);
        $('#main').css('margin-left','0');
        $('#header').css('margin-left','0');    
    }    
  });  
});

$(function() {
  $('.toggle-nav').click(function() {
    if($('#mySidenav').width()==0){
        $('#mySidenav').width(250);
        $('#main').css('margin-left','250px');
        $('#header').css('margin-left','250px');    
    }
    else {
        $('#mySidenav').width(0);
        $('#main').css('margin-left','0');
        $('#header').css('margin-left','0');    
    }    
  });  
});

