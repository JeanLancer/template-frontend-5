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
  SITE_IS_ENABLED: publicRuntimeConfig.SITE_IS_ENABLED === 'true',
  HOTJAR: publicRuntimeConfig.HOTJAR || null,
  SEO: {
    TITLE: publicRuntimeConfig.TITLE,
    META_DESCRIPTION: publicRuntimeConfig.META_DESCRIPTION,
    KEYWORDS: publicRuntimeConfig.KEYWORDS || ''
  },
  PAYMENT: {
    PLATFORM: publicRuntimeConfig.PAYMENT_PLATFORM,
    KEY: publicRuntimeConfig.PAYMENT_PLATFORM_KEY,
    EMAIL: publicRuntimeConfig.PAYMENT_PLATFORM_EMAIL
  },

  GOOGLE: {
    TAG: {
      ID: publicRuntimeConfig.GOOGLE_TAG_ID,
      SEND_TO: publicRuntimeConfig.GOOGLE_TAG_SEND_TO,
      SEND_TO_WHATS: publicRuntimeConfig.GOOGLE_TAG_SEND_TO_WHATS,
      MANAGER: publicRuntimeConfig.GOOGLE_TAG_MANAGER
    },
    DOMAIN_VERIFICATION: publicRuntimeConfig.GOOGLE_DOMAIN_VERIFICATION,
    ANALYTICS: {
      ID: publicRuntimeConfig.GOOGLE_ANALYTICS_ID
    }
  },
  FACEBOOK: {
    DOMAIN_VERIFICATION: publicRuntimeConfig.FACEBOOK_DOMAIN_VERIFICATION,
    PIXEL: {
      ID: publicRuntimeConfig.FACEBOOK_PIXEL_ID
    }
  },

  INSTAGRAM: publicRuntimeConfig.INSTAGRAM,
  JIVOCHAT: publicRuntimeConfig.JIVOCHAT,
  ZENDESK: publicRuntimeConfig.ZENDESK,

  SHOW_SPECIAL: publicRuntimeConfig.SHOW_SPECIAL === 'true',

  REQUIRED_CARD_MESSAGE: publicRuntimeConfig.REQUIRED_CARD_MESSAGE === 'true'
};
