import React from 'react';
import {useSelector} from "react-redux";
import {NavigationReducerState} from "../../store/navigation/types";
import {VideoState} from "../../store/video/types";
import MovieGrid from "../movie-grid/movie-grid";
import './dashboard.scss'
import MoviePlayer from "../movie-player/movie-player";

interface DashboardProps {

}

function Dashboard(props: DashboardProps) {
    const navigationStore = useSelector((state: { navigation: NavigationReducerState }) => state.navigation)
    const videoState = useSelector((state: { video: VideoState }) => state.video)
    let currentView: React.ReactNode = <div/>;
    if (videoState.searchVideos.videos.length) {
        currentView = <MovieGrid collectionType={"searchVideos"}/>
    } else if (navigationStore.mode === "My Library") {
        currentView = <MovieGrid collectionType={"myFavoriteVideos"}/>
    } else if (navigationStore.mode === "Trends") {
        currentView = <MovieGrid collectionType={"trendyVideos"}/>
        // currentView = <MovieGrid collectionType={"myFavoriteVideos"}/>
    }

    return (
        <div className="dashboard">
            <MoviePlayer/>
            <div className="dashboard__view-wrapper"> {currentView}</div>

        </div>
    );
}

export default Dashboard;