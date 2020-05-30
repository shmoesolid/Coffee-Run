$("#settings-button").on("click", function() {
   $("#settings-button").toggleClass("is-active");
});

$('.dropdown-item').bind('click', function (e) { e.stopPropagation() })

$("#lightMode").on("click", function() {
    if ($("#lightMode").is( 
        ":checked")) { 
          console.log("Check box in Checked"); 
      } else { 
          console.log("Check box is Unchecked"); 
      } 
})

$('#radiusRange').change(function(){
    $('radiusRangeValue').value=$(this).val();
     });