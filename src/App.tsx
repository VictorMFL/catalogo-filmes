import React from "react";

// Interface
import { DataProps } from "./interface/interface";

// Components
import Home from "./components/Home";

const App = () => {
  const [data, setData] = React.useState<DataProps[]>([]);

  return (
    <div>
      <Home data={data} setData={setData} />
    </div>
  );
};

export default App;
