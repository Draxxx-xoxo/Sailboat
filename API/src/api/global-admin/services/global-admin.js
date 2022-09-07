'use strict';

/**
 * global-admin service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::global-admin.global-admin');
