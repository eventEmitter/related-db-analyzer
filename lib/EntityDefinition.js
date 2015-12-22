(function() {
    'use strict';

    let Class = require('ee-class');
    let type = require('ee-types');
    let log = require('ee-log');

    let Definition = require('./Definition');





    let optionsDefinition = {
          name                      : {mandatory: true, type: 'string'}
        , aliasName                 : {mandatory: true, type: 'string'}
        , isMapping                 : {mandatory: false, type: 'boolean'}
    };

    

    

    module.exports = new Class({
        inherits: Definition

        // model name
        , name: null

        // the models alias name
        , aliasName: null

        // flags if the model is a mapping table
        , isMapping: false




        /**
         * processes and validates the input
         * 
         * @param {object} options
         */
        , init: function(options, database) {

            if (!database) throw new Error('Need a reference to the database!');
           
            // storage for columns
            this.columns = new Map();


            // super will process the options
            this.processOptions(options, optionsDefinition);


            // the db this entity belongs to
            this.database = database; 
        }





        /*
         * check if a column exists
         *
         * @param {string} columnName
         *
         * @param {boolean}
         */
        , hasColumn: function(columnName) {
            return this.columns.has(columnName);
        }



        /*
         * return a column exists
         *
         * @param {string} columnName
         *
         * @param {object|null}
         */
        , getColumn: function(columnName) {
            return this.columns.has(columnName) ? this.columns.get(columnName) : null;
        }




         /*
         * return a column exists
         *
         * @param {string} columnName
         * @param {object} column
         */
        , setColumn: function(columnName, column) {
            this.columns.set(columnName, column);
        }





        /*
         * return the name of the table this model belongs to
         */
        , getTableName: function() {
            return this.name;
        }


        /*
         * return the name of the database this model belongs to
         */
        , getDatabaseName: function() {
            return this.database.name;
        }


        /*
         * return the name of the database this model belongs to
         */
        , getDatabaseAliasName: function() {
            return this.database.aliasName ||this.database.name;
        }
    });
})();
