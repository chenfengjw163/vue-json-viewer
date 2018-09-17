<template>
  <div :class="jvClass">
    <div class="jv-tooltip" v-if="tooltip">
      <j-icon v-if="showBigger" type="qr-scanner" @click="bigger"></j-icon>
      <j-icon v-if="copied" class="copied" type="checkmark"></j-icon>
      <j-icon v-if="showCopy && !copied" class="copy" type="clipboard" @click="clip"></j-icon>
    </div>
    <div class="jv-code" :class="{'more': moreCode}">
      <json-box :value="value" :key-name="keyName" :sort="sort"></json-box>
    </div>
    <div class="jv-more" @click="toggleMoreCode">
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
      default: false
    },
    showBigger: {
      type: Boolean,
      default: false
    },
    sort: {
      type: Boolean,
      default: false
    },
    boxed: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: "jv-light"
    },
    iconPrefix: {
      type: String,
      default: ''
    },
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
  computed: {
    jvClass() {
      return 'jv-container ' + this.theme + (this.boxed ? ' boxed' : '')
    },
    tooltip() {
      return this.showBigger || this.copied || (this.showCopy && !this.copied)
    }
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
.jv-container {
  box-sizing: border-box;
  position: relative;

  &.boxed {
    border: 1px solid #eee;
    border-radius: 6px;

    &:hover {
      box-shadow: 0 2px 7px rgba(0,0,0,.15);
      border-color: transparent;
      position: relative
    }
  }

  &.jv-light {
    background: #fff;

    .jv-ellipsis {
      color: #999;
      background-color: #eee;
      display: inline-block;
      line-height: 0.9;
      font-size: 0.9em;
      padding: 0px 4px 2px 4px;
      border-radius: 3px;
      vertical-align: 2px;
      cursor: pointer;
      user-select: none;
    }
    .jv-key { color: #111111 }
    .jv-item {
      &.jv-array { color: #111111 }
      &.jv-boolean { color: #fc1e70 }
      &.jv-function { color: #067bca }
      &.jv-number { color: #fc1e70 }
      &.jv-object { color: #111111 }
      &.jv-string { color: #42b983 }
      &.jv-undefined { color: #e08331 }
    }
    .jv-toggle {
      &:before {
        padding: 0px 2px;
        border-radius: 2px;
      }
      &:hover {
        &:before {
          background: #eee;
        }
      }
    }
  }

  .jv-code {
    max-height: 300px;
    overflow: hidden;
    padding: 20px;

    .jv-toggle {
      cursor: pointer;

      &:before {
        content: "⏶";
        padding: 0px 2px;
        border-radius: 2px;
        position: absolute;
      }
      &:after {
        content: " ";
        position: relative;
        display: inline-block;
        width: 8px;
      }

      &.open {
        &:before {
          content: "⏷";
        }
      }
    }

    &.more {
      max-height: initial;
      overflow: visible;
      overflow-x: auto;
      margin-bottom: 15px;
    }
  }

  .jv-more {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    cursor: pointer;

    .jv-toggle {
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

  .jv-tooltip {
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
