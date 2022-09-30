'use strict';

/**
 * message-log router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::message-log.message-log');
