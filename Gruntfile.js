module.exports = function (grunt) {


    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        wiredep: {
            app: {
                src: ['app/index.html']
            }
        },
        watch: {
            options: {
                livereload: true
            },
            files: {
                files: ['app/**/*.js', 'app/**/*.html']
            }
        },
        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'dist',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['concat', 'cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['dist/index.html']
        },


        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/img',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: 'dist/img'
                }]
            }
        },
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'app',
                    dest: 'dist',
                    src: [
                        '*.{ico,pdf,webapp}',
                        '**/*.html'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/components-font-awesome',
                    dest: 'dist',
                    src: [
                        'fonts/*'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/bootstrap',
                    dest: 'dist',
                    src: [
                        'fonts/*'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    dest: 'dist',
                    src: [
                        'README.md',
                        'CNAME',
                        'robots.txt',
                        'LICENSE'
                    ]
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        connect: {
            dev: {
                options: {
                    port: 3010,
                    open: true,
                    livereload: 35729,
                    middleware: function (connect) {
                        return [
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static('app')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    port: 3015,
                    open: true,
                    keepalive: true,
                    middleware: function (connect) {
                        return [
                            connect.static('dist')
                        ];
                    }
                }
            }
        },
        clean: {
            dist: {
                src: ['dist']
            }
        },

    });


    // Default task(s).
    grunt.registerTask('default', ['wiredep', 'connect:dev', 'watch']);

    // simple build task
    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'imagemin',
        'copy',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'usemin',
        'htmlmin:dist'
    ]);

};