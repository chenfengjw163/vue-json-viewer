<script>
import JsonBox from '../json-box'

export default {
  name: 'JsonArray',
  props: {
    jsonValue: {
      type: Array,
      required: true
    },
    keyName: {
      type: String,
      default: ''
    },
    depth: {
      type: Number,
      default: 0
    },
    sort: Boolean,
    expand: Boolean,
    forceExpand: Boolean,
    previewMode: Boolean,
    showArrayIndex: Boolean,
  },
  data() {
    return {
      value: []
    }
  },
  watch: {
    jsonValue(newVal) {
      this.setValue(newVal);
    }
  },
  mounted() {
    this.setValue(this.jsonValue);
  },
  methods: {
    setValue(vals, index = 0) {
      if (index === 0) {
        this.value = [];
      }
      setTimeout(() => {
        if (vals.length > index) {
          this.value.push(vals[index]);
          this.setValue(vals, index + 1);
        }
      }, 0);
    },
    toggle() {
      this.$emit('update:expand', !this.expand)
      this.dispatchEvent();
    },
    toggleAll() {
      this.$emit('update:expandAll', !this.expand)
      this.dispatchEvent();
    },
    dispatchEvent() {
      try {
        this.$el.dispatchEvent(new Event('resized'))
      } catch (e) {
        // handle IE not supporting Event constructor
        var evt = document.createEvent('Event')
        evt.initEvent('resized', true, false)
        this.$el.dispatchEvent(evt)
      }
    }
  },
  render (h) {
    let elements = []

    if (!this.previewMode && !this.keyName) {
      elements.push(h('span', {
        class: {
          'jv-toggle': true,
          'open': !!this.expand,
        },
        on: {
          click: (event) => {
            if (event.altKey) {
              this.toggleAll()
            } else {
              this.toggle()
            }
          }
        }
      }))
    }

    elements.push(h('span', {
      class: {
        'jv-item': true,
        'jv-array': true,
      },
      domProps: {
        innerText: '['
      }
    }))
    if (this.expand) {
      this.value.forEach((value, key) => {
        elements.push(h(JsonBox, {
          key,
          props: {
            sort: this.sort,
            keyName: this.showArrayIndex ? `${key}`: '',
            depth: this.depth + 1,
            value,
            previewMode: this.previewMode,
            forceExpand: this.forceExpand,
            showArrayIndex: this.showArrayIndex,
          }
        }))
      })
    }

    if (!this.expand && this.value.length) {
      elements.push(h('span', {
        class: {
          'jv-ellipsis': true,
        },
        on: {
          click: (event) => {
            if (event.altKey) {
              this.toggleAll()
            } else {
              this.toggle()
            }
          }
        },
        attrs: {
          title: `click to reveal ${this.value.length} hidden items`
        },
        domProps: {
          innerText: '...'
        }
      }))
    }

    elements.push(h('span', {
      class: {
        'jv-item': true,
        'jv-array': true,
      },
      domProps: {
        innerText: ']'
      }
    }))

    return h('span', elements)
  }
}
</script>
