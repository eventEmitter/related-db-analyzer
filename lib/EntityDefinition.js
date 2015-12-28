(function() {
    'use strict';

    let Class = require('ee-class');
    let type = require('ee-types');
    let log = require('ee-log');

    let Definition = require('./Definition');





    let optionsDefinition = {
          name                      : {mandatory: true, type: 'string'}
        , aliasName                 : {mandatory: false, type: 'string'}
        , isMapping                 : {mandatory: false, type: 'boolean'}
    };

    

    

    module.exports = new Class({
        inherits: Definition


        // the definition type
        , definitionType: 'entity'

        // model name
        , name: null

        // the models alias name
        , aliasName: null

        // flags if the model is a mapping table
        , isMapping: false



        // columns that point to the referenced
        // entities if this is a mapping
        , mappingColumns: null






        /**
         * processes and validates the input
         * 
         * @param {object} options
         */
        , init: function(options, database) {
            if (!database) throw new Error('Need a reference to the database!');
           
            // storage for columns
            this.columns = new Map();


            // storage for mapped, referenced
            // and belongto entities
            this.mappings = new Map();
            this.references = new Map();
            this.referenceBys = new Map();


            // storage for all used names
            this.usedNames = new Map();

            // names that should be used but cannot 
            // be sued because they are used already
            this.failedNames = new Map();


            // primarykeys
            this.primaryKeys = [];


            // super will process the options
            this.processOptions(options, optionsDefinition);


            // the db this entity belongs to
            this.database = database; 
        }











        /**
         * registers a mapping on the entitiy
         *
         * @param {object} mapping the mapping to register
         */
        , registerMapping: function(mapping) {
            let name = mapping.getName();
            

            if (this.usedNames.has(name)) this.failedNames.set(name, 'mapping');
            else {
                // register mapping
                this.mappings.set(name, mapping);

                // register name
                this.usedNames.set(name, 'mapping');
            }
        }










        /**
         * registers a mapping on the entitiy
         *
         * @param {object} mapping the mapping to register
         */
        , registerReference: function(reference) {
            let name = reference.getName();
            

            if (this.usedNames.has(name)) this.failedNames.set(name, 'reference');
            else {
                // register reference
                this.references.set(name, reference);

                // register name
                this.usedNames.set(name, 'reference');
            }
        }










        /**
         * registers a mapping on the entitiy
         *
         * @param {object} mapping the mapping to register
         */
        , registerReferenceBy: function(referenceBy) {
            let name = referenceBy.getName();
            

            if (this.usedNames.has(name)) this.failedNames.set(name, 'referenceBy');
            else {
                // register referenceBy
                this.referenceBys.set(name, referenceBy);

                // register name
                this.usedNames.set(name, 'referenceBy');
            }
        }
        









        /**
         * this entity is a mapping between two other entities
         *
         * @param {array} columns the columns that point to 
         *                        the refernced entities
         */
        , defineMapping: function(columns) {
            this.mappingColumns = columns;
        }








        /**
         * check if a column exists
         *
         * @param {string} columnName
         *
         * @param {boolean}
         */
        , hasColumn: function(columnName) {
            return this.columns.has(columnName);
        }







        /**
         * return a column exists
         *
         * @param {string} columnName
         *
         * @param {object|null}
         */
        , getColumn: function(columnName) {
            return this.columns.has(columnName) ? this.columns.get(columnName) : null;
        }








        /**
         * add a new column
         *
         * @param {string} columnName
         * @param {object} column
         */
        , setColumn: function(columnName, column) {
            this.columns.set(columnName, column);

            // register name
            this.usedNames.set(columnName, 'column');
        }







        /**
         * return the name of the table this model belongs to
         */
        , getName: function() {
            return this.name;
        }


        /**
         * return the name of the table this model belongs to
         */
        , getAliasName: function() {
            return this.aliasName || this.name;
        }





        /**
         * add a new prmary key column
         *
         * @param {string} primaryKeyColumnName
         */
        , addPrimaryKey: function(primaryKeyColumnName) {
            this.primaryKeys.push(primaryKeyColumnName);
        }
    });
})();
