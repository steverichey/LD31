/*global window, stage*/

var Game = Game || {};

Game.width  = 0;
Game.height = 0;
Game.children = [];

Game.updateSize = function() {
  Game.width  = 1024;
  Game.height = 768;
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

Game.add = function(child) {
  stage.addChild(child);
  Game.children.push(child);
};

Game.wiggle = function(target) {
  
};