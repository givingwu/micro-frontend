import { PortalApp, AppConfig } from './interface';
export default class App implements PortalApp {
    config: AppConfig;
    path: string;
    component: AppConfig['component'];
    mountNode: AppConfig['mountNode'];
    /**
     * create a new PortalApp instance
     */
    constructor(config: AppConfig);
    render(): any;
}
