sizeCube = 150;
colorr = 0x3c;
colorg = 0xb2;
colorb = 0xa8;

function renderOrt(canvas, consts, phi2, phi1) {
	h = canvas.height;
	w = canvas.width;
	var scale = 1;
	//Math.sqrt(400 / h);
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, w, h);
	newPixels = ctx.getImageData(0, 0, h, w);

	var sin1 = Math.sin(phi1);
	var sin2 = Math.sin(phi2);
	var cos1 = Math.cos(phi1);
	var cos2 = Math.cos(phi2);

	var v = turnVector([0, 0, 1], cos1, cos2, sin1, sin2);
	var camerax = v[0];
	var cameray = v[1];
	var cameraz = v[2];

	for (var i = 0; i < w; i++) {
		for (var j = 0; j < h; j++) {
			var x = (-w / 2 + j) * scale;
			var y = (-h / 2 + i) * scale;

			var v = turnVector([x, y, 0], cos1, cos2, sin1, sin2);
			var x0 = 1.8*v[0];
			var y0 = 1.8*v[1];
			var z0 = 1.8*v[2];
			
			var axes = false;
			var axX = axesX(camerax, cameray, cameraz, x0, y0, z0, 200);
			var axY = axesY(camerax, cameray, cameraz, x0, y0, z0, 200);
			var axZ = axesZ(camerax, cameray, cameraz, x0, y0, z0, 200);
			if (axX != null) {
				axes = axX;
				newPixels.data[4 * (i * w + j)] = 255;
				newPixels.data[4 * (i * w + j) + 3] = 255;
			} else if (axY != null) {
				axes = axY;
				newPixels.data[4 * (i * w + j) + 1] = 255;
				newPixels.data[4 * (i * w + j) + 3] = 255;
			} else if (axZ != null) {
				axes = axZ;
				newPixels.data[4 * (i * w + j) + 2] = 255;
				newPixels.data[4 * (i * w + j) + 3] = 255;
			}

			var a = consts[0][0] * camerax * camerax + consts[0][1] * camerax * cameray + consts[0][2] * camerax * cameraz + consts[1][1] * cameray * cameray + consts[1][2] * cameray * cameraz + consts[2][2] * cameraz * cameraz;
			var b = 2 * consts[0][0] * camerax * x0 + consts[0][1] * (camerax * y0 + cameray * x0 ) + consts[0][2] * (camerax * z0 + cameraz * x0 ) + 2 * consts[1][1] * cameray * y0 + consts[1][2] * (cameraz * y0 + cameray * z0) + 2 * consts[2][2] * cameraz * z0 + consts[0][3] * camerax + consts[1][3] * cameray + consts[2][3] * cameraz;
			var c = consts[0][0] * x0 * x0 + consts[0][1] * x0 * y0 + consts[0][2] * x0 * z0 + consts[1][1] * y0 * y0 + consts[1][2] * y0 * z0 + consts[2][2] * z0 * z0 + consts[0][3] * x0 + consts[1][3] * y0 + consts[2][3] * z0 + consts[3][3];

			if (Math.abs(a) < 0.005) {
				var t = -c / b;
				x = camerax * t + x0;
				y = cameray * t + y0;
				z = cameraz * t + z0;
				if (Math.abs(x) < sizeCube && Math.abs(y) < sizeCube && Math.abs(z) < sizeCube) {
					paintPix(j, i, grad(x, y, z, camerax, cameray, cameraz, consts));
				}
			} else {
				D = b * b - 4 * a * c;
				if (D >= 0) {
					t1 = (-b - Math.sqrt(D)) / (2 * a);
					t2 = (-b + Math.sqrt(D)) / (2 * a);
					x1 = camerax * t1 + x0;
					y1 = cameray * t1 + y0;
					z1 = cameraz * t1 + z0;
					x2 = camerax * t2 + x0;
					y2 = cameray * t2 + y0;
					z2 = cameraz * t2 + z0;
					var flag1 = !(axes && axes < t1);
					var flag2 = !(axes && axes < t2);
					if (t1 > t2) {
						if (flag1 && Math.abs(x1) < sizeCube && Math.abs(y1) < sizeCube && Math.abs(z1) < sizeCube) {
							paintPix(j, i, grad(x1, y1, z1, camerax, cameray, cameraz, consts));
						}
						if (flag2 && Math.abs(x2) < sizeCube && Math.abs(y2) < sizeCube && Math.abs(z2) < sizeCube) {
							paintPix(j, i, grad(x2, y2, z2, camerax, cameray, cameraz, consts));
						}
					} else {
						if (flag2 && Math.abs(x2) < sizeCube && Math.abs(y2) < sizeCube && Math.abs(z2) < sizeCube) {
							paintPix(j, i, grad(x2, y2, z2, camerax, cameray, cameraz, consts));
						}
						if (flag1 && Math.abs(x1) < sizeCube && Math.abs(y1) < sizeCube && Math.abs(z1) < sizeCube) {
							paintPix(j, i, grad(x1, y1, z1, camerax, cameray, cameraz, consts));
						}
					}
				} else {
					continue;
				}
			}
		}
	}
	ctx.putImageData(newPixels, 0, 0);
	//addAxes(canvas, phi1, phi2);
}

