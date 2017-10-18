<template>
    <span class="json-number">{{jsonValue}}</span>
</template>

<script>
export default {
    name: 'JsonNumber',
    props: {
        jsonValue: Number
    }
};
</script>

<style lang="scss">
.json-number {
    color: #fc1e70;
}
</style>
