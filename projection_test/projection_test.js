var currentTask = -1;
var amountTask = 10;
var timer;
var totalTime = 0;
var amountCorrectly = 0;
var reply1;
var reply2;
var arrayResult = new Array(amountTask);
var sumPhi1 = 0;
var sumPhi2 = 0;
var timeLastTurn = 0;
var turnScale = 100;
var selectedReply;

window.onload = function() {
	init();
	//newTask();
};

function init() {
	initButtonsActions();

	document.getElementById("specialty").oninput = buttonStart;
	document.getElementById("name").oninput = buttonStart;
	document.getElementById("surname").oninput = buttonStart;
	document.getElementById("group").oninput = buttonStart;
	document.getElementById("specialty").value = getCookie("specialty") == undefined ? "" : getCookie("specialty");
	document.getElementById("surname").value = getCookie("surname") == undefined ? "" : getCookie("surname");
	document.getElementById("name").value = getCookie("name") == undefined ? "" : getCookie("name");
	document.getElementById("group").value = getCookie("group") == undefined ? "" : getCookie("group");
	buttonStart();
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

function initButtonAnswersAction() {
	//for (var i = 1; i < 7; i++) {
	document.getElementById("td" + 1).onclick = function(e) {
		i = 1;
		document.getElementById("td" + i).style.backgroundColor = '#ffe487';
		if (selectedReply == -1)
			selectedReply = i;
		else if (selectedReply == i) {
			selectedReply = -1;
			document.getElementById("td" + i).style.backgroundColor = 'white';
		} else
			checkReply(selectedReply, i);
	};
	document.getElementById("td" + 2).onclick = function(e) {
		i = 2;
		document.getElementById("td" + i).style.backgroundColor = '#ffe487';
		if (selectedReply == -1)
			selectedReply = i;
		else if (selectedReply == i) {
			selectedReply = -1;
			document.getElementById("td" + i).style.backgroundColor = 'white';
		} else
			checkReply(selectedReply, i);
	};
	document.getElementById("td" + 3).onclick = function(e) {
		i = 3;
		document.getElementById("td" + i).style.backgroundColor = '#ffe487';
		if (selectedReply == -1)
			selectedReply = i;
		else if (selectedReply == i) {
			selectedReply = -1;
			document.getElementById("td" + i).style.backgroundColor = 'white';
		} else
			checkReply(selectedReply, i);
	};
	document.getElementById("td" + 4).onclick = function(e) {
		i = 4;
		document.getElementById("td" + i).style.backgroundColor = '#ffe487';
		if (selectedReply == -1)
			selectedReply = i;
		else if (selectedReply == i) {
			selectedReply = -1;
			document.getElementById("td" + i).style.backgroundColor = 'white';
		} else
			checkReply(selectedReply, i);
	};
	document.getElementById("td" + 5).onclick = function(e) {
		i = 5;
		document.getElementById("td" + i).style.backgroundColor = '#ffe487';
		if (selectedReply == -1)
			selectedReply = i;
		else if (selectedReply == i) {
			selectedReply = -1;
			document.getElementById("td" + i).style.backgroundColor = 'white';
		} else
			checkReply(selectedReply, i);
	};
	document.getElementById("td" + 6).onclick = function(e) {
		i = 6;
		document.getElementById("td" + i).style.backgroundColor = '#ffe487';
		if (selectedReply == -1)
			selectedReply = i;
		else if (selectedReply == i) {
			selectedReply = -1;
			document.getElementById("td" + i).style.backgroundColor = 'white';
		} else
			checkReply(selectedReply, i);
	};
	//}
}

function initRotation() {
	document.getElementById("ThreeJS").onmousedown = function(e) {
		clickX = e.pageX;
		clickY = e.pageY;
		window.onmousemove = function(e2) {
			var x = e2.pageX - clickX;
			var y = e2.pageY - clickY;
			sumPhi1 += phi1;
			sumPhi2 += phi2;
			phi1 += x / turnScale;
			phi2 -= y / turnScale;
			sumPhi1 -= phi1;
			sumPhi2 -= phi2;
			if (phi2 > Math.PI / 2)
				phi2 = Math.PI / 2;
			else if (phi2 < -Math.PI / 2)
				phi2 = -Math.PI / 2;
			if (new Date() - timeLastTurn > 100) {
				arrayResult[currentTask].amountTurn++;
				arrayResult[currentTask].phi1.push(sumPhi1);
				arrayResult[currentTask].phi2.push(sumPhi2);
				sumPhi1 = 0;
				sumPhi2 = 0;
			}
			clickX = e2.pageX;
			clickY = e2.pageY;
			render(document.getElementById("ThreeJS"), consts, phi1, phi2);
			timeLastTurn = new Date();
		};
	};

	window.onmouseup = function(e) {
		window.onmousemove = null;
	};
}

function newTask() {
	if (currentTask != -1) {
		arrayResult[currentTask].phi1.push(sumPhi1);
		arrayResult[currentTask].phi2.push(sumPhi2);
		arrayResult[currentTask].phi1.splice(0, 1);
		arrayResult[currentTask].phi2.splice(0, 1);
	}
	selectedReply = -1;
	initButtonAnswersAction();
	currentTask++;

	for (var i = 1; i < 7; i++) {
		document.getElementById("td" + i).style.backgroundColor = 'white';
	}

	phi1 = 3 * Math.PI / 4;
	phi2 = -Math.PI / 4;
	var numberScene = Math.floor(Math.random() * 4);
	var orientation = Math.floor(Math.random() * 3);
	consts = getRandomConsts(numberScene, orientation);
	render(document.getElementById("ThreeJS"), consts, phi1, phi2);

	var rr = [];
	for (var i = 0; i < 4; i++) {
		rr.push(i);
		rr.push(i);
	}
	rr.push(numberScene);
	rr.push(numberScene);

	for (var i = 1; i < 7; i++) {
		//var r = Math.floor(Math.random() * 4);
		//var k = Math.floor(Math.random() * 3);
		var rrand = Math.floor(Math.random() * rr.length);
		var k = Math.floor(Math.random() * 3);
		var r = rr[rrand];
		rr.shift[rrand];
		var p1;
		var p2;
		if (k == 2)
			p1 = 2 * Math.floor(Math.random() * 2) + 1;
		else
			p1 = 2 * Math.floor(Math.random() * 2);
		if (k == 1)
			p1 = 2 * Math.floor(Math.random() * 2);
		else
			p1 = 2 * Math.floor(Math.random() * 2) + 1;
		if (k == 1)
			p2 = 0;
		else
			p2 = 1 - Math.floor(Math.random() * 2) * 2;
		//if (r == numberScene) {r = (r + 2) % 4;}
		if (orientation == k) {
			k = (k + 1) % 3;
		}
		renderOrt(document.getElementById("ThreeJS" + i), getRandomConsts(r, k), p1 / 2 * Math.PI, p2 / 2 * Math.PI);
	}

	reply1 = Math.floor(Math.random() * 6) + 1;
	do {
		reply2 = Math.floor(Math.random() * 6) + 1;
	} while(reply1 == reply2);
	var p11 = Math.floor(Math.random() * 4);
	do {
		p21 = Math.floor(Math.random() * 4);
	} while((p11 % 2) == (p21 % 2));
	var p12 = (1 - Math.floor(Math.random() * 3));
	do {
		p22 = (1 - Math.floor(Math.random() * 3));
	} while(Math.abs(p12) == Math.abs(p22));
	renderOrt(document.getElementById("ThreeJS" + reply1), consts, p11 / 2 * Math.PI, p12 / 2 * Math.PI);
	renderOrt(document.getElementById("ThreeJS" + reply2), consts, p21 / 2 * Math.PI, p22 / 2 * Math.PI);

	arrayResult[currentTask] = {
		numberTask : currentTask,
		amountTurn : 0,
		phi1 : [],
		phi2 : []
	};
	timer = new Date();
	console.log(reply1, reply2);
}

function checkReply(a, b) {
	var time = Math.floor((new Date() - timer) / 100) / 10;
	totalTime += time;
	arrayResult[currentTask].time = time;
	//document.getElementById("td" + reply).style.backgroundColor = 'green';
	if (a == reply1 && b == reply2 || a == reply2 && b == reply1) {
		document.getElementById("td" + a).style.backgroundColor = 'green';
		document.getElementById("td" + b).style.backgroundColor = 'green';
		arrayResult[currentTask].result = true;
		amountCorrectly++;
	} else {
		arrayResult[currentTask].result = false;
	}
	if (currentTask + 1 < amountTask) {
		setTimeout(newTask, 1500);
	} else {
		showResult();
		document.getElementById("test").style.visibility = "hidden";
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
	table.appendChild(tr1);
	table.appendChild(tr2);
	table.appendChild(tr3);
	table.appendChild(tr4);
	var td1 = document.createElement('td');
	var td2 = document.createElement('td');
	var td3 = document.createElement('td');
	var td4 = document.createElement('td');
	td1.innerHTML = "Номер вопроса";
	td2.innerHTML = "Правильсть";
	td3.innerHTML = "Количество поворотов";
	td4.innerHTML = "Время";
	tr1.appendChild(td1);
	tr2.appendChild(td2);
	tr3.appendChild(td3);
	tr4.appendChild(td4);
	for (var i = 0; i < amountTask; i++) {
		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		var td3 = document.createElement('td');
		var td4 = document.createElement('td');
		td1.innerHTML = i + 1;
		td2.innerHTML = arrayResult[i].result ? "+" : "-";
		td3.innerHTML = arrayResult[i].amountTurn;
		td4.innerHTML = arrayResult[i].time;
		if (arrayResult[i].result) {
			td2.style.backgroundColor = "green";
		} else {
			td2.style.backgroundColor = "red";
		}
		tr1.appendChild(td1);
		tr2.appendChild(td2);
		tr3.appendChild(td3);
		tr4.appendChild(td4);
	}
	result.innerHTML += "количество верных ответов:" + amountCorrectly + "/" + amountTask + "<br> среднее время:" + (totalTime / amountTask);
	result.innerHTML += '<br> <a href="../">Вернуться к выбору теста</a>';
	result.innerHTML += '<br> <a href="">Вернуться к выбору режима</a>';

	var xhr = new XMLHttpRequest();
	var params = 'specialty=' + "математик" + '&name=' + document.getElementById("name").value + '&surname=' + document.getElementById("surname").value + '&group_number=' + document.getElementById("group").value + '&number_correc=' + amountCorrectly + '&number_task=' + amountTask + '&average_time=' + (totalTime / amountTask) + '&array_result=' + JSON.stringify(arrayResult) + '&mode=' + mode;
	xhr.open("POST", "projection_test_result.php", true);
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