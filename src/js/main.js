/*global PIXI, document, window, console, requestAnimationFrame, GameSprite, Game, setTimeout*/

var renderer, stage, height, width, sprite;

function init() {
  Game.updateSize();
  renderer = new PIXI.WebGLRenderer(width, height);
  document.body.appendChild(renderer.view);
  
  stage = new PIXI.Stage();
  
  var head = new GameSprite(0.5, 0.25, 'snowman-head');
  stage.addChild(head);
  
  sprite = new GameSprite(0.5, 0.5, 'snowman-tummy');
  stage.addChild(sprite);
  
  var butt = new GameSprite(0.5, 0.75, 'snowman-booty');
  stage.addChild(butt);
  
  function animate() {
    //sprite.rotation += 0.01;
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