module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

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
      test: {
        options: { format: 'globals' },
        src: 'lib/brique.js',
        dest: 'tmp/brique.js'
      }
    }
  });

  grunt.registerMultiTask('transpile', 'Transpile ES6 modules', function() {
    var Compiler = require('es6-module-transpiler').Compiler;

    var options = this.options({
      format: 'amd'
    });

    this.files.forEach(function(f) {
      var contents = f.src.map(function(path) {
        var compiler = new Compiler(grunt.file.read(path), 'brique', options);
        var formats = {
          amd: 'toAMD',
          globals: 'toGlobals',
          cjs: 'toCJS'
        };

        return compiler[formats[options.format]].call(compiler);
      });

      grunt.file.write(f.dest, contents);
    });
  });
};
