import { ChakraProvider, theme } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { AuthProvider } from '../lib/auth';

import { useForm } from 'react-hook-form';
import SidebarWithHeader from '../common/sharable/SidebarWithHeader';

function App({ Component, pageProps }: AppProps) {
  const {
    register, 
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstname: '',
      lastname: ''
    }
  }
  );

  console.log(watch());

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <SidebarWithHeader children={<Component {...pageProps} />} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
