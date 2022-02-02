import React,  { useState } from 'react';
import css from './Home.module.css';
import publicUrl from '../utils/publicUrl';
import {
    Link
  } from "react-router-dom";
  


function Home (props) {

    const [newartist, setNewartist] = useState('');

    function handleChange(event) {
        setNewartist(event.target.value);
        setNewartist(previousVal => previousVal[0].toUpperCase() + previousVal.slice(1));
        console.log(event.target.value, "being typed in home")
        // console.log(newartist, "this is new artist");
        // props.onGetData(newartist);
    }

    function handleSubmit(event) {
        console.log(newartist, "this is the variable to be sent to app");
        props.onGetData(newartist);

    }



    return  (
        <div className={css.imuzika}>
            <h1>I MUZIKA</h1>
            {/* <p>IMuzika</p> */}
            <div className={css.imuzika_header}>
                <input type="text" placeholder="Arist Name" onChange={handleChange}/>
                <img src={publicUrl('/assets/explore.svg')} alt="Home"/>
            </div>
            <div className={css.imuzika_search_options}>
                <div>
                    <Link to='/Header'>
                        <button onClick={handleSubmit}>
                            <p>Search</p>
                        </button>
                    </Link>
                </div>
                <div>
                    <Link to='/Header'>
                        <button>
                            <p>Discover</p>
                        </button>
                    </Link>
                </div>
            
            </div>
            
        </div>
    )
}

export default Home;