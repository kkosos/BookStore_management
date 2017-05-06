function toggle_warn(){
			var flag_toggle = document.getElementById('togg').checked

			var tb = document.getElementById("tablebody");
			tb.innerHTML='';
			
			if(flag_toggle){
				for(var i in warn){
					
					var tr = document.createElement("tr");
					tr.className="negative";
					for(var j in obj[warn[i]]){
						var td = document.createElement("td");
						td.innerHTML = obj[warn[i]][j];
					    tr.appendChild(td);
					}
					var td = document.createElement("td");
					var ticon = document.createElement('i');
					ticon.className="external icon";
					td.appendChild(ticon)
					tr.appendChild(td);
					tb.appendChild(tr);		
				
				}
			}
				
			else{
				reload()
			}
			$("#main_table").trigger("update"); 
		}
	
function _warn(){
	var cur_val = $('#search').val();
	for(var i in obj){				
		if(obj[i].amount<50)warn.push(i);		
	}

	if(warn.length)document.getElementById("warning_icon").style.display="block";

}

		
			

function reload(){
	var cur_val = $('#search').val();
	var tb = document.getElementById("tablebody");
	tb.innerHTML='';
	var flag_toggle = document.getElementById('togg').checked

	if(!flag_toggle)
	{
			for(var i in obj){
				

				var tr = document.createElement("tr");
				var flag = false;
				var warn_flag = false;
				if(obj[i].amount<50){
					warn_flag=true;
					tr.className="negative";
				}

				for(var j in obj[i]){
					//obj[i][j]	
						if(obj[i][j].toString().match(cur_val)!=null){
							flag=true;
						}
						var td = document.createElement("td");
						td.innerHTML = obj[i][j];
						tr.appendChild(td);

				}

				if(flag){
					//if match 	
					if(warn_flag){ //warning stock
						var td = document.createElement("td");
						var ticon = document.createElement('i');
						ticon.className="external icon";
						td.appendChild(ticon)
						tr.appendChild(td);
					}					
					tb.appendChild(tr);	
				}
					
			}
	}
	else{
		for(var i in warn){

			var flag = false;
			var tr = document.createElement("tr");
			tr.className="negative";
			for(var j in obj[warn[i]]){

				if(obj[warn[i]][j].toString().match(cur_val)!=null){
							flag=true;
				}						
				var td = document.createElement("td");
				console.log(flag+"  "+warn[i])
				td.innerHTML = obj[warn[i]][j];
				tr.appendChild(td);
			}
			if(flag)
			tb.appendChild(tr);		

		}
	}


	$("#main_table").trigger("update"); 
};


function getit(){
		var query = window.location.search.substr(1).split("=")[1];
		if(query=="true")
			document.getElementById('togg').checked=true;

}