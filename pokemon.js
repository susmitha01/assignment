window.onload = function() {
    'use strict';
  
    var canvas = document.getElementById('canvas');
    var contextData = canvas.getContext('2d');
    var w = document.getElementById('canvas').offsetWidth;
    var h = document.getElementById('canvas').offsetHeight;
    var terrainImageLoaded = false,
        pokeballImageLoaded = false,
        playerImageLoaded = false;
    var objectSizes = 20;
    var speed = 100;
    var modifier = 100;
    var score = 0;
  
    //terrain image
    var terrainImage = new Image();
    terrainImage.onload = function() {
      terrainImageLoaded = true;
      assetsLoaded();
    };
    terrainImage.src = 'https://drive.google.com/uc?id=1o9rhnAr2GIilfjxPm4Wdl1BlaVP4Gsj1';
  
    
    //player image
    var playerImage = new Image();
    playerImage.onload = function() {
      pokeballImageLoaded = true;
      assetsLoaded();
    };
    playerImage.src = 'https://drive.google.com/uc?id=1BHVg63P-2crV5xaGmigTqQlzSRQ-cdaC';
  
    //pokeball image
    var pokeballImage = new Image();
    pokeballImage.onload = function() {
      playerImageLoaded = true;
      assetsLoaded();
    };
    pokeballImage.src = 'https://drive.google.com/uc?id=1XiXaiRlytnRI2ncwnBWyyef79guxI55X';
  
    var pokeball = {
      x: 0,
      y: 0,
      spritePosition: 0,
      spriteItemDistance: 33,
    };
    pokeball.generatePosition = function() {
      do {
        pokeball.x = Math.floor(Math.random() * 20) + 1;
        pokeball.y = Math.floor(Math.random() * 16) + 4;
      } while (check_collision(pokeball.x, pokeball.y));
  
      pokeball.spritePosition = Math.floor(Math.random() * 4) + 0; // get position from 0-4
    };
  
    
    var player = {
      x: Math.round(w / 2 / objectSizes),
      y: Math.round(h / 2 / objectSizes),
      currentDirection: 'stand',
      direction: {
        stand: {
          x: 0,
          y: 0,
        },
        'down-1': {
          x: 17,
          y: 0,
        },
        'down-2': {
          x: 34,
          y: 0,
        },
        'up-1': {
          x: 125,
          y: 0,
        },
        'up-2': {
          x: 142,
          y: 0,
        },
        'left-1': {
          x: 69,
          y: 0,
        },
        'left-2': {
          x: 87,
          y: 0,
        },
        'right-1': {
          x: 160,
          y: 0,
        },
        'right-2': {
          x: 178,
          y: 0,
        },
      },
    };
    player.move = function(direction) {
     
      var hold_player = {
        x: player.x,
        y: player.y,
      };
  
     // Directions
      switch (direction) {
        case 'left':
          player.x -= speed / modifier;
          if (player.currentDirection == 'stand') {
            player.currentDirection = 'left-1';
          } else if (player.currentDirection == 'left-1') {
            player.currentDirection = 'left-2';
          } else if (player.currentDirection == 'left-2') {
            player.currentDirection = 'left-1';
          } else {
            player.currentDirection = 'left-1';
          }
          break;
        case 'right':
          player.x += speed / modifier;
          if (player.currentDirection == 'stand') {
            player.currentDirection = 'right-1';
          } else if (player.currentDirection == 'right-1') {
            player.currentDirection = 'right-2';
          } else if (player.currentDirection == 'right-2') {
            player.currentDirection = 'right-1';
          } else {
            player.currentDirection = 'right-1';
          }
          break;
        case 'up':
          player.y -= speed / modifier;
  
          if (player.currentDirection == 'stand') {
            player.currentDirection = 'up-1';
          } else if (player.currentDirection == 'up-1') {
            player.currentDirection = 'up-2';
          } else if (player.currentDirection == 'up-2') {
            player.currentDirection = 'up-1';
          } else {
            player.currentDirection = 'up-1';
          }
  
          break;
        case 'down':
          player.y += speed / modifier;
  
          if (player.currentDirection == 'stand') {
            player.currentDirection = 'down-1';
          } else if (player.currentDirection == 'down-1') {
            player.currentDirection = 'down-2';
          } else if (player.currentDirection == 'down-2') {
            player.currentDirection = 'down-1';
          } else {
            player.currentDirection = 'down-1';
          }
  
          break;
      }
  
    
      if (check_collision(player.x, player.y)) {
        player.x = hold_player.x;
        player.y = hold_player.y;
      }
  
      if (player.x == pokeball.x && player.y == pokeball.y) {
        // found a pokeball !! create a new one
        console.log('found a pokeball of ' + pokeball.spritePosition + '! Bravo! ');
        score += 1;
        pokeball.generatePosition();
      }
      update();
    };
  
  // CREATING IMAGE WIDTH
    function update() {
        contextData.drawImage(terrainImage, 0, 0);
        board();
  
      //pokeball
      contextData.drawImage(
        pokeballImage,
        pokeball.spritePosition * pokeball.spriteItemDistance,
        0,
        objectSizes,
        objectSizes,
        pokeball.x * objectSizes,
        pokeball.y * objectSizes,
        objectSizes,
        objectSizes
      );
  
      //player
      console.log('y:', (player.y * objectSizes) / objectSizes);
      console.log('x', (player.x * objectSizes) / objectSizes);
      contextData.drawImage(
        playerImage,
        player.direction[player.currentDirection].x,
        player.direction[player.currentDirection].y,
        objectSizes - 2,
        objectSizes,
        player.x * objectSizes,
        player.y * objectSizes,
        objectSizes,
        objectSizes
      );
    }
  
   
    function check_collision(x, y) {
      var foundCollision = false;
  
      if ((x > 3 && x < 9 && y == 6) || (x > 4 && x < 9 && (y == 5 || y == 4 || y == 3))) {
        console.log('on house');
        foundCollision = true;
      }
  
      if (
        x < 1 ||
        x > 20 ||
        y < 2 ||
        y > 20 ||
        (y > 0 && y < 4 && (x == 20 || x == 19)) || //right corner
        (y > 0 && y < 4 && (x == 2 || x == 3)) || //left corner
        (y > 18 && (x == 2 || x == 3)) || //left corner
        (x > 17 && (y == 19 || y == 20)) || //left corner
        (x > 19 && (y == 17 || y == 18)) //left corner 2
      ) {
        console.log('lost on the woods');
        foundCollision = true;
      }
  
      return foundCollision;
    }
  
   //CREATING BOARD WITH SCORE
    function board() {
        contextData.fillStyle = 'rgba(0, 0, 0, 0.5)';
        contextData.fillRect(w - 100, h - 70, 100, 70);
  
        contextData.font = '18px Arial';
        contextData.fillStyle = 'rgba(255, 255, 255, 1)';
        contextData.fillText('Total Score', w - 93, h - 55);
  
        contextData.font = '14px Arial';
        contextData.fillStyle = 'rgba(255, 255, 255, 1)';
        contextData.fillText(score + ' pockeballs', w - 85, h - 25);
    }
  
   //IF ASSEST ARE READY START TO UPDATING
    function assetsLoaded() {
      if (
        terrainImageLoaded == true &&
        pokeballImageLoaded == true &&
        playerImageLoaded == true
      ) {
        pokeball.generatePosition();
        update();
      }
    }
  
    //Arrow key for player to move
    document.onkeydown = function(e) {
      e = e || window.event;
  
      if (e.keyCode == '37') player.move('left');
      else if (e.keyCode == '38') player.move('up');
      else if (e.keyCode == '39') player.move('right');
      else if (e.keyCode == '40') player.move('down');
    };
  };
  