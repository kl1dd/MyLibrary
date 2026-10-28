import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import type { ReactNode } from "react";

type Page = "books" | "rated";
type AppLayoutProps = {
  children: ReactNode;
  page: Page;
  setPage: (page: Page) => void;
};


export function AppLayout({ children, page, setPage }: AppLayoutProps) {
  return (
    <div className="mylibrary-shell d-flex flex-column">
      <Header />
      <div className="mylibrary-layout d-flex flex-grow-1">
        <Sidebar  page={page} setPage={setPage} />
        <main className="mylibrary-main flex-grow-1 p-4">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
