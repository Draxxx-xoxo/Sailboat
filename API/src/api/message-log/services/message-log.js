'use strict';

/**
 * message-log service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::message-log.message-log');
