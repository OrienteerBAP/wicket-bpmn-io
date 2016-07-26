'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var path = require('path');

    function resolvePath(project, file) {
        return path.join(path.dirname(require.resolve(project)), file);
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        config: {
            source: 'src/main/resources/org/orienteer/wicketbpmnio/component',
            dist: 'target/classes/org/orienteer/wicketbpmnio/component'
        },

        mkdir: {
            target: {
                options: {
                    create: ['<%= config.dist %>']
                }
            }
        },

        browserify: {
            options: {
                 browserifyOptions: {
                     debug: true,
                     list: true,
                     insertGlobalVars: {
                         process: function () {
                             return 'undefined';
                         },
                         Buffer: function () {
                             return 'undefined';
                         }
                     }
                 },
                transform: [ 'brfs' ]
            },
            app: {
                files: {
                    '<%= config.dist %>/bpmnviewer.js': ['<%= config.source %>/bpmnviewer.js'],
                    '<%= config.dist %>/bpmnmodeler.js': ['<%= config.source %>/bpmnmodeler.js'],
                    '<%= config.dist %>/dmnviewer.js': ['<%= config.source %>/dmnviewer.js'],
                    '<%= config.dist %>/dmnmodeler.js': ['<%= config.source %>/dmnmodeler.js'],
                    '<%= config.dist %>/cmmnviewer.js': ['<%= config.source %>/cmmnviewer.js'],
                    '<%= config.dist %>/cmmnmodeler.js': ['<%= config.source %>/cmmnmodeler.js'],
                }
            }
        },
        
        copy: {
	        diagram_js: {
	          files: [
	            {
	              src: resolvePath('diagram-js', 'assets/diagram-js.css'),
	              dest: '<%= config.dist %>/css/diagram-js.css'
	            }
	          ]
	        },
	        bpmn_js: {
	          files: [
	            {
	              expand: true,
	              cwd: resolvePath('bpmn-js', 'assets'),
	              src: ['**/*.*', '!**/*.js'],
	              dest: '<%= config.dist %>/vendor'
	            },
                  {
                      cwd: 'node_modules/dmn-js/fonts/',
                      src: 'dmn-js*',
                      expand: true,
                      dest: '<%= config.dist %>/fonts/'
                  },
                  {
                      expand: true,
                      cwd: resolvePath('cmmn-js', 'assets'),
                      src: ['**/*.*', '!**/*.js'],
                      dest: '<%= config.dist %>/vendor'
                  }
	          ]
	        }
	      },
	      less: {
	          options: {
	            dumpLineNumbers: 'comments',
	            paths: [
	              'node_modules'
	            ]
	          },

	          styles: {
	            files: {
	              '<%= config.dist %>/style.css': '<%= config.source %>/style.less',
                    '<%= config.dist %>/css/dmn-js.css': 'node_modules/dmn-js/styles/dmn-js.less'
	            }
	          }
	        },

        uglify: {
            options: {
                mangle: false
            },
            target: {
                files: {
                    '<%= config.dist %>/bpmnviewer.min.js': ['<%= config.dist %>/bpmnviewer.js'],
                    '<%= config.dist %>/bpmnmodeler.min.js': ['<%= config.dist %>/bpmnmodeler.js'],
                    '<%= config.dist %>/dmnviewer.min.js': ['<%= config.dist %>/dmnviewer.js'],
                    '<%= config.dist %>/dmnmodeler.min.js': ['<%= config.dist %>/dmnmodeler.js'],
                    '<%= config.dist %>/cmmnviewer.min.js': ['<%= config.dist %>/cmmnviewer.js'],
                    '<%= config.dist %>/cmmnmodeler.min.js': ['<%= config.dist %>/cmmnmodeler.js'],
                }
            }
        },

        clean: {
            target: ['<%= config.dist %>/bpmnviewer.js', '<%= config.dist %>/bpmnmodeler.js',
                     '<%= config.dist %>/dmnviewer.js', '<%= config.dist %>/dmnmodeler.js',
                     '<%= config.dist %>/cmmnviewer.js', '<%= config.dist %>/cmmnmodeler.js']
        }
    });

    grunt.registerTask('build', [ 'mkdir:target', 'browserify:app', 'uglify:target', 'copy', 'less', 'clean:target']);

};