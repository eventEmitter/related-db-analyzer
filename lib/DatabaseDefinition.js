(function() {
    'use strict';

    let Class = require('ee-class');
    let type = require('ee-types');
    let log = require('ee-log');

    let Definition = require('./Definition');





    let optionsDefinition = {
          name                      : {mandatory: true, type: 'string'}
        , aliasName                 : {mandatory: false, type: 'string'}
    };

    

    

    module.exports = new Class({
        inherits: Definition


        // db name
        , name: ''

        // alias
        , aliasName: null



        /**
         * processes and validates the input
         * 
         * @param {object} options
         */
        , init: function(options) {
           

            // storage for entities, functions and more
            this.entities = {};
            this.functions = {};


            // super will process the options
            this.processOptions(options, optionsDefinition);
        }
    });
})();
