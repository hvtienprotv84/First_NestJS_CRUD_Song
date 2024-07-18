import { Song } from "./Song";

export interface Context {
  songs: Song[];
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
  countParam: number;
  setCountParam: React.Dispatch<React.SetStateAction<number>>;
  nameParam: string;
  setNameParam: React.Dispatch<React.SetStateAction<string>>;
  bandParam: string;
  setBandParam: React.Dispatch<React.SetStateAction<string>>;
  minYearParam: number;
  setMinYearParam: React.Dispatch<React.SetStateAction<number>>;
  maxYearParam: number;
  setMaxYearParam: React.Dispatch<React.SetStateAction<number>>;
  fetchSongs: () => void;
  deleteSong: (id: number) => void;
}
