import { useState, useContext } from 'react';
import BooksContext from '../context/books';

interface Props {
  onSubmit(): void;
  book: { id: number; title: string };
}

function BookEdit({ book, onSubmit }: Props) {
  const [title, setTitle] = useState(book.title);
  const { editBookById } = useContext(BooksContext);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit();
    editBookById(book.id, title);
  };

  return (
    <form onSubmit={handleSubmit} className="book-edit">
      <label>Title</label>
      <input className="input" value={title} onChange={handleChange} />
      <button className="button is-primary">Save</button>
    </form>
  );
}

export default BookEdit;
