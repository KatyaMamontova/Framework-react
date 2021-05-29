Surfaces.prototype.cylinder2 = (size = 12, a = 2, b = 1, c = 2, steps = 10) => {

    let step = size / steps;

    let angle = Math.PI / steps;
    const points = [];
    let x, y, z = 0;
    for (let i = -size / 2; i < size / 2 + step; i += step) {
        for (let teta = 0; teta < 2 * Math.PI + angle; teta += angle) {
            x = size * Math.cos(teta);
            y = i;
            z = size * Math.sin(teta);
            points.push(new Point(x / a, y / b, z / c));
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