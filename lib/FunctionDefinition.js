(function() {
    'use strict';

    let Class = require('ee-class');
    let type = require('ee-types');
    let log = require('ee-log');

    let Definition = require('./Definition');





    let optionsDefinition = {
          name                      : {mandatory: true, type: 'string'}
        , type                      : {mandatory: true, type: 'string'}
        , input                     : {mandatory: true, type: 'object'}
        , output                    : {mandatory: true, type: 'object'}
    };

    

    

    module.exports = new Class({
        inherits: Definition


        // function name
        , name: ''

        // tfunction type
        , type: ''




        /**
         * processes and validates the input
         * 
         * @param {object} options
         */
        , init: function(options, database) {
           

            // storage for parameters
            this.input = {};
            this.output = {};


            // super will process the options
            this.processOptions(options, optionsDefinition);

            
            // reference to the db this function belongs too
            this.database = database;
        }
    });
})();
