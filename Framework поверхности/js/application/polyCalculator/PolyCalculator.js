class PolyCalculator extends Component {
	constructor(options) {
		super(options);
		this.calc = new PolynomialCalculator;
		this.a = null;
		this.b = null;
		this.clearElement();
	}
}