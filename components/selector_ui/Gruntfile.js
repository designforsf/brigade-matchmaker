module.exports = function(grunt) {
   'use strict';

   // load grunt tasks
   grunt.loadNpmTasks('grunt-contrib-handlebars');

   // create configureation object
   grunt.initConfig({

      handlebars: {
         compile: {
            options: {

               // configure a namespace for your templates
               namespace: 'Selector.templates',

               // convert file path into a function name
               // in this example, I convert grab just the filename without the extension
               processName: function(filePath) {
                  var pieces = filePath.split('/');
                  return pieces[pieces.length - 1].split('.')[0];
               }

            },

            // output file: input files
            files: {
               'js/templates/selector.js': 'js/templates/*.hbs'
            }
         }
      }

   });

   // run handlebars task as a default
   grunt.registerTask('default', ['handlebars']);

}
