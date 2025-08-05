const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ro'],
  },
  localePath: path.resolve('./locales'),  // next-i18next citește asta
};
