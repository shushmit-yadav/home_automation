# home-automation

Home Automation is a server to manage smart devices. It has set of APIs to list/add/delete devices. It has an api to perform any action on an specific device like start/stop.

## Installation

Unzip folder or clone [home-automation](https://github.com/shushmit-yadav/home_automation.git)

and then go to inside home-automation and open terminal inside home-automation folder and then do

+ npm install

npm install will install all the libraries from package.json file

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