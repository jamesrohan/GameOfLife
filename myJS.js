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

	prompt_user();// call our prompt function
	main();// call main function		
		
		/*
			The main function handles all the button clicks which calls other 
			functions such as logic which takes care of the changing of 
			dead or alive cells. This function also 
		*/
	function main(){
		createTable();

		$("#run_button_23").click(function(){ 
			t = setInterval(tick, 150); 
		});//End #run_button_23

		$("#run_button_1").click(function(){
			logic(); 
		});//increment once button function

		$("#run_button_start").click(function(){ 
			s = setInterval(tick_infinity, 150); 
		});//Start button function
		
		$("#run_button_stop").click(function(){ 
			counter_stop = 1;   
		});//Stop button function

		$("#reset_button").click(function(){
			//Set Eveything to intial Values
			location.reload();
		});// End reset button function
	}//End Main

	/*
		This function prompts the user to set the size 
		once the page loads.
	*/
	function prompt_user(){
		rowSize = parseInt(prompt("Enter Row Size","30"));
		colSize = parseInt(prompt("Enter Column Size","30"));
	}// End prompt function.
	
	/*
		This function handles the drop down selection of different
		style of life. i.e. Oscillators, still life and glider.
		this handles the initialization of the states to display 
		them on the grid.
	*/
	$("#user_options").change(function (){

		if(this.value == "block"){
			element_State_Present[0][0]=1;
			element_State_Present[0][1]=1;
			element_State_Present[1][0]=1;
			element_State_Present[1][1]=1;
		}else if(this.value == "blinker"){
			element_State_Present[1][0]=1;
			element_State_Present[1][1]=1;
			element_State_Present[1][2]=1;
		}else if(this.value == "toad"){
			element_State_Present[1][2]=1;
			element_State_Present[1][3]=1;
			element_State_Present[1][4]=1;

			element_State_Present[2][1]=1;
			element_State_Present[2][2]=1;
			element_State_Present[2][3]=1;
		}else if(this.value == "glider"){
			element_State_Present[0][1]=1;
			element_State_Present[1][2]=1;
			element_State_Present[2][0]=1;
			element_State_Present[2][1]=1;
			element_State_Present[2][2]=1;
		}

		s = setInterval(tick_infinity, 150);//set the interval 
	});// End life selection function
	
	/*
		the tick function calls logic. within the tick function
		the implementation of running the logic continuously for
		23 generations is handled using the setInterval variable (t)
		created in the main function. The global variable count
		increases everytime this function is called and triggers
		the clearinterval method at the specified value. 23 in this case.
	*/
	function tick(){
		logic();
		count++;
		if(count == 23 || counter_stop == 1){
			count = 0;
			counter_stop = 0;
			clearInterval(t);
			clearInterval(s); //test
			return;
		}

		console.log("Generation(Local For 23 Gens): " + count);
		console.log("Generation(Global): "+generation);
	}// End tick

	/* 
		Much like the tick function except this one handles 
		the case of infinity never ending cycle through the game.
		the variable counter_stop causes the cycle to stop at the 
		current generation.
	*/
	function tick_infinity(){
		logic();
		if(counter_stop == 1){
			counter_stop = 0;
			clearInterval(s);
			clearInterval(t);//test
			return;
		}

		console.log("Generation(Global): "+generation);
	}// End Tick

	/*
		The logic function handles the changing of the cells
		from dead to alive or vice versa.
	*/
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
						}//end else if
				}else if (element_State_Present[i][j] === 0) {
					if (whats_my_neighbors===3) {
						element_State_Future[i][j] = 1;
						$("#"+str_ID).css("background","black");
					}// end if
				}// end else if
			}// end Nested For
		}// end Main For

		//element_State_Present = element_State_Future;
		for (var i = 0 ; i < rowSize; i++) {
			for (var j = 0; j < colSize; j++) {
				element_State_Present[i][j] = element_State_Future[i][j];
				element_State_Future[i][j] = 0;
			}
		}
		generation++;
		document.getElementById("Display_Variables").innerHTML = "Generation: "+generation;

	}//End Logic function

	/*
		this function iterates through every cell and checks how many neighbors
		it has and puts that count into the variable My_Neighbors. The value is returned 
		and used in the logic function.
	*/
	function Search_My_Neighbors(curr_row,curr_col){
		var My_Neighbors = 0;
		for (var m =  - 1; m <= 1; m++) {
			for(var n =  - 1; n <= 1; n++){
				if( curr_row+m >=0 && curr_col+n >= 0 &&  curr_row+m < rowSize && curr_col+n < colSize ){
					My_Neighbors += element_State_Present[curr_row+m][curr_col+n];
				}// end if
			}// end nested for				
		}// end for
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
