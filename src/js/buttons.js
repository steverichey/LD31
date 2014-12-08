/*global GameButton, Game, TWEEN, PIXI, setTimeout*/

var GameButtons = function(assetArray, type) {
  var amount = assetArray.length;
  this.buttonsArray = [];
  this.buttonCallbacks = [];
  var self = this;
  this.type = type;
  this.blocked = true;
  var duration = 1000;
  this.block(duration);
  this.lastchoice = -1;
  
  var initialX    = 0;
  var finalX      = 0;
  var deltaY      = 128;
  var initialY    = 200;
  var deltaX      = 0;
  var finalDeltaX = 0;
  var finalY      = 0;
  var finalDeltaY = 0;
  
  switch (type) {
      case GameButtons.Options.RIGHT_SIDE:
        initialX = Game.width + 70;
        finalX   = Game.width - 70;
        break;
      case GameButtons.Options.CENTER_BOTTOM:
        var columns = Math.ceil(amount / 2);
        deltaX      = 96;
        initialX    = 512 - (columns - 1) * (deltaX / 2);
        finalY      = Game.height - 196;
        finalDeltaY = 96;
        initialY    = Game.height + 64;
        finalX      = initialX;
        finalDeltaX = deltaX;
        break;
      default: // LEFT_SIDE
        initialX = -70;
        finalX   =  70;
        break;
  }
  
  var i = 0;
  
  for (i = 0; i < amount; i++) {
    var button = new GameButton(initialX + i * deltaX, initialY + i * deltaY, assetArray[i], self);
    this.buttonsArray.push(button);
    Game.add(button);
    button.index = i;
    button.onclicked = this.onButtonClick;
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

GameButtons.prototype.getlast = function() {
  return this.buttonsArray[this.buttonsArray.length - 1];
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
    for (i = 0; i < self.buttonsArray.length; i++) {
      Game.remove(self.buttonsArray[i]);
    }
    
    self.buttonsArray.splice(0, self.buttonsArray.length);
    
    if (typeof callback !== 'undefined') {
      callback();
    }
  }, duration);
};

GameButtons.prototype.setAllOnClicked = function(callback) {
  this.buttonCallbacks = [];
  
  for (var i = 0; i < this.buttonsArray.length; i++) {
    this.buttonCallbacks.push(callback);
  }
};

GameButtons.prototype.onButtonClick = function(index) {
  var self = this.parentButtonGroup;
  
  if (!this.type === GameButtons.Options.CENTER_BOTTOM) {
    self.clearTint();

    var tint = index === self.lastchoice ? 0xFFFFFF : 0xAAAAFF;

    self.buttonsArray[index].tint = tint;
  }
  
  if (typeof self.buttonCallbacks[index] === 'function') {
    self.buttonCallbacks[index](index);
  }
  
  if (index === self.lastchoice) {
    self.lastchoice = -1;
  } else {
    self.lastchoice = index;
  }
};

GameButtons.prototype.block = function(duration) {
  this.blocked = true;
  var self = this;
  setTimeout(function() {
    self.blocked = false;
  }, duration);
};

GameButtons.prototype.clearTint = function() {
  //var self = this.parentButtonGroup;
  this.buttonsArray.forEach(function(obj, ind) {
    obj.tint = 0xFFFFFF;
  });
};

GameButtons.prototype.hasTint = function() {
  this.buttonsArray.forEach(function(obj, ind) {
    if (obj.tint !== 0xFFFFFF) {
      return true;
    }
  });
  
  return false;
};

GameButtons.Options = {
  LEFT_SIDE     : 0,
  RIGHT_SIDE    : 1,
  CENTER_BOTTOM : 2
};