import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

// Props dos dados da APi
import { DataProps } from "../interface/interface";

type DataApiProps = {
  data: DataProps[] | null;
  setData: Dispatch<SetStateAction<DataProps[] | null>>;
};

const DataApiContext = createContext({} as DataApiProps);

export const DataApiProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<null | DataProps[]>(null);

  return (
    <>
      <DataApiContext.Provider value={{data, setData}}>
        {children}
      </DataApiContext.Provider>
    </>
  );
};

export const useDataApiContext = () => useContext(DataApiContext)
