module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: 9537,
                    base: '.'
                }
            }
        },

        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile %>',
                tasks: 'jshint:gruntfile'
            },

            dist: {
                files: '<%= jshint.dist %>',
                tasks: ['jshint:dist', 'uglify:dist', 'minjson:dist']
            },

            test: {
                files: ['<%= jshint.test %>', 'test/**/*.html'],
                tasks: ['jshint:test', 'karma:tests:run']
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },

            dist: {
                expand: true,
                cwd: 'lib/',
                src: '**/*.js',
                dest: 'www/'
            }
        },

        minjson: {
            dist: {
                expand: true,
                cwd: 'lib/',
                src: '**/*.json',
                dest: 'www/'
            }
        },

        jshint: {
            gruntfile: 'Gruntfile.js',
            dist: 'lib/**/*.{js,json}',
            test: 'test/**/*.{js,json}',

            options: {
                jshintrc: '.jshintrc',

                globals: {
                    Gittip: true,
                    _gttp: true,

                    // JSHint doesn't like XDomainRequest otherwise
                    XDomainRequest: true
                }
            }
        },

        karma: {
            tests: {
                hostname: '0.0.0.0'
            },

            singlerun: {
                singleRun: true
            },

            options: {
                browsers: ['PhantomJS'],
                reporters: 'dots',
                frameworks: ['mocha', 'browserify'],
                urlRoot: '/karma/',
                proxies: { '/': 'http://localhost:9537/' },
                files: [
                    'bower_components/jquery/jquery.js',
                    'test/**/test_*.js',
                ],

                browserify: { watch: true },
                preprocessors: {
                    'test/**/*.js': ['browserify']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-minjson');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['test', 'minify']);
    grunt.registerTask('minify', ['uglify', 'minjson']);
    grunt.registerTask('test', ['jshint', 'connect', 'karma:singlerun']);
    grunt.registerTask('watch-tests', ['connect', 'karma:tests']);
};
