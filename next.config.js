const withImages = require('next-images');

module.exports = withImages({
  env: {
    KEY: process.env.KEY
  },
  images: {
    domains: [
      'localhost',
      'app.eflorista.com.br',
      'wsuite.com.br',
      'www.wsuite.com.br'
    ]
  },
  webpack: config => {
    return config;
  }
});
  