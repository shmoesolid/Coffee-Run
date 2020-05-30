$("#settings-button").on("click", function() {      // code for opening and closing 
   $("#settings-button").toggleClass("is-active");  // settings button
});

$('.dropdown-item').bind('click', function (e) { e.stopPropagation() });    // code to disable closing the menu while clicking on menu items

$("#lightMode").on("click", function() {            
    if ($("#lightMode").is( 
        ":checked")) {                              
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
      } else { 
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
      } 
})
