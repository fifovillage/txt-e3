inventory = [10];

bug = false;
hitpoints = 100;

currentArea = "nBog"


function comBat(hp, enemy){

      $("<p>You attack the"+enemy+"!</p>").insertBefore("#placeholder")
      var enemyHP = hp
      var combat =  setInterval(function(){
                      var pdmg = Math.floor(Math.random()*20+1);
                      var edmg = Math.floor(Math.random()*15+1);
                      enemyHP -= pdmg
                      hitpoints -= edmg
                      $("<p>You strike the "+enemy+" for "+pdmg+" damage.</p>").insertBefore("#placeholder")
                      $("#console").scrollTop($("#console")[0].scrollHeight)
                      if(hitpoints <= 0){
                          $("<p>The bug bites your back for "+edmg+"!</p>").insertBefore("#placeholder")
                          $("<p>YOU DIED</p>").insertBefore("#placeholder")
                          $("#console").scrollTop($("#console")[0].scrollHeight)
                          clearInterval(combat)
                      }else if(enemyHP <= 0){
                          $("<p>The "+enemy+" has been defeated. It is dead on the ground.</p>").insertBefore("#placeholder")
                          $("#console").scrollTop($("#console")[0].scrollHeight)
                          bug = true;
                        clearInterval(combat)
                      }else if(enemyHP > 0){
                          setTimeout(function(){
                              $("<p>The "+enemy+" bites your back for "+edmg+"!</p>").insertBefore("#placeholder")
                              $("#console").scrollTop($("#console")[0].scrollHeight)
                          },1000)
                      }
                  }, 2000)
}


$(document).ready(function(){

    $("form").submit(function(){
      var input = $("#cmdLine").val().toLowerCase();

      if(input == "hitpoints"){
        $("<p>"+hitpoints+"</p>").insertBefore("#placeholder")
      }

      if(hitpoints > 0){

        if(input == "help"){
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("#msgHelp").clone().insertBefore("#placeholder").fadeIn(0)
        }
        ///////////////////northern bog bug conditions
        else if(input == "take bug" && currentArea == "nBog" && bug == false){
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>The bug bit you for 5 damage!</p>").insertBefore("#placeholder")
            hitpoints -= 5
        }
        else if(input == "take bug" && currentArea == "nBog" && bug == true){

            if(inventory.indexOf("bug") > -1){
              $("<p>You are already carrying the dead bug in your bag.</p>").insertBefore("#placeholder")
            }else{
              $("<p> >> "+input+"</p>").insertBefore("#placeholder")
              $("<p>You take the dead bug from the bog and place it in your bag.</p>").insertBefore("#placeholder")
              inventory.push("bug")
          }
        }
        else if(input =="take bug" && currentArea != "nBog"){
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>You don't see a bug here.</p>").insertBefore("#placeholder")
        }
        else if(input =="attack bug" && bug == false){
            var bugHP = Math.random()*100;
            var enemy = "bug"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            comBat(bugHP, enemy)
        }
        else if(input =="attack bug" && bug == true){
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>The bug is dead.</p>").insertBefore("#placeholder")
        }
        //////////////////////////////////////////////////////////////////////////////////////////////
        else if(input =="go west" && currentArea == "nBog"){
            currentArea = "wBog"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>You are now in the west bog.</p>").insertBefore("#placeholder")
        }
        else if(input =="go west" && currentArea != "nBog"){
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>You cannot travel west from here.</p>").insertBefore("#placeholder")
        //////////////////////////////////////////////////////////////////////////////////////////////
        }else if(hitpoints <= 0){
            $("<p>YOU DEAD</p>").insertBefore("#placeholder")
        }
        else{
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>I don't understand "+input+".</p>").insertBefore("#placeholder")
        }
      }

      $("#cmdLine").val("");


      $("#console").scrollTop($("#console")[0].scrollHeight);
    })

});
