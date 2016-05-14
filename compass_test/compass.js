var x = [577, 577, 414, 186, 23, 23, 186, 414, 577];
var y = [186, 414, 577, 577, 414, 186, 23, 23, 186];
var nameSide = ["В", "ЮВ", "Ю", "ЮЗ", "З", "СЗ", "С", "СВ"];
/*var arrayResultSideShown = new Array(20);
 var arrayResultSideSelected = new Array(20);
 var arrayResultSideTrue = new Array(20);
 var arrayResultTime = new Array(20);*/
var sideShown;
var sideTrue;
var turnCompass;
var currentTask = -1;
var amountTask = 10;
var timer;
var totalTime = 0;
var amountCorrectly = 0;
var arrayResult = new Array(amountTask);

window.onload = function() {

	document.getElementById("specialty").oninput = buttonStart;
	document.getElementById("name").oninput = buttonStart;
	document.getElementById("surname").oninput = buttonStart;
	document.getElementById("group").oninput = buttonStart;
	document.getElementById("specialty").value = getCookie("specialty") == undefined ? "" : getCookie("specialty");
	document.getElementById("surname").value = getCookie("surname") == undefined ? "" : getCookie("surname");
	document.getElementById("name").value = getCookie("name") == undefined ? "" : getCookie("name");
	document.getElementById("group").value = getCookie("group") == undefined ? "" : getCookie("group");
	buttonStart();

	document.getElementById("buttonStart").onclick = function(e) {
		document.cookie = "name=" + document.getElementById("name").value +"; path=/;";
		document.cookie = "surname=" + document.getElementById("surname").value + "; path=/;";
		document.cookie = "group=" + document.getElementById("group").value + "; path=/;";
		document.cookie = "specialty=" + document.getElementById("specialty").value+"; path=/;";
		
		document.getElementById("start").style.visibility = "hidden";
		document.getElementById("test").style.visibility = "visible";
		document.getElementById("test2").style.visibility = "visible";
		newTask();
	};

	document.getElementById("mouse").onmousemove = function(e) {
		var numderSector = side(e);
		var sector = document.getElementById("sector");
		sector.setAttribute("d", "M 300,300 L " + x[numderSector + 1] + "," + y[numderSector + 1] + " A 300,300,0,0,0," + x[numderSector] + "," + y[numderSector] + " z");
	};

	document.getElementById("mouse").onclick = function(e) {
		var numderSector = side(e);
		if (numderSector == ((sideShown + turnCompass) % 8))
			return null;
		if (numderSector == ((sideTrue + turnCompass) % 8)) {
			//sectorTrue.setAttribute("fill", "green");
			sectorTrue.setAttribute("d", "M 300,300 L " + x[numderSector + 1] + "," + y[numderSector + 1] + " A 300,300,0,0,0," + x[numderSector] + "," + y[numderSector] + " z");
			amountCorrectly++;
		}
		if (numderSector != ((sideTrue + turnCompass) % 8)) {
			var n = (sideTrue + turnCompass) % 8;
			sector.setAttribute("fill", "#ff2e3d");
			sector.setAttribute("d", "M 300,300 L " + x[numderSector + 1] + "," + y[numderSector + 1] + " A 300,300,0,0,0," + x[numderSector] + "," + y[numderSector] + " z");
			sectorTrue.setAttribute("d", "M 300,300 L " + x[n + 1] + "," + y[n + 1] + " A 300,300,0,0,0," + x[n] + "," + y[n] + " z");
		}
		mouse.style.visibility = "hidden";
		showCompass();
		arrayResult[currentTask] = {};
		arrayResult[currentTask].numberTask = currentTask;
		arrayResult[currentTask].sideShown = sideShown;
		arrayResult[currentTask].sideSelected = (8 + numderSector - turnCompass) % 8;
		arrayResult[currentTask].sideTrue = sideTrue;
		arrayResult[currentTask].time = Math.floor((new Date() - timer) / 100) / 10;
		totalTime += arrayResult[currentTask].time;

		if (currentTask + 1 < amountTask) {
			setTimeout(newTask, 1500);
		} else {
			showResult();

		}
	};

	buttonStart();
};

function buttonStart(e) {
	if (document.getElementById("specialty").value == "" || document.getElementById("surname").value == "" || document.getElementById("name").value == "" || document.getElementById("group").value == "") {
		document.getElementById("buttonStart").disabled = true;
	} else {
		document.getElementById("buttonStart").disabled = false;
	}

};

