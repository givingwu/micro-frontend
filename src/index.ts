import { MicroFE, PortalApp, AppConfig } from './interface'
import App from './app'
import * as history from 'history'


class MicroFrontEnd implements MicroFE {
  private _active: PortalApp;
  private _instance: null | MicroFE;
  private unlisten: Function;

  protected activeIndex: number;
  public apps: Array<PortalApp>;
  public history: history.History;

  constructor() {
    this.activeIndex = 0
    this.apps = []
    /**
     * How do you explicitly set a new property on `window` in TypeScript?
     * https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript
     */
    this._instance = (<any>window).microFrontEnd as MicroFrontEnd || null
    this.history = history.createBrowserHistory()
  }

  // singleton implementation in one instance
  createHost(): any {
    if (!this._instance) {
      this._instance = new MicroFrontEnd();
      (<any>window).microFrontEnd = this._instance
    }

    return this._instance;
  }

  createApp(appName: string, appConfig: AppConfig | PortalApp): number {
    if (!appName) appName = appConfig.appName;
    if (!appName) throw new Error('You must pass `appName` for `createApp(appName: string, appConfig: AppConfig | PortalApp)` function')

    if (!this.apps.includes(appConfig as PortalApp)) {
      this.apps[this.apps.length] = appConfig instanceof App
        ? appConfig as PortalApp
        : new App(appName, appConfig as AppConfig);
    }

    if (this.apps.length && !this._active) {
      this.setActiveApp(this.apps[0])
    }

    return this.apps.length
  }

  getActiveApp(): PortalApp | undefined {
    return this._active
  }

  setActiveApp(app: PortalApp): void {
    this._active = app
    this.start()
  }

  start(): void {
    if (!this.apps.length) {
      throw new Error('You must pass a micro-frontend portal to start the application.')
    } else {
      if (this.unlisten) this.unlisten()
    }

    this.unlisten = this.history.listen(location => {
      for (let i = 0; i < this.apps.length; i++) {
        const app = this.apps[i];

        if (location.pathname === app.path) {
          app.render()
          break;
        }
      }
    })
  }
}


export default new MicroFrontEnd()