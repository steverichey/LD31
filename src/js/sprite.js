/*global PIXI, Game, TWEEN*/

var GameSprite = function(x, y, asset) {
  // extends sprite
  if (asset) {
    PIXI.Sprite.call(this, PIXI.Texture.fromImage(Game.getAsset(asset)));
  } else {
    PIXI.Sprite.call(this, PIXI.Texture.fromImage(Game.getAsset('empty')));
  }
  
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