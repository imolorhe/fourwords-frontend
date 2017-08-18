
Vue.use(VueGoogleMaps,{
    load: {
        key: 'AIzaSyB6Vy9XPHwaG102OmFryLIBnrcqfaD_gxs',
    }
});

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello world',
        searchTerm: '',
        mapCenter: {
            lat: 3.745990037918091,
            lng: -6.389520168304443
        },
        mapOptions: {
            disableDefaultUI: true,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#aeaeae"
                        },
                        {
                            "weight": 0.8
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#43e97b"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#43e97b"
                        },
                        {
                            "lightness": -7
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#43e97b"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "weight": 0.3
                        },
                        {
                            "lightness": 10
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#43e97b"
                        },
                        {
                            "lightness": -28
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "lightness": -15
                        },
                        {
                            "color": "#43e97b"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#43e97b"
                        },
                        {
                            "lightness": -18
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#43e97b"
                        },
                        {
                            "lightness": -34
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#38f9d7"
                        }
                    ]
                }
            ]
        }
    },
    computed: {
        mapPaths: function() {
            return [
                {lat: this.mapCenter.lat, lng: this.mapCenter.lng},
                {lat: this.mapCenter.lat + .1, lng: this.mapCenter.lng},
                {lat: this.mapCenter.lat + .1, lng: this.mapCenter.lng + .1},
                {lat: this.mapCenter.lat, lng: this.mapCenter.lng + .1}
            ]
        }
    },
    methods: {
        searchLocation: function() {
            console.log(this.searchTerm);
            fetch(`/api/search?q=${this.searchTerm}`, {
                credentials: 'include'
            }).catch(console.log).then(resp => resp.json()).then(data => {
                if(data.word_map){
                console.log('Updating map..');
                    this.mapCenter = {
                        lat: data.lat,
                        lng: data.long
                    };
                }
            });
        }
    }
})
