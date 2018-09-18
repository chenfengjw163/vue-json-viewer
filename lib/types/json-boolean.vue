<template>
  <span class="jv-item jv-boolean">{{jsonValue}}</span>
</template>

<script>
export default {
  name: 'JsonBoolean',
  props: {
    jsonValue: Boolean
  }
}
</script>
