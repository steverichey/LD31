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
  
  /*
   * Whether or not to mute everything.
  */
  var muted = false;
  
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
  
  function get(name) {
    for (var i = 0; i < sounds.length; i++) {
      if (sounds[i].url.indexOf(name) !== -1) {
        return sounds[i];
      }
    }
  }
  
  function play(name) {
    get(name).play();
  }
  
  function mute() {
    if (muted) return;
    
    for (var i = 0; i < sounds.length; i++) {
      sounds[i].setVolume(0);
    }
    
    muted = true;
  }
  
  function unmute() {
    if (!muted) return;
    
    for (var i = 0; i < sounds.length; i++) {
      if (sounds[i].playing) {
        sounds[i].setVolume(1);
      }
    }
    
    muted = false;
  }
  
  function toggleMuted() {
    if (muted) {
      unmute();
    } else {
      mute();
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
    init        : init,
    get         : get,
    load        : load,
    play        : play,
    getContext  : getContext,
    setDebug    : setDebug,
    mute        : mute,
    unmute      : unmute,
    toggleMuted : toggleMuted
  };
}());

/**
 * Storage for a single decoded audio buffer and a URL to ID it.
 */
var Snownd = function(buffer, url) {
  this.buffer = buffer;
  this.url = url;
  this.playing = false;
  this.looped = false;
  this.gainNode = null;
};

Snownd.prototype.constructor = Snownd;

Snownd.prototype.play = function() {
  var source = Snowdio.getContext().createBufferSource();
  this.gainNode = Snowdio.getContext().createGain();
  source.buffer = this.buffer;
  //source.connect(Snowdio.getContext().destination);
  source.connect(this.gainNode);
  this.gainNode.connect(Snowdio.getContext().destination);
  source.onended = function() {
    this.playing = false;
  };
  source.loop = this.looped;
  source.start(0);
  this.playing = true;
};

/**
 * Set this sound to a new volume.
 *
 * @param {Float} volume The volume to set to, from 0 to 1.
 */
Snownd.prototype.setVolume = function(volume) {
  // dummy check
  if (typeof volume === 'undefined') return;
  // kind of ensure it's a float
  volume = parseFloat(volume);
  // bounds checking, the web audio api is crazy dumb and will let you set the volume to 9007199254740991
  if (volume > 1) volume = 1;
  if (volume < 0) volume = 0;
  // set volume
  this.gainNode.gain.value = volume;
};