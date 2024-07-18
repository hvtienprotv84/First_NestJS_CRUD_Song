import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import "../App.css";

export function NewSongForm() {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [band, setBand] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { fetchSongs } = useGlobalContext();
  const fileFormRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async (event: FormDataEvent) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file to upload");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:3000/songs/upload", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      fetchSongs();
      setFile(null);
      fileFormRef.current?.reset();
    } else {
      console.error("Post request failed");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newRow = {
      name: name,
      year: parseInt(year),
      band: band,
    };

    const response = await fetch("http://localhost:3000/songs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRow),
    });
    if (response.ok) {
      fetchSongs && fetchSongs();
    } else {
      console.error("Post request failed");
    }
    setName("");
    setYear("");
    setBand("");
  };

  return (
    <>
      <div className="title_newsong">
        <h3>Thêm Bài Hát Mới</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Vd: Lạc Trôi"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Vd: 2024"
            value={year}
            required
            onChange={(e) => setYear(e.target.value)}
          />
          <input
            type="text"
            placeholder="Vd: Sơn Tùng M-TP"
            value={band}
            required
            onChange={(e) => setBand(e.target.value)}
          />
          <button type="submit">Thêm Bài Hát</button>
        </form>
      </div>
      <div className="title_newsong2">
        <h3>Upload CSV File</h3>
        <form ref={fileFormRef} onSubmit={handleUpload}>
          <input type="file" accept=".csv" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
    </>
  );
}
