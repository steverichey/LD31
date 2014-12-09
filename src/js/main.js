/*global PIXI, TWEEN, document, window, console, requestAnimationFrame, GameSprite, GameButton, GameButtons, Game, setTimeout, SnowGuy, Flake, Snowdio, gameOptions, contains, pad, XMLHttpRequest*/

var renderer, snowguy, leftbuttons, rightbuttons, centerbuttons, mouse = {x:0, y:0};

var NUMBER_OF_FLAKES = 100;
var flakes = [];

function init() {
  // game and rendering setup stuff
  
  var i = 0;
  Game.updateSize();
  renderer = new PIXI.WebGLRenderer(Game.width, Game.height);
  document.body.appendChild(renderer.view);
  
  Game.stage = new PIXI.Stage(0x000000, true);
  
  Snowdio.init();

  var agent = navigator.userAgent.toLowerCase();
  var ext = contains(agent, 'safari') && !contains(agent, 'chrome') ? '.m4a' : '';
  
  Snowdio.load('./snd/teru.ogg' + ext, function() { 
    Snowdio.get('teru').looped = true; 
    Snowdio.play('teru'); 
  });
  
  Snowdio.load('./snd/select.ogg' + ext, function() {
    Snowdio.get('select').setVolume(0.25);
  });
  
  // loop through sounds and load
  
  var omg = [];
  
  for (i = 1; i < 24; i++) {
    omg.push('omg_' + pad(i, 2));
  }
  
  for (i = 0; i < omg.length; i++) {
    Snowdio.load('./snd/' + omg[i] + '.ogg' + ext);
  }
  
  // the BG
  
  var bg = new GameSprite(512, 384, 'background');
  Game.add(bg);
  
  bg.interactive = true;
  bg.mousedown = bg.touchstart = function(data) {
    if (centerbuttons !== null) {
        centerbuttons.hide(function() {
          centerbuttons = null;
        });
    }
    
    leftbuttons.clearTint();
  };
  
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
  rightbuttons  = new GameButtons(['btn-clear', 'btn-sound'], GameButtons.Options.RIGHT_SIDE);
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
    snowguy.changeBlush('empty');
    snowguy.changeCane('empty');
  };
  
  rightbuttons.get(1).onclicked = function() {
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
    } else if (contains(buttonname, 'blush')) {
      snowguy.changeBlush(assetname);
    } else if (contains(buttonname, 'cane')) {
      snowguy.changeCane(assetname);
    } else if (contains(buttonname, 'shadow')) {
      snowguy.changeShadow(assetname);
    }
    
    Snowdio.play('omg_' + Game.random.intpad(1, omg.length, 2));
  }
  
  function showCenter(index) {
    var options = [];
    
    for (i = 0; i < gameOptions[index].options.length; i++) {
      options.push(gameOptions[index].options[i].button);
    }
    
    leftchoice = index;
    
    // get out of here if there are no options
    if (options.length === 0) return;
    
    centerbuttons = new GameButtons(options, GameButtons.Options.CENTER_BOTTOM);
    centerbuttons.setAllOnClicked(centerCallback);
  }
  
  leftbuttons.setAllOnClicked(function(index) {
    Snowdio.play('select');
    
    if (index === leftchoice) {
      if (centerbuttons !== null) {
        centerbuttons.hide(function() {
          centerbuttons = null;
        });
        
        leftchoice = -1;
      }
      
      return;
    }
    
    if (centerbuttons !== null) {
      centerbuttons.hide(function() {
        centerbuttons = null;
        showCenter(index);
      });
    } else {
      showCenter(index);
    }
  });
  
  // the center button container
  
  var menucenter = new GameSprite(512, Game.height * 2, 'bg-menu-center');
  Game.add(menucenter);
  
  // core game loop
  
  function animate() {
    if (Game.paused) {
      return;
    }
    
    // update the tweening library
    
    TWEEN.update();
    
    // move the snowguy's eyes
    
    snowguy.lookAt(mouse.x, mouse.y);
    
    // spawn new flakes from time to time
    
    if (flakes.length < NUMBER_OF_FLAKES && Game.random.chance(2)) {
      var newflake = new Flake();
      flakes.push(newflake);
      Game.add(newflake, snowflakelayer);
    }
    
    // update all children
    
    for (i = 0; i < Game.children.length; i++) {
      Game.children[i].update();
    }
    
    // oooh this is bad, this is really bad
    
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
  
  Game.animatemethod = animate;
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