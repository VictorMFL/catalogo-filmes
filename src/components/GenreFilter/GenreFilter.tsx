import React from "react";

import axios from "axios";

import { authorization } from "../../api/api";

import { DataProps } from "../../interface/interface";

import Header from "../Header/Header";

import { Link } from "react-router-dom";

import styles from './GenreFilter.module.css'

// Tela de Carregamento
import Login from "../LoginPage/Login";

import { PaginationControl } from "react-bootstrap-pagination-control";

const GenreFilter = () => {
  const [data, setData] = React.useState<DataProps[]>([]);
  const [hoveredId, setHoveredId] = React.useState<number | null>(null);
  const [pageNum, setPageNum] = React.useState(1)
  const [login, setLogin] = React.useState(true)

  const handleMouseEnter = (id: number) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };
  
  async function get() {
    const idGenre = window.localStorage.getItem("Genre");
    const page = String(pageNum)
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?&with_genres=${idGenre}&language=pt-BR&page=${page}`,
        authorization
      );
      const data = response.data;
      setData([data]);
      window.scrollTo(0, 0); // rolamento da página para o topo
    } catch (error) {
      console.log(error);
    } finally {
      setLogin(false)
    }
  }

  React.useEffect(() => {
    get();
  }, [pageNum]);

  if (login) return <Login />;
  return (
    <div>
      <Header />
      {data.map((i) => (
        <div key={i.page} className={styles.cartaz}>
          {i.results.map((res) => (
            <div
            key={res.id}
            className={styles.movie}
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
              <div className={styles.about}>
                <Link
                  to={`/catalogo-filmes/filme/${String(res.id)}`}
                  onClick={() =>
                    window.localStorage.setItem("Movie", String(res.id))
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
       <footer>
      <PaginationControl
        page={pageNum}
        between={4}
        total={500}
        limit={1}
        changePage={(page) => {
          setPageNum(page);
        }}
        ellipsis={1}
      />
    </footer>
    </div>
  );
};

export default GenreFilter;
