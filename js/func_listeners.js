
/** callback for getting started button
 * 
 * @param {event} event 
 */
function cb_start(event) 
{
    $("#homeScreen").addClass('hide');
    //toggleDisplay( $("#loadingScreen") );
    getLocation();
}

/** callback for specific location select/click
 * 
 * @param {event} event 
 */
function cb_locationSelect(event)
{
    // build new source from button value (contains address)
    var newSource = "https://maps.google.com/maps" +
        "?q=" + event.target.dataset.lat +","+ event.target.dataset.lon +
        "&t=&z=" + "15" +
        "&ie=UTF8&iwloc=&output=embed";

    console.log(newSource);

    // update iframe's src location with new
    $('#gmap_canvas').attr("src", newSource);

    // force reload
    //$('#currentElement').attr("src", $('#currentElement').attr("src"));
}

/** callback for weather ajax call
 * 
 * @param {object} res 
 */
function cb_weather(res)
{
    // DEBUG
    console.log(res);

    // creates image with appropriate icon and sets temp data in F
    var iconUrl = "http://openweathermap.org/img/w/" + res.current.weather[0].icon + ".png";
    $('#degrees').html(
        "<img src='" + iconUrl +"' alt='weather icon' style='-webkit-filter: grayscale(100%);filter: grayscale(100%);' />" +
        "&nbsp;" + convertKtoF(res.current.temp) + "&#176;"
    );

    // get formatted date array and set text data
    // index 0 = month, 1 = day of the month, 2 = year 2 digits, 3 = day of the week
    var dateArray = formatUnixDT(res.current.dt);
    $('#dayPara').text(dateArray[3] +", "+ dateArray[0] +" "+ dateArray[1]);
}

/** callback for places ajax call
 * 
 * @param {object} res 
 */
function cb_places(res)
{
    // DEBUG
    console.log(res);
  
    // show list screen container
    $("#listScreen").removeClass('hide');
    //toggleDisplay( $("#listScreen") );

    // strip out unwanted places from results
    var strippedData = _stripUnwantedPlaces(res.results, UNWANTED_PLACES);

    // hold location element (ul id)
    var locElm = $('#locations-list');

    // empty out
    locElm.empty();

    // go through location data
    for (var i = 0; i < strippedData.length; i++)
    {
        // for readability
        var current = strippedData[i];

        // useable data properties:
        //current.address
        //current.distance // in meters
        //current.name
        //current.phone_number
        //current.website

        // build li and button and append to locElm
        //<li><button class="coffee button is-black is-inverted is-outlined">COFFEE</button></li>
        var liElm = $('<li>');
        var buttonElm = $('<button>');
        buttonElm.addClass("coffee button is-black is-inverted is-outlined");
        buttonElm.attr("id", "lb_" + i);
        buttonElm.attr("value", current.name);//current.name+","+current.address);
        buttonElm.attr("data-lat", current.location.lat);
        buttonElm.attr("data-lon", current.location.lng);
        buttonElm.text(current.name);
        liElm.append(buttonElm);
        locElm.append(liElm);

        // create listener for button
        buttonElm.on("click", cb_locationSelect);
    }

    // click the first location to set source
    $('#lb_0').click();
}