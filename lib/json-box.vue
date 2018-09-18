<template>
  <div class="jv-node">
    <span class="jv-toggle" :class="{open: !!expand}" v-if="keyName && isObject" @click.stop="toggleNode"></span>
    <span class="jv-key" v-if="keyName">
      {{keyName}}:
    </span>
    <commponent
      :expand.sync="expand"
      :is="`Json${valueType}`"
      :json-value="value"
      :key-name="keyName"
      :sort="sort"
      :depth="depth"></commponent>
  </div>
</template>

<script>
import JsonString from './types/json-string'
import JsonUndefined from './types/json-undefined'
import JsonNumber from './types/json-number'
import JsonBoolean from './types/json-boolean'
import JsonObject from './types/json-object'
import JsonArray from './types/json-array'
import JsonFunction from './types/json-function'

export default {
  name: 'JsonBox',
  inject: ['expandDepth'],
  props: {
    value: [Object, Array, String, Number, Boolean, Function],
    keyName: String,
    sort: Boolean,
    depth: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      expand: true
    }
  },
  methods: {
    toggleNode() {
      this.expand = !this.expand

      try {
        this.$el.dispatchEvent(new Event("resized"))
      } catch (e) {
        // handle IE not supporting Event constructor
        var evt = document.createEvent("Event")
        evt.initEvent("resized", true, false)
        this.$el.dispatchEvent(evt)
      }
    }
  },
  mounted() {
    this.expand = this.depth >= this.expandDepth ? false : true
  },
  computed: {
    valueType() {
      if (this.value === null || this.value === undefined) {
        return 'Undefined'
      } else if (Array.isArray(this.value)) {
        return 'Array'
      } else if (typeof this.value === 'object') {
        return 'Object'
      } else if (typeof this.value === 'number') {
        return 'Number'
      } else if (typeof this.value === 'string') {
        return 'String'
      } else if (typeof this.value === 'boolean') {
        return 'Boolean'
      } else if (typeof this.value === 'function') {
        return 'Function'
      }
    },
    isObject() {
      return this.valueType == 'Array' || this.valueType == 'Object'; // eslint-disable-line
    }
  },
  components: {
    JsonString,
    JsonNumber,
    JsonBoolean,
    JsonObject,
    JsonArray,
    JsonFunction,
    JsonUndefined
  }
}
</script>

<style lang="scss">
.jv-node {
  position: relative;

  &:after {
    content: ','
  }
  &:last-of-type {
    &:after {
      content: ''
    }
  }

  & .jv-node {
    margin-left: 25px;
  }
}
</style>
