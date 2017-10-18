<template>
    <span>
        <j-icon v-if="!keyName" :type="value ? 'arrow-down-b' : 'arrow-up-b'" @click.stop="toggle"></j-icon>
        <span>[</span>
        <template v-if="jsonValue.length">
            <json-box v-show="value" v-for="(val, index) in jsonValue" :key="index" :value="val"></json-box>
            <span v-show="!value" class="node-ellipsis">...</span>
        </template>
        <span>]</span>
    </span>
</template>

<script>
export default {
    name: 'JsonArray',
    props: {
        jsonValue: Array,
        keyName: String,
        value: Boolean
    },
    methods: {
        toggle() {
            this.$emit('input', !this.value);
        }
    }
};
</script>

<style>

</style>
