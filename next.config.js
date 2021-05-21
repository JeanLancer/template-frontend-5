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
    KEY: process.env.KEY
  },
  distDir: process.env.BUILD_DIR || '.next',
  webpack: config => {
    return config;
  }
});
