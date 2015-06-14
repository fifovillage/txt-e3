////////
// zones
// nBog
// eBogCoast
// eBog
// cBog
// wBog
// wBogCoast
// houseFront
// house
// bogCamp
// caveEntrance
// bugLair
// bugHive


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

equipment = {weapon:"unarmed"}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//bog variables

bug       = false
exsod     = false

bogEnemy  = [
        {name:"bug", health  :75, damage:1, delay:20, exp :15},
        {name:"snake", health:100, damage:2, delay:25, exp:20},
        {name:"crab", health :150, damage:5, delay:50, exp:30}]

bogItem   = [
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

function comBat(enemy){
      $("<p>You attack the "+enemy.name+"!</p>").insertBefore("#Bplaceholder")
      if(equipment.weapon =="unarmed"){
          var delay = 5000
      }else{
          var delay = equipment.weapon.delay * 100
      }
      var enemyHP = enemy.health

      var enemy_combat = setInterval(function(){

                      var edmg = Math.floor(Math.random()*(enemy.damage*10)+1);

                      if(enemyHP > 0){
                          player.hitpoints -= edmg
                          $("<p>The "+enemy.name+" bites your back for "+edmg+"!</p>").insertBefore("#Bplaceholder")
                          $("#combatContainer").scrollTop($("#combatContainer")[0].scrollHeight)
                      }

      }, enemy.delay * 100)

//------------------------------------------------------------------------------------------------------------------

      var player_combat =  setInterval(function(){

                      if(equipment.weapon == "unarmed"){
                        var pdmg = Math.floor(Math.random()*20+1)
                      }else{
                        var pdmg = Math.floor(Math.random()*(equipment.weapon.damage*10)+1)
                      }

                      if(player.hitpoints <= 0){
                          $("<p>YOU DIED</p>").insertBefore("#placeholder")
                          $("#mainConsole").scrollTop($("#mainConsole")[0].scrollHeight)
                          clearInterval(player_combat)
                          clearInterval(enemy_combat)
                      }else if(enemyHP <= 0){
                          $("<p>The "+enemy.name+" has been defeated. It is dead on the ground.</p>").insertBefore("#Bplaceholder")
                          $("#combatContainer").scrollTop($("#combatContainer")[0].scrollHeight)
                          player.experience += enemy.exp
                        clearInterval(player_combat)
                        clearInterval(enemy_combat)
                      }else if(enemyHP > 0){
                          enemyHP -= pdmg
                          $("<p>You strike the "+enemy.name+" for "+pdmg+" damage.</p>").insertBefore("#Bplaceholder")
                          $("#combatContainer").scrollTop($("#combatContainer")[0].scrollHeight)
                      }
       }, delay)
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
        }else if((input =="equip leg" || input =="equip bug leg") && inventory.indexOf(bogItem[0] > -1)){
            equipment.weapon = bogItem[0]
        }

///////////////////////////////////
// NORTHERN BOG CONDITIONS[nBog]
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
        }else if((input =="west" || input =="w") && currentArea == "nBog"){
            var randEnc = (Math.random() * 10 + 2)
            currentArea = "wBogCoast"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>After climbing over a fallen log, you enter the western part of the bog. The sun is setting, and a dark fog settles in over the bog floor. A glint of light catches your eye from beneath a small pile of sod in the bog. The setting sun reveals a set of wagon tracks heading south in the mud of the bog.</p>").insertBefore("#placeholder")

              if(randEnc > 5){
                var rand = Math.floor(Math.random()* 3)
                var e = bogEnemy[rand]
                $("<p>An aggressive "+e.name+" attacks!</p>").insertBefore("#placeholder")
                comBat(e)
              }

        }else if((input =="east" || input =="e") && currentArea == "nBog"){
            var randEnc = (Math.random() * 10 + 2)
            currentArea = "eBogCoast"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>You pop a wheelie from the northern bog coast into the eastern bog coast.</p>").insertBefore("#placeholder")

              if(randEnc > 5){
                var rand = Math.floor(Math.random()* 3)
                var e = bogEnemy[rand]
                $("<p>An aggressive "+e.name+" attacks!</p>").insertBefore("#placeholder")
                comBat(e)
              }

        }else if((input =="south" || input =="s") && currentArea == "nBog"){
            var randEnc = (Math.random() * 10 + 2)
            currentArea = "cBog"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>nBog to cBog</p>").insertBefore("#placeholder")

              if(randEnc > 5){
                var rand = Math.floor(Math.random()* 3)
                var e = bogEnemy[rand]
                $("<p>An aggressive "+e.name+" attacks!</p>").insertBefore("#placeholder")
                comBat(e)
                  }
        }

