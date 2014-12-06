/*global PIXI, Game, TWEEN*/

var GameSprite = function(x, y, asset) {
  // extends sprite
  PIXI.Sprite.call(this, PIXI.Texture.fromImage(Game.getAsset(asset)));
  this.anchor.set(0.5, 0.5);
  this.position.x = x;
  this.position.y = y;
};

GameSprite.prototype = Object.create(PIXI.Sprite.prototype);
GameSprite.prototype.constructor = GameSprite;

GameSprite.prototype.update = function() {
  // update
};

GameSprite.prototype.changeTexture = function(asset) {
  this.setTexture(PIXI.Texture.fromImage(Game.getAsset(asset)));
};

var SnowGuy = function() {
  this.butt = new GameSprite(512, 600, 'snowman-booty');
  Game.add(this.butt);
  
  this.tum = new GameSprite(512, 450, 'snowman-tummy');
  Game.add(this.tum);
  
  this.head = new GameSprite(512, 250, 'snowman-head');
  Game.add(this.head);
  
  this.eyes = new GameSprite(512, 250, 'snowman-eyes');
  Game.add(this.eyes);
  
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
  
  this.larm = new GameSprite(512, 450, 'snowman-arm-left');
  Game.add(this.larm);
  
  this.rarm = new GameSprite(512, 450, 'snowman-arm-right');
  Game.add(this.rarm);
  
  this.larm.anchor.set(1.4, 0.5);
  this.rarm.anchor.set(-0.4, 0.5);
};

SnowGuy.prototype.constructor = SnowGuy;

SnowGuy.prototype.changeEyes = function(asset) {
  this.eyes.changeTexture(asset);
};

var GameButton = function(x, y, asset) {
  GameSprite.call(this, x, y, asset);
  var self = this;
  this.interactive = true;
  var rotatetween = null;
  var scaletween = null;
  this.onclicked = function(){};
  
  this.mouseover = function(data) {
    if (rotatetween) rotatetween.stop();
    rotatetween = new TWEEN.Tween({targetrotation: this.rotation})
      .to({targetrotation: 0.25}, 250)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(function() {
        self.rotation = this.targetrotation;
      })
      .start();
  };
  
  this.mouseout = function(data) {
    if (rotatetween) rotatetween.stop();
    rotatetween = new TWEEN.Tween({targetrotation: this.rotation})
      .to({targetrotation: 0}, 250)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(function() {
        self.rotation = this.targetrotation;
      })
      .start();
  };
  
  this.mousedown = function(data) {
    if (scaletween) scaletween.stop();
    scaletween = new TWEEN.Tween({targetscale: this.scale.x})
      .to({targetscale: 1.5}, 125)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(function() {
        self.scale.set(this.targetscale, this.targetscale);
      })
      .start();
    if (this.onclicked) this.onclicked();
  };
  
  this.mouseup = function(data) {
    if (scaletween) scaletween.stop();
    scaletween = new TWEEN.Tween({targetscale: this.scale.x})
      .to({targetscale: 1.0}, 1000)
      .easing(TWEEN.Easing.Bounce.Out)
      .onUpdate(function() {
        self.scale.set(this.targetscale, this.targetscale);
      })
      .start();
  };
};

GameButton.prototype = Object.create(GameSprite.prototype);
GameButton.prototype.constructor = GameButton;