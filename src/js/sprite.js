/*global PIXI, Game*/

var GameSprite = function(x, y, assetPath) {
  // extends sprite
  PIXI.Sprite.call(this, PIXI.Texture.fromImage(Game.getAsset(assetPath)));
  this.anchor.set(0.5, 0.5);
  this.position.x = Game.relativePosition(x, true);
  this.position.y = Game.relativePosition(y, false);
};

GameSprite.prototype = Object.create(PIXI.Sprite.prototype);
GameSprite.prototype.constructor = GameSprite;