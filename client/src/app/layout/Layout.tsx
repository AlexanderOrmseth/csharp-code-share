import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <header className="bg-visual-studio-bg w-full min-w-[320px] py-2 px-1.5 2xl:px-0 ">
        <Header />
      </header>
      <main className="mx-auto flex w-full min-w-[320px] max-w-screen-2xl grow flex-col px-1.5 pt-4 pb-12 2xl:px-0">
        <Outlet />
      </main>
      <footer className="border-dark-400 relative mx-auto w-full min-w-[320px] max-w-screen-2xl border-t py-8 px-1.5 text-center text-sm text-slate-100/70 2xl:px-0">
        <button
          type="button"
          aria-label="Scroll to top of page"
          className="border-dark-400 bg-dark-800 mb-2.5 rounded-full border-2 py-1.5 px-5 transition-colors sm:hover:border-gray-300/40"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Scroll to top
        </button>
        <em className="block">Made by Alexander Ormseth &copy; 2022</em>
      </footer>
    </>
  );
};

export default Layout;
