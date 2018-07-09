// Enemies our player must avoid
let score = 0;//initialize score variable
let lifes=5;//initialize a lifes variable that decrements at each collision

//function that draws the score on canvas and called from render function
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);

}

//function that draws lifes on the canvas and called from render function
function drawLifes(){
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lifes: "+lifes, 410, 20);

}

//an initialize function that gets called everytime user wins or loses
function initGame(){
  score=0;
  lifes=5;
  player.x=202;
  player.y=404;
  allEnemies.forEach(function(enemy){
    enemy.x=0;
  })
}

//an enemy class carrying all enemy properties and functions
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(x,y){
      this.sprite = 'images/enemy-bug.png';
      this.speed = Math.floor(Math.random() * 250 + 1);
      this.x=x;
      this.y=y;

    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x+= this.speed*dt;
        //if condition to handle enemy exceeding boundaries by regenerating it
        if(this.x>=505){
          this.x=0;
        }
        //collisions checking
        if (player.x < this.x + 60
          && player.x + 37 > this.x
          && player.y < this.y + 25
          && 30 + player.y > this.y) {
            player.x = 202;
            player.y = 404;
            lifes--;
        }
        //if condition to reset game when lifes is less than 0
        //and alert lost
        if(lifes<=0){
          alert("YOU LOST!!")
          initGame();
        }
  }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        drawScore();
        drawLifes();
    }
}




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player{
  constructor(){
    this.sprite='images/char-cat-girl.png'
    this.x=202;
    this.y=404;

  }
  //update function for player
  update(){
    //if condition that increments score when player reaches water
    //and resets player's position
    if(this.y<=-26)
    {
      this.x = 202;
      this.y = 404;
      score++;
    }

    //if condition to alert win when player reaches target score
    if(score>=10){
      alert("YOU WIN!!");
      initGame();
    }

    //if condition to prevent score from decrementing under 0
    if(score<0){
      score=0;
    }

    //if condition to alert lost when player loses
    if(lifes<=0){
      alert("YOU LOST");
      initGame();
    }


  }

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

  }
  //a function called with the arguments as the key pressed
  //it then checks the value of each key and moves the player accordingly
  handleInput(keyPressed){

      switch(keyPressed){
        case 'up':
          if(this.y<=0){
            return;
          }
          else{
            this.y-=86;
          }
          break;

        case 'down':
        if(this.y>=380){
          return;
        }
        else{
          this.y+=86;
        }
        break;

        case 'left':
        if(this.x<=0){
          return;
        }
        else{
          this.x-=101;
        }
        break;

        case 'right':
        if(this.x>=404){
          return;
        }
        else{
          this.x+=101;
        }
        break;

      }

  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const enemy1=new Enemy(0, 60);
const enemy2=new Enemy(0, 146);
const enemy3=new Enemy(0, 232);
const allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
const player=new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
