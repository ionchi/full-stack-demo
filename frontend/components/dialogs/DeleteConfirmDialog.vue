<template>
  <v-dialog
    v-model="show"
    :fullscreen="isMobile"
    width="550"
    transition="slide-y-transition"
    overlay-opacity="0.7"
    overlay-color="#000"
    dark
    content-class="no-border-radius"
    @keydown.esc="closeDialog"
    @click:outside="closeDialog"
  >
    <v-card class="delete-card-content d-flex flex-column align-center justify-center">
      <div class="font-size-5 weight-500 text-center mb-5">
        Delete confirmation
      </div>
      <div class="font-size-3 mb-5 text-center">
        You are about to remove <span class="font-italic">{{ bookTitle }}</span> from you library.
        <br />
        All added information will be definitely removed.
        <br />
        <br />
        <span class="weight-500 font-size-4">Are you sure?</span>
      </div>
      <div class="d-flex flex-column flex-md-row justify-md-space-between">
        <v-btn
          dark
          depressed
          tile
          width="231px"
          class="mb-4 mb-md-0 mr-md-3"
          @click="closeDialog"
        >
          <span class="text-none">No, keep the book</span>
        </v-btn>
        <v-btn
          :loading="loading"
          width="231px"
          dark
          tile
          depressed
          @click="confirmAction"
        >
          <v-icon left>
            mdi-delete-outline
          </v-icon>
          <span class="text-none">Yes, remove the book</span>
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DeleteConfirmDialog',
  props: {
    show: {
      type: Boolean
    },
    loading: {
      type: Boolean
    },
    bookTitle: {
      type: String,
      default: ''
    }
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog');
    },
    confirmAction() {
      this.$emit('confirmAction');
    }
  }
};
</script>

<style scoped lang="scss">
.delete-card-content {
  padding: 30px;
  background: var(--color-brand-dark-2);
  color: #FFFFFF;
  z-index: 1 !important;
  @media screen and (max-width: 992px) {
    padding: 20px;
    min-height: 100vh; /* Fallback for browsers that do not support Custom Properties */
    height: calc(100%);
  }
}
</style>
