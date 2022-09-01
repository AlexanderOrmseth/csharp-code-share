import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <nav className="mx-auto flex  max-w-screen-2xl items-center justify-between  ">
      <Link
        to="/"
        className="flex items-center gap-x-2 px-2 font-bold hover:text-white/90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-c-sharp h-7 select-none"
          viewBox="0 0 32 32"
        >
          <title>file_type_csharp</title>
          <path d="M19.792,7.071h2.553V9.624H24.9V7.071h2.552V9.624H30v2.552h-2.55v2.551H30V17.28H27.449v2.552H24.9v-2.55l-2.55,0,0,2.552H19.793v-2.55l-2.553,0V14.725h2.553V12.179H17.24V9.622h2.554Zm2.553,7.658H24.9V12.176H22.345Z" />
          <path d="M14.689,24.013a10.2,10.2,0,0,1-4.653.915,7.6,7.6,0,0,1-5.89-2.336A8.839,8.839,0,0,1,2,16.367,9.436,9.436,0,0,1,4.412,9.648a8.181,8.181,0,0,1,6.259-2.577,11.1,11.1,0,0,1,4.018.638v3.745a6.81,6.81,0,0,0-3.723-1.036,4.793,4.793,0,0,0-3.7,1.529,5.879,5.879,0,0,0-1.407,4.142,5.774,5.774,0,0,0,1.328,3.992,4.551,4.551,0,0,0,3.575,1.487,7.288,7.288,0,0,0,3.927-1.108Z" />
        </svg>
        <h1>CodeShare</h1>
      </Link>
      {location.pathname !== "/" && (
        <Link className="btn-primary" to="/">
          New
        </Link>
      )}
    </nav>
  );
};

export default Header;
