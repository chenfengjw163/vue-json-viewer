import Vue from 'vue';
import JsonViewer from '../';
import './css/ionicons.css';

new Vue({
    el: '#app',
    render: h => h(JsonViewer, {
        domProps: {
            id: '123'
        },
        props: {
            value: {
                name: [
                    {name: 2},
                    {name: 2},
                    {name: 2},
                    {name: 2},
                    {name: 2},
                    {name: 2},
                    {name: 2},
                    {name: 2},
                    {name: 2},
                    {name: 2},
                    {name: 2},
                    {name: 2},
                    {name: 2},
                ],
                val: {
                    b: 'a',
                    a: 'askldjfhlkajshdflhklsdafhkljahsdklfjhlkjsahdflkhaslkjdfhlkashdflkhaslkdhfklashdflkhasljkghlakshdfklhalsjkd',
                    asd2: 1,
                    asd: false
                }
            },
            showCopy: true,
            iconPrefix: 'ion'
        }
    })
})