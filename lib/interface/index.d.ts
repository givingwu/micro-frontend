import * as history from 'history';
export interface MicroFE {
    appMap: Map<String, PortalApp>;
    history: history.History;
    start(): void;
    createHost(): MicroFE;
    createApp(app: PortalApp | AppConfig): PortalApp | undefined;
}
export interface PortalApp {
    config: AppConfig;
    render(): void;
    path?: string;
    lazy?: boolean;
    mount?: () => void;
    unmount?: () => void;
}
export interface AppConfig {
    config: AppConfig;
    path?: string;
    component?: string | Function | VueComponent | ReactComponent | AngularComponent;
    mountNode?: string | HTMLElement;
    render(): void | HTMLElement;
    mount?: () => void;
    unmount?: () => void;
}
interface VirtualNode {
    [propName: string]: any;
}
interface VueComponent extends VirtualNode {
}
interface ReactComponent extends VirtualNode {
}
interface AngularComponent extends VirtualNode {
}
export {};
