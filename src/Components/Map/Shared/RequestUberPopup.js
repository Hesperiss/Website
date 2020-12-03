import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FaUber, FaCar, FaClock} from "react-icons/all";
import { FormattedMessage } from 'react-intl';
import "../Map.scss";
import "./PopupDialog.scss";

const CLIENT_ID = "eaBurjKEN1ZffsS0teZ88VPllFkPZb03";

/**
 * Il s'agit du composant de la feneêtre popup proposant une course Uber.
 * Ce composant gère l'affichage de la popup ainsi que la requête de course à l'API Uber.
 * Le composant {@link https://material-ui.com/components/dialogs/ Dialog} de {@link https://material-ui.com/ Material UI} est utilisé comme base pour la fenêtre popup.
 * Notes and problèmes connus:
 * Le bouton "demander une course Uber" est seulement disponible pour mobile, les prévisions du coût et du temps d'attente ne sont donc pas disponibles.
 * Pour des raisons de compatabilité sur différentes plateformes des deep links vers l'application web Uber ont été utilisé plutôt que des liens vers l'appli mobile.
 *
 * @Class Request UberPopup
 * @requires Dialog
 * @see {@link https://developer.uber.com/docs documentation Uber}
 * @see {@link https://material-ui.com/ Documentation Material UI}
*/
export default function RequestUberPopup(props) {

    const [open, setOpen] = useState(false);
    const [startAddress, setStartAddress] = useState("Moi");
    const [dropOffAddress, setDropOffAddress] = useState("Hôpital");

    /**
     * Ouvre la fenêtre popup proposant une course Uber et appelle reverseGeocode()
     */
    const handleClickOpen = () => {
        //get formatted addresses required by API
        reverseGeocode(props.userPos, true);
        reverseGeocode(props.destination, false);
        setOpen(true);
    };

    /**
     * Ferme la popup proposant une course Uber
     */
    const handleClose = () => {
        setOpen(false);
    };

    /**
     * Generates ride request and link from the formatted addresses of the start
     * and drop-off addresses, and opens the Uber ride request in a new window.
     */
    const requestUberRide = () => {

        if (!props.userPos || !props.destination) {
            console.log("user location or destination is undefined");
            return;
        }

        //m.uber.com is the web app (designed mainly as a mobile web app)
        let rideRequestLink = 'https://m.uber.com?action=setPickup&client_id=' + CLIENT_ID +
            '&pickup[formatted_address]=' + startAddress + '&pickup[latitude]=' + props.userPos.lat +
            '&pickup[longitude]=' + props.userPos.lng + '&dropoff[formatted_address]=' + dropOffAddress +
            '&dropoff[latitude]=' + props.destination.lat + '&dropoff[longitude]=' + props.destination.lng;

        //open link in new tab and close popup
        window.open(rideRequestLink, '_blank');
        handleClose();
    };

    /**
     * Géocode "à l'envers" une addresse : utilise les coordonnées LatLng pour obtenir une addresse formatée.
     * Une requête de course Uber requiert en effet une addresse formatée.
     * @param {Object} pos coordonées LatLng
     * @param {bool} isStart est-ce l'adresse de départ de la course ?
     * @see {@link https://developers.google.com/maps/documentation/geocoding/overview documentation de l'API Geocode de Google Maps}
     */
    const reverseGeocode = (pos, isStart) => {
        let geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({'location': pos}, function(results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    if (isStart) {
                        setStartAddress(results[0].formatted_address);
                    } else {
                        setDropOffAddress(results[0].formatted_address);
                    }
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    };


    return (
        <div>

            <div
                className={"actionButton uberIcon"}
                onClick={() => handleClickOpen()}>
                <FaUber className={"travelModeIcon"}/>
            </div>

            <Dialog
                classes={{paper: "dialogWindow"}}
                open={open}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle classes={{root: "dialogTitle"}}>
                    <h3>
                        <FormattedMessage id="RequestUber.Title" defaultMessage="Se rendre à l'hôpital en UBER"/>
                    </h3>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <p><strong><FormattedMessage id="RequestUber.Subtitle" defaultMessage="Appeler un UBER pour se rendre à l'hôpital ?"/></strong><br/>
                            <FormattedMessage id="RequestUber.Desc" defaultMessage="Choisir cette option ouvrira une l'application ou le site UBER avec une course paramétrée entre votre position et celle de l'hôpital."/>
                        </p>
                    </DialogContentText>
                    <div className={"uberPopupIcons"}>
                        <FaClock className={"icon"}/>
                        <FaCar className={"icon"}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="primary"
                        classes={{textPrimary: "uberDialogButtons"}}>
                        <FormattedMessage id="RequestUber.No" defaultMessage="Non"/>
                    </Button>
                    <Button
                        onClick={requestUberRide}
                        color="primary"
                        classes={{textPrimary: "uberDialogButtons"}}>
                        <FormattedMessage id="RequestUber.Yes" defaultMessage="Oui"/>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
