'use strict';

/**
 * role-permission service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::role-permission.role-permission');
