Template.prototype.calculatorTemplate = () => `
<div>

    <div class="info">
        <div id="calcElement">Информация об элементе: <br></div>
        <div id="matrixSize">Размер матрицы</div>
        <div id="vectorSize">Размер вектора</div>
    </div>

    <div class="controls">
        <div>
            <button id="addMatrix">+ матрица</button>
            <button id="subMatrixSize" class="smallButtons">-</button>
            <button id="addMatrixSize" class="smallButtons">+</button>
        </div>
        <div>
            <button id="addVector">+ вектор</button>
            <button id="subVectorSize" class="smallButtons">-</button>
            <button id="addVectorSize" class="smallButtons">+</button>
        </div>
        <button id="addComplex">+ комплексное число</button>
    </div>

    <div class="calculator">
        <div id="elemA"></div>
        <div>
            <button id="add">Сложение</button>
            <button id="sub">Вычитание</button>
            <br>
            <button id="mult">Умножение</button>
            <button id="div">Деление</button>
            <br>
            <hr style="float: left">
            <button id="putNum" style="float: left">Ввести вещественное число:</button>
            <hr>
            <button id="prod">Умножение на скаляр</button>
            <button id="pow">Возведение в степень</button>
        </div>
        <div id="elemB"></div>
        <div id="answer"></div>
        <button id="clearElement">Очистить</button>
    </div>

</div>`;