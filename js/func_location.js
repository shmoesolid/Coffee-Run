/** get our location automatically
 * 
 */
function getLocation() 
{
    // geolocation supported, try to get position
    if (navigator.geolocation) 
        navigator.geolocation.getCurrentPosition(_positionSucess, _positionError);
    
    // geolocation not supported, log and try to get by IP
    else 
    {
        console.log("Geolocation is not supported by this browser.");
        getLocationByIP();
    }
}

/** callback for geolocation sucess
 * 
 * @param {object} position 
 */
function _positionSucess(position) 
{
    // query places and weather with lat/lon
    query_places(position.coords.latitude, position.coords.longitude);
    query_weather(position.coords.latitude, position.coords.longitude);
}

/** callback for geolocation failure
 * 
 * @param {object} error 
 */
function _positionError(error)
{
    // fallback get getting location by IP
    getLocationByIP();

    // log error in console
    switch(error.code)
    {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}

/** get location by ip address fallback
 * 
 */
function getLocationByIP(weatherOnly=false)
{
    // run ajax call
    $.ajax({

        dataType: "json",
        url: "https://ipapi.co/json/",
        
        success: function(data)
        {
            // DEBUG
            //console.log(data);

            // query places and weather with lat/lon
            if (!weatherOnly) query_places(data.latitude, data.longitude);
            query_weather(data.latitude, data.longitude);
        }

    });
}