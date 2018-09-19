<script>
export default {
  name: 'JsonUndefined',
  functional: true,
  props: {
    jsonValue: {
      type: Object,
      default: null
    }
  },
  render (h, { props }) {
    return h('span', {
      class: {
        'jv-item': true,
        'jv-undefined': true,
      },
      domProps: {
        innerHTML: props.jsonValue === null ? 'null' : 'undefined'
      }
    })
  }
}
</script>
