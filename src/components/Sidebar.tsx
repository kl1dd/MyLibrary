type Page = "books" | "rated";
type SidebarProps = {
  page: Page;
  setPage: (page: Page) => void;
};

export function Sidebar({page, setPage}: SidebarProps) {
  const booksClass = page === "books"
                     ? "d-block w-100 text-start border-0 rounded px-3 py-2 mb-2 bg-primary text-white"
                     : "d-block w-100 text-start border-0 rounded px-3 py-2 mb-2 bg-transparent text-white-50";

  const ratedClass = page === "rated"
                     ? "d-block w-100 text-start border-0 rounded px-3 py-2 mb-2 bg-primary text-white"
                     : "d-block w-100 text-start border-0 rounded px-3 py-2 mb-2 bg-transparent text-white-50";
      
  return (
    <aside className="mylibrary-sidebar p-3">
      <nav aria-label="Основная навигация">
        <button
          type="button"
          className={booksClass}
          onClick={() => setPage("books")}
        > Все книги
        </button>

        <button
          type="button"
          className={ratedClass}
          onClick={() => setPage("rated")}
        > Оценённые книги
        </button>
      </nav>
    </aside>
  );
}
