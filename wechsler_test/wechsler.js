var currentTask = -1;
var amountTask = 10;
var timer;
var totalTime = 0;
var amountCorrectly = 0;
var reply;
var arrayResult = new Array(amountTask);
var sumPhi1 = 0;
var sumPhi2 = 0;
var timeLastTurn = 0;
var turnScale = 100;

window.onload = function() {
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
	if (document.getElementById("specialty").value == "" || 
	document.getElementById("surname").value == "" || document.getElementById("name").value == "" || document.getElementById("group").value == "") {
		document.getElementById("buttonStart1").disabled = true;
		document.getElementById("buttonStart2").disabled = true;
	} else {
		document.getElementById("buttonStart1").disabled = false;
		document.getElementById("buttonStart2").disabled = false;
	}
};

function initButtonAnswersAction() {
	document.getElementById("canvas0").onclick = function(e) {
		checkReply(0);
	};
	document.getElementById("canvas1").onclick = function(e) {
		checkReply(1);
	};
	document.getElementById("canvas2").onclick = function(e) {
		checkReply(2);
	};
	document.getElementById("canvas3").onclick = function(e) {
		checkReply(3);
	};
}

function removeButtonAnswersAction() {
	document.getElementById("canvas0").onclick = null;
	document.getElementById("canvas1").onclick = null;
	document.getElementById("canvas2").onclick = null;
	document.getElementById("canvas3").onclick = null;
}

function initRotation() {
	document.getElementById("canvasCube").onmousedown = function(e) {
		clickX = e.pageX;
		clickY = e.pageY;
		window.onmousemove = function(e2) {
			//document.getElementById("label").innerHTML = arrayResult[currentTask].amountTurn;
			var x = e2.pageX - clickX;
			var y = e2.pageY - clickY;
			sumPhi1 += x / turnScale;
			sumPhi2 += y / turnScale;
			if (new Date() - timeLastTurn > 200) {
				arrayResult[currentTask].amountTurn++;
				arrayResult[currentTask].phi1.push(sumPhi1);
				arrayResult[currentTask].phi2.push(sumPhi2);
				sumPhi1 = 0;
				sumPhi2 = 0;
			}
			turnPoints(points, x / turnScale, -y / turnScale);
			render(document.getElementById("canvasCube"), poligons);
			turnPointsBack(points);
			render(document.getElementById("canvasCubeBack"), poligons);
			turnPointsBack(points);
			clickX = e2.pageX;
			clickY = e2.pageY;
			timeLastTurn = new Date();
		};
	};

	document.getElementById("canvasCubeBack").onmousedown = function(e) {
		clickX = e.pageX;
		clickY = e.pageY;
		window.onmousemove = function(e2) {
			//document.getElementById("label").innerHTML = arrayResult[currentTask].amountTurn;
			var x = e2.pageX - clickX;
			var y = e2.pageY - clickY;
			sumPhi1 += x / turnScale;
			sumPhi2 += y / turnScale;
			if (new Date() - timeLastTurn > 300) {
				arrayResult[currentTask].amountTurn++;
				arrayResult[currentTask].phi1.push(sumPhi1);
				arrayResult[currentTask].phi2.push(sumPhi2);
				sumPhi1 = 0;
				sumPhi2 = 0;
			}
			turnPoints(points, x / turnScale, y / turnScale);
			render(document.getElementById("canvasCube"), poligons);
			turnPointsBack(points);
			render(document.getElementById("canvasCubeBack"), poligons);
			turnPointsBack(points);
			clickX = e2.pageX;
			clickY = e2.pageY;
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

	initButtonAnswersAction();
	for (var i = 0; i < 4; i++) {
		document.getElementById("td" + i).style.backgroundColor = 'white';
	}
	currentTask++;
	var scan = getRandomScane();
	var scans = allScans(scan);
	initCube(scan);
	var sc = [];
	reply = Math.floor(Math.random() * 4);
	var i = 0;
	while (i < 4) {
		//sc[i] = getRandomScane();
		sc[i] = JSON.parse(JSON.stringify(scan));
		var r1 = Math.floor(Math.random() * 6);
		var r2 = (r1 + Math.floor(Math.random() * 5) + 1) % 6;
		var k = sc[i][r1];
		sc[i][r1] = sc[i][r2];
		sc[i][r2] = k;
		var flag = false;
		for (var j = 0; j < scans.length; j++) {
			if (equalseScan(scans[j], sc[i]))
				flag = true;
		}
		if (flag == false)
			i++;
	}
	for (var i = 0; i < 4; i++) {
		renderScan(document.getElementById("canvas" + i), getPoligonsScan(sc[i]));
		//renderScan(document.getElementById("canvas" + i), getPoligonsScan(scans[i]));
	}
	console.log(reply);
	
	
	//renderScan(document.getElementById("canvas0"), getPoligonsScan(scan));
	renderScan(document.getElementById("canvas" + reply), getPoligonsScan(scan));
	
	//turnPoints(points, 2 * Math.PI * Math.random(), 2 * Math.PI * Math.random());
	//console.log(reply);

	turnPoints(points, 0, Math.PI * Math.floor(Math.random() * 4) / 2);
	turnPoints(points, Math.PI * Math.floor(Math.random() * 4) / 2, 0);
	turnPoints(points, Math.PI / 4, 0);
	turnPoints(points, 0, -Math.PI / 5);
	render(document.getElementById("canvasCube"), poligons);
	turnPointsBack(points);
	render(document.getElementById("canvasCubeBack"), poligons);
	turnPointsBack(points);
	arrayResult[currentTask] = {
		numberTask : currentTask,
		amountTurn : 0,
		phi1 : [],
		phi2 : []
	};
	timer = new Date();
}

function checkReply(a) {
	removeButtonAnswersAction();
	var time = Math.floor((new Date() - timer) / 100) / 10;
	totalTime += time;
	arrayResult[currentTask].time = time;
	document.getElementById("td" + reply).style.backgroundColor = '#3cb2a8';
	if (a == reply) {
		arrayResult[currentTask].result = true;
		amountCorrectly++;
	} else {
		arrayResult[currentTask].result = false;
		document.getElementById("td" + a).style.backgroundColor = 'red';
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
	xhr.open("POST", "wechsler_result.php", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				result.innerHTML += xhr.responseText;
			}
		}
	};
	xhr.send(params);
	//document.getElementById("start").style.visibility = "visible";
	//document.getElementById("test").style.visibility = "hidden";
	//alert(amountCorrectly + "/" + amountTask + "  " + (totalTime / amountTask));

}

function getRandomScane() {
	newScan = [];
	for (var i = 0; i < 6; i++) {
		newScan[i] = [];
		for (var j = 0; j < 4; j++) {
			var color;
			if (Math.random() < 0.3)
				color = 1;
			else
				color = 0;
			newScan[i][j] = color;
		}
	}
	return newScan;
}

function equalseScan(arg1, arg2) {
	for (var i = 0; i < arg1.length; i++) {
		for (var j = 0; j < arg1[i].length; j++) {
			if (arg1[i][j] != arg2[i][j])
				return false;
		}
	}
	return true;
}

function turnPointsBack(points) {
	for (var i = 0; i < points.length; i++) {
		points[i].x *= -1;
		points[i].y *= -1;
	}
}
