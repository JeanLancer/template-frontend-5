const withImages = require('next-images');

module.exports = withImages({
  images: {
    minimumCacheTTL: 60,
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
    HOTJAR: process.env.HOTJAR || null,

    SITE_IS_ENABLED: process.env.SITE_IS_ENABLED,

    TITLE: process.env.TITLE,
    META_DESCRIPTION: process.env.META_DESCRIPTION,
    KEYWORDS: process.env.KEYWORDS,

    PAYMENT_PLATFORM: process.env.PAYMENT_PLATFORM,
    PAYMENT_PLATFORM_KEY: process.env.PAYMENT_PLATFORM_KEY,
    PAYMENT_PLATFORM_EMAIL: process.env.PAYMENT_PLATFORM_EMAIL,

    GOOGLE_TAG_ID: process.env.GOOGLE_TAG_ID,
    GOOGLE_TAG_SEND_TO: process.env.GOOGLE_TAG_SEND_TO,
    GOOGLE_TAG_SEND_TO_WHATS: process.env.GOOGLE_TAG_SEND_TO_WHATS,
    GOOGLE_TAG_MANAGER: process.env.GOOGLE_TAG_MANAGER,

    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    GOOGLE_DOMAIN_VERIFICATION: process.env.GOOGLE_DOMAIN_VERIFICATION,

    FACEBOOK_DOMAIN_VERIFICATION: process.env.FACEBOOK_DOMAIN_VERIFICATION,
    FACEBOOK_PIXEL_ID: process.env.FACEBOOK_PIXEL_ID,

    INSTAGRAM: process.env.INSTAGRAM,
    JIVOCHAT: process.env.JIVOCHAT,
    ZENDESK: process.env.ZENDESK,

    //colors
    PRIMARY_COLOR: process.env.PRIMARY_COLOR,
    SECOND_COLOR: process.env.SECOND_COLOR,
    THIRD_COLOR: process.env.THIRD_COLOR,
    WHITE_COLOR: process.env.WHITE_COLOR,

    SHOW_SPECIAL: process.env.SHOW_SPECIAL,
    REQUIRED_CARD_MESSAGE: process.env.REQUIRED_CARD_MESSAGE,

    BACKGROUND_INFO: process.env.BACKGROUND_INFO,
    DETAILS_INFO: process.env.DETAILS_INFO,
    DETAILS_INFO_2: process.env.DETAILS_INFO_2,
    DETAILS_INFO_3: process.env.DETAILS_INFO_3,
    BACKGROUND_HEADER: process.env.BACKGROUND_HEADER,
    DETAILS_HEADER: process.env.DETAILS_HEADER,
    BACKGROUND_MENU: process.env.BACKGROUND_MENU,
    DETAILS_MENU: process.env.DETAILS_MENU,
    ACTIVE_MENU: process.env.ACTIVE_MENU,
    BACKGROUND_BUY: process.env.BACKGROUND_BUY,
    DETAILS_BUY: process.env.DETAILS_BUY,
    DETAILS_BUY_2: process.env.DETAILS_BUY_2,
  },

  distDir: process.env.BUILD_DIR || '.next',
  webpack: config => {
    return config;
  }
});
