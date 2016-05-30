/**
 * @requires minimist
 */

// Load required modules
var argv = require('minimist')(process.argv.slice(2));

var TemplateGenerator = require('./TemplateGenerator');

var tg = new TemplateGenerator(argv);

tg.setData();

tg.makeTemplate();