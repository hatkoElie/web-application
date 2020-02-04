var token = 'pk.eyJ1IjoiamFoYXRrbyIsImEiOiJjazRmbDFkNmcwbmZqM2tvN2hkczU1aTJ5In0.DYncZDPERKyLOAP7OgqHWg';

var mymap = L.map('leaflet-map-main', {
    zoomControl: false,
    //... other options
}).setView([-1.405, 20.09], 2);

// mymap.setMaxBounds(mymap.getBounds());

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + token, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    minZoom: 2,
    id: 'mapbox/dark-v10',
    accessToken: token
}).addTo(mymap);

//add zoom control with your options
L.control.zoom({
     position:'topright'
}).addTo(mymap);

let objArray = [];
let date = new Date();
let currentDate = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay();

let dataList = document.getElementById('country-list');

var settings = {
    "url": "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2017-01-01&endtime="+ currentDate +"&minmagnitude=5&maxlongitude=80.000&minlongitude=-80.000",
    "method": "GET",
    "timeout": 0,
  };
  
  let countries = []

  $.ajax(settings).done(function (response) {

    response.features.forEach(e => {
        // let getCountry;
        // let country;
        // if(e.properties.place.includes(',')){
        //     getCountry = e.properties.place.split(',')
        //     country = getCountry[getCountry.length -1];
        // } else {
        //     country = e.properties.place
        // }
        
        // countries.push(country)
        

        // objArray.push({
        //     place: e.properties.place,
        //     mag: e.properties.mag,
        //     time: e.properties.time,
        //     type: e.properties.type,                
        //     coordinates: e.geometry.coordinates
        // })
        
        //Add event circle
        L.circle([e.geometry.coordinates[0], e.geometry.coordinates[1]], 
            {
                radius: 80000, 
                color: '#ff0000b5',
                stroke: false
            }).addTo(mymap);

    });
    
    // countries = [...new Set(countries)]
    
    // countries.forEach(c => {        
    //     let setCountry = document.createElement('div');            
    //     setCountry.className = 'country-elem'  
        
    //     let countryFlag = document.createElement('img')
    //     countryFlag.className = 'country-flag'
    //     setCountry.append(countryFlag)

    //     let cName = document.createElement('p')
    //     cName.innerText = c;
    //     cName.className = 'country-name'
    //     setCountry.append(cName)
    //     dataList.append(setCountry)
    // })

});