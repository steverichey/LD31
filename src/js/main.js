/*global PIXI, document, window, requestAnimationFrame*/

function init(event) {
  var renderer = new PIXI.WebGLRenderer(640, 480);
  document.body.appendChild(renderer.view);
  
  var stage = new PIXI.Stage();
  
  var candyCaneTexture = PIXI.Texture.fromImage('./img/Candy-Cane.png');
  var candy = new PIXI.Sprite(candyCaneTexture);
  
  candy.position.x = 320;
  candy.position.y = 240;
  
  stage.addChild(candy);
  
  function animate() {
    candy.rotation += 0.01;
    renderer.render(stage);
    requestAnimationFrame(animate);
  }
  
  requestAnimationFrame(animate);
}

window.addEventListener('load', init);