<script>
import JsonString from './types/json-string'
import JsonUndefined from './types/json-undefined'
import JsonNumber from './types/json-number'
import JsonBoolean from './types/json-boolean'
import JsonObject from './types/json-object'
import JsonArray from './types/json-array'
import JsonFunction from './types/json-function'
import JsonDate from './types/json-date'

export default {
  name: 'JsonBox',
  inject: ['expandDepth'],
  props: {
    value: {
      type: [Object, Array, String, Number, Boolean, Function, Date],
      default: null
    },
    keyName: {
      type: String,
      default: ''
    },
    sort: Boolean,
    depth: {
      type: Number,
      default: 0
    },
    previewMode: Boolean,
  },
  data() {
    return {
      expand: true
    }
  },
  mounted() {
    this.expand = this.previewMode || (this.depth >= this.expandDepth ? false : true)
  },
  methods: {
    toggle() {
      this.expand = !this.expand

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
    let dataType

    if (this.value === null || this.value === undefined) {
      dataType = JsonUndefined
    } else if (Array.isArray(this.value)) {
      dataType = JsonArray
    } else if (Object.prototype.toString.call(this.value) === '[object Date]') {
      dataType = JsonDate
    } else if (typeof this.value === 'object') {
      dataType = JsonObject
    } else if (typeof this.value === 'number') {
      dataType = JsonNumber
    } else if (typeof this.value === 'string') {
      dataType = JsonString
    } else if (typeof this.value === 'boolean') {
      dataType = JsonBoolean
    } else if (typeof this.value === 'function') {
      dataType = JsonFunction
    }
    const toggle = this.keyName && (this.value && (Array.isArray(this.value) || (typeof this.value === 'object' && Object.prototype.toString.call(this.value) !== '[object Date]')))

    if (!this.previewMode && toggle) {
      elements.push(h('span', {
        class: {
          'jv-toggle': true,
          open: !!this.expand
        },
        on: {
          click: this.toggle
        }
      }))
    }

    if (this.keyName) {
      elements.push(h('span', {
        class: {
          'jv-key': true
        },
        domProps: {
          innerText: `${this.keyName}:`
        }
      }))
    }

    elements.push(h(dataType, {
      class: {
        'jv-push': true
      },
      props: {
        jsonValue: this.value,
        keyName: this.keyName,
        sort: this.sort,
        depth: this.depth,
        expand: this.expand,
        previewMode: this.previewMode,
      },
      on: {
        'update:expand': value => {
          this.expand = value
        }
      }
    }))

    return h('div', {
      class: {
        'jv-node': true,
        'toggle': !this.previewMode && toggle
      }
    }, elements)
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

  &.toggle {
    margin-left: 13px !important;
  }

  & .jv-node {
    margin-left: 25px;
  }
}
</style>
