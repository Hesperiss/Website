export const mapOptions = {
    streetViewControl: false,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    rotateControl: false,
    fullscreenControl: false,
    styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{visibility: "off"}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#58a5f0'}]},
        {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#58a5f0'}]
        },
        {
            featureType: "administrative.neighborhood",
            elementType: "labels",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "poi",
            stylers: [
                {visibility: "off"}
            ]
        },
        {
            featureType: 'road',
            elementType: 'labels',
            stylers: [
                {
                    visibility: "off"
                }]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#3A505D'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#4D6A7A'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#617A8A'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
        },
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#3a4762'}]
        },
        {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#58a5f0'}]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#4e6d70'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#58a5f0'}]
        },
    ]
};
