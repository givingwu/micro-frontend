import App from './app';
import * as history from 'history';
class MicroFrontEnd {
    constructor() {
        // this._active = {} as PortalApp
        this._instance = window.microFrontEnd || null;
        this.appMap = new Map();
        /**
         * How do you explicitly set a new property on `window` in TypeScript?
         * https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript
         */
        this.history = history.createBrowserHistory({
            basename: "/"
        });
    }
    // singleton implementation in one instance
    createHost() {
        if (!this._instance) {
            this._instance = new MicroFrontEnd();
            window.microFrontEnd = this._instance;
        }
        return this._instance;
    }
    createApp(appConfig) {
        const app = appConfig instanceof App ? appConfig : new App(appConfig);
        let appPath = app.path || '';
        appPath = appPath.slice(0, 1) === '/' ? appPath : '/' + appPath;
        //eslint-disable-next-line
        // console.log(app)
        if (appPath && typeof appPath === 'string') {
            if (!this.appMap.has(appPath)) {
                this.appMap.set(appPath, app);
            }
        }
        else {
            //eslint-disable-next-line
            console.warn(`Property 'path' does not exist in app: ${app}`);
        }
        return this.appMap.get(appPath);
    }
    get active() {
        return MicroFrontEnd.active;
    }
    set active(val) {
        if (MicroFrontEnd.active === val)
            return;
        else {
            MicroFrontEnd.active = val;
            this.history.push(val.path);
        }
    }
    start() {
        if (!this.appMap.size) {
            throw new Error('You must pass a micro-frontend portal to start up.');
        }
        if (typeof this.unlisten === 'function') {
            this.unlisten();
        }
        /* this.unlisten =  */
        this.unlisten = this.history.listen((location) => {
            // location: Location<HistoryLocationState>
            this._getMatchedApp(location);
        });
        if (!this.active) {
            // default startUp app is which path '/'
            const startUpApp = this.appMap.get('/');
            if (startUpApp) {
                this.active = startUpApp;
            }
            else {
                // if no any app has path '/', try to use the first otherwise throw the warning
                if (this.appMap.size >= 1) {
                    const firstPath = [...this.appMap.keys()][0];
                    this.active = this.appMap.get(firstPath);
                }
                else {
                    // eslint-disable-next-line
                    console.warn('No any start up app which has path `/` in micro-fe');
                }
            }
        }
    }
    _getMatchedApp(location) {
        const pathname = location.pathname;
        const app = this.appMap.get(pathname);
        if (app) {
            return app.render();
        }
        else {
            return '404';
        }
    }
}
const microfe = new MicroFrontEnd();
export default microfe;
export { microfe, };
