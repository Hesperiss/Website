import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

export default function EmailModal(props) {

    return (
        <Dialog
            classes={{paper: "dialogWindow"}}
            open={true}
            keepMounted
            onClose={props.onClose}
            aria-labelledby={"alert-dialog-slide-title"}
            aria-describedby={"alert-dialog-slide-description"}
        >
            <DialogTitle classes={{root: "dialogTitle"}}>
                <h3>{"Merci !"}</h3>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <p>
                        {props.message}
                    </p>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={props.onClose}
                    color="primary"
                    classes={{textPrimary: "uberDialogButtons"}}>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}