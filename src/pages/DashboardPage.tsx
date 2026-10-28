import type { Book } from "../types/book";
import { useState } from "react";
import { BookForm } from "../components/BookForm";
import { BookCard } from "../components/BookCard";

type DashboardPageProps = {
  books: Book[];
  allBooks: Book[];
  onAddBook: (book: Book) => void;
  onDeleteBook: (id: string) => void;
  onUpdateBook: (book: Book) => void;
};

export function DashboardPage({ books, allBooks, onAddBook, onDeleteBook, onUpdateBook }: DashboardPageProps) {
  const finishedCount = allBooks.filter(
    (book) => book.status === "finished"
  ).length;

  const readingCount = allBooks.filter(
    (book) => book.status === "reading"
  ).length;

  const plannedCount = allBooks.filter(
    (book) => book.status === "planned"
  ).length;

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  function handleEditBook(book: Book) {
    setEditingBook(book);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingBook(null);
  }

  return (
    <section>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <p className="text-primary fw-semibold mb-1">Моя библиотека</p>
          <h1 className="mb-0">Книги</h1>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            if (isFormOpen) {
              closeForm();
            } else {
              setEditingBook(null);
              setIsFormOpen(true);
            }
          }}
        > {isFormOpen ? (editingBook ? "Отменить редактирование" : "Отменить добавление")
                      : "Добавить книгу"}
        </button>
      </div>
      {isFormOpen && (<BookForm key={editingBook?.id ?? "new"} 
                                initialBook={editingBook} 
                                onAddBook={onAddBook} 
                                onUpdateBook={onUpdateBook}
                                onSaved={closeForm}/>)
      }

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <article className="card h-100">
            <div className="card-body">
              <p className="text-secondary">Всего книг</p>
              <strong className="display-5">{allBooks.length}</strong>
            </div>
          </article>
        </div>
        <div className="col-12 col-md-6">
          <article className="card h-100">
            <div className="card-body">
              <p className="text-secondary">Прочитано</p>
              <strong className="display-5">{finishedCount}</strong>
            </div>
          </article>
        </div>
        <div className="col-12 col-md-6">
          <article className="card h-100">
            <div className="card-body">
              <p className="text-secondary">Читаю</p>
              <strong className="display-5">{readingCount}</strong>
            </div>
          </article>
        </div>
        <div className="col-12 col-md-6">
          <article className="card h-100">
            <div className="card-body">
              <p className="text-secondary">В планах</p>
              <strong className="display-5">{plannedCount}</strong>
            </div>
          </article>
        </div>
      </div>



      {books.length === 0 ? (
        <div className="alert alert-info mt-4">
          {allBooks.length === 0
                      ? "В библиотеке пока нет книг."
                      : "По вашему запросу ничего не найдено."
          }
        </div>
      ) : (
        <div className="row g-3 mt-3">
          {books.map((book) => (
            <div className="col-12 col-md-6 col-xl-4" key={book.id}>
              <BookCard book={book} onDeleteBook={onDeleteBook} onEditBook={handleEditBook}/>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
