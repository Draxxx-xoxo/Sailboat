'use strict';

/**
 *  global-admin controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::global-admin.global-admin');
