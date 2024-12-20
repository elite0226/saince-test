<template>
  <div class="modal" @click.self="close">
    <div class="modal-content">
      <h3>{{ book.id ? 'Edit Book' : 'Add New Book' }}</h3>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="title">Title</label>
          <input id="title" type="text" v-model="bookCopy.title" placeholder="Title" required />
        </div>
        <div class="form-group">
          <label for="author">Author</label>
          <input id="author" type="text" v-model="bookCopy.author" placeholder="Author" required />
        </div>
        <div class="form-group">
          <label for="releasedDate">Released Date</label>
          <input id="releasedDate" type="date" v-model="bookCopy.releasedDate" required />
        </div>

        <div class="button-group">
          <button class="btn btn-submit" type="submit">{{ book.id ? 'Save Changes' : 'Add Book' }}</button>
          <button class="btn btn-cancel" @click="closeModal">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';

export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'save'],
  
  setup(props, { emit }) {
    const bookCopy = { ...props.book };

    if (props.book.releasedDate) {
      bookCopy.releasedDate = new Date(props.book.releasedDate).toISOString().slice(0, 10);
    }

    const submitForm = () => {
      emit('save', bookCopy);
    };

    const close = () => {
      emit('close');
    };

    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    onMounted(() => {
      window.addEventListener('keydown', handleKeydown);
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeydown);
    });

    return {
      bookCopy,
      submitForm,
      close
    };
  }
};
</script>
