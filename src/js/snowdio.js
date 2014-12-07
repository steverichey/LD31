/*global window, AudioContext, console, XMLHttpRequest*/

/**
 * The greatest HTML5 audio library ever created for a Ludum Dare this year by me.
 *
 * @author  Steve Richey (STVR)
 * @license MIT. Use it for whatevs.
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
  
  /*
   * Whether or not to log debug statements.
  */
  var debug = true;
  
  function init() {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      context = new AudioContext();
      log("v1.0.0 Initialized");
    } catch (e) {
      log("Web Audio API is not supported :(");
    }
  }
  
  function load(url, callback) {
    log('Loading ' + url);
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    
    // Async decode
    request.onload = function() {
      context.decodeAudioData(request.response, function(buffer) {
        var sound = new Snownd(buffer, url);
        sounds.push(sound);
        log('Loaded ' + url);
        
        if (callback && typeof callback === 'function') {
          callback();
        }
      }, function() {
        log('Failed ' + url);
      });
    };
    
    request.send();
  }
  
  function play(name) {
    for (var i = 0; i < sounds.length; i++) {
      if (sounds[i].url.indexOf(name) !== -1) {
        sounds[i].play();
      }
    }
  }
  
  function getContext() {
    return context;
  }
  
  function setDebug(bool) {
    debug = bool;
  }
  
  function log(text) {
    if (debug) {
      console.log('[SNOWDIO] ' + text);
    }
  }
  
  return {
    init       : init,
    load       : load,
    play       : play,
    getContext : getContext,
    setDebug   : setDebug
  };
}());

/**
 * Storage for a single decoded audio buffer and a URL to ID it.
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