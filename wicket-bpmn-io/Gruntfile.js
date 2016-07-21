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
            dist: 'target/src/resources/org/orienteer/wicketbpmnio/component'
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
                    '<%= config.dist %>/bpmnviewer.js': ['<%= config.source %>/bpmnviewer.js']
                }
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            target: {
                files: {
                    '<%= config.dist %>/bpmnviewer.min.js': ['<%= config.dist %>/bpmnviewer.js']
                }
            }
        },

        clean: {
            target: ['<%= config.dist %>/bpmnviewer.js']
        }
    });

    grunt.registerTask('build', [ 'mkdir:target', 'browserify:app', 'uglify:target', 'clean:target']);

};