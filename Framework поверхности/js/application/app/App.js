class App extends Component {
    constructor(options) {      //options { id, parent, template = () => '<div>шаблон</div>', templateParams = null, callbacks = {}, className }
        super(options);
        this.header = new Header({
            id: 'header',
            template: template.headerTemplate,
            callbacks: {
                showGraph2D: () => this.showGraph2D(),
                showGraph3D: () => this.showGraph3D(),
                showCalculator: () => this.showCalculator(),
                //showPolyCalculator: () => this.showPolyCalculator()
            }
        });

        this.graph2D = new Graph2D({
            id: 'graph2D',
            template: template.graph2Dtemplate,
            className: 'hide'
        });

        this.graph3DComponent = new Graph3DComponent({
            id: 'graph3DComponent',
            template: template.graph3DTemplate
        });

        this.calculator = new Calculator({
            id: 'calculator',
            template: template.calculatorTemplate,
            className: 'hide'
        });

        /* this.polyCalculator = new PolyCalculatorComponent({
            id: 'polyCalculator',
            template: template.polyCalculatorTemplate,
            className: 'hide'
        }); */
    }

    showGraph2D() {
        this.calculator.hide('showCalculator');
        this.graph3DComponent.hide('showGraph3D');
        //this.polyCalculator.hide('showPolyCalculator');
        this.graph2D.show('showGraph2D');
    }

    showGraph3D() {
        this.graph2D.hide('showGraph2D');
        this.calculator.hide('showCalculator');
        //this.polyCalculator.hide('showPolyCalculator');
        this.graph3DComponent.show('showGraph3D');
    }

    showCalculator() {
        this.graph2D.hide('showGraph2D');
        this.graph3DComponent.hide('showGraph3D');
        //this.polyCalculator.hide('showPolyCalculator');
        this.calculator.show('showCalculator');
    }

    /* showPolyCalculator() {
        this.graph2D.hide('showGraph2D');
        this.graph3DComponent.hide('showGraph3D');
        this.calculator.hide('showCalculator');
        this.polyCalculator.show('showPolyCalculator');
    } */
}