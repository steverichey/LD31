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
  Snowdio.load('./snd/teru.wav', function() { Snowdio.play('teru'); });
  
  // the BG
  
  var bg = new GameSprite(512, 384, 'background');
  Game.add(bg);
  
  // the snowflake layer
  
  var snowflakelayer = new PIXI.DisplayObjectContainer();
  Game.stage.addChild(snowflakelayer);
  
  // the stand
  
  var stand = new GameSprite(512, 700, 'stand');
  //Game.add(stand);
  
  // snow guy!
  
  snowguy = new SnowGuy();
  
  // header image
  
  var header = new GameSprite(512, 86, 'header');
  Game.add(header);
  
  // Setting up buttons
  
  var leftchoice = 0;
  var rightchoice = 0;
  leftbuttons   = new GameButtons(['btn-eyes', 'btn-mouth', 'btn-hair', 'btn-makeup', 'btn-accessories'], GameButtons.Options.LEFT_SIDE);
  rightbuttons  = null;
  centerbuttons = null;
  var changeType = SnowGuy.Part.Eyes;
  
  function createright(index) {
    rightbuttons = null;
    
    var options = [];
    leftchoice = index;
    
    switch (index) {
      case 0: options = ['snowman-eyes', 'glasses-cateye', 'lashes-01', 'stand', 'stand'];
        break;
      case 1: options = ['snowman-nose', 'stand', 'stand', 'stand', 'stand'];
        break;
    }
    
    rightbuttons = new GameButtons(options, GameButtons.Options.RIGHT_SIDE);
    
    rightbuttons.setAllOnClicked(function(index) {
      if (centerbuttons !== null) {
        centerbuttons.hide(function() {
          createCenter(index);
        });
      } else {
        createCenter(index);
      }
    });
  }
  
  function createCenter(index) {
    centerbuttons = null;
    
    var options = ['stand'];
    rightchoice = index;
    
    switch (leftchoice) {
      case 0:
        switch (rightchoice) {
          case 0:
            changeType = SnowGuy.Part.Eyes;
            options = ['snowman-eyes', 'contacts-big-blue', 'contacts-big-brown', 'contacts-big-purple', 'contacts-blue-green', 'contacts-blue', 'contacts-brown', 'contacts-gray', 'contacts-red', 'contacts-violet'];
            break;
          case 1:
            changeType = SnowGuy.Part.Glasses;
            options = ['empty', 'glasses-cateye', 'glasses-wayfairer', 'glasses-rayban', 'eyes-squinty'];
            break;
          case 2:
            changeType = SnowGuy.Part.Lashes;
            options = ['empty', 'lashes-01'];
            break;
        }
        break;
      case 1:
        switch(rightchoice) {
          case 0:
            changeType = SnowGuy.Part.Nose;
            options = ['empty', 'snowman-nose', 'snowman-nose-blue'];
            break;
        }
        break;
    }
    
    centerbuttons = new GameButtons(options, GameButtons.Options.CENTER_BOTTOM);
    
    centerbuttons.setAllOnClicked(function(subindex) {
      switch (changeType) {
        case SnowGuy.Part.Eyes:
          snowguy.changeEyes(centerbuttons.get(subindex).graphicName);
          break;
        case SnowGuy.Part.Glasses:
          snowguy.changeGlasses(centerbuttons.get(subindex).graphicName);
          break;
        case SnowGuy.Part.Lashes:
          snowguy.changeLashes(centerbuttons.get(subindex).graphicName);
          break;
        case SnowGuy.Part.Nose:
          snowguy.changeNose(centerbuttons.get(subindex).graphicName);
          break;
      }
    });
  }
  
  leftbuttons.setAllOnClicked(function(index) {
    if (centerbuttons !== null) {
      centerbuttons.hide(function() {
        centerbuttons = null;
      });
    }
    
    if (rightbuttons !== null) {
      rightbuttons.hide(function() {
        createright(index);
      });
    } else {
      createright(index);
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