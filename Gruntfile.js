module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-es6-module-transpiler');

  grunt.registerTask('default', ['clean', 'transpile', 'connect', 'watch']);

  grunt.initConfig({
    clean: ['tmp'],

    connect: {
      server: {
        options: { port: 8000 }
      }
    },

    watch: {
      files: ['lib/**', 'test/**'],
      tasks: ['transpile']
    },

    transpile: {
      globals: {
        type: 'globals',
        imports: {
          'brique/dom_utils': 'window',
          'brique/string_utils': 'window'
        },
        files: {
          'tmp/brique.js': ['lib/brique.js'],
          'tmp/brique/string_utils.js': ['lib/brique/string_utils.js'],
          'tmp/brique/dom_utils.js': ['lib/brique/dom_utils.js']
        }
      }
    }
  });
};
