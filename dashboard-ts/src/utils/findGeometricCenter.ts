type Point = [number, number]; // [latitude, longitude]

/**
 * Calculates the geometric center of a polygon.
 * @param polygonCoordinates The coordinates of the polygon vertices.
 * @returns The geometric center coordinates as a Point.
 */
export default function findGeometricCenter(polygonCoordinates: Point[][]): Point {
	// Helper function to calculate the centroid of a single polygon
	let area = 0;
	let cx = 0;
	let cy = 0;

	for (let i = 0; i < polygonCoordinates.length - 1; i++) {
		const x0: any = polygonCoordinates[i][0];
		const y0: any = polygonCoordinates[i][1];
		const x1: any = polygonCoordinates[i + 1][0];
		const y1: any = polygonCoordinates[i + 1][1];
		const a = x0 * y1 - x1 * y0;
		area += a;
		cx += (x0 + x1) * a;
		cy += (y0 + y1) * a;
	}

	area /= 2;
	cx /= 6 * area;
	cy /= 6 * area;

	console.log('Geometric Center:', [cx, cy]);
	return [cx, cy];
}

// const polygonCoordinates: Point[][] = [
// 	[
// 		[19.100343, 72.898441],
// 		[19.101477, 72.898682],
// 		[19.102134, 72.89894],
// 		[19.10285, 72.89891],
// 		[19.103296, 72.897373],
// 		[19.103782, 72.896358],
// 		[19.104119, 72.896667],
// 		[19.104767, 72.896757],
// 		[19.104196, 72.896015],
// 		[19.105063, 72.895558]
// 	]
// ];

// const center: Point = findGeometricCenter(polygonCoordinates);
// console.log('Geometric Center:', center);
