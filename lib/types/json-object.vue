<template>
    <span>
        <span class="jv-toggle" :class="{open: !!value}" v-if="!keyName" @click.stop="toggle"></span>
        <span class="jv-item jv-object">{</span>
        <template v-if="Object.keys(ordered).length">
            <json-box v-show="value" v-for="(v, k) in ordered" :sort="sort" :key="k" :key-name="k" :value="v"></json-box>
            <span v-show="!value" class="jv-ellipsis" @click.stop="toggle">...</span>
        </template>
        <span class="jv-item jv-object">}</span>
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
    sort: Boolean
  },
  computed: {
    ordered () {
      if (!this.sortKeys) {
        return this.jsonValue;
      }

      const ordered = {};
      Object.keys(this.jsonValue).sort().forEach(key => {
        ordered[key] = this.jsonValue[key];
      });
      return ordered;
    }
  },
  methods: {
    toggle() {
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
