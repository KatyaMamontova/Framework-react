class Graph3DComponent extends Component {
    constructor(options) {
        super(options);

        this.WINDOW = {
            LEFT: -6,
            BOTTOM: -6,
            WIDTH: 12,
            HEIGHT: 12,
            CENTER: new Point(0, 0, -30),
            CAMERA: new Point(0, 0, -50)
        }

        this.graph2D = new Graph({
            id: 'canvas3D',
            width: 650,
            height: 650,
            WINDOW: this.WINDOW,
            callbacks: {
                wheel: (event) => this.wheel(event),
                mouseup: () => this.mouseup(),
                mouseleave: () => this.mouseleave(),
                mousedown: (event) => this.mousedown(event),
                mousemove: (event) => this.mousemove(event)
            }
        });

        this.ui = new UIgraph3D({
            callbacks: {
                checkPoints: () => this.showPoints = !this.showPoints,
                checkEdges: () => this.showEdges = !this.showEdges,
                checkPolygones: () => this.showPolygones = !this.showPolygones,
                animationOn: () => this.showAnimation = !this.showAnimation,

                setCone: () => this.setSurface(this.cone),
                setCube: () => this.setSurface(this.cube),
                setEllipse: () => this.setSurface(this.ellipse),
                setHyperboloid: () => this.setSurface(this.hyperboloid),
                setHyperboloid2: () => this.setSurface(this.hyperboloid2),
                setHyperParaboloid: () => this.setSurface(this.hyperParaboloid),
                setParaboloid: () => this.setSurface(this.paraboloid),
                setSphere: () => this.setSurface(this.sphere),
                setCylinder: () => this.setSurface(this.cylinder),
                setCylinder2: () => this.setSurface(this.cylinder2),
                setCylinderPrb: () => this.setSurface(this.cylinderPrb),
            }
        });

        document.addEventListener('keydown', (event) => this.keydown(event));

        this.LIGHT = new Light(-40, 2, 0, 25000);

        this.graph3D = new Graph3D({ WINDOW: this.WINDOW });
        this.sur = new Surfaces();

        this.cone = this.sur.cone();
        this.cube = this.sur.cube(-5, -5);
        this.cylinder = this.sur.cylinder();
        this.cylinder2 = this.sur.cylinder2();
        this.cylinderPrb = this.sur.cylinderPrb();
        this.ellipse = this.sur.ellipse();
        this.hyperboloid = this.sur.hyperboloid();
        this.hyperboloid2 = this.sur.hyperboloid2();
        this.hyperParaboloid = this.sur.hyperParaboloid();
        this.paraboloid = this.sur.paraboloid(0, -10);
        this.sphere = this.sur.sphere();

        this.subjects = [this.cone];

        this.showPoints = true;
        this.showPolygones = true;
        this.showEdges = true;
        document.getElementById("checkPoint").checked = true;
        document.getElementById("checkEdge").checked = true;
        document.getElementById("checkPolygone").checked = true;

        this.showAnimation = false;

        this.dx = 0;
        this.dy = 0;
        this.canRotate = false;
        this.whichBtn = null;

        requestAnimationFrame(this.step);
    }

    /*******************/
    /* about callbacks */
    /*******************/
    wheel(event) {
        let delta = (event.wheelDelta > 0) ? 1.1 : 0.9;
        this.subjects.forEach(subject => subject.points.forEach(point => this.graph3D.zoom(delta, point)));
    }

    mouseup() {
        this.canRotate = false;
    }
    mouseleave() {
        this.canRotate = false;
    }
    mousedown(event) {
        this.canRotate = true;
        this.dx = event.offsetX;
        this.dy = event.offsetY;
        this.whichBtn = (event.which == 2) ? 'middle' : 'left';
    }

    mousemove(event) {
        if (this.canRotate) {
            const gradus = Math.PI / 1800;
            if (this.whichBtn === 'middle') {
                this.subjects.forEach(subject => subject.points.forEach(point => this.graph3D.rotateOz((this.dx - event.offsetX) * gradus, point)));
            } else {
                this.subjects.forEach(subject => subject.points.forEach(point => {
                    this.graph3D.rotateOy((this.dx - event.offsetX) * gradus, point);
                    this.graph3D.rotateOx((this.dy - event.offsetY) * gradus, point);
                }));
            }
            this.dx = event.offsetX;
            this.dy = event.offsetY;
        }
    }

    keydown(event) {
        if (event.keyCode === 39) {                                     //39 - вправо
            this.subjects.forEach(subject => subject.points.forEach(point => this.graph3D.move(0.5, 0, 0, point)));
        } else if (event.keyCode === 37) {                              //37 - влево
            this.subjects.forEach(subject => subject.points.forEach(point => this.graph3D.move(-0.5, 0, 0, point)));
        } else if (event.keyCode === 40) {                              //40 - вниз
            this.subjects.forEach(subject => subject.points.forEach(point => this.graph3D.move(0, -0.5, 0, point)));
        } else if (event.keyCode === 38) {                              //38 - вверх
            this.subjects.forEach(subject => subject.points.forEach(point => this.graph3D.move(0, 0.5, 0, point)));
        } else if (event.keyCode === 104) {                             //8 - Oz+
            this.subjects.forEach(subject => subject.points.forEach(point => this.graph3D.move(0, 0, -1, point)));
        } else if (event.keyCode === 98) {                              //2 - Oz-
            this.subjects.forEach(subject => subject.points.forEach(point => this.graph3D.move(0, 0, 1, point)));
        }
    }

    setSurface(surface) {
        this.subjects = [];
        this.subjects.push(surface);
    }

    /***************/
    /* about print */
    /***************/
    clear() {
        this.graph2D.clear();
    }

    printSubject(subject) {
        if (this.showPolygones) {
            this.graph3D.calcDistance(subject, this.WINDOW.CAMERA, 'distance');
            this.graph3D.calcDistance(subject, this.LIGHT, 'lumen');
            //this.graph3D.sortByArtistAlgorithm(subject);
            for (let i = 0; i < subject.polygones.length; i++) {
                const polygon = subject.polygones[i];
                const points = polygon.points;
                const array = [];
                for (let j = 0; j < points.length; j++) {
                    array.push({
                        x: this.graph3D.xs(subject.points[points[j]]),
                        y: this.graph3D.ys(subject.points[points[j]])
                    });
                }
                const lumen = this.graph3D.calcIllumination(polygon.lumen, this.LIGHT.lumen);
                let { r, g, b } = polygon.color;
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
                this.graph2D.polygon(array, polygon.rgbToHex(r, g, b));
            }
        }
        if (this.showEdges) {
            for (let i = 0; i < subject.edges.length; i++) {
                const edge = subject.edges[i];
                const p1 = subject.points[edge.p1];
                const p2 = subject.points[edge.p2];
                this.graph2D.line(this.graph3D.xs(p1), this.graph3D.ys(p1), this.graph3D.xs(p2), this.graph3D.ys(p2));
            }
        }
        if (this.showPoints) {
            let r = 0;
            let g = 0;
            let b = 255;
            for (let i = 0; i < subject.points.length; i++) {
                const point = subject.points[i];
                this.graph2D.point(this.graph3D.xs(point), this.graph3D.ys(point), `rgb(${r}, ${g}, ${b})`/* 'rgb(255, 120, 10)' */, 1);
                r += 30;
                g += 1;
                b -= 1;
            }
        }
        if (this.showAnimation) {
            let gradus = 1 / 1000;
            this.subjects.forEach(subject => subject.points.forEach(point => {
                this.graph3D.rotateOy(gradus, point);
                this.graph3D.rotateOx(gradus, point);
            }));
        }
    }

    printScene() {
        this.clear();
        this.subjects.forEach(subject => this.printSubject(subject));
    }

    step = () => {
        this.printScene();
        requestAnimationFrame(this.step);
    }
}