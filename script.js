player = {
       level: 1,
       hitpoints:100,
       mana:20,
       experience:0
}

reqXP = [
       120,
       290,
       445,
       690,
       1010,
       1450,
       1970,
       2450,
       2800,
       3500
]

inventory = [];


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


bogEnemy = [
        {name:"bug", health:75, exp:15},
        {name:"snake", health:100, exp:20},
        {name:"crab", health:150, exp:30}]


currentArea = "nBog"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function refreshStatWindow(){
  $("#lvl").empty()
  $("#hp").empty()
  $("#mp").empty()
  $("#xp").empty()

  if(player.hitpoints < 0){
      $("#hp").append(0)
  }else{
      $("#lvl").append("Level " +player.level)
      $("#hp").append("Health: "+player.hitpoints)
      $("#mp").append("Mana: "+player.mana)
      $("#xp").append("Exp: "+player.experience+" / "+reqXP[player.level - 1])
  }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function comBat(hp, enemy, exp){

      $("<p>You attack the "+enemy+"!</p>").insertBefore("#Bplaceholder")
      var enemyHP = hp
      var combat =  setInterval(function(){
                      var pdmg = Math.floor(Math.random()*20+1);
                      var edmg = Math.floor(Math.random()*15+1);
                      if(player.hitpoints <= 0){
                          $("<p>YOU DIED</p>").insertBefore("#placeholder")
                          $("#mainConsole").scrollTop($("#mainConsole")[0].scrollHeight)
                          clearInterval(combat)
                      }else if(enemyHP <= 0){
                          $("<p>The "+enemy+" has been defeated. It is dead on the ground.</p>").insertBefore("#Bplaceholder")
                          $("#combatContainer").scrollTop($("#combatContainer")[0].scrollHeight)
                          player.experience += exp
                        clearInterval(combat)
                      }else if(enemyHP > 0){
                          enemyHP -= pdmg
                          $("<p>You strike the "+enemy+" for "+pdmg+" damage.</p>").insertBefore("#Bplaceholder")
                          $("#combatContainer").scrollTop($("#combatContainer")[0].scrollHeight)
                          setTimeout(function(){
                              player.hitpoints -= edmg
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


      if(player.hitpoints > 0){

        if(input == "help"){
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("#msgHelp").clone().insertBefore("#placeholder").fadeIn(0)
        }
        ///////////////////northern bog bug conditions
        else if(input == "take bug" && currentArea == "nBog" && bug == false){
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            if(player.hitpoints <= 5){
              $("<p>One more time and that bug will kill you.</p>").insertBefore("#placeholder")

            }else{
              $("<p>The bug bit you for 5 damage!</p>").insertBefore("#placeholder")
              player.hitpoints -= 5
            }
        }
        //////////////////////////////////////////////////////////////////////////////////////////////
        else if(input =="go west" && currentArea == "nBog"){
            var randEnc = (Math.random() * 10 + 2)
            currentArea = "wBog"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>You are now in the west bog.</p>").insertBefore("#placeholder")

              if(randEnc > 5){
                var rand = Math.floor(Math.random()* 3)
                $("<p>An aggressive "+bogEnemy[rand].name+" attacks!</p>").insertBefore("#placeholder")
                comBat(bogEnemy[rand].health, bogEnemy[rand].name, bogEnemy[rand].exp)
              }
        }
        else if(input =="go west" && currentArea == "wBog"){
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>You cannot travel west from here.</p>").insertBefore("#placeholder")
        ///////////////////////////////////////////////////////////////////////////////////////////////
        }else if(player.hitpoints <= 0){
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
