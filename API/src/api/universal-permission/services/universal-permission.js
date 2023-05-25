'use strict';

/**
 * universal-permission service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::universal-permission.universal-permission');
