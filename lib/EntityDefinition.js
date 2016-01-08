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
            this.belongTos = new Map();


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
         * return a reference
         *
         * @param {string} referenceName
         *
         * @param {object|null}
         */
        , getReference: function(referenceName) {
            if (this.references.has(referenceName)) return this.references.get(referenceName);
            else throw new Error(`Cannot return the reference '${referenceName}' on the entity '${this.getAliasName()}', the reference does not exist!`);
        }










        /**
         * registers a belongs to definition
         *
         * @param {object} mapping the mapping to register
         */
        , registerBelongsTo: function(belongsTo) {
            let name = belongsTo.getName();
            

            if (this.usedNames.has(name)) this.failedNames.set(name, 'belongsTo');
            else {
                // register belongsTo
                this.belongTos.set(name, belongsTo);

                // register name
                this.usedNames.set(name, 'belongsTo');
            }
        }








        /**
         * return a belongs to
         *
         * @param {string} belongsToName
         *
         * @param {object|null}
         */
        , getBelongsTo: function(belongsToName) {
            if (this.belongTos.has(belongsToName)) return this.belongTos.get(belongsToName);
            else throw new Error(`Cannot return the belongs to '${belongsToName}' on the entity '${this.getAliasName()}', the belongs to does not exist!`);
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
         * return a mapping
         *
         * @param {string} mappingName
         *
         * @param {object|null}
         */
        , getMapping: function(mappingName) {
            if (this.mappings.has(mappingName)) return this.mappings.get(mappingName);
            else throw new Error(`Cannot return the mapping '${mappingName}' on the entity '${this.getAliasName()}', the mapping does not exist!`);
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
         * return a column
         *
         * @param {string} columnName
         *
         * @param {object|null}
         */
        , getColumn: function(columnName) {
            if (this.columns.has(columnName)) return this.columns.get(columnName);
            else throw new Error(`Cannot return the column '${columnName}' on the entity '${this.getAliasName()}', the column does not exist!`);
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
         * returns if the entity has a given property
         *
         * @param {string} propertyName
         *
         * @param {boolean}
         */
        , hasProperty: function(propertyName) {
            return this.usedNames.has(propertyName);
        }








        /**
         * returns the type of a property
         *
         * @param {string} propertyName
         *
         * @param {string}
         */
        , getPropertyType: function(propertyName) {
            return this.hasProperty(propertyName) ? this.usedNames.get(propertyName) : 'not-exists';
        }








        /**
         * returns the property defnition
         *
         * @param {string} propertyName
         *
         * @param {object}
         */
        , getProperty: function(propertyName) {
            if (this.hasProperty(propertyName)) {
                switch (this.getPropertyType(propertyName)) {

                    case 'column':
                        return this.getColumn(propertyName);


                    case 'reference':
                        return this.getReference(propertyName);


                    case 'belongsTo':
                        return this.getBelongsTo(propertyName);


                    case 'mapping':
                        return this.getMapping(propertyName);


                    default:
                        throw new Error(`Cannot return the property '${propertyName}' on the entity '${this.getAliasName()}', the property type '${this.getPropertyType(propertyName)}' is not known!`);
                }
            }
            else throw new Error(`Cannot return the property '${propertyName}' on the entity '${this.getAliasName()}', the property does not exist!`);
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
