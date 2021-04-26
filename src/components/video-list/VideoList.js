import styles from "./VideoList.module.css";
import { VideoCard } from "../";
import { videoListStore } from "../../videos/video";
import { Search } from "../search/Search";
import { useLocation } from "react-router-dom";

export const VideoList = () => {
  

  const query = new URLSearchParams(useLocation().search);
  const searchParams = query.get("search");

  console.log({ searchParams });

  

  const filterSearch = (videoList, searchParams) => {
    if (searchParams !== "" && searchParams !== null) {
      return videoList.filter((video) =>
        video.title.toLowerCase().includes(searchParams.toLowerCase())
      );
    }

    return videoList;
  };

  const filteredVideoList = filterSearch(videoListStore, searchParams);

  return (
    <>
      <div className={styles.titleArea}>
        <h2>Explore Videos</h2>
        <Search searchParams={searchParams}/>
      </div>

      <div className={styles.videoList}>
        {filteredVideoList.length === 0 && (
          <p>The video you are searching for is not present</p>
        )}
        {filteredVideoList.length > 0 &&
          filteredVideoList.map((video) => {
            return <VideoCard key={video.id} video={video} />;
          })}
      </div>
    </>
  );
};
