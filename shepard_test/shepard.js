var currentTask = -1;
var amountTask = 10;
var timer;
var totalTime = 0;
var amountCorrectly = 0;
var reply;
var numberImg = 3;
var poligons1;
var poligons2;
var arrayResult = new Array(amountTask);
var timeLastTurn1 = 0;
var timeLastTurn2 = 0;
var turnScale = 100;
sumPhi11 = 0;
sumPhi12 = 0;
sumPhi21 = 0;
sumPhi22 = 0;

window.onload = function() {
	document.getElementById("replyYes").onclick = function(e) {
		checkReply(true);
	};

	document.getElementById("replyNo").onclick = function(e) {
		checkReply(false);
	};

	document.getElementById("specialty").oninput = buttonStart;
	document.getElementById("name").oninput = buttonStart;
	document.getElementById("surname").oninput = buttonStart;
	document.getElementById("group").oninput = buttonStart;

	document.getElementById("specialty").value = getCookie("specialty") == undefined ? "" : getCookie("specialty");
	document.getElementById("surname").value = getCookie("surname") == undefined ? "" : getCookie("surname");
	document.getElementById("name").value = getCookie("name") == undefined ? "" : getCookie("name");
	document.getElementById("group").value = getCookie("group") == undefined ? "" : getCookie("group");
	buttonStart();

	initButtonsActions();
};

function buttonStart(e) {
	if (document.getElementById("specialty").value == "" || document.getElementById("surname").value == "" || document.getElementById("name").value == "" || document.getElementById("group").value == "") {
		document.getElementById("buttonStart1").disabled = true;
		document.getElementById("buttonStart2").disabled = true;
	} else {
		document.getElementById("buttonStart1").disabled = false;
		document.getElementById("buttonStart2").disabled = false;
	}
};

function initRotation() {
	document.getElementById("canvas1").onmousedown = function(e) {
		clickX = e.pageX;
		clickY = e.pageY;
		window.onmousemove = function(e2) {
			var x = e2.pageX - clickX;
			var y = e2.pageY - clickY;
			sumPhi11 += x / turnScale;
			sumPhi12 += -y / turnScale;
			if (new Date() - timeLastTurn1 > 150) {
				arrayResult[currentTask].amountTurn1++;
				arrayResult[currentTask].phi11.push(sumPhi11);
				arrayResult[currentTask].phi12.push(sumPhi12);
				sumPhi11 = 0;
				sumPhi12 = 0;
			}
			turn(poligons1, x / turnScale, -y / turnScale);
			render(document.getElementById("canvas1"), poligons1);
			clickX = e2.pageX;
			clickY = e2.pageY;
			timeLastTurn1 = new Date();
		};
	};

	document.getElementById("canvas2").onmousedown = function(e) {
		clickX = e.pageX;
		clickY = e.pageY;
		window.onmousemove = function(e2) {
			var x = e2.pageX - clickX;
			var y = e2.pageY - clickY;
			sumPhi21 += x / turnScale;
			sumPhi22 += -y / turnScale;
			if (new Date() - timeLastTurn2 > 150) {
				arrayResult[currentTask].amountTurn2++;
				arrayResult[currentTask].phi21.push(sumPhi21);
				arrayResult[currentTask].phi22.push(sumPhi22);
				sumPhi21 = 0;
				sumPhi22 = 0;
			}
			turn(poligons2, x / turnScale, -y / turnScale);
			render(document.getElementById("canvas2"), poligons2);
			clickX = e2.pageX;
			clickY = e2.pageY;
			timeLastTurn2 = new Date();
		};
	};

	window.onmouseup = function(e) {
		window.onmousemove = null;
	};
}

