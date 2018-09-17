<template>
    <div class="json-viewer">
        <div class="tooltip">
            <j-icon v-if="showBigger" type="qr-scanner" @click="bigger"></j-icon>
            <j-icon v-if="copied" class="copied" type="checkmark"></j-icon>
            <j-icon v-if="showCopy && !copied" class="copy" type="clipboard" @click="clip"></j-icon>
        </div>
        <div class="code-box" :class="{'more': moreCode}">
            <json-box :value="value" :key-name="keyName" :sort-keys="sortKeys"></json-box>
        </div>
        <div class="more-code" @click="toggleMoreCode">
            <j-icon :type="moreCode ? 'ios-arrow-up' : 'ios-arrow-down'"></j-icon>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import JIcon from './json-icon'
import JsonBox from './json-box';
import Clipboard from 'clipboard';

Vue.component(JsonBox.name, JsonBox);

export default {
    name: 'JsonViewer',
    props: {
        value: [Object, Array, String, Number, Boolean],
        keyName: String,
        showCopy: {
            type: Boolean,
            default: true
        },
        showBigger: {
            type: Boolean,
            default: false
        },
        iconPrefix: {
            type: String,
            default: ''
        },
        sortKeys: {
            type: Boolean,
            default: true
        }
    },
    provide() {
        return {
            iconPrefix: this.iconPrefix || 'ion'
        }
    },
    data() {
        return {
            copied: false,
            biggerModal: false,
            moreCode: false
        };
    },
    methods: {
        clip() {
            const clipBoard = new Clipboard('.copy', {
                text: () => {
                    return JSON.stringify(this.value, null, 2);
                }
            });

            clipBoard.on('success', () => {
                this.copied = true;
                setTimeout(() => {
                    this.copied = false;
                }, 2000);
                this.$emit('copied');
                clipBoard.destroy();
            });
        },
        bigger() {
            this.biggerModal = true;
        },
        toggleMoreCode() {
            this.moreCode = !this.moreCode;
        }
    },
    components: {
        JsonBox,
        JIcon
    }
};
</script>

<style lang="scss">
.json-viewer {
    box-sizing: border-box;
    border: 1px solid #eee;
    border-radius: 6px;
    position: relative;

    &:hover {
        box-shadow:0 2px 7px rgba(0,0,0,.15);border-color:transparent;position:relative
    }
    .code-box {
        max-height: 300px;
        overflow: hidden;
        padding: 20px;

        &.more {
            max-height: initial;
            overflow: visible;
            overflow-x: auto;
            margin-bottom: 15px;
        }
    }

    .more-code {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        cursor: pointer;

        .j-icon {
            position: relative;
            z-index: 2;
        }

        &:after {
            content: "";
            width: 100%;
            height: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 1;
            box-shadow: inset 0 -15px 30px #fff;
        }
    }

    .tooltip {
        position: absolute;
        right: 12px;
        top: 5px;
        color: #b2b2b2;
        cursor: pointer;

        .copied {
            color: #19be6b;
        }

        .j-icon {
            margin-left: 5px;
            font-size: 18px;
        }
    }

    .j-icon {
        font-size: 12px;
    }
}
</style>
