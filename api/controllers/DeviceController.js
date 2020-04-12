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
    },

     /**
     * @author: shushmit yadav
     * @description: this function will first check required parameters, then it will first check that fingerprint which has to be add, already installed or not
     *               If already installed, then throw error already exists, otherwise will will add new device
     * @param {*} req 
     * @param {*} res 
     */
    addDevice: function(req, res){
        var requiredParamsError = BaseCtrl.checkRequiredParams(req, ['fingerprint', 'name']);
        if(requiredParamsError){
            return res.badRequest(requiredParamsError);
        } else {
            var reqObj = {
                'name': req.param('name'),
                'fingerprint': req.param('fingerprint')
            };

            // first find then create
            sails.models.device.findOne({'fingerprint': reqObj.fingerprint})
            .then(function(deviceFound){
                if(deviceFound){
                    var err = new Error();
                    err.code = 403;
                    err.mesage = "Device found with fingerprint - " + reqObj.fingerprint;

                    throw err;
                } else {
                    return deviceFound;
                }
            })
            .then(function(device){
                // create new device
                return sails.models.device.create(reqObj)
                .then(function(deviceAdded){
                    return deviceAdded;
                })
                .catch(function(err){
                    throw err;
                });
            })
            .then(function(device){
                return device;
            })
            .catch(function(err){
                var errCode = err && err.code ? err.code : 500,
                    errMessage = err && err.message ? err.message : err;
                return res.status(errCode).send(errMessage);
            });
        }
    },

    /**
     * @author: shushmit yadav
     * @description: this function will send device's fingerprint and action which has to be perform...
     *              It will first find device and then check that if action is to be perform first time, then it will store that action with value true in actions attribute
     *              It that action has been performed already, then function will toggle that action value only
     * @param {*} req 
     * @param {*} res 
     */
    performOperationOnDevice: function(req, res){
        var requiredParamsError = BaseCtrl.checkRequiredParams(req, ['fingerprint', 'action']);
        if(requiredParamsError){
            return res.badRequest(requiredParamsError);
        } else {
            
            var action = req.param('action'),
                fingerprint = req.param('fingerprint');
            // first find device
            sails.models.device.findOne({'fingerprint': fingerprint})
            .then(function(device){
                if(!device){
                    var err = new Error();
                    err.code = 404;
                    err.mesage = "Device not found with fingerprint - " + fingerprint;
                    throw err;
                } else {
                    // get already performed action
                    var actionObj = device.actions ? device.actions : {};
                    actionObj[action] = actionObj[action] ? !actionObj[action] : true;

                    // update action
                    return sails.models.device.update({'id': device.id}, {'actions': actionObj})
                    .then(function(actionPerformed){
                        return actionPerformed;
                    })
                    .catch(function(err){
                        throw err;
                    });
                }
            })
            .then(function(actionPerformed){
                return res.ok(actionPerformed);
            })
            .catch(function(err){
                var errCode = err && err.code ? err.code : 500,
                    errMessage = err && err.message ? err.message : err;
                return res.status(errCode).send(errMessage);
            });
        }
    },

};

