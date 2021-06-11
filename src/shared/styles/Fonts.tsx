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
    `}
  />
);

export default Fonts;
