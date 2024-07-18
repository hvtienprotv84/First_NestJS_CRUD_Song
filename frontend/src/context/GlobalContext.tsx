import { createContext, useContext, useState } from "react";
import { Song } from "../interfaces/Song";
import { Context } from "../interfaces/Context";

const GlobalContext = createContext<Context>({
  songs: [],
  setSongs: () => {},
  countParam: 0,
  setCountParam: () => {},
  nameParam: "",
  setNameParam: () => {},
  bandParam: "",
  setBandParam: () => {},
  minYearParam: 0,
  setMinYearParam: () => {},
  maxYearParam: 0,
  setMaxYearParam: () => {},
  fetchSongs: () => {},
  deleteSong: () => {},
});

const GlobalProvider = ({ children }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [countParam, setCountParam] = useState(25);
  const [nameParam, setNameParam] = useState("");
  const [bandParam, setBandParam] = useState("");
  const [minYearParam, setMinYearParam] = useState<number>(0);
  const [maxYearParam, setMaxYearParam] = useState<number>(0);

  const buildQueryParams = () => {
    const queryParams = [];
    if (countParam !== undefined) queryParams.push("maxItems=" + countParam);
    if (nameParam !== undefined) queryParams.push("name=" + nameParam);
    if (bandParam !== undefined) queryParams.push("band=" + bandParam);
    if (minYearParam !== undefined) queryParams.push("minYear=" + minYearParam);
    if (maxYearParam !== undefined) queryParams.push("maxYear=" + maxYearParam);

    if (queryParams.length) {
      return "?" + queryParams.join("&");
    }

    return "";
  };

  const fetchSongs = async () => {
    const response = await fetch(
      `http://localhost:3000/songs${buildQueryParams()}`
    );
    if (response.ok) {
      const data = await response.json();
      setSongs(data);
    } else {
      // Request failed
      console.error("Post request failed");
    }
  };

  const deleteSong = async (id: number) => {
    const response = await fetch(`http://localhost:3000/songs/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchSongs();
    } else {
      console.error("Delete request failed");
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        songs,
        setSongs,
        countParam,
        setCountParam,
        nameParam,
        setNameParam,
        bandParam,
        setBandParam,
        minYearParam,
        setMinYearParam,
        maxYearParam,
        setMaxYearParam,
        fetchSongs,
        deleteSong,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };
