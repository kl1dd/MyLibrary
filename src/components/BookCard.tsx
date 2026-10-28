import type { Book } from "../types/book";

type BookCardProps = {
  book: Book;
  onDeleteBook: (id: string) => void;
  onEditBook: (book: Book) => void;
};

export function BookCard({ book, onDeleteBook, onEditBook }: BookCardProps) {
  const statusLabels = {
    planned: "В планах",
    reading: "Читаю",
    finished: "Прочитано",
  };

  return (
    <article className="card h-100">
      <div className="card-body">
        <h3 className="h5">{book.title}</h3>
        <p className="text-secondary mb-2">{book.author}</p>
        <p className="mb-2">Жанр: {book.genre}</p>
        <p className="mb-0">Статус: {statusLabels[book.status]}</p>
        {book.rating !== null && (
          <p className="mt-2 mb-1">
            Оценка: {"★".repeat(book.rating)}
          </p>
        )}
        {book.note && (
          <p className="text-secondary mt-2 mb-0">
            {book.note}
          </p>
        )}
        <button
          type="button"
          className="btn btn-outline-danger btn-sm mt-3"
          onClick={() => onDeleteBook(book.id)}
        > Удалить книгу
        </button>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm mt-3 me-2"
          onClick={() => onEditBook(book)}
        > Редактировать
        </button>
      </div>
    </article>
  );
}
