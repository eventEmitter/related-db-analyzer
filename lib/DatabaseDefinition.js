(function() {
    'use strict';

    let Class = require('ee-class');
    let type = require('ee-types');
    let log = require('ee-log');

    let Definition = require('./Definition');





    let optionsDefinition = {
          name                      : {mandatory: true, type: 'string'}
        , aliasName                 : {mandatory: false, type: 'string'}
        , exists                    : {mandatory: true, type: 'boolean'}
    };

    

    

    module.exports = new Class({
        inherits: Definition


        // the definition type
        , definitionType: 'database'


        // db name
        , name: ''

        // alias
        , aliasName: null

        // flags if the schema exists
        , exists: false




        /**
         * processes and validates the input
         * 
         * @param {object} options
         */
        , init: function(options) {
           

            // storage for entities, functions and more
            this.entities = new Map();
            this.functions = new Map();


            // super will process the options
            this.processOptions(options, optionsDefinition);
        }









        /**
         * returns the dbs alias or name
         *
         * @returns {string}
         */
        , getName: function() {
            return this.name;
        }








        /**
         * returns the dbs alias or name
         *
         * @returns {string}
         */
        , getAliasName: function() {
            return this.aliasName || this.name;
        }









        /**
         * check if a given entity exists
         *
         * @param {string} entityName
         *
         * @returns {boolean}
         */
        , hasEntity: function(entityName) {
            return this.entities.has(entityName);
        }







        /**
         * get a specific entitiy
         *
         * @param {string} entityName
         *
         * @returns {object|null}
         */
        , getEntity: function(entityName) {
            return this.entities.has(entityName) ? this.entities.get(entityName) : null;
        }







        /**
         * set a specific entitiy
         *
         * @param {string} entityName
         * @param {object} entity
         */
        , setEntity: function(entityName, entitiy) {
            this.entities.set(entityName, entitiy);
        }







        /**
         * check if a given function exists
         *
         * @param {string} functionName
         *
         * @returns {boolean}
         */
        , hasFunction: function(functionName) {
            return this.functions.has(functionName);
        }







        /**
         * get a specific function
         *
         * @param {string} functionName
         *
         * @returns {object|null}
         */
        , getFunction: function(functionName) {
            return this.functions.has(functionName) ? this.functions.get(functionName) : null;
        }







        /**
         * set a specific function
         *
         * @param {string} functionName
         * @param {object} function
         */
        , setFunction: function(functionName, fn) {
            this.functions.set(functionName, fn);
        }
    });
})();
