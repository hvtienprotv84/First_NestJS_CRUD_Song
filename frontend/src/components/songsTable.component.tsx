import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";

export const SongsTable = () => {
  const { songs, fetchSongs, deleteSong } = useGlobalContext();

  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "desc",
  });

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  function getValue(value) {
    return typeof value === "number"
      ? value
      : isNaN(parseFloat(value))
      ? value
      : parseFloat(value);
  }

  const sortedSongs = [...songs].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const valueA = getValue(a[sortConfig.key]);
    const valueB = getValue(b[sortConfig.key]);

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortConfig.direction === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return sortConfig.direction === "asc" ? valueA - valueB : valueB - valueA;
  });

  return (
    <div id="songs-table">
      <div>Bài Hát Hiện Có: {sortedSongs.length} Bài Hát</div>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>
              ID {sortConfig.key === "id" ? `(${sortConfig.direction})` : ""}
            </th>
            <th onClick={() => handleSort("name")}>
              Tên Bài Hát{" "}
              {sortConfig.key === "name" ? `(${sortConfig.direction})` : ""}
            </th>
            <th onClick={() => handleSort("band")}>
              Nhóm Nhạc{" "}
              {sortConfig.key === "band" ? `(${sortConfig.direction})` : ""}
            </th>
            <th onClick={() => handleSort("year")}>
              Năm Sản Xuất{" "}
              {sortConfig.key === "year" ? `(${sortConfig.direction})` : ""}
            </th>
            <th>Chức Năng</th>
          </tr>
        </thead>
        <tbody>
          {sortedSongs.map((song) => (
            <tr key={song.id}>
              <td>{song.id}</td>
              <td>{song.name}</td>
              <td>{song.band}</td>
              <td>{song.year}</td>
              <td>
                <button
                  onClick={() => {
                    deleteSong(song.id);
                  }}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p className="footer">Huỳnh Vĩnh Tiến</p>
      </div>
    </div>
  );
};
