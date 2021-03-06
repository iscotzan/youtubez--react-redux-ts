import React, {useCallback, useEffect, useRef, useState} from 'react';
import './search.scss'
import {useDispatch, useSelector} from "react-redux";
import {VideoState} from "../../store/video/types";
import {clearSearch, fetchVideos, updateSearchQuery} from "../../store/video/action";
import InfiniteScroll from "../../common/infinite-scroll/infinite-scroll";
import {BiLoader} from 'react-icons/bi'
import {debounce} from 'lodash';
import {NavigationReducerState} from "../../store/navigation/types";

interface SearchProps {

}

function Search(props: SearchProps) {
    const [display, setDisplay] = useState(false);
    const wrapperRef = useRef<any>(null);
    const videoStore = useSelector((state: { video: VideoState }) => state.video)
    const navigationStore = useSelector((state: { navigation: NavigationReducerState }) => state.navigation)

    const dispatch = useDispatch();
    const delayedQuery = useCallback(debounce(q => dispatch(fetchVideos(q)), 500), []);
    useEffect(() => {
        if (videoStore.searchQuery.length) {
            console.log('searching')
            const searchOf = navigationStore.mode === "Trends" ? "trendyVideos" : "myFavoriteVideos"
            console.log('search of ', searchOf)
            dispatch(fetchVideos({
                collectionType: "searchVideos",
                query: videoStore.searchQuery,
                add: false,
                searchOf: searchOf
            }))
        } else {
            dispatch(clearSearch());
        }
    }, [navigationStore.mode]);

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setDisplay(false);
            }
        }
    };
    const loadMore = () => {
        if (videoStore.searchVideos.nextPageToken) {
            const searchOf = navigationStore.mode === "Trends" ? "trendyVideos" : "myFavoriteVideos"
            console.log('search of ', searchOf)
            dispatch(fetchVideos({
                collectionType: "searchVideos",
                query: videoStore.searchQuery,
                add: true,
                page: videoStore.searchVideos.nextPageToken,
                searchOf: searchOf
            }))
        }
    }
    const updateSearch = (searchString: string) => {
        dispatch(updateSearchQuery(searchString))
        setDisplay(false);
    };
    const onSearchInput = (text: string) => {
        dispatch(updateSearchQuery(text))
        const searchOf = navigationStore.mode === "Trends" ? "trendyVideos" : "myFavoriteVideos"
        delayedQuery({collectionType: "searchVideos", query: text, add: false, searchOf: searchOf});
    }
    return (
        <div ref={wrapperRef} className="auto-complete-search">
            <input
                id="auto"
                className="auto-complete-search__input"
                onClick={() => setDisplay(!display)}
                placeholder="Type to search"
                autoComplete="off"
                value={videoStore.searchQuery}
                onChange={event => onSearchInput(event.target.value)}
            />
            {display && videoStore.searchVideos.videos.length ?
                <div className="auto-complete-search__options-container inner-scroller-y">
                    <InfiniteScroll
                        loader={<div className="auto-complete-search__options-container__loader"><BiLoader/></div>}
                        externalListWrapperClassName={'inner-scroller-y'}
                        hasMore={videoStore.searchVideos.nextPageToken !== null} loadMore={loadMore}>
                        {videoStore.searchVideos.videos.map((value, i) => {
                            return (
                                <div
                                    onClick={() => updateSearch(value.title)}
                                    className="auto-complete-search__options-container__option"
                                    key={`acs-${value.id}`}
                                    tabIndex={0}
                                >
                                    {/*{textTruncate(value.title, 28, '...')}*/}
                                    <span>
                                    {value.title.toLowerCase()}
                                    </span>
                                </div>
                            );
                        })}
                    </InfiniteScroll>
                </div>
                : null}
        </div>
    );
}

export default Search;
