<script>
export default {
  name: 'JsonDate',
  functional: true,
  props: {
    jsonValue: {
      type: Date,
      required: true
    }
  },
  render (h, { props }) {
    const value = props.jsonValue;

    return h('span', {
      class: {
        'jv-item': true,
        'jv-string': true,
      },
      domProps: {
        innerText: `"${value.toLocaleString()}"`
      }
    })
  }
};
</script>
