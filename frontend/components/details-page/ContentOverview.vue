<template>
  <div class="d-flex flex-column justify-space-between content-overview">
    <div>
      <v-skeleton-loader
        :loading="loading"
        transition="fade-transition"
        height="60"
        width="300"
        type="text"
        dark
        class="mb-3"
        tile
      >
        <div
          :class="{
            'flex-md-row': !isLongTitle,
            'align-md-center': !isLongTitle,
            'mb-md-0': !isLongTitle
          }"
          class="d-flex flex-column"
        >
          <div
            v-if="contentTitle"
            :class="{'font-size-7': isLongTitle, 'font-size-9': !isLongTitle }"
            class="weight-500 mr-4 mb-2"
          >
            {{ contentTitle }}
          </div>
          <div v-if="contentAuthors" class="font-size-4">
            by {{ contentAuthors.join(', ') }}
          </div>
        </div>
      </v-skeleton-loader>
      <v-skeleton-loader
        :loading="loading"
        transition="fade-transition"
        height="18"
        width="350"
        type="text"
        dark
        class="mb-8"
        tile
      >
        <div>
          <div v-if="contentSubtitle" class="font-size-3">
            {{ contentSubtitle }}
          </div>
        </div>
      </v-skeleton-loader>
      <v-skeleton-loader
        :loading="loading"
        transition="fade-transition"
        height="18"
        width="350"
        type="text"
        dark
        class="mb-8"
        tile
      >
        <div class="font-size-4 normal-line-height">
          <span v-if="contentCategory">{{ contentCategory }}</span>
          <span v-if="publishedYear">
            <span class="px-3">|</span>{{ publishedYear }}
          </span>
          <span v-if="pages">
            <span class="px-3">|</span>{{ pages }} pages
          </span>
        </div>
      </v-skeleton-loader>

      <v-skeleton-loader
        :loading="loading"
        transition="fade-transition"
        height="66"
        type="paragraph"
        dark
        class="mb-11 description"
        tile
      >
        <div class="font-size-4 description-box">
          <span v-if="contentDescription">
            {{ contentDescription }}
          </span>
        </div>
      </v-skeleton-loader>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentOverview',
  props: {
    content: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean
    }
  },
  computed: {
    contentTitle() {
      return `${this.content?.title}` || null;
    },
    contentSubtitle() {
      return this.content?.subtitle || null;
    },
    contentAuthors() {
      return this.content?.authors || [];
    },
    contentDescription() {
      return this.content?.description || null;
    },
    contentCategory() {
      return this.content?.categories || null;
    },
    publishedYear() {
      return this.content?.published_year || null;
    },
    pages() {
      return this.content?.num_pages || null;
    },
    isLongTitle() {
      return this.contentTitle ? this.contentTitle.length > 28 : false;
    }
  }
};
</script>

<style scoped lang="scss">
.content-overview {
  color: var(--color-brand-dark-4);
}
.description {
  max-width: 750px;
  @media screen and (max-width: 991px) {
    max-width: 100%;
  }
  .description-box {
    max-height: 180px;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 15px;
    @media screen and (max-width: 991px) {
      max-height: 250px;
    }
  }
}
</style>
