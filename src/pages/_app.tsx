import { ChakraProvider, theme } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { AuthProvider } from '../lib/auth';

import SidebarWithHeader from '../common/sharable/SidebarWithHeader';
import { ReCaptchaProvider } from "next-recaptcha-v3";

const SITE_KEY: any = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ReCaptchaProvider
        reCaptchaKey={SITE_KEY}
      >
        <AuthProvider>
          <SidebarWithHeader>
            <Component {...pageProps} />
          </SidebarWithHeader>
        </AuthProvider>
      </ReCaptchaProvider>
    </ChakraProvider>
  );
}

export default App;
