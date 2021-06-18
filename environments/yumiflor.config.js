
var STORE_KEY = "b6f536f3-c2db-4e4e-94c6-40bf93c0b335"
var STORE_NAME = "YumiFlor"
var STORE_DOMAIN = "https://www.yumi-flor.com.br"
var ZIPCODE_LOCATION = "90000-000"
var STATE_LOCATION = "RS"

var LOGO = "yumiflor.png"
var LOGO_WIDTH = "80px"
var LOGO_HEIGHT = "80px"

var TITLE = "Floricultura Beija Flor POA"
var META_DESCRIPTION = "Floricultura Beija-Flor, buques, arranjos e muito mais, 30 anos em Porto Alegre, Av. protásio ALves, 1987, Porto Alegre, fone 51 3330.0155"

var HEADER_TEXT = "Atendimento 24 Horas"

var PAYMENT_PLATFORM = "Mercado Pago"
var PAYMENT_PLATFORM_KEY = "APP_USR-73ed39a4-961d-4c40-a575-89c01d8c24b5"

var GOOGLE_TAG_ID = "AW-704073967"
//var GOOGLE_TAG_SEND_TO = "-vFCCNHh7fYBELCB6sUB"

var GOOGLE_ANALYTICS_ID = "UA-129693747-1"

//var FACEBOOK_PIXEL_ID = "313268147013334"

//var JIVOCHAT = ""
var ZENDESK = "2NdOAtMfahkk6bATmTJkUngEEiXiMDrn"

var PRIMARY_COLOR = "#FF224B"
var SECOND_COLOR = "#5d2b48"
var THIRD_COLOR = "#454545"

var GRAY_COLOR = "#ebebeb"
var WHITE_COLOR = "#FFFFFF"

var CITIES = ["Alvorada", "Cachoeirinha", "Canoas", "Eldorado do Sul", "Esteio", "Gravataí", "Guaíba", "Porto Alegre", "Sapucaia do Sul", "Viamão"]

var SITE_IS_ENABLED = true

var SHOW_SPECIAL = false

var APP = "yumiflor"
var PORT = "3002"

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
          //GOOGLE_TAG_SEND_TO,
          GOOGLE_ANALYTICS_ID,
          //FACEBOOK_PIXEL_ID,

          //JIVOCHAT,
          ZENDESK,

          PRIMARY_COLOR,
          SECOND_COLOR,
          THIRD_COLOR,

          GRAY_COLOR,
          WHITE_COLOR,

          CITIES,

          SITE_IS_ENABLED,
          SHOW_SPECIAL
        }
      }
  ]
}
