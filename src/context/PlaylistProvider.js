import React, { useReducer, useContext } from "react";

const PlaylistContext = React.createContext();

const initialPlaylistState = {
  playlists: [
    {
      name: "Demo",
      videos: [],
    },
  ],
  likedVideos: [],
};

const playlistReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_PLAYLIST":
      return {
        ...state,
        playlists: [
          ...state.playlists,
          { name: action.payload.name, videos: [] },
        ],
      };

    case "ADD_VIDEO_TO_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((playlist) => {
          if (action.payload.name === playlist.name) {
            if (
              playlist.videos.filter(
                (videoInPlaylist) =>
                  videoInPlaylist.id === action.payload.video.id
              ).length > 0
            ) {
              return {
                ...playlist,
                videos: playlist.videos.filter(
                  (videoInPlaylist) =>
                    videoInPlaylist.id !== action.payload.video.id
                ),
              };
            }
            return {
              ...playlist,
              videos: [...playlist.videos, action.payload.video],
            };
          }

          return { ...playlist };
        }),
      };

    case "ADD_TO_LIKED":
      if (
        state.likedVideos.length > 0 &&
        state.likedVideos.filter(
          (likedVideo) => likedVideo.id === action.payload.video.id
        ).length > 0
      ) {
        return {
          ...state,
          likedVideos: state.likedVideos.filter(
            (likedVideo) => likedVideo.id !== action.payload.video.id
          ),
        };
      }

      return {
        ...state,
        likedVideos: [...state.likedVideos, action.payload.video],
      };

    default:
      return state;
  }
};

export const PlaylistProvider = ({ children }) => {
  const [{ playlists, likedVideos }, dispatchPlaylist] = useReducer(
    playlistReducer,
    initialPlaylistState
  );

  return (
    <PlaylistContext.Provider
      value={{ playlists, likedVideos, dispatchPlaylist }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => useContext(PlaylistContext);
