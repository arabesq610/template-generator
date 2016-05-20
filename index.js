/**
 *
 * @requires node-handlebars
 * @requires minimist
 * @requires lodash
 * @example
 *  $ node index.js --template=reference-check
 */
'use strict';

// Load required modules
var argv = require('minimist')(process.argv.slice(2));
var handlebars = require('node-handlebars');
var _ = require('lodash');

// Define required arguments
var requiredArgs = ['template'];
var tplConfig = {};

_.forEach(requiredArgs, function (i) {
    var shortCircuit;

    if (!argv[i]) {
        console.log('Please provide argument ' + i);
        shortCircuit = true;
    } else {
        tplConfig[i] = argv[i];
    }

    // Something was missing
    if (shortCircuit) {
        return;
    }

});

function generateTemplate(config) {
    var templateLocation = __dirname + '/templates/' + config.template + '.hbs';
    var hbsData = config.data;


    console.warn(hbsData);

    var hbs = handlebars.create({
        partialsDir: __dirname + 'templates'
    });

    hbs.engine(templateLocation, hbsData, function (err, doc) {
        if (!doc) {
            return;
        }
        if (err) {
            throw err;
        }
        console.log(doc);
    });
}

tplConfig.data = require('./config/' + tplConfig.template + '.json');

// Generate the template
generateTemplate(tplConfig);