import React,  { useState, useEffect } from 'react';
import Header from './Header';
import Home from './Home'
import './App.css';
import Axios from 'axios' ;
import { BrowserRouter as Router, Route, Routes, Link, generatePath } from 'react-router-dom';





function App() {

  const [bigdata, setBigdata] = useState({artist: '', data: [], singles: [], albums: [], features: [], artistLink: '', artistImg: '', genre: []})

  function getData(val) {
    const firstendpoint = "https://itunes.apple.com/search?term=${"+val+"}&media=music&entity=album&attribute=artistTerm&limit=200";
    console.log(firstendpoint, "firstend point api location")
    Axios.get(firstendpoint, 
      {
        headers: {
        "Access-Control-Allow-Origin": "*",
        },
    }).then((response) => {
      console.log(response.data.results, "this is the first contact")
      const dataArray = response.data.results;
      SortingData(dataArray, val); 
    })
  }


  function SortingData(dataArray, val) {

    const result = [];
    const arrayoftotalTitles = [];

    const genreList = [];

    const andartist = '& ' + val;
    const featartist = 'feat. ' + val;
    console.log(andartist, featartist, "this should workkkkkkkk");
    console.log(dataArray, "data array should be the bases to change everything")

    // const features = [];

    const singlesChecking = [];
    const albumsChecking = [];

    for (const arr in dataArray) {
        if (!arrayoftotalTitles.includes(dataArray[arr].collectionCensoredName) && dataArray[arr].artistName.toLowerCase() == val.toLowerCase()){
            arrayoftotalTitles.push(dataArray[arr].collectionCensoredName);
            result.push(dataArray[arr]);
            if(!genreList.includes(dataArray[arr].primaryGenreName)) {genreList.push(dataArray[arr].primaryGenreName)}
            if (dataArray[arr].trackCount > 1 && dataArray[arr].artistName.toLowerCase() == val.toLowerCase()) {
              albumsChecking.push(dataArray[arr]);
            }
            else if ( dataArray[arr].trackCount == 1 && dataArray[arr].artistName.toLowerCase() == val.toLowerCase()) {
              singlesChecking.push(dataArray[arr]);
            }
            else if ( dataArray[arr].trackCount == 1 && dataArray[arr].collectionCensoredName.incldues(andartist)) {
              singlesChecking.push(dataArray[arr]);
            }
            
        }
    }

    console.log(singlesChecking, "singlesasdfsdfasdf");
    console.log(albumsChecking, "albums wffsdfsadf");
    console.log(result, "result should be filtered");
    console.log(genreList, "genre list")

    setBigdata({
      ...bigdata,
      data: result,
      singles: singlesChecking,
      albums: albumsChecking,
      artist: val,
      // artistLink: result[0].artistViewUrl,
      // artistImg: result[0].artworkUrl100,
      genre: genreList
    });

    return result;

  }


  return (
    <Router basename={process.env.PUBLIC_URL}>
      {/* <p>Hello {bigdata.artist} </p> */}
      <div className="App">
        <Routes>
          <Route path="/Header" caseSensitive={false} element={<Header bigdata={bigdata} onGetData={getData} />}/>
          <Route path="/" caseSensitive={false} element={<Home onGetData={getData} bigdata={bigdata}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

