<script>
import { h } from 'vue'

export default {
  name: 'JsonNumber',
  functional: true,
  props: {
    jsonValue: {
      type: Number,
      required: true
    }
  },
  render () {
    const isInteger = Number.isInteger(this.jsonValue)

    return h('span', {
      class: {
        'jv-item': true,
        'jv-number': true,
        'jv-number-integer': isInteger,
        'jv-number-float': !isInteger,
      },
      innerText: this.jsonValue.toString()
    })
  }
}
</script>
