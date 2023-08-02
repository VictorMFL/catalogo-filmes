import React from "react";

import axios from "axios";

// Api
import { authorization } from "../../api/api";

// Interface
import { DataProps } from "../../interface/interface";

import { Link } from "react-router-dom";

// Tela de Carregamento
import Login from "../LoginPage/Login";

// icones
import { IoMdStar } from "react-icons/io";
import { BsCalendar4Event } from "react-icons/bs";

type StateProps = {
  data: DataProps[];
  setData: React.Dispatch<React.SetStateAction<DataProps[]>>;
};

const Home = ({ data, setData }: StateProps) => {
  const [hoveredId, setHoveredId] = React.useState<number | null>(null);
  const [login, setLogin] = React.useState(true);

  const page = 1;

  const handleMouseEnter = (id: number) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  async function get() {
    const pageNum = String(page);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=pt-BR&page=${pageNum}&sort_by=popularity.desc`,
        authorization
      );
      const data = response.data;
      setData([data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLogin(false);
    }
  }

  React.useEffect(() => {
    get();
  }, []);

  if (login) return <Login />;
  return (
    <main className="bg-mediumGray calc-padding-top">
      <div className="px-4 pb-4">
        {data.map((i) => (
          <div
            key={i.page}
            className="grid grid-cols-3 gap-5 pt-3 big-tablet:grid-cols-2 big-tablet:p-4 tablet:grid-cols-1"
          >
            {i.results.map((res) => (
              <div
                key={res.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(res.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="w-full flex justify-between items-center mb-3">
                  <p
                    className="text-white"
                    style={{
                      fontSize: res.title.length > 50 ? "0.7rem" : "1rem",
                    }}
                  >
                    {res.title}
                  </p>
                  <div className="flex justify-between items-center">
                    <IoMdStar size={32} color="#FEEA35" />
                    <p className="text-yellow font-bold">{res.vote_average}</p>
                  </div>
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${res.poster_path}`}
                  alt={`poster do filme ${res.title}`}
                  className="w-full h-96 cursor-pointer rounded-lg"
                />
                {hoveredId === res.id && (
                  <div className="absolute w-full bottom-8 bg-purple rounded-bl-lg rounded-br-lg p-2 text-center">
                    <Link
                      to={`/catalogo-filmes/filme/${String(res.id)}`}
                      onClick={() =>
                        window.localStorage.setItem("Movie", String(res.id))
                      }
                      className="font-bold text-white hover:underline"
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
      </div>
    </main>
  );
};

export default Home;
