<template>
  <span>
    <span class="jv-toggle" :class="{open: !!expand}" v-if="!keyName" @click.stop="toggle"></span>
    <span class="jv-item jv-array">[</span>
    <template v-if="jsonValue.length">
      <json-box
        v-show="expand"
        v-for="(val, index) in ordered"
        :sort="sort"
        :key="index"
        :value="val"
        :depth="depth + 1"></json-box>
      <span
        v-show="!expand"
        class="jv-ellipsis"
        @click.stop="toggle"
        :title="!expand ? `click to reveal ${jsonValue.length} hidden items` : ''">...</span>
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
    sort: Boolean,
    expand: Boolean,
    depth: Number
  },
  computed: {
    ordered () {
      if (!this.sort) {
        return this.jsonValue
      }

      return this.jsonValue.sort()
    }
  },
  methods: {
    toggle() {
      this.$emit('update:expand', !this.expand)

      try {
        this.$el.dispatchEvent(new Event("resized"))
      } catch (e) {
        // handle IE not supporting Event constructor
        var evt = document.createEvent("Event")
        evt.initEvent("resized", true, false)
        this.$el.dispatchEvent(evt)
      }
    }
  }
}
</script>
