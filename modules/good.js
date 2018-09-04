module.exports = {
  plugin: require('good'),
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', response: ['api', 'ops'] }]
      }, {
        module: 'good-console',
      }, 'stdout']
    }
  }
}