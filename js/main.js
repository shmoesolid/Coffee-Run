
// setup listener for getting started
$("#gsBtn").on("click", cb_start);

// opening and closing settings
$("#settings-button").on("click", function() 
{
    $("#settings-button").toggleClass("is-active");  // settings button
});

// disable closing the menu while clicking on menu items
$('.dropdown-item').bind('click', function (e) { e.stopPropagation() });    

// checkbox for lightmode
$("#lightMode").on("click", lightModeFunc);

// search for city click button or hit enter
$("#search_submit").on("click", function() { searchSubmit($('#search_input').val()) });
$('#search_input').on("keyup", function(e) { if (e.which === 13) searchSubmit($('#search_input').val()) });

//setup saving storage for on change of slider
$('#myRange').on("change", changeRange);

// run our theme function
lightModeFunc();

// get weather only from IP on load
getLocationByIP(true);

