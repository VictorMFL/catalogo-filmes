import React from "react";

import styles from "./Header.module.css";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <p>Veja alguns dados sobre filmes, séries e animes.</p>
      <h2>
        <Link to="/catalogo-filmes/">
          Filmes
        </Link>
      </h2>
      <h2>
        <Link to="/catalogo-filmes/categorias">
          Categorias
        </Link>
      </h2>
      <form>
        <input type="text" placeholder="pesquisa" />
      </form>
    </header>
  );
};

export default Header;
