
var fio = document.getElementById("fio");
var info = document.getElementById("StaticInfo");
var foto = document.getElementById("foto");

var table = document.getElementById("tabl");

var loadStaticInfo = function(worker)
{
	fio.innerText = worker.name + " " + worker.second_name + " " + worker.surname;
	foto.src = worker.photo;
	info.innerHTML = '<p>Информация о сотруднике</p>';
	info.innerHTML += "Должность: " + worker.position + '<br>';
	info.innerHTML += "Рабочее место: " + worker.place;
	info.innerHTML += "email: " + worker.email;
	info.innerHTML += "Время работы: " + worker.wh;
}

var chooseImg = function(ent){
	if (ent==1) return '"arRight.png"';
	else return '"arLeft.png"';
}

var loadDataToTable = function(data)			//аргумент список вх/вых
{
	table.innerHTML='<tr><td>Вход/Выход</td><td>Время</td></tr>';
 	data.forEach(function(elem, num){
 		table.innerHTML+='<tr><td><img src = '+chooseImg(elem.ent)+'></td><td>'+elem.time+'</td></tr>';
	});
}

 var xhr = new XMLHttpRequest();
 xhr.open('GET', 'worker.json', true);

 xhr.onload = function(){
 	var workers = JSON.parse(this.responseText);
 	console.log(workers);
 	var worker = workers[0];
 	loadStaticInfo(worker);
 }

xhr.send(null);