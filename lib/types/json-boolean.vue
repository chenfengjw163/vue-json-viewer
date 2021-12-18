<script>
export default {
  name: 'JsonBoolean',
  functional: true,
  props: {
    jsonValue: Boolean
  },
  render (h, { props }) {
    return h('span', {
      class: {
        'jv-item': true,
        'jv-boolean': true,
      },
      domProps: {
        innerText: props.jsonValue.toString()
      }
    })
  }
}
</script>
