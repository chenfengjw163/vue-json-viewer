<template>
    <span class="json-null">null</span>
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
