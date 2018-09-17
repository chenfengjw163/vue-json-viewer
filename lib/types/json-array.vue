<template>
    <span>
        <span class="jv-toggle" :class="{open: !!value}" v-if="!keyName" @click.stop="toggle"></span>
        <span class="jv-item jv-array">[</span>
        <template v-if="jsonValue.length">
            <json-box v-show="value" v-for="(val, index) in jsonValue" :key="index" :value="val"></json-box>
            <span v-show="!value" class="jv-ellipsis" @click.stop="toggle">...</span>
        </template>
        <span class="jv-item jv-array"Z>]</span>
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
