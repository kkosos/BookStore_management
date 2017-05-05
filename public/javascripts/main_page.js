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


$(function() {
	$('#alertit').click(function(){
		$('.ui.dropdown').dropdown();
		console.log("affa")
		
		var child = document.createElement("div");
		child.className='item';
		child.innerHTML = "newsgsdgds";
		document.getElementById("notifyit").appendChild(child);
	});
});