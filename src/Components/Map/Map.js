import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {FormattedMessage, useIntl} from 'react-intl';
import {
    GoogleMap,
    Marker,
    DirectionsService,
    Autocomplete,
    DirectionsRenderer
} from '@react-google-maps/api';
import {mapOptions} from "./Shared/MapOptions";
import userIcon from "../../Images/user_marker.png"
import "./Map.scss"
import {FaWalking, FaCar, FaBusAlt, FaHome, FaChevronLeft, FaCog} from "react-icons/all";
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import UberRidePopup from "./Shared/RequestUberPopup";
import NavBar from "../Landing/Components/Navbar";
import HospitalInfoPopup from "./Shared/HospitalInfoPopup";
import Drawer from '@material-ui/core/Drawer';
import {resultTypes, resultTypesIds} from './Shared/ResultTypes';
import {Checkbox, Menu} from "@material-ui/core";

/**
 * @module
 */

/**
 * Ceci est le composant correspondant à la carte de Kwili. Il contient les focntions d'itinéraire,
 * d'affichage des hôpitaux, et toutes les autres fonctions relatives à l'usage de la carte.
 * Ce composant est écrit comme un composant fonctionnel.
 * Ce composant repose sur l'utilisation de l'{@link https://developers.google.com/maps/documentation/javascript/reference/map object Map} de l'API Google Maps.
 *
 * @Class
 * @requires GoogleMap
 * @see {@link https://developers.google.com/maps/documentation/javascript/ documentation API Google Maps}
 */
