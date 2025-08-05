const NextI18Next = require('next-i18next').default;

const i18n = new NextI18Next({
  defaultLocale: 'ro',
  locales: ['ro', 'en'],
  localePath: './locales',
  detection: {
    order: ['cookie', 'header', 'querystring'],
    caches: ['cookie'],
  },
});

module.exports = i18n;
