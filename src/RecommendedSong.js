import { songRecs } from "./bsideSongs";

export default function RecommendedSong({ type }) {
  const { desc, song } = songRecs[type];

  return (
    <>
      <p className="hero-bside">B-side 隱藏特質：{desc}</p>
      <div className="recommended-song-section">
        <div className="song-label">為你點播專屬 B-side 曲</div>
        <div className="vinyl-container">
          <img src={song.cover} alt="Vinyl" className="vinyl-cover" />
          <div className="vinyl-hole"></div>
        </div>
        <div className="song-title">{song.title}</div>
        <div className="song-artist">{song.artist}</div>
      </div>
    </>
  );
}