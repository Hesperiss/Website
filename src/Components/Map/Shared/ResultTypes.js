/**
 * Types de résultats de recherche
 * @type {{doctor: {type: string, keyword: string}, pharmacy: {type: string, keyword: string}, hospital: {type: string, keyword: string}, dentist: {type: string, keyword: string}}}
 */
export const resultTypes = {
    hospital: {
        type: "hospital",
        keyword: "(emergency) AND ((medical centre) OR hospital)",
        label: "Hôpitaux"
    },
    doctor: {
        type: "doctor",
        keyword: "doctor OR hospital",
        label: "Médecins"
    },
    dentist: {
        type: "dentist",
        keyword: "dentist",
        label: "Dentistes"
    },
    pharmacy: {
        type: "pharmacy",
        keyword: "pharmacy",
        label: "Pharmacies"
    }
};

export const resultTypesIds = ["hospital", "doctor", "dentist", "pharmacy"];