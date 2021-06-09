import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default {
  KEY: publicRuntimeConfig.STORE_KEY,
  STORE: {
    DOMAIN: publicRuntimeConfig.STORE_DOMAIN,
    NAME: publicRuntimeConfig.STORE_NAME,
    LOCATION: {
      STATE: publicRuntimeConfig.STATE_LOCATION,
      ZIPCODE: publicRuntimeConfig.ZIPCODE_LOCATION
    }
  },

  HEADER_TEXT: publicRuntimeConfig.HEADER_TEXT,
  CITIES: publicRuntimeConfig.CITIES,
  SITE_IS_ENABLED: publicRuntimeConfig.SITE_IS_ENABLED,
  ENABLE_NIGHT_TURN: publicRuntimeConfig.ENABLE_NIGHT_TURN,

  SEO: {
    TITLE: publicRuntimeConfig.TITLE,
    META_DESCRIPTION: publicRuntimeConfig.META_DESCRIPTION
  },
  PAYMENT: {
    PLATFORM: publicRuntimeConfig.PAYMENT_PLATFORM,
    KEY: publicRuntimeConfig.PAYMENT_PLATFORM_KEY
  },

  GOOGLE: {
    TAG: {
      ID: publicRuntimeConfig.GOOGLE_TAG_ID,
      SEND_TO: publicRuntimeConfig.GOOGLE_TAG_SEND_TO
    }
  },

  JIVOCHAT: publicRuntimeConfig.JIVOCHAT
};
