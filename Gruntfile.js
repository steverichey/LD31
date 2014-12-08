module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        dist: {
            src: [
              'src/js/pixi.dev.js',
              'src/js/tween.js',
              'src/js/snowdio.js',
              'src/js/util.js',
              'src/js/sprite.js',
              'src/js/button.js',
              'src/js/buttons.js',
              'src/js/flake.js',
              'src/js/snowguy.js',
              'src/js/options.js',
              'src/js/main.js'
            ],
            dest: 'temp/concat.js'
        }
    },
    uglify: {
        dist: {
            files: {
                'temp/min.js': 'temp/concat.js'
            }
        }
    },
    processhtml: {
        dist: {
            files: {
                'temp/process.html' : ['src/index.html']
            }
        }
    },
    cssmin: {
        dist: {
            files: [{
                src: ['src/css/style.css'],
                dest: 'temp/min.css'
            }]
        }
    },
    copy: {
        dist: {
            expand: true,
            cwd: 'src/',
            src: ['img/**', 'snd/**'],
            dest: 'dist/',
            flatten: false,
            filter: 'isFile'
        }
    },
    embed: {
        options: {
            threshold: '300KB'
        },
        dist: {
            files: {
                'temp/embed.html': 'temp/process.html'
            }
        }
    },
    htmlmin: {
        dist: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            files: {
                'dist/index.html': 'temp/embed.html'
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-embed');
  grunt.loadNpmTasks('grunt-processhtml');
  
  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'processhtml',
                                 'cssmin', 'embed', 'htmlmin', 'copy']);
};