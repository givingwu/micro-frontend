
export interface MicroFE {
  // new (): MicroFE;
  // private readonly apps: Array<PortalApp>;
  // instance: undefined | MicroFE;
  // active: null | PortalApp;
  [propName: string]: any;

  start(): void | Boolean;
  createHost(): MicroFE;
  // createApp(app: AppConfig | PortalApp): PortalApp | number;
  createApp(appName: string, app: PortalApp | AppConfig): number | PortalApp;
  getActiveApp(): PortalApp;
}

export interface PortalApp {
  // new (appName: string, appConfig: AppConfig): PortalApp;
  config: AppConfig;
  appName: string;
  path?: string;
  didMount?: () => void;
  unmount?: () => void;
}

export interface AppConfig {
  config: AppConfig;
  appName: string;
  path?: string;
  component: VueComponent | ReactComponent | AngularComponent
  mountNode: string | HTMLElement;

  didMount?: () => void;
  unmount?: () => void;
}

interface VirtualNode {}
interface VueComponent extends VirtualNode {}
interface ReactComponent extends VirtualNode {}
interface AngularComponent extends VirtualNode {}
