(function() {

    module.exports = {
          Database    : require('./lib/DatabaseDefinition')
        , Entity      : require('./lib/EntityDefinition')
        , Column      : require('./lib/ColumnDefinition')
        , Function    : require('./lib/FunctionDefinition')
        , Reference   : require('./lib/ReferenceDefinition')
        , Mapping     : require('./lib/MappingDefinition')
        , ReferenceBy : require('./lib/ReferenceByDefinition')
    };

})();
