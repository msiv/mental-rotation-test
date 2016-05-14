figures = new Array(4);

figures[0] = new Array();
addCube(figures[0], -1, 2, -1);
addCube(figures[0], 2, -1, 0);
addCube(figures[0], 2, 0, 0);
addCube(figures[0], 2, 1, 0);
addCube(figures[0], 2, 2, 0);
addCube(figures[0], 1, 2, 0);
addCube(figures[0], 0, 2, 0);
addCube(figures[0], -1, 2, 0);
addCube(figures[0], 2, -1, 1);
addCube(figures[0], 2, -1, 2);

figures[1] = new Array();
addCube(figures[1], -1, -2, -1);
addCube(figures[1], -1, -2, 0);
addCube(figures[1], -1, -2, 1);
addCube(figures[1], -1, -1, 1);
addCube(figures[1], -1, 0, 1);
addCube(figures[1], -1, 1, 1);
addCube(figures[1], 0, 1, 1);
addCube(figures[1], 1, 1, 1);
addCube(figures[1], 2, 1, 1);
addCube(figures[1], 2, 2, 1);

figures[2] = new Array();
addCube(figures[2], -1, -2, -1);
addCube(figures[2], -1, -2, 0);
addCube(figures[2], -1, -2, 1);
addCube(figures[2], -1, -1, 1);
addCube(figures[2], -1, 0, 1);
addCube(figures[2], 0, 0, 1);
addCube(figures[2], 1, 0, 1);
addCube(figures[2], 2, 0, 1);
addCube(figures[2], 2, 1, 1);
addCube(figures[2], 2, 2, 1);

figures[3] = new Array();
addCube(figures[3], -1, -2, -1);
addCube(figures[3], -1, -2, 0);
addCube(figures[3], -1, -2, 1);
addCube(figures[3], -1, -1, 1);
addCube(figures[3], -1, 0, 1);
addCube(figures[3], 0, 0, 1);
addCube(figures[3], 1, 0, 1);
addCube(figures[3], 2, 0, 1);
addCube(figures[3], 2, 1, 1);

function addCube(poligons, x, y, z) {
	var point0 = {
		x : x,
		y : y,
		z : z
	};
	var point1 = {
		x : x + 1,
		y : y,
		z : z
	};
	var point2 = {
		x : x,
		y : y + 1,
		z : z
	};
	var point3 = {
		x : x + 1,
		y : y + 1,
		z : z
	};
	var point4 = {
		x : x,
		y : y,
		z : z + 1
	};
	var point5 = {
		x : x + 1,
		y : y,
		z : z + 1
	};
	var point6 = {
		x : x,
		y : y + 1,
		z : z + 1
	};
	var point7 = {
		x : x + 1,
		y : y + 1,
		z : z + 1
	};

	poligons.push([point0, point1, point3, point2]);
	poligons.push([point4, point5, point7, point6]);
	poligons.push([point0, point2, point6, point4]);
	poligons.push([point1, point3, point7, point5]);
	poligons.push([point0, point1, point5, point4]);
	poligons.push([point2, point3, point7, point6]);
}