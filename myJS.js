



$(document).ready(function(){



var rowSize = 30;
var colSize = 30;
//var returnArr;
var element_State_Present = get2DArr(rowSize, colSize);
var element_State_Future = get2DArr(rowSize, colSize);

var t; // this variable holds the setInterval() function
var count = 0;// the count to clearInterval()

var counter_stop = 0;
var s;
var generation =1;

		prompt_user();
		main();


		function main(){
			createTable();


		$("#run_button_23").click(function(){
				//	logic();
				t = setInterval(tick, 150);// the t variable that
			});//End #run_button_23

			$("#run_button_1").click(function(){ logic(); });

			$("#run_button_start").click(function(){ s = setInterval(tick_infinity, 150); });

			$("#run_button_stop").click(function(){ counter_stop = 1; });

			$("#reset_button").click(function(){
				//Set Eveything to intial Values
				location.reload();
			});




		}//End Main


		function prompt_user(){
			rowSize = parseInt(prompt("Enter Row Size","30"));
			colSize = parseInt(prompt("Enter Column Size","30"));
		}

		function tick(){
			logic();
			count++;
			if(count == 23){
				count = 0;
				clearInterval(t);
				return;
			}

			console.log("Generation(Local For 23 Gens): " + count);
			console.log("Generation(Global): "+generation);
		}// End tick



		function tick_infinity(){
			logic();
			if(counter_stop == 1){
				counter_stop = 0;
				clearInterval(s);
				return;
			}

			console.log("Generation(Global): "+generation);
		}// End Tick






		function logic(){

			for (var i = 0 ; i < rowSize; i++) {
				for (var j = 0; j < colSize; j++) {
					var whats_my_neighbors = Search_My_Neighbors(i,j);
       	  var str_ID = i+"d"+j;
					if(element_State_Present[i][j] === 1){
							if(whats_my_neighbors<2){
								element_State_Future[i][j] = 0;
								$("#"+str_ID).css("background","white");
							}else if (whats_my_neighbors === 2 || whats_my_neighbors===3) {
								element_State_Future[i][j] = 1;
								$("#"+str_ID).css("background","black");
							}else if (whats_my_neighbors > 3) {
								element_State_Future[i][j] = 0;
								$("#"+str_ID).css("background","white");
							}

					}else if (element_State_Present[i][j] === 0) {
						if (whats_my_neighbors===3) {
							element_State_Future[i][j] = 1;
							$("#"+str_ID).css("background","black");
						}

					}


				}// Nested For
			}// Main For


			//element_State_Present = element_State_Future;
			for (var i = 0 ; i < rowSize; i++) {
				for (var j = 0; j < colSize; j++) {
					element_State_Present[i][j] = element_State_Future[i][j];
					element_State_Future[i][j] = 0;
				}
			}
			generation++;
			document.getElementById("Display_Variables").innerHTML = "Generation: "+generation;

		}//End Logic



		function Search_My_Neighbors(curr_row,curr_col){
			var My_Neighbors = 0;
			for (var m =  - 1; m <= 1; m++) {
				for(var n =  - 1; n <= 1; n++){
					if( curr_row+m >=0 && curr_col+n >= 0 &&  curr_row+m < rowSize && curr_col+n < colSize ){
						My_Neighbors += element_State_Present[curr_row+m][curr_col+n];
					}

				}
			}


			My_Neighbors -= element_State_Present[curr_row][curr_col];
			var myStr = curr_row+"d"+curr_col;
			console.log("Here's My ID:   "+myStr +"    Heres My Neighbors:  "+My_Neighbors);
			return My_Neighbors;
		}// End Search My_Neighbors




		$('table tr td').click(function(){
        var row_id = $(this).attr('data-row');
        var col_id = $(this).attr('data-col');
        var main_id = $(this).attr('id');

        var str_ID = row_id+"d"+col_id;

        if(element_State_Present[row_id][col_id] == 0 || element_State_Present[row_id][col_id] == null){
        $("#"+str_ID).css("background","black");
        element_State_Present[row_id][col_id] = 1;

        }else{
        	$("#"+str_ID).css("background","white");
        element_State_Present[row_id][col_id] = 0;

        }

    	});// End Table Click



		function get2DArr(rows,cols){

				var arr = [];
		    for (i=0;i<rows;i++) {
				 arr[i]=new Array();
				 for (j=0;j<cols;j++) {
				  arr[i][j]=0;
				 }
				}
		    return arr;
		}// End get2DArr



		function createTable(){//creates table to ouput (still requires functionality for changing values)
			var out="<table>";
			for(var i=0; i<rowSize;i++){
				out+="<tr>";
				for(var j=0; j<colSize;j++){
					out+= "<td data-row=\"" +i+ "\""+
								"data-col = \"" +j+ "\"" + "id="+ "\""+i + "d"+j    +"\""       +">"
					+ "</td>";
				}
				out+="</tr>";
			}
			out+="</table>";
			document.getElementById("game").innerHTML = out;
		}

}); // End ready Function JQuery
