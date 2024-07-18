import "./App.css";
import { Filters } from "./components/Filters.component";
import { SongsTable } from "./components/songsTable.component";
import { GlobalProvider } from "./context/GlobalContext";
import { NewSongForm } from "./components/NewSongForm.component";

function App() {
  return (
    <GlobalProvider>
      <div id="page">
        <aside id="sidebar">
          <div className="logo_title">
            <img src="../public/logo_1.png"/>
            <h1>Danh Sách Bài Hát</h1>
          </div>
          <NewSongForm></NewSongForm>
          <Filters></Filters>
        </aside>
        <SongsTable></SongsTable>
      </div>
    </GlobalProvider>
  );
}

export default App;
