var currentTask = -1;
var amountTask = 10;
var timer;
var totalTime = 0;
var amountCorrectly = 0;
var reply;
var arrayResult = new Array(amountTask);
var sumPhi11 = 0;
var sumPhi12 = 0;
var sumPhi21 = 0;
var sumPhi22 = 0;
var timeLastTurn1 = 0;
var timeLastTurn2 = 0;
var turnScale = 150;
var cameras = new Array(4);
var scenes = new Array(4);
var renderers = new Array(4);
var containers = new Array(4);
var selectedReply;

window.onload = function() {
	var h = (document.documentElement.clientHeight-100)/3;
	var w = (document.documentElement.clientWidt-100)/3;
	var l = Math.min((document.documentElement.clientHeight-100)/3,(document.documentElement.clientWidth-100)/3);
	console.log(l);
	for(var i = 1; i<3;i++){
		document.getElementById("ThreeJS0"+i).height = l*2;
		document.getElementById("ThreeJS0"+i).width = l*2;
	}
	for(var i = 1; i<4;i++){
		document.getElementById("ThreeJS"+i).height = l;
		document.getElementById("ThreeJS"+i).width = l;
	}
	initButtonsActions();
	init();
};

function init() {
	initButtonAnswersAction();
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
	document.getElementById("reply" + 1).onclick = function(e) {
		checkReply(1);
	};
	document.getElementById("reply" + 2).onclick = function(e) {
		checkReply(2);
	};
}

function initRotation() {
	document.getElementById("ThreeJS01").onmousedown = function(e) {
		clickX = e.pageX;
		clickY = e.pageY;
		window.onmousemove = function(e2) {
			var x = e2.pageX - clickX;
			var y = e2.pageY - clickY;
			sumPhi11 += phi11;
			sumPhi12 += phi12;
			phi11 += x / turnScale;
			phi12 -= y / turnScale;
			sumPhi11 -= phi11;
			sumPhi12 -= phi12;
			if (phi12 > Math.PI / 2)
				phi12 = Math.PI / 2;
			else if (phi12 < -Math.PI / 2)
				phi12 = -Math.PI / 2;
			if (new Date() - timeLastTurn1 > 150) {
				arrayResult[currentTask].amountTurn1++;
				arrayResult[currentTask].phi11.push(sumPhi11);
				arrayResult[currentTask].phi12.push(sumPhi12);
				sumPhi11 = 0;
				sumPhi12 = 0;
			}
			clickX = e2.pageX;
			clickY = e2.pageY;
			render(document.getElementById("ThreeJS01"), consts1, phi11, phi12);
			timeLastTurn1 = new Date();
		};
	};
	document.getElementById("ThreeJS02").onmousedown = function(e) {
		clickX = e.pageX;
		clickY = e.pageY;
		window.onmousemove = function(e2) {
			var x = e2.pageX - clickX;
			var y = e2.pageY - clickY;
			sumPhi21 += phi21;
			sumPhi22 += phi22;
			phi21 += x / turnScale;
			phi22 -= y / turnScale;
			sumPhi21 -= phi21;
			sumPhi22 -= phi22;
			if (phi22 > Math.PI / 2)
				phi22 = Math.PI / 2;
			else if (phi22 < -Math.PI / 2)
				phi22 = -Math.PI / 2;
			if (new Date() - timeLastTurn2 > 150) {
				arrayResult[currentTask].amountTurn2++;
				arrayResult[currentTask].phi21.push(sumPhi21);
				arrayResult[currentTask].phi22.push(sumPhi22);
				sumPhi21 = 0;
				sumPhi22 = 0;
			}
			clickX = e2.pageX;
			clickY = e2.pageY;
			render(document.getElementById("ThreeJS02"), consts2, phi21, phi22);
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
	selectedReply = -1;
	currentTask++;

	var numberScene1 = Math.floor(Math.random() * 4);
	var numberScene2 = Math.floor(Math.random() * 4);
	var orientation1 = Math.floor(Math.random() * 3);
	var orientation2 = Math.floor(Math.random() * 3);
	if (numberScene1 == numberScene2 && orientation1 == orientation2)
		orientation2 = (orientation2 + 1) % 3;
	consts1 = getRandomConsts(numberScene1, orientation1);
	consts2 = getRandomConsts(numberScene2, orientation2);
	var r1 = Math.floor(Math.random() * 4);
	var r2 = Math.floor(Math.random() * 5);
	phi11 = 3 * Math.PI / 4;
	phi12 = -Math.PI / 4;
	phi21 = 3 * Math.PI / 4;
	phi22 = -Math.PI / 4;
	reply = 1 + Math.floor(Math.random() * 2);

	var constsProjections;
	if (reply == 1) {
		constsProjections = consts1;
	} else {
		constsProjections = consts2;
	}
	renderOrt(document.getElementById("ThreeJS1"), constsProjections, 0, Math.PI / 2);
	renderOrt(document.getElementById("ThreeJS2"), constsProjections, 0, 0);
	renderOrt(document.getElementById("ThreeJS3"), constsProjections, Math.PI / 2, 0);

	render(document.getElementById("ThreeJS01"), consts1, phi11, phi12);
	render(document.getElementById("ThreeJS02"), consts2, phi21, phi22);

	arrayResult[currentTask] = {
		numberTask: currentTask,
		amountTurn1 : 0,
		amountTurn2 : 0,
		phi11 : [],
		phi12 : [],
		phi21 : [],
		phi22 : []
	};
	timer = new Date();

	timer = new Date();
}

function checkReply(a) {
	var time = Math.floor((new Date() - timer) / 100) / 10;
	totalTime += time;
	arrayResult[currentTask].time = time;
	if (a == reply) {
		arrayResult[currentTask].result = true;
		amountCorrectly++;
	} else {
		arrayResult[currentTask].result = false;
	}
	console.log(arrayResult[currentTask].result);
	if (currentTask + 1 < amountTask) {
		newTask();
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
	td2.innerHTML = "Правильсть";
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
		td2.innerHTML = arrayResult[i].result ? "+" : "-";
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
	xhr.open("POST", "projection_test2_result.php", true);
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