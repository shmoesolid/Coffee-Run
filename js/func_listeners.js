
/** callback for getting started button
 * 
 * @param {event} event 
 */
function cb_start(event) {
    $("#homeScreen").addClass('hide');
     getLocation();
}

/** callback for specific location select/click
 * 
 * @param {event} event 
 */
function cb_locationSelect(event)
{
    // handle map src building and display below
    // ..
}

/** callback for weather ajax call
 * 
 * @param {object} res 
 */
function cb_weather(res)
{
    // DEBUG
    console.log(res);

    // display weather data accordingly below
    // ..
}

/** callback for places ajax call
 * 
 * @param {object} res 
 */
function cb_places(res)
{
    // DEBUG
    console.log(res);

    // strip out unwanted places from results
    var strippedData = _stripUnwantedPlaces(res.results, UNWANTED_PLACES);

    // display strippedData of places array accordingly below
    // ..
    $("#listScreen").removeClass('hide');

}