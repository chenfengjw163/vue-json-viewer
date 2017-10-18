<template>
    <i class="j-icon" :class="{
        [`${iconPrefix}`]: true,
        [`${iconPrefix}-${type}`]: true
    }" @click="iconClick"></i>
</template>

<script>
export default {
    name: 'JsonIcon',
    inject: ['iconPrefix'],
    props: {
        iconPrefix: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        }
    },
    methods: {
        iconClick(e) {
            this.$emit('click', e);
        }
    }
}
</script>