import React, { useEffect, useState } from 'react'; 
import ReactMapGL, { Marker } from 'react-map-gl'; 
// import { RiUserLocationFill } from 'react-icons/ri'; 
  
// const API_KEY = 'pk.eyJ1IjoibW1jZ3JhaW4yMyIsImEiOiJjbHpsczJ0ZGYwNWljMnBwcTd4d2kzZHpmIn0.Nq_4uizdH8yB6cSsmvYWzw'; 
const API_KEY = 'pk.eyJ1IjoibW1jZ3JhaW4yMyIsImEiOiJjbHpsczJ0ZGYwNWljMnBwcTd4d2kzZHpmIn0.Nq_4uizdH8yB6cSsmvYWzw'; 
  
const Map = ({ lat, lon }) => { 
  
    // Setting up the initial viewport of the map 
    const [viewport, setViewport] = useState({ 
        latitude: lat, 
        longitude: lon, 
        zoom: 14, 
        bearing: 0, 
        pitch: 0, 
        width: '100%', 
        height: '100%', 
    }); 
  
    // Viewport re-renders whenever latitude 
    // and longitude changes 
    useEffect(() => { 
        const a = { ...viewport }; 
        a.latitude = lat; 
        a.longitude = lon; 
        setViewport(a); 
    }, [lat, lon]); 
  
    return ( 
        <div className="map"> 
            <ReactMapGL 
                // mapboxAccessToken='pk.eyJ1IjoibW1jZ3JhaW4yMyIsImEiOiJjbHpsdHY1dnEwNzF6MmpwbmVpcXpjbGt3In0.DafdzeofApGdV3RlVQTrGQ'
                mapboxAccessToken={API_KEY}
                {...viewport} 
                onViewportChange={(viewport) => setViewport(viewport)} 
                mapStyle="mapbox://styles/mapbox/streets-v11"> 
                
                <Marker latitude={lat} longitude={lon}> 
                    <div className="mark"> 
                        {/* <RiUserLocationFill size="25px" color="blue" />  */}
                    </div> 
                </Marker> 
            </ReactMapGL> 
        </div> 
    ); 
}; 
  
export default Map;