//////////////////////////////////////////////////////////////////////////////////////////////
//EASTERN BOG COAST CONDITIONS [eBogCoast]

//movement from eBogCoast
        else if((input =="west" || input=="w") && currentArea == "eBogCoast"){
                  currentArea = "nBog"
                  $("<p> >> "+input+"</p>").insertBefore("#placeholder")
                  $("<p>Arrive to north bog from east bog coast.</p>").insertBefore("#placeholder")
              }
            else if((input =="south" || input=="s") && currentArea == "eBogCoast"){
                currentArea = "eBog"
                $("<p> >> "+input+"</p>").insertBefore("#placeholder")
                $("<p>Arrive to east bog from east bog coast.</p>").insertBefore("#placeholder")
            }
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//EASTERN BOG CONDITIONS [eBog]

//movement from eBog
        else if((input =="north" || input=="n") && currentArea == "eBog"){
                  currentArea = "eBogCoast"
                  $("<p> >> "+input+"</p>").insertBefore("#placeholder")
                  $("<p>Arrive to ebogcoast from east bog.</p>").insertBefore("#placeholder")
              }
            else if((input =="west" || input=="w") && currentArea == "eBog"){
                currentArea = "cBog"
                $("<p> >> "+input+"</p>").insertBefore("#placeholder")
                $("<p>Arrive to cbog from east bog.</p>").insertBefore("#placeholder")
            }
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//WESTERN BOG COAST CONDITIONS [wBogCoast]

        else if(input =="examine sod" && currentArea == "wBogCoast"){
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Here lays a fallen bug, its legs worn down to a crude edge by the waters of the bog and the passage of time. You may be able to use one of the legs as an improvised bog bug weapon.</p>").insertBefore("#placeholder")
            exsod = true
        }else if((input =="take leg" || input =="take bug leg") && exsod == true && inventory.indexOf(bogItem[0]) == -1){
            inventory.push(bogItem[0])
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>You place the bog bug's leg into your bottomless bag.</p>").insertBefore("#placeholder")
        }else if((input =="take leg" || input =="take bug leg") && exsod == true && inventory.indexOf(bogItem[0]) > -1){
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>You already have the bug's only salvageable leg.</p>").insertBefore("#placeholder")
}

//movement from wBogCoast
  else if((input =="west" || input=="w") && currentArea == "wBogCoast"){
            currentArea = "houseFront"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>In front of you stands the ramshackle hut you and your mother call home.</p>").insertBefore("#placeholder")
        }
  else if((input =="east" || input=="e") && currentArea == "wBogCoast"){
        currentArea = "nBog"
          $("<p> >> "+input+"</p>").insertBefore("#placeholder")
          $("<p>Travelin from wBogCoast to nBog</p>").insertBefore("#placeholder")
        }
    else if((input =="south" || input=="s") && currentArea == "wBogCoast"){
        currentArea = "wBog"
          $("<p> >> "+input+"</p>").insertBefore("#placeholder")
          $("<p>Travelin from wBogCoast to wBog</p>").insertBefore("#placeholder")
        }

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//FRONT OF HOUSE CONDITIONS [houseFront]


//movement at House Front
        else if((input =="west" || input=="w") && currentArea == "houseFront"){
          currentArea = "house"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Travelin from houseFront to house</p>").insertBefore("#placeholder")
        }
        else if((input =="east" || input=="e") && currentArea == "houseFront"){
          currentArea = "wBogCoast"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Travelin from houseFront to wBogCoast</p>").insertBefore("#placeholder")
        }

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
// MAMA HOUSE CONDITIONS [house]


