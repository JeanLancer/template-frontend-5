import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default {
  KEY: publicRuntimeConfig.STORE_KEY,
  STORE: {
    NAME: publicRuntimeConfig.STORE_NAME,
    LOCATION: {
      STATE: publicRuntimeConfig.STATE_LOCATION,
      ZIPCODE: publicRuntimeConfig.ZIPCODE_LOCATION
    }
  },
  SEO: {
    TITLE: publicRuntimeConfig.TITLE,
    META_DESCRIPTION: publicRuntimeConfig.META_DESCRIPTION
  },
  PAYMENT: {
    PLATFORM: publicRuntimeConfig.PAYMENT_PLATFORM
  }
};
