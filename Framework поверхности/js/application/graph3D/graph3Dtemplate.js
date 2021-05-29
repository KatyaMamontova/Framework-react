Template.prototype.graph3DTemplate = () => `
<canvas id="canvas3D"></canvas>
<div id="options3D">
    <div>
        <input type="checkbox" id="checkPoint"> </input>
        <label for="checkPoint">Отображать вершины</label>
    </div>
    <div>
        <input type="checkbox" id="checkEdge"> </input>
        <label for="checkEdge">Отображать ребра</label>
    </div>
    <div>
        <input type="checkbox" id="checkPolygone"> </input>
        <label for="checkPolygone">Отображать грани</label>
    </div>
    <div>
        <input type="checkbox" id="animation"></input>
        <label for="animation">Анимация</label>
    </div>
</div>

<div id="surfaces">
    <button id="cone">Конус</button>
    <button id="cube">Куб</button>
    <button id="cylinder">Гиперболический цилиндр</button>
    <button id="cylinder2">Эллиптический цилиндр</button>
    <button id="cylinderPrb">Параболический цилиндр</button>
    <button id="ellipse">Эллипсоид</button>
    <button id="hyperboloid">Однополостной гиперболоид</button>
    <button id="hyperboloid2">Двуполостной гиперболоид</button>
    <button id="hyperParaboloid">Гиперболический параболоид</button>
    <button id="paraboloid">Эллиптический параболоид</button>
    <button id="sphere">Сфера</button>
</div>`;