(function() {
    'use strict';

    let Class = require('ee-class');
    let type = require('ee-types');
    let log = require('ee-log');

    let Definition = require('./Definition');





    let optionsDefinition = {
          name                      : {mandatory: true, type: 'string'}
        , type                      : {mandatory: true, type: 'string'}
        , jsTypeMapping             : {mandatory: true, type: 'string'}
        , variableLength            : {mandatory: true, type: 'boolean'}
        , bitLength                 : {mandatory: false, type: 'number'}
        , nullable                  : {mandatory: true, type: 'boolean'}
        , isAutoIncrementing        : {mandatory: false, type: 'boolean'}
        , defaultValue              : {mandatory: false, type: 'string'}
        , isPrimary                 : {mandatory: false, type: 'boolean'}
        , isUnique                  : {mandatory: false, type: 'boolean'}
        , isReferenced              : {mandatory: false, type: 'boolean'}
        , isForeignKey              : {mandatory: false, type: 'boolean'}
        , nativeType                : {mandatory: true, type: 'string'}
    };



    

    module.exports = new Class({
        inherits: Definition


        // column name
        , name: ''

        // the columns type
        , type: ''

        // the js type for this column
        , jsTypeMapping: ''

        // the column has variabel length?
        , variableLength: false

        // length of the value
        , bitLength: 0

        // nullable?
        , nullable: false

        // is an auto incrementing value
        , isAutoIncrementing: false

        // default value
        , defaultValue: null

        // primary key?
        , isPrimary: false

        // column has an unique contraint
        , isUnique: false

        // column is refenced by another coluumn
        , isReferenced: false

        //is a foreign key
        , isForeignKey: false

        // the type as definedd by the db
        , nativeType: ''

        // the table this column is referencing
        , referencedTable: null

        // the column this column is referencing
        , referencedColumn: null

        // link to the model that is referenced
        , referencedModel: null

        // update action for the reference
        , referenceUpdateAction: null

        // the delte action for the reference
        , referenceDeleteAction: null





        /**
         * processes and validates the input
         * 
         * @param {object} options
         */
        , init: function(options, table) {
            
            if (!table) throw new Error('Need a reference to the table!');
           

            // storage for mappings & entites 
            // linking this column
            this.mapsTo = [];
            this.belongsTo = [];


            // super will process the options
            this.processOptions(options, optionsDefinition);


            // need to know the table this column belongs to
            this.table = table;
        }
    });
})();
