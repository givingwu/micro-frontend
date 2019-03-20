export default class PageRouter {
  masterRouters = null

  constructor (routes) {
    if (!routes || !routes.length) {
      throw new Error(`Must pass a 'routes: Routes[]' array for initialize PageRouter.`)
    }

    this.routes = routes
    this.pageManager = (window.microFrontEnd || {}).pageManager
    this.master = this.pageManager.master
    this.init()
  }

  init () {
    if (this.pageManager && this.pageManager.master) {
      
    }
  }
}