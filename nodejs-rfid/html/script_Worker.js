
var fio = document.getElementById("fio");
var info = document.getElementById("StaticInfo");
var foto = document.getElementById("foto");

var table = document.getElementById("tabl");

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
	table.innerHTML='<tr><td>Вход/Выход</td><td>Время</td></tr>';
 	data.forEach(function(elem, num){
 		table.innerHTML+='<tr><td><img src = '+chooseImg(elem.ent)+'></td><td>'+elem.time+'</td></tr>';
	});
}

var calcInterval = function(outTime, inpTime){
	console.log(outTime);
	console.log(inpTime);
	hours = parseInt(outTime.substring(0,2))-parseInt(inpTime.substring(0,2));
	minOut = parseInt(outTime.substring(3,5));
	minIn = parseInt(inpTime.substring(3,5));
	if (minOut-minIn<0){
		hours--;
		min = minOut+60-minIn;
	}
	else min = minOut-minIn;
	if (hours<10) hours='0'+hours;
	if (min<10) min='0'+min;
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

//тест статистики
var inp = new Array({ent: 0, time: "18.09 06-октября-2017"}, {ent: 1, time: "14.03 06-октября-2017"}, {ent: 0, time: "17.20 07-октября-2017"}, {ent:1, time: "14.43 07-октября-2017"});

var makeStat = function(ent, stat){
	while(ent.length!=0)
	{
		var r = ent[0].time.match(/\d\d-[а-я]*-20\d\d/); //дата из первого элемента
		var oneDay = r[0];
		var day = ent.filter(function(elem){					//выбрать все входы/выходы по этой дате
			if (elem.time.indexOf(oneDay)!=-1) return elem;
		});
		var inpDay = day.map(function(elem){
			if (elem.ent==1) { r = elem.time.match(/(\d\d.\d\d)/); return r[1]};			//выбрать время входов за день
		});
		var outDay = day.map(function(elem){
			if (elem.ent==0) { r = elem.time.match(/(\d\d.\d\d)/); return r[1]};			//выбрать время выходов за день
		});
		var time="00.00";
		for(i=0; i<outDay.length; i++){
			//console.log(inpDay[i]); //??????
			//console.log(outDay[i]);
			//if (typeof(inpDay[i])=="undefined") break;
			//time = addInterval(time, calcInterval(outDay[i], inpDay[i]));
		}
		ent = ent.map(function(elem){
			if (elem.time.indexOf(oneDay)==-1) return elem;
		})

		//time = addInterval("03.58", calcInterval("18.09", "13.04")); проверка
		//console.log("time "+ time);

		dayStat = new Object();
		dayStat.date = oneDay;
		dayStat.time = time;
		stat.push(dayStat);
	}
	return stat;
}


 var xhr = new XMLHttpRequest();
 xhr.open('GET', 'worker.json', true);

 xhr.onload = function(){
 	var workers = JSON.parse(this.responseText);
 	var worker = workers[0];	//как-то выбрать по rfid
 	loadStaticInfo(worker);

 	//var stat = new Array();
	//console.log(makeStat(inp, stat));
 }

xhr.send(null);