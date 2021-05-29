class PolyCalculatorComponent extends Component {
	constructor(options) {
		super(options);
		this.calcPoly = new PolynomialCalculator;
		this.calc = new UniversalCalculator;
		this.a = null;
		this.b = null;
		this.matrixSize = 2;
		this.vectorSize = 2;
		this.polySizeA = 2;
		this.polySizeB = 2;
		this.clearElement();
	}

	addEventListeners() {
		document.getElementById("clearPoly").addEventListener('click', () => {
			this.clearElement();
		});
		document.getElementById("addMatrixPoly").addEventListener('click', () => {
			this.addMatrix();
		});
		document.getElementById("subMatrixSizePoly").addEventListener('click', () => {
			this.subMatrixSize();
		});
		document.getElementById("addMatrixSizePoly").addEventListener('click', () => {
			this.addMatrixSize();
		});
		document.getElementById("addVectorPoly").addEventListener('click', () => {
			this.addVector();
		});
		document.getElementById("subVectorSizePoly").addEventListener('click', () => {
			this.subVectorSize();
		});
		document.getElementById("addVectorSizePoly").addEventListener('click', () => {
			this.addVectorSize();
		});
		document.getElementById("addComplexPoly").addEventListener('click', () => {
			this.addComplex();
		});
		document.getElementById("addMembersA").addEventListener('click', () => {
			this.addMembersA();
		});
		document.getElementById("subMembersA").addEventListener('click', () => {
			this.subMembersA();
		});
		document.getElementById("addMembersB").addEventListener('click', () => {
			this.addMembersB();
		});
		document.getElementById("subMembersB").addEventListener('click', () => {
			this.subMembersB();
		});
		document.getElementById("addPoly").addEventListener('click', () => {
			this.addElements();
		});
		document.getElementById("subPoly").addEventListener('click', () => {
			this.subElements();
		});
		document.getElementById("multPoly").addEventListener('click', () => {
			this.multElements();
		});
		document.getElementById("putNumPoly").addEventListener('click', () => {
			this.putNum();
		});
		document.getElementById("prodPoly").addEventListener('click', () => {
			this.prodElements();
		});
		document.getElementById("powPoly").addEventListener('click', () => {
			this.powElements();
		});
	}

	/****************/
	/*about elements*/
	/****************/
	fillInfo() {
		const divElem = document.getElementById('calcPolynom');
		if (typeof this.a === 'number') {
			divElem.innerHTML = 'Вещественное число';
		}
		if (this.a instanceof Complex) {
			divElem.innerHTML = 'Комплексное число';
		}
		document.getElementById('polyMatrixSize').innerHTML = `Размер матрицы: ${this.matrixSize}`;
		document.getElementById('polyVectorSize').innerHTML = `Размер вектора: ${this.vectorSize}`;
		document.getElementById('polySizeA').innerHTML = `Количество одночленов в многочлене A: ${this.polySizeA}`;
		document.getElementById('polySizeB').innerHTML = `Количество одночленов в многочлене В: ${this.polySizeB}`;
	}

	clearElement() {
		this.a = this.calcPoly.polynomial();//+
		this.b = this.calcPoly.polynomial();//+
		document.getElementById('answerPoly').innerHTML = '<p>Ответ: </p>';//+
		this.fillInfo();//+
		this.fillCalculator();
	}

	addComplex() {
		this.a.poly.forEach(item => item = this.calc.zero('Complex'));
		this.b.poly.forEach(item => item = this.calc.zero('Complex'));
		this.fillInfo();
		/* this.fillMemberValue(); для чего это вообще?*/
		this.fillCalculator();
	}

	addMatrixSize() {
		this.matrixSize += 1;
		/*this.a.values.length += 1;
		this.b.values.length += 1;*/
		this.fillInfo();
		/* this.fillMemberValue(); */
		this.fillCalculator();
	}

	subMatrixSize() {
		if (this.matrixSize > 1) {
			this.matrixSize--;
		}
		this.fillInfo();
		/* this.fillMemberValue(); */
		this.fillCalculator();
	}

	addMatrix() {
		this.a.poly.forEach(item => {
			const values = [];
			for (let i = 0; i < this.matrixSize; i++) {
				values.push([]);
				for (let j = 0; j < this.matrixSize; j++) {
					values[i].push(item);
				}
			}
			item = this.calc.zero(null, this.calc.matrix(values));
			this.b.poly.forEach(item => item = this.calc.zero(null, this.calc.matrix(values)));
		});
		this.fillInfo();
		/* this.fillMemberValue(); */
		this.fillCalculator();
	}

	addVector() {
		this.a.poly.forEach(item => {
			const values = [];
			for (let i = 0; i < this.vectorSize; i++) {
				values.push(item);
			}
			item = this.calc.zero(null, this.calc.vector(values));
			this.b.poly.forEach(item => item = this.calc.zero(null, this.calc.vector(values)));
		});
		this.fillInfo();
		/* this.fillMemberValue(); */
		this.fillCalculator();
	}

	addVectorSize() {
		this.vectorSize++;
		this.fillInfo();
		/* this.fillMemberValue(); */
		this.fillCalculator();
	}

	subVectorSize() {
		if (this.vectorSize > 1) {
			this.vectorSize--;
		}
		this.fillInfo();
		/* this.fillMemberValue(); */
		this.fillCalculator();
	}

	addMembersA() {
		this.polySizeA++;
		this.fillInfo();
		this.fillCalculator();
	}

	subMembersA() {
		if (this.polySizeA > 1) {
			this.polySizeA--;
		}
		this.fillInfo();
		this.fillCalculator();
	}

	addMembersB() {
		this.polySizeB++;
		this.fillInfo();
		this.fillCalculator();
	}

	subMembersB() {
		if (this.polySizeB > 1) {
			this.polySizeB--;
		}
		this.fillInfo();
		this.fillCalculator();
	}

	fillCalculator() {
		/* document.getElementById('polyA').innerHTML = this.genCalculatorHTML(this.a, 'a');
		document.getElementById('polyB').innerHTML = this.genCalculatorHTML(this.b, 'b'); */
		document.getElementById('polyA').innerHTML = this.genPolynomHTML(this.polySizeA, this.a
			/*Может нужен какой-нибудь member или elem, нужен тип, а не конкретное "а"*/, 'a');
		document.getElementById('polyB').innerHTML = this.genPolynomHTML(this.polySizeB, this.b, 'b');
	}

	fillMemberValue() {
		document.getElementById('polyA').innerHTML += this.genCalculatorHTML(this.a, 'a');	//я думала, что += все исправит, но нет
		document.getElementById('polyB').innerHTML = this.genCalculatorHTML(this.b, 'b');
		this.fillCalculator();
	}

	/*************/
	/* about DOM */
	/*************/
	genPolynomHTML(size, poly, className) {
		for (let i = 0; i < size + 1; i++) {		//size + 1? в этом был какой-то умысел?
			let member = poly.poly[i];
			return `${this.genCalculatorHTML(member.value, className)}x<sup><input class="${className} value="${member.power}"></sup>`;
		}
	}

	genCalculatorHTML(elem, className) {
		if (elem instanceof Matrix) {
			return this.genMatrixHTML(elem.values.length, this.genCalculatorHTML(elem.values[0][0], className));
		} else if (elem instanceof Vector) {
			return this.genVectorHTML(elem.values.length, this.genCalculatorHTML(elem.values[0], className));
		} else if (elem instanceof Complex) {
			return `
				<input class="${className}" value="${elem.re}">
				+ <input class="${className}" value="${elem.im}">i`;
		} else {
			return `<input class="${className}" value="${elem}">`;
		}
	}

	genMatrixHTML(size, elem) {
		//size - длина массива values
		//функция работает с каждым элементом values по очереди
		//и элементы values - инпуты
		let str = '';
		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size - 1; j++) {
				str += `${elem}, `;
			}
			str += `${elem}`;
			if (i < size - 1) str += '<br>';
		}
		return `
		<img src="bracketLeft.png" height="${35 * size}" alt="(" style="float: left"> 
		<div style="float: left">${str}</div> 
		<img src="bracketRight.png" height="${35 * size}" alt=")">`;
	}

	genVectorHTML(size, elem) {
		let str = '';
		for (let i = 0; i < size - 1; i++) {
			str += `${elem}, `;
		}
		str += `${elem}`;
		return `<span>(</span> ${str} <span>)</span>`;
	}

	putNum() {
		document.querySelectorAll('.b').forEach((elem) => elem.remove());
		this.b = Number();
		document.getElementById('elemB').innerHTML = this.genCalculatorHTML(this.b, 'b');
	}
}