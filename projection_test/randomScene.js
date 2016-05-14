
function getRandomConsts(n, k) {
	var consts;
	switch (n) {
		case 0:
			consts = [[2, 0, 0, 0], [0, 2, 0, 0], [0, 0, 2, 0], [0, 0, 0, -10000]];
			consts[k][k] = 1;
			break;
		case 1:
			consts = [[2, 0, 0, 0], [0, 2, 0, 0], [0, 0, 2, 0], [0, 0, 0, -1000]];
			consts[(k + 1) % 3][(k + 1) % 3] = 1;
			consts[k][k] *= -1;
			break;
		case 2:
			consts = [[2, 0, 0, 0], [0, 2, 0, 0], [0, 0, 2, 0], [0, 0, 0, 1000]];
			consts[(k + 1) % 3][(k + 1) % 3] = 1;
			consts[k][k] *= -1;
			break;
		case 3:
			consts = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]];
			consts[k][k] *= -1;
			k = (k + 1) % 3;
			consts[k][k] = 2;
			k = (k + 1) % 3;
			consts[k][k] = 0;
			consts[k][3] = -100;
			break;
	}
	return consts;
}