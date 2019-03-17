export default {
  pathname: '/demo1',
  getResourceURL: '/api/resource',
  updateResourceURL: '/api/resource',
  master: false,
  prefetch: true,
  preload: false,
  router: null, /* VueRouter */
  routes: [],

  /* 注入全局当前项目全局变量 */
  globals: {
    $imagePrefix: '/demo1/images/',
  },

  /* webpack：
   webpack 把本地 package.json 的 dependencies 字段和 micro-frontend\master-runtime 依赖进行比对，
   求出本地依赖与公共依赖的差集和并集，将差集用于本地 build，将并集 external 出去.

   然后本地入口在开发环境中是 `src/main.js`, 在产品环境则是 `portal.config.js`，要打包成 UMD 格式供浏览器使用。
   在产品build后，webpack 需要将 配置文件 和 依赖文件 通过 `updateResourceURL` 上传至 `Server`。
  */
  prodExternalDependencies: [
    'micro-frontend',
      'history',
    'yz-vue-adapter',
    'yz-*-master',
      'yz-components',
      'yz-plugins',
      'vue',
      'vuex',
      'axios',
      'element-ui',
  ],

  installed () {},
  before () {
    console.log('before hook', this)
  },
  after () {
    console.log('before hook', this)
  }
}