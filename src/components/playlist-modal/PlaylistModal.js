import styles from "./PlaylistModal.module.css";
import { usePlaylist } from "../../context";
import { useState} from "react";
import { useToast } from "../../context";

export const PlaylistModal = ({ setOpenModal, incommingVideo }) => {

  const [playlistName, setPlaylistName] = useState("");
  const { playlists, dispatchPlaylist } = usePlaylist();
  const { dispatchToast } = useToast();

  console.log({ playlists });

  const addToPlaylist = () => {
    if (
      playlists.filter((playlist) => playlist.name.toLowerCase() === playlistName.toLowerCase()).length > 0
    ) {
      dispatchToast({ type: "TOGGLE_TOAST", payload: true });
      dispatchToast({ type: "TOAST_TYPE", payload: { toastType: "error" } });
      dispatchToast({
        type: "TOAST_MESSAGE",
        payload: { toastMessage: "Playlist already exists" },
      });
    } else {
      dispatchPlaylist({
        type: "CREATE_PLAYLIST",
        payload: { name: playlistName },
      });
      dispatchToast({ type: "TOGGLE_TOAST", payload: true });
      dispatchToast({ type: "TOAST_TYPE", payload: { toastType: "success" } });
      dispatchToast({
        type: "TOAST_MESSAGE",
        payload: { toastMessage: "playlist successfully created" },
      });
    }

    setPlaylistName("");
  };

  // const checkIfVideoIsPresentInPlaylist = (videosInPlaylist, video) => {
  //   return (
  //     videosInPlaylist.filter(
  //       (videoInPlaylist) => videoInPlaylist.id === video.id
  //     ).length > 0
  //   );
  // };

  const addVideoToPlaylist = (playlistName, video) => {
    console.log("video in add method on modal component", video);
    dispatchPlaylist({
      type: "ADD_VIDEO_TO_PLAYLIST",
      payload: { name: playlistName, video: video },
    });
  };

  const toggleToast = (videosInPlaylist, video) => {
    if (
      videosInPlaylist.filter(
        (videoInPlaylist) => videoInPlaylist.id === video.id
      ).length > 0
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
    <div className={styles.modalContainer}>
      <div className={styles.videoModalContentContainer + " modal"}>
        <svg
          onClick={() => setOpenModal((openModal) => (openModal = false))}
          className={styles.modalClose}
          width="1em"
          height="1em"
          viewBox="0 0 42 42"
        >
          <path
            fillRule="evenodd"
            d="M21.002 26.588l10.357 10.604c1.039 1.072 1.715 1.083 2.773 0l2.078-2.128c1.018-1.042 1.087-1.726 0-2.839L25.245 21L36.211 9.775c1.027-1.055 1.047-1.767 0-2.84l-2.078-2.127c-1.078-1.104-1.744-1.053-2.773 0L21.002 15.412L10.645 4.809c-1.029-1.053-1.695-1.104-2.773 0L5.794 6.936c-1.048 1.073-1.029 1.785 0 2.84L16.759 21L5.794 32.225c-1.087 1.113-1.029 1.797 0 2.839l2.077 2.128c1.049 1.083 1.725 1.072 2.773 0l10.358-10.604z"
            fill="currentColor"
          ></path>
        </svg>
        <h3 className="modal-heading">Add To Playlist</h3>
        <div className="modal-content">
          <ul className="stacked-list">
            {playlists.map((item) => {
              console.log({ item });
              return (
                <li className="list-item" key={item.name}>
                  <label>
                    <input
                      onChange={() => {
                        addVideoToPlaylist(item.name, incommingVideo);
                        toggleToast(item.videos, incommingVideo);
                      }}
                      className="list-item-left"
                      type="checkbox"
                      checked={
                        // checkIfVideoIsPresentInPlaylist(item.videos, video)

                        item &&
                        item?.videos.filter(
                          (videoInPlaylist) =>
                            videoInPlaylist.id === incommingVideo.id
                        ).length > 0
                      }
                    />
                    {item.name}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="modal-footer">
          <input
            onChange={(e) => setPlaylistName(e.target.value)}
            type="text"
            value={playlistName}
            placeholder="Create Playlist"
            className="input"
          />
          <button
            onClick={addToPlaylist}
            className={styles.addButton + " btn primary text"}
          >
            add
          </button>
        </div>
      </div>
    </div>
  );
};
