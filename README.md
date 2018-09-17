# vue-json-viewer

Simple json display component,  based on vue

## Installing:
Using npm:
```
$ npm install vue-json-viewer
```
Using bower:


```
$ yarn add vue-json-viewer
```

## Example:

``` html
<json-viewer
  :value="jsonData"
  :show-copy="true"
  icon-prefix="ion"
  :show-bigger="true"
  :sort-keys="true" />
```

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
## Result:
![ABC](http://oxqqtdux0.bkt.clouddn.com/WX20180702-172158.png)


## Options:

| Property | Description |
| ----------- |:------------- |
| value | json data |
| show-copy | display the copy button |
| show-bigger | display the bigger button |
| icon-prefix | Custom Font icon prefix |
| sort-keys | Sort items by key names |
