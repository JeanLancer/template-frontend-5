import React, { createContext, useContext } from 'react';
import { extendTheme, FlexProps } from '@chakra-ui/react';
import getConfig from 'next/config';

export interface Style extends FlexProps {
  focusBorderColor?: string;
  size?: string;
  src?: string;
}

export interface HeaderStyles {
  contactBar: Style;
  mainBar: Style;
  logo: any;
  searchBar: Style;
  secondBar: Style;
  categoryBar: Style;
  categoryMenu: Style;
  dropDownCities: Style;
}

export interface FooterStyles {
  copyrightBar: Style;
}

interface LayoutStyles {
  header: HeaderStyles;
  footer: FooterStyles;
}

interface ContextData {
  globals: any;
  theme: any;
  layoutStyles: LayoutStyles;
}

const LayoutContext = createContext({} as ContextData);

const LayoutProvider: React.FC = ({ children }) => {
  const globals = {
    paddingX: ['16px', '16px', '24px', '48px', '0px']
  };

  const { publicRuntimeConfig } = getConfig();

  const theme = extendTheme({
    fonts: {
      heading: 'CentraNube',
      body: 'CentraNube'
    },
    colors: {
      brand: {
        100: publicRuntimeConfig.PRIMARY_COLOR,
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
        500: '#FF224B'
      },
      green: {
        500: '#09B662'
      },
      blue: {
        500: '#54a0ff'
      }
    }
  });

  const layoutStyles: LayoutStyles = {
    header: {
      contactBar: {
        display: ['none', 'none', 'flex'],
        backgroundColor: 'gray.500',
        height: '24px',
        justifyContent: 'space-between',
        px: globals.paddingX,
        fontSize: ['11px', '12px'],
        color: 'brand.300',
        alignItems: 'center'
      },

      mainBar: {
        backgroundColor: 'white',
        color: '8px',
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
        height: ['80px', '20px', publicRuntimeConfig.LOGO_HEIGHT],
        mr: '24px'
      },

      secondBar: {
        display: ['none', 'none', 'flex'],
        justifyContent: 'space-between',
        backgroundColor: 'gray.500',
        height: '40px',
        px: globals.paddingX
      },

      categoryBar: {
        color: '8px',
        justifyContent: 'space-between'
      },

      dropDownCities: {
        px: '16px',
        height: '100%',
        backgroundColor: 'brand.100',
        color: 'white',
        whiteSpace: 'nowrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      },

      categoryMenu: {
        color: 'brand.300'
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
