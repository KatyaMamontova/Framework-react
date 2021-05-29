class MatrixCalculator extends RealCalculator {
    add(a, b) {
        if (a.values.length === b.values.length && a.values[0].length === b.values[0].length) {
            const calc = this.get(a.values[0][0]);
            return new Matrix(a.values.map((arr, i) => arr.map((elem, j) => calc.add(elem, b.values[i][j]))));
        } else console.log('Матрицы разных размерностей');
    }
    sub(a, b) {
        if (a.values.length === b.values.length && a.values[0].length === b.values[0].length) {
            const calc = this.get(a.values[0][0]);
            return new Matrix(a.values.map((arr, i) => arr.map((elem, j) => calc.sub(elem, b.values[i][j]))));
        } else console.log('Матрицы разных размерностей');
    }

    prod(scalar, a) {
        const calc = this.get(a.values[0][0]);
        return new Matrix(a.values.map((arr) => arr.map((elem) => calc.prod(elem, scalar))));
    }

    mult(a, b) {
        if (a.values.length === b.values[0].length) {
            const newValues = [];
            const calc = this.get(a.values[0][0]);
            for (let i = 0; i < a.values.length; i++) {
                const sumByString = [];
                for (let j = 0; j < a.values.length; j++) {
                    const multOfCorresp = [];
                    for (let k = 0; k < a.values[i].length; k++) {
                        multOfCorresp.push(calc.mult(a.values[i][k], b.values[k][j]));
                    }
                    sumByString.push(multOfCorresp.reduce((sum, current) => sum + current, 0));
                }
                newValues.push(sumByString);
            }
            return new Matrix(newValues);
        } else console.log('Проверьте размерность матриц');
    }

    one(length, elem) {
        const calc = this.get(elem);
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = (i === j) ? this.type(calc, elem, 'one') : this.type(calc, elem, 'zero');
            }
        }
        return new Matrix(values);
    }

    zero(length, elem) {
        const calc = this.get(elem);
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = this.type(calc, elem, 'zero');
            }
        }
        return new Matrix(values);
    }
}