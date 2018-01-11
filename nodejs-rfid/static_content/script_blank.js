var nm = document.getElementById("name");		//поля
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
	ref = whF.match(/[0,1]\d.[0-3]0-1\d.[0-3]0/);
	if (ref!=null) return;
	else
	{
		alert("Неверный ввод рабочих часов");
		wh.value = '';
		return;
	}
}

inputEmail = function(){
	emailF = email.value;
}

checkEmail = function(){
	ref=emailF.match(/^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*[a-z][a-z]{1,3}$/);
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
	ref=photoF.match(/^[a-z]*.[jpg]*[png]*$/);
	if (ref!=null) photo.value = ref[0];
	else
	{
		alert("Неверное название файла");
		photo.value = '';
		return;
	}
}


////////////////////events/////////////////////////////////////////

nm.addEventListener('input', function(){nameF = nm.value});
surname.addEventListener('input', function(){surnameF = surname.value});
secondname.addEventListener('input', function(){secondnameF = secondname.value});

nm.addEventListener('blur', function(){checkName(nameF, nm)});
surname.addEventListener('blur', function(){checkName(surnameF, surname)});
secondname.addEventListener('blur', function(){checkName(secondnameF, secondname)});

email.addEventListener('input', inputEmail);
email.addEventListener('blur', checkEmail);

photo.addEventListener('input', function(){photoF = photo.value});
photo.addEventListener('blur', checkPhoto);

wh.addEventListener('input', function(){whF = wh.value});
wh.addEventListener('blur', checkWH);

btn.addEventListener('click', function(){
	var xhr = new XMLHttpRequest();
	var bodyJson = {
		'name': nm.value,
		'surname': surname.value,
		'second_name': secondname.value,
		'photo': photo.value,
		'position': position.value,
		'place': place.value,
		'email': email.value,
		'wh': wh.value
	};

	xhr.open("POST", '/submit', true);
	xhr.setRequestHeader('Content-Type', "application/json");

	// xhr.onreadystatechange = function(){
	// 	alert("Пользователь зарегистрирован");
	// };
	xhr.send(JSON.stringify(bodyJson));

	alert("Форма отправлена");
})