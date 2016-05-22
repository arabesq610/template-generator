/**
 *
 * @requires node-handlebars
 * @requires minimist
 * @requires lodash
 * @example
 *  $ node index.js --template=reference-check
 */

// Load required modules
var argv = require('minimist')(process.argv.slice(2));
var handlebars = require('node-handlebars');
var _ = require('lodash');

// Define required arguments
var requiredArgs = ['template'];
var tplConfig = {};

// Make sure we have the arguments we need
_.forEach(requiredArgs, function (i) {
    'use strict';
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
    'use strict';

    var templateLocation = __dirname + '/templates/' + config.template + '.hbs';
    var hbsData = config.data;

    _.forEach(hbsData, function (obj) {

        var hbs = handlebars.create({
            partialsDir: __dirname + 'templates'
        });

        hbs.engine(templateLocation, obj, function (err, doc) {
            if (!doc) {
                return;
            }
            if (err) {
                throw err;
            }
            console.log(doc);
        });

    });


}

tplConfig.data = require('./config/' + tplConfig.template + '.json');

// Generate the template
generateTemplate(tplConfig);
