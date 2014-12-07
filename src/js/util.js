/*global window, stage, document*/

var Game = Game || {};

Game.width  = 0;
Game.height = 0;
Game.children = [];
Game.stage = null;

Game.updateSize = function() {
  Game.width  = 1024;
  Game.height = 768;
};

Game.screenshot = function() {
  var canvas = document.getElementById('gamecanvas');
  return canvas.toDataURL("image/png");
};

/**
 * Converts a simple file name to a full image file path.
 */
Game.getAsset = function(filename) {
  return './img/' + filename + '.png';
};

Game.relativePosition = function(percent, isWidth) {
  if (percent < 0) {
    percent = 0;
  }
  
  if (percent > 1) {
    percent = 1;
  }
  
  if (typeof isWidth === 'undefined') {
    isWidth = false;
  }
  
  return isWidth ? percent * Game.width : percent * Game.height;
};

/**
 * Adds a sprite to the game/stage.
 * 
 * @param {GameSprite}                  child The sprite to add. Must be a GameSprite.
 * @param {PIXI.DisplayObjectContainer} layer Optional layer to add it to.
 */
Game.add = function(child, layer) {
  if (typeof layer === 'undefined') {
    Game.stage.addChild(child);
  } else {
    layer.addChild(child);
  }
  
  Game.children.push(child);
};

Game.remove = function(child) {
  Game.stage.removeChild(child);
  var i = Game.children.indexOf(child);
  
  if (i >= 0) {
    Game.children.splice(i, 1);
  }
};

Game.random = {};

Game.random.float = function(min, max) {
  min = min || 0;
  max = max || 1;
  return Math.random() * (max - min) + min;
};

Game.random.int = function(min, max) {
  return Math.round(Game.random.float(min, max));
};

Game.random.chance = function(likelihood) {
  if (typeof likelihood === 'undefined') {
    likelihood = 50;
  }
  
  return (likelihood > Game.random.float(0, 100));
};