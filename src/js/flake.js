/*global GameSprite, Game*/

var Flake = function() {
  GameSprite.call(this, 0, 0, 'flake');
  this.resetPosition();
  this.alpha = Game.random.float(0.05, 0.75);
  this.rotationSpeed = Game.random.float(-0.05, 0.05);
  this.velocityX = Game.random.float(0.2, 2);
  this.velocityY = Game.random.float(0.2, 3);
  this.scaleValue = Game.random.float(0.2, 1);
  this.scale.set(this.scaleValue, this.scaleValue);
};

Flake.prototype = Object.create(GameSprite.prototype);
Flake.prototype.constructor = Flake;

Flake.prototype.update = function() {
  this.x += this.velocityX;
  this.y += this.velocityY;
  this.rotation += this.rotationSpeed;
  
  if (this.y > Game.height + 64 || this.x > Game.width + 64) {
    this.resetPosition();
  }
};

Flake.prototype.resetPosition = function() {
  var sideplace = Game.random.chance(42);
  
  if (sideplace) {
    this.x = -64;
    this.y = Game.random.float(-64, Game.height);
  } else {
    this.x = Game.random.float(-64, Game.width);
    this.y = -64;
  }
};