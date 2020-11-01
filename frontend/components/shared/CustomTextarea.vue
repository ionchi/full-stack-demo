<template>
  <div>
    <v-textarea
      v-model="text"
      :hint="wordsCount+'/'+limit+' words'"
      :placeholder="placeholder"
      :rows="rows"
      :readonly="loading"
      class="custom-textarea font-size-3"
      filled
      solo
      flat
      dark
      no-resize
      row-height="20"
      persistent-hint
      @paste="onPaste"
      @keydown.enter="addSpace"
      @input="$emit('updateText', text)"
      @keypress="canType($event)"
      @blur="$emit('updateNotes', text)"
    />
  </div>
</template>

<script>
export default {
  name: 'CustomTextarea',
  props: {
    defaultText: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Add text here...'
    },
    rows: {
      type: Number,
      default: () => 4
    },
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      text: this.defaultText
    };
  },
  computed: {
    wordsCount() {
      if (this.text) {
        return this.text.split(/\s+/)
          .filter(n => n !== '')
          .length;
      }
      return 0;
    }
  },
  watch: {
    defaultText(val) {
      this.text = val;
    }
  },
  methods: {
    countWords(text) {
      if (text) {
        return text.split(/\s+/)
          .filter(n => n !== '')
          .length;
      }
    },
    canType(event) {
      if (this.wordsCount >= this.limit && this.text.slice(-1) === ' ') {
        event.preventDefault();
      }
    },
    // add space on enter
    addSpace(event) {
      if (this.wordsCount >= this.limit && this.text.slice(-1) === ' ') {
        event.preventDefault();
      } else { this.text = this.text + ' '; }
    },
    onPaste(event) {
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedData = clipboardData.getData('Text');

      if (this.countWords(pastedData) > (this.limit - this.wordsCount)) {
        event.preventDefault();
        this.$toast.error(`Max ${this.limit} words.`, {
          duration: 3000,
          keepOnHover: true,
          action: {
            icon: 'close',
            onClick: (e, toastObject) => {
              toastObject.goAway(200);
            }
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.custom-textarea {
  overflow-y: auto;
  border-radius: 0 !important;

  ::v-deep .v-text-field__details {
    padding: 0 4px;
  }

  ::v-deep .v-messages__wrapper {
    float: right;
    opacity: 0.3;
  }

  ::v-deep .v-input__control .v-input__slot {
    background: rgba(20, 255, 236, 0) !important;
    background-blend-mode: overlay !important;
    mix-blend-mode: normal !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    box-sizing: border-box !important;
    transition: box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;
    padding: 10px 5px;
  }

  ::v-deep .v-input__control .v-input__slot:hover {
    background: rgba(20, 255, 236, 0.1) !important;
    background-blend-mode: overlay !important;
    mix-blend-mode: normal !important;
    border: 1px solid rgba(255, 255, 255, 0.5) !important;
    box-sizing: border-box !important;
  }

  ::v-deep .v-input__control .v-input__slot textarea {
    color: #fff;
    margin: 10px 0;
  }

  ::v-deep .v-input__control .v-input__slot textarea:focus-within {
    color: #fff;
  }

  ::v-deep .v-input__control .v-input__slot:focus-within {
    /*background-color: transparent !important;*/
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.5) inset !important;
    background: rgba(20, 255, 236, 0.1) !important;
  }

  ::v-deep .v-text-field__slot textarea::placeholder {
    opacity: 1;
  }

  /* ::scroolbars */
  ::v-deep textarea::-webkit-scrollbar {
    width: 8px;
  }
  ::v-deep textarea::-webkit-scrollbar-track {
    background: transparent;
    border: 2px solid transparent;
    border-radius: 15px;
    background-clip: content-box;
  }
  ::v-deep textarea::-webkit-scrollbar-thumb {
    background: rgba(216, 216, 216, 0.5);
    mix-blend-mode: normal;
    border-radius: 3px;
  }
}
</style>
