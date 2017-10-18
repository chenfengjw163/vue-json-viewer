<template>
    <div class="node">
        <span class="key" v-if="keyName">
            <i class="icon" v-if="isObject" :class="{'ion-arrow-down-b': toggle, 'ion-arrow-up-b': !toggle}" @click.stop="toggleNode"></i>
            {{keyName}}:
        </span>
        <commponent :is="`Json${valueType}`" :json-value="value" v-model="toggle" :key-name="keyName"></commponent>
    </div>
</template>

<script>
import JsonString from './types/json-string';
import JsonNumber from './types/json-number';
import JsonBoolean from './types/json-boolean';
import JsonObject from './types/json-object';
import JsonArray from './types/json-array';

export default {
    name: 'JsonBox',
    props: {
        value: [Object, Array, String, Number, Boolean],
        keyName: String
    },
    data() {
        return {
            toggle: true
        };
    },
    methods: {
        toggleNode() {
            this.toggle = !this.toggle;
        }
    },
    computed: {
        valueType() {
            if (Array.isArray(this.value)) {
                return 'Array';
            } else if (typeof this.value === 'object') {
                return 'Object';
            } else if (typeof this.value === 'number') {
                return 'Number';
            } else if (typeof this.value === 'string') {
                return 'String';
            } else if (typeof this.value === 'boolean') {
                return 'Boolean';
            }
        },
        isObject() {
            return this.valueType == 'Array' || this.valueType == 'Object'; // eslint-disable-line
        }
    },
    components: {
        JsonString,
        JsonNumber,
        JsonBoolean,
        JsonObject,
        JsonArray
    }
};
</script>

<style lang="scss">
.node {
    font-size: 14px;
    position: relative;
    color: #525252;
    font-family: Consolas,Menlo,Courier,monospace;

    &:after {
        content: ','
    }
    &:last-child {
        &:after {
            content: ''
        }
    }
    .icon {
        position: absolute;
        left: -12px;
        font-size: 12px;
        top: 3px;
        color: #80848f;
        cursor: pointer;
    }

    & .node {
        margin-left: 25px;
    }

}
</style>
