import React,  { useState, useEffect } from 'react';
import css from './Header.module.css';
import publicUrl from '../utils/publicUrl';
import Music from './Music';



function Header(props) {

    const [newartist, setNewartist] = useState('');
    const [hitsearch, setHitsearch] = useState(false);


    function handleChange(event) {
        setNewartist(event.target.value);
        // setNewartist(previousVal => previousVal[0].toUpperCase() + previousVal.slice(1));
    }

    function handleSearch() {
        console.log(newartist, "this should be upper case @#$%^&*(");
        props.onGetData(newartist);

        console.log(props.bigdata.data, "bigdata from header");
        console.log(props.bigdata.albums, "albumssssss")
        setHitsearch(true);
    }


    return  (
        <div>
            <div className={css.imuzika_header_container}>
                <h2>iMuzika</h2>
                <div className={css.imuzika_header}>
                    <input type="text" placeholder="Arist Name" onChange={handleChange}/>
                    <button onClick={handleSearch}>
                        <img src={publicUrl('/assets/explore.svg')} alt="Home"/>
                    </button>
                </div>
                
            </div>
            
            <div>
                {
                    (
                        props.bigdata ? (
                            <div >
                                <div className={css.music_topInfo}>
                                    <div className={css.detail_decoration}>
                                        <p className={css.pfont}>{ props.bigdata.singles.length + props.bigdata.albums.length} results</p>
                                    </div>
                                    <div >
                                        <h1>{(props.bigdata.artist).toUpperCase()}</h1>
                                    </div>
                                    <div className={css.flexing}>
                                        {
                                            props.bigdata.genre.slice(0,8).map(musicType =>
                                                <p className={css.detail_decoration, css.pfontmedium}>{musicType}</p>
                                        )}
                                    </div>
                                </div>
                                

                                <div className={css.music_display}>

                                    {props.bigdata.data.map(music => 
                                        <Music key={props.bigdata.data.indexOf(music)} music={music}/>
                                    )}
                                </div>
   
                        
                            </div>
                        ) :
                        (
                            <p>no results found</p>
                        )
                    )
                
                }
            </div>
        </div>
    )
}

export default Header;