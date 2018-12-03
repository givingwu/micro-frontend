// import { getDomNode, getComponent } from './utils'
export default class App {
    /**
     * create a new PortalApp instance
     */
    constructor(config) {
        this.path = config.path || '/';
        this.config = config;
    }
    render() {
        if (this.config.render && typeof this.config.render === 'function') {
            return this.config.render();
        }
        else {
            // const mountNode = getDomNode(this.config.mountNode)
            // const component = getComponent(this.config.component)
            // return render(mountNode, component)
        }
    }
}
