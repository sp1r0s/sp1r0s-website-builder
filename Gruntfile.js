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
        files: ['website/scripts/**/*.js']
    },
    concat: {
      options: {
        separator: ';'
      },
      app: {
        src: [
          'website/scripts/**/*.js'
        ],
        dest: 'tmp/scripts/app.js'
      }
//      css: {
//        src: [
//          'website/**/*.css',
//          'node_modules/bootstrap/dist/css/boostrap.css'
//        ],
//        dest: 'tmp/styles/styles.css'
//      }
    },
    uglify: {
      dist: {
        files: {
          'dist/scripts/app.min.js': [ 'tmp/scripts/app.js' ]
        },
        options: {
          mangle: false
        }
      }
    },
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
      website: {
        files: [
          {expand: true, cwd: 'website/', src: ['index.html'], dest: 'dist/'},
          {expand: true, cwd: 'website/', src: ['README.md'], dest: 'dist/'},
          {expand: true, cwd: 'website/', src: ['scripts/**'], dest: 'dist/'},
          {expand: true, cwd: 'website/', src: ['styles/**'], dest: 'dist/'},
          {expand: true, cwd: 'website/', src: ['resources/**'], dest: 'dist/'},
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
      tmp: ['tmp'],
      dist: ['dist']
    }
  });

  grunt.registerTask('default', 'jshint');
  grunt.registerTask('release', [
    'clean:dist',
    'concat:js',
    'uglify:dist'
  ]);
  grunt.registerTask('deploy', [
    'clean',
    'copy:website',
    'gh-pages'
  ]);
};