//movement at house
        else if((input =="east" || input=="e") && currentArea == "house"){
          currentArea = "houseFront"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Traveling from house to houseFront</p>").insertBefore("#placeholder")
        }
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
// WEST BOG CONDITIONS [wBog]


//movement at west bog
        else if((input =="east" || input=="e") && currentArea == "wBog"){
          currentArea = "cBog"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Traveling from wBog to cBog</p>").insertBefore("#placeholder")
        }
        else if((input =="north" || input=="n") && currentArea == "wBog"){
          currentArea = "wBogCoast"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Traveling from house to houseFront</p>").insertBefore("#placeholder")
        }

///////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
// CENTRAL BOG CONDITIONS [cBog]


//movement at central bog
        else if((input =="north" || input=="n") && currentArea == "cBog"){
          currentArea = "nBog"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Traveling from cBog to nBog</p>").insertBefore("#placeholder")
        }
        else if((input =="south" || input=="s") && currentArea == "cBog"){
          currentArea = "sBog"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Traveling from cBog to sBog</p>").insertBefore("#placeholder")
        }
        else if((input =="east" || input=="e") && currentArea == "cBog"){
          currentArea = "eBog"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Traveling from Cbog to ebog</p>").insertBefore("#placeholder")
        }
        else if((input =="west" || input=="w") && currentArea == "cBog"){
          currentArea = "wBog"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Traveling from cbog to wbog</p>").insertBefore("#placeholder")
        }
///////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
// SOUTH BOG CONDITIONS [sBog]


//movement at central bog
        else if((input =="north" || input=="n") && currentArea == "sBog"){
          currentArea = "cBog"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Traveling from sbog to cBog</p>").insertBefore("#placeholder")
        }
        else if((input =="south" || input=="s") && currentArea == "sBog"){
          currentArea = "bogCamp"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Traveling from cBog to bogCamp</p>").insertBefore("#placeholder")
        }
///////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
// BOG CAMP CONDITIONS [bogCamp]


//movement at bog camp
        else if((input =="north" || input=="n") && currentArea == "bogCamp"){
          currentArea = "sBog"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Traveling from cBog to nBog</p>").insertBefore("#placeholder")
        }
        else if((input =="east" || input=="e") && currentArea == "bogCamp"){
          currentArea = "caveEntrance"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Traveling from bogcamp to caveWntrANCe</p>").insertBefore("#placeholder")
        }

///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
// CAVE ENTRANCE CONDITIONS [caveEntrance]


//movement at cave entrance
        else if((input =="west" || input=="w") && currentArea == "caveEntrance"){
          currentArea = "bogCamp"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Traveling from cave entrance to bogo camp</p>").insertBefore("#placeholder")
        }
        else if((input =="east" || input=="e") && currentArea == "caveEntrance"){
          currentArea = "bugLair"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Traveling from caveEntrance to bugLair</p>").insertBefore("#placeholder")
        }
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
// BUG LAIR CONDITIONS [bugLair]


//movement at bug lair
        else if((input =="west" || input=="w") && currentArea == "bugLair"){
          currentArea = "caveEntrance"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Traveling from bug lair to cave entrance</p>").insertBefore("#placeholder")
        }
        else if((input =="east" || input=="e") && currentArea == "bugLair"){
          currentArea = "bugDen"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Traveling from buglair to bugden</p>").insertBefore("#placeholder")
        }
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
// BUG DEN CONDITIONS [bugDen]


//movement at bug den
        else if((input =="east" || input=="e") && currentArea == "bugDen"){
          currentArea = "bugHive"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Traveling from bug den to bug hive</p>").insertBefore("#placeholder")
        }
        else if((input =="west" || input=="w") && currentArea == "bugDen"){
          currentArea = "bugLair"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Traveling from bugden to buglair</p>").insertBefore("#placeholder")
        }
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
// BUG HIVE CONDITIONS [bugHive]


//movement at bug Hive
        else if((input =="west" || input=="w") && currentArea == "bugHive"){
          currentArea = "bugDen"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Traveling from caveEntrance to bugLair</p>").insertBefore("#placeholder")
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
