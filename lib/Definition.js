(function() {
    'use strict';

    let Class = require('ee-class');
    let type = require('ee-types');
    let log = require('ee-log');




    

    module.exports = new Class({


        /**
         * check the options, store the values
         *
         * @param {object} options the options object
         * @param {object} validation rules
         */
        processOptions: function(options, rules) {
            if (!type.object(options)) throw new Error(`You have to provide the options object!`);

            Object.keys(rules).forEach((key) => {
                let rule = rules[key];

                // mandatory check
                if (rule.mandatory && type.undefined(options[key])) throw new Error(`Option «${key}» is mandatory but not set!`);

                // type check
                if (!type.undefined(options[key]) && type(options[key]) !== rule.type) throw new Error(`Option «${key}» must have the type «${rule.type}», got «${type(options[key])}» instead!!`);

                // store locally
                this[key] = options[key];
            });
        }
    });
})();
