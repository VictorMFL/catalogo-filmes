import React from "react";

import axios from "axios";

import { authorization } from "../../api/api";

import { DataProps } from "../../interface/interface";

import Header from "../Header/Header";

import { Link } from "react-router-dom";

// icones
import { BsCalendar4Event } from "react-icons/bs";
import { IoMdStar } from "react-icons/io";

// Tela de Carregamento
import Login from "../LoginPage/Login";

// footer para passar de página
import { PaginationControl } from "react-bootstrap-pagination-control";

// hook que verifica o tamanho da tela
import useMedia from "../../hooks/useMedia";

const GenreFilter = () => {
  const [data, setData] = React.useState<DataProps[]>([]);
  const [hoveredId, setHoveredId] = React.useState<number | null>(null);
  const [pageNum, setPageNum] = React.useState(1);
  const [login, setLogin] = React.useState(true);

  // vendo se a tela é de 700px ou menos  
  const mobile = useMedia("(max-width: 700px)");

  const handleMouseEnter = (id: number) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  async function get() {
    const idGenre = window.localStorage.getItem("Genre");
    const page = String(pageNum);
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
      setLogin(false);
    }
  }

  React.useEffect(() => {
    get();
  }, [pageNum]);

  if (login) return <Login />;
  return (
    <>
      <Header />
      <main className="pb-4 bg-mediumGray text-white pt-24">
      {data.map((i) => (
        <div
          key={i.page}
          className="grid grid-cols-3 px-4 gap-5 big-tablet:grid-cols-2 big-tablet:p-4 tablet:grid-cols-1"
        >
          {i.results.map((res) => (
            <div
              key={res.id}
              className="relative"
              onMouseEnter={() => handleMouseEnter(res.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="w-full flex justify-between items-center mb-3">
                <p className="text-white" style={{fontSize: res.title.length > 50 ? '0.7rem': '1rem'}}>{res.title}</p>
                <div className="flex justify-between items-center">
                  <IoMdStar size={32} color="#FEEA35" />
                  <p className="text-yellow font-bold">{res.vote_average}</p>
                </div>
              </div>
              <img
                src={`https://image.tmdb.org/t/p/w500${res.backdrop_path}`}
                alt={`poster do filme ${res.title}`}
                className="w-full h-96 cursor-pointer rounded-lg"
              />
              {hoveredId === res.id && (
                <div className="absolute bottom-8 bg-purple text-center p-3 w-full rounded-bl-lg rounded-br-lg">
                  <Link
                    to={`/catalogo-filmes/filme/${String(res.id)}`}
                    onClick={() =>
                      window.localStorage.setItem("Movie", String(res.id))
                    }
                    className="text-white font-bold hover:underline"
                  >
                    Ver mais
                  </Link>
                </div>
              )}
              <div className="flex justify-center items-center w-full h-6 mt-2">
                <BsCalendar4Event color="#8B8D9B" size={21} />
                <p className="text-lightGray font-normal text-center ml-2">
                  {res.release_date.slice(0, 4)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
      </main>
      <footer>
        <PaginationControl
          page={pageNum}
          between={mobile ? 2 : 4}
          total={500}
          limit={1}
          changePage={(page) => {
            setPageNum(page);
          }}
          ellipsis={1}
        />
      </footer>
    </>
  );
};

export default GenreFilter;
