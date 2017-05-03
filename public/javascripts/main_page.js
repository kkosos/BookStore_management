$(document).keyup(function(e) {
	if (e.keyCode == 27) {

	$('.ui.labeled.icon.sidebar')
  .sidebar('toggle')
;
  }
});
$(function() {
  $('#side_bar_list').click(function() {
    $('.ui.labeled.icon.sidebar').sidebar('toggle')
  });  
});

