import {typedAction, VideoData} from "../../model";
import {CollectionType} from "./types";

export const fetchVideosStartAction = ({collectionType}: { collectionType: CollectionType }) => typedAction('video/FETCH_VIDEOS_START', {collectionType})
export const fetchVideosAbortAction = ({collectionType}: { collectionType: CollectionType }) => typedAction('video/FETCH_VIDEOS_ABORT', {collectionType})
export const fetchVideosSuccessAction = ({videos, collectionType, nextPageToken, add, query}: { videos: VideoData[], collectionType: CollectionType, nextPageToken: string, add: boolean, query?: string }) =>
    typedAction('video/FETCH_VIDEOS_SUCCESS', {
        videos,
        collectionType,
        nextPageToken,
        add,
        query
    })
export const fetchVideosErrorAction = ({error, collectionType}: { error: string, collectionType: CollectionType }) => typedAction('video/FETCH_VIDEOS_ERROR', {
    error,
    collectionType
})

export const updateSearchQueryAction = (searchQuery: string) => {
    return typedAction('video/UPDATE_SEARCH_QUERY', searchQuery)
}
export const saveVideoAction = (video: VideoData) => {
    return typedAction('video/SAVE_VIDEO', video)
}
export const selectVideoAction = (video: VideoData) => {
    return typedAction('video/SELECT_VIDEO', video)
}
export const removeVideoAction = (videoId: string) => {
    return typedAction('video/REMOVE_VIDEO', videoId)
}
export const clearSearchAction = () => {
    return typedAction('video/CLEAR_SEARCH')
}

export type VideoAction = ReturnType<typeof updateSearchQueryAction | typeof fetchVideosStartAction
    | typeof fetchVideosSuccessAction | typeof fetchVideosErrorAction | typeof fetchVideosAbortAction
    | typeof clearSearchAction | typeof saveVideoAction | typeof selectVideoAction | typeof removeVideoAction>;
