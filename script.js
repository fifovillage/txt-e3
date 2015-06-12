bug = false;

currentArea = "nBog"

function comBat(){
      var bugHP = Math.random()*100;

      var combat =  setInterval(function(){
                    if(bugHP > 0){
                      var dmg = Math.floor(Math.random()*10+1);
                      bugHP -= dmg
                      $("<p>You strike the bug for "+dmg+" damage.</p>").insertBefore("#placeholder")
                    }
                    else{
                        $("<p>The bug has been defeated.</p>").insertBefore("#placeholder")
                        clearInterval(combat);
                    }

                  }, 2000)
}


$(document).ready(function(){

    $("form").submit(function(){
      var input = $("#cmdLine").val().toLowerCase();


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
      else if(input =="attack bug"){
          comBat()
      }
      else{
          $("<p> >> "+input+"</p>").insertBefore("#placeholder")
          $("<p>I don't understand "+input+".</p>").insertBefore("#placeholder")
      }

      $("#cmdLine").val("");


      $("#console").scrollTop($("#console")[0].scrollHeight);
    })

});
