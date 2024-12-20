<template>
  <div class="book-list container">
    <h2>Book List</h2>
    <div class="search-wrapper">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by title"
        @input="fetchBooks"
        class="search-input"
      />
      <button @click="openAddForm" class="btn-add">Add Book</button>
    </div>

    <ul class="book-items">
      <li v-for="book in books" :key="book.id" class="book-item">
        <span>
          <em>{{ book.title }}</em> by <strong>{{ book.author }}</strong> on {{ new Date(book.releasedDate).toISOString().slice(0, 10) }}
        </span>
        <div>
          <button @click="openEditForm(book)" class="btn-edit">Edit</button>
          <button @click="confirmDelete(book.id)" class="btn-delete">Delete</button>
        </div>
      </li>
    </ul>

    <AddEditBookModal
      v-if="isModalVisible"
      :book="currentBook"
      @close="closeModal"
      @save="saveBook"
    />
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { BookService } from '../services/BookService';
import AddEditBookModal from './AddEditBookModal.vue';
import { debounce } from '../utils/debounce';

export default {
  components: {
    AddEditBookModal
  },

  setup() {
    const books = ref([]);
    const searchQuery = ref('');
    const isModalVisible = ref(false);
    const currentBook = ref(null);

    const fetchBooks = debounce(async () => {
      try {
        books.value = await BookService.getBooks(searchQuery.value);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    }, 500);

    const openAddForm = () => {
      currentBook.value = { title: '', author: '', releasedDate: '' };
      isModalVisible.value = true;
    };

    const openEditForm = (book) => {
      currentBook.value = { ...book };
      isModalVisible.value = true;
    };

    const saveBook = async (book) => {
      try {
        if (book.id) {
          await BookService.updateBook(book.id, book);
        } else {
          await BookService.addBook(book);
        }
        await fetchBooks();
        closeModal();
      } catch (error) {
        console.error('Failed to save book:', error);
      }
    };

    const confirmDelete = (id) => {
      if (window.confirm('Are you sure you want to delete this book?')) {
        deleteBook(id);
      }
    };

    const deleteBook = async (id) => {
      try {
        await BookService.deleteBook(id);
        await fetchBooks();
      } catch (error) {
        console.error('Failed to delete book:', error);
      }
    };

    const closeModal = () => {
      isModalVisible.value = false;
    };

    watch(searchQuery, fetchBooks);

    onMounted(fetchBooks);

    return {
      books,
      searchQuery,
      isModalVisible,
      currentBook,
      fetchBooks,
      openAddForm,
      openEditForm,
      saveBook,
      confirmDelete,
      closeModal
    };
  }
};
</script>