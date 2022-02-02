import React from 'react';
import css from './Music.module.css';
import { BrowserRouter as Router, Route, Routes, Link, generatePath } from 'react-router-dom';


function Music(prop) {

    // console.log(prop, "prop in music")
    const title = prop.music.collectionCensoredName.length > 20 ? prop.music.collectionCensoredName.substring(0, 20) + "..." : prop.music.collectionCensoredName;
    const length = prop.music.trackCount;
    

    return (

        <a className={css.music_container} href={prop.music.collectionViewUrl} target="_blank" rel="noopener noreferrer">
            <img className={css.music_display_img} src={prop.music.artworkUrl100} alt=""/>
            {( length > 1 ? (
                    <p>Album</p>
                        ) : (
                            <p>Single</p>
                        )
            )}
                <p>{title}</p>
        </a>

       
    )
}

export default Music
