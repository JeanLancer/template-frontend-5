import React, { createContext, useContext } from 'react';
import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

import getConfig from 'next/config';

interface ContextData {
  globals: any;
  theme: any;
  layoutStyles: any;
}

const LayoutContext = createContext({} as ContextData);

const LayoutProvider: React.FC = ({ children }) => {
  const globals = {
    paddingX: ['16px', '16px', '24px', '48px', '0px']
  };

  const { publicRuntimeConfig } = getConfig();

  const breakpoints = createBreakpoints({
    sm: '360px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px'
  });

  const theme = extendTheme({
    breakpoints,
    fonts: {
      heading: 'CentraNube',
      body: 'CentraNube'
    },
    colors: {
      brand: {
        100:
          publicRuntimeConfig.ACTIVE_MENU || publicRuntimeConfig.PRIMARY_COLOR,
        200: publicRuntimeConfig.SECOND_COLOR,
        300: publicRuntimeConfig.THIRD_COLOR
      },
      white: publicRuntimeConfig.WHITE_COLOR,
      gray: {
        100: '#f3f3f3',
        200: '#ebebeb',
        300: '#8b8b92',
        500: '#ebebeb'
      },
      red: {
        500: publicRuntimeConfig.ACTIVE_MENU
      },
      green: {
        500: '#09B662'
      },
      blue: {
        500: '#54a0ff'
      }
    }
  });

  const layoutStyles: any = {
    header: {
      contactBar: {
        display: ['none', 'none', 'flex'],
        backgroundColor: publicRuntimeConfig.BACKGROUND_INFO || 'gray.500',
        height: '24px',
        justifyContent: 'space-between',
        px: globals.paddingX,
        fontSize: ['11px', ' 12px'],
        color: publicRuntimeConfig.DETAILS_INFO || 'brand.300',
        color2: publicRuntimeConfig.DETAILS_INFO_2 || 'brand.300',
        color3: publicRuntimeConfig.DETAILS_INFO_3 || 'brand.300',
        alignItems: 'center'
      },

      mainBar: {
        backgroundColor: publicRuntimeConfig.BACKGROUND_HEADER || 'white',
        color:
          publicRuntimeConfig.DETAILS_HEADER ||
          publicRuntimeConfig.PRIMARY_COLOR,
        py: ['8px', '16px'],
        px: globals.paddingX,
        alignItems: 'center',
        justifyContent: 'space-between'
      },

      searchBar: {
        backgroundColor: 'white',
        focusBorderColor: 'none',
        size: 'sm',
        borderRadius: '2px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        _placeholder: {
          color: 'brand.300'
        }
      },

      logo: {
        src: publicRuntimeConfig.LOGO,
        width: ['80px', '100px', publicRuntimeConfig.LOGO_WIDTH],
        height: ['40px', '40px', publicRuntimeConfig.LOGO_HEIGHT],
        mr: '24px'
      },

      secondBar: {
        display: ['none', 'none', 'flex'],
        justifyContent: 'space-between',
        backgroundColor: publicRuntimeConfig.BACKGROUND_MENU || 'gray.500',
        height: '64px',
        px: globals.paddingX
      },

      categoryBar: {
        justifyContent: 'space-between',
        color: publicRuntimeConfig.DETAILS_MENU || 'gray.800'
      },

      dropDownCities: {
        px: '16px',
        height: '100%',
        backgroundColor:
          publicRuntimeConfig.ACTIVE_MENU || publicRuntimeConfig.PRIMARY_COLOR,
        color: 'white',
        whiteSpace: 'nowrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    },

    productCard: {
      button: {
        backgroundColor: publicRuntimeConfig.BACKGROUND_BUY || 'green.500',
        color: publicRuntimeConfig.DETAILS_BUY || 'white',
        color2: publicRuntimeConfig.DETAILS_BUY_2 || 'white'
      }
    },

    footer: {
      copyrightBar: {
        width: '100%',
        backgroundColor: 'gray.200',
        flexDirection: 'column',
        color: 'gray.600',
        py: '8px',
        px: globals.paddingX,
        fontSize: ['10px', '12px']
      }
    }
  };

  return (
    <LayoutContext.Provider value={{ globals, theme, layoutStyles }}>
      {children}
    </LayoutContext.Provider>
  );
};

const useLayout = (): ContextData => {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }

  return context;
};

export { LayoutProvider, useLayout };
//
