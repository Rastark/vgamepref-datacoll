import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { AuthProvider } from '../lib/auth';

import { useForm } from 'react-hook-form';
import SidebarWithHeader from '../common/SidebarWithHeader';

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
    <ChakraProvider>
      <AuthProvider>
        <SidebarWithHeader children={<Component {...pageProps} />} />
        {/* <div>
          <form 
            onSubmit={handleSubmit((data) => (
              console.log(data)
            ))}
          >
            <input 
              {...register('firstname', { required: 'This is required' }) } 
              placeholder='First name'
            />
            <p>{errors.firstname?.message}</p>
            <input 
              {...register('lastname', { required: 'This is required', minLength: {
                value: 4,
                message: 'min length is 4'
              }})}
              placeholder='Last name' 
            />
            <p>{errors.lastname?.message}</p>
            <input type='submit' />
          </form>
        </div> */}

      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
