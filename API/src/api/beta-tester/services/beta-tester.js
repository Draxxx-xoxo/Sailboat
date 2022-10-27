'use strict';

/**
 * beta-tester service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::beta-tester.beta-tester');
