'use strict';

/**
 * global-admin router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::global-admin.global-admin');
