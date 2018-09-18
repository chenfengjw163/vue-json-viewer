<template>
  <span class="jv-item jv-number">{{jsonValue}}</span>
</template>

<script>
export default {
  name: 'JsonNumber',
  props: {
    jsonValue: Number
  }
}
</script>
