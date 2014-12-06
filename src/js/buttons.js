/*global GameButton, Game, TWEEN, PIXI, setTimeout*/

var GameButtons = function(assetArray, type) {
  var amount = assetArray.length;
  this.buttonsArray = [];
  var self = this;
  this.type = type;
  this.blocked = true;
  var duration = 1000;
  this.block(duration);
  
  var initialX    = 0;
  var finalX      = 0;
  var deltaY      = Game.height / amount;
  var initialY    = deltaY / 2;
  var deltaX      = 0;
  var finalDeltaX = 0;
  var finalY      = 0;
  var finalDeltaY = 0;
  
  switch (type) {
      case GameButtons.Options.RIGHT_SIDE:
        initialX = Game.width + 64;
        finalX   = Game.width - 64;
        break;
      case GameButtons.Options.CENTER_BOTTOM:
        deltaX      = 128;
        initialX    = 196;
        finalDeltaX = 2 * (Game.width - 128 * 2) / amount;
        finalX      = 196;
        finalY      = Game.height - 256;
        finalDeltaY = 128;
        initialY    = Game.height + 64;
        break;
      default: // LEFT_SIDE
        initialX = -64;
        finalX   =  64;
        break;
  }
  
  var i = 0;
  
  for (i = 0; i < amount; i++) {
    var button = new GameButton(initialX + i * deltaX, initialY + i * deltaY, self);
    this.buttonsArray.push(button);
    Game.add(button);
    button.addTopGraphic(assetArray[i]);
    button.index = i;
  }
  
  new TWEEN.Tween({positionX: this.buttonsArray[0].x, positionY: this.buttonsArray[0].y})
    .to({positionX: finalX, positionY: finalY}, duration)
    .easing(TWEEN.Easing.Elastic.Out)
    .onUpdate(function() {
      for (i = 0; i < self.buttonsArray.length; i++) {
        if (type !== GameButtons.Options.CENTER_BOTTOM) {
          self.buttonsArray[i].x = this.positionX;
        } else {
          self.buttonsArray[i].x = i < self.buttonsArray.length / 2 ? this.positionX + finalDeltaX * i : this.positionX + finalDeltaX * Math.floor(i - self.buttonsArray.length / 2);
          self.buttonsArray[i].y = i < self.buttonsArray.length / 2 ? this.positionY : this.positionY + finalDeltaY;
        }
      }
    })
    .start();
};

GameButtons.prototype.constructor = GameButtons;

GameButtons.prototype.get = function(index) {
  return this.buttonsArray[index];
};

GameButtons.prototype.hide = function(callback) {
  var finalX      = 0;
  var finalY      = 0;
  var self = this;
  var duration = self.type === GameButtons.Options.CENTER_BOTTOM ? 125 : 1000;
  
  switch(this.type) {
      case GameButtons.Options.RIGHT_SIDE:
        finalX = Game.width + 128;
        break;
      case GameButtons.Options.CENTER_BOTTOM:
        finalY = Game.height + 128;
        break;
      default: // left side
        finalX = -128;
        break;
  }
  
  var i = 0;
  
  new TWEEN.Tween({positionX: this.buttonsArray[0].x, positionY: this.buttonsArray[0].y})
    .to({positionX: finalX, positionY: finalY}, duration)
    .easing(TWEEN.Easing.Cubic.Out)
    .onUpdate(function() {
      for (i = 0; i < self.buttonsArray.length; i++) {
        if (self.type !== GameButtons.Options.CENTER_BOTTOM) {
          self.buttonsArray[i].x = this.positionX;
        } else {
          self.buttonsArray[i].y = this.positionY;
        }
      }
    })
    .start();
  
  setTimeout(function() {
    if (typeof callback !== 'undefined') {
      callback();
    }
  }, duration);
};

GameButtons.prototype.setAllOnClicked = function(callback) {
  this.buttonsArray.forEach(function(button, index) {
    button.onclicked = callback;
  });
};

GameButtons.prototype.block = function(duration) {
  this.blocked = true;
  var self = this;
  setTimeout(function() {
    self.blocked = false;
  }, duration);
};

GameButtons.Options = {
  LEFT_SIDE     : 0,
  RIGHT_SIDE    : 1,
  CENTER_BOTTOM : 2
};