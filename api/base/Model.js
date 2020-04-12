'use strict';
/**
 * api/base/base.js
 *
 * Base model for all sails.js models. This just contains some common code that every "nearly" every model uses.
 */
module.exports = {
    
    beforeCreate: function(object, cb) {
        object = removeEmptyString(object);
        cb();
    },
    
    beforeUpdate: function(object, cb) {
        object = removeEmptyString(object);
        cb();
    }

};

function removeEmptyString(data){
    for (var key in data) {
        if(data[key] === ''){
            data[key] = null;  
        } 
    };
    return data;
};