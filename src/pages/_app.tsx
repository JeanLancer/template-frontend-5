import type { AppProps } from 'next/app';

import Layout from '../shared/components/Layout';
import { LayoutProvider } from '../shared/contexts/LayoutContext';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <LayoutProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LayoutProvider>
  );
};
  
export default MyApp;
 