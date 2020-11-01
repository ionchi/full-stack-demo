<template>
  <div>
    <v-text-field
      v-model="searchString"
      :name="Math.random()"
      :disabled="loading"
      placeholder="Search by title"
      autocomplete="new-password"
      dark
      flat
      solo
      hide-details
      background-color="#212121"
      class="search-input-field"
      @input="searchEvent"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    loading: {
      type: Boolean
    },
    searching: {
      type: Boolean
    }
  },
  data() {
    return {
      searchString: null
    };
  },
  methods: {
    searchEvent() {
      this.$emit('search', this.searchString);
    }
  }
};
</script>

<style scoped lang="scss">
.search-input-field {
  border-radius: 0 !important;
  width: 100%;

  &.v-input--is-focused ::v-deep .v-input__slot {
    border: 1px solid rgba(255, 255, 255, 1) !important;
    transition: border-color 250ms ease;
  }

  ::v-deep .v-input__slot {
    padding: 0 32px !important;
    box-sizing: border-box !important;
    border: 1px solid rgba(255, 255, 255, 0.5) !important;
    transition: border-color 250ms ease;
    mix-blend-mode: normal;

    input {
      font-size: 12px !important;
    }
  }
  ::v-deep &.error--text .v-input__slot {
    border: 1px solid rgba(113, 28, 28, 1) !important;
  }
}
</style>
