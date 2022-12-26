import { createContext, useState } from 'react';
import axios from 'axios';

interface Props {
  children: React.ReactNode;
}

interface BooksContextValue {
  books: Array<{
    id: number;
    title: string;
  }>;
  fetchBooks(): void;
  editBookById(id: number, title: string): void;
  createBook(title: string): void;
  deleteBookById(id: number): void;
}

const BooksContext = createContext<BooksContextValue>({
  books: [],
  fetchBooks() {},
  editBookById() {},
  createBook() {},
  deleteBookById() {},
});

function Provider({ children }: Props) {
  const [books, setBooks] = useState<Array<{ id: number; title: string }>>([]);

  const fetchBooks = async () => {
    const response = await axios.get(
      'https://cn4xnc-3001.preview.csb.app/books'
    );

    setBooks(response.data);
  };

  const editBookById = async (id: number, newTitle: string) => {
    const response = await axios.put(
      `https://cn4xnc-3001.preview.csb.app/books/${id}`,
      {
        title: newTitle,
      }
    );

    const updatedBooks = books.map((book: { id: number; title: string }) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }

      return book;
    });

    setBooks(updatedBooks);
  };

  const createBook = async (title: string): Promise<void> => {
    const response = await axios.post(
      'https://cn4xnc-3001.preview.csb.app/books',
      {
        title,
      }
    );

    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };

  const deleteBookById = async (id: number) => {
    await axios.delete(`https://cn4xnc-3001.preview.csb.app/books/${id}`);

    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  const valueToShare = {
    books,
    deleteBookById,
    editBookById,
    createBook,
    fetchBooks,
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}

export { Provider };
export default BooksContext;