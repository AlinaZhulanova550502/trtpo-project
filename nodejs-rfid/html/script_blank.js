var nm = document.getElementById("name");
var surname = document.getElementById("surname");
var secondname = document.getElementById("secondname");

var email = document.getElementById("email");
var photo = document.getElementById("photo");
var wh = document.getElementById("wh");

var position = document.getElementById("position");
var place = document.getElementById("place");
var btn = document.getElementById("btn");


checkName = function(text, nm){
	var fullName = '';
	for(var i=0; i<3; i++)
	{
		ref = text.match(/[А-Яа-я][а-я]{2,}\-*[А-Я]*[а-я]*\s*/);
		if (ref==null) break;
		text=text.replace(ref[0], ' ');
		if(ref!=null) fullName += ref[0];
		nm.value = fullName;
	}
	if(fullName=='') 
	{
		alert("Неверный ввод имени/фамилии/отчества");
		nm.value = '';
	}
}

checkWH = function(){
	ref = whV.match(/[0,1]\d.[0-3]0-1\d.[0-3]0/);
	if (ref!=null) return;
	else 
	{
		alert("Неверный ввод рабочих часов");
		wh.value = '';
		return;
	}
}

inputEmail = function(){
	emInp = email.value;
}

checkEmail = function(){
	ref=emInp.match(/^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*[a-z][a-z]{1,3}$/);
	if (ref!=null)
		email.value = ref[0];
	else
	{
		alert("Неверный email");
		email.value = '';
		return;
	}
}

checkPhoto = function(){
	ref=photoV.match(/^[a-z]*.[jpg]*[png]*$/);
	if (ref!=null) photo.value = ref[0];
	else
	{
		alert("Неверное название файла");
		photo.value = '';
		return;
	}
}

btnClick = function(){
	alert("Форма отправлена");
}

nm.addEventListener('input', function(){text = nm.value});
surname.addEventListener('input', function(){text2 = surname.value});
secondname.addEventListener('input', function(){text3 = secondname.value});


nm.addEventListener('blur', function(){checkName(text, nm)});
surname.addEventListener('blur', function(){checkName(text2, surname)});
secondname.addEventListener('blur', function(){checkName(text3, secondname)});

email.addEventListener('input', inputEmail);
email.addEventListener('blur', checkEmail);

photo.addEventListener('input', function(){photoV = photo.value});
photo.addEventListener('blur', checkPhoto);

wh.addEventListener('input', function(){whV = wh.value});
wh.addEventListener('blur', checkWH);

btn.addEventListener('click', btnClick);