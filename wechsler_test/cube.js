var poligons;
var points;

function turn1(arg) {
	var mas = JSON.parse(JSON.stringify(arg));
	mas[0][0] = arg[0][3];
	mas[0][1] = arg[0][0];
	mas[0][2] = arg[0][1];
	mas[0][3] = arg[0][2];
	mas[1] = arg[2];
	mas[2] = arg[3];
	mas[3] = arg[4];
	mas[4] = arg[1];
	mas[5][0] = arg[5][1];
	mas[5][1] = arg[5][2];
	mas[5][2] = arg[5][3];
	mas[5][3] = arg[5][0];
	return mas;
}

function turn2(arg) {
	var mas = JSON.parse(JSON.stringify(arg));
	mas[3][0] = arg[3][3];
	mas[3][1] = arg[3][0];
	mas[3][2] = arg[3][1];
	mas[3][3] = arg[3][2];
	mas[5] = arg[4];
	mas[2] = arg[5];
	mas[0] = arg[2];
	mas[4] = arg[0];
	mas[1][0] = arg[1][1];
	mas[1][1] = arg[1][2];
	mas[1][2] = arg[1][3];
	mas[1][3] = arg[1][0];
	return mas;
}

function allScans(arg) {
	var scans = [arg];
	var s = arg;
	for (var i = 0; i < 24; i += 8) {

		s = turn1(s);
		scans[i + 1] = s;
		s = turn1(s);
		scans[i + 2] = s;
		s = turn1(s);
		scans[i + 3] = s;
		s = turn1(s);
		scans[i + 4] = s;
		s = turn2(s);
		scans[i + 5] = s;
		s = turn1(s);
		scans[i + 6] = s;
		s = turn1(s);
		scans[i + 7] = s;
		s = turn1(s);
		scans[i + 8] = s;
		s = turn2(s);
		s = turn1(s);
	}
	
	return scans;
}

function initCube (arg) {
	
	var point0 = {
		x : -1,
		y : -1,
		z : -1
	};
	var point1 = {
		x : 1,
		y : -1,
		z : -1
	};
	var point2 = {
		x : -1,
		y : 1,
		z : -1
	};
	var point3 = {
		x : 1,
		y : 1,
		z : -1
	};
	var point4 = {
		x : -1,
		y : -1,
		z : 1
	};
	var point5 = {
		x : 1,
		y : -1,
		z : 1
	};
	var point6 = {
		x : -1,
		y : 1,
		z : 1
	};
	var point7 = {
		x : 1,
		y : 1,
		z : 1
	};
	var point8 = {
		x : 0,
		y : 0,
		z : -1
	};
	var point9 = {
		x : 0,
		y : -1,
		z : 0
	};
	var point10 = {
		x : -1,
		y : 0,
		z : 0
	};
	var point13 = {
		x : 0,
		y : 0,
		z : 1
	};
	var point11 = {
		x : 0,
		y : 1,
		z : 0
	};
	var point12 = {
		x : 1,
		y : 0,
		z : 0
	};
	
	poligons = new Array();
	
	poligons.push([arg[0][0],point1,point3,point8]);
	poligons.push([arg[0][1],point2,point3,point8]);
	poligons.push([arg[0][2],point2,point0,point8]);
	poligons.push([arg[0][3],point1,point0,point8]);
	
	poligons.push([arg[1][0],point1,point0,point9]);
	poligons.push([arg[1][1],point0,point4,point9]);
	poligons.push([arg[1][2],point5,point4,point9]);
	poligons.push([arg[1][3],point1,point5,point9]);
	
	poligons.push([arg[2][0],point0,point2,point10]);
	poligons.push([arg[2][1],point2,point6,point10]);
	poligons.push([arg[2][2],point6,point4,point10]);
	poligons.push([arg[2][3],point4,point0,point10]);
	
	poligons.push([arg[3][0],point2,point3,point11]);
	poligons.push([arg[3][1],point3,point7,point11]);
	poligons.push([arg[3][2],point7,point6,point11]);
	poligons.push([arg[3][3],point6,point2,point11]);
	
	poligons.push([arg[4][0],point1,point3,point12]);
	poligons.push([arg[4][1],point1,point5,point12]);
	poligons.push([arg[4][2],point5,point7,point12]);
	poligons.push([arg[4][3],point7,point3,point12]);
	
	poligons.push([arg[5][0],point4,point6,point13]);
	poligons.push([arg[5][1],point6,point7,point13]);
	poligons.push([arg[5][2],point5,point7,point13]);
	poligons.push([arg[5][3],point4,point5,point13]);
	
	points = new Array();
	
	points.push(point0);
	points.push(point1);
	points.push(point2);
	points.push(point3);
	points.push(point4);
	points.push(point5);
	points.push(point6);
	points.push(point7);
	points.push(point8);
	points.push(point9);
	points.push(point10);
	points.push(point11);
	points.push(point12);
	points.push(point13);
}

