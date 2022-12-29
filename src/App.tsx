import { useEffect, useContext } from 'react';
import BookList from './components/BookList';
import BookCreate from './components/BookCreate';
import BooksContext from './context/books';

function App() {
  const { stableFetchBooks } = useContext(BooksContext);

  useEffect(() => {
    stableFetchBooks();
  }, [stableFetchBooks]);

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList />
      <BookCreate />
    </div>
  );
}

export default App;
