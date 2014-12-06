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
  
  this.mousedown = this.touchstart = function(data) {
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
  
  this.mouseup = this.touchend = this.mouseupoutside = this.touchendoutside = function(data) {
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