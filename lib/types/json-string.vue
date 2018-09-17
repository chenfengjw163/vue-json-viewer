<template>
    <span class="jv-item jv-string">"{{jsonValue}}"</span>
</template>

<script>
export default {
    name: 'JsonString',
    props: {
        jsonValue: String
    }
};
</script>

<style lang="scss">
.json-string {
    color: #42b983;
}
</style>
