<script>
export default {
  name: 'JsonFunction',
  functional: true,
  props: {
    jsonValue: {
      type: Function,
      required: true
    }
  },
  render (h, { props }) {
    return h('span', {
      class: {
        'jv-item': true,
        'jv-function': true,
      },
      attrs: {
        title: props.jsonValue.toString()
      },
      domProps: {
        innerHTML: '&lt;function&gt;'
      }
    })
  }
}
</script>
