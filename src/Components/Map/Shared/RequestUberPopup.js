import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FaUber, FaCar, FaClock} from "react-icons/all";
import "../Map.scss";
import "./PopupDialog.scss";

const CLIENT_ID = "eaBurjKEN1ZffsS0teZ88VPllFkPZb03";

/**
 * This is the uber popup component.
 * It handles the display of the popup to request an Uber ride, as well as the Uber ride request to the Uber API.
 * The Dialog component of Material UI is used as a basis for the popup window itself.
 * https://material-ui.com/components/dialogs/
 * This component is written as a functional component. The useState() calls are all placed at the very beginning of the component.
 *
 * Notes and known issues:
 * The "request Uber ride" button is only available for mobile, therefore the delay and cost are not available.
 * For compatibility reasons, deep links to the Uber web app were used instead of links to the mobile app (so that desktop users can use the uber ride feature as well).
 */
export default function RequestUberPopup(props) {

    const [open, setOpen] = useState(false);
    const [startAddress, setStartAddress] = useState("Moi");
    const [dropOffAddress, setDropOffAddress] = useState("Hôpital");

    /**
     * Opens the Uber ride request popup and calls reverseGeocode()
     * to get the formatted addresses from the LatLng objects of the user position and user destination.
     */
    const handleClickOpen = () => {
        //get formatted addresses required by API
        reverseGeocode(props.userPos, true);
        reverseGeocode(props.destination, false);
        setOpen(true);
    };

    /**
     * Closes the Uber ride request popup.
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
     * Reverse geocodes location to get the formatted addresses from a LatLng,
     * because formatted addresses are required for uber ride requests.
     * @param {LatLng Object} pos coordinates to reverse geocode
     * @param {bool} isStart is this address the start address ?
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
                className={"travelModeButton uberIcon"}
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
                    <h3>{"Se rendre à l'hôpital en UBER"}</h3></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <p><strong>Appeler un UBER pour se rendre à l'hôpital ?</strong><br/>
                        Choisir cette option ouvrira une l'application ou le
                        site UBER avec une course paramétrée entre votre position et celle de l'hôpital.</p>
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
                        Non
                    </Button>
                    <Button
                        onClick={requestUberRide}
                        color="primary"
                        classes={{textPrimary: "uberDialogButtons"}}>
                        Oui
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
