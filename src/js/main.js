/*global PIXI, TWEEN, document, window, console, requestAnimationFrame, GameSprite, GameButton, GameButtons, Game, setTimeout, SnowGuy, Flake, Snowdio, gameOptions, contains*/

var renderer, snowguy, leftbuttons, rightbuttons, centerbuttons, mouse = {x:0, y:0};

var NUMBER_OF_FLAKES = 50;
var flakes = [];

function init() {
  // game and rendering setup stuff
  
  var i = 0;
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
  
  var leftchoice = -1;
  var rightchoice = -1;
  var leftoptions = [];
  
  // parses options.js for button graphic names
  for (i = 0; i < gameOptions.length; i++) {
    leftoptions.push(gameOptions[i].button);
  }
  
  leftbuttons   = new GameButtons(leftoptions, GameButtons.Options.LEFT_SIDE);
  rightbuttons  = new GameButtons(['btn-clear', 'btn-camera', 'btn-sound'], GameButtons.Options.RIGHT_SIDE);
  centerbuttons = null;
  var changeType = SnowGuy.Part.Eyes;
  
  rightbuttons.get(0).onclicked = function() {
    // clear snowguy settings
    snowguy.changeEyes('snowman-eyes');
    snowguy.changeGlasses('empty');
    snowguy.changeHair('empty');
    snowguy.changeLashes('empty');
    snowguy.changeMouth('snowman-mouth');
    snowguy.changeNose('snowman-nose');
  };
  
  rightbuttons.get(1).onclicked = function() {
    // take a pic
  };
  
  rightbuttons.get(2).onclicked = function() {
    // mute sounds
    Snowdio.toggleMuted();
  };
  
  function centerCallback(index) {
    var buttonname = gameOptions[leftchoice].options[index].button;
    var assetname  = gameOptions[leftchoice].options[index].asset;
    
    if (contains(buttonname, 'eye')) {
      snowguy.changeEyes(assetname);
    } else if (contains(buttonname, 'lip')) {
      snowguy.changeMouth(assetname);
    } else if (contains(buttonname, 'glasses')) {
      snowguy.changeGlasses(assetname);
    } else if (contains(buttonname, 'hair')) {
      snowguy.changeHair(assetname);
    } else if (contains(buttonname, 'lash')) {
      snowguy.changeLashes(assetname);
    } else if (contains(buttonname, 'nose')) {
      snowguy.changeNose(assetname);
    }
  }
  
  function showCenter(index) {
    var options = [];
    
    for (i = 0; i < gameOptions[index].options.length; i++) {
      options.push(gameOptions[index].options[i].button);
    }
    
    leftchoice = index;
    
    // get out of here if there are no options
    if (options.length === 0) return;
    
    console.log(options);
    
    centerbuttons = new GameButtons(options, GameButtons.Options.CENTER_BOTTOM);
    centerbuttons.setAllOnClicked(centerCallback);
  }
  
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
  // the center button container
  
  var menucenter = new GameSprite(512, Game.height * 2, 'bg-menu-center');
  Game.add(menucenter);
  
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
    
    if (centerbuttons !== null) {
      menucenter.y = (centerbuttons.get(0).y + centerbuttons.getlast().y) / 2;
    } else {
      menucenter.y = Game.height * 2;
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