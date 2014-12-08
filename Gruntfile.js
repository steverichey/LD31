module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        dist: {
            src: 'src/js/*.js',
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
            flatten: true,
            filter: 'isFile',
            src: ['src/img/**', 'src/snd/**'],
            dest: 'dist/'
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