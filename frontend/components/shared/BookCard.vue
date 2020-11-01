<template>
  <div :style="{...slideStyle}">
    <v-skeleton-loader
      :loading="loading"
      transition="fade-transition"
      height="342"
      min-height="342"
      width="214"
      type="image"
      dark
      tile
      class="mb-4"
    >
      <div>
        <v-img
          :src="bookCover"
          lazy-src="/img/book-placeholder.jpg"
          class="cover clickable elevation-4"
          aspect-ratio="0.625"
          :width="slideStyle.width"
          @click="toBookPage"
          @error="errorCover = true"
        />
      </div>
    </v-skeleton-loader>
    <v-skeleton-loader
      :loading="loading"
      transition="fade-transition"
      height="24"
      width="50"
      type="text"
      dark
      tile
    >
      <div>
        <div v-if="bookTitle" :title="content.title.length > 28 ? content.title : null" class="font-size-4">
          {{ bookTitle }}
        </div>
      </div>
    </v-skeleton-loader>
  </div>
</template>

<script>
export default {
  name: 'BookCard',
  props: {
    content: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean
    },
    slideStyle: {
      type: Object,
      default: () => {
        return {
          width: '314px',
          height: '150px'
        };
      }
    }
  },
  data() {
    return {
      errorCover: false
    };
  },
  computed: {
    bookCover() {
      if (this.errorCover) {
        return '/img/book-placeholder.jpg';
      }
      return this.content?.thumbnail || '/img/book-placeholder.jpg';
    },
    bookTitle() {
      return this.content?.title ? this.shortenText(this.content.title, 28) : null;
    }
  },
  methods: {
    toBookPage() {
      if (this.content?._id) {
        this.$nuxt.$router.push({
          path: `/dashboard/details/${this.content._id}`
        });
      }
    },
    shortenText(text, maxLength, separator = ' ') {
      const shorten = `${text}`;
      if (shorten.length <= maxLength) { return shorten; }
      return shorten.substr(0, shorten.lastIndexOf(separator, maxLength)) + '...';
    }
  }
};
</script>

<style scoped lang="scss">
.cover {
  transform-origin: center center;
  transform: scale(0.999999);
  transition: transform .2s linear;
  &:hover {
    transition: transform .2s linear;
    transform: scale(1.04);
  }
}
</style>
