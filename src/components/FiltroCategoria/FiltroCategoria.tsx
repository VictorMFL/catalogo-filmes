import React from "react";

import axios from "axios";

import { autorizacao } from "../../api/api";

import { DataProps } from "../../interface/interface";

import Header from "../Header/Header";

import { Link } from "react-router-dom";

import styles from './FiltroCategoria.module.css'

const FiltroCategoria = () => {
  const [data, setData] = React.useState<DataProps[]>([]);
  const [hoveredId, setHoveredId] = React.useState<number | null>(null);

  const handleMouseEnter = (id: number) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  async function get() {
    const idGenero = window.localStorage.getItem("Categoria");
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?&with_genres=${idGenero}&language=pt-BR`,
        autorizacao
      );
      const data = response.data;
      setData([data]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    get();
  }, []);

  if (data.length === 0) return null;
  return (
    <div>
      <Header />
      {data.map((i) => (
        <div key={i.page} className={styles.cartaz}>
          {i.results.map((res) => (
            <div
            key={res.id}
            className={styles.filme}
            onMouseEnter={() => handleMouseEnter(res.id)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${res.backdrop_path}`}
              alt={`poster do filme ${res.title}`}
              className={styles.imgCartaz}
            />
            <p>{res.title}</p>
            {hoveredId === res.id && (
              <div className={styles.sobre}>
                <Link
                  to={`/catalogo-filmes/filme/${String(res.id)}`}
                  onClick={() =>
                    window.localStorage.setItem("Filme", String(res.id))
                  }
                >
                  Ver mais
                </Link>
              </div>
            )}
          </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FiltroCategoria;