function side(e) {
	var x = e.offsetX == undefined ? e.layerX : e.offsetX;
	var y = e.offsetY == undefined ? e.layerY : e.offsetY;
	x -= 300;
	y -= 300;
	var phi;
	if (x > 0 && y >= 0)
		phi = Math.atan(y / x);
	else if (x > 0 && y < 0)
		phi = Math.atan(y / x) + 2 * Math.PI;
	else if (x < 0)
		phi = Math.atan(y / x) + Math.PI;
	else if (x == 0 && y > 0)
		phi = 1.5 * Math.PI;
	else if (x == 0 && y < 0)
		phi = Math.PI;
	return Math.floor((phi + Math.PI / 8) * 4 / Math.PI % 8);
}

function newTask() {
	currentTask++;
	mouse.style.visibility = "visible";
	sector.setAttribute("fill", "orange");
	sectorTrue.setAttribute("d", "");
	clearCompass();
	sideShown = randomSide();
	turnCompass = randomSide();
	do {
		sideTrue = randomSide();
	} while(sideShown == sideTrue);
	a1.innerHTML = nameSide[sideTrue];
	document.getElementById("s" + ((sideShown + turnCompass) % 8)).innerHTML = nameSide[sideShown];
	timer = new Date();
}

function clearCompass() {
	for (var i = 0; i < 8; i++) {
		document.getElementById("s" + i).innerHTML = "";
	}
}

function showCompass() {
	for (var i = 0; i < 8; i++) {
		document.getElementById("s" + i).innerHTML = nameSide[(8 + i - turnCompass) % 8];
	}
}

function randomSide() {
	return Math.floor(Math.random() * 8);
}

function showResult() {
	var table = document.getElementById("table");
	result.style.visibility = "visible";
	document.getElementById("test").style.visibility = "hidden";
	document.getElementById("test2").style.visibility = "hidden";
	clearCompass();
	table.innerHTML = "";
	var tr1 = document.createElement('tr');
	var tr2 = document.createElement('tr');
	var tr3 = document.createElement('tr');
	var tr4 = document.createElement('tr');
	var tr5 = document.createElement('tr');
	table.appendChild(tr1);
	table.appendChild(tr2);
	table.appendChild(tr3);
	table.appendChild(tr4);
	table.appendChild(tr5);

	var td1 = document.createElement('td');
	var td2 = document.createElement('td');
	var td3 = document.createElement('td');
	var td4 = document.createElement('td');
	var td5 = document.createElement('td');
	td1.innerHTML = "Номер вопроса";
	td2.innerHTML = "Известное направление";
	td3.innerHTML = "Нужное направление";
	td4.innerHTML = "Выбранное направление";
	td5.innerHTML = "Время";
	tr1.appendChild(td1);
	tr2.appendChild(td2);
	tr3.appendChild(td3);
	tr4.appendChild(td4);
	tr5.appendChild(td5);
	for (var i = 0; i < amountTask; i++) {
		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		var td3 = document.createElement('td');
		var td4 = document.createElement('td');
		var td5 = document.createElement('td');
		td1.innerHTML = i + 1;
		td2.innerHTML = nameSide[arrayResult[i].sideShown];
		td3.innerHTML = nameSide[arrayResult[i].sideTrue];
		td4.innerHTML = nameSide[arrayResult[i].sideSelected];
		td5.innerHTML = arrayResult[i].time;
		if (arrayResult[i].sideTrue == arrayResult[i].sideSelected) {
			td4.style.backgroundColor = "green";
		} else {
			td4.style.backgroundColor = "#ff2e3d";
		}
		tr1.appendChild(td1);
		tr2.appendChild(td2);
		tr3.appendChild(td3);
		tr4.appendChild(td4);
		tr5.appendChild(td5);
	}
	result.innerHTML += "количество верных ответов:" + amountCorrectly + "/" + amountTask + "<br> среднее время:" + (totalTime / amountTask) + "<br>";
	result.innerHTML += '<a href="../">Вернуться к выбору теста</a>';

	var xhr = new XMLHttpRequest();
	var params = 'specialty=' + "математик" + '&name=' + document.getElementById("name").value + '&surname=' + document.getElementById("surname").value + '&group_number=' + document.getElementById("group").value + '&number_correc=' + amountCorrectly + '&number_task=' + amountTask + '&average_time=' + (totalTime / amountTask) + '&array_result=' + JSON.stringify(arrayResult);
	//xhr.open("POST", "http://mentalrotation.orisale.ru/compass.php", true);
	xhr.open("POST", "compass_result.php", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				result.innerHTML += xhr.responseText;
			}
		}
	};
	xhr.send(params);
}

function getCookie(name) {
	var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}