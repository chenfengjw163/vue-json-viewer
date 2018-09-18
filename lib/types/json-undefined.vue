<template>
  <span class="jv-item jv-undefined">{{ jsonValue === null ? 'null' : 'undefined' }}</span>
</template>

<script>
export default {
  name: 'JsonUndefined',
  props: {
    jsonValue: Object
  }
}
</script>
