module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-contrib-coffee'

  grunt.initConfig
    coffee:
      compile:
        options:
          bare: true
          join: true
        files:
          'dist/index.js': ['app/**/*.coffee']

  grunt.registerTask 'build', ['coffee:compile']
