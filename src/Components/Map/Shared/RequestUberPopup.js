import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FaUber} from "react-icons/all";
import "../Map.scss"

const CLIENT_ID = "eaBurjKEN1ZffsS0teZ88VPllFkPZb03";

export default function RequestUberPopup(props) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
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
        let rideRequestLink = 'https://m.uber.com?action=setPickup&client_id=' + CLIENT_ID + 'pickup=' +
            props.userPos.lat + '&pickup=' + props.userPos.lng + '&dropoff=' +
            props.destination.lat + '&dropoff=' + props.destination.lng;
        console.log(rideRequestLink);

        //open link in new tab
        window.open(rideRequestLink, '_blank');

        handleClose();
    };

    return (
        <div>

            <div
                className={"travelModeButton uberIcon"}
                onClick={() => handleClickOpen()}>
                <FaUber className={"travelModeIcon"}/>
            </div>

            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Se rendre à l'hôpital en UBER"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Appeler un UBER pour se rendre à l'hôpital ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Non
                    </Button>
                    <Button onClick={requestUberRide} color="primary">
                        Oui
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}