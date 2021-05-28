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
      green: {
        500: '#1dd1a1'
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
        backgroundColor: 'gray.200',
        height: '24px',
        justifyContent: 'space-between',
        px: globals.paddingX,
        fontWeight: '500',
        fontSize: ['11px', '12px', '14px'],
        color: 'gray.600',
        alignItems: 'center'
      },

      mainBar: {
        backgroundColor:
          publicRuntimeConfig.KEY === 'TESTE' ? 'blue.500' : 'gray.100',
        color: '8px',
        py: ['8px', '16px'],
        px: globals.paddingX,
        alignItems: 'center',
        justifyContent: 'space-between'
      },

      searchBar: {
        backgroundColor: 'gray.200',
        focusBorderColor: 'none',
        size: 'sm',
        borderRadius: '2px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        _placeholder: {
          color: 'gray.500'
        }
      },

      logo: {
        src: '',
        width: ['56px', '64px', '96px'],
        mr: '24px'
      },

      secondBar: {
        display: ['none', 'none', 'flex'],
        justifyContent: 'space-between',
        backgroundColor: 'gray.200',
        height: '32px',
        px: globals.paddingX
      },

      categoryBar: {
        color: '8px',
        justifyContent: 'space-between'
      },

      dropDownCities: {
        px: '16px',
        height: '100%',
        backgroundColor: 'gray.400',
        color: 'white',
        whiteSpace: 'nowrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      },

      categoryMenu: {
        backgroundColor: 'red.500',
        color: '8px',
        height: '20px'
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
