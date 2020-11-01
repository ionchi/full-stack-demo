<template>
  <div>
    <div class="page-title">
      My Library
    </div>
    <div>
      <template v-if="loading || (!loading && libraryBooks.length > 0)">
        <books-grid
          :contents="libraryBooks"
          :loading="loading"
        />
      </template>
      <template v-else>
        <div class="mb-5">
          No contents. Search some and add it to the library.
        </div>
        <div>
          <v-btn
            class="px-10 light-grey-btn"
            height="50"
            dark
            outlined
            tile
            @click="toDashboard"
          >
            Search
          </v-btn>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import { bookApiService } from '@/_services';
import BooksGrid from '@/components/shared/BooksGrid';

export default {
  name: 'Library',
  components: { BooksGrid },
  data() {
    return {
      loading: false,
      loadingMore: false,
      libraryBooks: [],
      offset: 0,
      limit: 12,
      pagination: {
        hasNextPage: true,
        hasPrevPage: false,
        totalDocs: 0
      }
    };
  },
  async mounted() {
    try {
      const handleDebouncedScroll = debounce(this.handleScroll, 100);
      window.addEventListener('scroll', handleDebouncedScroll);
      this.loading = true;
      this.libraryBooks = [
        {
          id: 1,
          title: 'Title 1',
          thumbnail: '/img/book-placeholder.jpg'
        },
        {
          id: 2,
          title: 'Title 2',
          thumbnail: '/img/book-placeholder.jpg'
        },
        {
          id: 3,
          title: 'Title 3',
          thumbnail: '/img/book-placeholder.jpg'
        }
      ];
      this.libraryBooks = await this.getContent();
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async getContent() {
      const query = {
        limit: this.limit,
        offset: this.offset
      };
      const { docs, hasNextPage, hasPrevPage, totalDocs } =
        await bookApiService.getAllLibraryBooks(query);
      this.pagination = {
        hasNextPage, hasPrevPage, totalDocs
      };
      return docs.map(el => el.book) || [];
    },
    async handleScroll() {
      const body = document.body;
      const html = document.documentElement;
      const documentHeight = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
      const distanceFromBottom = 100;
      const bottom = (html.scrollTop + window.innerHeight + distanceFromBottom) >= documentHeight;
      if (bottom && !this.loadingMore) {
        await this.loadMore();
      }
    },
    async loadMore() {
      try {
        if (this.pagination.hasNextPage) {
          this.loadingMore = true;
          this.offset += this.limit;
          const moreBooks = await this.getContent();
          this.books = [...this.books, ...moreBooks];
        }
      } catch (e) {
        this.$toast.global.api_error();
      } finally {
        this.loadingMore = false;
      }
    },
    toDashboard() {
      this.$nuxt.$router.push({
        path: '/dashboard'
      });
    }
  },
  head() {
    return {
      title: 'Library'
    };
  }
};
</script>

<style scoped lang="scss">
.page-title {
  margin-bottom: 70px;
}
</style>
