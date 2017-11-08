



$(document).ready(function(){


var gen = 0;
var rowSize = 10;
var colSize = 10;
//var returnArr;
var element_State_Present = get2DArr(rowSize, colSize);
var element_State_Future = get2DArr(rowSize, colSize);


		//$("#test").(element_State_Present.toString());
		//document.getElementById("test").innerHTML = element_State_Present.toString();


		main();

		function main(){
			createTable();

			$("#run_button").click(function(){
				logic();
			});
		}




		function logic(){

			for (var i = 1 ; i < rowSize-1; i++) {
				for (var j = 1; j < colSize-1; j++) {
					var whats_my_neighbors = Search_My_Neighbors(i,j);


					//var row_id = i;//$(this).attr('data-row');
        			//var col_id = j;//$(this).attr('data-col');
        			//var main_id = $(this).attr('id');

       				 var str_ID = i+"d"+j;
							 /*
					if( (whats_my_neighbors < 2 || whats_my_neighbors > 3 && (element_State_Present[i][j] == 1))  ){ //&& (element_State_Present[i][j] == 1 || element_State_Present[i][j] == null)
						element_State_Future[i][j] = 0;
						//$("#"+str_ID).css("background","white");


					}else if( whats_my_neighbors == 3 && (element_State_Present[i][j] == 0) ){ //&& (element_State_Present[i][j] == 0 || element_State_Present[i][j] == null)
						element_State_Future[i][j] = 1;
						//$("#"+str_ID).css("background","black");
					} */




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

			//draw_New_Values();

		}


		function draw_New_Values(){
			console.log("I am here");
			$('table tr td').css("background","white");
			console.log("I am here 2");


			for(var i =0; i<rowSize; i++){
				for(var j=0; j<colSize; j++){
					var str_ID = i+"d"+j;
					console.log("I am here 3 "+ str_ID);

					if(element_State_Present[i][j] === 1){
						$("#"+str_ID).css("background","black");
						console.log("I am here 4");
					}else{
						$("#"+str_ID).css("background","white");
						console.log("I am here 5");
					}


				}//Nested For
			}//Main For


		}


		function Search_My_Neighbors(curr_row,curr_col){
			var My_Neighbors = 0;
			for (var m =  - 1; m <= 1; m++) {
				for(var n =  - 1; n <= 1; n++){
					My_Neighbors += element_State_Present[curr_row+m][curr_col+n];
				}
			}


			My_Neighbors -= element_State_Present[curr_row][curr_col];
			var myStr = curr_row+"d"+curr_col;
			console.log("Heres My Neighbors:  "+My_Neighbors+"   Here's My ID: "+myStr);
			return My_Neighbors;
		}




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

        //alert("Row: "+row_id +"  "+"Col: "+col_id+ "  ID: "+main_id);
        //$("#P_Display_3").load(file_id)//"file1.txt"

    	});



		function get2DArr(rows,cols){

			var arr = [];
			/*
		    for (var i = 0; i < cols; i++) {
		        arr[i] = [];
		    }*/

		    for (i=0;i<rows;i++) {
				 arr[i]=new Array();
				 for (j=0;j<cols;j++) {
				  arr[i][j]=0;
				 }
			}



		    return arr;


		}



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
