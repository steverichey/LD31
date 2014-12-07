/*global window, AudioContext, console, XMLHttpRequest*/

/**
 * The greatest HTML5 audio library ever created for a Ludum Dare this year by me.
 */
var Snowdio = (function() {
  'use strict';
  
  /*
   * The audio context used by the web audio API.
  */
  var context = null;
  
  /*
   * An array containing sound buffers.
  */
  var sounds = [];
  
  function init() {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      context = new AudioContext();
      console.log("Snowdio v1.0.0 has been initialized");
    } catch (e) {
      console.log("Web Audio API is not supported :(");
    }
  }
  
  function load(url) {
    console.log('trying to load ' + url);
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    
    // Async decode
    request.onload = function() {
      context.decodeAudioData(request.response, function(buffer) {
        var sound = new Snownd(buffer, url);
        sounds.push(sound);
        console.log('loaded sound from ' + url);
      }, function() {
        console.log('failed to load sound from ' + url);
      });
    };
    
    request.send();
  }
  
  function play(name) {
    for (var i = 0; i < sounds.length; i++) {
      if (sounds[i].url.indexOf(name) !== -1) {
        sounds[i].play();
        console.log('playing ' + sounds[i].url);
      }
    }
  }
  
  function getContext() {
    return context;
  }
  
  return {
    init: init,
    load: load,
    play: play,
    getContext : getContext
  };
}());

/**
 * Storage for a single decoded audio buffer.
 */
var Snownd = function(buffer, url) {
  this.buffer = buffer;
  this.url = url;
};

Snownd.prototype.constructor = Snownd;

Snownd.prototype.play = function() {
  var source = Snowdio.getContext().createBufferSource();
  source.buffer = this.buffer;
  source.connect(Snowdio.getContext().destination);
  source.start(0);
};