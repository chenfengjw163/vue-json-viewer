<template>
    <span class="json-null">{{ jsonValue === null ? 'null' : 'undefined' }}</span>
</template>

<script>
export default {
    name: 'JsonNull',
    props: {
        jsonValue: Object
    }
};
</script>

<style lang="scss">
.json-null {
    color: #e08331;
}
</style>
