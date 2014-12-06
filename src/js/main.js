/*global PIXI, TWEEN, document, window, console, requestAnimationFrame, GameSprite, GameButton, Game, setTimeout, SnowGuy*/

var renderer, stage, snowguy;

function init() {
  Game.updateSize();
  renderer = new PIXI.WebGLRenderer(Game.width, Game.height);
  document.body.appendChild(renderer.view);
  
  stage = new PIXI.Stage(0x000000, true);
  
  var bg = new GameSprite(512, 384, 'bg');
  Game.add(bg);
  
  var buttoneyes = new GameButton(48, 48, 'button');
  Game.add(buttoneyes);
  
  var snowguy = new SnowGuy();
  
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