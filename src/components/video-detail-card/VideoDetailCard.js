import styles from "./VideoDetailCard.module.css";
import ReactPlayer from "react-player/youtube";
import { PlaylistModal } from "../";
import { useState } from "react";
import { usePlaylist } from "../../context";
import { useToast } from "../../context";
import { useAuth } from "../../context";
import { AuthModal } from "../auth-modal/AuthModal";
import {useLocation} from "react-router-dom";

export const VideoDetailCard = ({ video }) => {
  const [openModal, setOpenModal] = useState(false);
  const { likedVideos, dispatchPlaylist } = usePlaylist();
  const { dispatchToast } = useToast();
  const { isUserLoggedIn } = useAuth();
  const location = useLocation();
  const path=location.pathname;
  console.log("liked videos in video detail card", likedVideos);
  const showModal = () => {
    setOpenModal((openModal) => (openModal = true));
  };
  const addToLikedVideos = (video) => {
    dispatchPlaylist({ type: "ADD_TO_LIKED", payload: { video } });
  };

  const toggleToast = (video) => {
    if (
      likedVideos.length > 0 &&
      likedVideos.filter((likedVideo) => likedVideo.id === video.id).length > 0
    ) {
      dispatchToast({ type: "TOGGLE_TOAST", payload: true });
      dispatchToast({ type: "TOAST_TYPE", payload: { toastType: "success" } });
      dispatchToast({
        type: "TOAST_MESSAGE",
        payload: { toastMessage: "video successfully removed" },
      });
    } else {
      dispatchToast({ type: "TOGGLE_TOAST", payload: true });
      dispatchToast({ type: "TOAST_TYPE", payload: { toastType: "success" } });
      dispatchToast({
        type: "TOAST_MESSAGE",
        payload: { toastMessage: "video successfully added" },
      });
    }
  };

  return (
    <>
      {openModal &&
        isUserLoggedIn &&(
          <PlaylistModal setOpenModal={setOpenModal} incommingVideo={video} />
        )}
      {openModal && !isUserLoggedIn &&(<AuthModal setOpenModal={setOpenModal} path={path} />)}
      <div className={styles.videoDetailCard + " card"}>
        <ReactPlayer url={video.url} width="100%"/>
        <div
          role="heading"
          aria-level=""
          className={styles.videoDetailCardHeading + " card-heading"}
        >
          {video.title}
        </div>
        <div className={styles.nav}>
          <div className={styles.videoDate}>{video.dateUploadedOn}</div>
          <div className={styles.videoAction}>
            <svg
              onClick={() => {
                if (isUserLoggedIn) {
                  addToLikedVideos(video);
                  toggleToast(video);
                } else {
                  showModal();
                }
              }}
              className={
                likedVideos.length > 0 &&
                likedVideos.filter((likedVideo) => likedVideo.id === video.id)
                  .length > 0
                  ? styles.liked
                  : styles.actionPills
              }
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2M1 21h4V9H1v12z"
                fill="currentColor"
              ></path>
            </svg>
            <svg
              onClick={showModal}
              className={styles.actionPills}
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                d="M2 16h8v-2H2m16 0v-4h-2v4h-4v2h4v4h2v-4h4v-2m-8-8H2v2h12m0 2H2v2h12v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
        <div className={styles.avatarContainer}>
          <img className="avatar small" src={video.avatar} alt="" />
          <div className={styles.avatarName}>{video.creator}</div>
        </div>
        <hr></hr>
        <p className={styles.videoDesc}>{video.description}</p>
      </div>
    </>
  );
};
