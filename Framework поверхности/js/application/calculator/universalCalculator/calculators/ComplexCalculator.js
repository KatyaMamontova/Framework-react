class ComplexCalculator extends RealCalculator {
    add(a, b) {
        return new Complex(super.add(a.re, b.re), super.add(a.im, b.im));
    }
    sub(a, b) {
        return new Complex(super.sub(a.re, b.re), super.sub(a.im, b.im));
    }

    mult(a, b) {
        return new Complex(
            super.sub(super.mult(a.re, b.re), super.mult(a.im, b.im)),
            super.add(super.mult(a.re, b.im), super.mult(a.im, b.re))
        );
    }
    div(a, b) {
        let denom = super.add(super.pow(b.re, 2), super.pow(b.im, 2));
        return new Complex(
            super.div(super.add(super.mult(a.re, b.re), super.mult(a.im, b.im)), denom),
            super.div(super.sub(super.mult(a.im, b.re), super.mult(a.re, b.im)), denom)
        );
    }

    prod(scalar, a) {
        return new Complex(
            super.prod(scalar, a.re),
            super.prod(scalar, a.im)
        )
    }

    pow(a, b) {
        let z = a;
        let i = 1;
        while (i < b) {
            z = this.mult(z, a);
            i++;
        }
        return z;
    }

    one() {
        return new Complex(1);
    }
    zero() {
        return new Complex();
    }

    abs(a) {
        return super.pow(super.add(super.pow(a.re, 2), super.pow(a.im, 2)), 0.5);
    }
}