import { ChakraProvider, theme } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { AuthProvider } from '../lib/auth';

import SidebarWithHeader from '../common/sharable/SidebarWithHeader';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <GoogleReCaptchaProvider
        reCaptchaKey="6LcqKkEkAAAAAN-cCHSDEbXaRIJYARF4GlqE9HPJ"
        scriptProps={{
          async: false,
          defer: false,
          appendTo: "head",
          nonce: undefined
        }}
      >
        <AuthProvider>
          <SidebarWithHeader>
            <Component {...pageProps} />
          </SidebarWithHeader>
        </AuthProvider>
      </GoogleReCaptchaProvider>
    </ChakraProvider>
  );
}

export default App;
