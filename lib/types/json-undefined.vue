<template>
    <span class="jv-item jv-undefined">{{ jsonValue === null ? 'null' : 'undefined' }}</span>
</template>

<script>
export default {
    name: 'JsonUndefined',
    props: {
        jsonValue: Object
    }
};
</script>

<style lang="scss">
.json-undefined {
    color: #e08331;
}
</style>
