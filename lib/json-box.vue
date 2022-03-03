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
  inject: ['expandDepth', 'onKeyclick'],
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
    forceExpand: Boolean,
    showArrayIndex: Boolean,
    showDoubleQuotes: Boolean,
    path: {
      type: String,
      default: '$',
    },
  },
  data() {
    return {
      expand: true,
      forceExpandMe: this.forceExpand,
    }
  },
  mounted() {
    this.expand = this.previewMode || (this.depth >= this.expandDepth ? false : true) || this.forceExpandMe
  },
  methods: {
    toggle() {
      this.expand = !this.expand

      this.dispatchEvent()
    },
    toggleAll() {
      this.expand = !this.expand
      this.forceExpandMe = this.expand

      this.dispatchEvent()
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
    },
    getPath() {
      const path = [this.keyName];
      let p = this.$parent;
      while(p.depth) {
        if (p.$el.classList.contains('jv-node')) {
          path.push(p.keyName);
        }
        p = p.$parent;
      }
      return path.reverse()
    }
  },
  render (h) {
    let elements = []
    let dataType

    if (this.value === null || this.value === undefined) {
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
    const complex = this.keyName && (this.value && (Array.isArray(this.value) || (typeof this.value === 'object' && Object.prototype.toString.call(this.value) !== '[object Date]')))

    if (!this.previewMode && complex) {
      elements.push(h('span', {
        class: {
          'jv-toggle': true,
          open: !!this.expand
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

    if (this.keyName) {
      elements.push(h('span', {
        class: {
          'jv-key': true
        },
        domProps: {
          innerText: this.showDoubleQuotes ? `"${this.keyName}":` : `${this.keyName}:`
        },
        on: {
          click: () => {
            this.onKeyclick(this.path);
          }
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
        forceExpand: this.forceExpandMe,
        showArrayIndex: this.showArrayIndex,
        showDoubleQuotes: this.showDoubleQuotes,
        path: this.path,
      },
      on: {
        'update:expand': value => {
          this.expand = value
        },
        'update:expandAll': value => {
          this.expand = value
          this.forceExpandMe = this.expand
        }
      }
    }))

    return h('div', {
      class: {
        'jv-node': true,
        'jv-key-node': Boolean(this.keyName) && !complex,
        'toggle': !this.previewMode && complex
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
