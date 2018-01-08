var time = document.getElementById("Time");
var date = document.getElementById("Date");

addZero = function(obj){
	if (obj<10) obj='0'+obj.toString();
	else obj=obj.toString();
	return obj;
}

clock = function()
{
	var dat = new Date();
	hours = dat.getHours();
	hours = addZero(hours);
	minutes = dat.getMinutes();
	minutes = addZero(minutes);
	strTime = hours + ":" + minutes;

	time.innerText=strTime;
}
setInterval(clock, 100);
dateClock = function()
{
	var dat = new Date();
	nday = dat.getDate();
	nday = addZero(nday);

	month = dat.getMonth();
	switch (month)
	{
		case 0: {month="января"; break; }
		case 1: {month="февраля"; break; }
		case 2: {month="марта"; break; }
		case 3: {month="апреля"; break; }
		case 4: {month="мая"; break; }
		case 5: {month="июня"; break; }
		case 6: {month="июля"; break; }
		case 7: {month="августа"; break; }
		case 8: {month="сентября"; break; }
		case 9: {month="октября"; break; }
		case 10: {month="ноября"; break; }
		case 11: {month="декабря"; break; }
	}

	day = dat.getDay();
	switch (day)
	{
		case 1: { day="понедельник"; break; }
		case 2: { day="вторник"; break; }
		case 3: { day="среда"; break; }
		case 4: { day="четверг"; break; }
		case 5: { day="пятница"; break; }
		case 6: { day="суббота"; break; }
		case 0: { day="воскресенье"; break; }
	}

	strDate = nday+"-"+month+"-"+dat.getFullYear().toString()+", "+day;
	date.innerText=strDate;
}
setInterval(dateClock, 1000);


var getMonthIn = function(monthName)
{
	var monthIn;
	switch (monthName)
	{
		case "-января-": {monthIn=0; break; }
		case "-февраля-": {monthIn=1; break; }
		case "-марта-": {monthIn=2; break; }
		case "-апреля-": {monthIn=3; break; }
		case "-мая-": {monthIn=4; break; }
		case "-июня-": {monthIn=5; break; }
		case "-июля-": {monthIn=6; break; }
		case "-августа-": {monthIn=7; break; }
		case "-сентября-": {monthIn=8; break; }
		case "-октября-": {monthIn=9; break; }
		case "-ноября-": {monthIn=10; break; }
		case "-декабря-": {monthIn=11; break; }
	}
	return monthIn;
}

var chooseThisDay = function(time)
{
	var r = time.match(/\d{2}-[а-я]*-20\d{2}/);
	var dateM = date.outerText.match(/\d{2}-[а-я]*-20\d{2}/);
	if (r[0]==dateM[0]) return true;
	else return false;
}

var chooseThisMonth = function(time)
{
	var r = time.match(/-[а-я]*-/);
	monthM = '-'+month+'-';
	if (r[0]==monthM) return true;
	else return false;
}

var getTwoMarks = function(time)
{
	var dat = new Date();				//сейчас
	datNow=dat.getTime();

	var regY = time.match(/-20\d\d/);
	var Y = regY[0].match(/20\d\d/);
	var M = time.match(/-[а-я]*-/);
	var regD = time.match(/\d\d-/);
	var D = regD[0].match(/\d\d/);

	var dattwo = new Date(Y[0], getMonthIn(M[0]), D[0]);	//тогда
	datL = dattwo.getTime();

	var arr=new Array();
	arr.push(datNow); arr.push(datL);
	return arr;
}

var chooseThisWeek = function(time)
{
	var arr = getTwoMarks(time);
	if(arr[0]-604800000<=arr[1]) return true;
	else return false;
}

var chooseYesterday = function(time)
{
	var arr = getTwoMarks(time);
	if((arr[1]+172800000>=arr[0]) && (chooseThisDay(time)==false)) return true;
	else return false;
}
///////////////////////////////////////////////////////////////////////
var table = document.getElementById("tabl");
var enter = document.getElementById("entrance"); enter.checked=true;
var exit = document.getElementById("exit"); 	exit.checked=true;
var lines = new Array();
var select = document.getElementById("select");
//var myNote = document.getElementById("delivery");

