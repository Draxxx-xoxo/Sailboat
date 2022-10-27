'use strict';

/**
 * beta-tester router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::beta-tester.beta-tester');
