# vue-json-viewer

简单json展示工具，基于vue框架开发的展示组件

Examples:

安装：

``` cli
npm install vue-json-viewer
```
or
``` cli
yarn add vue-json-viewer
```

使用：

``` js
export default {
  name: 'Page',
  data() {
    return {
      jsonData: {
        name: [
          {key: 2},
          {key: 'hello word'},
        ],
        val: {
          b: 'a',
          a: 'hello word',
          asd2: 1,
          asd: false
        }
      }
    }
  }
}
```