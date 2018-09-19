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
    expand: Boolean
  },
  computed: {
    ordered () {
      let value = this.jsonValue

      if (!this.sort) {
        return value
      }

      return value.sort()
    }
  },
  methods: {
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
    }
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
        innerHTML: '['
      }
    }))

    for (let key in this.ordered) {
      let value = this.ordered[key]

      elements.push(h(JsonBox, {
        key,
        style: {
          display: !this.expand ? 'none' : undefined
        },
        props: {
          sort: this.sort,
          // keyName: key,
          depth: this.depth + 1,
          value,
        }
      }))
    }

    if (!this.expand) {
      elements.push(h('span', {
        style: {
          display: this.expand ? 'none' : undefined
        },
        class: {
          'jv-ellipsis': true, 
        },
        on: {
          click: this.toggle
        },
        attrs: {
          title: `click to reveal ${this.jsonValue.length} hidden items`
        },
        domProps: {
          innerHTML: '...'
        }
      }))
    }

    elements.push(h('span', {
      class: {
        'jv-item': true,
        'jv-array': true, 
      },
      domProps: {
        innerHTML: ']'
      }
    }))

    return h('span', elements)
  }
}
</script>
