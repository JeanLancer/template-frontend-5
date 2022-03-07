import React, { createContext, useState, useContext, useEffect } from 'react';
import { HTTP_RESPONSE } from '../constants';
import apiGateway, { apiEflorista } from '../services/apiGateway';

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
  info: {
    days_of_service: 'MON_FRY' | 'MON_SAT' | 'MON_SUN';
    weekday_hours: string;
    weekend_hour: string;
  };
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
    is_free_delivery: boolean;
  };
  categories: {
    default: any[];
    header: any[];
    footer: any[];
    pages: any[];
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

      apiEflorista.get('/settings/schedule_settings').then(response2 => {
        if (response2.status === HTTP_RESPONSE.STATUS.SUCCESS) {
          const { days_of_service, weekday_hours, weekend_hour } =
            response2.data;

          console.log(categories);

          setData(() => {
            return {
              info: {
                days_of_service,
                weekday_hours,
                weekend_hour
              },
              general_settings: {
                ...general_settings,
                store_name: general_settings.name
              },
              categories: {
                ...categories,
                pages: pages
                  ? pages.filter((item: any) => item.show_in_header === 'true')
                  : []
              },
              options,
              pages
            };
          });
        }
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
