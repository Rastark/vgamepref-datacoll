import { ChakraProvider, theme } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { AuthProvider } from '../lib/auth';

import SidebarWithHeader from '../common/sharable/SidebarWithHeader';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const SITE_KEY: any = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <GoogleReCaptchaProvider
        reCaptchaKey={SITE_KEY}
        scriptProps={{
          async: false,
          defer: false,
          appendTo: "body",
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
