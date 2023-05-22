const { join } = require('path');

/**
 * 
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(
    '/tmp/alandgmendes-programservices/.cache/puppeteer/chrome/chrome/linux-113.0.5672.63/chrome/linux-113.0.5672.63',
  ),
};
