import React, {useState} from 'react';
import {GoogleMap, Marker, Autocomplete, InfoWindow, DirectionsService, DirectionsRenderer} from '@react-google-maps/api'
import {mapOptions} from "./Shared/MapOptions";
import hospitalIcon from "../../Images/map_marker.png"
import userIcon from "../../Images/user_marker.png"
import styles from "./Map.scss"

function Map() {

    //state declaration and management
    const [center] = useState({ lat: 48.8566, lng: 2.3522});
    const [mapRef, setMapRef] = useState(null);
    const [markerMap, setMarkerMap] = useState({});
    const [userPos, setUserPos] = useState({ lat: 48.8566, lng: 2.3522});
    const [searchRadius] = useState(1500);
    const [zoom] = useState(13);
    const [hospitalMarkers, setHospitalMarkers] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [infoOpen, setInfoOpen] = useState(false);
    const [placeDetails, setPlaceDetails] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const [userMarker, setUserMarker] = useState(null);
    const [userTravelMode, setTravelMode] = useState('DRIVING');
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [userDestination, setDestination] = useState(null);

    //set center and user position to searched address when using search bar
    const onPlaceSearched = () => {

        if (autocomplete !== null) {

            //set new map center and user position
            let newCenter = autocomplete.getPlace().geometry.location;
            mapRef.setCenter(newCenter);
            setUserPos(newCenter);
            userMarker.setPosition(newCenter);

            //delete old markers and update hospitals nearby
            setInfoOpen(false);
            setHospitalMarkers(null);
            findNearestHospitals(mapRef, newCenter);

        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    };

    //set reference to autocomplete search bar
    const onLoadAutocomplete = (searchBar) => {
        setAutocomplete(searchBar);
    };

    //open corresponding info box (with hospital details) on marker click
    const onMarkerClick = (event, place, id, map) => {

        setInfoOpen(false);
        requestHospitaldetails(id, map);
        setSelectedPlace(place);
        if (!userDestination || userDestination !== place.geometry.location) {
            setDestination(place.geometry.location);
        }
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

    //initialize hospital markers with google places API id
    const onMarkerLoad = (marker, place) => {
        return setMarkerMap(prevState => {
            return { ...prevState, [place.id]: marker };
        });
    };

    //fetch nerast hospitals
    const findNearestHospitals = (map, position) => {
        let request = {
            location: position,
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

    //store map reference in state and display hospitals near initial position
    const loadHandler = (map) => {
        setMapRef(map);
        findNearestHospitals(map, userPos);
    };

    //get directions to selected hospital
    const directionsCallback = (response) => {
        if (response !== null) {
            if (response.status === 'OK') {
                setDirectionsResponse(response);
            }
        }
    };

    const renderMap = () => {

        let sidePanel = <div className={styles.directionsPanel}> </div>;

        return <GoogleMap
            options={mapOptions}
            zoom={zoom}
            center={center}
            mapContainerStyle={{
                height: "100vh",
                width: "100vwh"
            }}
            onLoad={map => loadHandler(map)}>

                <Marker
                    position={userPos}
                    icon={userIcon}
                    onLoad={(marker) => setUserMarker(marker)} />

                <Autocomplete
                    onLoad={(searchBar) => onLoadAutocomplete(searchBar)}
                    onPlaceChanged={() => onPlaceSearched()}>
                    <input type="text" placeholder="Rechercher une adresse..." className={styles.mapSearchBar}                  />
                </Autocomplete>

                {infoOpen && selectedPlace && (
                    <InfoWindow
                        anchor={markerMap[selectedPlace.id]}
                        onCloseClick={() => setInfoOpen(false)}>
                        <div>
                            {placeDetails ?
                            <div>
                                <h3 className={styles.hospitalName}>{placeDetails.name}</h3>
                                <p><b>Addresse :</b> {placeDetails.address_components[0].short_name + ' ' + placeDetails.address_components[1].short_name }</p>
                                <p><b>Téléphone :</b> {placeDetails.formatted_phone_number}</p>
                                <p><b>Notation :</b> {placeDetails.rating ? placeDetails.rating : "inconnue"}</p>
                                {placeDetails.opening_hours && placeDetails.opening_hours.isOpen() ?<p><b>Actuellement ouvert</b></p> : null}
                            </div> : <div>Chargement...</div>}
                        </div>
                    </InfoWindow>
                )}

                {hospitalMarkers}

                {userDestination && < DirectionsService
                    options={{
                        destination: userDestination,
                        origin: userPos,
                        travelMode: userTravelMode,
                    }}
                    callback={(response) => directionsCallback(response)}
                    panel={sidePanel}
                /> }

                {directionsResponse && userDestination && (<DirectionsRenderer
                    options={{
                        directions: directionsResponse,
                        polylineOptions: {
                            strokeColor: "#952929"
                        },
                        suppressMarkers: true,
                    }}/>)}
            )}

        </GoogleMap>
    };

    return renderMap();
}

export default Map;