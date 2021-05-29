Surfaces.prototype.hyperboloid = (height = 12, radius = 3, a = 1, b = 1, c = 1, steps = 10) => {

    let step = height / steps;

    /***точки***/
    let angle = Math.PI / steps;
    const points = [];
    let x, y, z;
    for (let teta = 0; teta < 2 * Math.PI; teta += angle) {
        for (let i = - height / 2; i < height / 2 + step; i += step) {
            x = Math.sqrt(radius ** 2 + i ** 2 / b) * Math.cos(teta);
            y = i + step;
            z = Math.sqrt(radius ** 2 + i ** 2 / b) * Math.sin(teta);
            points.push(new Point(x / a, y / b, z / c));
        }
    }

    /***ребра***/
    const edges = [];
    for (let i = 0; i < points.length - steps; i += steps + 1)
        for (let j = i; j < i + steps; j++) {
            edges.push(new Edge(j, j + 1));
        }
    for (let i = 0; i < steps + 1; i++)
        for (let j = i; j < points.length; j += steps + 1) {
            if (j < points.length - steps - 1)
                edges.push(new Edge(j, j + steps + 1))
            else
                edges.push(new Edge(j, i));
        }

    /***грани***/
    const polygones = [];
    for (let j = 0; j < points.length; j += steps + 1)
        for (let i = j; i < j + steps; i++) {
            if (i < points.length - steps - 1)
                polygones.push(new Polygon([i, i + 1, i + steps + 2, i + steps + 1]))
            else
                polygones.push(new Polygon([i, i + 1, i - (points.length - steps) + 2, i - (points.length - steps - 1)]));
        }

    return new Subject(points, edges, polygones);
}
