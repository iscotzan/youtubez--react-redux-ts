import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './movie-grid.scss';
import InfiniteScroll from "../../common/infinite-scroll/infinite-scroll";
import {CollectionType, FetchVideosParams, VideoState} from "../../store/video/types";
import {fetchVideos} from "../../store/video/action";
import MovieCard from "../movie-card/movie-card";
import {BiLoader} from "react-icons/bi";
import {TransitionGroup} from "react-transition-group";

interface MovieGridProps {
    collectionType: CollectionType
}

function MovieGrid(props: MovieGridProps) {
    const videoStore = useSelector((state: { video: VideoState }) => state.video)
    const dispatch = useDispatch();

    useEffect(() => {
        //fetch initial videos if list is empty
        if (props.collectionType !== "searchVideos" && !videoStore[props.collectionType].videos.length) {
            dispatch(fetchVideos({collectionType: props.collectionType, add: false}))
        }
    }, [props.collectionType]);
    const loadMore = () => {

        const token = videoStore[props.collectionType].nextPageToken;
        if (token) {
            const fetchVideosParams: FetchVideosParams = {
                collectionType: props.collectionType,
                add: true,
                page: token
            }
            if (videoStore.searchQuery.length) {
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