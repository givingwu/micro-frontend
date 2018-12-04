import * as history from 'history'

export interface MicroFE {
  // new (): MicroFE;
  // _active: PortalApp;
  appMap: Map<String, PortalApp>;
  history: history.History;
  // instance: undefined | MicroFE;
  // protected activeIndex: number;
  // protected active: PortalApp;

  start(): void;
  createHost(): MicroFE;
  createApp(app: PortalApp | AppConfig): PortalApp | undefined;
  // getActiveApp(): PortalApp;
  // setActiveApp(app: PortalApp, activeIndex?: number): void;
  // _renderMatchedApp(location: Location): void;
}

export interface PortalApp {
  // new (appName: string, appConfig: AppConfig): PortalApp;
  config: AppConfig;
  render(): void;
  start(): void;

  path?: string;
  lazy?: boolean;
  mount?: () => void;
  unmount?: () => void;
}

export interface AppConfig {
  config: AppConfig;

  path?: string; // app name
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
