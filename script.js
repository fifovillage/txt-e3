hitpoints = 100
mana = 20
level = 1

inventory = [10];



bug = false;

currentArea = "nBog"


function refreshStatWindow(){
  $("#lvl").empty()
  $("#hp").empty()
  $("#mp").empty()
  $("#xp").empty()

  if(hitpoints < 0){
      $("#hp").append(0)
  }else{
      $("#lvl").append("Level " + level)
      $("#hp").append("Health: "+hitpoints)
      $("#mp").append("Mana: "+mana)
      $("#xp").append("Exp: ")
  }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function comBat(hp, enemy){

      $("<p>You attack the "+enemy+"!</p>").insertBefore("#Bplaceholder")
      var enemyHP = hp
      var combat =  setInterval(function(){
                      var pdmg = Math.floor(Math.random()*20+1);
                      var edmg = Math.floor(Math.random()*15+1);
                      if(hitpoints <= 0){
                          $("<p>YOU DIED</p>").insertBefore("#placeholder")
                          $("#mainConsole").scrollTop($("#mainConsole")[0].scrollHeight)
                          clearInterval(combat)
                      }else if(enemyHP <= 0){
                          $("<p>The "+enemy+" has been defeated. It is dead on the ground.</p>").insertBefore("#Bplaceholder")
                          $("#combatContainer").scrollTop($("#combatContainer")[0].scrollHeight)
                          bug = true;
                        clearInterval(combat)
                      }else if(enemyHP > 0){
                          enemyHP -= pdmg
                          $("<p>You strike the "+enemy+" for "+pdmg+" damage.</p>").insertBefore("#Bplaceholder")
                          $("#combatContainer").scrollTop($("#combatContainer")[0].scrollHeight)
                          setTimeout(function(){
                              hitpoints -= edmg
                              $("<p>The "+enemy+" bites your back for "+edmg+"!</p>").insertBefore("#Bplaceholder")
                              $("#combatContainer").scrollTop($("#combatContainer")[0].scrollHeight)
                          },1000)
                      }
                  }, 2000)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
setInterval(refreshStatWindow, 100)


    $("form").submit(function(){
      var input = $("#cmdLine").val().toLowerCase();


      if(hitpoints > 0){

        if(input == "help"){
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("#msgHelp").clone().insertBefore("#placeholder").fadeIn(0)
        }
        ///////////////////northern bog bug conditions
        else if(input == "take bug" && currentArea == "nBog" && bug == false){
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            if(hitpoints <= 5){
              $("<p>One more time and that bug will kill you.</p>").insertBefore("#placeholder")

            }else{
              $("<p>The bug bit you for 5 damage!</p>").insertBefore("#placeholder")
              hitpoints -= 5
            }
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


      $("#mainConsole").scrollTop($("#mainConsole")[0].scrollHeight);
    })

});
