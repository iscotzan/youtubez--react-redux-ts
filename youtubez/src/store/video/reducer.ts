import {VideoCollection, VideoState} from "./types";
import {VideoAction} from "./typed-action";

const initialVideoCollection: VideoCollection = {hasMore: true, loading: false, nextPageToken: null, videos: []}
const initialState: VideoState = {
    trendyVideos: initialVideoCollection,
    myFavoriteVideos: initialVideoCollection,
    searchVideos: initialVideoCollection,
    selectedVideo: null,
    isLoading: false,
    searchQuery: ''
};


export function videoReducer(
    state = initialState,
    action: VideoAction
): VideoState {
    switch (action.type) {
        case "video/UPDATE_SEARCH_QUERY":
            return {
                ...state,
                searchQuery: action.payload,
                searchVideos: action.payload.length ? state.searchVideos : initialVideoCollection
            }
        case "video/FETCH_VIDEOS_START":
            return {
                ...state,
                [action.payload.collectionType]: {...state[action.payload.collectionType], loading: true}
            }
        case "video/FETCH_VIDEOS_ABORT":
            return {
                ...state,
                [action.payload.collectionType]: {...state[action.payload.collectionType], loading: false}
            }
        case "video/FETCH_VIDEOS_SUCCESS":
            return {
                ...state,
                [action.payload.collectionType]: {
                    ...state[action.payload.collectionType],
                    loading: false,
                    error: null,
                    nextPageToken: action.payload.nextPageToken,
                    videos: action.payload.add ? state[action.payload.collectionType].videos.concat(action.payload.videos) : action.payload.videos
                }
            }
        case "video/FETCH_VIDEOS_ERROR":
            return {
                ...state,
                [action.payload.collectionType]: {
                    ...state[action.payload.collectionType],
                    loading: false,
                    error: action.payload.error
                }
            }
        case "video/CLEAR_SEARCH":
            return {
                ...state,
                searchVideos: initialVideoCollection
            }
        case "video/REMOVE_VIDEO":
            return {
                ...state,
                myFavoriteVideos: {
                    ...state.myFavoriteVideos,
                    videos: [...state.myFavoriteVideos.videos.filter(x => x.id !== action.payload)]
                }
            }
        case "video/SAVE_VIDEO":
            return {
                ...state,
                myFavoriteVideos: {
                    ...state.myFavoriteVideos,
                    videos: [...state.myFavoriteVideos.videos, action.payload]
                }
            }
        case "video/SELECT_VIDEO":
            return {
                ...state,
                selectedVideo: action.payload
            }
        default:
            return state;
    }
}