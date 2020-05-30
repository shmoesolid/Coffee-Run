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

/**
 * 
 * @param {element} elmToShow 
 */
/*function toggleDisplay(elmToShow)
{
    // setup quick array of all
    var elms = [ $("#homeScreen"), $("#listScreen"), $('#loadingScreen') ]; // $('#aboutScreen'), 

    // go through each one and determin visibility
    for (var i = 0; i < elms.length; i++)
    {
        // show it
        if (elms[i] == elmToShow)
        {
            // has it? remove it
            if (elms[i].hasClass('hide'))
                elms[i].removeClass('hide');
        }

        // hide the rest
        else
        {
            // doesn't have it?  add it
            if (!elms[i].hasClass('hide'))
                elms[i].addClass('hide');
        }
    }
}*/

function toggleListDescription(target)
{
    var locListDes = $('#locations-list').find('div');

    for (var i = 0; i < locListDes.length; i++)
    {
        // show
        if (locListDes[i].id == target) 
            locListDes[i].style.display = "block";

        // hide
        else locListDes[i].style.display = "none";
            
    }
}
