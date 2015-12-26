'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
        options: {
            jshintrc: '.jshintrc',
        },
        files: ['scripts/**/*.js']
    },
//    concat: {
//      options: {
//        separator: ';'
//      },
//      js: {
//        src: [ 'scripts/**/*.js',
//          'node_modules/angular/angular.min.js',
//          'node_modules/angular-progress-arc/angular-progress-arc.min.js',
//          'node_modules/bootstrap/dist/js/bootstrap.min.js'
//        ],
//        dest: 'dist/app.js'
//      },
//      css: {
//        src: [ 'scripts/**/*.css',
//          'node_modules/bootstrap/dist/css/boostrap.min.css'
//        ],
//        dest: 'dist/styles/styles.css'
//      }
//    },
//    uglify: {
//      dist: {
//        files: {
//          'dist/app.min.js': [ 'dist/app.js' ]
//        },
//        options: {
//          mangle: false
//        }
//      }
//    },
//    compress: {
//      dist: {
//        options: {
//          archive: 'build/dist/<%= pkg.name %>.zip'
//        },
//        files: [{
//          src: [ 'index.html' ],
//          dest: '/'
//        }, {
//          src: [ 'scripts/**' ],
//          dest: '/',
//        }, {
//          src: [ 'styles/**' ],
//          dest: '/'
//        }, {
//          src: [ 'images/**' ],
//          dest: '/'
//        }, {
//          src: [
//            'node_modules/angular/angular.min.js',
//            'node_modules/angular-progress-arc/angular-progress-arc.min.js',
//            'node_modules/jquery/dist/jquery.min.js',
//            'node_modules/bootstrap/dist/js/bootstrap.min.js'
//          ],
//          dest: '/'
//        }, {
//          src: [
//            'node_modules/bootstrap/dist/css/bootstrap.min.css'
//          ],
//          dest: '/'
//        }]
//      }
//    },
    copy: {
      webapp: {
        files: [
          {expand: true, src: ['index.html'], dest: 'dist/'},
          {expand: true, src: ['sp1r0s.io-README.md'], dest: 'dist/',
            rename: function(dest, src) {
              return dest + src.substring(src.indexOf('-') + 1);
            }
          },
          {expand: true, src: ['scripts/**'], dest: 'dist/'},
          {expand: true, src: ['styles/**'], dest: 'dist/'},
          {expand: true, src: ['resources/**'], dest: 'dist/'},
          {expand: true, flatten: true, src: ['node_modules/angular/angular.min.js'], dest: 'dist/libs'},
          {expand: true, flatten: true, src: ['node_modules/angular-bootstrap/ui-bootstrap.min.js'], dest: 'dist/libs'},
          {expand: true, flatten: true, src: ['node_modules/particles.js/particles.js'], dest: 'dist/libs'},
          {expand: true, flatten: true, src: ['node_modules/bootstrap/dist/css/bootstrap.min.css'], dest: 'dist/libs'}
        ]
      }
    },
    'gh-pages': {
      options: {
        message: 'Auto-generated commit from deploy app <%= pkg.name %>',
        base: 'dist',
        branch: 'master',
        user: {
          name: 'sp1r0s',
          email: 'sp1r0s@users.noreply.github.com'
        },
        repo: 'https://' + process.env.GH_TOKEN + '@github.com/sp1r0s/sp1r0s.github.io.git',
        clone: 'tmp/dir',
        silent: true
      },
      src: '**/*'
    },
    clean: {
      tmp: ['tmp/dir'],
      dist: ['dist']
    }
  });

  grunt.registerTask('default', 'jshint');
  grunt.registerTask('release', [
    'clean:dist',
//    'concat:js',
//    'concat:css',
//    'uglify:dist'
    'compress:dist'
  ]);
  grunt.registerTask('deploy', [
    'clean',
    'copy:webapp',
    'gh-pages'
  ]);
};