const handlers = require('../handlers');
const Joi = require('joi');

const routes = [
  {
    method: 'POST',
    path: '/api/v1/tokens/bet/',
    handler: handlers.tokens.registerTokens,
    options: {
      description: 'This endpoint set a user \'s token bet and update weekly token list with user tokens',
      tags: ['api', 'v1', 'tokens', 'bet'],
      validate: {
        query: {
          tokenList: Joi
            .array()
            .required()
            .sparse(false)
            .items(Joi.string())
            .min(1)
            .description('list ot token to be bet')
            .example(['DTH', 'ZRX'])
        }
      },
      response: {
        schema: handlers.tokens.schema.registerTokens
      }
    }
  },
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {

      return 'Hello, world!';
    }
  }
];

module.exports = routes;