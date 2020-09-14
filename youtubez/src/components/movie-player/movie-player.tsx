import React, {useCallback, useEffect, useState} from 'react';
import Modal from 'react-modal';
import {useDispatch, useSelector} from "react-redux";
import {VideoState} from "../../store/video/types";
import {ModalDialogState} from "../../store/modal-dialog/types";
import {removeVideo, saveVideo} from "../../store/video/action";
import {toggleModalOpen} from "../../store/modal-dialog/action";
import YouTube from "react-youtube";
import {useMediaQuery} from "react-responsive";
import FavoriteButton from "../movie-card/favorite-button/favorite-button";
import {FaRegStar, FaStar} from "react-icons/fa";
import {api} from "../../api";
import {AiTwotoneLike, AiTwotoneDislike, AiOutlineEye, AiOutlineCloseCircle} from 'react-icons/ai'
import './movie-player.scss'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

interface MoviePlayerProps {

}

Modal.setAppElement('#root')

function MoviePlayer(props: MoviePlayerProps) {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const modalDialogStore = useSelector((state: { modalDialog: ModalDialogState }) => state.modalDialog)
    const videoStore = useSelector((state: { video: VideoState }) => state.video)
    const dispatch = useDispatch();
    const isSmallScreen = useMediaQuery({maxWidth: 666})
    const checkIsFavorite = useCallback(() => {
        if (videoStore.selectedVideo) {
            api.get(`/videos/isFavorite/${videoStore.selectedVideo.id}`).then(res => {
                const favorite = res.data === 1
                return setIsFavorite(favorite)
            })
        }
    }, [isFavorite, videoStore.selectedVideo])
    useEffect(() => {
        //check if favorite
        checkIsFavorite();

    }, [checkIsFavorite])

    function closeModal() {
        dispatch(toggleModalOpen())
    }

    const _onReady = (event: any) => {
        // event.target.pauseVideo();
    }
    const removeFromFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (videoStore.selectedVideo) {
            e.stopPropagation();
            setIsFavorite(false);
            dispatch(removeVideo(videoStore.selectedVideo.id))
        }
    }
    const addToFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (videoStore.selectedVideo) {
            e.stopPropagation();
            setIsFavorite(true)
            dispatch(saveVideo(videoStore.selectedVideo))
        }
    }
    const playerWidth = isSmallScreen ? (window.innerWidth - 100) : (window.innerWidth / 2)
    const playerHeight = isSmallScreen ? (window.innerHeight - 200) : (window.innerHeight / 2)
    return (
        <div>
            <Modal
                isOpen={modalDialogStore.modalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel={videoStore.selectedVideo?.title}
                overlayClassName="movie-player-modal-overlay"
                className="movie-player-modal"

            >
                <div>
                    {videoStore.selectedVideo ?
                        <div className="movie-player-modal__movie-player">
                            <div>
                                <button className="movie-player-modal__movie-player__close-modal"
                                        onClick={closeModal}>
                                    <AiOutlineCloseCircle/>
                                </button>
                                <YouTube videoId={videoStore.selectedVideo.id} opts={{
                                    height: playerHeight.toString(),
                                    width: playerWidth.toString(),
                                    playerVars: {autoplay: 1, showinfo: 1, origin: window.location.origin}
                                }} onReady={_onReady}/>
                                <div className="movie-player-modal__movie-player__title">
                                <span style={{maxWidth: `${playerWidth - 20}px`}}>
                                 {videoStore.selectedVideo.title}
                                </span>
                                    <FavoriteButton
                                        onClick={isFavorite ? removeFromFavorites : addToFavorites}
                                        externalClassName={isFavorite ? 'movie-player-modal__movie-player__favorite-button remove-from' : 'movie-player-modal__movie-player__favorite-button add-to'}
                                        icon={isFavorite ? <FaStar/> : <FaRegStar/>}/>
                                </div>
                                <div className="movie-player-modal__movie-player__details">
                                    <div className="movie-player-modal__movie-player__details__likes">
                                        <span>{videoStore.selectedVideo.likeCount}</span>
                                        <AiTwotoneLike/>
                                    </div>
                                    <div className="movie-player-modal__movie-player__details__dislikes">
                                        <span>{videoStore.selectedVideo.dislikeCount}</span>
                                        <AiTwotoneDislike/>
                                    </div>
                                    <div className="movie-player-modal__movie-player__details__view-count">
                                        <span>{videoStore.selectedVideo.viewCount}</span>
                                        <AiOutlineEye/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null}
                </div>
                {/*<form>*/}
                {/*    <input/>*/}
                {/*    <button>tab navigation</button>*/}
                {/*    <button>stays</button>*/}
                {/*    <button>inside</button>*/}
                {/*    <button>the modal</button>*/}
                {/*</form>*/}
            </Modal>
        </div>
    );
}

export default MoviePlayer;