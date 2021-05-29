class Calculator extends Component {
	constructor(options) {
		super(options);
		this.calc = new UniversalCalculator;
		this.a = null;
		this.b = null;
		this.matrixSize = 2;
		this.vectorSize = 2;
		this.clearElement();
	}

	//умножение векторов не работает, даже для массивов из трех чисел

	addEventListeners() {
		document.getElementById("clearElement").addEventListener('click', () => {
			this.clearElement();
		});
		document.getElementById("addMatrix").addEventListener('click', () => {
			this.addMatrix();
		});
		document.getElementById("subMatrixSize").addEventListener('click', () => {
			this.subMatrixSize();
		});
		document.getElementById("addMatrixSize").addEventListener('click', () => {
			this.addMatrixSize();
		});
		document.getElementById("addVector").addEventListener('click', () => {
			this.addVector();
		});
		document.getElementById("subVectorSize").addEventListener('click', () => {
			this.subVectorSize();
		});
		document.getElementById("addVectorSize").addEventListener('click', () => {
			this.addVectorSize();
		});
		document.getElementById("addComplex").addEventListener('click', () => {
			this.addComplex();
		});
		document.getElementById("add").addEventListener('click', () => {
			this.addElements();
		});
		document.getElementById("sub").addEventListener('click', () => {
			this.subElements();
		});
		document.getElementById("mult").addEventListener('click', () => {
			this.multElements();
		});
		document.getElementById("div").addEventListener('click', () => {
			this.divElements();
		});
		document.getElementById("putNum").addEventListener('click', () => {
			this.putNum();
		});
		document.getElementById("prod").addEventListener('click', () => {
			this.prodElements();
		});
		document.getElementById("pow").addEventListener('click', () => {
			this.powElements();
		});
	}

	/****************/
	/*about elements*/
	/****************/
	fillInfo() {
		const divElem = document.getElementById('calcElement');
		if (typeof this.a === 'number') {
			divElem.innerHTML = 'Вещественное число';
		}
		if (this.a instanceof Complex) {
			divElem.innerHTML = 'Комплексное число';
		}
		document.getElementById('matrixSize').innerHTML = `Размер матрицы: ${this.matrixSize}`;
		document.getElementById('vectorSize').innerHTML = `Размер вектора: ${this.vectorSize}`;
	}

	fillCalculator() {
		document.getElementById('elemA').innerHTML = this.genCalculatorHTML(this.a, 'a');
		document.getElementById('elemB').innerHTML = this.genCalculatorHTML(this.b, 'b');
	}

	clearElement() {
		this.a = this.calc.zero();
		this.b = this.calc.zero();
		document.getElementById('answer').innerHTML = '<p>Ответ: </p>';
		this.fillInfo();
		this.fillCalculator();
	}

	addComplex() {
		this.a = this.calc.zero('Complex');
		this.b = this.calc.zero('Complex');
		this.fillInfo();
		this.fillCalculator();
	}

	addMatrixSize() {
		this.matrixSize += 1;
		/*this.a.values.length += 1;
		this.b.values.length += 1;*/
		this.fillInfo();
		this.fillCalculator();
	}

	subMatrixSize() {
		if (this.matrixSize > 1) {
			this.matrixSize--;
		}
		this.fillInfo();
		this.fillCalculator();
	}

	addMatrix() {
		const values = [];
		for (let i = 0; i < this.matrixSize; i++) {
			values.push([]);
			for (let j = 0; j < this.matrixSize; j++) {
				values[i].push(this.a);
			}
		}
		this.a = this.calc.zero(null, this.calc.matrix(values));
		this.b = this.calc.zero(null, this.calc.matrix(values));
		this.fillInfo();
		this.fillCalculator();
	}

	addVector() {
		const values = [];
		for (let i = 0; i < this.vectorSize; i++) {
			values.push(this.a);
		}
		this.a = this.calc.zero(null, this.calc.vector(values));
		this.b = this.calc.zero(null, this.calc.vector(values));
		this.fillInfo();
		this.fillCalculator();
	}

	addVectorSize() {
		this.vectorSize++;
		this.fillInfo();
		this.fillCalculator();
	}

	subVectorSize() {
		if (this.vectorSize > 1) {
			this.vectorSize--;
		}
		this.fillInfo();
		this.fillCalculator();
	}

	/*************/
	/* about DOM */
	/*************/
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

	/***************/
	/* about maths */
	/***************/
	addElements() {
		this.fillElements();
		console.log(`addElements: a = ${this.a}, b = ${this.b}`); //проверка real
		const c = this.calc.add(this.a, this.b);
		this.displayAnswer(c);
	}

	subElements() {
		this.fillElements();
		const c = this.calc.sub(this.a, this.b);
		this.displayAnswer(c);
	}

	multElements() {
		this.fillElements();
		const c = this.calc.mult(this.a, this.b);
		this.displayAnswer(c);
	}

	divElements() {
		this.fillElements();
		const c = this.calc.div(this.a, this.b);
		this.displayAnswer(c);
	}

	prodElements() {
		this.fillElements();
		const c = this.calc.prod(this.a, this.b);
		console.log(this.a, this.b);
		console.log(c);
		this.displayAnswer(c);
	}

	powElements() {
		this.fillElements();
		const c = this.calc.pow(this.a, this.b);
		console.log(c);
		this.displayAnswer(c);
	}


	fillElements() {
		this.goToElementValues(this.a, document.querySelectorAll('.a'));
		this.goToElementValues(this.b, document.querySelectorAll('.b'));
	}

	goToElementValues(elem, values, num = 0, length = 0) {
		if (elem instanceof Matrix) {
			elem.values.forEach((column, j) =>
				column.forEach((el, i) => {
					const index = j * elem.values.length + i + num * length;
					if (typeof el === 'number') {
						elem.values[j][i] = values[index].value - 0;
					} else {
						this.goToElementValues(elem.values[j][i], values, index, elem.values.length + 1);
					}
				}));
		} else if (elem instanceof Vector) {
			elem.values.forEach((el, i) => {
				const index = i + num * length;
				if (typeof el === 'number') {
					elem.values[i] = values[index].value - 0;
				} else {
					this.goToElementValues(elem.values[i], values, index, elem.values.length + 1);
				}
			});
		} else if (elem instanceof Complex) {
			elem.re = values[num * 2].value - 0;
			elem.im = values[num * 2 + 1].value - 0;
		} else if (typeof elem === 'number')/*return? elem = new Number(values[0].value);*/
			elem = values[0].value - 0; //короче, ошибка здесь
		console.log(values[0].value);
		console.log('goToElementValues: a =', this.a, ' b = ', this.b);
		//при арифметических операциях работает с нулями,
		//а не с полученными здесь числами из инпутов, хз почему
	}

	displayAnswer(answer) {
		let output = document.getElementById('answer');
		output.innerHTML = '<p>Ответ: </p>';
		if (answer instanceof Matrix) {
			let str = '';
			let size = answer.values.length;
			for (let i = 0; i < size; i++) {
				for (let j = 0; j < size - 1; j++) {
					str += ` ${answer.values[i][j]}, `;
				}
				str += ` ${answer.values[i][size - 1]}`;
				str += '<br>';
			}
			output.innerHTML = `
			<p style="float: left">Ответ: </p>
			<img src="bracketLeft.png" height="${20 * size}" alt="(" style="float: left"> 
			<div style="float: left">${str}</div> 
			<img src="bracketRight.png" height="${20 * size}" alt=")">`;
		} else if (answer instanceof Vector) {
			let str = '';
			let size = answer.values.length;
			for (let i = 0; i < size - 1; i++) {
				str += `${answer.values[i]}, `;
			}
			str += `${answer.values[size - 1]}`;
			output.innerHTML += `( ${str} )`;
		} else if (answer instanceof Complex) {
			output.innerHTML += `
				${answer.re} + ${answer.im}i`;
		} else {
			output.innerHTML += `${answer}`;
		}
	}
}