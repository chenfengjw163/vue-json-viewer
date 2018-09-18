<template>
  <span>
    <span class="jv-toggle" :class="{open: !!expand}" v-if="!keyName" @click.stop="toggle"></span>
    <span class="jv-item jv-object">{</span>
    <template v-if="Object.keys(ordered).length">
      <json-box
        v-show="expand"
        v-for="(v, k) in ordered"
        :sort="sort"
        :key="k"
        :key-name="k"
        :value="v"
        :depth="depth + 1"></json-box>
      <span
        v-show="!expand"
        class="jv-ellipsis"
        @click.stop="toggle"
        :title="!expand ? `click to reveal object content (keys: ${Object.keys(ordered).join(', ')})` : ''">...</span>
    </template>
    <span class="jv-item jv-object">}</span>
  </span>
</template>

<script>
export default {
  name: 'JsonObject',
  props: {
    jsonValue: Object,
    keyName: String,
    expand: Boolean,
    sort: Boolean,
    depth: Number
  },
  computed: {
    ordered () {
      if (!this.sort) {
        return this.jsonValue
      }

      const ordered = {}
      Object.keys(this.jsonValue).sort().forEach(key => {
        ordered[key] = this.jsonValue[key]
      })
      return ordered
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
