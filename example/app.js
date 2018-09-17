import Vue from 'vue';
import JsonViewer from '../lib';
import './css/ionicons.css';

new Vue({
    el: '#app',
    data() {
        return {
            jsonData: {
                name: [
                  {key: 2},
                  {key: 'hello word'},
                ],
                val: {
                  c: function() {},
                  b: 'a',
                  a: 'hello word',
                  asd2: 1,
                  asd: false,
                  foo: null,
                  bar: undefined
                }
              }
        }
    },
    components: {JsonViewer}
})