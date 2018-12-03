import { PortalApp, AppConfig } from './interface';
export default class App implements PortalApp {
    config: AppConfig;
    path: string;
    component: AppConfig['component'];
    mountNode: AppConfig['mountNode'];
    constructor(config: AppConfig);
    render(): any;
}
