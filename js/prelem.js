
// we don't want these types of places
const UNWANTED_PLACES = 
[
    "convenience_store",
    "gas_station",
    "car_wash"
];

// namespace for local storage
const SAVE_NAME = "JRS_COFFEE_RUN";

// setup default storage object
var storage =
{
    lightMode: false,
    radius: 10000
};

// attempt to get storage
storage = loadStorageVars(SAVE_NAME, storage);

console.log("LIGHT_MODE" + storage.lightMode);

// set settings values based on storage
$('#lightMode').prop('checked', storage.lightMode);
var sliderElm = $('#myRange'); // using 3 times so putting in var
var newRange = containNum(storage.radius, sliderElm.attr('min'), sliderElm.attr('max'));
sliderElm.val( newRange );
$('#radiusRangeValue').text( convertMetersToMiles( newRange ) +"mi" );
