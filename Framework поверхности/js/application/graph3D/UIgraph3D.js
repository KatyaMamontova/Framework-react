class UIgraph3D {
    constructor({ callbacks }) {
        document.getElementById('checkPoint').addEventListener('change', () => callbacks.checkPoints());
        document.getElementById('checkEdge').addEventListener('change', () => callbacks.checkEdges());
        document.getElementById('checkPolygone').addEventListener('change', () => callbacks.checkPolygones());
        document.getElementById('animation').addEventListener('change', () => callbacks.animationOn());
        
        document.getElementById('cone').addEventListener('click', () => callbacks.setCone());
        document.getElementById('cube').addEventListener('click', () => callbacks.setCube());
        document.getElementById('cylinder').addEventListener('click', () => callbacks.setCylinder());
        document.getElementById('cylinder2').addEventListener('click', () => callbacks.setCylinder2());
        document.getElementById('cylinderPrb').addEventListener('click', () => callbacks.setCylinderPrb());
        document.getElementById('ellipse').addEventListener('click', () => callbacks.setEllipse());
        document.getElementById('hyperboloid').addEventListener('click', () => callbacks.setHyperboloid());
        document.getElementById('hyperboloid2').addEventListener('click', () => callbacks.setHyperboloid2());
        document.getElementById('hyperParaboloid').addEventListener('click', () => callbacks.setHyperParaboloid());
        document.getElementById('paraboloid').addEventListener('click', () => callbacks.setParaboloid());
        document.getElementById('sphere').addEventListener('click', () => callbacks.setSphere());
    }
}
