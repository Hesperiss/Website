import hospitalIcon from "../../../Images/markerHospital.png";
import doctorIcon from "../../../Images/markerDoctor.png";
import dentistIcon from "../../../Images/markerDentist.png";
import pharmacyIcon from "../../../Images/markerPharmacy.png";
import { FormattedMessage } from 'react-intl';

/**
 * Types de résultats de recherche
 * @type {{doctor: {type: string, keyword: string}, pharmacy: {type: string, keyword: string}, hospital: {type: string, keyword: string}, dentist: {type: string, keyword: string}}}
 */
export const resultTypes = {
    hospital: {
        type: "hospital",
        keyword: "(emergency) AND ((medical centre) OR hospital)",
        label: <FormattedMessage id="ResultTypes.Hospital" defaultMessage="Hôpitaux"/>,
        icon: hospitalIcon
    },
    doctor: {
        type: "doctor",
        keyword: "doctor OR hospital",
        label: <FormattedMessage id="ResultTypes.Doctor" defaultMessage="Docteurs"/>,
        icon: doctorIcon
    },
    dentist: {
        type: "dentist",
        keyword: "dentist",
        label: <FormattedMessage id="ResultTypes.Dentist" defaultMessage="Dentistes"/>,
        icon: dentistIcon
    },
    pharmacy: {
        type: "pharmacy",
        keyword: "pharmacy",
        label: <FormattedMessage id="ResultTypes.Pharmacy" defaultMessage="Pharmacies"/>,
        icon: pharmacyIcon
    }
};

export const resultTypesIds = ["hospital", "doctor", "dentist", "pharmacy"];