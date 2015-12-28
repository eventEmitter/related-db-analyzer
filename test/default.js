(function() {
    'use strict';


    let Class = require('ee-class');
    let log = require('ee-log');
    let assert = require('assert');





    let Definitions = require('../');





    describe('Definitions', function(){
        it('Database', function(){
            new Definitions.Database({
                  name: 'a'
                , aliasName: 'b'
                , exists: true
            });
        });

        it('Entity', function(){
            new Definitions.Entity({
                  name: 'a'
                , aliasName: 'b'
            }, {});
        });

        it('Column', function(){
            new Definitions.Column({
                  name: 'a'
                , type: 'înt'
                , jsTypeMapping: 'number'
                , variableLength: true
                , nullable: true
                , nativeType: 'int4'
            }, {});
        });

        it('Function', function(){
            new Definitions.Function({
                  name: 'a'
                , type: 'function'
                , input: {}
            }, {});
        });
    });  
})();
