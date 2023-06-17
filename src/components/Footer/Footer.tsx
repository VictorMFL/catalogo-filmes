import React from "react";

import { PaginationControl } from "react-bootstrap-pagination-control";
import { DataProps } from "../../interface/interface";

import axios from "axios";

import { authorization } from "../../apis/api";

type PageNumProps = {
  setData: React.Dispatch<React.SetStateAction<DataProps[]>>;
};

// Hook para mudar o footer no mobile
const useMedia = (media: string) => {
  const [match, setMatch] = React.useState<boolean>()
  React.useEffect(() => {
    function changeMatch() {
      const {matches} = window.matchMedia(media)
      setMatch(matches)
    }
    changeMatch()
    window.addEventListener('resize', changeMatch)
    return () => {
      window.removeEventListener('resize', changeMatch)
    }
  }, [media])

  return match
}


const Footer = ({ setData }: PageNumProps) => {
  const [pageNum, setPageNum] = React.useState(1);

  const mobile = useMedia('(max-width: 700px)')

  async function get() {
    const page = String(pageNum);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=pt-BR&page=${page}&sort_by=popularity.desc`,
        authorization
      );
      const data = response.data;
      setData([data]);
      window.scrollTo(0, 0); // rolamento da página para o topo
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    get();
  }, [pageNum]);

  return (
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
  );
};

export default Footer;
