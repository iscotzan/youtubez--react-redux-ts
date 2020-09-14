import {VideoData} from "../../model";

export interface VideoCollection {
    nextPageToken: string | null,
    hasMore: boolean,
    loading: boolean,
    videos: VideoData[]
}

export interface VideoState {
    trendyVideos: VideoCollection;
    myFavoriteVideos: VideoCollection;
    searchVideos: VideoCollection;
    selectedVideo: VideoData | null;
    isLoading: boolean;
    searchQuery: string
};

export type CollectionType = 'trendyVideos' | 'myFavoriteVideos' | 'searchVideos'

export interface FetchVideosParams {
    collectionType: CollectionType;
    add: boolean;
    query?: string;
    page?: string;
}


