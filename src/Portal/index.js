import pageManger from '../PageManger'
import LazyLoader from '../LazyLoader'
import { DEFAULT_GET_RESOURCE_API } from '../config'

export default class Portal {
  constructor (config) {
    const {
      base,
      master, /* master runtime-project flag */
      name = '',
      path,
      pathname, /* The path of the URL */
      onLoading,
      onLoadingSuccess,
      onLoadingFailure,
      before,
      after
    } = config

    if (!pathname) {
      throw new Error(`Must pass the 'pathname: string' property for configuration object to set PageManager namespace.`)
    }

    if (!pathname.startWith('/')) {
      pathname = '/' + pathname
      if (!name) name = pathname
    }

    name && (this.name = name)
    base && (this.base = base)
    before && (this.before = before)
    after && (this.after = after)

    onLoading && (this.onLoading = onLoading)
    onLoadingSuccess && (this.onLoadingSuccess = onLoadingSuccess)
    onLoadingFailure && (this.onLoadingFailure = onLoadingFailure)

    this.pathname = path || pathname
    this._config = config

    pageManger.register(this)

    if (master) {
      if (!pageManger.master) {
        this.install()

        Object.defineProperty(
          pageManger,
          'master',
          {
            get () {
              return this
            },
            configurable: false,
            writable: false,
            enumerable: false
          }
        )
      } else {
        throw new Error(
          `Cannot set 'pageManger.master' property twice,
           before name is ${pageManger.master.name}`
        )
      }
    }
  }

  install () {
    const { master, pathname: name, prefetch, preload, installed } = this._config
    const resourceURL = this._config.getResourceURL || DEFAULT_GET_RESOURCE_API

    return LazyLoader.loadResource(name, resourceURL)
      .then(resource => {
        if (master || preload) {
          LazyLoader.preloadResource()
        } else if (prefetch) {
          LazyLoader.prefetchResource()
        }
      })
      .then(() => {
        LazyLoader.installResource(name)
      })
      .then(({
        routes,
        render,
        component
      }) => {
        installed && installed()
        this.installed = true
      })
      .catch(error => {
        throw new Error(`${name} resource load error`)
        console.error(error)
      })
  }
}