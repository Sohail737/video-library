import styles from "./VideoDetail.module.css";
import { VideoDetailCard } from "../../components";
import {useParams} from "react-router-dom"
import {videoListStore} from "../../videos/video"

export const VideoDetail = () => {
  const {id}=useParams();

  const video=videoListStore.filter(video=>video.id===id)[0];

  return (
    <div className={styles.container}>
      <VideoDetailCard video={video} />
    </div>
  );
};
