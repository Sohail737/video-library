import styles from "./Library.module.css";
import { VideoCard } from "../../components";
import { usePlaylist } from "../../context";

export const Library = () => {
  const { playlists, likedVideos } = usePlaylist();

  return (
    <div className={styles.container}>
      <h1>PlayLists</h1>
      {playlists.map((playlist) => {
        return (
          <>
            <h2>{playlist.name}</h2>
            <div className={styles.playlistContainer}>
              {playlist.videos.length === 0 && (
                <p>Videos Added Will Appear Here</p>
              )}
              {playlist.videos.length > 0 &&
                playlist.videos.map((video) => {
                  return <VideoCard video={video} />;
                })}
            </div>
            <hr style={{ margin: "1rem 0" }}></hr>
          </>
        );
      })}
      <h1>Liked Videos</h1>
      <div className={styles.playlistContainer}>
        {likedVideos.length === 0 && <p>Videos Added Will Appear Here</p>}
        {likedVideos.length > 0 &&
          likedVideos.map((likedVideo) => {
            return <VideoCard video={likedVideo} />;
          })}
      </div>
      <hr style={{ margin: "1rem 0" }}></hr>
    </div>
  );
};
