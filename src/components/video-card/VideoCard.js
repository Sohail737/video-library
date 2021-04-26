import styles from "./VideoCard.module.css";
import {useNavigate} from "react-router-dom"

export const VideoCard = ({ video }) => {
  const navigate=useNavigate();
  return (
    <div onClick={()=>navigate(`/watch/${video.id}`)} className={styles.videoCard+" card"}>
      <div className={styles.cardImgHeight+" card-img"} >
        <img src={video.thumbnail} alt="" />
      </div>
      <div role="heading" aria-level="" className={styles.videoCardHeading+" card-heading"}>
        {video.title}
      </div>
      <div className={styles.videoCardContent+" card-content"}>
        {video.creator} | {video.dateUploadedOn}
      </div>
    </div>
  );
};
