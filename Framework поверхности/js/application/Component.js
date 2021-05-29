class Component {

    constructor({ id, template = () => '<div>шаблон</div>', templateParams = null, callbacks = {}, className }) {
        this.id = id;
        this.callbacks = callbacks;
        this.render(template(templateParams), className);
        this.addEventListeners();
    }

    render(template, className) {
        const elem = document.createElement('div');
        elem.setAttribute('id', this.id);
        if (className) {
            elem.classList.add(className);
        }
        elem.innerHTML = template;
        document.querySelector('body').appendChild(elem);
    }

    addEventListeners() { };

    show(id) {
        document.getElementById(this.id).classList.remove('hide');
        document.getElementById(id).style.background = 'white';
    }

    hide(id) {
        document.getElementById(this.id).classList.add('hide');
        document.getElementById(id).style.background = 'rgb(210, 225, 240)';
    }

}