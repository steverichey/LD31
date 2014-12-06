/*global PIXI, TWEEN, document, window, console, requestAnimationFrame, GameSprite, GameButton, GameButtons, Game, setTimeout, SnowGuy*/

var renderer, stage, snowguy, leftbuttons, rightbuttons, centerbuttons, mouse = {x:0, y:0};

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
  
  leftbuttons   = new GameButtons(5, 'button-left', GameButtons.Options.LEFT_SIDE);
  rightbuttons  = null;
  centerbuttons = null;
  
  function createright() {
    rightbuttons = null;
    rightbuttons = new GameButtons(5, 'button-left', GameButtons.Options.RIGHT_SIDE);
  }
  
  leftbuttons.setAllOnClicked(function() {
    if (rightbuttons !== null) {
      rightbuttons.hide(function() {
        createright();
      });
    } else {
      createright();
    }
  });
  
  var i = 0;
  
  function animate() {
    TWEEN.update();
    
    snowguy.lookAt(mouse.x, mouse.y);
    
    for (i = 0; i < Game.children.length; i++) {
      Game.children[i].update();
    }
    
    renderer.render(stage);
    requestAnimationFrame(animate);
  }
  
  stage.mousemove = function(data) {
    mouse.x = data.global.x;
    mouse.y = data.global.y;
  };
  
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