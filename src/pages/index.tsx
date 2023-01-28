import Head from 'next/head';
import Navbar from '../common/sharable/Navbar';
import { Box, Button, List, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useHasMounted from '../utils/hasMounted';
import Introduction from '../common/Introduction';

const Home: React.FC<{ props: any }> = (props) => {

  return (
    <div>
      <Head>
        <title>RomaTre Personality Survey</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <Introduction />
      </main>
      <footer></footer>
    </div>
  );
}

export default Home;