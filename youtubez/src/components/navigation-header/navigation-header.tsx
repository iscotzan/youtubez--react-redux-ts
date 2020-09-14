import React, { useRef, useState} from 'react';
import Search from "../search/search";
import './navigation-header.scss'
import {useDispatch, useSelector} from "react-redux";
import {NavigationMode, NavigationReducerState} from "../../store/navigation/types";
import {switchMode} from "../../store/navigation/action";
import {createUseStyles} from "react-jss";
import {RiMovieFill} from 'react-icons/ri'
import {ImFire} from 'react-icons/im'
import {VscLibrary} from 'react-icons/vsc'
import MediaQuery, {useMediaQuery} from 'react-responsive'

interface NavigationHeaderProps {

}

function NavigationHeader(props: NavigationHeaderProps) {
    const navigationStore = useSelector((state: { navigation: NavigationReducerState }) => state.navigation)
    const dispatch = useDispatch();
    const linkButtonTrend = useRef(null);
    const linkButtonMyVideos = useRef(null);
    const isSmallScreen = useMediaQuery({maxWidth: 759})

    // const globalNavigationState: NavigationReducerState = store.getState().navigation;
    const linksGroupRef: React.MutableRefObject<any> = useRef(null);
    const activeLinkIndicatorInitialState = isSmallScreen ?
        {fromLeft: 10, linkNameWidth: 48,} : {fromLeft: 10, linkNameWidth: 119.125,}
    const [activeLinkX, setActiveLinkX] = useState(activeLinkIndicatorInitialState);

    const useStyles = createUseStyles({
        activeLinkIndicatorStyle: {
            transform: (props) => `translateX(${props.fromLeft}px)`,
            width: (props) => `${props.linkNameWidth}px`,
        }
    });
    const updateIndicatorLocation = (linkElRef: React.MutableRefObject<any>) => {
        const node = linkElRef.current;
        if (node) {
            const elementRect = node.getBoundingClientRect();
            const activeLinkSettings = {
                fromLeft:
                linkElRef.current.offsetLeft,
                linkNameWidth: elementRect.width,
            }
            setActiveLinkX(activeLinkSettings);
        }
    }
    const handleSwitchMode = (linkElRef: React.MutableRefObject<any>, mode: NavigationMode) => {
        updateIndicatorLocation(linkElRef)
        dispatch(switchMode(mode))
    }
    const classes = useStyles(activeLinkX);

    return (
        <div className="navigation-header">
            <div className="navigation-header__left">
                <span className="navigation-header__logo">
                <MediaQuery minWidth={760}><span
                    className="navigation-header__logo__title">YouTubez</span></MediaQuery>
                    <RiMovieFill/></span>
            </div>
            <div className="navigation-header__center">
                <div className="navigation-header__search-bar-wrapper"><Search/></div>
            </div>
            <div className="navigation-header__right">
                <div className="navigation-header__navigation-buttons" ref={linksGroupRef}>
                    <div
                        className={`navigation-header__navigation-buttons__active-route-indicator ${classes.activeLinkIndicatorStyle}`}/>
                    <button
                        className={`navigation-header__navigation-buttons__button ${navigationStore.mode === "Trends" ? 'navigation-header__navigation-buttons__button--is-active' : ''}`}
                        ref={linkButtonTrend} onClick={(e) => handleSwitchMode(linkButtonTrend, "Trends")}>
                        <MediaQuery minWidth={760}><span
                            className="navigation-header__navigation-buttons__button__title">Trends</span></MediaQuery>
                        <ImFire/>
                    </button>
                    <button
                        className={`navigation-header__navigation-buttons__button ${navigationStore.mode === "My Library" ? 'navigation-header__navigation-buttons__button--is-active' : ''}`}
                        ref={linkButtonMyVideos} onClick={(e) => handleSwitchMode(linkButtonMyVideos, "My Library")}>
                        <MediaQuery minWidth={760}><span
                            className="navigation-header__navigation-buttons__button__title">My Library</span></MediaQuery>
                        <VscLibrary/>
                    </button>
                </div>
            </div>

        </div>
    );
}

export default NavigationHeader
;