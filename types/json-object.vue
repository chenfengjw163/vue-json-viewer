<template>
    <span>
        <i v-if="!keyName" class="icon" :class="{'ion-arrow-down-b': value, 'ion-arrow-up-b': !value}" @click.stop="toggle"></i>
        <span>{</span>
        <template v-if="Object.keys(jsonValue).length">
            <json-box v-show="value" v-for="(v, k) in jsonValue" :key="k" :key-name="k" :value="v"></json-box>
            <span v-show="!value" class="node-ellipsis">...</span>
        </template>
        <span>}</span>
    </span>
</template>

<script>
export default {
    name: 'JsonObject',
    props: {
        jsonValue: Object,
        keyName: String,
        value: Boolean
    },
    methods: {
        toggle() {
            console.log('toggle')
            this.$emit('input', !this.value);
        }
    }
};
</script>

<style>

</style>
