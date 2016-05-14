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
	var scale = 350;
	var distans0 = 5;
	var distans;
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, width, height);

	for (var i = 0; i < poligons.length; i++) {
		ctx.beginPath();
		if (poligons[i][0] == 1){
			ctx.fillStyle = '#ff2e3d';
			ctx.strokeStyle = '#ff2e3d';
		}
		else{
			ctx.fillStyle = '#ffc602';
			ctx.strokeStyle = '#ffc602';
		}
		distans = (distans0 - poligons[i][1].y);
		/*ctx.moveTo(x0 + poligons[i][1].x * scale, y0 + poligons[i][1].z * scale);
		for (var j = 2; j < poligons[i].length; j++) {
			ctx.lineTo(x0 + poligons[i][j].x * scale, y0 + poligons[i][j].z * scale);
		}*/
		
		ctx.moveTo(x0 + poligons[i][1].x * scale / distans, y0 + poligons[i][1].z *  scale / distans);
		for (var j = 2; j < poligons[i].length; j++) {
			distans = (distans0 - poligons[i][j].y);
			ctx.lineTo(x0 + poligons[i][j].x * scale / distans, y0 + poligons[i][j].z * scale / distans);
		}
		
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		ctx.strokeStyle = 'black';
		ctx.beginPath();
		distans = (distans0 - poligons[i][1].y);
		ctx.moveTo(x0 + poligons[i][1].x * scale / distans, y0 + poligons[i][1].z * scale / distans);
		distans = (distans0 - poligons[i][2].y);
		ctx.lineTo(x0 + poligons[i][2].x * scale / distans, y0 + poligons[i][2].z * scale / distans);
		ctx.stroke();
		
	}

}

function turnPoints(points, alpha1, alpha2) {
	for (var i = 0; i < points.length; i++) {
		var x = points[i].x * Math.cos(alpha1) + points[i].y * Math.sin(alpha1);
		var y = -points[i].x * Math.sin(alpha1) + points[i].y * Math.cos(alpha1);
		var z = points[i].z;
		points[i].x = x;
		points[i].y = y * Math.cos(alpha2) + z * Math.sin(alpha2);
		points[i].z = -y * Math.sin(alpha2) + z * Math.cos(alpha2);
	}
}

function renderScan(canvas, poligons) {
	poligons.sort(sortFunction);
	var width = canvas.getBoundingClientRect().width;
	var height = canvas.getBoundingClientRect().height;
	var scale = width/4;
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, width, height);
	
	for (var i = 0; i < poligons.length; i++) {
		var points = poligons[i].points;
		ctx.beginPath();
		if (poligons[i].color == 1){
			ctx.fillStyle = '#ff2e3d';
			ctx.strokeStyle = '#ff2e3d';
		}
		else{
			ctx.fillStyle = '#ffc602';
			ctx.strokeStyle = '#ffc602';
		}
		ctx.moveTo(points[0].x * scale, points[0].y * scale);
		for (var j = 1; j < points.length; j++) {
			ctx.lineTo(points[j].x * scale, points[j].y * scale);
		}
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		ctx.strokeStyle = 'black';
		ctx.beginPath();
		ctx.moveTo(points[0].x * scale, points[0].y * scale);
		ctx.lineTo(points[1].x * scale, points[1].y * scale);
		ctx.stroke();
	}
	
}