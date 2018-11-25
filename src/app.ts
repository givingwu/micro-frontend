import { PortalApp, AppConfig } from './interface'
// import { getDomNode, getComponent } from './utils'

export default class App implements PortalApp {
  public config: AppConfig;
  public path: string;
  public component: AppConfig['component'];
  public mountNode: AppConfig['mountNode'];

  /**
   * create a new PortalApp instance
   */
  constructor(config: AppConfig) {
    this.path = config.path || '/';
    this.config = config;
  }

  render(): any {
    if (this.config.render && typeof this.config.render === 'function') {
      return this.config.render()
    } else {
      // const mountNode = getDomNode(this.config.mountNode)
      // const component = getComponent(this.config.component)

      // return render(mountNode, component)
    }

  }
}