import React from "react";

import axios from "axios";

import styles from "./Home.module.css";

// Api
import { autorizacao } from "../../api/api";

// Interface
import { DataProps } from "../../interface/interface";

import { Link } from "react-router-dom";

type StateProps = {
  data: DataProps[];
  setData: React.Dispatch<React.SetStateAction<DataProps[]>>;
};

const Home = ({ data, setData }: StateProps) => {
  const [hoveredId, setHoveredId] = React.useState<number | null>(null);
  const [page, setPage] = React.useState(1);

  const handleMouseEnter = (id: number) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  async function get() {
    const pageString = String(page);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=pt-BR&page=${pageString}&sort_by=popularity.desc`,
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
    <>
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
                src={`https://image.tmdb.org/t/p/w500${res.poster_path}`}
                alt={`poster do filme ${res.title}`}
                className={styles.imgCartaz}
              />
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
    </>
  );
};

export default Home;
