/*global PIXI, TWEEN, document, window, console, requestAnimationFrame, GameSprite, GameButton, GameButtons, Game, setTimeout, SnowGuy, Flake, Snowdio*/

var renderer, snowguy, leftbuttons, rightbuttons, centerbuttons, mouse = {x:0, y:0};

var NUMBER_OF_FLAKES = 50;
var flakes = [];

function init() {
  // game and rendering setup stuff
  
  Game.updateSize();
  renderer = new PIXI.WebGLRenderer(Game.width, Game.height);
  renderer.view.setAttribute('id', 'gamecanvas');
  document.body.appendChild(renderer.view);
  
  Game.stage = new PIXI.Stage(0x000000, true);
  
  Snowdio.init();
  Snowdio.load('./snd/teru.wav', function() { 
    Snowdio.get('teru').looped = true; 
    Snowdio.play('teru'); 
  });
  
  // the BG
  
  var bg = new GameSprite(512, 384, 'background');
  Game.add(bg);
  
  // the snowflake layer
  
  var snowflakelayer = new PIXI.DisplayObjectContainer();
  Game.stage.addChild(snowflakelayer);
  
  // the stand
  
  var stand = new GameSprite(512, 675, 'stand');
  Game.add(stand);
  
  // snow guy!
  
  snowguy = new SnowGuy();
  
  // header image
  
  var header = new GameSprite(512, 86, 'header');
  Game.add(header);
  
  // Setting up buttons
  
  var leftchoice = 0;
  var rightchoice = 0;
  leftbuttons   = new GameButtons(['btn-eyes', 'btn-mouth', 'btn-hair', 'btn-makeup', 'btn-accessories'], GameButtons.Options.LEFT_SIDE);
  rightbuttons  = new GameButtons(['btn-clear', 'btn-camera', 'btn-sound'], GameButtons.Options.RIGHT_SIDE);
  centerbuttons = null;
  var changeType = SnowGuy.Part.Eyes;
  
  leftbuttons.setAllOnClicked(function(index) {
    switch (index) {
      case 0: // eyes
        
        break;
      case 1: // mouth
        
        break;
      case 2: // hair
        
        break;
      case 3: // makeup
        
        break;
      case 4: // accessories
        
        break;
    }
  });
  
  var i = 0;
  
  function animate() {
    TWEEN.update();
    
    snowguy.lookAt(mouse.x, mouse.y);
    
    if (flakes.length < NUMBER_OF_FLAKES && Game.random.chance(2)) {
      var newflake = new Flake();
      flakes.push(newflake);
      Game.add(newflake, snowflakelayer);
    }
    
    for (i = 0; i < Game.children.length; i++) {
      Game.children[i].update();
    }
    
    renderer.render(Game.stage);
    requestAnimationFrame(animate);
  }
  
  Game.stage.mousemove = function(data) {
    mouse.x = data.global.x;
    mouse.y = data.global.y;
  };
  
  requestAnimationFrame(animate);
}

function onResize() {
  Game.updateSize();
  renderer.resize(Game.width, Game.height);
  Game.stage.width  = Game.width;
  Game.stage.height = Game.height;
}

window.addEventListener('load', init);
window.addEventListener('resize', onResize);