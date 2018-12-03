export default class App {
    constructor(config) {
        this.path = config.path || '/';
        this.config = config;
    }
    render() {
        if (this.config.render && typeof this.config.render === 'function') {
            return this.config.render();
        }
        else {
        }
    }
}
