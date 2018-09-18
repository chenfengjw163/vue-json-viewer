<template>
  <span class="jv-item jv-string">"{{jsonValue}}"</span>
</template>

<script>
export default {
  name: 'JsonString',
  props: {
    jsonValue: String
  }
}
</script>
