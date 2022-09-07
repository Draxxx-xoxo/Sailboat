'use strict';

/**
 * allowed-user service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::allowed-user.allowed-user');