function newTask() {
	if (currentTask != -1) {
		arrayResult[currentTask].phi11.push(sumPhi11);
		arrayResult[currentTask].phi12.push(sumPhi12);
		arrayResult[currentTask].phi21.push(sumPhi21);
		arrayResult[currentTask].phi22.push(sumPhi22);
		arrayResult[currentTask].phi11.splice(0, 1);
		arrayResult[currentTask].phi12.splice(0, 1);
		arrayResult[currentTask].phi21.splice(0, 1);
		arrayResult[currentTask].phi22.splice(0, 1);
	}
	currentTask++;
	var n1 = Math.floor(Math.random() * figures.length);
	var n2;
	if (Math.random() < 0.4) {
		n2 = n1;
		reply = true;
	} else {
		do {
			n2 = Math.floor(Math.random() * figures.length);
		} while(n1 == n2);
		reply = false;
	}
	poligons1 = JSON.parse(JSON.stringify(figures[n1]));
	poligons2 = JSON.parse(JSON.stringify(figures[n2]));
	var turn1 = (Math.floor(Math.random() * 4) * 2 + 1);
	turn(poligons1, turn1 * Math.PI / 4, 0);
	turn(poligons1, 0, -(Math.floor(Math.random() * 2) * 2 + 1) * Math.PI / 4);
	turn(poligons2, (Math.floor(Math.random() * 2) * 2 + 2 - turn1) * Math.PI / 4, 0);
	turn(poligons2, 0, -(Math.floor(Math.random() * 2) * 2 + 1) * Math.PI / 4);
	render(document.getElementById("canvas1"), poligons1);
	render(document.getElementById("canvas2"), poligons2);
	document.getElementById("replyYes").disabled = false;
	document.getElementById("replyNo").disabled = false;
	arrayResult[currentTask] = {
		numberTask : currentTask,
		amountTurn1 : 0,
		amountTurn2 : 0,
		phi11 : [],
		phi12 : [],
		phi21 : [],
		phi22 : []
	};
	timer = new Date();
}

function checkReply(a) {
	document.getElementById("replyYes").disabled = true;
	document.getElementById("replyNo").disabled = true;
	var time = Math.floor((new Date() - timer) / 100) / 10;
	arrayResult[currentTask].reply = a;
	arrayResult[currentTask].time = time;
	totalTime += time;
	if (a == reply) {
		arrayResult[currentTask].result = true;
		amountCorrectly++;
	} else {
		arrayResult[currentTask].result = false;
	}

	if (currentTask + 1 < amountTask) {
		newTask();
	} else {
		document.getElementById("test").style.visibility = "hidden";
		showResult();
	}
}

function showResult() {
	var table = document.getElementById("table");
	result.style.visibility = "visible";
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
	td2.innerHTML = "Выбранный ответ";
	td3.innerHTML = "Количество поворотов первого изображения";
	td4.innerHTML = "Количество поворотов второго изображения";
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
		td2.innerHTML = arrayResult[i].reply ? "С" : "Н";
		td3.innerHTML = arrayResult[i].amountTurn1;
		td4.innerHTML = arrayResult[i].amountTurn2;
		td5.innerHTML = arrayResult[i].time;
		if (arrayResult[i].result) {
			td2.style.backgroundColor = "green";
		} else {
			td2.style.backgroundColor = "red";
		}
		tr1.appendChild(td1);
		tr2.appendChild(td2);
		tr3.appendChild(td3);
		tr4.appendChild(td4);
		tr5.appendChild(td5);
	}
	result.innerHTML += "количество верных ответов:" + amountCorrectly + "/" + amountTask + "<br> среднее время:" + (totalTime / amountTask);
	result.innerHTML += '<br> <a href="../">Вернуться к выбору теста</a>';
	result.innerHTML += '<br> <a href="">Вернуться к выбору режима</a>';

	var xhr = new XMLHttpRequest();
	var params = 'specialty=' + "математик" + '&name=' + document.getElementById("name").value + '&surname=' + document.getElementById("surname").value + '&group_number=' + document.getElementById("group").value + '&number_correc=' + amountCorrectly + '&number_task=' + amountTask + '&average_time=' + (totalTime / amountTask) + '&array_result=' + JSON.stringify(arrayResult) + '&mode=' + mode;
	xhr.open("POST", "shepard_result.php", true);
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
