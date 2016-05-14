function initButtonsActions() {

	document.getElementById("buttonStart1").onclick = function(e) {
		document.cookie = "name=" + document.getElementById("name").value +"; path=/;";
		document.cookie = "surname=" + document.getElementById("surname").value + "; path=/;";
		document.cookie = "group=" + document.getElementById("group").value + "; path=/;";
		document.cookie = "specialty=" + document.getElementById("specialty").value+"; path=/;";
		
		initRotation();
		document.getElementById("start").style.visibility = "hidden";
		document.getElementById("test").style.visibility = "visible";
		resultAmountTrue = 0;
		currentTask = -1;
		totalTime = 0;
		amountCorrectly = 0;
		newTask();
		mode = 1;
	};

	document.getElementById("buttonStart2").onclick = function(e) {
		document.cookie = "name=" + document.getElementById("name").value +"; path=/;";
		document.cookie = "surname=" + document.getElementById("surname").value + "; path=/;";
		document.cookie = "group=" + document.getElementById("group").value + "; path=/;";
		document.cookie = "specialty=" + document.getElementById("specialty").value+"; path=/;";
		
		document.getElementById("start").style.visibility = "hidden";
		document.getElementById("test").style.visibility = "visible";
		resultAmountTrue = 0;
		currentTask = -1;
		totalTime = 0;
		amountCorrectly = 0;
		newTask();
		mode = 2;
	};
};

function getCookie(name) {
	var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}