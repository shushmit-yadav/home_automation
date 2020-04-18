var supertest = require('supertest');
var assert = require('chai').assert;

describe('DeviceController', function() {

    describe('#getAllDevices()', function() {
        it('should return all devices', function (done) {
            supertest(sails.hooks.http.app)
            .get('/devices')
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, res){
                assert(typeof(res.body), 'array');
                if (err) return done(err);
                done();
            });
        });
    });

    describe("#addDevice()", function(){
        it("should return currently installed device", function(done){
            supertest(sails.hooks.http.app)
            .post('/device')
            .set('Content-Type', 'application/json')
            .send({
                "fingerprint": "abdsfjsd3q4q4q34",
                "name": "Samsung TV"
            })
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done();
            });
        });


        it("should throw error that device already installed", function(done){
            supertest(sails.hooks.http.app)
            .post('/device')
            .set('Content-Type', 'application/json')
            .send({
                "fingerprint": "abdsfjsd3q4q4q34",
                "name": "Samsung TV"
            })
            .expect(409)
            .end(function(err, res){
                if (err) return done(err);
                done();
            });
        });
    });


    describe("#performOperationOnDevice()", function(){
        it("should return device on which action has been performed", function(done){
            supertest(sails.hooks.http.app)
            .post('/performAction')
            .set('Content-Type', 'application/json')
            .send({
                "fingerprint": "abdsfjsd3q4q4q34", 
                "action": "start" 
            })
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done();
            });
        });
    });

    describe("#removeDevice()", function(){
        it("should delete installed device", function(done){
            supertest(sails.hooks.http.app)
            .delete('/device/abdsfjsd3q4q4q34')
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done();
            });
        });
    });

    describe("#performOperationOnDevice()", function(){
        it("should return device on which action has been performed", function(done){
            supertest(sails.hooks.http.app)
            .post('/performAction')
            .set('Content-Type', 'application/json')
            .send({
                "fingerprint": "abdsfjsd3q4q4q34", 
                "action": "start" 
            })
            .expect(404)
            .end(function(err, res){
                if (err) return done(err);
                done();
            });
        })
    });

});