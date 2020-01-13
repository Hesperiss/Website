import React, {useState} from 'react';
import {GoogleMap, Marker, Autocomplete, InfoWindow, DirectionsService} from '@react-google-maps/api'
import {mapOptions} from "./MapOptions";
import hospitalIcon from "../../Images/map_marker.png"
import styles from "./Map.scss"

function Map() {

    //state declaration and management
    const [center] = useState({ lat: 48.8566, lng: 2.3522});
    const [mapRef, setMapRef] = useState(null);
    const [markerMap, setMarkerMap] = useState({});
    const [userPos] = useState({ lat: 48.8566, lng: 2.3522});
    const [searchRadius] = useState(1500);
    const [zoom] = useState(15);
    const [hospitalMarkers, setHospitalMarkers] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [infoOpen, setInfoOpen] = useState(false);
    const [placeDetails, setPlaceDetails] = useState(null);

    //open corresponding info box (with hospital details) on marker click
    const onMarkerClick = (event, place, id, map) => {

        setInfoOpen(false);
        requestHospitaldetails(id, map);
        setSelectedPlace(place);
        setInfoOpen(true);

    };

    //fetch hospital information
    const requestHospitaldetails = (id, map) => {
        console.log(id);
        let request = {
            placeId: id,
            fields: ['name', 'address_component', 'formatted_phone_number', 'geometry', 'rating', 'opening_hours']
        };
        let service = new window.google.maps.places.PlacesService(map);
        service.getDetails(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setPlaceDetails(results);
            }
            else setPlaceDetails(null);
        })
    };

    const onMarkerLoad = (marker, place) => {
        return setMarkerMap(prevState => {
            return { ...prevState, [place.id]: marker };
        });
    };

    //fetch nerast hospitals
    const findNearestHospitals = (map) => {
        let request = {
            location: userPos,
            radius: searchRadius,
            types: ["hospital", "health", "point_of_interest"],
            keyword: "(emergency) AND ((medical centre) OR hospital)"
        };
        let service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                let markerList = [];
                for (let i = 0; i < results.length; i++) {
                        markerList.push(<Marker
                        key={results[i].id}
                        position={results[i].geometry.location}
                        icon={hospitalIcon}
                        onLoad={marker => onMarkerLoad(marker, results[i])}
                        onClick={event => onMarkerClick(event, results[i], results[i].place_id, map)}
                    />);
                }
                setHospitalMarkers(markerList);
            }
        })
    };

    const loadHandler = map => {
        //Store a reference to the google map instance in state
        setMapRef(map);
        console.log(mapRef);
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
                        placeholder="Rechercher une adresse..."
                        className={styles.mapInfoBox}
                    />
                </Autocomplete>
            {infoOpen && selectedPlace && (
                <InfoWindow
                    anchor={markerMap[selectedPlace.id]}
                    onCloseClick={() => setInfoOpen(false)}
                >
                    <div>
                        {placeDetails ?
                        <div>
                            <h3 className={styles.hospitalName}>{placeDetails.name}</h3>
                            <p><b>Addresse :</b> {placeDetails.address_components[0].short_name + ' ' + placeDetails.address_components[1].short_name }</p>
                            <p><b>Téléphone :</b> {placeDetails.formatted_phone_number}</p>
                            <p><b>Notation :</b> {placeDetails.rating ? placeDetails.rating : "inconnue"}</p>
                            {placeDetails.opening_hours && placeDetails.opening_hours.isOpen() ?<p><b>Actuellement ouvert</b></p> : null}
                        </div>
                        : <div>Chargement...</div>}
                    </div>
                </InfoWindow>
            )}
            {hospitalMarkers}
        </GoogleMap>
    };

    return renderMap();
}

export default Map;