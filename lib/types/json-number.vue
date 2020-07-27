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
    const isInteger = Number.isInteger(props.jsonValue)

    return h('span', {
      class: {
        'jv-item': true,
        'jv-number': true,
        'jv-number-integer': isInteger,
        'jv-number-float': !isInteger,
      },
      domProps: {
        innerText: props.jsonValue.toString()
      }
    })
  }
}
</script>
