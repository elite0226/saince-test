// src/services/BookService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const BookService = {
  async getBooks(query) {
    try {
      const response = await axios.get(`${API_URL}/books`, {
        params: { searchTerm: query },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },

  async addBook(book) {
    try {
      const response = await axios.post(`${API_URL}/books`, book);
      return response.data;
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  },

  async updateBook(id, book) {
    try {
      const response = await axios.put(`${API_URL}/books/${id}`, book);
      return response.data;
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  },

  async deleteBook(id) {
    try {
      await axios.delete(`${API_URL}/books/${id}`);
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  },
};
