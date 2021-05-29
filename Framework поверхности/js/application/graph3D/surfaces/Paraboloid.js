Surfaces.prototype.paraboloid = (x0, y0, size = 5, a = 1, b = 2, c = 1, steps = 14) => {

    let step = size / steps;

    let angle = Math.PI / steps;
    const points = [];
    let x, y, z;
    for (let i = 0; i < size + step; i += step) {
        for (let teta = 0; teta < 2 * Math.PI + angle; teta += angle) {
            x = i * Math.cos(teta);
            y = i**2;
            z = i * Math.sin(teta);
            points.push(new Point((x - x0) / a, (y + y0) / b, z / c));
        }
    }

    const edges = [];
    for (let i = 0; i < points.length - 1; i++) {
        edges.push(new Edge(i, i + 1));
    }
    for (let i = 0; i < steps * 2 + 1; i++)
        for (let j = i; j < points.length - steps * 2 - 1; j += steps * 2 + 1) {
            edges.push(new Edge(j, j + steps * 2 + 1));
        }

    const polygones = [];
    for (let i = 0; i < points.length - steps * 2 - 2; i++) {
        polygones.push(new Polygon([i, i + 1, i + steps * 2 + 2, i + steps * 2 + 1]))
    }

    return new Subject(points, edges, polygones)
}