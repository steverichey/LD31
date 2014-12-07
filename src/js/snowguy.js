/*global GameSprite, Game, TWEEN*/

var SnowGuy = function() {
  this.butt = new GameSprite(512, 620, 'snowman-booty');
  Game.add(this.butt);
  
  this.tum = new GameSprite(512, 515, 'snowman-tummy');
  Game.add(this.tum);
  
  this.head = new GameSprite(512, 340, 'snowman-head');
  Game.add(this.head);
  
  this.eyes = new GameSprite(512, this.head.y, 'snowman-eyes');
  Game.add(this.eyes);
  
  this.MIN_EYE_X = this.eyes.x - 10;
  this.MAX_EYE_X = this.eyes.x + 10;
  this.MIN_EYE_Y = this.eyes.y - 10;
  this.MAX_EYE_Y = this.eyes.y + 10;
  
  this.hair = {};
  
  var blinktween = null;
  var self = this;
  
  this.eyes.update = function() {
    if (blinktween === null && Game.random.chance(0.5)) {
      blinktween = new TWEEN.Tween({eyescale: self.eyes.scale.y})
        .to({eyescale: 0}, 75)
        .easing(TWEEN.Easing.Cubic.InOut)
        .yoyo(true)
        .repeat(1)
        .onUpdate(function() {
          self.eyes.scale.y = this.eyescale;
        })
        .onComplete(function() {
          blinktween = null;
        })
        .start();
    }
  };
  
  this.nose = new GameSprite(512, this.eyes.y + 30, 'snowman-nose');
  Game.add(this.nose);
  
  this.mouth = new GameSprite(512, this.eyes.y + 70, 'snowman-mouth');
  Game.add(this.mouth);
  
  this.lashes = new GameSprite(512, this.eyes.y - 50);
  Game.add(this.lashes);
  
  this.glasses = new GameSprite(512, this.eyes.y + 10);
  Game.add(this.glasses);
  
  this.larm = new GameSprite(512, this.tum.y, 'snowman-arm-left');
  Game.add(this.larm);
  
  this.rarm = new GameSprite(512, this.tum.y, 'snowman-arm-right');
  Game.add(this.rarm);
  
  this.larm.anchor.set(1.4, 0.5);
  this.rarm.anchor.set(-0.4, 0.5);
};

SnowGuy.prototype.constructor = SnowGuy;

SnowGuy.prototype.changeEyes = function(asset) {
  this.eyes.changeTexture(asset);
};

SnowGuy.prototype.changeGlasses = function(asset) {
  this.glasses.changeTexture(asset);
};

SnowGuy.prototype.changeNose = function(asset) {
  this.nose.changeTexture(asset);
};

SnowGuy.prototype.changeMouth = function(asset) {
  this.mouth.changeTexture(asset);
};

SnowGuy.prototype.changeHair = function(asset) {
  this.hair.changeTexture(asset);
};

SnowGuy.prototype.changeLashes = function(asset) {
  this.lashes.changeTexture(asset);
};

SnowGuy.prototype.lookAt = function(x, y) {
  this.eyes.x = this.MIN_EYE_X + (this.MAX_EYE_X - this.MIN_EYE_X) * (x / Game.width);
  this.eyes.y = this.MIN_EYE_Y + (this.MAX_EYE_Y - this.MIN_EYE_Y) * (y / Game.height);
};

SnowGuy.Part = {
  Eyes:    0,
  Glasses: 1,
  Makeup:  2,
  Nose:    3,
  Mouth:   4,
  Lashes:  5
};