var chooseImg = function(ent){
	if (ent==1) return '"arRight.png"';
	else return '"arLeft.png"';
}

var loadDataToTable = function(data, flagEnter, flagExit)
{
	table.innerHTML='<tr><td>Вход/Выход</td><td>Время</td><td>Сотрудник</td></tr>';
	if ((flagEnter==1) && (flagExit==1)) 
 	data.forEach(function(elem, num){
 		table.innerHTML+='<tr><td><img src = '+chooseImg(elem.ent)+'></td><td>'+elem.time+'</td><td><a href="worker.html">'+elem.worker+'</a></td></tr>';
	});

	else if (flagEnter==1)
 	data.forEach(function(elem, num){
 		if (elem.ent==1) {table.innerHTML+='<tr><td><img src = "arRight.png"></td><td>'+elem.time+'</td><td>'+elem.worker+'</td></tr>';
 		}
	});

 	else if (flagExit==1)
 	data.forEach(function(elem, num){
 		if (elem.ent==0) {table.innerHTML+='<tr><td><img src = "arLeft.png"></td><td>'+elem.time+'</td><td>'+elem.worker+'</td></tr>';
		}
	});
}


var xhr = new XMLHttpRequest();
 xhr.open('GET', 'enter.json', true);
 var categories = new Array();

 xhr.onload = function(){
 	var data = JSON.parse(this.responseText);
 	lines = data;

 	select.addEventListener("input", function(e){
		switch (this.value)
	{
		case "Все": {loadDataToTable(lines, enter.checked, exit.checked); break; }
		case "Сегодня": {selectF(lines, chooseThisDay); break; }
		case "Вчера": {selectF(lines, chooseYesterday); break; }
		case "Текущая неделя": {selectF(lines, chooseThisWeek); break; }
		case "Текущий месяц": {selectF(lines, chooseThisMonth); break; }
	}
	})

	var eventToSelect = function(select){
		var event = new Event("input");
		select.dispatchEvent(event);
	}

	enter.addEventListener("change", function(){
		eventToSelect(select);
	});

	exit.addEventListener("change", function(){
		eventToSelect(select);
	});

	var command = function(enter, exit, ar){
		if (enter.checked && exit.checked) loadDataToTable(ar, 1, 1);
		else if (enter.checked) loadDataToTable(ar, 1, 0);
		else loadDataToTable(ar, 0, 1);
	}

	var selectF = function(lines, func)
	{
		var newlist = lines.filter(function(el)
		{
			if (func(el.time)==true) return el;
		})
		command(enter, exit, newlist);
	}
	eventToSelect(select);
/////////////////////////////////////////////////////////////////////////////////////////////////////
	var trs = document.getElementsByTagName("tr");			//все строки
	for(i=1; i<trs.length; i++){
		var notes = new Array();
		var myNote = document.getElementById("delivery");	//текстовое поле
		trs[i].addEventListener("click", function(){		//для каждой строки при щелчке отображение поля ввода
			var tr = this;
			console.log(myNote);
			myNote.style.visibility = "visible";			//отобразить
			myNote.addEventListener("keypress", function(e){	//обработка нажатия энтера
				if(e.keyCode==13) {
					if (tr.cells[1].childNodes.length<2) tr.cells[1].innerHTML += '<img class="noteIm" src="note.png">';	//вставка ярлыка заметки
					myNote.style.visibility = "hidden";			//спрятать поле ввода
					str=myNote.value;
					notes.push(str);
					myNote.value='';
					tr.cells[1].lastChild.addEventListener("click", function(){
						myNote.style.disabled="disabled";
						myNote.value=notes[notes.length-1];
					})	//где и как хранить эти заметки?
				}
			})
		})
	}
////////////////////////////////////////////////////////////////////////////////////////////////////


 }

xhr.send(null);