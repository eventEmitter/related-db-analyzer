(function() {
    'use strict';

    let Class = require('ee-class');
    let type = require('ee-types');
    let log = require('ee-log');

    let Definition = require('./Definition');





    let optionsDefinition = {
          mapping       : {mandatory: true, type: 'object'}
        , mappedColumn  : {mandatory: true, type: 'object'}
    };

    

    

    module.exports = new Class({
        inherits: Definition


        // the definition type
        , definitionType: 'mapping'

        // the mapping entity
        , mapping: null

        // the column of the other table that is referenced
        , mappedColumn: null

        // custom defined name for the mapping
        , name: null







        /**
         * processes and validates the input
         * 
         * @param {object} options
         */
        , init: function(options, column) {

            if (!column) throw new Error('Need a reference to the column!');
           

            // super will process the options
            this.processOptions(options, optionsDefinition);


            // the column of this reference
            this.column = column;
        }








        /**
         * returns the name of the mapping
         *
         * @returns {string} name
         */
        , getName: function() {
            return this.name !== null ? this.name : this.mappedColumn.entity.getAliasName();
        }






        /**
         * returns the other entities name
         *
         * @returns {string} name
         */
        , getRemoteName() {
            return this.mappedColumn.entity.getAliasName();
        }






        /**
         * returns the name of th entity of this set
         *
         * @returns {string} name
         */
        , getContainingName() {
            return this.mappedColumn.entity.getAliasName();
        }
    });
})();
