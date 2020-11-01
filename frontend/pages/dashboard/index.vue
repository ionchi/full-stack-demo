<template>
  <div>
    <div class="d-flex justify-center search-input-box">
      <search-input
        :loading="loading"
        :searching="searching"
        class="search-input"
        @search="searchBooks"
      />
    </div>
    <div>
      <template v-if="loading || (!loading && books.length > 0)">
        <books-grid
          :contents="books"
          :loading="loading"
        />
      </template>
      <template v-else>
        <div>
          No contents <span v-if="searchString">for '{{ searchString }}'</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import { bookApiService } from '@/_services';
import SearchInput from '@/components/dashboard-page/SearchInput';
import BooksGrid from '@/components/shared/BooksGrid';
export default {
  name: 'Index',
  components: {
    BooksGrid,
    SearchInput
  },
  data() {
    return {
      loading: false,
      loadingMore: false,
      searching: false,
      searchString: null,
      books: [],
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
      this.books = [
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
      this.books = await this.getContent();
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
        offset: this.offset,
        sortProperty: 'ratings_count',
        order: 'desc'
      };
      if (this.searchString) {
        query.search = this.searchString;
      }
      const { docs, hasNextPage, hasPrevPage, totalDocs } =
        await bookApiService.getAllBooks(query);
      this.pagination = {
        hasNextPage, hasPrevPage, totalDocs
      };
      return docs || [];
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
    searchBooks(query) {
      this.searching = true;
      this.offset = 0;
      this.searchContent(query);
    },
    searchContent: debounce(async function(query) {
      this.searchString = query ? query.toLowerCase() : '';
      this.books = await this.getContent();
      this.searching = false;
    }, 200),
    async loadMore() {
      try {
        if (this.pagination.hasNextPage) {
          this.offset += this.limit;
          this.loadingMore = true;
          const moreBooks = await this.getContent();
          this.books = [...this.books, ...moreBooks];
        }
      } catch (e) {
        this.$toast.global.api_error();
      } finally {
        this.loadingMore = false;
      }
    }
  },
  head() {
    return {
      title: 'Dashboard'
    };
  }
};
</script>

<style scoped lang="scss">
.search-input-box {
  margin-bottom: 70px;
  .search-input {
    width: 500px;
  }
}
</style>
