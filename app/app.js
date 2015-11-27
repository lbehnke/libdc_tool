// Here is the starting point for code of your own application.
// All stuff below is just to show you how it works. You can delete all of it.

// Modules which you authored in this project are intended to be
// imported through new ES6 syntax.
import { listSupportedComputers } from './main/main';

// Node.js modules and those from npm
// are required the same way as always.
var os = require('os');
var app = require('electron').remote.app;
var jetpack = require('fs-jetpack').cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
console.log(jetpack.read('package.json', 'json'));

// window.env contains data from config/env_XXX.json file.
var envName = window.env.name;

document.addEventListener('DOMContentLoaded', function() {

    var dcs = listSupportedComputers();
    var text = dcs.length + " dive computers supported";

    document.getElementById('info').innerHTML = text;
    document.getElementById('platform-info').innerHTML = os.platform();
    document.getElementById('env-name').innerHTML = envName;
});
