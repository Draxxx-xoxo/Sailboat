'use strict';

/**
 * bot-permission service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::bot-permission.bot-permission');
