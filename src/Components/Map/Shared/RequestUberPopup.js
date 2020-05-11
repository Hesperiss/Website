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

export default function RequestUberPopup(props) {

    const [open, setOpen] = useState(false);
    const [startAddress, setStartAddress] = useState("Moi");
    const [dropOffAddress, setDropOffAddress] = useState("Hôpital");

    const handleClickOpen = () => {
        //get formatted addresses required by API
        reverseGeocode(props.userPos, true);
        reverseGeocode(props.destination, false);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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

    //reverse geocode location
    //because formatted addresses are required for uber ride request
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