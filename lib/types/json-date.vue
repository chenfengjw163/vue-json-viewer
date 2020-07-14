<script>
export default {
  name: 'JsonDate',
  inject: ['timeformat'],
  functional: true,
  props: {
    jsonValue: {
      type: Date,
      required: true
    }
  },
  render (h, { props, injections }) {
    const value = props.jsonValue;
    const timeformat = injections.timeformat;

    return h('span', {
      class: {
        'jv-item': true,
        'jv-string': true,
      },
      domProps: {
        innerText: `"${timeformat(value)}"`
      }
    })
  }
};
</script>
