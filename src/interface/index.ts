import * as history from 'history'

export interface MicroFE {
  // new (): MicroFE;
  // _active: PortalApp;
  apps: Array<PortalApp>;
  history: history.History;
  // instance: undefined | MicroFE;
  // protected activeIndex: number;
  // protected active: PortalApp;

  start(): void;
  createHost(): MicroFE;
  // createApp(app: AppConfig | PortalApp): PortalApp | number;
  createApp(appName: string, app: PortalApp | AppConfig): number | PortalApp;
  getActiveApp(): PortalApp;
  setActiveApp(app: PortalApp, activeIndex?: number): void;
}

export interface PortalApp {
  // new (appName: string, appConfig: AppConfig): PortalApp;
  config: AppConfig;
  appName: string;
  render(): void;

  path?: string;
  mount?: () => void;
  unmount?: () => void;
}

export interface AppConfig {
  config: AppConfig;
  appName: string;

  path?: string;
  component?: string | Function | VueComponent | ReactComponent | AngularComponent
  mountNode?: string | HTMLElement;

  render(): void | HTMLElement;
  mount?: () => void;
  unmount?: () => void;
}

interface VirtualNode { [propName: string]: any; }
interface VueComponent extends VirtualNode {}
interface ReactComponent extends VirtualNode {}
interface AngularComponent extends VirtualNode {}
