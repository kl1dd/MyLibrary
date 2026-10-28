import { useState } from "react";
import type { ReadingStatus } from "../types/book";
import type { Book } from "../types/book";

type BookFormProps = {
  initialBook: Book | null;
  onAddBook: (book: Book) => void;
  onUpdateBook: (book: Book) => void;
  onSaved: () => void
};

export function BookForm({ initialBook, onAddBook, onUpdateBook, onSaved }: BookFormProps) {
  const [title, setTitle] = useState(initialBook?.title ?? "");
  const [author, setAuthor] = useState(initialBook?.author ?? "");
  const [genre, setGenre] = useState(initialBook?.genre ?? "");
  const [status, setStatus] = useState<ReadingStatus>(initialBook?.status ?? "planned");
  const [rating, setRating] = useState<number | null>(initialBook?.rating ?? null);
  const [note, setNote] = useState(initialBook?.note ?? "");

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !author.trim()) {
      alert("Обязательно нужно заполнить название и автора");
      return;
    }
    
    const book: Book = {
      id: initialBook?.id ?? crypto.randomUUID(),
      title: title.trim(),
      author: author.trim(),
      genre: genre.trim(),
      status,
      rating,
      note: note.trim(),
    };
    if (initialBook) {
      onUpdateBook(book);
    } else {
      onAddBook(book);
    }


    onSaved();
  }


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="book-title">Название книги</label>
      <input
        id="book-title"
        className="form-control"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <div className="mt-3">
      <label htmlFor="book-author">Автор</label>
      <input
          id="book-author"
          className="form-control"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          placeholder="Например, Михаил Булгаков"
      />
      </div>

      <div className="mt-3">
        <label htmlFor="book-genre">Жанр</label>
        <input
          id="book-genre"
          className="form-control"
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
        />
      </div>

      <div className="mt-3">
        <label htmlFor="book-status">Статус</label>
        <select
          id="book-status"
          className="form-select"
          value={status}
          onChange={(event) => setStatus(event.target.value as ReadingStatus)}
        >
          <option value="planned">В планах</option>
          <option value="reading">Читаю</option>
          <option value="finished">Прочитано</option>
        </select>
      </div>

      <div className="mt-3">
        <label htmlFor="book-rating">Оценка</label>
        <select
          id="book-rating"
          className="form-select"
          value={rating ?? ""}
          onChange={(event) => setRating(event.target.value === "" ? null : Number(event.target.value))}
        >
          <option value="">Без оценки</option>
          <option value="1">1 ★</option>
          <option value="2">2 ★★</option>
          <option value="3">3 ★★★</option>
          <option value="4">4 ★★★★</option>
          <option value="5">5 ★★★★★</option>
        </select>
      </div>

      <div className="mt-3">
        <label htmlFor="book-note">Заметка</label>
        <textarea
          id="book-note"
          className="form-control"
          rows={3}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Твои впечатления о книге..."
        />
      </div>


      <button type="submit" className="btn btn-primary mt-3">
        {initialBook ? "Сохранить изменения" : "Сохранить книгу"}
      </button>
    </form>
  );
}