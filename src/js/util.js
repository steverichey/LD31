/*global window, stage, document, requestAnimationFrame*/

var Game = Game || {};

Game.width  = 0;
Game.height = 0;
Game.children = [];
Game.stage = null;
Game.paused = false;
Game.animatemethod = null;

Game.pause = function() {
  if (!Game.paused) {
    Game.paused = true;
  }
};

Game.unpause = function() {
  if (Game.paused) {
    Game.paused = false;
    if (Game.animatemethod !== null) {
      requestAnimationFrame(Game.animatemethod);
    }
  }
};

Game.updateSize = function() {
  Game.width  = 1024;
  Game.height = 768;
};

Game.screenshot = function() {
  var canvas = document.querySelector('canvas');
  var image = canvas.toDataURL('image/jpeg', 0.8).slice(0);
  return image;
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
  if (min == max) return min;
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

Game.random.intpad = function(min, max, digits) {
  var inte = Game.random.int(min, max).toString();
  
  while (inte.length < digits) {
    inte = '0' + inte;
  }
  
  return inte;
};

var contains = function(string, phrase) {
  return string.indexOf(phrase) >= 0;
};

var pad = function(num, amount) {
  var ints = num + '';
  
  while (ints.length < amount) {
    ints = '0' + ints;
  }
  
  return ints;
};