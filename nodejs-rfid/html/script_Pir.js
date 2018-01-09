var table = document.getElementById("tabl");
var lines = new Array();


var loadDataToTable = function(data)
{
	table.innerHTML='<tr><td>Время начала активности</td><td>Время конца активности</td></tr>';
 	data.forEach(function(elem){
 		table.innerHTML+='<tr><td>'+elem.begin+'</td><td>'+elem.end+'</td></tr>';
	});
}


var xhr = new XMLHttpRequest();
 xhr.open('GET', 'pir.json', true);
 var categories = new Array();

 xhr.onload = function(){
 	var data = JSON.parse(this.responseText);
 	loadDataToTable(data);
 }

xhr.send(null);