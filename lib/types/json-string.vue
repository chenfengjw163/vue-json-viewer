<script>
export default {
  name: 'JsonString',
  functional: true,
  props: {
    jsonValue: {
      type: String,
      required: true
    }
  },
  render (h, { props }) {
    return h('span', {
      class: {
        'jv-item': true,
        'jv-string': true,
      },
      domProps: {
        innerHTML: `"${props.jsonValue.toString()}"`
      }
    })
  }
}
</script>
