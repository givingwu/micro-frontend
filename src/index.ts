import { MicroFE, PortalApp, AppConfig } from './interface'
import App from './app'

export default class MicroFrontEnd implements MicroFE {
  private apps: Array<PortalApp>;
  private instance: null | MicroFE;
  protected active: null | PortalApp;

  constructor() {
    this.apps = []
    /**
     * How do you explicitly set a new property on `window` in TypeScript?
     * https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript
     */
    this.instance = (<any>window).microFrontEnd as MicroFrontEnd || null
    this.active = null
  }

  start() {
    if (!this.apps.length) {
      throw new Error('You must pass a micro-frontend portal to start the application.')
    }
  }

  // singleton implementation in one instance
  createHost() {
    if (this.instance) {
      this.instance = new MicroFrontEnd();
      (<any>window).microFrontEnd = this.instance;
    }

    return this.instance;
  }

  createApp(appName: string, appConfig: AppConfig | PortalApp): number {
    if (!appName) appName = appConfig.appName;
    if (!appName) throw new Error('You must pass `appName` for `createApp(appName: string, appConfig: AppConfig | PortalApp)` function')

    if (!this.apps.includes(appConfig as PortalApp)) {
      this.apps[this.apps.length] = appConfig instanceof App ? appConfig as PortalApp : new App(appName, appConfig as AppConfig);
    }

    return this.apps.length
  }

  getActiveApp() {
    return this.active;
  }
}