function render(canvas, consts, phi2, phi1) {
	h = canvas.height;
	w = canvas.width;
	var scale = 1;
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, w, h);

	newPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

	var sin1 = Math.sin(phi1);
	var sin2 = Math.sin(phi2);
	var cos1 = Math.cos(phi1);
	var cos2 = Math.cos(phi2);

	var v = turnVector([0, 0, (w + h) / 2], cos1, cos2, sin1, sin2);
	var camerax = 1.2*v[0];
	var cameray = 1.2*v[1];
	var cameraz = 1.2*v[2];

	for (var i = 0; i < w; i++) {
		for (var j = 0; j < h; j++) {
			var x = (-w / 2 + j) * scale;
			var y = (-h / 2 + i) * scale;
			var z = -(w + h) / 2;
			var v = turnVector([x, y, z], cos1, cos2, sin1, sin2);
			var x0 = v[0];
			var y0 = v[1];
			var z0 = v[2];

			var axes = false;
			var axX = axesX(x0, y0, z0, camerax, cameray, cameraz, 200);
			var axY = axesY(x0, y0, z0, camerax, cameray, cameraz, 200);
			var axZ = axesZ(x0, y0, z0, camerax, cameray, cameraz, 200);
			if (axX != null) {
				axes = axX;
				newPixels.data[4 * (i * w + j)] = 255;
				newPixels.data[4 * (i * w + j) + 3] = 255;
			} else if (axY != null) {
				axes = axY;
				newPixels.data[4 * (i * w + j) + 1] = 255;
				newPixels.data[4 * (i * w + j) + 3] = 255;
			} else if (axZ != null) {
				axes = axZ;
				newPixels.data[4 * (i * w + j) + 2] = 255;
				newPixels.data[4 * (i * w + j) + 3] = 255;
			}

			//camerax -> x0
			//x0 -> camerax

			var a = consts[0][0] * x0 * x0 + consts[0][1] * x0 * y0 + consts[0][2] * x0 * z0 + consts[1][1] * y0 * y0 + consts[1][2] * y0 * z0 + consts[2][2] * z0 * z0;
			var b = 2 * consts[0][0] * camerax * x0 + consts[0][1] * (camerax * y0 + cameray * x0 ) + consts[0][2] * (camerax * z0 + cameraz * x0 ) + 2 * consts[1][1] * cameray * y0 + consts[1][2] * (cameraz * y0 + cameray * z0) + 2 * consts[2][2] * cameraz * z0 + consts[0][3] * x0 + consts[1][3] * y0 + consts[2][3] * z0;
			var c = consts[0][0] * camerax * camerax + consts[0][1] * camerax * cameray + consts[0][2] * camerax * cameraz + consts[1][1] * cameray * cameray + consts[1][2] * cameray * cameraz + consts[2][2] * cameraz * cameraz + consts[0][3] * camerax + consts[1][3] * cameray + consts[2][3] * cameraz + consts[3][3];

			if (Math.abs(a) < 0.005) {
				var t = -c / b;
				x = x0 * t + camerax;
				y = y0 * t + cameray;
				z = z0 * t + cameraz;
				if (Math.abs(x) < sizeCube && Math.abs(y) < sizeCube && Math.abs(z) < sizeCube) {
					paintPix(j, i, grad(x, y, z, x0, y0, z0, consts));
				}
			} else {
				D = b * b - 4 * a * c;
				if (D >= 0) {
					t1 = (-b - Math.sqrt(D)) / (2 * a);
					t2 = (-b + Math.sqrt(D)) / (2 * a);
					x1 = x0 * t1 + camerax;
					y1 = y0 * t1 + cameray;
					z1 = z0 * t1 + cameraz;
					x2 = x0 * t2 + camerax;
					y2 = y0 * t2 + cameray;
					z2 = z0 * t2 + cameraz;
					var flag1 = !(axes && axes < t1);
					var flag2 = !(axes && axes < t2);
					if (t1 > t2) {
						if (flag1 && Math.abs(x1) < sizeCube && Math.abs(y1) < sizeCube && Math.abs(z1) < sizeCube) {
							paintPix(j, i, grad(x1, y1, z1, x0, y0, z0, consts));
						}
						if (flag2 && Math.abs(x2) < sizeCube && Math.abs(y2) < sizeCube && Math.abs(z2) < sizeCube) {
							paintPix(j, i, grad(x2, y2, z2, x0, y0, z0, consts));
						}
					} else {
						if (flag2 && Math.abs(x2) < sizeCube && Math.abs(y2) < sizeCube && Math.abs(z2) < sizeCube) {
							paintPix(j, i, grad(x2, y2, z2, x0, y0, z0, consts));
						}
						if (flag1 && Math.abs(x1) < sizeCube && Math.abs(y1) < sizeCube && Math.abs(z1) < sizeCube) {
							paintPix(j, i, grad(x1, y1, z1, x0, y0, z0, consts));
						}
					}
				} else {
					continue;
				}
			}
			/*
			 if (axesX(x0, y0, z0, camerax, cameray, cameraz, 200) != null) {
			 newPixels.data[4 * (i * w + j)] = 255;
			 newPixels.data[4 * (i * w + j) + 3] = 255;
			 } else
			 if (axesY(x0, y0, z0, camerax, cameray, cameraz, 200) != null) {
			 newPixels.data[4 * (i * w + j) + 1] = 255;
			 newPixels.data[4 * (i * w + j) + 3] = 255;
			 } else
			 if (axesZ(x0, y0, z0, camerax, cameray, cameraz, 200) != null) {
			 newPixels.data[4 * (i * w + j) + 2] = 255;
			 newPixels.data[4 * (i * w + j) + 3] = 255;
			 }
			 */
		}
	}

	ctx.putImageData(newPixels, 0, 0);
	//addAxes(canvas, phi1, phi2);
}

