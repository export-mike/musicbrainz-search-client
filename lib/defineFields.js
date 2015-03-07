'use strict';

module.exports = function(fields) {
    var base = this;
    fields.forEach(function(field_name) {
        var value;
        Object.defineProperty(base, field_name, {
            get: function(){ return value; },
            set: function(new_value){
                value = new_value;
            }
        });
    });
};