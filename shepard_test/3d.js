function sortFunction(a, b) {
	if (distancePoligon(a) < distancePoligon(b))
		return -1;
	else
		return 1;
}

function distancePoligon(poligon) {
	var s = 0;
	for (var i = 1; i < poligon.length; i++) {
		s += poligon[i].y;
	}
	return s / poligon.length;

}

function render(canvas, poligons) {
	poligons.sort(sortFunction);
	var width = canvas.getBoundingClientRect().width;
	var height = canvas.getBoundingClientRect().height;
	var x0 = width / 2;
	var y0 = height / 2;
	var scale = 600;
	var distans0 = 12;
	var distans;
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, width, height);
	ctx.strokeStyle = 'black';
	ctx.fillStyle = '#FFC602';

	for (var i = 0; i < poligons.length; i++) {
		ctx.beginPath();
		distans = (distans0 - poligons[i][0].y);
		ctx.moveTo(x0 + poligons[i][0].x * scale / distans, y0 + poligons[i][0].z * scale / distans);
		for (var j = 1; j < poligons[i].length; j++) {
			distans = (distans0 - poligons[i][j].y);
			ctx.lineTo(x0 + poligons[i][j].x * scale / distans, y0 + poligons[i][j].z * scale / distans);
		}
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}

}

function turn(poligons, alpha1, alpha2) {
	for (var i = 0; i < poligons.length; i++) {
		for (var j = 0; j < poligons[i].length; j++) {
			var x = poligons[i][j].x * Math.cos(alpha1) + poligons[i][j].y * Math.sin(alpha1);
			var y = -poligons[i][j].x * Math.sin(alpha1) + poligons[i][j].y * Math.cos(alpha1);
			var z = poligons[i][j].z;
			poligons[i][j].x = x;
			poligons[i][j].y = y * Math.cos(alpha2) + z * Math.sin(alpha2);
			poligons[i][j].z = -y * Math.sin(alpha2) + z * Math.cos(alpha2);
		}
	}
}