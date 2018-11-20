import { PortalApp, AppConfig } from './interface'

export default class App implements PortalApp {
  public config = {} as AppConfig;
  public appName = ''

  /**
   * create an new PortalApp instance
   */
  constructor(appName: string, config: AppConfig) {
    this.appName = appName;
    this.config = config;
  }
}