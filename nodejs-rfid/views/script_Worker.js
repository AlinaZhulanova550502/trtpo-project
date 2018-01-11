var fio = document.getElementById("fio");
var info = document.getElementById("StaticInfo");
var foto = document.getElementById("foto");

var table = document.getElementById("tabl");
var tabSt = document.getElementById("stat");

var loadStaticInfo = function(worker)
{
	fio.innerText = worker.name + " " + worker.second_name + " " + worker.surname;
	foto.src = worker.photo;
	info.innerHTML += "Должность: " + worker.position + '<br><br>' + "Рабочее место: " + worker.place + '<br><br>' + "email: " + worker.email + '<br><br>' + "Рабочие часы: " + worker.wh;
}

var chooseImg = function(ent){
	if (ent==1) return '"arRight.png"';
	else return '"arLeft.png"';
}

var loadDataToTable = function(data)			//аргумент список вх/вых
{
	table.innerHTML='<tr><td>Вход/выход</td><td>Время</td></tr>';
 	data.forEach(function(elem, num){
 		table.innerHTML+='<tr><td><img src = '+chooseImg(elem.ent)+'></td><td>'+elem.time+'</td></tr>';
	});
}

var loadDataToTableStat = function(stat)			//аргумент список вх/вых
{
	tabSt.innerHTML='<tr><td>Дата</td><td>Время работы</td></tr>';
 	stat.forEach(function(elem, num){
 		if (elem.time=='00.00') tabSt.innerHTML+='<tr><td>'+elem.date+'</td><td>error</td></tr>';
 		else tabSt.innerHTML+='<tr><td>'+elem.date+'</td><td>'+elem.time+'</td></tr>';
	});
}

var calcInterval = function(outTime, inpTime){
	hours = parseInt(outTime.time.substring(0,2))-parseInt(inpTime.time.substring(0,2));
	console.log(hours);
	minOut = parseInt(outTime.time.substring(3,5));
	minIn = parseInt(inpTime.time.substring(3,5));
	if (minOut-minIn<0){
		hours--;
		min = minOut+60-minIn;
	}
	else min = minOut-minIn;
	if (hours<10) hours='0'+hours;
	if (min<10) min='0'+min;
	console.log(hours+'.'+min);
	return hours+'.'+min;
}

var addInterval = function(one, two){
	hours = parseInt(one.substring(0,2))+parseInt(two.substring(0,2))
	minOne = parseInt(one.substring(3,5));
	minTwo = parseInt(two.substring(3,5));
	if (minOne+minTwo>=60) {
		hours++;
		min = minOne+minTwo - 60;
	}
	else min = minOne+minTwo;
	if (hours<10) hours='0'+hours;
	if (min<10) min='0'+min;
	return hours+'.'+min;
}

var makeStat = function(ent, stat){
	while(ent.length!=0)	//итерация цикла для одной даты
	{
		var r = ent[0].time.match(/\d\d-[а-я]*-20\d\d/); //дата из первого элемента
		var oneDay = r[0];
		var day = ent.filter(function(elem){					//выбрать все входы/выходы по этой дате
			if (elem.time.indexOf(oneDay)!=-1) return elem;
		});
		var dayCopy=day;
		var inpDay = day.filter(function(elem){
			if (elem.ent==1) { r = elem.time.match(/(\d\d.\d\d)/); return r[1]};			//выбрать время входов за день
		});
		var outDay = dayCopy.filter(function(elem){
			if (elem.ent==0) { r = elem.time.match(/(\d\d.\d\d)/); return r[1]};			//выбрать время выходов за день
		});
		var time="00.00";
		for(i=0; i<outDay.length; i++){				//считать сумму времени за день парами вых/вх
			if (typeof(inpDay[i])=="undefined" || typeof(outDay[i])=="undefined") {console.log("break"); break};
			console.log(inpDay[i].time); console.log(outDay[i].time);
			time = addInterval(time, calcInterval(outDay[i], inpDay[i]));
			console.log("time "+ time);
		}
		//console.log("time "+ time);
		
		ent = ent.filter(function(elem){
			if (elem.time.indexOf(oneDay)==-1) return elem;
		})

		dayStat = new Object();
		dayStat.date = oneDay;
		dayStat.time = time;
		stat.push(dayStat);
		loadDataToTableStat(stat);
	}
}

var xhr = new XMLHttpRequest();
xhr.open('GET', 'worker.json?rfid={{rfid}}', true);


var frid;
xhr.onload = function(){
 	var workerInfo = JSON.parse(this.responseText);
 	loadStaticInfo(workerInfo[0]);
 	rfid=workerInfo[0].rfid;
 }

xhr.send(null);

var en = new XMLHttpRequest();
en.open('GET', 'enter.json', true);
en.onload = function(){
 	var went = JSON.parse(this.responseText);
 	went=went.filter(function(elem){
 		if (elem.rfid==rfid) return elem;
 	});
 	console.log(went);
 	loadDataToTable(went);
 	var stat = new Array();
	makeStat(went, stat);
 }

en.send(null);