<template>
    <div class="node">
        <span class="key" v-if="keyName">
            <j-icon v-if="isObject" :type="value ? 'arrow-down-b' : 'arrow-up-b'" @click.stop="toggleNode"></j-icon>
            {{keyName}}:
        </span>
        <commponent :is="`Json${valueType}`" :json-value="value" v-model="toggle" :key-name="keyName"></commponent>
    </div>
</template>

<script>
import JIcon from './json-icon'
import JsonString from './types/json-string';
import JsonNumber from './types/json-number';
import JsonBoolean from './types/json-boolean';
import JsonObject from './types/json-object';
import JsonArray from './types/json-array';
import JsonFunction from './types/json-function';

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
            } else if (typeof this.value === 'function') {
                return 'Function';
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
        JsonArray,
        JIcon
    }
};
</script>

<style lang="scss">
.node {
    font-size: 14px;
    position: relative;
    color: #525252;
    font-family: Consolas,Menlo,Courier,monospace;
    white-space: nowrap;

    &:after {
        content: ','
    }
    &:last-of-type {
        &:after {
            content: ''
        }
    }
    .j-icon {
        position: absolute;
        left: -12px;
        top: 3px;
        color: #80848f;
        cursor: pointer;
    }

    & .node {
        margin-left: 25px;
    }

}
</style>
