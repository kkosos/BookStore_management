if(typeof warn_list=="undefined")warn_list=[];
if(warn_list.length){
	document.getElementById("warning_icon").style.display="block";

};


$(function() {
	$('#msg').click(function(){
		$('.ui.dropdown').dropdown();
		//console.log("affa")

		var child = document.createElement("div");
		child.className='item';
		child.innerHTML = "test msg";
		document.getElementById("msgit").appendChild(child);
	});
});
