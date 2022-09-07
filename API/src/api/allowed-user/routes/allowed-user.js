'use strict';

/**
 * allowed-user router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::allowed-user.allowed-user');
