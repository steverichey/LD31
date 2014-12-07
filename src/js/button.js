/*global GameSprite, TWEEN, Game, PIXI*/

var GameButton = function(x, y, graphic, parent) {
  if (typeof graphic === 'undefined') {
    graphic = 'button';
  }
  
  GameSprite.call(this, x, y, graphic);
  var self = this;
  this.interactive = true;
  this.index = 0;
  this.parentButtonGroup = parent;
  var rotatetween = null;
  var scaletween = null;
  this.onclicked = function(){};
  this.innerGraphic = null;
  this.innerRatio = 0;
  this.graphicName = '';
  
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
    if (this.onclicked) {
      if (this.parentButtonGroup && this.parentButtonGroup.blocked) {
        return;
      }
      
      this.onclicked(this.index);
    }
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