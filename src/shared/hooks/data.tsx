import React, { createContext, useState, useContext, useEffect } from 'react';
import apiGateway from '../services/apiGateway';

interface Options {
  show_document: boolean;
  show_whatsapp: boolean;
  show_telephone: boolean;
  show_email: boolean;
  show_address: boolean;
}

interface Page {
  title: string;
  slug: string;
  content: string;
  meta_description: string;
}

interface StoreConfigContextData {
  general_settings: {
    store_name: string;
    document: string;
    whatsapp: string;
    telephone: string;
    email_contact: string;
    email_order: string;
    zipcode: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    complement: string;

    min_order_value: number;
  };
  categories: {
    header: any[];
    footer: any[];
  };
  options: {
    header: Options;
    footer: Options;
  };
  pages: Page[];
}

const StoreConfigContext = createContext({} as StoreConfigContextData);

const ConfigProvider: React.FC = ({ children }) => {
  const [data, setData] = useState({} as StoreConfigContextData);

  useEffect(() => {
    apiGateway.get('/stores/setup').then(response => {
      const { general_settings, categories, options, pages } = response.data;

      setData(() => {
        return {
          general_settings: {
            ...general_settings,
            store_name: general_settings.name
          },
          categories,
          options,
          pages
        };
      });
    });
  }, []);

  return (
    <StoreConfigContext.Provider value={data}>
      {children}
    </StoreConfigContext.Provider>
  );
};

const useData = (): StoreConfigContextData => {
  const context = useContext(StoreConfigContext);

  if (!context) {
    throw new Error('useData must be used within a ConfigProvider');
  }

  return context;
};

export { ConfigProvider, useData };
