player    = {
       level: 1,
       hitpoints:242,
       mana:20,
       experience:0
}

reqXP     = [
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
//bog variables

bug = false
exsod = false

bogEnemy    = [
        {name:"bug", health  :75, exp :15},
        {name:"snake", health:100, exp:20},
        {name:"crab", health :150, exp:30}]

bogItem = [
        {slot:"primary", name:"Razor Sharp Bug Leg", damage:5, delay:35, description:"Could be used as a crude weapon."},
        {slot:"none", name:"Dead Bug", healing:20, description:"Eat this to restore a small amount of health."}
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

currentArea = "nBog"


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function refreshStatWindow(){
  maxHP = reqXP[player.level-1] * (player.level + 1) ^2

  $("#lvl").empty()
  $("#hp").empty()
  $("#mp").empty()
  $("#xp").empty()

  if(player.hitpoints < 0){
      $("#lvl").append("Level YOU DIED")
      $("#hp").append("Health: YOU DIED")
      $("#mp").append("Mana  : YOU DIED")
      $("#xp").append("Exp   : NONE YOU DIED")
  }else{
      $("#lvl").append("Level " +player.level)
      $("#hp").append("Health: "+player.hitpoints+" / "+maxHP)
      $("#mp").append("Mana  : "+player.mana)
      $("#xp").append("Exp   : "+player.experience+" / "+reqXP[player.level - 1])
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
///////////////////////////////////////INVENTORY COMMANDS
        }else if(input =="inventory"){
            if(inventory.length > 0){
              for(var i = 0; i < inventory.length; i++){
                  $("<p>Slot ["+(i+1)+"] -- "+inventory[i].name+"<br>---------"+inventory[i].description+"<br><br></p>").insertBefore("#placeholder")
              }
            }else{
              $("<p>Your bag is empty.</p>").insertBefore("#placeholder")
            }
        }else if((input =="use dead bug" || input =="use bug") && inventory.indexOf(bogItem[1]) > -1){
          $("<p> >> "+input+"</p>").insertBefore("#placeholder")
          if(player.hitpoints < maxHP){
              player.hitpoints += bogItem[1].healing
              if(player.hitpoints > maxHP){
                  player.hitpoints = maxHP
              }
          }
          $("<p>You eat the dead bug and restore "+inventory[inventory.indexOf(bogItem[1])].healing+" health. Yucky.</p>").insertBefore("#placeholder")
          inventory.splice(inventory.indexOf(bogItem[1]), 1)
        }
///////////////////////////////////NORTHERN BOG CONDITIONS
        else if(input == "take bug" && currentArea == "nBog"){
          $("<p> >> "+input+"</p>").insertBefore("#placeholder")

            if(player.hitpoints <= 5 && bug == false){
              $("<p>One more time and that bug will kill you.</p>").insertBefore("#placeholder")

            }else if(bug == false){
              $("<p>The bug bit you for 5 damage!</p>").insertBefore("#placeholder")
              player.hitpoints -= 5
            }else if(bug == true && inventory.indexOf(bogItem[1]) == -1){
              $("<p>You pick up the bug from the bog and place it in your bag.</p>").insertBefore("#placeholder")
              inventory.push(bogItem[1])
            }else if(bug == true && inventory.indexOf(bogItem[1]) > -1){
              $("<p>You already picked up the bug.</p>").insertBefore("#placeholder")
            }
        }else if(input =="attack bug" && currentArea == "nBog" && bug == false){
          $("<p>You crush the bug into the bog, it is dead.</p>").insertBefore("#placeholder")
          bug = true;
        }

        else if(input =="go west" && currentArea == "nBog"){
            var randEnc = (Math.random() * 10 + 2)
            currentArea = "wBog"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>After climbing over a fallen log, you enter the western part of the bog. The sun is setting, and a dark fog settles in over the bog floor. A glint of light catches your eye from beneath a small pile of sod in the bog. The setting sun reveals a set of wagon tracks heading south in the mud of the bog.</p>").insertBefore("#placeholder")

              if(randEnc > 5){
                var rand = Math.floor(Math.random()* 3)
                $("<p>An aggressive "+bogEnemy[rand].name+" attacks!</p>").insertBefore("#placeholder")
                comBat(bogEnemy[rand].health, bogEnemy[rand].name, bogEnemy[rand].exp)
              }
        }
        //////////////////////////////////////////////////////////////////////////////////////////////
        //WESTERN BOG CONDITIONS
        else if(input =="go west" && currentArea == "wBog"){
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>You cannot travel west from here.</p>").insertBefore("#placeholder")
        }else if(input =="examine sod" && currentArea == "wBog" && exsod == false){
            $("<p>Here lays a fallen bug, its legs worn down to a crude edge by the waters of the bog and the passage of time. You may be able to use one of the legs as an improvised bog bug weapon.</p>").insertBefore("#placeholder")
            exsod = true
        }else if((input =="take leg" || input =="take bug leg") && exsod == true){
            inventory.push(bogItem[0])
            $("<p>You place the bog bug's leg into your bag.</p>").insertBefore("#placeholder")
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////
        else if(player.hitpoints <= 0){
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
