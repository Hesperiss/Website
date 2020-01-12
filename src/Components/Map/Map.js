import React, {useState} from 'react';
import {GoogleMap, Marker, Autocomplete } from '@react-google-maps/api'
import {mapOptions} from "./MapOptions";
import hospitalIcon from "../../Images/map_marker.png"

function Map() {

    const [center] = useState({ lat: 48.8566, lng: 2.3522});
    //const [mapRef, setMapRef] = useState(null);
    const [userPos] = useState({ lat: 48.8566, lng: 2.3522});
    const [searchRadius] = useState(1500);
    const [zoom] = useState(15);
    const [hospitals, setHospitals] = useState([]);
    const [hospitalMarkers, setHospitalMarkers] = useState(null);

    const findNearestHospitals = map => {
        let service = new window.google.maps.places.PlacesService(map);
        let pos = new window.google.maps.LatLng(userPos.lat, userPos.lng);
        var request = {
            location: pos,
            radius: searchRadius,
            type: 'hospital'
        };
        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                let markerList = [];
                setHospitals(results);
                console.log(hospitals);
                for (let i = 0; i < results.length; i++) {
                    markerList.push(<Marker
                        // label={results[i].name}
                        position={results[i].geometry.location}
                        icon={hospitalIcon}
                    />);
                }
                setHospitalMarkers(markerList);
            }
        })
    };

    const loadHandler = map => {

        //Store a reference to the google map instance in state
        //setMapRef(map);

        //fetch nearest hospitals
        findNearestHospitals(map);

    };

    const renderMap = () => {

        return <GoogleMap
            options={mapOptions}
            zoom={zoom}
            center={center}
            mapContainerStyle={{
                height: "100vh",
                width: "100vwh"
            }}
            onLoad={map => loadHandler(map)}
        >
                <Autocomplete>
                    <input
                        type="text"
                        placeholder="Rechercher une adresse"
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `240px`,
                            height: `32px`,
                            padding: `0 12px`,
                            borderRadius: `10px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `14px`,
                            outline: `none`,
                            textOverflow: `ellipses`,
                            position: "fixed",
                            margin: "30px"
                        }}
                    />
                </Autocomplete>
            {hospitalMarkers}
        </GoogleMap>
    };

    return renderMap();
}

export default Map;