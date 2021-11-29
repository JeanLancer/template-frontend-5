import React from 'react';
import { Global, css } from '@emotion/react';

const Fonts = (): JSX.Element => (
  <Global
    styles={css`
      @font-face {
        font-family: 'CentraNube';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/centranube-book.woff2') format('woff2'),
          url('./fonts/centranube-book.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
          U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
          U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'CentraNube';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('./fonts/centranube-medium.woff2') format('woff2'),
          url('./fonts/centranube-medium.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
          U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
          U+2212, U+2215, U+FEFF, U+FFFD;
      }

      a:focus {
        outline: none;
      }

      .wrap_2ad {
        top: 142px !important;
        right: 10px !important;
        position: fixed !important;
        width: 65px !important;
        height: 65px !important;
      }

      .zopim {
        bottom: 112px !important;
      }

      .cookieConsentContainer {
        z-index: 999;
        width: 350px;
        min-height: 20px;
        box-sizing: border-box;
        padding: 30px 30px 30px 30px;
        background: #232323;
        overflow: hidden;
        position: fixed;
        bottom: 30px;
        left: 30px;
        display: none;
      }
      .cookieConsentContainer .cookieTitle a {
        font-family: OpenSans, arial, sans-serif;
        color: #fff;
        font-size: 22px;
        line-height: 20px;
        display: block;
      }
      .cookieConsentContainer .cookieDesc p {
        margin: 0;
        padding: 0;
        font-family: OpenSans, arial, sans-serif;
        color: #fff;
        font-size: 13px;
        line-height: 20px;
        display: block;
        margin-top: 10px;
      }
      .cookieConsentContainer .cookieDesc a {
        font-family: OpenSans, arial, sans-serif;
        color: #fff;
        text-decoration: underline;
      }
      .cookieConsentContainer .cookieButton a {
        display: inline-block;
        font-family: OpenSans, arial, sans-serif;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        margin-top: 14px;
        background: #000;
        box-sizing: border-box;
        padding: 15px 24px;
        text-align: center;
        transition: background 0.3s;
      }
      .cookieConsentContainer .cookieButton a:hover {
        cursor: pointer;
        background: #3e9b67;
      }
      @media (max-width: 980px) {
        .cookieConsentContainer {
          bottom: 0 !important;
          left: 0 !important;
          width: 100% !important;
        }
      }
    `}
  />
);

export default Fonts;
