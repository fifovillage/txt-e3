////////////////////////////////////////////////////////////////////////////////
// initial zone info
var nBogInfo = "<p>[Northern Bog Coast]<br>You are in the northern area of the bog, along the coastline. You admire a bug in the bog water. There seems to be some light shining from the west.</p>"
var eBogCoastInfo = "<p>[Eastern Bog Coast]<br>Stone with mystical runes location</p>"
var eBogInfo  = "<p>[Eastern Bog]<br>Zohar Location</p>"
var cBogInfo  = "<p>[Central Bog]<br></p>"
var sBogInfo  = "<p>[Southern Bog]<br></p>"
var wBogCoastInfo = "<p>[Western Bog Coast]<br>After climbing over a fallen log, you enter the western part of the bog. The sun is setting, and a dark fog settles in over the bog floor. A glint of light catches your eye from beneath a small pile of sod in the bog. The setting sun reveals a set of wagon tracks heading south in the mud of the bog.</p>"
var wBogInfo = "<p>[Western Bog]<br></p>"
var houseFrontInfo = "<p>[Shack - Front Yard]<br>In front of you stands the ramshackle hut you and your mother call home.</p>"
var houseInfo = "<p>[Shack]<br></p>"
var bogCampInfo = "<p>[Bog Camp]<br>A merchant stands there, looking cross-eyed.<br></p>"
var caveEntranceInfo = "<p>[Cave Entrance]<br></p>"
var bugLairInfo = "<p>[Bug Lair]<br></p>"
var bugHiveInfo = "<p>[Bug Hive]<br></p>"
var bugDenInfo = "<p>[Bug Den]<br></p>"

////////////////////////////////////////////////////////////////////////////////
// initial variables

var inCombat = false
var currentArea = "namePlayer"

var player    = {
       level: 1,
       hitpoints:242,
       mana:20,
       experience:0,
       currency: 0,
       name: ""
}

