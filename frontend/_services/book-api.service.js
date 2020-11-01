import axios from 'axios';
import { authHeader, globalErrorHandler } from '~/_helpers';

const BOOK_API = process.env.API_URL;

const getAllBooks = async (query) => {
  try {
    const { data } = await axios
      .get(`${BOOK_API}/api/book`, {
        headers: authHeader(),
        params: query
      });
    return data?.data;
  } catch (e) {
    globalErrorHandler(e);
  }
};

const getBookById = async (bookId) => {
  try {
    const { data } = await axios
      .get(`${BOOK_API}/api/book/${bookId}`, {
        headers: authHeader()
      });
    return data?.data;
  } catch (e) {
    globalErrorHandler(e);
  }
};

const getAllLibraryBooks = async (query) => {
  try {
    const { data } = await axios
      .get(`${BOOK_API}/api/library`, {
        headers: authHeader(),
        params: query
      });
    return data?.data;
  } catch (e) {
    globalErrorHandler(e);
  }
};

const getLibraryBookById = async (libraryBookId) => {
  try {
    const { data } = await axios
      .get(`${BOOK_API}/api/library/${libraryBookId}`, {
        headers: authHeader()
      });
    return data?.data;
  } catch (e) {
    globalErrorHandler(e);
  }
};

const getLibraryBookByBookId = async (bookId) => {
  try {
    const { data } = await axios
      .get(`${BOOK_API}/api/library/book/${bookId}`, {
        headers: authHeader()
      });
    return data?.data;
  } catch (e) {
    globalErrorHandler(e);
  }
};

const addBookToLibrary = async ({ bookTitle, notes = '', bookId }) => {
  try {
    const { data } = await axios
      .post(`${BOOK_API}/api/library`, {
        book: bookId,
        bookTitle,
        notes
      }, {
        headers: authHeader()
      });
    return data?.data;
  } catch (e) {
    globalErrorHandler(e);
  }
};

const removeBookFromLibrary = async (libraryBookId) => {
  try {
    const { data } = await axios
      .delete(`${BOOK_API}/api/library/${libraryBookId}`, {
        headers: authHeader()
      });
    return data?.data || data;
  } catch (e) {
    globalErrorHandler(e);
  }
};

const editLibraryBook = async (libraryBookId, updateData) => {
  try {
    const { data } = await axios
      .put(`${BOOK_API}/api/library/${libraryBookId}`, updateData, {
        headers: authHeader()
      });
    return data?.data;
  } catch (e) {
    globalErrorHandler(e);
  }
};

export default {
  getAllBooks,
  getBookById,
  getAllLibraryBooks,
  getLibraryBookById,
  addBookToLibrary,
  removeBookFromLibrary,
  editLibraryBook,
  getLibraryBookByBookId
};
