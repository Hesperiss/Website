import React from 'react';
import {InfoWindow} from "@react-google-maps/api";

/**
 * Affiche un popover avec les détails de l'endroit séléctionné
 * props: placeDetails, location.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function HospitalInfoPopup(props) {

    const {placeDetails, location} = props;

    return (
        <InfoWindow anchor={location}>
            <div>
                {placeDetails ?
                    <div>
                        <h3 className={"hospitalName"}>{placeDetails.name}</h3>
                        <p><b>Addresse
                            :</b> {placeDetails?.address_components[0].short_name + ' ' + placeDetails.address_components[1].short_name}
                        </p>
                        <p><b>Téléphone :</b> {placeDetails.formatted_phone_number}</p>
                        <p><b>Notation :</b> {placeDetails.rating ? placeDetails.rating : "inconnue"}</p>
                        {placeDetails.opening_hours && placeDetails.opening_hours.isOpen() ?
                            <p><b>Actuellement ouvert</b></p> : null}
                    </div> : <div>Chargement...</div>}
            </div>
        </InfoWindow>
    );
}