import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header
      className="w-full h-20 px-20 bg-darkGray text-white grid grid-cols-3 place-items-center items-center fixed z-50 big-tablet:px-12 tablet:px-4 tablet:w-full"
      style={{ top: "-1px" }}
    >
      <p className="font-bold font-lato big-tablet:text-sm tablet:text-extraLg">
        Veja alguns dados sobre filmes, séries e animes.
      </p>
      <Link
        to="/catalogo-filmes/"
        className="font-bold font-roboto text-3xl big-tablet:text-2xl tablet:text-base"
      >
        Filmes
      </Link>
      <Link
        to="/catalogo-filmes/categorias"
        className="font-bold font-roboto text-2xl big-tablet:text-2xl tablet:text-base"
      >
        Categorias
      </Link>
    </header>
  );
};

export default Header;