function Map() {

    const intl = useIntl();

    //state declaration and management
    const [zoom] = useState(15);
    const [center] = useState({lat: 48.8566, lng: 2.3522});
    const [mapRef, setMapRef] = useState(null);
    const [markerMap, setMarkerMap] = useState({});
    const [userPos, setUserPos] = useState({lat: 48.8566, lng: 2.3522});
    const [searchRadius, setRadius] = useState(1500);
    const [resultsMarkers, setResultsMarkers] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [infoOpen, setInfoOpen] = useState(false);
    const [directionsPanel, setDirectionsPanel] = useState(false);
    const [placeDetails, setPlaceDetails] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const [userMarker, setUserMarker] = useState(null);
    const [userTravelMode, setTravelMode] = useState('DRIVING');
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [userDestination, setDestination] = useState(null);
    const [researchTags, setResearchTags] = useState([resultTypes.hospital]);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [openResultTypeMenu, setOpenResultTypeMenu] = useState(false);
    const [resultTypeMenuAnchor, setResultTypeMenuAnchor] = useState(null)

    /**
     * @TODO wrap findNearestResults in custom hook
     * When the radius, the research tag or the user position is updated,
     * Update nearby results
     */
    useEffect(() => {
        setInfoOpen(false);
        /* eslint-disable*/
        findNearestResults(mapRef, userPos);
    }, [researchTags, searchRadius, userPos, mapRef]);

    useEffect(() => {
        if (resultsMarkers && resultsMarkers.length >= 0)
            setDestination(resultsMarkers[0]?.position);
    }, [resultsMarkers]);

    /**
     * @TODO wrap findNearestResults in hook
     * if places api request has next page, do a request for the next page
     */
    useEffect(() => {
        if (nextPageToken) {
            // eslint-disable-next-line
            findNearestResults(mapRef, userPos, true);
        }
        setNextPageToken(null);
    }, [nextPageToken, mapRef, userPos]);

    /**
     * Définit le centre de la carte et la position de l'utilisasateur à l'adresse saisie
     * lorsque l'utilisateur utilise la barre de recherche d'adressse.
     */
    const onPlaceSearched = async () => {

        if (autocomplete !== null) {
            //set new map center and user position
            if (autocomplete.getPlace().geometry == null) return;
            const newCenter = autocomplete.getPlace().geometry.location;
            mapRef.setCenter(newCenter);
            setUserPos(newCenter);
            userMarker.setPosition(newCenter);
        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    };

    /**
     * Définit une référence à la barre d'automplétion d'adresseune fois l'autocomplétion chargée.
     * @param {Object} searchBar barre de recherche d'addresse
     */
    const onLoadAutocomplete = (searchBar) => {
        setAutocomplete(searchBar);
    };

    /**

     * Lorsque l'utilisateur clique sur le marqueur d'un hôpital, cette fonction en récupère les détails et ouvre
     * la boîte d'informations correspondante
     *
     * @async
     * @param {Event} event clickEvent sur le marqueur de l'hôpital
     * @param {Object} place hôpital sélectionné
     * @param {number} id hospital id de l'hôpital dans la liste des hôpitaux
     * @param {Object} map référence à l'object Map parent
     */
    const onMarkerClick = async (event, place, id, map) => {

        //update user destination if another hospital was previously selected
        if (!userDestination || userDestination !== place.geometry.location) {
            setDestination(place.geometry.location);
        }

        //if another info box is open, close it first
        //wait for hospital info actualization before opening info box
        await setInfoOpen(false);
        await requestHospitaldetails(id, map);
        await setSelectedPlace(place);
        setDirectionsPanel(true);
        await setInfoOpen(true);

    };

    /**
     * Récupère les informations détaillées sur un hôpital à partir de son ID
     * @param {number} id hospital id de l'hôpital dans la liste des hôpitaux
     * @param {Object} map référence à l'object Map parent
     */
    const requestHospitaldetails = (id, map) => {

        let request = {
            placeId: id,
            fields: ['name', 'address_component', 'formatted_phone_number', 'geometry', 'rating', 'opening_hours']
        };
        let service = new window.google.maps.places.PlacesService(map);
        service.getDetails(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setPlaceDetails(results);
            } else setPlaceDetails(null);
        })
    };

    /**
     * Initialise les marqueurs pour tous les hôpitaux en leur associant leur ID dans l'API Google Places.
     * (L'id du marqueur créé est le même que l'ID du lieu dans l'API.)
     * @param {Object} marker composant basique utilisé pour le marqueur de chaque hôpital
     * @param {Object} place hôpital
     */
    const onMarkerLoad = (marker, place) => {
        setMarkerMap(prevState => {
            return {...prevState, [place.place_id]: marker};
        });
    };

    /**
     * concatène les résultats des différentes pages si le tag est le même
     * @param newResults markers correspondant à la nouvelle page dé résultats
     * @param markers markers existants
     */
    const concatPagesResults = (newResults, markers,) => {
        return ([...markers, newResults.filter(result => !markers.includes(marker => marker === result))]);
    }


    /**
     * @TODO wrap in react hook
     * Cette fonction récupère les résultats les plus proches dans le rayon actuellement sélectionné
     * @param {Object} map référence à l'objet Map parent
     * @param {Object} position position de l'utilisateur (objet LatLng)
     * @param {Boolean} hasNextPage
     */
    const findNearestResults = (map, position, hasNextPage = false) => {
        if (map == null) return;

        let service = new window.google.maps.places.PlacesService(map);
        let newMarkers = [];

        researchTags.forEach(tag => {

            let request = {
                location: position,
                radius: searchRadius,
                opennow: true,
                types: tag.type,
                keyword: tag.keyword,
            };

            if (hasNextPage) {
                request.pageToken = nextPageToken;
            }

            const searchCallback = (results, next_page_token) => {
                let list = results
                    .map(result =>
                        (<Marker
                            key={result.place_id}
                            position={result.geometry.location}
                            icon={tag.icon}
                            onLoad={marker => onMarkerLoad(marker, result)}
                            onClick={event => onMarkerClick(event, result, result.place_id, map)}
                        />));
                return {list: list, nextPage: next_page_token?.H};
            }

            let asyncJob = new Promise(function (resolve) {
                service.nearbySearch(request, function(results, status, next_page_token) {
                    if (status !== null && status === window.google.maps.places.PlacesServiceStatus.OK) {
                        return resolve(searchCallback(results, next_page_token));
                    }
                });
            });

            asyncJob.then((page1) => {
                newMarkers = concatPagesResults(page1.list, newMarkers);
                setResultsMarkers(newMarkers);
            });
        });
    };

    /**
     * Mise en place initiale de la map : stockage d'une référence à l'objet map dans le state.
     * (plusieurs appels à l'API Google Maps requièrent une référence à l'objet map)
     * La liste des hôpitaux près de la position initiale de l'utilisateur est également récupérée.
     * @param {Object} map référence à l'objet Map parent
     */
    const loadHandler = (map) => {
        setMapRef(map);
        //use geolocation if user allows it and set user position to geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(pos);
                setUserPos(pos);
            }, function() {
            });
        } else {
            setUserPos(userPos);
        }
    };

    /**
     * Callback pour définir l'itinéraire lorsque cela est nécéssaire.
     * @callback
     * @param {Object} response réponse
     */
    const directionsCallback = (response) => {
        if (response !== null) {
            if (response.status === 'OK') {
                setDirectionsResponse(response);
            }
        }
    };

    /**
     * Sélectionne ou désélectionne un type de résultat
     * @param clickedResultType type de résultat correspondant à la checkbox cliquée
     */
    const handleResultTypeCheckOrUncheck = (clickedResultType) => {
        if (researchTags.some(tag => tag.type === clickedResultType)) {
            setResearchTags(researchTags.filter(tag => tag.type !== clickedResultType))
        } else {
            setResearchTags([...researchTags, resultTypes[clickedResultType]])
        }
        setOpenResultTypeMenu(false);
    }

    /**
     * Ouvre le menu du type de résultats
     * @param event
     */
    const handleOpenResultTypeMenu = (event) => {
        setResultTypeMenuAnchor(event.currentTarget);
        setOpenResultTypeMenu(true);
    };

    /**
     * Ferme le menu du type de résultats
     */
    const handleCloseResultTypeMenu = () => {
        setOpenResultTypeMenu(false);
    }

    /**
     * Rendering du composant carte et de ses sous-composants.
     * @returns {React.Fragment}
     */
    const renderMap = () => {
        return <React.Fragment>
            <GoogleMap
                options={mapOptions}
                zoom={zoom}
                center={center}
                mapContainerStyle={{
                    height: "100vh",
                    width: "100vwh",
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center",
                    justifyItems: "center",
                }}
                onLoad={map => loadHandler(map)}>

                <div className={"mapNavBarWrapper"}>
                    <NavBar/>
                </div>

                <Helmet>
                  <meta name="description" content="Découvrez la carte des urgences de Kwili, un moyen simple et rapide pour trouver les centres hospitaliers à proximité. Vous pourrez également voir comment vous y rendre avec différents modes de transport." />
                  <meta name="robots" content="index, follow" />
                </Helmet>

                <Marker
                    position={userPos}
                    icon={userIcon}
                    onLoad={(marker) => setUserMarker(marker)}/>

                <Autocomplete
                    onLoad={(searchBar) => onLoadAutocomplete(searchBar)}
                    onPlaceChanged={() => onPlaceSearched()}>
                    <FormattedMessage id="Map.Search" defaultMessage="Courriel">
                        { placeholder => 
                            <input type="text" placeholder={placeholder} className={"mapSearchBar"}/>
                        }
                    </FormattedMessage>
                </Autocomplete>

                <a href={"/"} className={"homeButton"}>
                    <FaHome className={"homeIcon"}/>
                </a>

                {infoOpen && selectedPlace && (
                    <HospitalInfoPopup
                        placeDetails={placeDetails}
                        location={markerMap[selectedPlace.place_id]}
                    />
                )}
                {resultsMarkers}
                {userDestination && <DirectionsService
                    options={{
                        destination: userDestination,
                        origin: userPos,
                        travelMode: userTravelMode,
                    }}
                    callback={(response) => directionsCallback(response)}
                />}

                {directionsResponse && userDestination && (
                    <React.Fragment>
                        <Drawer
                            anchor={"left"}
                            open={directionsPanel}
                            onClick={() => setDirectionsPanel(!directionsPanel)}
                            hideBackdrop
                            elevation={10}
                            transitionDuration={{enter: 300, exit: 300}}
                            className={"directionsPanel"}>
                            <div className={"directionsWrapper"}>
                                <div id={"directions-panel"} className={"directionsSteps"}/>
                                <FaChevronLeft className={"FaChevronLeft"}/>
                            </div>
                        </Drawer>
                        <DirectionsRenderer
                            directions={directionsResponse}
                            panel={document.getElementById('directions-panel')}
                            options={{
                                directions: directionsResponse,
                                polylineOptions: {
                                    strokeColor: "#ff4d4d",
                                    strokeOpacity: 0.8,
                                    strokeWeight: 7
                                },
                                suppressMarkers: true,
                                draggable: true,
                                preserveViewport: true
                            }}/>
                    </React.Fragment>
                )}

                <div className={"actionsButtonsWrapper"}>
                    <Tooltip title={intl.formatMessage({id: "Map.Tooltip.Transportation", defaultMessage: "Transports en commun"})}
                        placement={"left"} className={"mapTooltip"} arrow>
                        <div
                            className={userTravelMode === 'TRANSIT' ? "activeTravelModeButton" : "actionButton"}
                            onClick={() => setTravelMode('TRANSIT')}>
                            <FaBusAlt className={"actionIcon"}/>
                        </div>
                    </Tooltip>
                    <Tooltip title={intl.formatMessage({id: "Map.Tooltip.Walk", defaultMessage: "Marche"})}
                        placement={"left"} className={"mapTooltip"} arrow>
                        <div
                            className={userTravelMode === 'WALKING' ? "activeTravelModeButton" : "actionButton"}
                            onClick={() => setTravelMode('WALKING')}>
                            <FaWalking className={"actionIcon"}/>
                        </div>
                    </Tooltip>
                    <Tooltip title={intl.formatMessage({id: "Map.Tooltip.Voiture", defaultMessage: "Voiture"})}
                        placement={"left"} className={"mapTooltip"} arrow>
                        <div
                            className={userTravelMode === 'DRIVING' ? "activeTravelModeButton" : "actionButton"}
                            onClick={() => setTravelMode('DRIVING')}>
                            <FaCar className={"actionIcon"}/>
                        </div>
                    </Tooltip>

                    {selectedPlace &&
                        <Tooltip title={"Uber"} placement={"left"} arrow>
                            <UberRidePopup
                                userPos={userPos}
                                destination={{
                                    lat: selectedPlace.geometry.location.lat(),
                                    lng: selectedPlace.geometry.location.lng()
                                }}
                            />
                        </Tooltip>
                    }

                    <Tooltip title={"Types de résultats"} placement={"left"} className={"mapTooltip"} arrow>
                        <div className={"actionButton"} onClick={event => handleOpenResultTypeMenu(event)}>
                            <FaCog className={"actionIcon"}/>
                        </div>
                    </Tooltip>

                    <Menu open={openResultTypeMenu} onClose={handleCloseResultTypeMenu} anchorEl={resultTypeMenuAnchor}>
                        {resultTypesIds.map(item => (
                            <MenuItem key={item} value={resultTypes[item].type} onClick={() => handleResultTypeCheckOrUncheck(item)}>
                                <Checkbox
                                    color={"primary"}
                                    checked={researchTags.some(tag => tag.type === item)}
                                />
                                {resultTypes[item].label}
                            </MenuItem>))}
                    </Menu>
                </div>
                <div className={"sliderWrapper"}>
                    <h5 className={"sliderTitle"}>
                        <FormattedMessage
                            id="Map.SearchRadius"
                            defaultMessage="Rayon de la recherche: {value}km"
                            values={{ value: searchRadius / 1000}}
                        />
                    </h5>
                    <div className={"sliderBox"}>
                        <Slider
                            defaultValue={15}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={5}
                            onChangeCommitted={(e, val) => setRadius(val * 100)}
                            min={10}
                            max={200}
                            className={"slider"}
                        />
                    </div>
                </div>
            </GoogleMap>
        </React.Fragment>
    };

    return renderMap();
}

export default Map;