function grad(x, y, z, xc, yc, zc, consts) {
	var normx = 2 * x * consts[0][0] + y * consts[0][1] + z * consts[0][2] + consts[0][3];
	var normy = x * consts[0][1] + 2 * y * consts[1][1] + z * consts[1][2] + consts[1][3];
	var normz = x * consts[0][2] + y * consts[1][2] + 2 * z * consts[2][2] + consts[2][3];
	return (xc * normx + yc * normy + zc * normz) / Math.sqrt(normx * normx + normy * normy + normz * normz) / Math.sqrt(xc * xc + yc * yc + zc * zc);
}

function paintPix(x, y, grad) {
	newPixels.data[4 * (y * w + x)] = colorr * Math.abs(grad);
	newPixels.data[4 * (y * w + x) + 1] = colorg * Math.abs(grad);
	newPixels.data[4 * (y * w + x) + 2] = colorb * Math.abs(grad);
	newPixels.data[4 * (y * w + x) + 3] = 255;
}

function turnVector(v, cos1, cos2, sin1, sin2) {
	var tx = v[0];
	var ty = cos1 * v[1] + sin1 * v[2];
	var tz = -sin1 * v[1] + cos1 * v[2];
	var x0 = cos2 * tx - sin2 * tz;
	var y0 = ty;
	var z0 = sin2 * tx + cos2 * tz;
	return [x0, y0, z0];
}

function axesX(xh, yh, zh, x0, y0, z0, l) {
	var t1 = -z0 / zh;
	var t2 = -y0 / yh;
	if (Math.abs(yh * t1 + y0) < 1 && Math.abs(xh * t1 + x0) < l)
		return t1;
	if (Math.abs(zh * t2 + z0) < 1 && Math.abs(xh * t2 + x0) < l)
		return t2;
	return null;
}

function axesY(xh, yh, zh, x0, y0, z0, l) {
	var t1 = -z0 / zh;
	var t2 = -x0 / xh;
	if (Math.abs(xh * t1 + x0) < 1 && Math.abs(yh * t1 + y0) < l)
		return t1;
	if (Math.abs(zh * t2 + z0) < 1 && Math.abs(yh * t2 + y0) < l)
		return t2;
	return null;
}

function axesZ(xh, yh, zh, x0, y0, z0, l) {
	var t1 = -x0 / xh;
	var t2 = -y0 / yh;
	if (Math.abs(yh * t1 + y0) < 1 && Math.abs(zh * t1 + z0) < l)
		return t1;
	if (Math.abs(xh * t2 + x0) < 1 && Math.abs(zh * t2 + z0) < l)
		return t2;
	return null;
}