var reqXP     = [
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

var inventory = [];

var equipment = {weapon:"unarmed"}


////////////////////////////////////////////////////////////////////////////////
// bog init variables & functions

var bugDead = false
var bugPickUp = false
var exsod   = false
var bogShop = false
var houseBlock = true
var bugLairBlock = true

// bog bestiary
var bogEnemy  = [
        {name:"bug", health  :75, damage:1, delay:20, exp :15,
              loot:[{name:"Fire Beetle Eye", description:"poop", value:2},
                    {name:"Bug Wing", description:"poop", value:1},
                    {name:"Bug Stinger", description:"poop", value:1}]},
        {name:"snake", health:100, damage:2, delay:25, exp:20,
              loot:[{name:"Snake Legs", description:"poop", value:2},
                    {name:"Snake Venom", description:"poop", value:2},
                    {name:"Half-Digested Bug", description:"poop", value:1}]},
        {name:"crab", health :150, damage:5, delay:50, exp:30,
              loot:[{name:"Crab Meat", description:"poop", value:1},
                    {name:"Broken Crab Leg", description:"poop", value:1},
                    {name:"Crab Eggs", description:"poop", value:3}]}]

// bog item list
var bogItem   = [
        {slot:"primary", name:"Razor Sharp Bug Leg", damage:5, delay:35,
              description:"Could be used as a crude weapon.", value:1},
        {slot:"none", name:"Dead Bug", healing:20,
              description:"Restores a small amount of health.", value:1, quantity: 1}]


// bog merchant item stock
var bogMerchantItem = [
        {name:"Potion", description:"restores 100 health", price:5,
              value:1, quantity:2}]


// bog merchant function
function bogMerchant(input){
  if(input.substring(0, 3) == "buy"){

    if(bogMerchantItem.length == 0){
      $("<p>You bought everything I had to sell! Thanks bubby!</p>").insertBefore("#placeholder")
    }

      for(var i = 0; i < bogMerchantItem.length; i++){

          var merch_item = bogMerchantItem[i].name.toLowerCase()
var itemIndex = inventory.indexOf(bogMerchantItem[i])

          if(input.substring(4) == merch_item && player.currency >= bogMerchantItem[i].price){


//         if(bogMerchantItem != undefined && bogMerchantItem[i].quantity > 0  && inventory.indexOf(bogMerchantItem[i]) > -1){
//           console.log("merchant has more than one and you ahve one in your inventory. that' sall she wrote")
//           // var itemIndex = inventory.indexOf(bogMerchantItem[i])
//           // inventory[itemIndex]["quantity"] ++
//           // bogMerchantItem[i].quantity --
//           // player.currency -= bogMerchantItem[i].price
//           // $("<p style='color:green;'>You purchased the final "+bogMerchantItem[i].name+".</p>").insertBefore("#Bplaceholder")
//           // console.log("merch_item " + merch_item)
//           // console.log("index number " + itemIndex)
//           // console.log("quantity inventory " + inventory[itemIndex]["quantity"])
//           // console.log("quantity bogmerchant" + bogMerchantItem[i].quantity)
//
// }

          if(bogMerchantItem[i].quantity > 1){
                bogMerchantItem[i].quantity -= 1
                inventory.push(bogMerchantItem[i])
                player.currency -= bogMerchantItem[i].price
                $("<p style='color:green;'>You purchased the "+bogMerchantItem[i].name+".</p>").insertBefore("#Bplaceholder")
              }
              else if(bogMerchantItem[i].quantity <= 1){
                  // inventory.push(bogMerchantItem[i])
                  inventory[itemIndex].quantity += 1
                  player.currency -= bogMerchantItem[i].price
                  $("<p style='color:green;'>You purchased the final "+bogMerchantItem[i].name+".</p>").insertBefore("#Bplaceholder")
                  bogMerchantItem.splice(bogMerchantItem[i])
              }
          }
          else if(input.substring(4) == merch_item && player.currency < bogMerchantItem[i].price){
              $("<p>You can't afford that.</p>").insertBefore("#placeholder")
          }
          else{
              $("<p>I don't have that for sale!</p>").insertBefore("#placeholder")
          }
      }
  }
//------------------------------------------------------------------------------
  else if(input.substring(0, 4) == "sell"){
    if(inventory.length == 0){
      $("<p>You have nothing in your inventory to sell.</p>").insertBefore("#placeholder")
    }

      for(var i = 0; i < inventory.length; i++){

          var item_name = inventory[i].name.toLowerCase()

          if(input.substring(5) == item_name){
              $("<p style='color:lime;'>You sell the "+inventory[i].name+" for "+inventory[i].value+" platinum.</p>").insertBefore("#Bplaceholder")
              player.currency += inventory[i].value
              inventory.splice(inventory[i], 1)
          }

      }
  }
  $("#mainConsole").scrollTop($("#mainConsole")[0].scrollHeight);
  $("#combatContainer").scrollTop($("#combatContainer")[0].scrollHeight)

}

///////////////////////////////////////////////////////////////////////////
// cave variables

//cave bestiary
var caveEnemy = []

//cave item list
var caveItem = []

////////////////////////////////////////////////////////////////////////////////
//random encounter section

//bog random encounter
function randomEncounterBog(){
  if((Math.random() * 10 + 2) > 5){
    var rand = Math.floor(Math.random()* 3)
    var e = bogEnemy[rand]
    $("<p>An aggressive "+e.name+" attacks!</p>").insertBefore("#placeholder")
    comBat(e)
  }
}

//cave random encounter
function randomEncounterCave(){
}
///////////////////////////////////////////////////////////////////////////////
//stat window refresh
function refreshStatWindow(){
  maxHP = reqXP[player.level-1] * (player.level + 1) ^2

  $("#playerName").empty()
  $("#lvl").empty()
  $("#hp").empty()
  $("#mp").empty()
  $("#xp").empty()
  $("#currency").empty()

  if(player.hitpoints < 0){
      $("#playerName").append(player.name)
      $("#lvl").append("Level YOU DIED")
      $("#hp").append("Health: YOU DIED")
      $("#mp").append("Mana: YOU DIED")
      $("#xp").append("Exp: NONE YOU DIED")
      $("#currency").append("Bill Fold: AI'NT NAM")
  }else{
      $("#playerName").append(player.name)
      $("#lvl").append("Level " +player.level)
      $("#hp").append("Health: "+player.hitpoints+" / "+maxHP)
      $("#mp").append("Mana: "+player.mana)
      $("#xp").append("Exp: "+player.experience+" / "+reqXP[player.level - 1])
      $("#currency").append("Bill Fold: "+player.currency+ " platinum")
  }
}
////////////////////////////////////////////////////////////////////////////////
// da combat code
function comBat(enemy){
      inCombat = true

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

//------------------------------------------------------------------------------

      var player_combat =  setInterval(function(){

                      if(equipment.weapon == "unarmed"){
                        var pdmg = Math.floor(Math.random()*20+1)
                      }else{
                        var pdmg = Math.floor(Math.random()*(equipment.weapon.damage*10)+1)
                      }

                      if(player.hitpoints <= 0){
                          $("<p>YOU DIED</p>").insertBefore("#placeholder")
                          $("#mainConsole").scrollTop($("#mainConsole")[0].scrollHeight)
                          inCombat = false
                          clearInterval(player_combat)
                          clearInterval(enemy_combat)
                      }else if(enemyHP <= 0){
                          player.experience += enemy.exp

                          $("<p>The "+enemy.name+" has been defeated. It is dead on the ground.</p>").insertBefore("#Bplaceholder")
                          $("<p>You gain "+enemy.exp+" experience!</p>").insertBefore("#placeholder")
                          $("#combatContainer").scrollTop($("#combatContainer")[0].scrollHeight)
                          $("#mainConsole").scrollTop($("#mainConsole")[0].scrollHeight)
                          inCombat = false
                        clearInterval(player_combat)
                        clearInterval(enemy_combat)
                        lootDrop(enemy)
                      }else if(enemyHP > 0){
                          enemyHP -= pdmg
                          $("<p>You strike the "+enemy.name+" for "+pdmg+" damage.</p>").insertBefore("#Bplaceholder")
                          $("#combatContainer").scrollTop($("#combatContainer")[0].scrollHeight)
                      }
       }, delay)
}

////////////////////////////////////////////////////////////////////////////////
// enemy loot drops

function lootDrop(enemy){
  var money = Math.floor((Math.random()*2+1) * enemy.damage)
  player.currency += money

  var ran = Math.floor(Math.random()*3)
  var item_drop = enemy.loot[ran]

  inventory.push(item_drop)
  $("<p>You received "+item_drop.name+" and "+money+" platinum from the fallen "+enemy.name+".</p>").insertBefore("#placeholder")
  $("#mainConsole").scrollTop($("#mainConsole")[0].scrollHeight)
}

////////////////////////////////////////////////////////////////////////////////
// input

$(document).ready(function(){
setInterval(refreshStatWindow, 100)

    $("form").submit(function(){
      var input = $("#cmdLine").val().toLowerCase();


      if(player.hitpoints > 0){

////////////////////////////////////////////////////////////////////////////////
// NAME PLAYER

      if(currentArea=="namePlayer"){
          player.name = input
          currentArea = "nBog"
          $("<p> >> "+input+"</p>").insertBefore("#placeholder")
          $("<p>So you are called " + input + ".</p>").insertBefore("#placeholder")
          $("<p>A BRIGHT LIGHT FILLS YOUR VISION...</p>").fadeIn(3000).insertBefore("#placeholder")
          setTimeout(
            function(){
                    $("#mainConsole").empty().append("<div id=\"placeholder\"></div>")
                    $("<p>[Northern Bog Coast]<br>You are in the northern area of the bog, along the coastline. After admiring a bug in the bog water, you hear your mother calling for you in the distance. \"It's time you came back for dinner, " + player.name + "!\", she shouts. Your mind wanders as to how you will make the long slog through the bog in time. There seems to be some light shining from the west.</p><p>Type <b>help</b> for a list of commands</p>").fadeIn(200).insertBefore("#placeholder")
            },3500)
      }



////////////////////////////////////////////////////////////////////////////////
// HELP INPUT

        else if(input == "help"){
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Here go a list of commands:<br> (n)orth / (s)outh / (e)ast / (w)est<br>look<br>get/take [object]<br>examine [object]<br>attack [object/person/creature]<br>talk to [object/person/creature]<br>inventory<br>use [inventory item]<br>equip [weapon]<br></p>").insertBefore("#placeholder")

////////////////////////////////////////////////////////////////////////////////
//INVENTORY COMMANDS

        }else if(input =="inventory"){
            if(inventory.length > 0){
              $("<p>Bottomless Bag:<br></p>").insertBefore("#placeholder")
              for(var i = 0; i < inventory.length; i++){
                  $("<p>Slot ["+(i+1)+"] -- "+inventory[i].name+"&nbsp;&nbsp;&nbsp;&nbsp;Quantity: "+inventory[i].quantity+"<br>---------"+inventory[i].description+"<br></p>").insertBefore("#placeholder")
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
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>You equip the bug leg.</p>").insertBefore("#placeholder")
            equipment.weapon = bogItem[0]
        }


////////////////////////////////////////////////////////////////////////////////
// NORTHERN BOG CONDITIONS[nBog]

        else if((input == "take bug" || input == "get bug") && currentArea == "nBog"){
          $("<p> >> "+input+"</p>").insertBefore("#placeholder")

            if(player.hitpoints <= 5 && bugDead == false){
              $("<p>One more time and that bug will kill you.</p>").insertBefore("#placeholder")

            }else if(bugDead == false){
              $("<p>The bug bit you for 5 damage!</p>").insertBefore("#placeholder")
              player.hitpoints -= 5
            }else if(bugDead == true && bugPickUp == false){
              $("<p>You pick up the bug from the bog and place it in your bag.</p>").insertBefore("#placeholder")
              inventory.push(bogItem[1])
              bugPickUp = true
              nBogInfo = nBogInfo.replace("You admire a bug in the bog water. ", "")
            }else if(bugDead == true && bugPickUp == true){
              $("<p>You already picked up the bug.</p>").insertBefore("#placeholder")
            }
        }else if(input =="attack bug" && currentArea == "nBog" && bugDead == false){
          $("<p> >> "+input+"</p>").insertBefore("#placeholder")
          $("<p>You crush the bug into the bog, it is dead.</p>").insertBefore("#placeholder")
          bugDead = true;


//look nBog
        }else if(input =="look" && currentArea == "nBog"){
          $("<p> >> "+input+"</p>").insertBefore("#placeholder")
          $(nBogInfo).insertBefore("#placeholder")

//movement: northern bog

        }else if((input =="west" || input =="w") && currentArea == "nBog"){
            currentArea = "wBogCoast"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(wBogCoastInfo).insertBefore("#placeholder")
            randomEncounterBog()

        }else if((input =="east" || input =="e") && currentArea == "nBog"){
            currentArea = "eBogCoast"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(eBogCoastInfo).insertBefore("#placeholder")
            randomEncounterBog()

        }else if((input =="south" || input =="s") && currentArea == "nBog"){
            currentArea = "cBog"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(cBogInfo).insertBefore("#placeholder")
            randomEncounterBog()
        }

////////////////////////////////////////////////////////////////////////////////
//EASTERN BOG COAST CONDITIONS [eBogCoast]


//look eBogCoast
        else if(input =="look" && currentArea == "eBogCoast"){
          $(eBogCoastInfo).insertBefore("#placeholder")
            }

//movement from eBogCoast
        else if((input =="west" || input=="w") && currentArea == "eBogCoast"){
                  currentArea = "nBog"
                  $("<p> >> "+input+"</p>").insertBefore("#placeholder")
                  $(nBogInfo).insertBefore("#placeholder")
                  randomEncounterBog()
              }
            else if((input =="south" || input=="s") && currentArea == "eBogCoast"){
                currentArea = "eBog"
                $("<p> >> "+input+"</p>").insertBefore("#placeholder")
                $(eBogInfo).insertBefore("#placeholder")
                randomEncounterBog()
            }
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//EASTERN BOG CONDITIONS [eBog]


//look eBog
else if(input =="look" && currentArea == "eBog"){
  $(eBogInfo).insertBefore("#placeholder")
    }

//movement from eBog
        else if((input =="north" || input=="n") && currentArea == "eBog"){
                  currentArea = "eBogCoast"
                  $("<p> >> "+input+"</p>").insertBefore("#placeholder")
                  $(eBogCoastInfo).insertBefore("#placeholder")
                  randomEncounterBog()
              }
            else if((input =="west" || input=="w") && currentArea == "eBog"){
                currentArea = "cBog"
                $("<p> >> "+input+"</p>").insertBefore("#placeholder")
                $(cBogInfo).insertBefore("#placeholder")
                randomEncounterBog()
            }
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//WESTERN BOG COAST CONDITIONS [wBogCoast]

        else if(input =="examine sod" && currentArea == "wBogCoast"){
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>Here lays a fallen bug, its legs worn down to a crude edge by the waters of the bog and the passage of time. You may be able to use one of the legs as an improvised bog bug weapon.</p>").insertBefore("#placeholder")
            exsod = true
        }else if((input =="take leg" || input =="take bug leg" || input=="get leg" || input=="get bug leg") && exsod == true && inventory.indexOf(bogItem[0]) == -1){
            inventory.push(bogItem[0])
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>You place the bog bug's leg into your bottomless bag.</p>").insertBefore("#placeholder")
        }else if((input =="take leg" || input =="take bug leg") && exsod == true && inventory.indexOf(bogItem[0]) > -1){
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>You already have the bug's only salvageable leg.</p>").insertBefore("#placeholder")
}

//look wBogCoast
      else if(input =="look" && currentArea == "wBogCoast"){
        $(wBogCoastInfo).insertBefore("#placeholder")
          }

//movement from wBogCoast
  else if((input =="west" || input=="w") && currentArea == "wBogCoast"){
            currentArea = "houseFront"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(houseFrontInfo).insertBefore("#placeholder")
        }
  else if((input =="east" || input=="e") && currentArea == "wBogCoast"){
        currentArea = "nBog"
          $("<p> >> "+input+"</p>").insertBefore("#placeholder")
          $(nBogInfo).insertBefore("#placeholder")
          randomEncounterBog()
        }
    else if((input =="south" || input=="s") && currentArea == "wBogCoast"){
        currentArea = "wBog"
          $("<p> >> "+input+"</p>").insertBefore("#placeholder")
          $(wBogInfo).insertBefore("#placeholder")
          randomEncounterBog()
        }

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//FRONT OF HOUSE CONDITIONS [houseFront]

//look houseFront
else if(input =="look" && currentArea == "houseFront"){
  $(houseFrontInfo).insertBefore("#placeholder")
    }

//movement at House Front
        else if((input =="west" || input=="w") && currentArea == "houseFront" && houseBlock == false){
          currentArea = "house"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(houseInfo).insertBefore("#placeholder")
        }
        else if((input =="west" || input=="w") && currentArea == "houseFront" && houseBlock == true){
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>You bust into a blockade.</p>").insertBefore("#placeholder")
        }
        else if((input =="east" || input=="e") && currentArea == "houseFront"){
          currentArea = "wBogCoast"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(wBogCoastInfo).insertBefore("#placeholder")
            randomEncounterBog()
        }

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// MAMA HOUSE CONDITIONS [house]

//look house
else if(input =="look" && currentArea == "house"){
  $(houseInfo).insertBefore("#placeholder")
    }
//movement at house
        else if((input =="east" || input=="e") && currentArea == "house"){
          currentArea = "houseFront"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(houseFrontInfo).insertBefore("#placeholder")
        }
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// WEST BOG CONDITIONS [wBog]

//look wBog
else if(input =="look" && currentArea == "wBog"){
  $(wBogInfo).insertBefore("#placeholder")
    }

//movement at west bog
        else if((input =="east" || input=="e") && currentArea == "wBog"){
          currentArea = "cBog"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(cBogInfo).insertBefore("#placeholder")
            randomEncounterBog()
        }
        else if((input =="north" || input=="n") && currentArea == "wBog"){
          currentArea = "wBogCoast"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(wBogCoastInfo).insertBefore("#placeholder")
            randomEncounterBog()
        }

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// CENTRAL BOG CONDITIONS [cBog]


//look for CbOG
else if(input =="look" && currentArea == "cBog"){
  $(cBogInfo).insertBefore("#placeholder")
    }

//movement at central bog
        else if((input =="north" || input=="n") && currentArea == "cBog"){
          currentArea = "nBog"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(nBogInfo).insertBefore("#placeholder")
            randomEncounterBog()
        }
        else if((input =="south" || input=="s") && currentArea == "cBog"){
          currentArea = "sBog"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(sBogInfo).insertBefore("#placeholder")
            randomEncounterBog()
        }
        else if((input =="east" || input=="e") && currentArea == "cBog"){
          currentArea = "eBog"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(eBogInfo).insertBefore("#placeholder")
            randomEncounterBog()
        }
        else if((input =="west" || input=="w") && currentArea == "cBog"){
          currentArea = "wBog"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(wBogInfo).insertBefore("#placeholder")
            randomEncounterBog()
        }
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// SOUTH BOG CONDITIONS [sBog]


//look for sbOg
else if(input =="look" && currentArea == "sBog"){
  $(sBogInfo).insertBefore("#placeholder")
    }

//movement at central bog
        else if((input =="north" || input=="n") && currentArea == "sBog"){
          currentArea = "cBog"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(cBogInfo).insertBefore("#placeholder")
            randomEncounterBog()
        }
        else if((input =="south" || input=="s") && currentArea == "sBog"){
          currentArea = "bogCamp"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(bogCampInfo).insertBefore("#placeholder")
        }

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// BOG CAMP CONDITIONS [bogCamp]

//look for bogCamp
else if(input =="look" && currentArea == "bogCamp"){
  $(bogCampInfo).insertBefore("#placeholder")
    }

//movement at bog camp
        else if((input =="north" || input=="n") && currentArea == "bogCamp" && bogShop == false){
          currentArea = "sBog"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(sBogInfo).insertBefore("#placeholder")
            randomEncounterBog()
        }
        else if((input =="east" || input=="e") && currentArea == "bogCamp" && bogShop == false){
          currentArea = "caveEntrance"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(caveEntranceInfo).insertBefore("#placeholder")
        }

//bog camp merchant
        else if((input =="talk to merchant" || input=="talk merchant") && currentArea == "bogCamp" && bogShop == false){
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            bogShop = true
            $("<p>Welcome to em' shop! Type <b>list</b> to display items for sale, <b>buy [item]</b> to purchase and <b>sell [item]</b> to sell! If you're all done, <b>leave</b>!</p>").insertBefore("#placeholder")
        }
        else if(input =="list" && currentArea == "bogCamp" && bogShop == true){
          if(bogMerchantItem.length == 0){
            $("<p style='color:white;'>There are no items left in stock.</p>").insertBefore("#Bplaceholder")
          }
          else{
            for(var i = 0; i < bogMerchantItem.length; i++){
                $("<p style='color:white;'>--"+bogMerchantItem[i].name+"<br>----"+bogMerchantItem[i].description+"<br>Price: "+bogMerchantItem[i].price+" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Stock: "+bogMerchantItem[i].quantity+"</p>").insertBefore("#Bplaceholder")
            }
          }
        }
        else if((input.substring(0, 3) == "buy" || input.substring(0, 4) == "sell") && bogShop == true){
            bogMerchant(input)
        }
        else if(input =="leave" && currentArea =="bogCamp" && bogShop == true){
            bogShop = false
            $("<p>Thanks for shopping!</p>").insertBefore("#placeholder")
        }

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// CAVE ENTRANCE CONDITIONS [caveEntrance]

//look for caveEntrance
else if(input =="look" && currentArea == "caveEntrance"){
  $(caveEntranceInfo).insertBefore("#placeholder")
    }

//movement at cave entrance
        else if((input =="east" || input=="e") && currentArea == "caveEntrance" && bugLairBlock == true){
          $("<p> >> "+input+"</p>").insertBefore("#placeholder")
          $("<p>You bust into a blockade.</p>").insertBefore("#placeholder")
        }
        else if((input =="east" || input=="e") && currentArea == "caveEntrance" && bugLairBlock == false){
          currentArea = "bugLair"
          $("<p> >> "+input+"</p>").insertBefore("#placeholder")
          $(bugLairInfo).insertBefore("#placeholder")
        }
        else if((input =="west" || input=="w") && currentArea == "caveEntrance"){
          currentArea = "bogCamp"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(bogCampInfo).insertBefore("#placeholder")
        }
        else if((input =="east" || input=="e") && currentArea == "caveEntrance"){
          currentArea = "bugLair"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(bugLairInfo).insertBefore("#placeholder")
        }

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// BUG LAIR CONDITIONS [bugLair]

//look for bugLair
else if(input =="look" && currentArea == "bugLair"){
  $(bugLairInfo).insertBefore("#placeholder")
    }
//movement at bug lair
        else if((input =="west" || input=="w") && currentArea == "bugLair"){
          currentArea = "caveEntrance"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(caveEntranceInfo).insertBefore("#placeholder")
        }


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// BUG DEN CONDITIONS [bugDen]


//look bugDen
else if(input =="look" && currentArea == "bugDen"){
  $(bugDenInfo).insertBefore("#placeholder")
    }

//movement at bug den
        else if((input =="east" || input=="e") && currentArea == "bugDen"){
          currentArea = "bugHive"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(bugHiveInfo).insertBefore("#placeholder")
        }
        else if((input =="west" || input=="w") && currentArea == "bugDen"){
          currentArea = "bugLair"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(bugLairInfo).insertBefore("#placeholder")
        }
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// BUG HIVE CONDITIONS [bugHive]

//look at bug hive
else if(input =="look" && currentArea == "bugHive"){
  $(bugHiveInfo).insertBefore("#placeholder")
    }

//movement at bug Hive
        else if((input =="west" || input=="w") && currentArea == "bugHive"){
          currentArea = "bugDen"
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $(bugDenInfo).insertBefore("#placeholder")
        }
////////////////////////////////////////////////////////////////////////////////
// death condition
        else if(player.hitpoints <= 0){
            $("<p>YOU DEAD</p>").insertBefore("#placeholder")
        }

// wrong command condition
        else{
            $("<p> >> "+input+"</p>").insertBefore("#placeholder")
            $("<p>I don't understand "+input+".</p>").insertBefore("#placeholder")
        }
      }

//empty out the command line
      $("#cmdLine").val("");

//scroll to the bottom
      $("#mainConsole").scrollTop($("#mainConsole")[0].scrollHeight);
      $("#combatContainer").scrollTop($("#combatContainer")[0].scrollHeight)
    })

});
