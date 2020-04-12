'use strict';
/**
 * DeviceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var BaseCtrl = require('../base/Controller');

module.exports = {
  
    /**
     * @author: shushmit yadav
     * @description: this function will accept req and res 
     *               It will find all installed devices and return to response
     * @param {*} req 
     * @param {*} res 
     */
    getAllDevices: function(req, res){
        var requiredParamsError = BaseCtrl.checkRequiredParams(req, []);
        if(requiredParamsError){
            return res.badRequest(requiredParamsError);
        } else {
            
            // find all devices
            sails.models.device.find()
            .then(function(devices){
                return res.ok(devices);
            })
            .catch(function(err){
                var errCode = err && err.code ? err.code : 500,
                    errMessage = err && err.message ? err.message : err;
                return res.status(errCode).send(errMessage);
            });

        }
    }

};

