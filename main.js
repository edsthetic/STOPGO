title = "Stop & Go";

description = `  [Tap] To Move

   Move On Green
   Stop On Red`;

characters = [];

options = {
  isPlayingBgm: true,
  seed : 3

};


/**
 * @typedef {{
 * pos: Vector,
 * }} Player
 */

/**
 * @type { Player }
 */
 let player;
 let enemies = [];
 let light;
 let endGame;
 let colors = [];





function update() {
  if (!ticks) {
    endGame = false;
    colors = ["cyan", "purple", "blue", "black", "light_blue", "light_purple", "light_cyan", "light_black"]
    enemies = [];
    //size is 9x9
    player = {
      pos: vec(44, 90),
    };

    light = {
      pos: vec(40, 5),
      color: "red",
      colorTimer: 40,
    };

    for (let i = 8; i <= 36; i+=10){

    enemies.push({
      pos: vec(i, 90),
      color:colors.pop(),
      isKilled: false
    });
    }

    for (let j = 61; j <= 85; j+=10){
    enemies.push({
      pos: vec(j, 90),
      color:colors.pop(),
      isKilled: false
    });
    }

    console.log(enemies);
  }

  color("black");
  //finish line
  rect(0, 20, 99, 3);

  //light color (can make prettier later)
  color(light.color);
  rect(46, 8, 4, 4);

  //change light color
  if(light.color == "red" && light.colorTimer <= 0){
    light.color = "green";
    //green light timer
    light.colorTimer = 180 + getRandomInt(300);
  }

  if(light.color == "yellow" && light.colorTimer <= 0){
    light.color = "red";
    //red light timer
    light.colorTimer = 180 + getRandomInt(300);
  }

  if(light.color == "green" && light.colorTimer <= 0){
    light.color = "yellow";
    //yellow light timer
    light.colorTimer = 120 + getRandomInt(240);
  }


  //enemy movement
  enemies.forEach(enemy => moveEnemy(enemy));

  //player movement
  color("green");
  if(input.isJustPressed){
    player.pos.add(vec(0, -1));
    if(light.color === "green"){
      addScore(10, player.pos.x, player.pos.y)
      play("powerUp");
    }
    if(light.color === "yellow"){
      addScore(50, player.pos.x, player.pos.y)
      play("powerUp");
    }
    if(light.color === "red"){
      play("explosion");
      addScore(-100);
      end('GAME OVER');
    }
  }
  endGame = rect(player.pos, 9, 9).isColliding.rect.black;

  if(endGame){
    addScore(1000);
    play("explosion");
    end('You Win !');
  }

}

function moveEnemy(enemy){

  let moveChance = getRandomInt(10000);

  if(!enemy.isKilled){
    if(light.color === "green" && moveChance <= 1000){
      enemy.pos.add(vec(0,-1));
    }
  
    if(light.color === "yellow" && moveChance <= 300){
      enemy.pos.add(vec(0,-1));
    }
  
    if(light.color === "red" && moveChance <= 25){
      enemy.pos.add(vec(0,-1));
      enemy.isKilled = true;
      enemy.color = "red"
    }
  }
  color(enemy.color);
  endGame = rect(enemy.pos, 9, 9).isColliding.rect.black;

  //console.log(endGame);
  if(endGame){
    play("explosion");
    addScore(-100);
    end('Be Faster');
  }

  //reduce color timer
  light.colorTimer -= 1;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

addEventListener("load", onLoad);
