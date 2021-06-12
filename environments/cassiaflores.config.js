
var STORE_KEY = "7431e723-90ad-406c-b98a-1a8c9818023d"
var STORE_NAME = "Cassia Flores"
var STORE_DOMAIN = "https://www.cassiaflores.com.br/"
var ZIPCODE_LOCATION = "88215-000"
var STATE_LOCATION = "SC"

var LOGO = "cassiaflores.png"
var LOGO_WIDTH = "144px"
var LOGO_HEIGHT = "64px"

var TITLE = "Floricultura Cassia"
var META_DESCRIPTION = "Floricultura Cassia"

var HEADER_TEXT = "Atendimento de Seg. a Sábado das 8h ás 18h"

var PAYMENT_PLATFORM = "Mercado Pago"
var PAYMENT_PLATFORM_KEY = "APP_USR-30c7d1c1-44c1-4afa-9caa-3156155ce880"

var GOOGLE_TAG_ID = "AW-414875824"
var GOOGLE_TAG_SEND_TO = "-vFCCNHh7fYBELCB6sUB"

var GOOGLE_ANALYTICS_ID = "G-89Y3L89FV6"

var FACEBOOK_PIXEL_ID = "313268147013334"

var JIVOCHAT = "ShdYXTDlDB"

var PRIMARY_COLOR = "#FF224B"
var SECOND_COLOR = "#09B662"
var THIRD_COLOR = "#454545"

var GRAY_COLOR = "#ebebeb"
var WHITE_COLOR = "#FFFFFF"

var CITIES = ["Balneário Comboriú", "Bombinhas", "Comboriú", "Itapema", "Porto Belo", "Tijucas"]

var SITE_IS_ENABLED = true
var ENABLE_NIGHT_TURN = true

var APP = "cassiaflores"
var PORT = "3001"

module.exports = {
  apps : [
      {
        name: `app-${APP}`,
        script: "yarn",
        args: `deploy`,
        env: {
          BUILD_DIR: `./builds/${APP}/.next`,
          PORT,
          STORE_KEY,
          STORE_NAME,
          STORE_DOMAIN,
          ZIPCODE_LOCATION,
          STATE_LOCATION,

          LOGO,
          LOGO_WIDTH,
          LOGO_HEIGHT,

          TITLE,
          META_DESCRIPTION,

          HEADER_TEXT,

          PAYMENT_PLATFORM,
          PAYMENT_PLATFORM_KEY,

          GOOGLE_TAG_ID,
          GOOGLE_TAG_SEND_TO,
          GOOGLE_ANALYTICS_ID,

          FACEBOOK_PIXEL_ID,

          JIVOCHAT,

          PRIMARY_COLOR,
          SECOND_COLOR,
          THIRD_COLOR,

          GRAY_COLOR,
          WHITE_COLOR,

          CITIES,

          SITE_IS_ENABLED,
          ENABLE_NIGHT_TURN
        }
      }
  ]
}
