import Vue from 'vue';
import JsonViewer from '../';

new Vue({
    el: '#app',
    render: h => h(JsonViewer, {
        domProps: {
            id: '123'
        },
        props: {
            value: {
                name: [
                    {name: 2}
                ],
                val: {
                    a: 1
                }
            },
            showCopy: true
        }
    })
})