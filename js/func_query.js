
/////////////////////////////////////////////////////////////////////////
/** open weather api call
 * 
 * @param {string} location 
 * @param {enum} type 
 * @param {string} ocCity 
 */
function query_weather(lat, lon)
{
    // set some vars
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall" +
        "?appid=63fcd26d5c46805bb3b2f66afa3154da" + // api key
        "&lat=" + lat + "&lon=" + lon + // location
        "&exclude=minutely,hourly,daily"; // only get current weather

    // our ajax call
    $.ajax(
    {
        url: queryURL,
        method: "GET"
    }).then( cb_weather );
}

/////////////////////////////////////////////////////////////////////////
/** gets our cafe locations
 * 
 * @param {int} lat 
 * @param {int} lon 
 */
function query_places(lat, lon, radius = 10000)
{
    // setup our data to send
    var settings = 
    {
        "async": true,
        "crossDomain": true,
        "url": "https://trueway-places.p.rapidapi.com/FindPlacesNearby"+
            "?type=cafe"+
            "&radius="+ String(radius) +
            "&language=en"+
            "&location="+ lat +"%252C" + lon,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "trueway-places.p.rapidapi.com",
            "x-rapidapi-key": "6b6b159048mshff9f4ab35d6dc5ep1a36a3jsnaebaf259d502"
        }
    }
    
    // run the ajax
    $.ajax(settings).then( cb_places );
}

/////////////////////////////////////////////////////////////////////////
/** strips results
 * 
 * @param {array of objects} results 
 * @param {array of strings} stripStrings 
 */
function _stripUnwantedPlaces(results, stripStrings)
{
    // go backwards through results as we will be splicing items
    // and it will be re-indexing every time and is easier in reverse
    for (var i = (results.length-1); i > -1; i--)
    {
        // remove if any of our types are unwanted
        if ( _isUnwanted(results[i].types, stripStrings) )
            results.splice(i, 1);
    }

    // return stripped version
    return results;
}

/////////////////////////////////////////////////////////////////////////
/** compares both arrays to see if any are included
 * 
 * @param {array of objects} types 
 * @param {array of strings} stripStrings 
 */
function _isUnwanted(types, stripStrings)
{
    // go through each type and return true if unwanted
    for(var i = 0; i < types.length; i++)
        if ( stripStrings.includes(types[i]) ) 
            return true;

    // nothing found, we good
    return false;
}
