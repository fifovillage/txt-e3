
beenToBog = true;

bug = false;

currentArea = "nBog"

$(document).ready(function(){

    $("#console").fadeIn(2000);

    $("form").submit(function(){
      var input = $("#cmdLine").val();

      if(input == "help"){
          $("#msgHelp").clone().insertBefore("#placeholder").fadeIn(1000);
      }
      else if(input == "take bug" && currentArea == "nBog"){
          $("<p>The bug is in your hands.</p>").insertBefore("#placeholder").fadeIn(1000);
      }
      $("#cmdLine").val("");

    })

});
