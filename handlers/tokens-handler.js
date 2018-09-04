const boom = require('boom');
const Joi = require('joi');
const TokenDb = require('../orbit-db');

const registerTokens = async (request, h) => {
  const { weekHash, tokenList } = request.query;

  try {
    const hash = await TokenDb.insert(weekHash, tokenList);
    return h.response(hash);
  } catch (err) {
    return h.response(boom.wrap(err));
  }
}

const schema = {
  registerTokens: Joi.string().label('registerToken')
}

module.exports = {
  registerTokens,
  schema
}