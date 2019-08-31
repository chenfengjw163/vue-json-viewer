<script>
import JsonBox from '../json-box'

export default {
  name: 'JsonArray',
  data() {
    return {
      value: []
    }
  },
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
    expand: Boolean
  },
  computed: {
    ordered () {
      let value = this.value

      if (!this.sort) {
        return value
      }

      return value.sort()
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
        this.value.push(vals[index]);

        if (this.value.length < vals.length) {
          this.setValue(vals, index + 1);
        }
      }, 0);
    },
    toggle() {
      this.$emit('update:expand', !this.expand)

      try {
        this.$el.dispatchEvent(new Event('resized'))
      } catch (e) {
        // handle IE not supporting Event constructor
        var evt = document.createEvent('Event')
        evt.initEvent('resized', true, false)
        this.$el.dispatchEvent(evt)
      }
    },
    
  },
  render (h) {
    let elements = []

    if (!this.keyName) {
      elements.push(h('span', {
        class: {
          'jv-toggle': true,
          'open': !!this.expand,
        },
        on: {
          click: this.toggle
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
    this.ordered.forEach((value, key) => {
      elements.push(h(JsonBox, {
        key,
        style: {
          display: this.expand ? undefined : 'none'
        },
        props: {
          sort: this.sort,
          // keyName: key,
          depth: this.depth + 1,
          value,
        }
      }))
    })

    if (!this.expand && this.value.length) {
      elements.push(h('span', {
        style: {
          display: undefined
        },
        class: {
          'jv-ellipsis': true,
        },
        on: {
          click: this.toggle
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
