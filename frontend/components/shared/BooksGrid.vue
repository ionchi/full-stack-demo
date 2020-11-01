<template>
  <div id="grid-container">
    <div
      v-for="(row, index) in contentContainer"
      :key="index"
      :class="{
        'justify-md-space-between': row.length === contentContainerSize,
        'justify-md-start': row.length < contentContainerSize
      }"
      class="d-flex justify-space-between mb-10"
    >
      <template v-for="content in row">
        <book-card
          :key="content.id"
          :content="content"
          :loading="loading"
          :slide-style="cardStyle"
          :class="{
            'mr-6': row.length < contentContainerSize
          }"
        />
      </template>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import chunk from 'lodash/chunk';
import BookCard from '@/components/shared/BookCard';

export default {
  name: 'BooksGrid',
  components: {
    BookCard
  },
  props: {
    loading: {
      type: Boolean
    },
    contents: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      expandEnable: false,
      contentContainerSize: 6,
      contentContainer: [],
      cardStyle: {
        width: '160px',
        height: '256px'
      }
      // contents: [
      //   {
      //     id: 1,
      //     title: 'Title 1',
      //     cover: '/img/book-placeholder.jpg'
      //   },
      //   {
      //     id: 2,
      //     title: 'Title 2',
      //     cover: '/img/book-placeholder.jpg'
      //   },
      //   {
      //     id: 3,
      //     title: 'Title 3',
      //     cover: '/img/book-placeholder.jpg'
      //   },
      //   {
      //     id: 4,
      //     title: 'Title 4',
      //     cover: '/img/book-placeholder.jpg'
      //   },
      //   {
      //     id: 5,
      //     title: 'Title 5',
      //     cover: '/img/book-placeholder.jpg'
      //   },
      //   {
      //     id: 6,
      //     title: 'Title 6',
      //     cover: '/img/book-placeholder.jpg'
      //   }
      // ]
    };
  },
  watch: {
    contents() {
      this.resetContentContainer();
    }
  },
  mounted() {
    window.addEventListener('resize', debounce(this.resetContentContainer, 150));
    this.resetContentContainer();
  },
  methods: {
    resetContentContainer() {
      if (window.matchMedia('(max-width: 768px)').matches) {
        this.contentContainerSize = 2;
        this.expandEnable = false;
      } else if (window.matchMedia('(max-width:992px)').matches) {
        this.contentContainerSize = 3;
        this.expandEnable = false;
      } else if (window.matchMedia('(max-width:1700px)').matches) {
        this.expandEnable = true;
        this.contentContainerSize = 5;
      } else {
        this.expandEnable = true;
        this.contentContainerSize = 6;
      }
      const containerEl = document.getElementById('grid-container');
      if (containerEl?.clientWidth > 0) {
        if (!window.matchMedia('(max-width:992px)').matches) {
          const pagePadding = 60;
          const cardMinMargin = 15;
          const cardRatio = 1.6;
          const titleHeight = 44;
          const cardWidth = ((containerEl.clientWidth - 2 * pagePadding) / this.contentContainerSize) - cardMinMargin;
          const cardHeight = (cardWidth * cardRatio) + titleHeight;
          this.cardStyle = {
            width: `${cardWidth}px`,
            height: `${cardHeight}px`
          };
        } else {
          const pagePadding = 20;
          const cardMinMargin = 10;
          const cardRatio = 1.6;
          const titleHeight = 44;
          const cardWidth = ((containerEl.clientWidth - 2 * pagePadding) / this.contentContainerSize) - cardMinMargin;
          const cardHeight = (cardWidth * cardRatio) + titleHeight;
          this.cardStyle = {
            width: `${cardWidth}px`,
            height: `${cardHeight}px`
          };
        }
      }
      this.contentContainer = chunk(this.contents, this.contentContainerSize);
    }
  }
};
</script>

<style scoped>

</style>
