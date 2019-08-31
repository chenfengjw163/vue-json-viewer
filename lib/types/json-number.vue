<script>
export default {
  name: 'JsonNumber',
  functional: true,
  props: {
    jsonValue: {
      type: Number,
      required: true
    }
  },
  render (h, { props }) {
    return h('span', {
      class: {
        'jv-item': true,
        'jv-number': true,
      },
      domProps: {
        innerText: props.jsonValue.toString()
      }
    })
  }
}
</script>
