<template>
    <span>
        <j-icon v-if="!keyName" :type="value ? 'arrow-down-b' : 'arrow-up-b'" @click.stop="toggle"></j-icon>
        <span>{</span>
        <template v-if="Object.keys(ordered).length">
            <json-box v-show="value" v-for="(v, k) in ordered" :key="k" :key-name="k" :value="v"></json-box>
            <span v-show="!value" class="node-ellipsis">...</span>
        </template>
        <span>}</span>
    </span>
</template>

<script>
import JIcon from '../json-icon'
export default {
    name: 'JsonObject',
    props: {
        jsonValue: Object,
        keyName: String,
        value: Boolean,
        sortKeys: Boolean
    },
    computed: {
      ordered () {
        const ordered = {};
        if (this.sortKeys) {
          Object.keys(this.jsonValue).sort().forEach(key => {
            ordered[key] = this.jsonValue[key];
          });
        } else {
          ordered = this.jsonValue
        }
        return ordered;
      }
    },
    methods: {
        toggle() {
            console.log('toggle')
            this.$emit('input', !this.value);
        }
    },
    components: {
        JIcon
    }
};
</script>

<style>

</style>
