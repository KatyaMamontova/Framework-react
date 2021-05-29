class PolynomialCalculator {
    polynomial(members = [new Member(1, 1), new Member(1, 1)]) {
        return new Polynomial(members);
    }

    add(a, b) {
        const calc = new UniversalCalculator;
        const members = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power === elemA.power);
            if (member) {
                members.push(new Member(calc.add(elemA.value, member.value), elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });
        b.poly.forEach(elemB => {
            if (!members.find(elem => elem.power === elemB.power)) {
                members.push(new Member(elemB.value, elemB.power));
            }
        });
        return new Polynomial(members);
    }

    sub(a, b) {
        const calc = new UniversalCalculator;
        const members = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power === elemA.power);
            if (member) {
                members.push(new Member(calc.sub(elemA.value, member.value), elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });
        b.poly.forEach(elemB => {
            if (!members.find(elem => elem.power === elemB.power)) {
                members.push(new Member(calc.prod(-1, elemB.value), elemB.power));
            }
        });
        return new Polynomial(members);
    }

    prod(scalar, a) {
        const calc = new UniversalCalculator;
        const members = [];
        a.poly.forEach(elemA => {
            members.push(new Member(calc.prod(scalar, elemA.value), elemA.power));
        });
        return new Polynomial(members);
    }

    mult(a, b) {
        const calc = new UniversalCalculator;
        const members = [];
        if (a.poly.length < b.poly.length) {
            let glass = a;
            a = b;
            b = glass;
        }
        a.poly.forEach(elemA => {
            b.poly.forEach(elemB => {
                members.push(new Member(calc.mult(elemA.value, elemB.value), calc.add(elemA.power, elemB.power)));
            });
        });
        //приведение подобных слагаемых:
        const members2 = [];
        for (let j = members[0].power; j > -1; j--) {
            let power = [];         //коэффициенты подобных слагаемых
            for (let i = 0; i < members.length; i++) {
                if (members[i].power === j) {
                    power.push(members[i].value);
                }
            }
            members2.push(new Member(power.reduce((sum, current) => sum + current, 0), j));
        }
        return new Polynomial(members2);
    }

    pow(a, n) {
        console.log(a);
        let poly = a;
        console.log(poly);
        let i = 1;
        while (i < n) {
            poly = this.mult(poly, a);
            i++;
        }
        return poly;
    }
}