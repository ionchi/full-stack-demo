<template>
  <div>
    <div class="d-flex flex-column flex-md-row align-center overview-section">
      <div class="cover-box mb-5 mb-md-0">
        <v-img
          :src="coverImage"
          lazy-src="/img/book-placeholder.jpg"
          class="elevation-4"
          aspect-ratio="0.625"
          width="310"
          @error="errorCover = true"
        />
      </div>
      <div>
        <content-overview :content="book" :loading="loading" class="mb-5" />
        <transition name="fade" mode="out-in">
          <div v-if="!loading" :key="'action-btn'">
            <v-btn
              v-if="!isInLibrary"
              :loading="adding"
              width="240"
              class="px-10 light-grey-btn"
              height="50"
              dark
              outlined
              tile
              @click="addToLibrary"
            >
              Add to library
            </v-btn>
            <v-btn
              v-else
              :loading="removing"
              width="240"
              class="px-10 outlined-button"
              height="50"
              dark
              outlined
              tile
              @click="deleteDialog = true"
            >
              Remove from library
            </v-btn>
          </div>
        </transition>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="isInLibrary" :key="'notes-box'">
        <div class="font-size-3 mb-3">
          Notes
        </div>
        <custom-textarea
          :loading="updating"
          :limit="250"
          :default-text="notes"
          @updateText="notes = $event"
          @updateNotes="updateNotes"
        />
      </div>
    </transition>

    <delete-confirm-dialog
      v-if="isInLibrary"
      :show="deleteDialog"
      :loading="removing"
      :book-title="`${book ? book.title : ''}`"
      @closeDialog="deleteDialog = false"
      @confirmAction="removeFromLibrary"
    />
  </div>
</template>

<script>
import { bookApiService } from '@/_services';
import ContentOverview from '@/components/details-page/ContentOverview';
import CustomTextarea from '@/components/shared/CustomTextarea';
import DeleteConfirmDialog from '@/components/dialogs/DeleteConfirmDialog';

export default {
  name: 'BookPage',
  components: { DeleteConfirmDialog, CustomTextarea, ContentOverview },
  data() {
    return {
      loading: false,
      book: null,
      errorCover: false,
      adding: false,
      removing: false,
      updating: false,
      libraryBookId: null,
      notes: null,
      initNotes: null,
      deleteDialog: false
    };
  },
  computed: {
    coverImage() {
      if (this.errorCover) {
        return '/img/book-placeholder.jpg';
      }
      return this.book?.thumbnail || '/img/book-placeholder.jpg';
    },
    isInLibrary() {
      return !!(this.libraryBookId);
    }
  },
  async mounted() {
    try {
      this.loading = true;
      const bookId = this.$route.params.bookId;
      if (bookId) {
        this.book = await bookApiService.getBookById(bookId);
        const libraryInfo = await bookApiService.getLibraryBookByBookId(bookId);
        this.notes = libraryInfo?.notes || null;
        this.initNotes = this.notes;
        this.libraryBookId = libraryInfo?._id || null;
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async addToLibrary() {
      try {
        this.adding = true;
        const libraryBook = {
          bookId: this.book._id,
          bookTitle: `${this.book.title}`
        };
        const response = await bookApiService.addBookToLibrary(libraryBook);
        this.libraryBookId = response._id;
      } catch (e) {
        console.log(e);
      } finally {
        this.adding = false;
      }
    },
    async removeFromLibrary() {
      try {
        if (this.libraryBookId) {
          this.removing = true;
          await bookApiService.removeBookFromLibrary(this.libraryBookId);
          this.libraryBookId = null;
          this.notes = null;
          this.deleteDialog = false;
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.removing = false;
      }
    },
    async updateNotes(notes) {
      try {
        if (this.libraryBookId && notes !== this.initNotes) {
          this.updating = true;
          await bookApiService.editLibraryBook(this.libraryBookId, {
            notes
          });
          this.initNotes = notes;
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.updating = false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.cover-box {
  @media screen and (min-width: 992px) {
    margin-right: 90px;
  }
}
.overview-section {
  margin-bottom: 70px;
}
</style>
