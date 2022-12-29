import { createContext, useCallback, useState } from 'react';
import axios from 'axios';

interface Props {
  children: React.ReactNode;
}

interface BooksContextValue {
  books: Array<{
    id: number;
    title: string;
  }>;
  stableFetchBooks(): void;
  editBookById(id: number, title: string): void;
  createBook(title: string): void;
  deleteBookById(id: number): void;
}

const BooksContext = createContext<BooksContextValue>({
  books: [],
  stableFetchBooks() {},
  editBookById() {},
  createBook() {},
  deleteBookById() {},
});

function Provider({ children }: Props) {
  const [books, setBooks] = useState<Array<{ id: number; title: string }>>([]);

  const fetchBooks = async () => {
    const response = await axios.get('http://localhost:3001/books');

    setBooks(response.data);
  };

  const stableFetchBooks = useCallback(fetchBooks, []);

  const editBookById = async (id: number, newTitle: string) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });

    const updatedBooks = books.map((book: { id: number; title: string }) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }

      return book;
    });

    setBooks(updatedBooks);
  };

  const createBook = async (title: string): Promise<void> => {
    const response = await axios.post('http://localhost:3001/books', {
      title,
    });

    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };

  const deleteBookById = async (id: number) => {
    await axios.delete(`http://localhost:3001/books/${id}`);

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
    stableFetchBooks,
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}

export { Provider };
export default BooksContext;
