import { MicroFE, PortalApp, AppConfig } from './interface';
import * as history from 'history';
declare class MicroFrontEnd implements MicroFE {
    private static active;
    private _instance;
    private unlisten?;
    appMap: Map<String, PortalApp>;
    history: history.History;
    constructor();
    createHost(): any;
    createApp(appConfig: AppConfig | PortalApp): PortalApp | undefined;
    active: PortalApp;
    start(): void;
    private _getMatchedApp;
}
declare const microfe: MicroFrontEnd;
export default microfe;
export { microfe, PortalApp, };