function getPoligonsScan (scan) {
	var poligonsScan = new Array();
	var point0 = {x : 1, y : 0};
	var point1 = {x : 2, y : 0};
	var point2 = {x : 0, y : 1};
	var point3 = {x : 1, y : 1};
	var point4 = {x : 2, y : 1};
	var point5 = {x : 3, y : 1};
	var point6 = {x : 4, y : 1};
	var point7 = {x : 0, y : 2};
	var point8 = {x : 1, y : 2};
	var point9 = {x : 2, y : 2};
	var point10 = {x : 3, y : 2};
	var point11 = {x : 4, y : 2};
	var point12 = {x : 1, y : 3};
	var point13 = {x : 2, y : 3};
	var point14 = {x : 1.5, y : 0.5};
	var point15 = {x : 0.5, y : 1.5};
	var point16 = {x : 1.5, y : 1.5};
	var point17 = {x : 2.5, y : 1.5};
	var point18 = {x : 3.5, y : 1.5};
	var point19 = {x : 1.5, y : 2.5};
	
	poligonsScan.push({color: scan[0][0], points: [point0,point1,point14]});
	poligonsScan.push({color: scan[0][1], points: [point1,point4,point14]});
	poligonsScan.push({color: scan[0][2], points: [point4,point3,point14]});
	poligonsScan.push({color: scan[0][3], points: [point3,point0,point14]});
	
	poligonsScan.push({color: scan[1][0], points: [point2,point3,point15]});
	poligonsScan.push({color: scan[1][1], points: [point3,point8,point15]});
	poligonsScan.push({color: scan[1][2], points: [point8,point7,point15]});
	poligonsScan.push({color: scan[1][3], points: [point7,point2,point15]});
	
	poligonsScan.push({color: scan[2][0], points: [point3,point4,point16]});
	poligonsScan.push({color: scan[2][1], points: [point4,point9,point16]});
	poligonsScan.push({color: scan[2][2], points: [point9,point8,point16]});
	poligonsScan.push({color: scan[2][3], points: [point8,point3,point16]});
	
	poligonsScan.push({color: scan[3][0], points: [point4,point5,point17]});
	poligonsScan.push({color: scan[3][1], points: [point5,point10,point17]});
	poligonsScan.push({color: scan[3][2], points: [point10,point9,point17]});
	poligonsScan.push({color: scan[3][3], points: [point9,point4,point17]});
	
	poligonsScan.push({color: scan[4][0], points: [point5,point6,point18]});
	poligonsScan.push({color: scan[4][1], points: [point6,point11,point18]});
	poligonsScan.push({color: scan[4][2], points: [point11,point10,point18]});
	poligonsScan.push({color: scan[4][3], points: [point10,point5,point18]});
	
	poligonsScan.push({color: scan[5][0], points: [point8,point9,point19]});
	poligonsScan.push({color: scan[5][1], points: [point9,point13,point19]});
	poligonsScan.push({color: scan[5][2], points: [point13,point12,point19]});
	poligonsScan.push({color: scan[5][3], points: [point12,point8,point19]});
	
	return poligonsScan;  	
}
