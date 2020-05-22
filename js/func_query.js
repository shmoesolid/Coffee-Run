function query_places(lat, lon)
{
    // check lat/lon preg?

    // setup our data to send
    var settings = 
    {
        "async": true,
        "crossDomain": true,
        "url": "https://trueway-places.p.rapidapi.com/FindPlacesNearby"+
            "?type=cafe"+
            "&radius=10000"+
            "&language=en"+
            "&location="+ lat +"%252C" + lon,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "trueway-places.p.rapidapi.com",
            "x-rapidapi-key": "6b6b159048mshff9f4ab35d6dc5ep1a36a3jsnaebaf259d502"
        }
    }
    
    // run the ajax
    $.ajax(settings).then(function (response) 
    {
        console.log(response);

        // do stuff with the response data
    });
}
