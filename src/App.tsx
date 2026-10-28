import { AppLayout } from "./components/AppLayout";
import { DashboardPage } from "./pages/DashboardPage";
import type { Book } from "./types/book";
import { useState } from "react";
import type { ReadingStatus } from "./types/book";
import { useLocalStorage } from "./hooks/useLocalStorage";

export function App() {
  const [page, setPage] = useState<"books" | "rated">("books");
  const [bookList, setBookList] = useLocalStorage<Book[]>("mylibrary-books", []);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ReadingStatus>("all");
  const [genreFilter, setGenreFilter] = useState("all");
  
  const genres = [...new Set(
      bookList.map((book) => book.genre.trim())
      )].filter((genre) => genre !== "");

  function addBook(newBook: Book) {
    setBookList((previousBooks) => [...previousBooks, newBook]);
  }

  function deleteBook(id: string) {
    setBookList((previousBooks) =>
      previousBooks.filter((book) => book.id !== id)
    );
  }

  function updateBook(updatedBook: Book) {
    setBookList((previousBooks) =>
      previousBooks.map((book) =>
        book.id === updatedBook.id ? updatedBook : book
      )
    );
  }

  const visibleBooks = bookList.filter((book) => {
    const matchesPage = page === "books" || book.rating !== null;

    const normalizedSearch = search.trim().toLowerCase();
    const matchesSearch =
      book.title.toLowerCase().includes(normalizedSearch) ||
      book.author.toLowerCase().includes(normalizedSearch);

    const matchesStatus =
      statusFilter === "all" || book.status === statusFilter;

    const matchesGenre =
      genreFilter === "all" || book.genre === genreFilter;

    return matchesPage && matchesSearch && matchesStatus && matchesGenre;
  });
  

  return (
    <AppLayout page = {page} setPage={setPage}>
      <input
        type="search"
        className="form-control mb-4"
        placeholder="Поиск по названию или автору..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <select
        className="form-select mb-4"
        value={statusFilter}
        onChange={(event) =>
          setStatusFilter(event.target.value as "all" | ReadingStatus)
        }
      >
        <option value="all">Все статусы</option>
        <option value="planned">В планах</option>
        <option value="reading">Читаю</option>
        <option value="finished">Прочитано</option>
      </select>

      <select
        className="form-select mb-4"
        value={genreFilter}
        onChange={(event) => setGenreFilter(event.target.value)}
      >
        <option value="all">Все жанры</option>

        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      
      <DashboardPage books={visibleBooks} allBooks={bookList} onAddBook={addBook} onDeleteBook={deleteBook} onUpdateBook={updateBook}/>
    </AppLayout>
  );
}
