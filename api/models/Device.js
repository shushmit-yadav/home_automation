'use strict';
/**
 * Device.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = _.merge(_.cloneDeep(require('../base/Model')), {

	tableName: 'device',
	fetchRecordsOnCreate: true,
    fetchRecordsOnUpdate: true,
	  
	attributes: {

		fingerprint: {
			type: 'string',
			required: true,
			unique: true
		},
        name: {
            type: 'string',
            required: true
        },
        actions: {
			type: 'json'
		}
    

  	},

});

