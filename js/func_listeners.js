
/** callback for getting started button
 * 
 * @param {event} event 
 */
function cb_start(event) 
{
    $("#homeScreen").addClass('hide');
    $("#loadingScreen").removeClass('hide');
    getLocation();
}

/** manual city search
 * 
 * @param {string} searchString
 */
function searchSubmit(searchString)
{
    // return if blank and blank if good
    if (!searchString) return;
    $('#search_input').val("");

    // make call for city, zip, etc to get lat/lon
    getLocationByOther(searchString);

    // handle loading screen
    $("#listScreen").addClass('hide');
    $("#loadingScreen").removeClass('hide');
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

    // update descriptions display
    toggleListDescription(event.target.dataset.des);
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
        "<img src='" + iconUrl +"' alt='weather icon' />" +
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
    $("#loadingScreen").addClass('hide');
    $("#listScreen").removeClass('hide');

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

        // create li
        var liElm = $('<li>');

        // button creation
        var buttonElm = $('<button>');
        buttonElm.addClass("coffee button is-black is-inverted is-outlined is-fullwidth");
        buttonElm.attr("id", "li_" + i);
        buttonElm.attr("value", current.name);
        buttonElm.attr("data-lat", current.location.lat);
        buttonElm.attr("data-lon", current.location.lng);
        buttonElm.attr("data-des", "d_" + i);
        buttonElm.text(current.name + " (" + convertMetersToMiles(current.distance) + "mi)");
        liElm.append(buttonElm);

        // div description container
        var desElm = $('<div>');
        desElm.attr("id", "d_" + i);
        desElm.attr("style", 'margin-bottom:10px;');

        // get if light mode checked/enabled
        var lightModeEnabled = $('#lightMode').prop("checked");

        // display address if avail
        if (current.address != undefined)
            desElm.append("<p class='des-theme-change" + ((lightModeEnabled) ? "" : " has-text-light") + "' style='padding:2px 10px;'>" + 
                current.address + 
                "</p>"
            );

        // display phone if avail
        if (current.phone_number != undefined)
            desElm.append("<p class='des-theme-change" + ((lightModeEnabled) ? "" : " has-text-light") + "' style='padding:2px 10px;'>" + 
                formatPhone(current.phone_number) + 
                "</p>"
            );

        // display website if avail
        if (current.website != undefined)
            desElm.append("<p class='des-theme-change" + ((lightModeEnabled) ? "" : " has-text-light") + "' style='padding:2px 10px;'>" + 
                "<a href='" + current.website + "' target='_blank'>Website</a>" +
                "</p>"
            );

        // hide and append
        desElm.hide();
        liElm.append(desElm);

        // append whole thing
        locElm.append(liElm);

        // create listener for button
        buttonElm.on("click", cb_locationSelect);
    }

    // handle theme (better outside of loop that way not running 15 times)
    lightModeFunc();

    // click the first location to set source
    $('#li_0').click();
}

/** handles displaying setting value and saving of
 * 
 */
function changeRange()
{
    // get value
    var val = $('#myRange').val();

    // set display text
    $('#radiusRangeValue').text( convertMetersToMiles(val) + "mi" );

    // handle saving of var
    storage.radius = val;
    saveStorageVars(SAVE_NAME, storage);
}

/** handles theme change light/dark
 * 
 */
function lightModeFunc() 
{
    // readability
    var active = $("#lightMode").is(":checked");

    // light mode enabled
    if (active) 
    {                              
        console.log("Light mode has been enabled");
        $("#navbar1").css("background-color", "#F8F4F1");
        $('#coffeeCup').attr("src", "./assets/coffeecup_lightmode.png");
        $("html").css("background", "linear-gradient(to bottom, #EBDDD6, #f9f3f7)");
        $("#settingsButton").css("background-color", "#5a4a3f");
        $("#settingsButton").css("border-color", "white");
        $("#settingsButton").css("color", "white");
        $("h1").css("color", "#5a4a3f");
        $("#gsBtn").css("background-color", "#342c26");
        $("#dayPara").css("color", "#57483d");
        $("#degrees").css("color", "#625248");
        $("h2").css("color", "#5a4a3f");
        $(".coffee").css("color", "#5a4a3f");
        $(".coffee").css("border-color", "#5a4a3f");

        // search
        $("#search_input").css("border-color", "#5a4a3f");
        $("#search_submit").css("border-color", "#5a4a3f");
        $("#search_submit").css("color", "#5a4a3f");

        // maps frame border color
        $("iframe").css("border-color", "#5a4a3f");

        // des remove light text class
        $('.des-theme-change').removeClass("has-text-light");
    } 

    // light mode disabled
    else 
    { 
        console.log("Light mode has been disabled");
        $("#navbar1").css("background-color", "rgb(26, 26, 26)")
        $('#coffeeCup').attr("src", "./assets/coffeecup.png");
        $("html").css("background", "linear-gradient(to bottom,rgb(58, 58, 58), black)");
        $("#settingsButton").css("background-color", "rgb(78, 78, 78)");
        $("#settingsButton").css("border-color", "black");
        $("#settingsButton").css("color", "white");
        $("h1").css("color", "");
        $("#gsBtn").css("background-color", "");
        $("#dayPara").css("color", "");
        $("#degrees").css("color", "");
        $("h2").css("color", "white");
        $(".coffee").css("color", "");
        $(".coffee").css("border-color", "");

        // search
        $("#search_input").css("border-color", "");
        $("#search_submit").css("border-color", "");
        $("#search_submit").css("color", "");

        // maps frame border color
        $("iframe").css("border-color", "#666");

        // des add light text class if doesn't have it
        $('.des-theme-change:not(.has-text-light)').addClass("has-text-light");
    } 

    // handle saving of var
    storage.lightMode = active;
    saveStorageVars(SAVE_NAME, storage);
};

 

