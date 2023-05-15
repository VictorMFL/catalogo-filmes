import React from "react";
import axios from "axios";

import Header from "../Header/Header";

import { authorization } from "../../api/api";

import { GenreProps } from "../../interface/interface";

import { Link } from "react-router-dom";

import styles from "./Genre.module.css";

const Genre = () => {
  const [data, setData] = React.useState<GenreProps[]>([]);

  async function get() {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?language=pt-br",
        authorization
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
              className={styles.genre}
              onClick={() =>
                window.localStorage.setItem("Genre", String(i.id))
              }
            >
              {i.name}
            </Link>
          </div>
        ))}
    </>
  );
};

export default Genre;
