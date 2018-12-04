中文 | [English](./README.md)

# 微前端
✨🌟✨ 单页面微前端应用解决方法, 使用非常简单只需要三分钟学会三个API既可。

+ 同一页面多个项目之间跳转无需刷新界面
+ 整合新项目到旧项目中无需修改之前代码
+ 懒加载项目依赖代码 [Webpack Code-Splitting](https://webpack.js.org/guides/code-splitting/)


## 如何做到？
+ 独立运行
```js
const app = host.createApp(appConfig)
// 独立运行
app.start()
```

+ 独立部署
```bash
cd path/app1
npm run build
sh deploy.sh
```

+ 组合运行
```js
const app1 = host.createApp(appConfig1)
const app2 = host.createApp(appConfig2)

host.start()
```

+ 组合部署
```bash
cd path/hostProject
npm run build
sh deploy.sh
```

## 用例
+ 第一步：创建 host 对象

*[frontend-host demo](./demo/frontend-host/src/main.js)*
```js
import app1 from '../../frontend-1/src/main'
import app2 from '../../frontend-2/src/main'
import microfe from 'micro-frontend'

const host = microfe.createHost() // 1

host.createApp({ // 2
  path: '/',
  render() {/*  */}
  // if Vue: new Vue({ render: h => h(App) }).$mount('#app')
  // if React: ReactDOM.render(<App />, document.querySelector('#app'))
  // if Angular: ??
})
host.createApp(app1)
host.createApp(app2)

host.start() // 3
```

+ 第二步：在每个子项目中创建 host 并注册 app

*[forntend-1 demo](./demo/frontend-1/src/main.js)*
```js
// ...
const host = microfe.createHost()
const app = {
  path: '/demo1',
  render() {/* your render code*/}
}

host.createApp(app) // 相同的 APP 对象或者 path 只会被创建一次

/* if u wanna run this child project single, open following code */
// host.start()
export default app;
```

*[forntend-2 demo](./demo/frontend-1/src/main.js)*
```js
// ...
const host = microfe.createHost() // it is a singleton object, so don't worry how many times it be called.
const app = {
  path: '/demo1',
  render() {/* your render code*/}
}

host.createApp(app) // The same app reference or app.path will be called only once too.

/* if u wanna run this child project single, open following code */
app.start()
export default app;
```

+ 第三步: 进入你调用`host.start()`方法的主项目启动它。


## TODOs
+ [ ] 支持所有前端框架
+ [ ] 独立构建每个子应用
+ [ ] 懒加载子应用的入口组件


## Questions
下面的问题还没有好的主意：

+ 如何管理不同应用之间到公共依赖？
+ 如何部署它们？只需要部署 host project，还是部署每一个 portal 子项目？或者一个中间层服务器？


## Troubleshooting
+ 如果你遇到了这样到问题： `Error: No ESLint configuration found.` 这个连接[github issue](https://github.com/vuejs/vue-cli/issues/2539)可以帮到你.

```js
INFO  Starting development server... 94% after seal

ERROR  Failed to compile with 1 errors

Module build failed (from ./node_modules/_eslint-loader@2.1.1@eslint-loader/index.js):
  Error: No ESLint configuration found.    at Config.getLocalConfigHierarchy
```

## References
[微前端的那些事儿](https://github.com/phodal/microfrontends)
