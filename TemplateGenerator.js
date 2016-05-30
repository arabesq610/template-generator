/**
 *
 * @requires node-handlebars
 * @requires lodash
 * @example
 *  $ node index --template=reference-check
 */

// Load required modules
var handlebars = require('node-handlebars');
var _ = require('lodash');

// Define required arguments
var tplConfig = {};

function TemplateGenerator(args) {
    'use strict';

    var _doShortCircuit = false;

    this.config = {};
    this.requiredArgs = ['template'];

    var self = this;

    // Make sure we have the arguments we need
    _.forEach(this.requiredArgs, function (i) {
        var _doShortCircuit;

        if (!args[i]) {
            console.log('Please provide argument ' + i);
            _doShortCircuit = true;
        } else {
            if (!self.config) {
                self.config = {};
            }
            // console.log('args['+i+']', args[i]);
            self.config[i] = args[i];
        }

        // Something was missing
        if (_doShortCircuit) {
            return;
        }
    });
}

TemplateGenerator.prototype.getData = function () {
    'use strict';
    return this.config.data;
};

TemplateGenerator.prototype.getTemplate = function () {
    'use strict';
    return this.template;
}

TemplateGenerator.prototype.makeTemplate = function () {
    'use strict';

    var templateLocation = __dirname + '/templates/' + this.config.template + '.hbs';

    return this.template = _.forEach(this.data, function (obj) {
        var hbs = handlebars.create({
            partialsDir: __dirname + 'templates'
        });

        hbs.engine(templateLocation, obj, function (err, doc) {
            if (!doc) {
                console.error('!doc');
                return;
            }
            if (err) {
                console.error(err);
                throw err;
            }
            console.log(doc);
        });

    });
};

TemplateGenerator.prototype.setData = function () {
    'use strict';
    this.data = require('./config/' + this.config.template + '.json');
};

module.exports = TemplateGenerator;
