import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './movie-grid.scss';
import InfiniteScroll from "../../common/infinite-scroll/infinite-scroll";
import {CollectionType, FetchVideosParams, VideoState} from "../../store/video/types";
import {fetchVideos} from "../../store/video/action";
import MovieCard from "../movie-card/movie-card";
import {BiLoader} from "react-icons/bi";
import {TransitionGroup} from "react-transition-group";
import {NavigationReducerState} from "../../store/navigation/types";

interface MovieGridProps {
    collectionType: CollectionType
}

function MovieGrid(props: MovieGridProps) {
    const videoStore = useSelector((state: { video: VideoState }) => state.video)
    const dispatch = useDispatch();
    const navigationStore = useSelector((state: { navigation: NavigationReducerState }) => state.navigation)

    useEffect(() => {
        //fetch initial videos if list is empty
        console.log('fetch')
        if ((props.collectionType === "trendyVideos" && videoStore.trendyVideos.videos.length < 30)) {
            console.log('fetch2')
            dispatch(fetchVideos({collectionType: props.collectionType, add: false}))
        } else if (props.collectionType === 'myFavoriteVideos' && videoStore.myFavoriteVideos.videos.length < 30) {
            console.log('fetch3')
            dispatch(fetchVideos({collectionType: props.collectionType, add: true}))
        }
    }, [props.collectionType]);
    const loadMore = () => {
        console.log('grid load more')
        const token = videoStore[props.collectionType].nextPageToken;
        const searchOf = videoStore.searchQuery.length ? navigationStore.mode === "Trends" ? "trendyVideos" : "myFavoriteVideos" : null

        if (token) {
            const fetchVideosParams: FetchVideosParams = {
                collectionType: props.collectionType,
                add: true,
                page: token
            }
            if (searchOf) {
                fetchVideosParams.searchOf = searchOf;
                fetchVideosParams.query = videoStore.searchQuery
            }
            dispatch(fetchVideos(fetchVideosParams))
        }
    }
    return (
        <TransitionGroup>
            <InfiniteScroll externalListWrapperClassName={"movie-grid inner-scroller-y"}
                            loader={<div className="movie-grid__loader"><BiLoader/></div>}
                            hasMore={videoStore[props.collectionType].nextPageToken !== null} loadMore={loadMore}>

                {videoStore[props.collectionType].videos.map((videoData, index) => {
                    if (!videoData) return null;
                    return (
                        <MovieCard key={`mg-${videoData.id}`}
                                   movieData={videoData}/>
                    )
                })}
            </InfiniteScroll>
        </TransitionGroup>
    );
}

export default MovieGrid;