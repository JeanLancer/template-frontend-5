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
    STORE_DOMAIN: process.env.STORE_DOMAIN,
    STATE_LOCATION: process.env.STATE_LOCATION,
    ZIPCODE_LOCATION: process.env.ZIPCODE_LOCATION,

    LOGO: process.env.LOGO,
    LOGO_WIDTH: process.env.LOGO_WIDTH,
    LOGO_HEIGHT: process.env.LOGO_HEIGHT,

    HEADER_TEXT: process.env.HEADER_TEXT,

    CITIES: JSON.parse(process.env.CITIES),

    SITE_IS_ENABLED: process.env.SITE_IS_ENABLED,
    ENABLE_NIGHT_TURN: process.env.ENABLE_NIGHT_TURN,

    TITLE: process.env.TITLE,
    META_DESCRIPTION: process.env.META_DESCRIPTION,
    PAYMENT_PLATFORM: process.env.PAYMENT_PLATFORM,
    PAYMENT_PLATFORM_KEY: process.env.PAYMENT_PLATFORM_KEY,

    GOOGLE_TAG_ID: process.env.GOOGLE_TAG_ID,
    GOOGLE_TAG_SEND_TO: process.env.GOOGLE_TAG_SEND_TO,

    FACEBOOK_PIXEL_ID: process.env.FACEBOOK_PIXEL_ID,

    JIVOCHAT: process.env.JIVOCHAT,

    //colors
    PRIMARY_COLOR: process.env.PRIMARY_COLOR,
    SECOND_COLOR: process.env.SECOND_COLOR,
    THIRD_COLOR: process.env.THIRD_COLOR,
    WHITE_COLOR: process.env.WHITE_COLOR,
  },
  distDir: process.env.BUILD_DIR || '.next',
  webpack: config => {
    return config;
  }
});
