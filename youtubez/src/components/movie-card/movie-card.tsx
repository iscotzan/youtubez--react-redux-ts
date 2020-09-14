import React, {useCallback, useEffect, useState} from 'react';
import {VideoData} from "../../model";
import './movie-card.scss'
import {useDispatch} from "react-redux";
import {removeVideo, saveVideo, selectVideo} from "../../store/video/action";
import {api} from "../../api";
import {FaRegStar, FaStar} from 'react-icons/fa'
import {CSSTransition} from 'react-transition-group';
import {textTruncate} from "../../helpers/text-truncate";
import FavoriteButton from "./favorite-button/favorite-button";
import {toggleModalOpen} from "../../store/modal-dialog/action";

interface MovieCardProps {
    movieData: VideoData
}

function MovieCard(props: MovieCardProps) {
    const dispatch = useDispatch();
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [isImgReady, setIsImageReady] = useState<boolean>(false);
    const checkIsFavorite = useCallback(() => {
        api.get(`/videos/isFavorite/${props.movieData.id}`).then(res => {
            const favorite = res.data === 1
            return setIsFavorite(favorite)
        })
    },[props.movieData.id])
    useEffect(() => {
        //check if favorite
        checkIsFavorite()
    }, [checkIsFavorite])

    const removeFromFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsFavorite(false);
        dispatch(removeVideo(props.movieData.id))
    }
    const addToFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsFavorite(true)
        dispatch(saveVideo(props.movieData))
    }
    const imgReady = () => {
        setIsImageReady(true)
    }
    const openMoviePlayer = () => {
        dispatch(selectVideo(props.movieData))
        dispatch(toggleModalOpen())
    }
    return (
        <CSSTransition in={isImgReady} timeout={200} classNames="movie-card">
            <div className="movie-card" onClick={openMoviePlayer}>
                <img onLoad={imgReady} className="movie-card__img" src={props.movieData.thumbnailUrl}
                     alt="movie thumbnail"/>
                <h3 title={props.movieData.title}
                    className="movie-card__title">{textTruncate(props.movieData.title, 43, '...')}</h3>
                <div>
                    <FavoriteButton
                        onClick={isFavorite ? removeFromFavorites : addToFavorites}
                        externalClassName={isFavorite ? 'movie-card__favorite-button remove-from' : 'movie-card__favorite-button add-to'}
                        icon={isFavorite ? <FaStar/> : <FaRegStar/>}/>
                </div>
            </div>
        </CSSTransition>
    );
}

export default MovieCard;