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
    const islink = REG_LINK.test(value)
    let domProps
    
    if (islink) {
      value = `<a href="${value}" target="_blank" style="color: #0366d6;">${value}</a>`;
      domProps = {
        innerHTML: `"${value.toString()}"`
      }
    } else {
      domProps = {
        innerText: `"${value.toString()}"`
      }
    }

    return h('span', {
      class: {
        'jv-item': true,
        'jv-string': true,
      },
      domProps: {
        ...domProps
      }
    })
  }
}
</script>
