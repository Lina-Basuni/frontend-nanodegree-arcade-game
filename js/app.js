// Enemies our player must avoid
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
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
  update(){

  }

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

  }


  handleInput(keyPressed){

      switch(keyPressed){
        case 'up':
          if(this.y<=0){
            return;
          }
          else{
            this.y-=83;
          }
          break;

        case 'down':
        if(this.y>=404){
          return;
        }
        else{
          this.y+=83;
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
// Place the player object in a variable called player
const allEnemies = [ new Enemy(0, 60), new Enemy(101, 150), new Enemy(202, 235)];
for(var i = 0; i < 3; i++){
    var enemyX = (Math.floor (Math.random() * (6 - 1)) + 1) * 101;
    var enemyY = (Math.floor(Math.random() * (5 - 1)) + 1) * 83;
    var enemy = new Enemy(enemyX, enemyY);
    allEnemies.push(enemy);
}

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
