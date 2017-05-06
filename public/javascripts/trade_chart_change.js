
				
			function table_chart(){
				document.getElementById("chart_bar").style.display="none";
				document.getElementById("chart_line").style.display="none";
				document.getElementById("main_table").style.display="";
				$("#main_table").trigger("update"); 
			
			}
			
			
    		function bar_chart(){
			document.getElementById("main_table").style.display="none";
			document.getElementById("chart_line").style.display="none";
			document.getElementById("chart_bar").style.display="";
			
			google.charts.load('current', {packages: ['corechart', 'bar']});
			google.charts.setOnLoadCallback(drawBarColors);
			function drawBarColors() {
				  var data = google.visualization.arrayToDataTable([
					['Book', '2017 sales', ],
					['book1', 300, ],
					['book2', 250, ],
					['book3', 10, ],
					['book9', 260, ],
					['book87', 20, ]
				  ]);

				  var options = {
					title: 'Each book sales in store',
					chartArea: {width: '50%'},
					colors: ['#33FFAA',],
					hAxis: {
					  title: 'Sales report',
					  minValue: 0
					},
					vAxis: {
					  title: 'Book'
					}
				  };
				  var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
				  chart.draw(data, options);
				  var chart = new google.visualization.BarChart(document.getElementById('chart_div2'));
				  chart.draw(data, options);
			
			}
			
			}
			
			
			function line_chart(){
					document.getElementById("main_table").style.display="none";
					document.getElementById("chart_bar").style.display="none";
					document.getElementById("chart_line").style.display="";
				
					google.charts.load('current', {packages: ['corechart', 'line']});
					google.charts.setOnLoadCallback(drawBackgroundColor);
					

					function drawBackgroundColor() {
						  var data = new google.visualization.DataTable();
						  data.addColumn('number', 'X');
						  data.addColumn('number', 'Book');

						  data.addRows([
							[0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
							[6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
							[12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
							[18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
							[24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
							[30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
							[36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
							[42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
							[48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
							[54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
							[60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
							[66, 70], [67, 72], [68, 75], [69, 80]
						  ]);

						  var options = {
							hAxis: {
							  title: 'Time'
							},
							vAxis: {
							  title: 'Sale amount'
							},
							backgroundColor: '#f1f8e9'
						  };

						  	var chart = new google.visualization.LineChart(document.getElementById('lchart_div2'));
						  	chart.draw(data, options);
							var chart = new google.visualization.LineChart(document.getElementById('lchart_div'));
						  	chart.draw(data, options);
							
						}
				
			
			}
