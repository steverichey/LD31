/*global GameButton, Game, TWEEN, PIXI*/

var GameButtons = function(buttonpositions, asset, isLeft) {
  this.buttonsArray = [];
  var self = this;
  
  var i = 0;
  
  for (i = 0; i < buttonpositions.length; i++) {
    var button = new GameButton(isLeft ? -64 : Game.width + 64, buttonpositions[i], asset);
    this.buttonsArray.push(button);
    Game.add(button);
  }
  
  new TWEEN.Tween({position: this.buttonsArray[0].x})
    .to({position: isLeft ? 64 : Game.width - 64}, 500)
    .easing(TWEEN.Easing.Elastic.Out)
    .onUpdate(function() {
      for (i = 0; i < self.buttonsArray.length; i++) {
        self.buttonsArray[i].x = this.position;
      }
    })
    .start();
};

GameButtons.prototype.constructor = GameButtons;

GameButtons.prototype.get = function(index) {
  return this.buttonsArray[index];
};