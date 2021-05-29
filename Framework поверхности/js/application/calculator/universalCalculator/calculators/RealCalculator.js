class RealCalculator {
    add(a, b) {
        return a + b;
    }
    sub(a, b) {
        return a - b;
    }

    mult(a, b) {
        return a * b;
    }
    div(a, b) {
        return a / b;
    }

    prod(scalar, a) {
        return scalar * a;
    }

    pow(a, b) {
        return a ** b;
    }

    one() {
        return 1;
    }
    
    zero() {
        return 0;
    }

    abs(a) {
        return Math.abs(a);
    }

    get(a) {
        return (a instanceof Matrix) ? new MatrixCalculator :
            (a instanceof Vector) ? new VectorCalculator :
                (a instanceof Complex) ? new ComplexCalculator :
                    new RealCalculator;
    }
    
    type(calc, elem, method) {
        if (elem instanceof Matrix) {
            return calc[method](elem.values.length, elem.values[0][0]);
        } else if (elem instanceof Vector) {
            return calc[method](elem.values.length, elem.values[0]);
        }
        return calc[method]();
    }
}