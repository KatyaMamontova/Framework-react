Surfaces.prototype.ellipse = (size = 10, a = 1, b = 2, c = 3, steps = 10) => {

    /***точки***/
    let angle = Math.PI / steps;
    const points = [];
    let x, y, z = 0;
    for (let phi = 0; phi < Math.PI + angle; phi += angle) {
        for (let teta = 0; teta < 2 * Math.PI + angle; teta += angle) {
            x = size * Math.sin(teta) * Math.cos(phi);
            y = size * Math.sin(teta) * Math.sin(phi);
            z = size * Math.cos(teta);
            points.push(new Point(x / a, y / b, z / c));
        }
    }

    /***ребра***/
    const edges = [];
    for (let i = 0; i < points.length - 1; i++) {
        edges.push(new Edge(i, i + 1));
    }
    for (let i = 0; i < steps * 2 + 1; i++)
        for (let j = i; j < points.length - steps * 2 - 1; j += steps * 2 + 1) {
            edges.push(new Edge(j, j + steps * 2 + 1));
        }

    /*грани*/
    const polygones = [];
    for (let i = 0; i < points.length - steps * 2 - 2; i++) {
        polygones.push(new Polygon([i, i + 1, i + steps * 2 + 2, i + steps * 2 + 1]))
    }

    return new Subject(points, edges, polygones);
}