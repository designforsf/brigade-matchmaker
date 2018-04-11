module.exports = function(grunt) {
   'use strict';

   // load grunt tasks
   grunt.loadNpmTasks('grunt-contrib-handlebars');

   // create configureation object
   grunt.initConfig({

      handlebars: {
         compile: {
            options: {
               amd: true, // will generate with a AMD/CommonJS wrapper
               //namespace: false,

               // configure a namespace for your templates
               namespace: 'MinMaximizer.templates',

               // convert file path into a function name
               // in this example, I convert grab just the filename without the extension
               processName: function(filePath) {
                  var pieces = filePath.split('/');
                  var name = pieces[pieces.length - 1].split('.')[0];
                  return name;
               }

            },

            // output file: input files
            files: {
               'public/templates/minmaximizer.js': 'public/templates/*.hbs'
            }
         }
      }

   });

   // run handlebars task as a default
   grunt.registerTask('default', ['handlebars']);

}
