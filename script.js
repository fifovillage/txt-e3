bug = false;

currentArea = "nBog"

$(document).ready(function(){

    $("form").submit(function(){
      var input = $("#cmdLine").val();

      if(input == "help"){
          $("<p> >> "+input+"</p>").insertBefore("#placeholder")
          $("#msgHelp").clone().insertBefore("#placeholder").fadeIn(0)
      }
      else if(input == "take bug" && currentArea == "nBog" && bug == false){
          $("<p> >> "+input+"</p>").insertBefore("#placeholder")
          $("<p>The bug is in your hands.</p>").insertBefore("#placeholder")
          bug = true
      }
      else if(input == "take bug" && currentArea == "nBog" && bug == true){
          $("<p> >> "+input+"</p>").insertBefore("#placeholder")
          $("<p>You already have the bug.</p>").insertBefore("#placeholder")
      }
      else if(input =="take bug" && currentArea != "nBog"){
          $("<p> >> "+input+"</p>").insertBefore("#placeholder")
          $("<p>You don't see a bug here.</p>").insertBefore("#placeholder")
      }
      else if(input =="go west" && currentArea == "nBog"){
          currentArea = "wBog"
          $("<p> >> "+input+"</p>").insertBefore("#placeholder")
          $("<p>You are now in the west bog.</p>").insertBefore("#placeholder")
      }
      else if(input =="go west" && currentArea != "nBog"){
          $("<p> >> "+input+"</p>").insertBefore("#placeholder")
          $("<p>You cannot travel west from here.</p>").insertBefore("#placeholder")
      }
      else{
          $("<p> >> "+input+"</p>").insertBefore("#placeholder")
          $("<p>I don't understand "+input+".</p>").insertBefore("#placeholder")
      }

      $("#cmdLine").val("");

    })

});
