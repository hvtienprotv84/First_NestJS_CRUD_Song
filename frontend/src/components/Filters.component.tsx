import { FormEvent } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import "../App.css";

export function Filters() {
  const {
    countParam,
    setCountParam,
    nameParam,
    setNameParam,
    bandParam,
    setBandParam,
    minYearParam,
    maxYearParam,
    setMinYearParam,
    setMaxYearParam,
    fetchSongs,
  } = useGlobalContext();

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    fetchSongs && fetchSongs();
  };

  return (
    <div className="title_filter">
      <h3>Tìm Kiếm Theo Bộ Lọc</h3>
      <form onSubmit={handleForm}>
        <div>
          <label htmlFor="count">Số lượng bài hát cần tìm</label>
          <input
            id="count"
            type="number"
            value={countParam}
            onInput={(e) => {
              setCountParam(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="nameParam">Tên Bài Hát</label>
          <input
            id="nameParam"
            placeholder="Lạc Trôi"
            type="string"
            value={nameParam}
            onInput={(e) => {
              setNameParam(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="bandParam">Nhóm Nhạc</label>
          <input
            id="bandParam"
            placeholder="Sơn Tùng M-TP"
            type="string"
            value={bandParam}
            onInput={(e) => {
              setBandParam(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="minYearParam">Năm Sản Xuất</label>
          <input
            id="minYearParam"
            placeholder="2022"
            type="number"
            value={minYearParam || ""}
            onInput={(e) => {
              setMinYearParam(e.target.value);
            }}
          />
          <span className="hr_year"> - </span>
          <input
            id="maxYearParam"
            placeholder={new Date().getFullYear() + ""}
            type="number"
            value={maxYearParam || ""}
            onInput={(e) => {
              setMaxYearParam(e.target.value);
            }}
          />
        </div>
        <button type="submit">Tìm Theo Bộ Lọc</button>
      </form>
      {/* <div>
        <p className="footer">Huỳnh Vĩnh Tiến</p>
      </div> */}
    </div>
  );
}
