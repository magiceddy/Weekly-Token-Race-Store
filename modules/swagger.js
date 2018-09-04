const HapiSwagger = require('hapi-swagger');
const pkg = require('../package.json');

module.exports = {
  plugin: HapiSwagger,
  options: {
    info: {
      description: `This Api provide a series of endpoints in order to register...
                    To see all routes, [click here](/).
                    To see v1 routes only, [click here](/?tags=v1)`,
      version: pkg.version,
      contact: {
        name: 'Rinaldo Rossi',
        email: 'rinaldo.rossi.web@gmail.com'
      },
      license: {
        name: pkg.license
      }
    },
    //documentationPath: '/',
    jsonEditor: true,
    tags: [{
      name: 'tokens',
      description: 'Work with tokens'
    }],
    pathPrefixSize: 2,
    basePath: '/api/',
    // pathReplacements: [{
    //   replaceIn: 'groups',
    //   pattern: /v([0-9]+)\//,
    //   replacement: ''
    // }, {
    //   replaceIn: 'groups',
    //   pattern: '',
    //   replacement: ''
    // }]
  }
}