(function() {
    'use strict';

    let Class = require('ee-class');
    let type = require('ee-types');
    let log = require('ee-log');

    let Definition = require('./Definition');





    let optionsDefinition = {
          referencedByColumn    : {mandatory: true, type: 'object'}
        , onDelete              : {mandatory: true, type: 'string'}
        , onUpdate              : {mandatory: true, type: 'string'}
    };

    

    

    module.exports = new Class({
        inherits: Definition


        // the definition type
        , definitionType: 'belongsTo'

        // the column of the other table that is referenced
        , referencedByColumn: null

        // the on update action
        , onUpdate: null

        // the on delete action
        , onDelete: null

        // custom defined name for the refernce
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
         * return the column
         */
        , getColumn: function() {
            return this.column;
        }





        

        /**
         * returns the name of the reference
         *
         * @returns {name}
         */
        , getName: function() {
            return this.name !== null ? this.name : this.referencedByColumn.entity.getAliasName();
        }






        /**
         * returns the other entities name
         *
         * @returns {string} name
         */
        , getRemoteName() {
            return this.referencedByColumn.entity.getAliasName();
        }






        /**
         * returns the name of th entity of this set
         *
         * @returns {string} name
         */
        , getContainingName() {
            return this.referencedByColumn.entity.getAliasName();
        }
    });
})();
