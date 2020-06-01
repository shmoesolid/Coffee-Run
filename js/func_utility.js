/////////////////////////////////////////////////////////////////////////
/** converts unix datetime into formatted date
 * 
 * @param {int} dt 
 */
function formatUnixDT(dt)
{
    // convert dt into usable date object data
    var d = new Date(dt * 1000);

    // setup display strings
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    // return month, day of the month, year 2 digits, day of the week
    return [ months[d.getMonth()], d.getDate(), String(d.getFullYear()).slice(-2), days[d.getDay()] ];
}

/////////////////////////////////////////////////////////////////////////
/** basic tempurature conversions
 * 
 */
function convertKtoF(kTemp) { return Math.round( convertCtoF(convertKtoC(kTemp))); }
function convertCtoF(cTemp) { return cTemp * 9/5 + 32; }
function convertKtoC(kTemp) { return kTemp - 273.15; }

/////////////////////////////////////////////////////////////////////////
/** toggles description display of list of locations based on selection
 * 
 * @param {element} target 
 */
function toggleListDescription(target)
{
    // get all div description containers
    var locListDes = $('#locations-list').find('div');

    // go through them all and handle accordingly
    for (var i = 0; i < locListDes.length; i++)
    {
        // show
        if (locListDes[i].id == target) locListDes[i].style.display = "block";

        // hide
        else locListDes[i].style.display = "none";
    }
}

/////////////////////////////////////////////////////////////////////////
/** converts meters to miles and rounds to 2 dec places
 * 
 * @param {int} meters 
 */
function convertMetersToMiles(meters)
{
    return (meters * 0.00062137).toFixed(2);
}

/////////////////////////////////////////////////////////////////////////
/** returns formatted truplaces phone number
 * 
 * @param {string} number 
 */
function formatPhone(number)
{
    var area = number.substring(2, 5);
    var first = number.substring(5, 8);
    var last = number.substring(8, 12);
    return "("+ area +") "+ first +"-"+ last;
}

/////////////////////////////////////////////////////////////////////////
/** loads obj from local storage from unique name (default obj if null)
 * 
 * @param {string} storageName 
 * @param {obj} defaultObj 
 */
function loadStorageVars(storageName, defaultObj)
{
    // attempt to load vars
    var vars = JSON.parse(localStorage.getItem(storageName));

    // no vars, return our default
    if ( vars === null ) return defaultObj;

    // we have something, return vars
    return vars;
}

/////////////////////////////////////////////////////////////////////////
/** saves obj into local storage by unique name
 * 
 * @param {string} storageName 
 * @param {obj} obj 
 */
function saveStorageVars(storageName, obj)
{
    localStorage.setItem(storageName, JSON.stringify(obj));
}

/////////////////////////////////////////////////////////////////////////
/** forces an number to be contained in a range
 * 
 * @param {num} num 
 * @param {num} min 
 * @param {num} max 
 */
function containNum(num, min, max)
{
  return Math.max( Math.min(num, max), min );
}
