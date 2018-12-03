中文 | [English](./README.md)

# 微前端
✨🌟✨ 单页面微前端应用解决方法, 使用非常简单只需要三分钟学会三个API既可。

+ 同一页面多个项目之间跳转无需刷新界面
+ 整合新项目到旧项目中无需修改之前代码
+ 懒加载项目依赖代码 [Webpack Code-Splitting](https://webpack.js.org/guides/code-splitting/)


## Usage
+ 第一步：创建 host 对象

*[frontend-host demo](./demo/frontend-host/src/main.js)*
```js
// ...
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

host.createApp(app) // The same app reference or app.path will be called only once too.

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
// host.start()
export default app;
```

more and more ...

+ step three: Run the host project which one u called `host.start()` method.


## TODOs
+ [ ] Supports any frontend framework, Angular ??
+ [ ] lazy load each child app's entry component
+ [ ] build each child app independent and separately


## Questions
The following questions i am not very clear yet or no any good idea about them.

+ how to manage common dependencies of each child app?
+ how to deploy them? Only deploy host project or every portal project? Or a middle layer server?


## Troubleshooting
+ if u met one error like this `Error: No ESLint configuration found.` when u run this project, may this link [github issue](https://github.com/vuejs/vue-cli/issues/2539) can help you.

```js
INFO  Starting development server... 94% after seal

ERROR  Failed to compile with 1 errors

Module build failed (from ./node_modules/_eslint-loader@2.1.1@eslint-loader/index.js):
  Error: No ESLint configuration found.    at Config.getLocalConfigHierarchy
```
