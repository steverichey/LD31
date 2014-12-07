/*global PIXI, TWEEN, document, window, console, requestAnimationFrame, GameSprite, GameButton, GameButtons, Game, setTimeout, SnowGuy*/

var renderer, snowguy, leftbuttons, rightbuttons, centerbuttons, mouse = {x:0, y:0};

function init() {
  Game.updateSize();
  renderer = new PIXI.WebGLRenderer(Game.width, Game.height);
  document.body.appendChild(renderer.view);
  var leftchoice = 0;
  var rightchoice = 0;
  
  Game.stage = new PIXI.Stage(0x000000, true);
  
  var bg = new GameSprite(512, 384, 'background');
  Game.add(bg);
  
  var stand = new GameSprite(512, 738, 'stand');
  Game.add(stand);
  
  snowguy = new SnowGuy();
  
  leftbuttons   = new GameButtons(['snowman-eyes', 'snowman-nose', 'snowman-mouth', 'stand', 'stand'], GameButtons.Options.LEFT_SIDE);
  rightbuttons  = null;
  centerbuttons = null;
  var changeType = SnowGuy.Part.Eyes;
  
  function createright(index) {
    rightbuttons = null;
    
    var options = [];
    leftchoice = index;
    
    switch (index) {
      case 0: options = ['snowman-eyes', 'glasses-cateye', 'stand', 'stand', 'stand'];
        break;
      default: options = ['stand', 'stand', 'stand', 'stand', 'stand'];
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
    
    var options = [];
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
            options = ['glasses-cateye', 'glasses-wayfairer', 'glasses-rayban', 'eyes-squinty'];
            break;
        }
        
        break;
      default: options = ['stand', 'stand', 'stand', 'stand', 'stand', 'stand', 'stand', 'stand', 'stand', 'stand', 'stand', 'stand'];
        break;
    }
    
    centerbuttons = new GameButtons(options, GameButtons.Options.CENTER_BOTTOM);
    
    centerbuttons.setAllOnClicked(function(subindex) {
      switch (changeType) {
        case SnowGuy.Part.Eyes: // eyes
          snowguy.changeEyes(centerbuttons.get(subindex).graphicName);
          break;
        case SnowGuy.Part.Glasses:
          snowguy.changeGlasses(centerbuttons.get(subindex).graphicName);
          break;
        default:
          snowguy.changeMouth('stand');
          break;
      }
    });
  }
  
  leftbuttons.setAllOnClicked(function(index) {
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