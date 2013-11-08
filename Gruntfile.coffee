module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON("package.json")

        jade:
            build:
                options:
                    pretty: true
                    data: 
                        debug: true
                files:
                    "./dist/index.html": ["./dev/index.jade"]
            release:
                options:
                    pretty: false
                    data: 
                        debug: false
                files:
                    "./dist/index.html": ["./dev/index.jade"]

        less:
            options:
                paths: ["./dev/css"]
            build:
                files:
                    "./dist/css/main.css": "./dev/css/main.less"

            release:
                options:
                    compress: true
                    cleancss: true
                    relativeUrls: true
                files:
                    "./dist/css/main.css": "./dev/css/main.less"

        browserify2:
            build:
                entry: "./dev/js/main.js"
                compile: "./dist/js/main.js"

        uglify:
            options:
                banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today('yyyy-mm-dd') %> */\n"

            release:
                src: "./dist/js/main.js"
                dest: "./dist/js/main.min.js"

        copy: 
            media: 
                files: [
                    expand: true
                    cwd: "./dev/media/"
                    src: ["**/*.jpg","**/*.json","**/*.png","sound/*","music/*","**"]
                    dest: "./dist/media/"
                ]

        clean:
            build: ["./dist/media"]
            before_release: ["./dist"]
            after_release: ['./dist/js/main.js']

        watch:
            dist:
                options:
                    livereload: true
                files: ["./dist/**/*"]
            css:
                files: ["./dev/css/**/*.less"]
                tasks: ["less:build"]

            jade:
                files: ["./dev/*.jade"]
                tasks: ["jade:build"]

            js:
                files: ["./dev/js/**/*.js"]
                tasks: ["browserify2"]

            media: 
                files: ["./dev/media/**/*"]
                tasks: ["clean:build", "copy"]

        # jshint:
        #     compile: ["./dev/js/**/*.js"]
        
    
    grunt.loadNpmTasks "grunt-contrib-less"
    grunt.loadNpmTasks "grunt-contrib-jade"
    grunt.loadNpmTasks "grunt-contrib-watch"
    grunt.loadNpmTasks "grunt-contrib-uglify"
    grunt.loadNpmTasks "grunt-contrib-copy"
    grunt.loadNpmTasks "grunt-contrib-clean"
    grunt.loadNpmTasks "grunt-browserify2"
    # grunt.loadNpmTasks "grunt-contrib-jshint"

    grunt.registerTask "release", ["clean:before_release", "jade:release", "less:release", "browserify2", "uglify", "copy", "clean:after_release"]
    grunt.registerTask "default", ["clean:build", "jade:build", "less:build", "browserify2", "uglify", "copy"]