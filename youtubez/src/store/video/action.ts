import {VideoData} from "../../model";
import {Dispatch} from "redux";
import {api} from "../../api";
import {differenceWith} from 'lodash'
import {
    clearSearchAction, fetchVideosAbortAction,
    fetchVideosErrorAction,
    fetchVideosStartAction,
    fetchVideosSuccessAction, removeVideoAction, saveVideoAction, selectVideoAction,
    updateSearchQueryAction
} from "./typed-action";
import {FetchVideosParams} from "./types";
import {store} from "../../index";

export const updateSearchQuery = (searchQuery: string) => {
    return (dispatch: Dispatch) => {
        dispatch(updateSearchQueryAction(searchQuery))
    }
}
export const saveVideo = (video: VideoData) => {
    return function action(dispatch: Dispatch) {
        // dispatch(saveVideoAction(video))
        const url = `/videos/${video.id}`
        return api.put(url, video).then(
            response => dispatch(saveVideoAction(video)),
            err => dispatch(saveVideoAction(video))
        )
    }
}

export const selectVideo = (video: VideoData) => {
    return (dispatch: Dispatch) => {
        dispatch(selectVideoAction(video))
    }
}
export const removeVideo = (videoId: string) => {
    return function action(dispatch: Dispatch) {
        // dispatch(saveVideoAction(video))
        const url = `/videos/${videoId}`
        return api.delete(url).then(
            response => dispatch(removeVideoAction(videoId)),
            err => dispatch(removeVideoAction(videoId))
        )
    }
}
export const clearSearch = () => {
    return (dispatch: Dispatch) => {
        dispatch(clearSearchAction())
    }
}

export function fetchVideos(params: FetchVideosParams) {
    return function action(dispatch: Dispatch) {
        console.log('fetch videos with params', params)
        let url: string = '';// params.collectionType === "searchFilteredVideos" ? `/videos/search?name=${params.query}` : params.collectionType === "myFavoriteVideos" ? `videos/?name=${params.query}` : `/videos/trend`
        let reqParams: { page?: string, name?: string } = {}
        switch (params.collectionType) {
            case "myFavoriteVideos":
                url = `videos/`
                reqParams = {page: params.page}
                break;
            case "searchVideos":
                url = params.searchOf ? params.searchOf === "trendyVideos" ? 'videos/search' : 'videos/search-library' : `/videos/search`
                reqParams = {page: params.page, name: params.query}
                break;
            case "trendyVideos":
                url = `/videos/trend`
                reqParams = {page: params.page}
        }
        dispatch(fetchVideosStartAction(params))
        return api.get(url, {params: reqParams}).then(
            response => {
                const nonPresentVideos = differenceWith(response.data.items, store.getState().video[params.collectionType].videos, function (o1: VideoData, o2: VideoData) {
                    return o1['id'] === o2['id']
                });
                return params.collectionType === "searchVideos" && store.getState().video.searchQuery !== params.query ?
                    dispatch(fetchVideosAbortAction({collectionType: params.collectionType})) :
                    dispatch(fetchVideosSuccessAction({
                        nextPageToken: response.data.nextPageToken,
                        videos: nonPresentVideos,
                        collectionType: params.collectionType,
                        add: params.add
                    }))
            },
            err => dispatch(fetchVideosErrorAction({error: err, collectionType: params.collectionType}))
        );
    }
}


