# home-automation

Home Automation is a server to manage smart devices. It has set of APIs to list/add/delete devices. It has an api to perform any action on a specific device like start/stop.

## Requirement
+ node - install node 
+ Sails.js - run command ** npm install sails -g **
+ mongodb

## Installation

Unzip folder or clone [home-automation](https://github.com/shushmit-yadav/home_automation.git)

Open terminal and navigate to project root directory and then do

+ npm install

npm install will install all the libraries from package.json file.

Once installation done, then to start server, do
+ sails lift

## APIs
+ GET /devices
+ POST /device
     + Body Parameters keys
        + fingerprint
        + name 
+ POST /performAction
     + Body Parameters
        + fingerprint
        + action
+ DELETE /device/:fingerprint

## Test Cases
For testcases, I have used libraries chai, mocha and supertest. [Documentation for testcases with sails](https://sailsjs.com/documentation/concepts/testing).

Open terminal in project root directory and then run command
+ npm test