import {Outlet} from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <header className="py-2 bg-visual-studio-bg w-full min-w-[320px] px-1.5 2xl:px-0 ">
        <Header/>
      </header>
      <main
        className="flex-grow flex flex-col w-full max-w-screen-2xl min-w-[320px] pt-4 pb-12 mx-auto px-1.5 2xl:px-0">
        <Outlet/>
      </main>
      <footer
        className="py-8 text-center text-sm relative w-full max-w-screen-2xl min-w-[320px] mx-auto px-1.5 border-t text-slate-100/70 border-dark-400 2xl:px-0">
        <button
          className="border-2 border-dark-400 rounded-full py-1.5 px-5 mb-2.5 bg-dark-800 transition-colors sm:hover:border-gray-300/40"
          onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
        >
          Scroll to top
        </button>
        <em className="block ">Made by Alexander Ormseth &copy; 2022</em>
      </footer>
    </>
  );
};

export default Layout;