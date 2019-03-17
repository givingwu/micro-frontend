export default class LazyLoader {
  loadedMap = {}
  installedMap = {}

  static async loadResource (name, url) {
    if (LazyLoader.isLoaded()) {
      return LazyLoader.loadedMap[name]
    } else {
      return fetch(url)
        .then(res => res.json())
        .then(data => { /* data = { css, js, images } */
          return LazyLoader.loadedMap[name] = data
        })
        .catch(e => {
          throw new Error(e)
        })
    }
  }

  static isLoaded (name) {
    return LazyLoader.loadedMap[name] !== undefined // boolean
  }
  static isInstalled (name) {
    return LazyLoader.installedMap[name] !== undefined // boolean
  }

  static prefetchResource (source) {}
  static prefetchCSS () {}
  static prefetchJavaScript () {}

  static preloadResource (source) {}
  static preloadCSS () {}
  static preloadJavaScript () {}

  static async installResource () {}
  static async installCSS () {}
  static async installScript () {}
}