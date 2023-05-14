import React from "react";
import axios from "axios";

import Header from "../Header/Header";

import { autorizacao } from "../../api/api";

import { CategoriaProps } from "../../interface/interface";

import { Link } from "react-router-dom";

import styles from "./Categoria.module.css";

const Categorias = () => {
  const [data, setData] = React.useState<CategoriaProps[]>([]);

  async function get() {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?language=pt-br",
        autorizacao
      );
      const data = response.data.genres;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    get();
  }, []);

  return (
    <>
      <Header />
      {data &&
        data.map((i) => (
          <div key={i.id} className={styles.container}>
            <Link
              to={`/catalogo-filmes/categorias/${i.name}`}
              className={styles.categoria}
              onClick={() =>
                window.localStorage.setItem("Categoria", String(i.id))
              }
            >
              {i.name}
            </Link>
          </div>
        ))}
    </>
  );
};

export default Categorias;
