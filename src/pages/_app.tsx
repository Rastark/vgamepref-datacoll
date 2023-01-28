import { ChakraProvider, theme } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { AuthProvider } from '../lib/auth';

import SidebarWithHeader from '../common/sharable/SidebarWithHeader';

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <SidebarWithHeader children={<Component {...pageProps} />} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
