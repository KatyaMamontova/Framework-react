Template.prototype.polyCalculatorTemplate = () => `    
<div class="polynomCalc">

    <div class="info">
        <div id="calcPolynom">Информация о полиноме: </div>
        <div id="polyMatrixSize">Размер матрицы: </div>
        <div id="polyVectorSize">Размер вектора: </div>
        <div id="polySizeA">Количество одночленов в многочлене A: </div>
        <div id="polySizeB">Количество одночленов в многочлене B: </div>
    </div>

    <div class="controls">
        <div>
            <button id="addMatrixPoly">+ матрица</button>
            <button id="subMatrixSizePoly" class="smallButtons">-</button>
            <button id="addMatrixSizePoly" class="smallButtons">+</button>
        </div>
        <div>
            <button id="addVectorPoly">+ вектор</button>
            <button id="subVectorSizePoly" class="smallButtons">-</button>
            <button id="addVectorSizePoly" class="smallButtons">+</button>
        </div>
        <button id="addComplexPoly">+ комплексное число</button>
    </div>

    <div class="calculator">
        <div id="polyAbtns">
            <button id="addMembersA" class="smallButtons"> + </button>
            <button id="subMembersA" class="smallButtons"> - </button>
        </div>
        <div id="polyA"></div>
        <div>
            <button id="addPoly">Сложение</button>
            <button id="subPoly">Вычитание</button>
            <button id="multPoly">Умножение</button>
            <br>
            <hr style="float: left">
            <button id="putNumPoly" style="float: left">Ввести вещественное число:</button>
            <hr>
            <button id="prodPoly">Умножение на скаляр</button>
            <button id="powPoly">Возведение в степень</button>
        </div>
        <div id="polyBbtns">
            <button id="addMembersB" class="smallButtons"> + </button>
            <button id="subMembersB" class="smallButtons"> - </button>
        </div>
        <div id="polyB"></div>
        <div id="answerPoly"></div>
        <button id="clearPoly">Очистить</button>
    </div>

</div>`;