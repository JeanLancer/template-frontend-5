const withImages = require('next-images');

module.exports = withImages({
  images: {
    domains: [
      'localhost',
      'app.eflorista.com.br',
      'wsuite.com.br',
      'www.wsuite.com.br'
    ]
  },
  publicRuntimeConfig: {
    STORE_KEY: process.env.STORE_KEY,
    STORE_NAME: process.env.STORE_NAME,
    STATE_LOCATION: process.env.STATE_LOCATION,
    ZIPCODE_LOCATION: process.env.ZIPCODE_LOCATION,
    TITLE: process.env.TITLE,
    META_DESCRIPTION: process.env.META_DESCRIPTION,
  },
  distDir: process.env.BUILD_DIR || '.next',
  webpack: config => {
    return config;
  }
});
