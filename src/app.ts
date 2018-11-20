import { PortalApp, AppConfig } from './interface'
// import { getDomNode, getComponent } from './utils'

export default class App implements PortalApp {
  public config: AppConfig;
  public appName: string;
  public component: AppConfig['component'];
  public mountNode: AppConfig['mountNode'];

  /**
   * create a new PortalApp instance
   */
  constructor(appName: string, config: AppConfig) {
    this.appName = appName;
    this.config = config;
  }

  render() {
    if (this.config.render && typeof this.config.render === 'function') {
      return this.config.render()
    } else {
      // const mountNode = getDomNode(this.config.mountNode)
      // const component = getComponent(this.config.component)

      // return render(mountNode, component)
    }

  }
}