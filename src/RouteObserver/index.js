/* https://github.com/ReactTraining/history/blob/5f367d8cbd/README.md */
import { createBrowserHistory, createHashHistory } from "history";
import Portal from '../Portal'
import Loading from '../Loading'
import { DEFAULT_GET_CONFIG_API } from '../config'

const CreateRoute = ({
  name,
  pathname = '/',
  ...props
}) => ({
  name: name || pathname.replace(/^\/[A-z]*/, ''),
  path: pathname,
  pathname,
  component,
  ...props
})

export class PageManger {
  constructor (mode = 'history') {
    this.mode = mode

    /*
     * Vue => VueRouter
     * React => ReactRouter
     */
    this.routesMap = {
      '/': {
        path: '/',
        name: 'root',
        component: null,
        render () {
          return `loading resource...`
        }
      }
    }

    this.onLoading = msg => Loading.start(msg)
    this.onLoadingSuccess = msg => Loading.success(msg)
    this.onLoadingFailure = (err, msg) => Loading.fail(err, msg)

    this.initConfiguration()
  }

  initConfiguration () {
    this.onLoading('init')

    fetch(DEFAULT_GET_CONFIG_API)
      .then(res => res.json)
      .then(cfgs => cfgs.forEach(cfg => new Portal(cfg)))
      .then(() => this.onLoadingSuccess('init'))
      .catch(err => this.onLoadingFailure(err, 'init'))
  }

  init () {
    const history = (this.mode === 'history' ? createBrowserHistory : createHashHistory)({
      basename: '',
      getUserConfirmation: (message, callback) => callback(window.confirm(message))
    })

    this._unlisten = history.listen((location, action) => {
      console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash}`
      );
      console.log(`The last navigation action was ${action}`);

      const portal = this.getMatchedPortal(location.pathname)

      if (portal) {
        if (portal.installed) {
          this.render(portal._app)
        } else {
          this.onLoading(portal.name)

          portal
            .install()
            .then((app) => {
              this.onLoadingSuccess(portal.name)
              this.render(app)
            })
            .catch(err => {
              this.onLoadingFailure(err, portal.name)
            })
        }
      } else {
        this.history.push('404')
      }
    });
  }

  register (portal) {
    this.routesMap[portal.pathname] = CreateRoute(portal)
  }

  getMatchedPortal (pathname) {
    return this.routesMap[pathname]
  }

  unlisten () {
    return this._unlisten()
  }
}

export default new PageManger()