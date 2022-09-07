'use strict';

/**
 * infraction service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::infraction.infraction');
