/*global PIXI, TWEEN, document, window, console, requestAnimationFrame, GameSprite, GameButton, GameButtons, Game, setTimeout, SnowGuy*/

var renderer, stage, snowguy;

function init() {
  Game.updateSize();
  renderer = new PIXI.WebGLRenderer(Game.width, Game.height);
  document.body.appendChild(renderer.view);
  
  stage = new PIXI.Stage(0x000000, true);
  
  var bg = new GameSprite(512, 384, 'background');
  Game.add(bg);
  
  var stand = new GameSprite(512, 738, 'stand');
  Game.add(stand);
  
  snowguy = new SnowGuy();
  
  var buttons = new GameButtons(6, 'button-left', GameButtons.Options.LEFT_SIDE);
  
  buttons.get(0).onclicked = function() {
    snowguy.changeEyes('contacts-green');
  };
  
  buttons.get(1).onclicked = function() {
    snowguy.changeEyes('snowman-eyes');
  };
  
  var i = 0;
  
  function animate() {
    TWEEN.update();
    
    for (i = 0; i < Game.children.length; i++) {
      Game.children[i].update();
    }
    
    renderer.render(stage);
    requestAnimationFrame(animate);
  }
  
  requestAnimationFrame(animate);
}

function onResize() {
  Game.updateSize();
  renderer.resize(Game.width, Game.height);
  stage.width  = Game.width;
  stage.height = Game.height;
}

window.addEventListener('load', init);
window.addEventListener('resize', onResize);