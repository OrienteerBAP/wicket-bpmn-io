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
            source: 'src/main/java/org/orienteer/wicketbpmnio/component',
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
                    '<%= config.dist %>/common.js': ['<%= config.source %>/common.js']
                }
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            target: {
                files: {
                    '<%= config.dist %>/common.min.js': ['<%= config.dist %>/common.js']
                }
            }
        },

        clean: {
            target: ['<%= config.dist %>/common.js']
        }
    });

    grunt.registerTask('build', [ 'mkdir:target', 'browserify:app', 'uglify:target', 'clean:target']);

};