const GOOGLE_API = 'https://maps.googleapis.com/maps/api/geocode/json?address=',
    KEY = '&key=AIzaSyAfjKn-169lLlrhinsOBNPkUA_rNszUL3w',
    MAP_SEARCH = document.querySelector('#map-search'),
    MAP_RESULTS = document.querySelector('.map-results');


MAP_SEARCH.addEventListener("click", geocode, false);


function httpGet(url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                let json = JSON.parse(xhr.response);
                resolve(json);
            } else {
                let error = new Error(xhr.statusText);
                reject(error);
            }
        };
        xhr.onerror = function (error) {
            reject(error);
        };
        xhr.send();
    });
}


function geocode() {
    let address = document.querySelector('#map-address').value || 'Черкассы Уркаина',
        request = GOOGLE_API + address + KEY;

    let showMap = (response) => {
        if (response.status === "OK") {
            let lat = response.results[0].geometry.location.lat,
                lng = response.results[0].geometry.location.lng,
                uluru = {lat: lat, lng: lng};
            let map = new google.maps.Map(document.getElementById('map-canvas'), {
                zoom: 14,
                center: uluru
            });
            let marker = new google.maps.Marker({
                position: uluru,
                map: map
            });
            MAP_RESULTS.innerHTML = `lat: <b>${lat}</b><br>lng: <b>${lng}</b><br>`;
        } else {
            MAP_RESULTS.innerHTML = `${response.status}`;
        }
    };

    httpGet(request)
        .then(showMap)
        .catch(error => console.error(error));
}


document.addEventListener("DOMContentLoaded", geocode);


jQuery(function($) {
    let quote = $('.quote-text'),
        quoteBtn = $('#quote-btn');

    function getQuote() {
        $.ajax({
            type: 'GET',
            url: 'https://andruxnet-random-famous-quotes.p.mashape.com/',
            headers: {
                'X-Mashape-Key': 'yKflRE3SIFmsh029Ku1aQ1QsOLsSp1XM31cjsneVpsXofoNhZg'
            }
        }).done(function(data) {
            data = JSON.parse(data) || {};
            quote.empty();
            quote.append('<q>' + data.quote + '</q><br>' + data.author);

        });
    }

    getQuote();
    $(quoteBtn).on( "click", getQuote);


    let emailText = $('.email-text'),
        emailBtn = $('#email-btn'),
        email = $('#email');

    function emailValidator() {
        $.ajax({
            type: 'GET',
            url: 'https://pozzad-email-validator.p.mashape.com/emailvalidator/validateEmail/' + $(email).val(),
            headers: {
                'X-Mashape-Key': 'yKflRE3SIFmsh029Ku1aQ1QsOLsSp1XM31cjsneVpsXofoNhZg'
            }
        }).done(function(data) {
            $(emailText).empty();
            $(emailText).append('<p>' + data.isValid + '</p>');

        });
    }

    emailValidator();
    $(emailBtn).on( "click", emailValidator);
});