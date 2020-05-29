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
