// import React from 'react'
// import axios from 'axios'

// // https://www.geeksforgeeks.org/ip-address-finder-app-using-reactjs/


// const IPFinder = () => {
//     return (
//         <div>IPFinder</div>
//     )
// }

// export default IPFinder


import { useEffect, useState } from 'react';
import Axios from 'axios';
import Map from './Map';
import '../App.css';
import "./ipfinder.css"
function App() {

    // Setting up the initial state variables 
    const [ipDetails, setIpDetails] = useState([]);
    const [lat, setLat] = useState(22.5726);
    const [lon, setLon] = useState(88.3832);

    // Fetching the API once when the 
    // component is mounted 
    useEffect(() => {
        Axios.get('https://ipapi.co/json/').then((res) => {
            setIpDetails(res.data);
            setLat(res.data.latitude);
            setLon(res.data.longitude);
        });
    }, [])

    return (
        <>
            {console.log(ipDetails)}
            <h1 className="heading">IP Address Finder</h1>
            <div className="App">
                <div className="left">
                    <h4>What is my IPv4 address?</h4>
                    <h1 id="ip">{ipDetails.ip}</h1>
                    <h4>Approximate location: </h4>

                    <p>{ipDetails.city}, {ipDetails.region},
                        {ipDetails.country_name}.</p>


                    <h4>Internet Service Provider(ISP):</h4>

                    <p>{ipDetails.org}</p>

                </div>
                <Map lat={lat} lon={lon} />
            </div>
        </>
    );
}

export default App;