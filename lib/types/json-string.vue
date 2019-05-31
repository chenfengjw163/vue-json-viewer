<script>
const REG_LINK = /^\w+:\/\//;

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
    let value = props.jsonValue;
    
    if (REG_LINK.test(value)) {
      value = `<a href="${value}" target="_blank" style="color: #0366d6;">${value}</a>`;
    }

    return h('span', {
      class: {
        'jv-item': true,
        'jv-string': true,
      },
      domProps: {
        innerHTML: `"${value.toString()}"`
      }
    })
  }
}
</script>
