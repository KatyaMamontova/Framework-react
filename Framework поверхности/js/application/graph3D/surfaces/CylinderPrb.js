Surfaces.prototype.cylinderPrb = (size = 10, a = 2, steps = 12) => {

    let step = size / steps;

    /***точки***/
    const points = [];
    for (let z = -size / 2; z < size / 2 + step; z += step) {
        for (let y = -size / 2; y < size / 2 + step; y += step) {
            points.push(new Point(
                y ** 2 / a,
                y,
                z
            ))
        }
    }

    /***ребра***/
    const edges = [];
    for (let i = 0; i < points.length - steps - 1; i++)
        edges.push(new Edge(i, i + steps + 1));
    for (let j = 0; j < points.length - steps; j += steps + 1)
        for (let i = j; i < j + steps; i++) {
            edges.push(new Edge(i, i + 1))
        }

    /***грани***/
    const polygones = [];
    for (let i = 0; i < points.length - steps - 1; i += steps + 1)
        for (let j = i; j < i + steps; j++) {
            polygones.push(new Polygon([j, j + 1, j + steps + 2, j + steps + 1]))
        }


    return new Subject(points, edges, polygones);
}