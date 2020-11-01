<template>
  <v-app>
    <div class="full-height d-flex flex-column justify-center align-center">
      <div class="d-flex justify-center align-center mb-10">
        <template v-if="error.statusCode === 404">
          <div class="code">
            404
          </div>
          <div class="message" style="padding: 10px;">
            NOT FOUND
          </div>
        </template>
        <template v-else>
          <div class="message" style="padding: 10px;">
            {{ otherError }}
          </div>
        </template>
      </div>
      <div class="text-center">
        <v-btn outlined tile to="/">
          To Home page
        </v-btn>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  }
};
</script>

<style scoped>
.code {
  border-right: 3px solid;
  font-size: 55px;
  padding: 0 10px 0 10px;
  text-align: center;
}
.message {
  font-size: 40px;
  text-align: center;
}
</style>
